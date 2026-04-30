const TOTAL_QUESTIONS = 120;
const FIRST_ESTIMATE_AT = 5;
const CORE_BANK_SIZE = 1500;
const SUPPLEMENTAL_BANK_SIZE = 700;
const BANK_SIZE = CORE_BANK_SIZE + SUPPLEMENTAL_BANK_SIZE;
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

const forbiddenPromptTerms = [
  "collocation",
  "connector",
  "correct agreement",
  "reported speech",
  "underlined",
  "academic discussion",
  "academic sentence",
  "academic language",
  "grammatically",
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

const languageGuides = {
  en: {
    title: "How to use EnglishRoad",
    purpose: "EnglishRoad helps English learners check their level. It is a practice tool, not an official test score.",
    functionText: "You answer multiple-choice questions. The questions start easy. They get harder only when many answers are correct. The app estimates TOEFL, IELTS, TOEIC, and CEFR levels and shows grammar and vocabulary areas to practice.",
    steps: [
      "Choose one answer and click Check answer.",
      "You see a first level after 5 answers.",
      "For an unofficial report, take a screenshot of your level and practice areas.",
      "Continue up to 120 questions for a clearer result."
    ]
  },
  ja: {
    title: "EnglishRoad の使い方",
    purpose: "EnglishRoad は、英語学習者が自分の英語レベルを確認するための練習ツールです。公式の試験スコアではありません。",
    functionText: "4択の問題に答えます。問題はやさしいレベルから始まります。正解が多いときだけ、少しずつ難しくなります。TOEFL、IELTS、TOEIC、CEFR の目安と、練習が必要な文法・語彙を表示します。",
    steps: [
      "答えを1つ選び、「Check answer」を押します。",
      "5問答えると、最初のレベルが表示されます。",
      "非公式レポートが必要な場合は、レベルと練習項目の画面をスクリーンショットしてください。",
      "120問まで続けると、結果がよりはっきりします。"
    ]
  },
  zh: {
    title: "如何使用 EnglishRoad",
    purpose: "EnglishRoad 帮助英语学习者了解自己的英语水平。这是练习工具，不是官方考试成绩。",
    functionText: "你会回答选择题。题目从简单开始。只有当你答对很多题时，题目才会逐渐变难。应用会估算 TOEFL、IELTS、TOEIC 和 CEFR 水平，并显示需要练习的语法和词汇。",
    steps: [
      "选择一个答案，然后点击 Check answer。",
      "回答 5 题后，你会看到第一次水平估计。",
      "如果需要非正式报告，请截屏保存你的水平和需要练习的内容。",
      "继续完成最多 120 题，结果会更清楚。"
    ]
  },
  es: {
    title: "Cómo usar EnglishRoad",
    purpose: "EnglishRoad ayuda a estudiantes de inglés a conocer su nivel. Es una herramienta de práctica, no una calificación oficial.",
    functionText: "Respondes preguntas de opción múltiple. Las preguntas empiezan fáciles. Solo se vuelven más difíciles si aciertas muchas respuestas. La app estima niveles TOEFL, IELTS, TOEIC y CEFR, y muestra gramática y vocabulario para practicar.",
    steps: [
      "Elige una respuesta y pulsa Check answer.",
      "Ves un primer nivel después de 5 respuestas.",
      "Para un informe no oficial, haz una captura de tu nivel y de las áreas para practicar.",
      "Continúa hasta 120 preguntas para obtener un resultado más claro."
    ]
  },
  te: {
    title: "EnglishRoad ఎలా ఉపయోగించాలి",
    purpose: "EnglishRoad ఆంగ్లం నేర్చుకునే వారికి తమ స్థాయిని తెలుసుకోవడానికి సహాయపడుతుంది. ఇది సాధన సాధనం మాత్రమే; అధికారిక పరీక్ష స్కోరు కాదు.",
    functionText: "మీరు బహుళ ఎంపిక ప్రశ్నలకు సమాధానం ఇస్తారు. ప్రశ్నలు సులభంగా మొదలవుతాయి. మీరు చాలా సరైన సమాధానాలు ఇస్తేనే అవి క్రమంగా కష్టమవుతాయి. ఈ యాప్ TOEFL, IELTS, TOEIC, CEFR స్థాయులను అంచనా వేస్తుంది మరియు సాధన చేయాల్సిన వ్యాకరణం, పదజాలం చూపిస్తుంది.",
    steps: [
      "ఒక సమాధానం ఎంచుకొని Check answer నొక్కండి.",
      "5 సమాధానాల తర్వాత మొదటి స్థాయి కనిపిస్తుంది.",
      "అనధికారిక నివేదిక కోసం, మీ స్థాయి మరియు సాధన చేయాల్సిన భాగాల స్క్రీన్‌షాట్ తీసుకోండి.",
      "మరింత స్పష్టమైన ఫలితం కోసం 120 ప్రశ్నల వరకు కొనసాగండి."
    ]
  },
  pt: {
    title: "Como usar o EnglishRoad",
    purpose: "O EnglishRoad ajuda estudantes de inglês a ver seu nível. É uma ferramenta de prática, não uma nota oficial.",
    functionText: "Você responde perguntas de múltipla escolha. As perguntas começam fáceis. Elas ficam mais difíceis apenas quando muitas respostas estão corretas. O app estima níveis TOEFL, IELTS, TOEIC e CEFR, e mostra gramática e vocabulário para praticar.",
    steps: [
      "Escolha uma resposta e clique em Check answer.",
      "Você vê um primeiro nível depois de 5 respostas.",
      "Para um relatório não oficial, tire uma captura da tela com seu nível e áreas de prática.",
      "Continue até 120 perguntas para um resultado mais claro."
    ]
  },
  pl: {
    title: "Jak korzystać z EnglishRoad",
    purpose: "EnglishRoad pomaga osobom uczącym się angielskiego sprawdzić swój poziom. To narzędzie do ćwiczeń, a nie oficjalny wynik egzaminu.",
    functionText: "Odpowiadasz na pytania wielokrotnego wyboru. Pytania zaczynają się od łatwych. Stają się trudniejsze tylko wtedy, gdy wiele odpowiedzi jest poprawnych. Aplikacja szacuje poziomy TOEFL, IELTS, TOEIC i CEFR oraz pokazuje gramatykę i słownictwo do ćwiczenia.",
    steps: [
      "Wybierz jedną odpowiedź i kliknij Check answer.",
      "Pierwszy poziom zobaczysz po 5 odpowiedziach.",
      "Aby mieć nieoficjalny raport, zrób zrzut ekranu z poziomem i obszarami do ćwiczenia.",
      "Kontynuuj do 120 pytań, aby wynik był dokładniejszy."
    ]
  },
  ko: {
    title: "EnglishRoad 사용 방법",
    purpose: "EnglishRoad는 영어 학습자가 자신의 영어 수준을 확인하도록 돕는 연습 도구입니다. 공식 시험 점수는 아닙니다.",
    functionText: "객관식 문제에 답합니다. 문제는 쉬운 수준에서 시작합니다. 정답이 많을 때만 조금씩 어려워집니다. 앱은 TOEFL, IELTS, TOEIC, CEFR 수준을 추정하고 연습할 문법과 어휘 영역을 보여 줍니다.",
    steps: [
      "답 하나를 고르고 Check answer를 누르세요.",
      "5문제에 답하면 첫 수준이 보입니다.",
      "비공식 보고서가 필요하면 수준과 연습할 부분이 보이도록 스크린샷을 찍으세요.",
      "더 정확한 결과를 위해 120문제까지 계속하세요."
    ]
  },
  fr: {
    title: "Comment utiliser EnglishRoad",
    purpose: "EnglishRoad aide les apprenants d’anglais à connaître leur niveau. C’est un outil d’entraînement, pas un score officiel.",
    functionText: "Vous répondez à des questions à choix multiple. Les questions commencent facilement. Elles deviennent plus difficiles seulement si vous avez beaucoup de bonnes réponses. L’application estime les niveaux TOEFL, IELTS, TOEIC et CEFR, et montre la grammaire et le vocabulaire à travailler.",
    steps: [
      "Choisissez une réponse et cliquez sur Check answer.",
      "Vous voyez un premier niveau après 5 réponses.",
      "Pour un rapport non officiel, faites une capture d’écran de votre niveau et des points à travailler.",
      "Continuez jusqu’à 120 questions pour un résultat plus clair."
    ]
  }
};

const cefrBands = [
  { min: 0, label: "A1" },
  { min: 1.8, label: "A2" },
  { min: 2.7, label: "B1" },
  { min: 3.65, label: "B2" },
  { min: 4.65, label: "C1" },
  { min: 5.45, label: "C2" }
];

const itemData = window.createEnglishRoadItemData({ pick, item });
const itemDataSchema = itemData.schema;
const blueprints = itemData.blueprints;
const supplementalBlueprints = itemData.supplementalBlueprints;
const supplementalDifficultyRanges = itemData.supplementalDifficultyRanges;

const state = {
  bank: [],
  current: null,
  answered: false,
  selected: "",
  questionIndex: 0,
  ability: 1.45,
  responses: [],
  candidateOrder: [],
  usedIds: new Set(),
  usedTexts: new Set()
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
  validateBank(bank);
  return bank;
}

function buildQuestion(blueprint, localIndex, globalIndex, difficulty) {
  const made = blueprint.make(localIndex);
  const mirror = TEST_MIRRORS[globalIndex % TEST_MIRRORS.length];
  const prompt = contextualize(made.text, blueprint, localIndex, made);
  const options = shuffleStable(uniqueOptions(made.options), globalIndex);
  const question = {
    id: `${blueprint.code}-${globalIndex + 1}`,
    blueprint: blueprint.code,
    category: made.category || blueprint.category,
    subcategory: made.subcategory || blueprint.subcategory,
    source: mirror,
    difficulty,
    sentence: prompt.task,
    setupText: prompt.setup,
    taskText: prompt.task,
    text: prompt.fullText,
    options,
    answer: made.answer,
    focusKey: made.focusKey || "",
    qaStatus: made.qaStatus || "screened"
  };
  question.explanation = made.explanation || explainAnswer(question);
  question.rationales = made.rationales || rationalesForOptions(question);
  return question;
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
  if (question.subcategory === "Comparatives") return "The sentence compares two things, so the comparative form is needed.";
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
      "Choose the shorter sentence that still sounds clear.",
      "Only one short sentence keeps the meaning and grammar.",
      "Look for the short form that fits the noun before it.",
      "The answer should be short, clear, and grammatical."
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
    "Reduced clauses": ["Choose the shorter sentence that keeps the same meaning.", "The best sentence removes extra words cleanly.", "Choose the clear short form.", "The answer should be shorter but still grammatical."],
    "Advanced sentence structure": ["Choose the sentence with clear word order.", "Read the whole sentence before choosing.", "The answer should make a natural sentence.", "Choose the best answer."],
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

function isSentenceChoiceTask(text) {
  return /^(Choose|Which|Pick|Find)\b/i.test(text) && !text.includes(": ");
}

function isMeaningTask(text) {
  return /^(What does|Which word means|Which meaning|In an office message|In school or work reading|Which sentence is most appropriate|Which sentence is careful|Which sentence says)/i.test(text);
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
    if (new Set(question.options.map(normalizeQuestionText)).size !== question.options.length) issues.push(`Duplicate normalized option: ${question.id}`);
    if (question.options.length !== 4) issues.push(`Wrong option count: ${question.id}`);
    if (!question.category || !question.subcategory || !question.difficulty) issues.push(`Missing metadata: ${question.id}`);
    if (!question.setupText || !question.taskText) issues.push(`Missing display parts: ${question.id}`);
    if (!question.sentence || question.sentence !== question.taskText) issues.push(`Missing structured sentence: ${question.id}`);
    if (!question.explanation) issues.push(`Missing explanation: ${question.id}`);
    if (!question.rationales || question.options.some((option) => !question.rationales[option])) issues.push(`Missing option rationale: ${question.id}`);
    if (!itemDataSchema.qaStatusValues.includes(question.qaStatus)) issues.push(`Invalid QA status: ${question.id}`);
    const missingStructuredField = itemDataSchema.generatedFields.find((field) => question[field] === undefined || question[field] === null || question[field] === "");
    if (missingStructuredField) issues.push(`Missing structured field ${missingStructuredField}: ${question.id}`);
    if (!learnerSubcategoryLabels[question.subcategory]) issues.push(`Missing learner label: ${question.subcategory}`);
    if (normalizeQuestionText(question.setupText).startsWith("during ")) issues.push(`Generic setup text: ${question.id}`);
    const setupProblem = forbiddenSetupTerms.find((term) => normalizeQuestionText(question.setupText).includes(term));
    if (setupProblem) issues.push(`Mixed setup context "${setupProblem}": ${question.id}`);
    const technicalTerm = forbiddenPromptTerms.find((term) => normalizeQuestionText(question.taskText).includes(term));
    if (technicalTerm) issues.push(`Technical prompt term "${technicalTerm}": ${question.id}`);
    if (question.options.includes("no article")) issues.push(`Use (nothing), not no article: ${question.id}`);
    if (hasKnownAnswerAmbiguity(question)) issues.push(`Possible multiple correct answers: ${question.id}`);
    if (hasKnownAwkwardPhrase(question)) issues.push(`Awkward phrase: ${question.id}`);
    const displayProblem = hasDisplayGuidanceProblem(question);
    if (displayProblem) issues.push(`${displayProblem}: ${question.id}`);
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

function hasKnownAnswerAmbiguity(question) {
  const task = normalizeQuestionText(question.taskText);
  const options = question.options.map(normalizeQuestionText);
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
  if (setup.includes("only after") && !answerText.includes("only after")) return "Setup mentions Only after for an unrelated item";
  if (task.startsWith("choose the best words") && !taskHasBlank) return "Best-words item needs a cloze blank";
  if (task.includes("choose the best answer") && !taskHasBlank && question.options.every((option) => !/[.!?]$/.test(option))) {
    return "Fragment options need a cloze sentence";
  }
  return "";
}

function createCandidateOrder() {
  return shuffleRandom(state.bank);
}

function chooseQuestion() {
  const target = targetDifficulty();
  const ceiling = difficultyCeiling();
  const floor = difficultyFloor();
  const recentBlueprints = new Set(state.responses.slice(-10).map((response) => response.blueprint));
  const recentWeaknesses = new Set(state.responses.slice(-5).map((response) => response.subcategory));
  let best = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const question of state.candidateOrder) {
    if (state.usedIds.has(question.id) || state.usedTexts.has(questionSignature(question))) continue;
    const outsideRange = question.difficulty < floor || question.difficulty > ceiling;
    const distance = Math.abs(question.difficulty - target);
    const blueprintPenalty = recentBlueprints.has(question.blueprint) ? 1.2 : 0;
    const weaknessPenalty = recentWeaknesses.has(question.subcategory) ? 0.55 : 0;
    const categoryPenalty = desiredCategory() === question.category ? 0 : 0.16;
    const outsidePenalty = outsideRange ? 4 + Math.abs(question.difficulty - clamp(question.difficulty, floor, ceiling)) : 0;
    const randomTieBreak = randomInt(1000) / 100000;
    const score = distance + blueprintPenalty + weaknessPenalty + categoryPenalty + outsidePenalty + randomTieBreak;
    if (score < bestScore) {
      best = question;
      bestScore = score;
    }
  }

  if (!best) throw new Error("No unused question is available.");
  state.usedIds.add(best.id);
  state.usedTexts.add(questionSignature(best));
  return best;
}

function desiredCategory() {
  const grammarMisses = state.responses.filter((response) => !response.correct && response.category === "Grammar").length;
  const vocabularyMisses = state.responses.filter((response) => !response.correct && response.category === "Vocabulary").length;
  if (grammarMisses > vocabularyMisses + 1) return "Grammar";
  if (vocabularyMisses > grammarMisses + 1) return "Vocabulary";
  return state.questionIndex % 2 === 0 ? "Grammar" : "Vocabulary";
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

function ensurePeriod(text) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function targetDifficulty() {
  const answered = state.responses.length;
  if (answered < 4) return 1.3 + answered * 0.18;
  const rolling = rollingAccuracy(8);
  const gentleLift = rolling >= 0.85 ? 0.42 : rolling >= 0.7 ? 0.18 : -0.1;
  return clamp(state.ability + gentleLift, 1.1, 6);
}

function difficultyFloor() {
  const answered = state.responses.length;
  if (answered < 8) return 1;
  return clamp(state.ability - 0.9, 1, 6);
}

function difficultyCeiling() {
  const answered = state.responses.length;
  const rolling = rollingAccuracy(8);
  if (answered < 5) return 2.1;
  if (answered < 10) return rolling >= 0.8 ? 2.8 : 2.35;
  if (answered < 20) return rolling >= 0.85 ? 3.5 : rolling >= 0.65 ? 3.0 : 2.55;
  if (answered < 40) return rolling >= 0.85 ? state.ability + 1.0 : state.ability + 0.55;
  return rolling >= 0.85 ? state.ability + 1.15 : rolling >= 0.65 ? state.ability + 0.75 : state.ability + 0.35;
}

function learnerSubcategory(subcategory) {
  return learnerSubcategoryLabels[subcategory] || subcategory;
}

function renderQuestion() {
  state.current = chooseQuestion();
  state.answered = false;
  state.selected = "";

  document.getElementById("questionNumber").textContent = String(state.questionIndex + 1);
  document.getElementById("totalQuestions").textContent = String(TOTAL_QUESTIONS);
  document.getElementById("meterFill").style.width = `${((state.questionIndex + 1) / TOTAL_QUESTIONS) * 100}%`;
  const taskParts = splitTaskText(state.current.taskText);
  document.getElementById("questionMeta").innerHTML = [
    state.current.category,
    learnerSubcategory(state.current.subcategory),
    `Level ${state.current.difficulty.toFixed(1)}`
  ].map((tag) => `<span class="tag">${tag}</span>`).join("");
  document.getElementById("questionText").innerHTML = `
    <span class="question-setup">
      <span class="question-part-label">Helpful information</span>
      ${escapeHtml(state.current.setupText)}
    </span>
    <span class="question-stem">
      <span class="question-part-label">Answer this</span>
      <span class="question-instruction">${escapeHtml(taskParts.instruction)}</span>
      ${taskParts.target ? `
        <span class="spoken-sentence">
          <span class="spoken-label">Sentence</span>
          ${escapeHtml(taskParts.target)}
        </span>
      ` : ""}
    </span>
  `;
  document.getElementById("answers").innerHTML = state.current.options.map((option) => `
    <label class="answer-option">
      <input type="radio" name="answer" value="${escapeAttribute(option)}">
      <span>${option}</span>
    </label>
  `).join("");
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("submitAnswer").textContent = "Check answer";
  document.getElementById("submitAnswer").disabled = false;

  document.querySelectorAll("input[name='answer']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.selected = event.target.value;
    });
  });
}

