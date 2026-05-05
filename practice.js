const PRACTICE_LENGTH = 25;
const CORE_BANK_SIZE = 1500;
const SUPPLEMENTAL_BANK_SIZE = 700;
const TEST_MIRRORS = ["TOEFL", "IELTS", "TOEIC", "CEFR"];

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

const levelBands = {
  A1: { low: 1.0, high: 1.8 },
  A2: { low: 1.7, high: 2.6 },
  B1: { low: 2.4, high: 3.4 },
  B2: { low: 3.2, high: 4.4 },
  C1: { low: 4.2, high: 5.2 },
  C2: { low: 5.0, high: 6.1 }
};

const itemData = window.createEnglishRoadItemData({ pick, item });
const blueprints = itemData.blueprints;
const supplementalBlueprints = itemData.supplementalBlueprints;
const supplementalDifficultyRanges = itemData.supplementalDifficultyRanges;

const state = {
  bank: [],
  quiz: [],
  index: 0,
  selected: "",
  answered: false,
  level: "A2",
  responses: []
};

function createQuestionBank() {
  const bank = [];
  const blueprintCounts = {};
  for (let i = 0; i < CORE_BANK_SIZE; i += 1) {
    const blueprint = blueprints[i % blueprints.length];
    const localIndex = blueprintCounts[blueprint.code] || 0;
    blueprintCounts[blueprint.code] = localIndex + 1;
    bank.push(buildQuestion(blueprint, localIndex, i, jitterDifficulty(blueprint.difficulty, i)));
  }

  const supplementalCounts = {};
  for (let i = 0; i < SUPPLEMENTAL_BANK_SIZE; i += 1) {
    const globalIndex = CORE_BANK_SIZE + i;
    const blueprint = supplementalBlueprints[i % supplementalBlueprints.length];
    const localIndex = supplementalCounts[blueprint.code] || 0;
    supplementalCounts[blueprint.code] = localIndex + 1;
    bank.push(buildQuestion(blueprint, localIndex, globalIndex, supplementalDifficulty(blueprint, localIndex)));
  }
  return bank;
}

function buildQuestion(blueprint, localIndex, globalIndex, difficulty) {
  const made = blueprint.make(localIndex);
  const prompt = contextualize(made.text, blueprint, localIndex, made);
  const question = {
    id: `${blueprint.code}-${globalIndex + 1}`,
    blueprint: blueprint.code,
    category: made.category || blueprint.category,
    subcategory: made.subcategory || blueprint.subcategory,
    source: TEST_MIRRORS[globalIndex % TEST_MIRRORS.length],
    difficulty,
    sentence: prompt.task,
    setupText: prompt.setup,
    taskText: prompt.task,
    text: prompt.fullText,
    options: shuffleStable(uniqueOptions(made.options), globalIndex),
    answer: made.answer,
    focusKey: made.focusKey || "",
    qaStatus: made.qaStatus || "screened"
  };
  question.explanation = made.explanation || explainAnswer(question);
  question.rationales = made.rationales || rationalesForOptions(question);
  return question;
}

function item(text, options, answer, focusKey = "", setup = "", metadata = {}) {
  return { text, options, answer, focusKey, setup, ...metadata };
}

