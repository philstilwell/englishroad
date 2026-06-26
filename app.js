const TOTAL_QUESTIONS = 100;
const FIRST_ESTIMATE_AT = 5;
const CORE_BANK_SIZE = 1800;
const SUPPLEMENTAL_BANK_SIZE = 2400;
const BANK_SIZE = CORE_BANK_SIZE + SUPPLEMENTAL_BANK_SIZE;
const TEST_MIRRORS = ["TOEFL", "IELTS", "TOEIC", "CEFR"];
const STORAGE_KEY = "englishroad-level-check-session-v1";
const SESSION_VERSION = 4;
const DIFFICULTY_BANDS = [
  { key: "starter", max: 2.2, target: 28 },
  { key: "developing", max: 3.3, target: 28 },
  { key: "independent", max: 4.5, target: 24 },
  { key: "advanced", max: 6.1, target: 20 }
];

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
    functionText: "You answer multiple-choice questions from a bank of 4,200 items. The items appear in a largely random order, with the first questions being generally easier. They get harder only when many answers are correct. The app estimates TOEFL, IELTS, TOEIC, and CEFR levels and shows grammar and vocabulary areas to practice.",
    steps: [
      "Choose one answer and click Check answer.",
      "You see a first level after 5 answers.",
      "Your answers are saved in this browser if the page refreshes.",
      "After 100 questions, you get a short unofficial report. It shows your level range, test score estimates, correct answers, strong areas, weak areas, and the date. You can copy the report text or take a screenshot."
    ]
  },
  ja: {
    title: "EnglishRoad の使い方",
    purpose: "EnglishRoad は、英語学習者が自分の英語レベルを確認するための練習ツールです。公式の試験スコアではありません。",
    functionText: "4,200問の中から4択の問題に答えます。問題はだいたいランダムな順番で出ますが、最初はやさしい問題です。正解が多いときだけ、少しずつ難しくなります。TOEFL、IELTS、TOEIC、CEFR の目安と、練習が必要な文法・語彙を表示します。",
    steps: [
      "答えを1つ選び、「Check answer」を押します。",
      "5問答えると、最初のレベルが表示されます。",
      "ページが更新されても、このブラウザに答えが保存されます。",
      "100問が終わると、短い非公式レポートが表示されます。レベル範囲、試験スコアの目安、正解数、得意な部分、苦手な部分、日付がわかります。レポート文をコピーするか、スクリーンショットを撮れます。"
    ]
  },
  zh: {
    title: "如何使用 EnglishRoad",
    purpose: "EnglishRoad 帮助英语学习者了解自己的英语水平。这是练习工具，不是官方考试成绩。",
    functionText: "你会从 4,200 道题中回答选择题。题目大体随机出现，但一开始比较简单。只有当你答对很多题时，题目才会逐渐变难。应用会估算 TOEFL、IELTS、TOEIC 和 CEFR 水平，并显示需要练习的语法和词汇。",
    steps: [
      "选择一个答案，然后点击 Check answer。",
      "回答 5 题后，你会看到第一次水平估计。",
      "如果页面刷新，你的答案会保存在这个浏览器中。",
      "完成 100 题后，你会看到一份简短的非正式报告。它会显示水平范围、考试分数估计、答对题数、强项、弱项和日期。你可以复制报告文字或截图。"
    ]
  },
  es: {
    title: "Cómo usar EnglishRoad",
    purpose: "EnglishRoad ayuda a estudiantes de inglés a conocer su nivel. Es una herramienta de práctica, no una calificación oficial.",
    functionText: "Respondes preguntas de opción múltiple de un banco de 4,200 ítems. Los ítems aparecen en un orden generalmente aleatorio, pero los primeros son más fáciles. Solo se vuelven más difíciles si aciertas muchas respuestas. La app estima niveles TOEFL, IELTS, TOEIC y CEFR, y muestra gramática y vocabulario para practicar.",
    steps: [
      "Elige una respuesta y pulsa Check answer.",
      "Ves un primer nivel después de 5 respuestas.",
      "Tus respuestas se guardan en este navegador si la página se actualiza.",
      "Después de 100 preguntas, recibes un informe no oficial breve. Muestra tu rango de nivel, estimaciones de puntaje, respuestas correctas, áreas fuertes, áreas débiles y la fecha. Puedes copiar el texto del informe o hacer una captura."
    ]
  },
  te: {
    title: "EnglishRoad ఎలా ఉపయోగించాలి",
    purpose: "EnglishRoad ఆంగ్లం నేర్చుకునే వారికి తమ స్థాయిని తెలుసుకోవడానికి సహాయపడుతుంది. ఇది సాధన సాధనం మాత్రమే; అధికారిక పరీక్ష స్కోరు కాదు.",
    functionText: "మీరు 4,200 అంశాల బ్యాంక్ నుండి బహుళ ఎంపిక ప్రశ్నలకు సమాధానం ఇస్తారు. అంశాలు సాధారణంగా యాదృచ్ఛిక క్రమంలో వస్తాయి, కానీ మొదటి ప్రశ్నలు సులభంగా ఉంటాయి. మీరు చాలా సరైన సమాధానాలు ఇస్తేనే అవి క్రమంగా కష్టమవుతాయి. ఈ యాప్ TOEFL, IELTS, TOEIC, CEFR స్థాయులను అంచనా వేస్తుంది మరియు సాధన చేయాల్సిన వ్యాకరణం, పదజాలం చూపిస్తుంది.",
    steps: [
      "ఒక సమాధానం ఎంచుకొని Check answer నొక్కండి.",
      "5 సమాధానాల తర్వాత మొదటి స్థాయి కనిపిస్తుంది.",
      "పేజీ రిఫ్రెష్ అయితే, మీ సమాధానాలు ఈ బ్రౌజర్‌లో సేవ్ అవుతాయి.",
      "100 ప్రశ్నల తర్వాత, మీకు చిన్న అనధికారిక నివేదిక కనిపిస్తుంది. అందులో మీ స్థాయి పరిధి, పరీక్ష స్కోరు అంచనాలు, సరైన సమాధానాల సంఖ్య, బలమైన భాగాలు, బలహీన భాగాలు, తేదీ ఉంటాయి. మీరు నివేదిక టెక్స్ట్‌ను కాపీ చేయవచ్చు లేదా స్క్రీన్‌షాట్ తీసుకోవచ్చు."
    ]
  },
  pt: {
    title: "Como usar o EnglishRoad",
    purpose: "O EnglishRoad ajuda estudantes de inglês a ver seu nível. É uma ferramenta de prática, não uma nota oficial.",
    functionText: "Você responde perguntas de múltipla escolha de um banco de 4.200 itens. Os itens aparecem em uma ordem geralmente aleatória, mas os primeiros são mais fáceis. Eles ficam mais difíceis apenas quando muitas respostas estão corretas. O app estima níveis TOEFL, IELTS, TOEIC e CEFR, e mostra gramática e vocabulário para praticar.",
    steps: [
      "Escolha uma resposta e clique em Check answer.",
      "Você vê um primeiro nível depois de 5 respostas.",
      "Suas respostas são salvas neste navegador se a página atualizar.",
      "Depois de 100 perguntas, você recebe um relatório não oficial curto. Ele mostra sua faixa de nível, estimativas de pontuação, respostas corretas, pontos fortes, pontos fracos e a data. Você pode copiar o texto do relatório ou tirar uma captura da tela."
    ]
  },
  pl: {
    title: "Jak korzystać z EnglishRoad",
    purpose: "EnglishRoad pomaga osobom uczącym się angielskiego sprawdzić swój poziom. To narzędzie do ćwiczeń, a nie oficjalny wynik egzaminu.",
    functionText: "Odpowiadasz na pytania wielokrotnego wyboru z banku 4 200 pytań. Pytania pojawiają się w ogólnie losowej kolejności, ale pierwsze pytania są łatwiejsze. Stają się trudniejsze tylko wtedy, gdy wiele odpowiedzi jest poprawnych. Aplikacja szacuje poziomy TOEFL, IELTS, TOEIC i CEFR oraz pokazuje gramatykę i słownictwo do ćwiczenia.",
    steps: [
      "Wybierz jedną odpowiedź i kliknij Check answer.",
      "Pierwszy poziom zobaczysz po 5 odpowiedziach.",
      "Twoje odpowiedzi zapisują się w tej przeglądarce, jeśli strona się odświeży.",
      "Po 100 pytaniach zobaczysz krótki nieoficjalny raport. Pokazuje zakres poziomu, szacowane wyniki testów, liczbę poprawnych odpowiedzi, mocne strony, słabe strony i datę. Możesz skopiować tekst raportu albo zrobić zrzut ekranu."
    ]
  },
  ko: {
    title: "EnglishRoad 사용 방법",
    purpose: "EnglishRoad는 영어 학습자가 자신의 영어 수준을 확인하도록 돕는 연습 도구입니다. 공식 시험 점수는 아닙니다.",
    functionText: "4,200개 문항 은행에서 객관식 문제에 답합니다. 문항은 대체로 무작위 순서로 나오지만, 처음 문제는 더 쉽습니다. 정답이 많을 때만 조금씩 어려워집니다. 앱은 TOEFL, IELTS, TOEIC, CEFR 수준을 추정하고 연습할 문법과 어휘 영역을 보여 줍니다.",
    steps: [
      "답 하나를 고르고 Check answer를 누르세요.",
      "5문제에 답하면 첫 수준이 보입니다.",
      "페이지가 새로고침되어도 답은 이 브라우저에 저장됩니다.",
      "100문제를 끝내면 짧은 비공식 보고서가 나옵니다. 수준 범위, 시험 점수 예상, 정답 수, 강한 부분, 약한 부분, 날짜를 보여 줍니다. 보고서 글을 복사하거나 스크린샷을 찍을 수 있습니다."
    ]
  },
  fr: {
    title: "Comment utiliser EnglishRoad",
    purpose: "EnglishRoad aide les apprenants d’anglais à connaître leur niveau. C’est un outil d’entraînement, pas un score officiel.",
    functionText: "Vous répondez à des questions à choix multiple venant d’une banque de 4 200 items. Les items apparaissent dans un ordre généralement aléatoire, mais les premières questions sont plus faciles. Elles deviennent plus difficiles seulement si vous avez beaucoup de bonnes réponses. L’application estime les niveaux TOEFL, IELTS, TOEIC et CEFR, et montre la grammaire et le vocabulaire à travailler.",
    steps: [
      "Choisissez une réponse et cliquez sur Check answer.",
      "Vous voyez un premier niveau après 5 réponses.",
      "Vos réponses sont enregistrées dans ce navigateur si la page se recharge.",
      "Après 100 questions, vous obtenez un court rapport non officiel. Il montre votre fourchette de niveau, les estimations de scores, les bonnes réponses, les points forts, les points faibles et la date. Vous pouvez copier le texte du rapport ou faire une capture d’écran."
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
  usedTexts: new Set(),
  completedAt: "",
  mixTargets: null,
  optionPositionCounts: [0, 0, 0, 0]
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
  const options = uniqueOptions(made.options);
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
  if (question.subcategory === "Gerunds and infinitives") return "Some verbs and adjectives need an -ing form, and some need to plus a verb.";
  if (question.subcategory === "Question forms") return "The question needs the correct helper word and word order.";
  if (question.subcategory === "Pronouns and reference") return "The pronoun must clearly point to the right person or thing.";
  if (question.subcategory === "Determiners and quantifiers") return "The amount word must fit the noun and meaning.";
  if (question.subcategory === "Adjective and adverb forms") return "The describing word must fit what it describes.";
  if (question.subcategory === "Parallel structure") return "The answer keeps the same pattern in each part of the list.";
  if (question.subcategory === "Inversion and emphasis") return "The opening phrase changes the word order in this formal sentence.";
  if (question.subcategory === "Subjunctive and unreal forms") return "This formal pattern uses the base verb after the request or requirement.";
  if (question.subcategory === "Sentence boundaries") return "The answer joins or separates the ideas as a complete sentence.";
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
  if (question.subcategory === "Gerunds and infinitives") return `\"${option}\" does not fit the verb pattern in this sentence.`;
  if (question.subcategory === "Question forms") return `\"${option}\" does not use the correct question word order.`;
  if (question.subcategory === "Pronouns and reference") return `\"${option}\" does not clearly refer to the right person or thing.`;
  if (question.subcategory === "Determiners and quantifiers") return `\"${option}\" does not fit this noun or amount.`;
  if (question.subcategory === "Adjective and adverb forms") return `\"${option}\" does not describe the right word correctly.`;
  if (question.subcategory === "Parallel structure") return `\"${option}\" does not keep the same pattern in the list.`;
  if (question.subcategory === "Inversion and emphasis") return `\"${option}\" does not use the correct formal word order.`;
  if (question.subcategory === "Subjunctive and unreal forms") return `\"${option}\" does not fit this formal request or requirement pattern.`;
  if (question.subcategory === "Sentence boundaries") return `\"${option}\" does not make the sentence complete and clear.`;
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
    "Reduced clauses": ["Choose the shorter sentence that keeps the same meaning.", "The best sentence removes extra words cleanly.", "Choose the clear short form.", "The answer should be shorter but still grammatical."],
    "Advanced sentence structure": ["Choose the sentence with clear word order.", "Read the whole sentence before choosing.", "The answer should make a natural sentence.", "Choose the best answer."],
    "Gerunds and infinitives": ["Choose the verb pattern that sounds natural.", "Read the word before the blank, then choose the best form.", "The answer should fit the verb pattern.", "Choose the best answer."],
    "Question forms": ["Choose the question with natural word order.", "Only one choice is a clear question.", "Check the helper word and word order.", "Choose the best question."],
    "Pronouns and reference": ["Choose the word that clearly points to the right person or thing.", "The answer should make the meaning clear.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Determiners and quantifiers": ["Choose the amount word that fits the noun.", "The answer should fit the amount meaning.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Adjective and adverb forms": ["Choose the form that describes the right word.", "The answer should sound natural in the sentence.", "Read the whole sentence before choosing.", "Choose the best answer."],
    "Parallel structure": ["Choose the sentence with the same pattern in each part.", "The list should use matching forms.", "Read all parts of the sentence before choosing.", "Choose the clearest sentence."],
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
    if (hasArticleAmbiguity(question)) issues.push(`Article ambiguity: ${question.id}`);
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

function hasArticleAmbiguity(question) {
  const answer = normalizeQuestionText(question.answer);
  const options = question.options.map(normalizeQuestionText);
  return ["a", "an"].includes(answer) && (options.includes("the") || options.includes("some"));
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

function createCandidateOrder() {
  return shuffleRandom(state.bank);
}

function chooseQuestion() {
  const target = targetDifficulty();
  const ceiling = difficultyCeiling();
  const floor = difficultyFloor();
  const balance = responseBalance();
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
    const balancePenalty = sessionBalancePenalty(question, balance);
    const randomTieBreak = randomInt(1000) / 100000;
    const score = distance + blueprintPenalty + weaknessPenalty + categoryPenalty + outsidePenalty + balancePenalty + randomTieBreak;
    if (score < bestScore) {
      best = question;
      bestScore = score;
    }
  }

  if (!best) throw new Error("No unused question is available.");
  state.usedIds.add(best.id);
  state.usedTexts.add(questionSignature(best));
  return prepareQuestionOptions(best);
}

function prepareQuestionOptions(question) {
  const options = orderOptionsWithBalancedAnswerPosition(
    question.options,
    question.answer,
    state.optionPositionCounts
  );
  recordAnswerPosition(options, question.answer, state.optionPositionCounts);
  return { ...question, options };
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

function chooseBalancedAnswerPosition(positionCounts, optionCount) {
  const counts = positionCounts.slice(0, optionCount);
  const minCount = Math.min(...counts);
  const choices = counts
    .map((count, index) => ({ count, index }))
    .filter((entry) => entry.count === minCount)
    .map((entry) => entry.index);
  return choices[randomInt(choices.length)];
}

function recordAnswerPosition(options, answer, positionCounts) {
  const index = options.indexOf(answer);
  if (index >= 0) positionCounts[index] = (positionCounts[index] || 0) + 1;
}

function createMixTargets() {
  const categories = ["Grammar", "Vocabulary"];
  const categoryTargets = categories.reduce((targets, category) => {
    targets[category] = TOTAL_QUESTIONS / categories.length;
    return targets;
  }, {});
  const subcategoryTargets = {};

  categories.forEach((category) => {
    const subcategories = [...new Set(state.bank
      .filter((question) => question.category === category)
      .map((question) => question.subcategory))];
    const target = categoryTargets[category] || TOTAL_QUESTIONS / categories.length;
    subcategories.forEach((subcategory) => {
      subcategoryTargets[subcategory] = Math.max(3, Math.ceil(target / Math.max(1, subcategories.length)) + 1);
    });
  });

  return {
    categoryTargets,
    subcategoryTargets,
    sourceTarget: Math.ceil(TOTAL_QUESTIONS / TEST_MIRRORS.length),
    difficultyTargets: DIFFICULTY_BANDS.reduce((targets, band) => {
      targets[band.key] = band.target;
      return targets;
    }, {})
  };
}

function responseBalance() {
  return state.responses.reduce((balance, response) => {
    incrementCount(balance.categories, response.category);
    incrementCount(balance.subcategories, response.subcategory);
    incrementCount(balance.sources, response.source);
    incrementCount(balance.difficultyBands, difficultyBand(response.difficulty).key);
    return balance;
  }, {
    categories: {},
    subcategories: {},
    sources: {},
    difficultyBands: {}
  });
}

function sessionBalancePenalty(question, balance) {
  const targets = state.mixTargets || createMixTargets();
  const nextPosition = state.responses.length + 1;
  const categoryTarget = targets.categoryTargets[question.category] || TOTAL_QUESTIONS / 2;
  const subcategoryTarget = targets.subcategoryTargets[question.subcategory] || 5;
  const band = difficultyBand(question.difficulty);
  const bandTarget = targets.difficultyTargets[band.key] || band.target;
  const sourceTarget = targets.sourceTarget;
  const categoryCount = balance.categories[question.category] || 0;
  const subcategoryCount = balance.subcategories[question.subcategory] || 0;
  const bandCount = balance.difficultyBands[band.key] || 0;
  const sourceCount = balance.sources[question.source] || 0;
  let penalty = 0;

  penalty += pacedQuotaPenalty(categoryCount, categoryTarget, nextPosition, 0.9, 1.1);
  penalty += pacedQuotaPenalty(subcategoryCount, subcategoryTarget, nextPosition, 0.35, 0.32);
  penalty += pacedQuotaPenalty(bandCount, bandTarget, nextPosition, 1.2, 0.28);
  penalty += pacedQuotaPenalty(sourceCount, sourceTarget, nextPosition, 1, 0.24);

  if (categoryCount >= categoryTarget + 4) penalty += 6 + (categoryCount - categoryTarget) * 0.35;
  else if (categoryCount >= categoryTarget) penalty += 1.6 + (categoryCount - categoryTarget) * 0.2;
  else if (categoryCount < categoryTarget - 5) penalty -= 0.04;

  if (subcategoryCount >= subcategoryTarget + 2) penalty += 4 + (subcategoryCount - subcategoryTarget) * 0.5;
  else if (subcategoryCount >= subcategoryTarget) penalty += 1.2 + (subcategoryCount - subcategoryTarget) * 0.32;
  else if (subcategoryCount < Math.max(1, subcategoryTarget - 2)) penalty -= 0.06;

  if (state.responses.length >= 16 && bandCount >= bandTarget) penalty += 0.28 + (bandCount - bandTarget) * 0.04;
  if (sourceCount >= sourceTarget + 2) penalty += 2.5 + (sourceCount - sourceTarget) * 0.35;
  else if (sourceCount >= sourceTarget) penalty += 0.22 + (sourceCount - sourceTarget) * 0.08;

  return penalty;
}

function pacedQuotaPenalty(count, finalTarget, nextPosition, tolerance, weight) {
  const expectedNow = (nextPosition / TOTAL_QUESTIONS) * finalTarget;
  if (count < expectedNow - tolerance) return -weight;
  if (count > expectedNow + tolerance) return weight;
  return 0;
}

function difficultyBand(difficulty) {
  return DIFFICULTY_BANDS.find((band) => difficulty <= band.max) || DIFFICULTY_BANDS[DIFFICULTY_BANDS.length - 1];
}

function incrementCount(counts, key) {
  counts[key] = (counts[key] || 0) + 1;
}

function desiredCategory() {
  const categoryCounts = responseBalance().categories;
  const grammarCount = categoryCounts.Grammar || 0;
  const vocabularyCount = categoryCounts.Vocabulary || 0;
  const categoryLimit = TOTAL_QUESTIONS / 2 + 4;
  if (grammarCount >= categoryLimit) return "Vocabulary";
  if (vocabularyCount >= categoryLimit) return "Grammar";

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
  renderCurrentQuestion();
  persistSession();
}

function renderCurrentQuestion() {
  if (!state.current) return;
  const displayNumber = clamp(state.answered ? state.questionIndex : state.questionIndex + 1, 1, TOTAL_QUESTIONS);
  document.getElementById("questionNumber").textContent = String(displayNumber);
  document.getElementById("totalQuestions").textContent = String(TOTAL_QUESTIONS);
  document.getElementById("meterFill").style.width = `${(displayNumber / TOTAL_QUESTIONS) * 100}%`;
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
      <input type="radio" name="answer" value="${escapeAttribute(option)}"${option === state.selected ? " checked" : ""}>
      <span>${option}</span>
    </label>
  `).join("");

  document.querySelectorAll("input[name='answer']").forEach((input) => {
    if (state.answered) {
      input.disabled = true;
      const option = input.closest(".answer-option");
      if (input.value === state.current.answer) option.classList.add("correct");
      if (input.checked && input.value !== state.current.answer) option.classList.add("incorrect");
      return;
    }
    input.addEventListener("change", (event) => {
      state.selected = event.target.value;
      persistSession();
    });
  });

  const feedback = document.getElementById("feedback");
  const button = document.getElementById("submitAnswer");
  if (state.answered) {
    const correct = state.selected === state.current.answer;
    feedback.textContent = correct ? "Correct." : `Not correct. Correct answer: ${formatAnswerForFeedback(state.current.answer)} ${state.current.explanation}`;
    feedback.className = `feedback ${correct ? "good" : "needs-work"}`;
    button.textContent = state.questionIndex >= TOTAL_QUESTIONS ? "Done" : "Next";
    button.disabled = state.questionIndex >= TOTAL_QUESTIONS;
  } else {
    feedback.textContent = "";
    feedback.className = "feedback";
    button.textContent = "Check answer";
    button.disabled = false;
  }
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
  if (state.questionIndex >= TOTAL_QUESTIONS && !state.completedAt) state.completedAt = new Date().toISOString();

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
  persistSession();
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
  const confidence = confidenceMetrics();
  document.getElementById("result-title").textContent = estimated ? `${cefrEstimate()} range` : "Answer 5 questions";
  document.getElementById("toeflScore").textContent = estimated ? toeflEstimate() : "after 5";
  document.getElementById("ieltsScore").textContent = estimated ? ieltsEstimate() : "after 5";
  document.getElementById("toeicScore").textContent = estimated ? toeicEstimate() : "after 5";
  document.getElementById("cefrScore").textContent = estimated ? cefrEstimate() : `${correctCount}/${state.responses.length || 0}`;
  document.getElementById("precisionText").textContent = precisionLabel();
  document.getElementById("confidenceScore").textContent = estimated ? `${confidence.score}%` : "--";
  document.getElementById("confidenceLabel").textContent = estimated ? confidence.label : `after ${FIRST_ESTIMATE_AT} answers`;
  renderWeaknesses();
  renderFinalReport();
}

function precisionLabel() {
  const answered = state.responses.length;
  if (answered < FIRST_ESTIMATE_AT) return `We show your first level after ${FIRST_ESTIMATE_AT} answers.`;
  const confidence = confidenceMetrics();
  if (answered >= TOTAL_QUESTIONS) return `Finished. Estimated range, ${confidence.label.toLowerCase()} confidence.`;
  return `${answered}/${TOTAL_QUESTIONS} answers. Estimated range, ${confidence.label.toLowerCase()} confidence.`;
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

function confidenceMetrics() {
  const answered = state.responses.length;
  if (answered < FIRST_ESTIMATE_AT) {
    return {
      score: 0,
      label: "Pending",
      summary: `Confidence starts after ${FIRST_ESTIMATE_AT} answers.`
    };
  }

  const sampleFactor = Math.sqrt(answered / TOTAL_QUESTIONS);
  const range = abilityRange();
  const rangeWidth = range.high - range.low;
  const precisionFactor = clamp(1 - ((rangeWidth - 0.35) / 2.1), 0, 1);
  const stabilityFactor = responseStabilityFactor();
  const coverageFactor = responseCoverageFactor();
  const stabilityWeight = 0.18 * (0.25 + (0.75 * sampleFactor));
  const coverageWeight = 0.1 * (0.35 + (0.65 * sampleFactor));
  const score = Math.round(clamp(
    100 * ((0.5 * sampleFactor) + (0.22 * precisionFactor) + (stabilityWeight * stabilityFactor) + (coverageWeight * coverageFactor)),
    18,
    95
  ));
  const label = score >= 75 ? "High" : score >= 50 ? "Moderate" : "Low";
  return {
    score,
    label,
    summary: `Estimated range, ${label.toLowerCase()} confidence (${score}%).`
  };
}

function responseStabilityFactor() {
  const values = state.responses.map((response) => response.difficulty + (response.correct ? 0.45 : -0.65));
  if (values.length < FIRST_ESTIMATE_AT) return 0;
  const midpoint = Math.max(1, Math.floor(values.length / 2));
  const earlyMean = mean(values.slice(0, midpoint));
  const lateMean = mean(values.slice(midpoint));
  const drift = Math.abs(earlyMean - lateMean);
  const recentSpread = standardDeviation(values.slice(-Math.min(25, values.length)));
  const driftFactor = 1 - clamp(drift / 2.2, 0, 1);
  const spreadFactor = 1 - clamp((recentSpread - 0.45) / 1.65, 0, 1);
  return clamp((driftFactor * 0.55) + (spreadFactor * 0.45), 0, 1);
}

function responseCoverageFactor() {
  const answered = Math.max(1, state.responses.length);
  const categories = new Set(state.responses.map((response) => response.category)).size / 2;
  const sources = new Set(state.responses.map((response) => response.source)).size / TEST_MIRRORS.length;
  const subcategories = new Set(state.responses.map((response) => response.subcategory)).size / Math.min(12, answered);
  const difficultyBands = new Set(state.responses.map((response) => difficultyBand(response.difficulty).key)).size / Math.min(3, DIFFICULTY_BANDS.length);
  return clamp((categories * 0.24) + (sources * 0.2) + (subcategories * 0.26) + (difficultyBands * 0.3), 0, 1);
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
  renderReportPreview(finished);
  report.hidden = !finished;
  report.classList.remove("is-pending");
  if (!finished) return;
  if (!state.completedAt) state.completedAt = new Date().toISOString();

  const correctCount = state.responses.filter((response) => response.correct).length;
  const confidence = confidenceMetrics();
  const copyButton = document.getElementById("copyReport");
  const copyStatus = document.getElementById("copyReportStatus");
  if (copyButton) copyButton.disabled = false;
  if (copyStatus) copyStatus.textContent = "";
  document.getElementById("finalReportDate").textContent = `Completed: ${formatReportDate(new Date(state.completedAt))}`;
  document.getElementById("finalCorrect").textContent = `${correctCount}/${TOTAL_QUESTIONS}`;
  document.getElementById("finalConfidenceScore").textContent = `${confidence.score}%`;
  document.getElementById("finalConfidenceText").textContent = `${confidence.summary} Confidence increases with a larger sample, steadier answers across difficulty levels, and balanced item coverage. This is for practice and placement conversations, not an official test score.`;
  document.getElementById("finalLevelRange").textContent = levelRangeEstimate();
  document.getElementById("finalCefr").textContent = cefrEstimate();
  document.getElementById("finalToefl").textContent = toeflEstimate();
  document.getElementById("finalIelts").textContent = ieltsEstimate();
  document.getElementById("finalToeic").textContent = toeicEstimate();
  renderReportChips("finalStrongAreas", strongestAreas(), "No clear strong area");
  renderReportChips("finalWeakAreas", weakestAreas(), "No clear weak area");
}

function renderReportPreview(finished) {
  const preview = document.getElementById("reportPreview");
  if (!preview) return;
  preview.hidden = finished;
  if (finished) return;
  const answered = state.responses.length;
  preview.classList.add("is-pending");
  document.getElementById("reportPreviewProgress").textContent = `${answered}/${TOTAL_QUESTIONS}`;
  document.getElementById("reportPreviewNote").textContent = `Preview only. Real level, score ranges, strong areas, and weak areas appear after ${TOTAL_QUESTIONS} answers.`;
  document.getElementById("reportPreviewLevel").textContent = "—";
  document.getElementById("reportPreviewCefr").textContent = "—";
  document.getElementById("reportPreviewToefl").textContent = "—";
  document.getElementById("reportPreviewIelts").textContent = "—";
  document.getElementById("reportPreviewToeic").textContent = "—";
  document.getElementById("reportPreviewConfidence").textContent = "—";
}

function copyFinalReport() {
  const status = document.getElementById("copyReportStatus");
  if (state.responses.length < TOTAL_QUESTIONS) {
    if (status) status.textContent = `Available after ${TOTAL_QUESTIONS} answers.`;
    return;
  }
  copyText(buildReportText())
    .then(() => {
      if (status) status.textContent = "Report copied.";
    })
    .catch(() => {
      if (status) status.textContent = "Copy did not work. Please take a screenshot.";
    });
}

function buildReportText() {
  const correctCount = state.responses.filter((response) => response.correct).length;
  const completedAt = state.completedAt ? new Date(state.completedAt) : new Date();
  const strongAreas = strongestAreas();
  const weakAreas = weakestAreas();
  const confidence = confidenceMetrics();
  return [
    "EnglishRoad Level Check - Unofficial report",
    `Completed: ${formatReportDate(completedAt)}`,
    `Confidence: ${confidence.label} (${confidence.score}%)`,
    `Total correct: ${correctCount}/${TOTAL_QUESTIONS}`,
    `EnglishRoad level range: ${levelRangeEstimate()}`,
    `CEFR estimate: ${cefrEstimate()}`,
    `TOEFL iBT estimate: ${toeflEstimate()}`,
    `IELTS estimate: ${ieltsEstimate()}`,
    `TOEIC L&R estimate: ${toeicEstimate()}`,
    `Strongest areas: ${strongAreas.length ? strongAreas.join(", ") : "No clear strong area"}`,
    `Weakest areas: ${weakAreas.length ? weakAreas.join(", ") : "No clear weak area"}`,
    "Note: This is an unofficial estimated range for practice and placement conversations, not an official test score."
  ].join("\n");
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
  clearSavedSession();
  state.questionIndex = 0;
  state.ability = 1.45;
  state.responses = [];
  state.candidateOrder = createCandidateOrder();
  state.usedIds = new Set();
  state.usedTexts = new Set();
  state.completedAt = "";
  state.optionPositionCounts = [0, 0, 0, 0];
  updateResults();
  renderQuestion();
}

function persistSession() {
  const storage = safeStorage();
  if (!storage || !state.bank.length || !state.current) return;

  const payload = {
    version: SESSION_VERSION,
    totalQuestions: TOTAL_QUESTIONS,
    bankSize: state.bank.length,
    savedAt: new Date().toISOString(),
    questionIndex: state.questionIndex,
    ability: state.ability,
    answered: state.answered,
    selected: state.selected,
    currentId: state.current.id,
    completedAt: state.completedAt,
    currentOptions: state.current.options,
    optionPositionCounts: state.optionPositionCounts,
    candidateOrderIds: state.candidateOrder.map((question) => question.id),
    usedIds: [...state.usedIds],
    responses: state.responses.map((response) => ({
      id: response.id,
      options: response.options,
      selected: response.selected,
      correct: response.correct
    }))
  };

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can fail in private browsing or locked-down school browsers.
  }
}

function restoreSession() {
  const storage = safeStorage();
  if (!storage) return false;

  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
    if (!saved || saved.version !== SESSION_VERSION || saved.totalQuestions !== TOTAL_QUESTIONS || saved.bankSize !== state.bank.length) return false;
    const byId = questionMap();
    const current = byId.get(saved.currentId);
    const candidateOrder = Array.isArray(saved.candidateOrderIds)
      ? saved.candidateOrderIds.map((id) => byId.get(id)).filter(Boolean)
      : [];
    const responses = Array.isArray(saved.responses)
      ? saved.responses.map((response) => hydrateResponse(response, byId)).filter(Boolean)
      : [];
    if (!current || !candidateOrder.length) return false;

    state.questionIndex = clamp(Number(saved.questionIndex) || responses.length, 0, TOTAL_QUESTIONS);
    state.ability = clamp(Number(saved.ability) || 1.45, 1, 6);
    state.responses = responses.slice(0, TOTAL_QUESTIONS);
    state.candidateOrder = candidateOrder;
    state.current = Array.isArray(saved.currentOptions) && saved.currentOptions.includes(current.answer)
      ? { ...current, options: saved.currentOptions }
      : current;
    state.answered = Boolean(saved.answered);
    state.selected = saved.selected || "";
    state.completedAt = saved.completedAt || "";
    state.optionPositionCounts = normalizeOptionPositionCounts(saved.optionPositionCounts);
    state.usedIds = new Set(Array.isArray(saved.usedIds) ? saved.usedIds.filter((id) => byId.has(id)) : []);
    state.usedTexts = new Set([...state.usedIds].map((id) => questionSignature(byId.get(id))));
    state.responses.forEach((response) => {
      state.usedIds.add(response.id);
      state.usedTexts.add(questionSignature(response));
    });
    state.usedIds.add(current.id);
    state.usedTexts.add(questionSignature(current));
    if (state.questionIndex >= TOTAL_QUESTIONS) {
      state.answered = true;
      if (!state.completedAt) state.completedAt = new Date().toISOString();
    }

    updateResults();
    renderCurrentQuestion();
    return true;
  } catch {
    clearSavedSession();
    return false;
  }
}

function hydrateResponse(savedResponse, byId) {
  const question = byId.get(savedResponse.id);
  if (!question) return null;
  return {
    ...question,
    options: Array.isArray(savedResponse.options) && savedResponse.options.includes(question.answer)
      ? savedResponse.options
      : question.options,
    selected: savedResponse.selected || "",
    correct: Boolean(savedResponse.correct)
  };
}

function normalizeOptionPositionCounts(counts) {
  if (!Array.isArray(counts) || counts.length < 4) return [0, 0, 0, 0];
  return counts.slice(0, 4).map((count) => Math.max(0, Number(count) || 0));
}

function questionMap() {
  return new Map(state.bank.map((question) => [question.id, question]));
}

function clearSavedSession() {
  const storage = safeStorage();
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

function safeStorage() {
  try {
    return window.localStorage || null;
  } catch {
    return null;
  }
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

function renderQaDashboard() {
  const dashboard = document.getElementById("qaDashboard");
  if (!dashboard) return;
  if (!isQaDashboardEnabled()) {
    dashboard.hidden = true;
    return;
  }

  const audit = auditItemBank();
  dashboard.hidden = false;
  dashboard.innerHTML = `
    <div class="qa-dashboard-header">
      <p class="label">Internal QA</p>
      <h2 id="qaDashboardTitle">Item Bank Dashboard</h2>
      <p>Shown only when the URL includes <strong>?qa=1</strong> or <strong>#qa</strong>.</p>
    </div>
    <div class="qa-actions">
      <button id="downloadQaReport" class="ghost-action" type="button">Download QA JSON</button>
    </div>
    <div class="qa-summary-grid">
      ${qaMetricCard("Total items", audit.total.toLocaleString())}
      ${qaMetricCard("Missing rationales", audit.missingRationales)}
      ${qaMetricCard("Duplicate-risk groups", audit.duplicateGroups)}
      ${qaMetricCard("Flagged ambiguity", audit.flaggedAmbiguity)}
      ${qaMetricCard("Display guidance flags", audit.displayFlags)}
      ${qaMetricCard("QA status issues", audit.qaStatusIssues)}
    </div>
    <div class="qa-table-grid">
      ${qaTable("By Category", audit.categoryCounts)}
      ${qaTable("By Difficulty Band", audit.difficultyCounts)}
      ${qaTable("By Source Mirror", audit.sourceCounts)}
      ${qaTable("By Practice Area", audit.subcategoryCounts)}
    </div>
    <section class="qa-issues">
      <h3>Flagged Items</h3>
      ${audit.flaggedItems.length ? `
        <table>
          <thead><tr><th>ID</th><th>Area</th><th>Issue</th></tr></thead>
          <tbody>
            ${audit.flaggedItems.map((item) => `
              <tr>
                <td>${escapeHtml(item.id)}</td>
                <td>${escapeHtml(learnerSubcategory(item.subcategory))}</td>
                <td>${escapeHtml(item.issue)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      ` : "<p>No flagged items in the generated bank.</p>"}
    </section>
  `;

  const exportButton = document.getElementById("downloadQaReport");
  if (exportButton) exportButton.addEventListener("click", () => downloadQaReport(audit));
}

function downloadQaReport(audit) {
  const payload = {
    generatedAt: new Date().toISOString(),
    bankSize: state.bank.length,
    summary: {
      total: audit.total,
      missingRationales: audit.missingRationales,
      duplicateGroups: audit.duplicateGroups,
      flaggedAmbiguity: audit.flaggedAmbiguity,
      displayFlags: audit.displayFlags,
      qaStatusIssues: audit.qaStatusIssues
    },
    counts: {
      category: Object.fromEntries(audit.categoryCounts),
      difficulty: Object.fromEntries(audit.difficultyCounts),
      source: Object.fromEntries(audit.sourceCounts),
      subcategory: Object.fromEntries(audit.subcategoryCounts)
    },
    flaggedItems: audit.flaggedItems
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "englishroad-item-qa.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function auditItemBank() {
  const signatureCounts = {};
  const flaggedItems = [];
  state.bank.forEach((question) => {
    incrementCount(signatureCounts, questionSignature(question));
    const issues = itemQaIssues(question);
    issues.forEach((issue) => flaggedItems.push({
      id: question.id,
      subcategory: question.subcategory,
      issue
    }));
  });

  return {
    total: state.bank.length,
    categoryCounts: sortedCountEntries(countByField(state.bank, "category")),
    difficultyCounts: sortedCountEntries(countByDifficultyBand(state.bank)),
    sourceCounts: sortedCountEntries(countByField(state.bank, "source")),
    subcategoryCounts: sortedCountEntries(countByField(state.bank, "subcategory")).map(([label, count]) => [learnerSubcategory(label), count]),
    missingRationales: state.bank.filter((question) => !question.rationales || question.options.some((option) => !question.rationales[option])).length,
    duplicateGroups: Object.values(signatureCounts).filter((count) => count > 1).length,
    flaggedAmbiguity: state.bank.filter(hasKnownAnswerAmbiguity).length,
    displayFlags: state.bank.filter(hasDisplayGuidanceProblem).length,
    qaStatusIssues: state.bank.filter((question) => question.qaStatus !== "screened").length,
    flaggedItems: flaggedItems.slice(0, 80)
  };
}

function itemQaIssues(question) {
  const issues = [];
  if (!question.explanation) issues.push("Missing explanation");
  if (!question.rationales || question.options.some((option) => !question.rationales[option])) issues.push("Missing option rationale");
  if (question.qaStatus !== "screened") issues.push("QA status is not screened");
  if (hasKnownAnswerAmbiguity(question)) issues.push("Possible answer ambiguity");
  if (hasKnownAwkwardPhrase(question)) issues.push("Known awkward phrase");
  const displayProblem = hasDisplayGuidanceProblem(question);
  if (displayProblem) issues.push(displayProblem);
  if (new Set(question.options.map(normalizeQuestionText)).size !== question.options.length) issues.push("Duplicate normalized option");
  return issues;
}

function qaMetricCard(label, value) {
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </div>
  `;
}

function qaTable(title, entries) {
  return `
    <section>
      <h3>${escapeHtml(title)}</h3>
      <table>
        <thead><tr><th>Group</th><th>Items</th></tr></thead>
        <tbody>
          ${entries.map(([label, count]) => `
            <tr><td>${escapeHtml(String(label))}</td><td>${count}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function sortedCountEntries(counts) {
  return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function countByField(items, field) {
  return items.reduce((counts, item) => {
    incrementCount(counts, item[field] || "Missing");
    return counts;
  }, {});
}

function countByDifficultyBand(items) {
  return items.reduce((counts, item) => {
    incrementCount(counts, difficultyBand(item.difficulty).key);
    return counts;
  }, {});
}

function isQaDashboardEnabled() {
  const location = window.location || {};
  return String(location.search || "").includes("qa=1") || String(location.hash || "") === "#qa";
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

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values) {
  if (values.length < 2) return 0;
  const average = mean(values);
  const variance = values.reduce((sum, value) => sum + ((value - average) ** 2), 0) / values.length;
  return Math.sqrt(variance);
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
document.getElementById("copyReport").addEventListener("click", copyFinalReport);
state.bank = createQuestionBank();
state.mixTargets = createMixTargets();
document.getElementById("bankSize").textContent = state.bank.length.toLocaleString();
renderLanguageInfo(document.getElementById("languageSelect").value);
renderQaDashboard();
if (!restoreSession()) restart();