function submitAnswer() {
  if (!state.selected && !state.answered) {
    document.getElementById("feedback").textContent = "Choose one answer.";
    return;
  }

  if (state.answered) {
    if (state.questionIndex >= TOTAL_QUESTIONS) return;
    renderQuestion();
    return;
  }

  const correct = state.selected === state.current.answer;
  updateAbility(correct);
  state.responses.push({ ...state.current, correct, selected: state.selected });
  state.questionIndex += 1;
  state.answered = true;

  document.querySelectorAll(".answer-option").forEach((option) => {
    const input = option.querySelector("input");
    input.disabled = true;
    if (input.value === state.current.answer) option.classList.add("correct");
    if (input.checked && input.value !== state.current.answer) option.classList.add("incorrect");
  });

  const feedback = document.getElementById("feedback");
  feedback.textContent = correct ? "Correct." : `Not correct. Correct answer: ${formatAnswerForFeedback(state.current.answer)} ${state.current.explanation}`;
  feedback.className = `feedback ${correct ? "good" : "needs-work"}`;

  updateResults();

  const button = document.getElementById("submitAnswer");
  if (state.questionIndex >= TOTAL_QUESTIONS) {
    button.textContent = "Done";
    button.disabled = true;
    const finalReport = document.getElementById("finalReport");
    if (finalReport && typeof finalReport.scrollIntoView === "function") {
      finalReport.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    button.textContent = "Next";
  }
}

function updateAbility(correct) {
  const recent = state.responses.slice(-7).map((response) => response.correct).concat(correct);
  const rolling = recent.filter(Boolean).length / recent.length;
  const performanceEstimate = state.current.difficulty + (correct ? 0.52 : -0.9);
  const consistencyAdjustment = (rolling - 0.68) * 0.28;
  const learningRate = Math.max(0.075, 0.22 - state.responses.length * 0.0008);
  state.ability = clamp((state.ability * (1 - learningRate)) + ((performanceEstimate + consistencyAdjustment) * learningRate), 1, 6);
}

function updateResults() {
  const estimated = state.responses.length >= FIRST_ESTIMATE_AT;
  const correctCount = state.responses.filter((response) => response.correct).length;
  document.getElementById("result-title").textContent = estimated ? `${cefrEstimate()} range` : "Answer 5 questions";
  document.getElementById("toeflScore").textContent = estimated ? toeflEstimate() : "after 5";
  document.getElementById("ieltsScore").textContent = estimated ? ieltsEstimate() : "after 5";
  document.getElementById("toeicScore").textContent = estimated ? toeicEstimate() : "after 5";
  document.getElementById("cefrScore").textContent = estimated ? cefrEstimate() : `${correctCount}/${state.responses.length || 0}`;
  document.getElementById("precisionText").textContent = precisionLabel();
  renderWeaknesses();
  renderFinalReport();
}

function precisionLabel() {
  const answered = state.responses.length;
  if (answered < FIRST_ESTIMATE_AT) return `We show your first level after ${FIRST_ESTIMATE_AT} answers.`;
  if (answered >= TOTAL_QUESTIONS) return "Finished. This is your unofficial estimated range.";
  return `${answered}/${TOTAL_QUESTIONS} answers. This is an unofficial estimated range.`;
}

function standardError() {
  const answered = Math.max(FIRST_ESTIMATE_AT, state.responses.length);
  return Math.max(0.1, 1.2 / Math.sqrt(answered / 4));
}

function abilityRange() {
  const spread = standardError();
  return {
    low: clamp(state.ability - spread, 1, 6),
    high: clamp(state.ability + spread, 1, 6)
  };
}

function cefrEstimate() {
  const range = abilityRange();
  const low = cefrFromAbility(range.low);
  const high = cefrFromAbility(range.high);
  return low === high ? low : `${low}-${high}`;
}

function toeflEstimate() {
  const range = abilityRange();
  return formatRange(toeflFromAbility(range.low), toeflFromAbility(range.high), 1);
}

function ieltsEstimate() {
  const range = abilityRange();
  return formatRange(ieltsFromAbility(range.low), ieltsFromAbility(range.high), 0.5, 1);
}

function toeicEstimate() {
  const range = abilityRange();
  return formatRange(toeicFromAbility(range.low), toeicFromAbility(range.high), 5);
}

function cefrFromAbility(ability) {
  return cefrBands.reduce((active, band) => ability >= band.min ? band.label : active, cefrBands[0].label);
}

function toeflFromAbility(ability) {
  return Math.round(clamp(5 + ((ability - 1) / 5) * 115, 0, 120));
}

function ieltsFromAbility(ability) {
  return roundToStep(clamp(1 + ((ability - 1) / 5) * 8, 1, 9), 0.5);
}

function toeicFromAbility(ability) {
  return roundToStep(clamp(10 + ((ability - 1) / 5) * 980, 10, 990), 5);
}

function renderWeaknesses() {
  const misses = state.responses.filter((response) => !response.correct);
  const groups = {
    Grammar: countBySubcategory(misses.filter((response) => response.category === "Grammar")),
    Vocabulary: countBySubcategory(misses.filter((response) => response.category === "Vocabulary"))
  };

  document.getElementById("grammarCount").textContent = String(sumCounts(groups.Grammar));
  document.getElementById("vocabularyCount").textContent = String(sumCounts(groups.Vocabulary));
  renderChips("grammarWeaknesses", groups.Grammar, "No grammar problem yet");
  renderChips("vocabularyWeaknesses", groups.Vocabulary, "No vocabulary problem yet");
}

function renderFinalReport() {
  const report = document.getElementById("finalReport");
  if (!report) return;
  const finished = state.responses.length >= TOTAL_QUESTIONS;
  report.hidden = !finished;
  if (!finished) return;

  const correctCount = state.responses.filter((response) => response.correct).length;
  document.getElementById("finalReportDate").textContent = `Completed: ${formatReportDate(new Date())}`;
  document.getElementById("finalCorrect").textContent = `${correctCount}/${TOTAL_QUESTIONS}`;
  document.getElementById("finalLevelRange").textContent = levelRangeEstimate();
  document.getElementById("finalCefr").textContent = cefrEstimate();
  document.getElementById("finalToefl").textContent = toeflEstimate();
  document.getElementById("finalIelts").textContent = ieltsEstimate();
  document.getElementById("finalToeic").textContent = toeicEstimate();
  renderReportChips("finalStrongAreas", strongestAreas(), "No clear strong area");
  renderReportChips("finalWeakAreas", weakestAreas(), "No clear weak area");
}

function strongestAreas() {
  return areaStats()
    .filter((area) => area.attempted >= 2 && area.correct > 0)
    .sort((a, b) => (b.correct / b.attempted) - (a.correct / a.attempted) || b.correct - a.correct || b.attempted - a.attempted)
    .slice(0, 5)
    .map((area) => `${area.label} ${area.correct}/${area.attempted}`);
}

function weakestAreas() {
  return areaStats()
    .filter((area) => area.missed > 0)
    .sort((a, b) => b.missed - a.missed || (a.correct / a.attempted) - (b.correct / b.attempted) || b.attempted - a.attempted)
    .slice(0, 5)
    .map((area) => `${area.label} ${area.missed} missed`);
}

function areaStats() {
  const stats = {};
  state.responses.forEach((response) => {
    const label = learnerSubcategory(response.subcategory);
    if (!stats[label]) stats[label] = { label, attempted: 0, correct: 0, missed: 0 };
    stats[label].attempted += 1;
    if (response.correct) stats[label].correct += 1;
    else stats[label].missed += 1;
  });
  return Object.values(stats);
}

function renderReportChips(targetId, entries, emptyText) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = entries.length
    ? entries.map((entry) => `<span class="chip">${escapeHtml(entry)}</span>`).join("")
    : `<span class="chip empty">${emptyText}</span>`;
}