function contextualize(text, blueprint, index, made) {
  const setup = made.setup || helpfulSetup(text, blueprint, index, made);
  return {
    setup,
    task: text,
    fullText: `${setup} ${text}`
  };
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

  if (/^(What does|Which meaning)/i.test(text)) {
    return pick([
      "Read the whole sentence before choosing.",
      "Choose the meaning that fits this sentence.",
      "Use the sentence to understand the word.",
      "The answer should match the word in this sentence."
    ], index);
  }

  if (!hasBlank && /^(Choose|Which|Pick|Find)\b/i.test(text)) {
    return pick([
      "Read all four choices before you answer.",
      "Only one choice is a complete, correct sentence.",
      "Choose the sentence that sounds natural and correct.",
      "Read carefully before choosing."
    ], index);
  }

  const setups = {
    Articles: "Choose the small word that fits the noun.",
    Prepositions: "Choose the small word that fits the sentence.",
    "Count and noncount nouns": "Choose the amount word that fits the noun.",
    "Subject-verb agreement": "The subject and verb must fit together.",
    Modals: "Choose the helping verb that fits the meaning.",
    Comparatives: "The sentence compares two things.",
    "Clauses and connectors": "Choose the phrase that connects the sentence clearly.",
    Conditionals: "Read the if part, then choose the result.",
    "Passive voice": "The focus is on the thing receiving the action.",
    "Relative clauses": "Choose the word that connects the extra information.",
    "Reported speech": "Choose the sentence that reports the original words clearly.",
    "Reduced clauses": "Choose the shorter form that keeps the meaning.",
    "Advanced sentence structure": "Choose the sentence with clear word order.",
    "Everyday vocabulary": "Choose the word with the closest meaning.",
    "Workplace vocabulary": "Choose the meaning that fits work or office English.",
    "Word forms": "Choose the word-family form that fits.",
    Collocations: "Choose the word that makes a natural English phrase.",
    "Phrasal verbs": "Choose the phrase that sounds natural.",
    Transitions: "Choose the word that connects the ideas.",
    "Meaning in context": "Use the sentence to choose the meaning.",
    "Academic vocabulary": "Choose the school or work meaning.",
    Register: "Choose the sentence that fits formal writing.",
    Nuance: "Choose the closest meaning.",
    "Hedging and precision": "Choose the careful sentence that is not too strong.",
    "Discourse function": "Choose the sentence that clearly states the purpose."
  };
  return setups[subcategory] || "Choose the best answer.";
}

function explainAnswer(question) {
  const answer = question.answer;
  const task = question.taskText;
  const normalizedTask = normalizeQuestionText(task);

  if (question.subcategory === "Prepositions") {
    if (answer === "on" && /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/.test(task)) return "We use \"on\" with days: on Monday, on Saturday.";
    if (answer === "at" && /\d/.test(task)) return "We use \"at\" with clock times: at 9:30, at 2:15.";
    if (answer === "in" && /\b(January|February|March|April|May|June|July|August|September|October|November|December|Paris|London|Tokyo|Boston)\b/.test(task)) return "We use \"in\" with months, cities, and larger places.";
    if (answer === "by") return "\"By\" means no later than a time or day.";
    return `\"${answer}\" is the small word that fits this sentence.`;
  }

  if (question.subcategory === "Verb tense") {
    if (normalizedTask.includes("yesterday") || normalizedTask.includes("last year")) return "The time word shows a finished past action, so the past form is needed.";
    if (normalizedTask.includes("every monday")) return "This is a repeated action, so the present simple form is needed.";
    if (normalizedTask.includes("recently") || normalizedTask.includes("since")) return "The sentence connects a past time with now, so a present perfect form fits.";
    return "The verb form must match the time meaning in the sentence.";
  }

  if (question.subcategory === "Articles") return "The small word before the noun must fit the sound and meaning of the noun phrase.";
  if (question.subcategory === "Count and noncount nouns") return "The amount word must fit whether the noun can be counted.";
  if (question.subcategory === "Subject-verb agreement") return "The subject and verb must match in number.";
  if (question.subcategory === "Modals") return "\"Must\" shows a rule or requirement.";
  if (question.subcategory === "Comparatives") return "The sentence compares two things, so the comparison form is needed.";
  if (question.subcategory === "Clauses and connectors" || question.subcategory === "Transitions") return "The answer connects the ideas with the intended meaning.";
  if (question.subcategory === "Conditionals") return "The answer must match the condition in the first part of the sentence.";
  if (question.subcategory === "Passive voice") return "The focus is on the thing receiving the action, so passive voice is needed.";
  if (question.subcategory === "Relative clauses") return "\"Whose\" shows that something belongs to the person.";
  if (question.subcategory === "Reported speech") return "The answer reports the original words clearly and naturally.";
  if (question.subcategory === "Reduced clauses") return "The answer keeps the meaning while using a shorter grammatical form.";
  if (question.subcategory === "Advanced sentence structure") return "Only this option has natural English word order and grammar.";
  if (question.subcategory === "Everyday vocabulary" || question.subcategory === "Nuance" || question.subcategory === "Meaning in context" || question.subcategory === "Academic vocabulary") return `\"${answer}\" best matches the meaning in this item.`;
  if (question.subcategory === "Workplace vocabulary") return `\"${answer}\" fits the work or office meaning in this sentence.`;
  if (question.subcategory === "Word forms") return "The sentence needs this form of the word family.";
  if (question.subcategory === "Collocations") return `\"${answer}\" makes the natural English phrase.`;
  if (question.subcategory === "Phrasal verbs") return `\"${answer}\" completes the common verb phrase.`;
  if (question.subcategory === "Register") return "This option is the most formal and professional.";
  if (question.subcategory === "Hedging and precision") return "This option makes a careful claim without saying too much.";
  if (question.subcategory === "Discourse function") return "This option clearly states one reasonable problem with the study.";
  return `\"${answer}\" is the best answer for this item.`;
}

