// Shared question bank and learner feedback. Difficulty is an editorial practice label, not a calibrated score.
(() => {
const TOTAL_QUESTIONS = 100;
const ACTIVE_BANK_SIZE = 4200;
const MIN_LEVEL_TOPIC_ITEMS = 5;
const learnerSubcategoryLabels = {
  "Verb tense": "Verbs",
  Articles: "A / an / the",
  Prepositions: "Small words",
  "Count and noncount nouns": "Nouns",
  "Subject-verb agreement": "Sentence grammar",
  Modals: "Helping verbs",
  Comparatives: "Comparing",
  "Clauses and connectors": "Joining ideas",
  Conditionals: "If sentences",
  "Passive voice": "Who did it?",
  "Relative clauses": "Which person or thing",
  "Reported speech": "Telling what someone said",
  "Reduced clauses": "Short sentences",
  "Advanced sentence structure": "Word order",
  "Gerunds and infinitives": "Verb patterns",
  "Question forms": "Questions",
  "Pronouns and reference": "Pronouns",
  "Determiners and quantifiers": "Amount words",
  "Adjective and adverb forms": "Describing words",
  "Parallel structure": "Same pattern",
  "Inversion and emphasis": "Emphasis",
  "Subjunctive and unreal forms": "Formal wishes",
  "Sentence boundaries": "Sentence boundaries",
  "Everyday vocabulary": "Daily words",
  "Workplace vocabulary": "Work words",
  "Word forms": "Word families",
  Collocations: "Words together",
  "Phrasal verbs": "Verb phrases",
  Transitions: "Linking words",
  "Meaning in context": "Meaning",
  "Academic vocabulary": "School and work words",
  Register: "Tone",
  Nuance: "Exact meaning",
  "Hedging and precision": "Careful language",
  "Discourse function": "Purpose"
};

const forbiddenPromptTerms = [
  "collocation",
  "connector",
  "correct agreement",
  "reported speech",
  "underlined",
  "academic discussion",
  "academic sentence",
  "academic language",
  "completion",
  "discourse",
  "hedging"
];

const forbiddenSetupTerms = [
  "english class in the",
  "vocabulary lesson in the",
  "reads from the",
  "attendance report about",
  "budget summary about",
  "customer survey about",
  "safety notice about",
  "research abstract about",
  "training schedule about",
  "course outline about",
  "travel itinerary about"
];


const itemDataSchema = {
  version: "item-data-v1",
  generatedFields: ["id", "sentence", "options", "answer", "difficulty", "category", "subcategory", "explanation", "rationales", "qaStatus"],
  qaStatusValues: ["draft", "reviewed", "retired"]
};

function editorialNotes(made, blueprint) {
  if (made.qaStatus === "reviewed" && made.reviewer && made.reviewDate && made.explanation && made.rationales) return made;
  const notes = {
    "I bought a new car. ___ car is red.": { subcategory: "Articles", explanation: 'Use "the" for the car already introduced in the first sentence. Both sentences refer to the same car.' },
    "I found my keys under ___ old chair.": { subcategory: "Articles", explanation: 'Use "an" before the vowel sound at the beginning of "old": an old chair. A singular countable noun needs a determiner here.' },
    "Are you able to play ___ piano?": { subcategory: "Articles", explanation: 'The usual expression is "play the piano." The other offered forms do not fit this sentence.' },
    "We invited ten people. Eight replied, so ___ of them replied.": { explanation: 'Eight out of ten is most, but not all. "Each of them replied" would mean that all ten replied.' },
    "The trip will take about one hour ___ train.": { explanation: '"By train" tells us the means of transport. There is no article between "by" and "train" in this expression.' }
  };
  if (["s-formal-requirements", "g-subjunctive"].includes(blueprint.code)) {
    return { ...made, setup: 'Use the formal pattern with the base form of the verb, as in "They request that he arrive early."' };
  }
  const note = notes[made.text];
  if (note) return { ...made, ...note, qaStatus: "reviewed", reviewer: "Codex-assisted review", reviewDate: "2026-09-06" };
  return made;
}

function buildQuestion(blueprint, localIndex, globalIndex, difficulty) {
  const made = editorialNotes(blueprint.make(localIndex), blueprint);
  const prompt = contextualize(made.text, blueprint, localIndex, made);
  const options = uniqueOptions(made.options);
  const question = {
    id: `${blueprint.code}-${globalIndex + 1}`,
    blueprint: blueprint.code,
    category: made.category || blueprint.category,
    subcategory: made.subcategory || blueprint.subcategory,
    source: "English Road",
    difficulty,
    sentence: prompt.task,
    setupText: prompt.setup,
    taskText: prompt.task,
    text: prompt.fullText,
    options,
    answer: made.answer,
    focusKey: made.focusKey || "",
    reviewDate: made.reviewDate || "",
    reviewer: made.reviewer || "",
    qaStatus: made.qaStatus || "draft"
  };
  question.explanation = made.explanation || explainAnswer(question);
  question.rationales = made.rationales || rationalesForOptions(question);
  return question;
}

function chooseBalancedAnswerPosition(positionCounts, optionCount) {
  const counts = positionCounts.slice(0, optionCount);
  const minCount = Math.min(...counts);
  const choices = counts
    .map((count, index) => ({ count, index }))
    .filter((entry) => entry.count === minCount)
    .map((entry) => entry.index);
  return choices[randomInt(choices.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function contextualize(text, blueprint, index, made) {
  const setup = made.setup || helpfulSetup(text, blueprint, index, made);
  return {
    setup,
    task: text,
    fullText: `${setup} ${text}`
  };
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      if (document.execCommand("copy")) resolve();
      else reject(new Error("Copy command failed"));
    } catch (error) {
      reject(error);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}

function createQuestionBank() {
  if (window.EnglishRoadBank) return window.EnglishRoadBank.bank;
  if (typeof window.createEnglishRoadCoverageBlueprints !== "function") {
    throw new Error("The question bank did not load. Please reload to try again.");
  }
  const coverageBlueprints = window.createEnglishRoadCoverageBlueprints({ item, pick });
  const bank = [];
  for (const blueprint of coverageBlueprints) {
    for (let localIndex = 0; localIndex < blueprint.perCell; localIndex += 1) {
      const question = buildQuestion(blueprint, localIndex, bank.length, blueprint.difficulty);
      bank.push({ ...question, variationCount: 1 });
    }
  }
  validateBank(bank);
  validateCoverage(bank);
  return bank;
}

function distractorRationale(question, option) {
  if (question.subcategory === "Prepositions") return `\"${option}\" does not fit this time, place, or relationship.`;
  if (question.subcategory === "Verb tense") return `\"${option}\" does not match the time meaning in the sentence.`;
  if (question.subcategory === "Articles") return `\"${option}\" does not fit the noun phrase here.`;
  if (question.subcategory === "Count and noncount nouns") return `\"${option}\" does not fit this noun.`;
  if (question.subcategory === "Subject-verb agreement") return `\"${option}\" does not match the subject correctly.`;
  if (question.subcategory === "Modals") return `\"${option}\" does not express the needed modal meaning in this sentence.`;
  if (question.subcategory === "Comparatives") return `\"${option}\" is not the correct comparison form.`;
  if (question.subcategory === "Clauses and connectors") return `\"${option}\" does not connect the two ideas with the right relationship.`;
  if (question.subcategory === "Conditionals") return `\"${option}\" does not match the condition pattern in the sentence.`;
  if (question.subcategory === "Passive voice") return `\"${option}\" does not form the passive verb phrase needed here.`;
  if (question.subcategory === "Relative clauses") return `\"${option}\" does not correctly link the added information to the noun.`;
  if (question.subcategory === "Reported speech") {
    if (question.answer.includes(" would ")) return "This choice does not use \"would\" plus the base verb to report the scheduled future event.";
    return `\"${option}\" does not report the original idea with correct word order and verb form.`;
  }
  if (question.subcategory === "Reduced clauses") return `\"${option}\" does not form a grammatical reduced-clause sentence here.`;
  if (question.subcategory === "Advanced sentence structure") return `\"${option}\" has incorrect word order or missing structure words.`;
  if (question.subcategory === "Gerunds and infinitives") return `\"${option}\" does not fit the verb pattern in this sentence.`;
  if (question.subcategory === "Question forms") return `\"${option}\" does not use the correct question word order.`;
  if (question.subcategory === "Pronouns and reference") return `\"${option}\" does not clearly refer to the right person or thing.`;
  if (question.subcategory === "Determiners and quantifiers") return `\"${option}\" does not fit this noun or amount.`;
  if (question.subcategory === "Adjective and adverb forms") return `\"${option}\" does not describe the right word correctly.`;
  if (question.subcategory === "Parallel structure") return `\"${option}\" does not keep the same pattern in the list.`;
  if (question.subcategory === "Inversion and emphasis") return `\"${option}\" does not use the correct formal word order.`;
  if (question.subcategory === "Subjunctive and unreal forms") return `\"${option}\" does not fit this formal request or requirement pattern.`;
  if (question.subcategory === "Sentence boundaries") return `\"${option}\" does not make the sentence complete and clear.`;
  if (question.subcategory === "Everyday vocabulary") return `\"${option}\" is a real meaning, but it is not the meaning of the word in this sentence.`;
  if (question.subcategory === "Workplace vocabulary") return `\"${option}\" does not match the work or office meaning used here.`;
  if (question.subcategory === "Word forms") return `\"${option}\" is from the word family, but it does not fit this sentence position.`;
  if (question.subcategory === "Collocations") return `\"${option}\" does not make the natural phrase in this sentence.`;
  if (question.subcategory === "Phrasal verbs") return `\"${option}\" does not complete the common verb phrase.`;
  if (question.subcategory === "Transitions") return `\"${option}\" does not show the intended relationship between the ideas.`;
  if (question.subcategory === "Meaning in context") return `\"${option}\" is a possible meaning in English, but not the meaning used in this sentence.`;
  if (question.subcategory === "Academic vocabulary") return `\"${option}\" does not match the academic or formal meaning used here.`;
  if (question.subcategory === "Register") return `\"${option}\" is understandable, but it is not the best formal choice.`;
  if (question.subcategory === "Nuance") return `\"${option}\" is not the most exact meaning in this context.`;
  if (question.subcategory === "Hedging and precision") return `\"${option}\" states the claim too strongly or too loosely for the evidence.`;
  if (question.subcategory === "Discourse function") return `\"${option}\" describes a text function, but not the role of this part of the text.`;
  return `\"${option}\" does not fit the grammar or meaning of this item.`;
}

function ensurePeriod(text) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function wordFormExplanation(question) {
  const { answer, taskText: task } = question;
  const details = {
    "am sad": 'Use "am" with the adjective "sad" to describe how "I" feel.',
    "is angry": 'Use "is" with the adjective "angry" to describe how "he" feels. "Anger" is a noun.',
    "am scared": '"Scared" describes the person feeling fear; "scary" describes something that causes fear.',
    "was surprised": '"Surprised" describes your reaction to the unexpected visit. "Surprising" would describe its cause.',
    "was disappointed": '"Disappointed" describes how you felt. "Disappointing" describes something that causes that feeling.',
    depressed: 'Use the adjective "depressed" to describe the person affected by the news. "Depressing" describes the news.',
    "annoying to": '"Annoying to me" describes the effect of the voices on you. The voices cause annoyance.',
    "was relieved": '"Relieved" describes how you felt when the worry ended; "relief" is the noun.',
    "are stressed": 'Use "are stressed" to describe how a person feels. "Stressful" describes a situation that causes stress.',
    "worried about": 'The expression is "worried about" a danger or problem.',
    "got worse": '"Got worse" describes a change to a less healthy condition after leaving hospital.',
    "very stressful": '"Stressful" describes an activity that causes stress. "Very" modifies this adjective.',
    "appreciative of": 'Use "appreciative of" before the thing you value: appreciative of your friendship.',
    able: 'The pattern is "be able to" plus the base verb. The sentence already contains "to walk".',
    amazing: '"Amazing" describes the prize that causes surprise; "amazed" describes a person who feels it.',
    chose: 'Use "chose," the past tense of "choose," for the completed decision. "Choice" is a noun.',
    clearly: 'Use the adverb "clearly" to describe how the instructions were written.',
    confidential: '"Keep" + object + adjective describes the state to maintain: keep information confidential.',
    optimistic: 'Use the adjective "optimistic" after "made investors more" to describe their outlook.',
    height: '"His" needs a noun here. "Height" names how tall someone is; "high" and "tall" are adjectives.',
    skills: 'The plural noun "skills" is the subject of the plural verb "are."',
    effort: 'The noun "effort" names the work needed, alongside "time."',
    economy: 'The noun "economy" is the subject of "has been improving." "Economic" and "economical" are adjectives.',
    speech: 'The noun "speech" names the talk that is ending before the audience asks questions.'
  };
  if (details[answer]) return `${details[answer]} ${task.replace("___", answer)}`;
  const adjectives = new Set(["successful", "detailed", "direct", "confident", "practical"]);
  const role = adjectives.has(answer)
    ? (/___ (answer|explanation|solution)/.test(task) ? 'an adjective describing the following noun' : 'an adjective describing the subject after a form of "be"')
    : 'a noun naming the action, result, or thing in this noun phrase';
  return `Use "${answer}" as ${role}. The completed sentence is: ${task.replace("___", answer)}`;
}

function completedFeedback(question) {
  if (question.taskText.includes("___")) {
    const answer = question.answer === "(nothing)" ? "" : question.answer;
    const completed = question.taskText.replace("___", answer).replace(/ {2,}/g, " ").trim();
    return ` The completed sentence is: ${completed}`;
  }
  if (/[.!?]$/.test(question.answer)) return ` The correct sentence is: ${question.answer}`;
  return "";
}

function explanationWithCompletion(question, reason) {
  return `${reason}${completedFeedback(question)}`;
}

function explainAnswer(question) {
  const answer = question.answer;
  const task = question.taskText;
  const normalizedTask = normalizeQuestionText(task);

  if (question.subcategory === "Prepositions") {
    if (answer === "on" && /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/.test(task)) return explanationWithCompletion(question, "We use \"on\" with days: on Monday, on Saturday.");
    if (answer === "at" && /\d/.test(task)) return explanationWithCompletion(question, "We use \"at\" with clock times: at 9:30, at 2:15.");
    if (answer === "in" && /\b(January|February|March|April|May|June|July|August|September|October|November|December|Paris|London|Tokyo|Boston)\b/.test(task)) return explanationWithCompletion(question, "We use \"in\" with months, cities, and larger places.");
    if (answer === "by" && /___ (train|bus|car|plane)\b/.test(task)) return explanationWithCompletion(question, '"By" followed by a vehicle without an article names the means of transport: by train, by bus.');
    if (answer === "by") return explanationWithCompletion(question, "\"By\" means no later than a time or day.");
    return explanationWithCompletion(question, `\"${answer}\" is the small word that fits this sentence.`);
  }

  if (question.subcategory === "Verb tense") {
    if (normalizedTask.includes("yesterday") || normalizedTask.includes("last year")) return explanationWithCompletion(question, "The time word shows a finished past action, so the past form is needed.");
    if (normalizedTask.includes("every monday")) return explanationWithCompletion(question, "This is a repeated action, so the present simple form is needed.");
    if (normalizedTask.includes("recently") || normalizedTask.includes("since")) return explanationWithCompletion(question, "The sentence connects a past time with now, so a present perfect form fits.");
    return explanationWithCompletion(question, "The verb form must match the time meaning in the sentence.");
  }

  if (question.subcategory === "Articles") return explanationWithCompletion(question, "The small word before the noun must fit the sound and meaning of the noun phrase.");
  if (question.subcategory === "Count and noncount nouns") return explanationWithCompletion(question, "The amount word must fit whether the noun can be counted.");
  if (question.subcategory === "Subject-verb agreement") return explanationWithCompletion(question, "The subject and verb must match in number.");
  if (question.subcategory === "Modals") return explanationWithCompletion(question, `"${answer}" fits the meaning and grammar of the modal phrase.`);
  if (question.subcategory === "Comparatives") return explanationWithCompletion(question, "The sentence compares two things, so the comparative form is needed.");
  if (question.subcategory === "Clauses and connectors" || question.subcategory === "Transitions") return explanationWithCompletion(question, "The answer connects the ideas with the intended meaning.");
  if (question.subcategory === "Conditionals") return explanationWithCompletion(question, "The answer must match the condition in the first part of the sentence.");
  if (question.subcategory === "Passive voice") return explanationWithCompletion(question, "The focus is on the thing receiving the action, so passive voice is needed.");
  if (question.subcategory === "Relative clauses") return answer === "whose" ? explanationWithCompletion(question, '"Whose" introduces something belonging to the person just mentioned.') : explanationWithCompletion(question, `"${answer}" links the description to the person or thing.`);
  if (question.subcategory === "Reported speech") {
    if (normalizedTask.includes("starts next week")) return "Because the start was still in the future, \"starts\" changes to \"would start,\" and \"next week\" changes to \"the following week.\"";
    if (normalizedTask.includes("arrives today")) return "Because the arrival was still in the future, \"arrives\" changes to \"would arrive,\" and \"today\" changes to \"that day.\"";
    const reportedFuture = answer.match(/\bwould ([a-z]+)\b/i);
    if (reportedFuture) return `The quote describes a scheduled future event. From a past viewpoint, use \"would\" plus the base verb: \"would ${reportedFuture[1]}.\"`;
    return explanationWithCompletion(question, "The answer reports the original words clearly and naturally.");
  }
  if (question.subcategory === "Reduced clauses") return explanationWithCompletion(question, "This is the only option with correct grammar.");
  if (question.subcategory === "Advanced sentence structure") return explanationWithCompletion(question, "Only this option has natural English word order and grammar.");
  if (question.subcategory === "Gerunds and infinitives") return explanationWithCompletion(question, "Some verbs and adjectives need an -ing form, and some need to plus a verb.");
  if (question.subcategory === "Question forms") return explanationWithCompletion(question, "The question needs the correct helper word and word order.");
  if (question.subcategory === "Pronouns and reference") return explanationWithCompletion(question, "The pronoun must clearly point to the right person or thing.");
  if (question.subcategory === "Determiners and quantifiers") return explanationWithCompletion(question, "The amount word must fit the noun and meaning.");
  if (question.subcategory === "Adjective and adverb forms") return explanationWithCompletion(question, "The describing word must fit what it describes.");
  if (question.subcategory === "Parallel structure") return explanationWithCompletion(question, "The answer keeps the same pattern in each part of the list.");
  if (question.subcategory === "Inversion and emphasis") return explanationWithCompletion(question, "The opening phrase changes the word order in this formal sentence.");
  if (question.subcategory === "Subjunctive and unreal forms") return explanationWithCompletion(question, "This formal pattern uses the base form after the request or requirement.");
  if (question.subcategory === "Sentence boundaries") return explanationWithCompletion(question, "The answer joins or separates the ideas as a complete sentence.");
  if (question.subcategory === "Everyday vocabulary" || question.subcategory === "Nuance" || question.subcategory === "Meaning in context" || question.subcategory === "Academic vocabulary") return `\"${answer}\" best matches the meaning in this item.`;
  if (question.subcategory === "Workplace vocabulary") return `\"${answer}\" fits the work or office meaning in this sentence.`;
  if (question.subcategory === "Word forms") return wordFormExplanation(question);
  if (question.subcategory === "Collocations") return `\"${answer}\" makes the natural English phrase.`;
  if (question.subcategory === "Phrasal verbs") return `\"${answer}\" completes the common verb phrase.`;
  if (question.subcategory === "Register") return "This option is the most formal and professional.";
  if (question.subcategory === "Hedging and precision") return "This option makes a careful claim without saying too much.";
  if (question.subcategory === "Discourse function") return "This option clearly states one reasonable problem with the study.";

  return `\"${answer}\" is the best answer for this item.`;
}

function formatAnswerForFeedback(answer) {
  return /[.!?]$/.test(answer) ? answer : `${answer}.`;
}

function answerFeedback(question, selected) {
  if (selected === question.answer) return `Correct. ${question.explanation}`;
  return ["Not quite.", question.rationales[selected],
    `Correct answer: ${formatAnswerForFeedback(question.answer)}`, question.explanation].filter(Boolean).join("\n");
}

function helpfulSetup(text, blueprint, index = 0, made = {}) {
  const subcategory = made.subcategory || blueprint.subcategory;
  const hasBlank = text.includes("___");

  if (blueprint.code === "s-correct-sentence") {
    return pick([
      "Read all four choices. Only one sentence is correct.",
      "Choose the sentence that sounds natural and correct.",
      "Look for the sentence with clear English grammar.",
      "Only one choice is a good English sentence."
    ], index);
  }

  if (blueprint.code === "g-subject-verb") {
    return pick([
      "The subject and verb must fit together.",
      "Look for the sentence where the subject and verb match.",
      "Only one choice has the right verb for the subject.",
      "Read the subject first, then check the verb."
    ], index);
  }

  if (blueprint.code === "g-reported-speech") {
    return pick([
      "Change the quoted words into a sentence with said that.",
      "Tell another person what was said earlier.",
      "Choose the sentence that keeps the meaning of the quote.",
      "The answer should report the quote clearly."
    ], index);
  }

  if (blueprint.code === "g-inversion") {
    return pick([
      "Look for the sentence with natural formal word order.",
      "Only one choice has the correct formal word order.",
      "Read the opening words and check the word order after them.",
      "Choose the formal sentence that sounds correct."
    ], index);
  }

  if (blueprint.code === "g-reduced-clauses") {
    return pick([
      "Read each option and check the grammar.",
      "Only one choice is a complete, correct sentence.",
      "Look for the form that fits the noun before it.",
      "The answer should be a correct English sentence."
    ], index);
  }

  if (blueprint.code === "v-register") {
    return pick([
      "Choose the sentence that fits formal writing.",
      "The answer should sound professional and polite.",
      "Read each choice and choose the best report style.",
      "Only one sentence is best for formal writing."
    ], index);
  }

  if (blueprint.code === "v-hedging") {
    return pick([
      "Choose the careful sentence that is not too strong.",
      "The answer should avoid saying more than the evidence shows.",
      "Look for the sentence that sounds careful and precise.",
      "The best choice makes a careful claim."
    ], index);
  }

  if (blueprint.code === "v-discourse") {
    return pick([
      "Choose the sentence that clearly names one study problem.",
      "The answer should describe one limitation without exaggeration.",
      "Look for the choice that states a reasonable problem.",
      "The best choice explains one weakness in the study."
    ], index);
  }

  if (blueprint.code === "v-easy-synonym") {
    return pick([
      "Choose the word with almost the same meaning.",
      "Find the closest simple meaning.",
      "Choose the word that means almost the same thing.",
      "Read the word and choose its closest match."
    ], index);
  }

  if (blueprint.code === "v-nuance") {
    return pick([
      "Choose the closest meaning.",
      "Pick the meaning that best matches the word.",
      "Choose the most exact meaning.",
      "The answer should match the word's usual meaning."
    ], index);
  }

  if (!hasBlank && isSentenceChoiceTask(text)) {
    return pick([
      "Read all four choices before you answer.",
      "Only one choice is a complete, correct sentence.",
      "Choose the sentence that has clear English grammar.",
      "The answer should sound natural and correct."
    ], index);
  }

  if (isMeaningTask(text)) {
    return pick([
      "Read the sentence and choose the meaning.",
      "Use the full sentence to understand the word.",
      "Choose the meaning that fits this sentence.",
      "Read the whole sentence before choosing."
    ], index);
  }

  if (blueprint.code === "g-present-simple") {
    return pick([
      "The sentence describes a regular Monday action.",
      "This action happens every Monday.",
      "The time words show a weekly habit.",
      "Choose the verb form for a repeated action.",
      "The sentence is about something that happens again and again.",
      "Use the verb form that fits a weekly routine."
    ], index);
  }
  if (blueprint.code === "g-past-simple") {
    return pick([
      "The sentence is about one action before lunch yesterday.",
      "The time word shows the action is finished.",
      "Choose the verb form for a completed past action.",
      "The sentence tells what happened yesterday.",
      "Use the verb form that fits a finished action.",
      "The action happened at one past time."
    ], index);
  }
  if (blueprint.code === "g-first-conditional") {
    return pick([
      "The first part gives a real future condition.",
      "Choose the result that fits the future condition.",
      "Read the if part, then complete the result.",
      "The sentence talks about a possible future result."
    ], index);
  }
  if (blueprint.code === "g-second-conditional") {
    return pick([
      "The sentence imagines a different situation.",
      "The if part is not about a real plan.",
      "Choose the result that fits an imagined situation.",
      "The sentence talks about what could happen in a different case."
    ], index);
  }

  const setups = {
    Articles: ["Choose the small word that fits the noun.", "Look at the noun and choose the best answer.", "Choose the answer that sounds natural before the noun.", "Read the whole sentence before choosing."],
    Prepositions: ["Choose the small word that fits the sentence.", "Read the whole sentence before choosing.", "Choose the answer that sounds natural in the sentence.", "Choose the best answer."],
    "Count and noncount nouns": ["Think about whether the noun can be counted.", "Choose the amount word that fits the noun.", "Choose the answer that sounds natural with the noun.", "Read the whole sentence before choosing."],
    "Subject-verb agreement": ["Each option describes the same idea with different grammar.", "Choose the sentence where the subject and verb fit.", "The subject controls the verb form.", "Only one option has a matching subject and verb."],
    Modals: ["A rule or notice is giving an instruction.", "The sentence says what people are required to do.", "Choose the helping verb that shows a requirement.", "The sentence gives a rule, not a preference."],
    Comparatives: ["The sentence compares two things.", "Choose the form used to compare two things.", "The answer should fit the comparison.", "Look at both things being compared."],
    "Clauses and connectors": ["Choose the phrase that fits the sentence.", "The answer must connect clearly with the rest of the sentence.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Passive voice": ["The sentence describes what happened to a document yesterday.", "The focus is on the thing, not the person.", "Choose the form that shows the document received the action.", "The by phrase names who did the action."],
    "Relative clauses": ["The sentence gives more information about a person.", "Choose the word that connects the extra information.", "Choose the word that shows possession.", "Read the whole sentence before choosing."],
    "Reported speech": ["A person is telling someone what another person said earlier.", "Choose the sentence that reports the direct quote.", "The original words are being retold later.", "The answer should sound like reported information."],
    "Reduced clauses": ["Choose the sentence with correct grammar.", "Only one choice is a complete, correct sentence.", "Look for the form that fits the noun before it.", "The answer should be a correct English sentence."],
    "Advanced sentence structure": ["Choose the sentence with clear word order.", "Read the whole sentence before choosing.", "The answer should make a natural sentence.", "Choose the best answer."],
    "Gerunds and infinitives": ["Choose the verb pattern that sounds natural.", "Read the word before the blank, then choose the best form.", "The answer should fit the verb pattern.", "Choose the best answer."],
    "Question forms": ["Choose the question with natural word order.", "Only one choice is a clear question.", "Check the helper word and word order.", "Choose the best question."],
    "Pronouns and reference": ["Choose the word that clearly points to the right person or thing.", "The answer should make the meaning clear.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Determiners and quantifiers": ["Choose the amount word that fits the noun.", "The answer should fit the amount meaning.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Adjective and adverb forms": ["Choose the form that describes the right word.", "The answer should sound natural in the sentence.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Parallel structure": ["Choose the sentence with the same pattern in each part.", "The list should use matching forms.", "Read all parts of the sentence before choosing.", "Choose the sentence with matching structure."],
    "Inversion and emphasis": ["Look for the sentence with natural formal word order.", "Read the opening words and check the word order after them.", "Only one choice has the correct formal word order.", "Choose the best sentence."],
    "Subjunctive and unreal forms": ["Choose the formal verb form that fits.", "The sentence gives a request or requirement.", "Read the formal pattern before choosing.", "Choose the best answer."],
    "Sentence boundaries": ["Choose the complete sentence.", "The answer should join the ideas clearly.", "Read both ideas before choosing.", "Choose the sentence with clear punctuation and grammar."],
    "Everyday vocabulary": ["Choose the word with the same meaning.", "Find the closest simple meaning.", "Choose the matching everyday word.", "The answer should mean almost the same thing."],
    "Workplace vocabulary": ["Use the office-message meaning of the word.", "Choose the meaning that fits a work message.", "Think about how this word is used at work.", "The answer should fit an office context."],
    "Word forms": ["Choose the form of the word that fits the sentence.", "The sentence needs the right word-family form.", "Choose the noun, verb, or -ing form that fits.", "The words are from the same family."],
    Collocations: ["Choose the word that naturally goes with the phrase.", "Only one word makes a common phrase.", "Choose the word pair that sounds natural.", "The answer should make a common English phrase."],
    "Phrasal verbs": ["Choose the phrase that sounds natural.", "Read the whole sentence before choosing.", "Choose the word or phrase that fits everyday English.", "The answer completes a common English phrase."],
    Transitions: ["Choose the word that shows how the ideas connect.", "Read both ideas before you answer.", "Choose the linking word that fits the relationship.", "The answer should show the right connection."],
    "Meaning in context": ["Use the sentence to choose the meaning of the quoted word.", "The sentence gives the clue for the word meaning.", "Choose the meaning that fits this sentence.", "The answer should match the quoted word in context."],
    "Academic vocabulary": ["Choose the school or work meaning of the word.", "The answer should fit formal reading.", "Choose the meaning used in study or work texts.", "Think about how the word is used in reports or lessons."],
    Register: ["Choose the sentence that fits formal writing.", "The answer should sound appropriate in a report.", "Choose the most professional sentence.", "The best option has a formal tone."],
    Nuance: ["Choose the closest meaning.", "Pick the meaning that best matches the word.", "Choose the most exact meaning.", "The answer should match the word's usual meaning."],
    "Hedging and precision": ["Choose the careful sentence that is not too strong.", "The best sentence avoids overclaiming.", "Choose the sentence that sounds cautious and precise.", "The answer should make a careful claim."],
    "Discourse function": ["Choose the sentence that states a study problem clearly.", "The answer should describe a limitation.", "Choose the sentence that explains one weakness in the study.", "The best option names a problem without exaggeration."]
  };

  if (hasBlank) return pick(setups[subcategory] || ["Read the whole sentence before choosing.", "Choose the answer that fits the sentence.", "Choose the best answer.", "The answer should sound natural in the sentence."], index);

  return pick([
    "Read the question and all four choices.",
    "Choose the answer that best fits the sentence.",
    "Use the whole sentence before choosing.",
    "Only one answer should fit clearly."
  ], index);
}

function incrementCount(counts, key) {
  counts[key] = (counts[key] || 0) + 1;
}

function item(text, options, answer, focusKey = "", setup = "", metadata = {}) {
  return { text, options, answer, focusKey, setup, ...metadata };
}

function learnerSubcategory(subcategory) {
  return learnerSubcategoryLabels[subcategory] || subcategory;
}

function normalizeQuestionText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function orderOptionsWithBalancedAnswerPosition(options, answer, positionCounts) {
  const unique = uniqueOptions(options);
  const answerIndex = unique.indexOf(answer);
  if (answerIndex === -1 || unique.length < 2) return shuffleRandom(unique);

  const answerPosition = chooseBalancedAnswerPosition(positionCounts, unique.length);
  const distractors = shuffleRandom(unique.filter((option) => option !== answer));
  const ordered = [];
  for (let index = 0; index < unique.length; index += 1) {
    ordered.push(index === answerPosition ? answer : distractors.shift());
  }
  return ordered.filter((option) => option !== undefined);
}

function pick(values, index, offset = 0) {
  return values[(index + offset) % values.length];
}

function questionSignature(question) {
  if (question._catalogue) return question.id;
  const optionKey = question.options.map(normalizeQuestionText).sort().join(" | ");
  return normalizeQuestionText(question.taskText) + " || " + optionKey;
}

function randomInt(max) {
  if (window.crypto && window.crypto.getRandomValues) {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return values[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function rationalesForOptions(question) {
  return question.options.reduce((rationales, option) => {
    rationales[option] = option === question.answer
      ? question.explanation
      : distractorRationale(question, option);
    return rationales;
  }, {});
}

function recordAnswerPosition(options, answer, positionCounts) {
  const index = options.indexOf(answer);
  if (index >= 0) positionCounts[index] = (positionCounts[index] || 0) + 1;
}

function shuffleRandom(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleStable(items, seed) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = (seed + i * 7) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function splitTaskText(text) {
  const colonIndex = text.indexOf(": ");
  if (colonIndex > -1) {
    return {
      instruction: ensurePeriod(text.slice(0, colonIndex)),
      target: text.slice(colonIndex + 2)
    };
  }

  const meaningMatch = text.match(/^(What does "[^"]+" (?:mean|do) in this [^?]+\?)\s+(.+)$/);
  if (meaningMatch) {
    return {
      instruction: meaningMatch[1],
      target: meaningMatch[2]
    };
  }

  if (/^(Choose|Which)\b/.test(text)) {
    return {
      instruction: text,
      target: ""
    };
  }

  return {
    instruction: "Choose the best answer.",
    target: text
  };
}

function uniqueOptions(options) {
  return [...new Set(options)];
}

function isSentenceChoiceTask(text) {
  return /^(Choose|Which|Pick|Find)\b/i.test(text) && !text.includes(": ");
}

function isMeaningTask(text) {
  return /^(What does|Which sentence is most appropriate|Which sentence is careful|Which sentence says)/i.test(text);
}

function validateBank(bank) {
  const textSet = new Set();
  const difficultyByText = {};
  const focusCounts = {};
  const issues = [];
  bank.forEach((question) => {
    const key = questionSignature(question);
    textSet.add(key);
    if (!difficultyByText[key]) difficultyByText[key] = [];
    difficultyByText[key].push(question.difficulty);
    if (question.focusKey) focusCounts[question.focusKey] = (focusCounts[question.focusKey] || 0) + 1;
    if (!question.options.includes(question.answer)) issues.push(`Missing answer: ${question.id}`);
    if (new Set(question.options).size !== question.options.length) issues.push(`Duplicate option: ${question.id}`);
    // Capitals can be the tested distinction; whitespace-only differences cannot.
    if (new Set(question.options.map(option => option.replace(/\s+/g, " ").trim())).size !== question.options.length) issues.push(`Duplicate normalized option: ${question.id}`);
    if (question.options.length !== 4) issues.push(`Wrong option count: ${question.id}`);
    if (!question.category || !question.subcategory || !question.difficulty) issues.push(`Missing metadata: ${question.id}`);
    if (!question.setupText || !question.taskText) issues.push(`Missing display parts: ${question.id}`);
    if (!question.sentence || question.sentence !== question.taskText) issues.push(`Missing structured sentence: ${question.id}`);
    if (!question.explanation) issues.push(`Missing explanation: ${question.id}`);
    if (!question.rationales || question.options.some((option) => !question.rationales[option])) issues.push(`Missing option rationale: ${question.id}`);
    if (question.rationales && Object.keys(question.rationales).some((option) => !question.options.includes(option))) issues.push(`Rationale for an absent option: ${question.id}`);
    if (!itemDataSchema.qaStatusValues.includes(question.qaStatus)) issues.push(`Invalid QA status: ${question.id}`);
    if (question.qaStatus === "reviewed" && (!question.reviewer || !question.reviewDate)) issues.push(`Missing review attribution: ${question.id}`);
    const missingStructuredField = itemDataSchema.generatedFields.find((field) => question[field] === undefined || question[field] === null || question[field] === "");
    if (missingStructuredField) issues.push(`Missing structured field ${missingStructuredField}: ${question.id}`);
    if (!learnerSubcategoryLabels[question.subcategory]) issues.push(`Missing learner label: ${question.subcategory}`);
    if (question.options.includes("no article")) issues.push(`Use (nothing), not no article: ${question.id}`);
  });
  const focusClumps = Object.entries(focusCounts).filter(([, count]) => count > 8);
  if (focusClumps.length) {
    const examples = focusClumps.slice(0, 5).map(([key, count]) => `${key} (${count})`).join(", ");
    issues.push(`Repeated focus terms: ${examples}`);
  }
  const levelDrift = Object.entries(difficultyByText).filter(([, levels]) => Math.max(...levels) - Math.min(...levels) > 0.35);
  if (levelDrift.length) {
    issues.push(`Repeated item has inconsistent levels: ${levelDrift.length}`);
  }
  if (textSet.size < TOTAL_QUESTIONS) {
    issues.push(`Too few unique question signatures: ${textSet.size}`);
  }
  if (issues.length) throw new Error(`Question bank failed QA: ${issues.slice(0, 5).join(" | ")}`);
}

// These pattern matches cannot judge context, dialect, or an intentionally wrong
// option. Keep them available to editors without treating them as grammar rules.
function editorialWarnings(question) {
  const warnings = [];
  if (normalizeQuestionText(question.setupText).startsWith("during ")) warnings.push("Check whether the setup is meaningful context");
  const setupProblem = forbiddenSetupTerms.find((term) => normalizeQuestionText(question.setupText).includes(term));
  if (setupProblem) warnings.push(`Check setup context: ${setupProblem}`);
  const technicalTerm = forbiddenPromptTerms.find((term) => normalizeQuestionText(question.taskText).includes(term));
  if (technicalTerm) warnings.push(`Check instruction vocabulary: ${technicalTerm}`);
  if (hasArticleAmbiguity(question)) warnings.push("Check article reference in context");
  if (hasPluralCountQuantifierAmbiguity(question)) warnings.push("Check quantifier alternatives in context");
  if (hasKnownAnswerAmbiguity(question)) warnings.push("Check potentially acceptable alternative");
  if (hasKnownAwkwardPhrase(question)) warnings.push("Check phrase and whether it is an intentional distractor");
  const displayProblem = hasDisplayGuidanceProblem(question);
  if (displayProblem) warnings.push(displayProblem);
  return warnings;
}

function validateCoverage(bank) {
  const learning = window.EnglishRoadLearning;
  if (!learning) throw new Error("Question bank coverage check requires learning levels.");
  const topics = Object.keys(learnerSubcategoryLabels);
  const signatures = new Set(bank.map(questionSignature));
  const expectedTopicLevelItems = ACTIVE_BANK_SIZE / (topics.length * learning.levels.length);
  const issues = [];
  if (bank.length !== ACTIVE_BANK_SIZE) issues.push(`Expected ${ACTIVE_BANK_SIZE} active items, found ${bank.length}`);
  if (signatures.size !== bank.length) issues.push(`Expected unique active items, found ${signatures.size} unique signatures`);
  for (const topic of topics) {
    for (const level of learning.levels) {
      const count = bank.filter((question) => question.subcategory === topic && learning.levelForDifficulty(question.difficulty) === level).length;
      if (count < MIN_LEVEL_TOPIC_ITEMS) issues.push(`${topic} / ${level}: ${count} items`);
      if (count !== expectedTopicLevelItems) issues.push(`${topic} / ${level}: expected ${expectedTopicLevelItems}, found ${count}`);
    }
  }
  if (issues.length) throw new Error(`Question bank failed coverage: ${issues.slice(0, 8).join(" | ")}`);
}

function hasKnownAnswerAmbiguity(question) {
  const task = normalizeQuestionText(question.taskText);
  const options = question.options.map(normalizeQuestionText);
  if (task === "we invited ten people, and ___ of them replied." && options.includes("each") && options.includes("most")) return true;
  if (/sentence.*complete|complete sentence/.test(task) && options.some((o) => ["and the class understood.", "so the clerk printed."].includes(o))) return true;
  if (task.includes("because i was tired") && options.includes("i was tired because i went to bed.")) return true;
  if (task.includes("___ a decision") && options.includes("take")) return true;
  if (task.includes("___ a presentation") && options.includes("make")) return true;
  if (task.includes("___ an agreement") && options.includes("make")) return true;
  if (task.includes("___ an application") && options.includes("make")) return true;
  if (task.includes("___ a report") && options.includes("make")) return true;
  if (task.includes("his mother was angry") && options.includes("then")) return true;
  if (task.includes("the old copy machine") && options.includes("will discuss replacement of")) return true;
  if (task.includes("please ___ the contract") && (options.includes("write on") || options.includes("put") || options.includes("add"))) return true;
  return task.includes("due ___ the end of the week") && question.options.includes("at") && question.options.includes("by");
}

function hasArticleAmbiguity(question) {
  const answer = normalizeQuestionText(question.answer);
  const options = question.options.map(normalizeQuestionText);
  return ["a", "an"].includes(answer) && (options.includes("the") || options.includes("some"));
}

function hasPluralCountQuantifierAmbiguity(question) {
  const broadPluralQuantifiers = new Set(["some", "many", "several", "a few"]);
  const answer = normalizeQuestionText(question.answer);
  if (!broadPluralQuantifiers.has(answer)) return false;
  const plausibleOptions = question.options
    .map(normalizeQuestionText)
    .filter((option) => broadPluralQuantifiers.has(option));
  if (plausibleOptions.length < 2) return false;

  const afterBlank = normalizeQuestionText(question.taskText).split("___")[1] || "";
  const nextWord = (afterBlank.match(/[a-z]+/) || [""])[0];
  const noncountOrIrregularWords = new Set([
    "advice",
    "equipment",
    "evidence",
    "feedback",
    "furniture",
    "homework",
    "information",
    "money",
    "news",
    "paper",
    "research",
    "series",
    "species",
    "traffic",
    "water"
  ]);
  return nextWord.endsWith("s") && !noncountOrIrregularWords.has(nextWord);
}

function hasKnownAwkwardPhrase(question) {
  const text = normalizeQuestionText([question.taskText, question.options.join(" "), question.answer].join(" "));
  const awkwardPhrases = [
    "call the messages",
    "called the messages",
    "calls the messages",
    "calling the messages",
    "join the reports",
    "joined the reports",
    "joins the reports",
    "open the appointments",
    "opened the appointments",
    "opens the appointments"
  ];
  return awkwardPhrases.some((phrase) => text.includes(phrase));
}

function hasDisplayGuidanceProblem(question) {
  const setup = normalizeQuestionText(question.setupText);
  const task = normalizeQuestionText(question.taskText);
  const answerText = normalizeQuestionText([question.taskText, question.options.join(" | ")].join(" "));
  const taskHasBlank = question.taskText.includes("___");
  const confusingSetupPhrases = [
    "after the blank",
    "before and after",
    "around the blank",
    "words after",
    "words before",
    "words around",
    "noun after",
    "the blank comes"
  ];
  if (confusingSetupPhrases.some((phrase) => setup.includes(phrase))) return "Setup uses confusing blank-position wording";
  if (setup.includes("blank") && !taskHasBlank) return "Setup mentions a blank, but the item has no blank";
  if (task.startsWith("in school or work reading") || task.startsWith("in an office message")) return "Meaning item lacks a real example sentence";
  if (setup.includes("only after") && !answerText.includes("only after")) return "Setup mentions Only after for an unrelated item";
  if (task.includes("coordinator will ___ instructions")) return "Instructions item has an unnatural actor";
  if (task.startsWith("choose the best words") && !taskHasBlank) return "Best-words item needs a cloze blank";
  if (task.includes("choose the best answer") && !taskHasBlank && question.options.every((option) => !/[.!?]$/.test(option))) {
    return "Fragment options need a cloze sentence";
  }
  return "";
}

function bankRevision(bank) {
  if (window.EnglishRoadBank && bank.every(q => q._catalogue)) return window.EnglishRoadBank.revision;
  // Context and feedback are part of an attempt too, not just its answer key.
  const content = JSON.stringify(bank.map((q) => [q.id, q.setupText, q.taskText, q.options, q.answer, q.explanation,
    q.options.map((option) => q.rationales?.[option]), q.category, q.subcategory, q.difficulty]));
  let hash = 2166136261;
  for (let index = 0; index < content.length; index += 1) hash = Math.imul(hash ^ content.charCodeAt(index), 16777619) >>> 0;
  return `bank-${hash.toString(16)}`;
}

window.EnglishRoadQuestions = Object.freeze({
  bankRevision, editorialWarnings, answerFeedback,
  buildQuestion, chooseBalancedAnswerPosition, clamp, contextualize, copyText, createQuestionBank, distractorRationale, ensurePeriod, escapeHtml, explainAnswer, formatAnswerForFeedback, helpfulSetup, incrementCount, item, learnerSubcategory, normalizeQuestionText, orderOptionsWithBalancedAnswerPosition, pick, questionSignature, randomInt, rationalesForOptions, recordAnswerPosition, shuffleRandom, shuffleStable, splitTaskText, uniqueOptions, isSentenceChoiceTask, isMeaningTask, validateBank, validateCoverage, hasKnownAnswerAmbiguity, hasArticleAmbiguity, hasPluralCountQuantifierAmbiguity, hasKnownAwkwardPhrase, hasDisplayGuidanceProblem, learnerSubcategoryLabels, itemDataSchema
});
})();