function formatReportDate(date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function levelRangeEstimate() {
  const range = abilityRange();
  return formatRange(range.low, range.high, 0.1, 1);
}

function formatAnswerForFeedback(answer) {
  return /[.!?]$/.test(answer) ? answer : `${answer}.`;
}

function restart() {
  state.questionIndex = 0;
  state.ability = 1.45;
  state.responses = [];
  state.candidateOrder = createCandidateOrder();
  state.usedIds = new Set();
  state.usedTexts = new Set();
  updateResults();
  renderQuestion();
}

function pick(values, index, offset = 0) {
  return values[(index + offset) % values.length];
}

function thirdPerson(phrase) {
  const [verb, ...rest] = phrase.split(" ");
  const converted = verb.endsWith("s") || verb.endsWith("x") || verb.endsWith("ch") ? `${verb}es` : verb.endsWith("y") ? `${verb.slice(0, -1)}ies` : `${verb}s`;
  return [converted, ...rest].join(" ");
}

function baseVerb(phrase) {
  return phrase.split(" ")[0];
}

function gerundPhrase(phrase) {
  const [verb, ...rest] = phrase.split(" ");
  const gerund = verb.endsWith("e") && !verb.endsWith("ee") ? `${verb.slice(0, -1)}ing` : `${verb}ing`;
  return [gerund, ...rest].join(" ");
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

function rollingAccuracy(size) {
  const recent = state.responses.slice(-size);
  if (!recent.length) return 0.5;
  return recent.filter((response) => response.correct).length / recent.length;
}

function countBySubcategory(items) {
  return items.reduce((counts, item) => {
    const label = learnerSubcategory(item.subcategory);
    counts[label] = (counts[label] || 0) + 1;
    return counts;
  }, {});
}

function renderChips(targetId, values, emptyText) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1]);
  document.getElementById(targetId).innerHTML = entries.length
    ? entries.map(([label, count]) => `<span class="chip">${label} ${count}</span>`).join("")
    : `<span class="chip empty">${emptyText}</span>`;
}