function rationalesForOptions(question) {
  return question.options.reduce((rationales, option) => {
    rationales[option] = option === question.answer
      ? question.explanation
      : distractorRationale(question, option);
    return rationales;
  }, {});
}

function distractorRationale(question, option) {
  if (question.subcategory === "Prepositions") return `\"${option}\" does not fit this time, place, or relationship.`;
  if (question.subcategory === "Verb tense") return `\"${option}\" does not match the time meaning in the sentence.`;
  if (question.subcategory === "Articles") return `\"${option}\" does not fit the noun phrase here.`;
  if (question.subcategory === "Count and noncount nouns") return `\"${option}\" does not fit this noun.`;
  if (question.subcategory === "Subject-verb agreement") return `\"${option}\" does not match the subject correctly.`;
  if (question.subcategory === "Comparatives") return `\"${option}\" is not the correct comparison form.`;
  if (question.subcategory === "Collocations") return `\"${option}\" does not make the natural phrase in this sentence.`;
  if (question.subcategory === "Phrasal verbs") return `\"${option}\" does not complete the common verb phrase.`;
  return `\"${option}\" does not fit the grammar or meaning of this item.`;
}

function startPractice(event) {
  if (event) event.preventDefault();
  state.level = document.getElementById("levelSelect").value;
  state.quiz = selectQuizItems(state.level);
  state.index = 0;
  state.selected = "";
  state.answered = false;
  state.responses = [];
  renderPractice();
}

function selectQuizItems(level) {
  const band = levelBands[level] || levelBands.A2;
  const nearby = state.bank.filter((question) => question.difficulty >= band.low && question.difficulty <= band.high);
  const widened = state.bank.filter((question) => question.difficulty >= band.low - 0.35 && question.difficulty <= band.high + 0.35);
  const candidates = nearby.length >= PRACTICE_LENGTH ? nearby : widened;
  return balancedSample(candidates, PRACTICE_LENGTH);
}

function balancedSample(candidates, length) {
  const pool = shuffleRandom(candidates);
  const selected = [];
  const categoryCounts = {};
  const subcategoryCounts = {};
  const targetCategory = Math.ceil(length / 2);

  for (const item of pool) {
    if (selected.length >= length) break;
    const categoryCount = categoryCounts[item.category] || 0;
    const subcategoryCount = subcategoryCounts[item.subcategory] || 0;
    if (categoryCount >= targetCategory + 2) continue;
    if (subcategoryCount >= 4) continue;
    selected.push(item);
    incrementCount(categoryCounts, item.category);
    incrementCount(subcategoryCounts, item.subcategory);
  }

  for (const item of pool) {
    if (selected.length >= length) break;
    if (!selected.some((chosen) => chosen.id === item.id)) selected.push(item);
  }

  return selected.slice(0, length);
}

function renderPractice() {
  const item = state.quiz[state.index];
  renderSidePanel();
  if (!item) {
    renderCompletion();
    return;
  }

  const displayNumber = state.index + 1;
  document.getElementById("practiceNumber").textContent = String(displayNumber);
  document.getElementById("practiceTotal").textContent = String(PRACTICE_LENGTH);
  document.getElementById("practiceMeter").style.width = `${(displayNumber / PRACTICE_LENGTH) * 100}%`;
  document.getElementById("practiceMeta").innerHTML = [
    item.category,
    learnerSubcategory(item.subcategory),
    state.level,
    `Level ${item.difficulty.toFixed(1)}`
  ].map((label) => `<span class="tag">${escapeHtml(label)}</span>`).join("");

  const parts = splitTaskText(item.taskText);
  document.getElementById("practicePrompt").innerHTML = `
    <div class="prompt-help">
      <span class="part-label">Helpful information</span>
      ${escapeHtml(item.setupText)}
    </div>
    <div class="prompt-task">
      <span class="part-label">Answer this</span>
      <span class="instruction">${escapeHtml(parts.instruction)}</span>
      ${parts.target ? `<span class="sentence">${escapeHtml(parts.target)}</span>` : ""}
    </div>
  `;

  document.getElementById("practiceAnswers").innerHTML = item.options.map((option) => `
    <label class="answer-option">
      <input type="radio" name="practiceAnswer" value="${escapeHtml(option)}">
      <span>${escapeHtml(option)}</span>
    </label>
  `).join("");

  document.querySelectorAll("input[name='practiceAnswer']").forEach((input) => {
    input.addEventListener("change", (changeEvent) => {
      state.selected = changeEvent.target.value;
      document.getElementById("checkPracticeAnswer").disabled = false;
    });
  });

  document.getElementById("practiceFeedback").hidden = true;
  document.getElementById("checkPracticeAnswer").hidden = false;
  document.getElementById("checkPracticeAnswer").disabled = true;
  document.getElementById("nextPracticeItem").hidden = true;
}

function checkPracticeAnswer() {
  if (!state.selected || state.answered) return;
  const item = state.quiz[state.index];
  const correct = state.selected === item.answer;
  state.answered = true;
  state.responses.push({ id: item.id, category: item.category, subcategory: item.subcategory, correct });

  document.querySelectorAll(".answer-option").forEach((option) => {
    const input = option.querySelector("input");
    input.disabled = true;
    if (input.value === item.answer) option.classList.add("correct");
    if (input.checked && input.value !== item.answer) option.classList.add("incorrect");
  });

  renderFeedback(item, correct);
  renderSidePanel();
  document.getElementById("checkPracticeAnswer").hidden = true;
  const nextButton = document.getElementById("nextPracticeItem");
  nextButton.hidden = false;
  nextButton.textContent = state.index + 1 >= PRACTICE_LENGTH ? "See summary" : "Next question";
}

function renderFeedback(item, correct) {
  const feedback = document.getElementById("practiceFeedback");
  feedback.hidden = false;
  feedback.innerHTML = `
    <h3 id="feedbackTitle">${correct ? "Correct." : "Not correct."}</h3>
    <p><strong>Correct answer:</strong> ${escapeHtml(formatAnswerForFeedback(item.answer))}</p>
    <p>${escapeHtml(item.explanation)}</p>
    <div class="feedback-grid">
      ${item.options.map((option) => feedbackRow(item, option)).join("")}
    </div>
  `;
}

function feedbackRow(item, option) {
  const kind = option === item.answer ? "correct" : option === state.selected ? "incorrect" : "";
  const label = option === item.answer ? "Correct choice" : option === state.selected ? "Your choice" : "Other choice";
  const rationale = item.rationales[option] || distractorRationale(item, option);
  return `
    <div class="feedback-row ${kind}">
      <div>
        <strong>${escapeHtml(option)}</strong>
        <span>${label}</span>
      </div>
      <span class="tooltip">
        <button type="button" aria-label="Show explanation for ${escapeHtml(option)}">?</button>
        <span class="tooltip-bubble">${escapeHtml(rationale)}</span>
      </span>
    </div>
  `;
}

function nextPracticeItem() {
  state.index += 1;
  state.selected = "";
  state.answered = false;
  renderPractice();
}