function renderLanguageInfo(languageKey = "en") {
  const guide = languageGuides[languageKey] || languageGuides.en;
  const title = document.getElementById("infoTitle");
  const purpose = document.getElementById("infoPurpose");
  const functionText = document.getElementById("infoFunction");
  const steps = document.getElementById("infoSteps");
  if (!title || !purpose || !functionText || !steps) return;

  title.textContent = guide.title;
  purpose.textContent = guide.purpose;
  functionText.textContent = guide.functionText;
  steps.replaceChildren(...guide.steps.map((step) => {
    const itemNode = document.createElement("li");
    itemNode.textContent = step;
    return itemNode;
  }));
}

function toggleInstructions() {
  const panel = document.getElementById("introPanel");
  const content = document.getElementById("instructionsContent");
  const button = document.getElementById("instructionsToggle");
  if (!content || !button) return;

  const isHidden = content.classList.toggle("is-hidden");
  if (panel) panel.classList.toggle("is-collapsed", isHidden);
  button.textContent = isHidden ? "Show instructions" : "Hide instructions";
  button.setAttribute("aria-expanded", String(!isHidden));
}

function sumCounts(values) {
  return Object.values(values).reduce((sum, count) => sum + count, 0);
}

function normalizeQuestionText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function questionSignature(question) {
  const optionKey = question.options.map(normalizeQuestionText).sort().join(" | ");
  return normalizeQuestionText(question.taskText) + " || " + optionKey;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatRange(low, high, step, fixedDigits = 0) {
  const roundedLow = roundToStep(Math.min(low, high), step);
  const roundedHigh = roundToStep(Math.max(low, high), step);
  const format = (value) => fixedDigits ? value.toFixed(fixedDigits) : String(Math.round(value));
  return roundedLow === roundedHigh ? format(roundedLow) : `${format(roundedLow)}-${format(roundedHigh)}`;
}

function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
document.getElementById("restart").addEventListener("click", restart);
document.getElementById("instructionsToggle").addEventListener("click", toggleInstructions);
document.getElementById("languageSelect").addEventListener("change", (event) => {
  renderLanguageInfo(event.target.value);
});
state.bank = createQuestionBank();
document.getElementById("bankSize").textContent = state.bank.length.toLocaleString();
renderLanguageInfo(document.getElementById("languageSelect").value);
restart();