function renderCompletion() {
  const correct = state.responses.filter((response) => response.correct).length;
  document.getElementById("practiceNumber").textContent = String(PRACTICE_LENGTH);
  document.getElementById("practiceMeter").style.width = "100%";
  document.getElementById("practiceMeta").innerHTML = `<span class="tag">${escapeHtml(state.level)}</span><span class="tag">Complete</span>`;
  document.getElementById("practicePrompt").innerHTML = `
    <div class="quiz-complete">
      <h2>Practice complete</h2>
      <p>You answered ${correct}/${PRACTICE_LENGTH} items correctly. Start another quiz when you are ready.</p>
    </div>
  `;
  document.getElementById("practiceAnswers").innerHTML = "";
  document.getElementById("practiceFeedback").hidden = true;
  document.getElementById("checkPracticeAnswer").hidden = true;
  document.getElementById("nextPracticeItem").hidden = true;
}

function renderSidePanel() {
  const correct = state.responses.filter((response) => response.correct).length;
  document.getElementById("sideLevel").textContent = state.level;
  document.getElementById("sideCorrect").textContent = `${correct}/${PRACTICE_LENGTH}`;
  const counts = state.responses.reduce((groups, response) => {
    incrementCount(groups, learnerSubcategory(response.subcategory));
    return groups;
  }, {});
  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  document.getElementById("practiceAreas").innerHTML = entries.length
    ? entries.map(([label, count]) => `<span class="chip">${escapeHtml(label)} ${count}</span>`).join("")
    : `<span class="chip">Areas appear after you answer</span>`;
}

function splitTaskText(text) {
  const colonIndex = text.indexOf(": ");
  if (colonIndex > -1) {
    return {
      instruction: ensurePeriod(text.slice(0, colonIndex)),
      target: text.slice(colonIndex + 2)
    };
  }

  const meaningMatch = text.match(/^(What does "[^"]+" mean in this sentence\?)\s+(.+)$/);
  if (meaningMatch) {
    return {
      instruction: meaningMatch[1],
      target: meaningMatch[2]
    };
  }

  if (/^(Choose|Which|Pick|Find)\b/.test(text)) {
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

function supplementalDifficulty(blueprint, localIndex) {
  const [low, high] = supplementalDifficultyRanges[blueprint.code] || [1.4, 4.2];
  const setCount = Math.max(1, blueprint.sets.length);
  const setIndex = localIndex % setCount;
  const progress = setCount === 1 ? 0 : setIndex / (setCount - 1);
  const itemLevel = low + (high - low) * progress;
  const stableJitter = ((setIndex % 5) - 2) * 0.035;
  return clamp(itemLevel + stableJitter, 1, 6);
}

function pick(values, index, offset = 0) {
  return values[(index + offset) % values.length];
}

function jitterDifficulty(difficulty, index) {
  return clamp(difficulty + ((index % 5) - 2) * 0.06, 1, 6);
}

function uniqueOptions(options) {
  return [...new Set(options)];
}

function shuffleStable(items, seed) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = (seed + i * 7) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleRandom(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomInt(max) {
  if (window.crypto && window.crypto.getRandomValues) {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return values[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function incrementCount(counts, key) {
  counts[key] = (counts[key] || 0) + 1;
}

function learnerSubcategory(subcategory) {
  return learnerSubcategoryLabels[subcategory] || subcategory;
}

function ensurePeriod(text) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function formatAnswerForFeedback(answer) {
  return /[.!?]$/.test(answer) ? answer : `${answer}.`;
}

function normalizeQuestionText(text) {
  return String(text).toLowerCase().replace(/\s+/g, " ").trim();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

state.bank = createQuestionBank();
document.getElementById("practiceSetup").addEventListener("submit", startPractice);
document.getElementById("checkPracticeAnswer").addEventListener("click", checkPracticeAnswer);
document.getElementById("nextPracticeItem").addEventListener("click", nextPracticeItem);
document.getElementById("restartPractice").addEventListener("click", startPractice);
startPractice();
