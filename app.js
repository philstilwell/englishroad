const TOTAL_QUESTIONS = 120;
const FIRST_ESTIMATE_AT = 5;
const BANK_SIZE = 1500;
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

const languageGuides = {
  en: {
    title: "How to use EnglishRoad",
    purpose: "EnglishRoad helps English learners check their level. It is a practice tool, not an official test score.",
    functionText: "You answer multiple-choice questions. The questions start easy. They get harder only when many answers are correct. The app estimates TOEFL, IELTS, TOEIC, and CEFR levels and shows grammar and vocabulary areas to practice.",
    steps: [
      "Choose one answer and click Check answer.",
      "You see a first level after 5 answers.",
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

const names = ["Mina", "Carlos", "Aiko", "Nadia", "Omar", "Lena", "Sofia", "Daniel", "Rina", "Mateo", "Hana", "Jonas"];
const places = ["language center", "community college", "library", "training office", "customer service desk", "research lab", "travel agency", "health clinic", "housing office", "conference room"];
const reports = ["attendance report", "budget summary", "customer survey", "safety notice", "research abstract", "training schedule", "course outline", "travel itinerary"];
const topics = ["class schedules", "workplace training", "public transport", "customer feedback", "health appointments", "online learning", "housing rules", "research results", "budget planning", "job interviews"];
const simpleObjects = ["forms", "emails", "instructions", "notices", "receipts", "charts", "applications", "reports", "messages", "appointments"];
const programs = ["morning class", "evening class", "new-student orientation", "staff workshop", "exam review group", "conversation club", "writing lab", "internship program", "parent meeting", "online seminar", "career clinic", "visitor briefing", "research update", "reading circle", "skills course", "placement meeting", "study group"];

const vocabularySets = {
  easySynonyms: [
    ["large", "big", "late", "cold", "near"],
    ["quick", "fast", "quiet", "heavy", "full"],
    ["begin", "start", "close", "carry", "sell"],
    ["help", "assist", "arrive", "divide", "invite"],
    ["buy", "purchase", "repair", "borrow", "cancel"],
    ["job", "position", "machine", "receipt", "hallway"],
    ["speak", "talk", "lend", "print", "pack"],
    ["need", "require", "refuse", "repair", "reduce"]
  ],
  workplace: [
    ["deadline", "the time something must be finished", "a person who trains employees", "a room for interviews", "a printed advertisement"],
    ["invoice", "a document requesting payment", "a list of holidays", "a message of apology", "a workplace rule"],
    ["supervisor", "a person who manages workers", "a customer complaint", "a delivery address", "a meeting agenda"],
    ["extension", "extra time to finish something", "a written signature", "a travel discount", "a safety problem"],
    ["appointment", "an arranged meeting", "a monthly salary", "a product manual", "an office supply"]
  ],
  academic: [
    ["consistent", "matching or agreeing with something", "easy to notice", "not lasting long", "based on luck"],
    ["significant", "important enough to notice", "too simple to use", "made by hand", "written in advance"],
    ["assumption", "an idea accepted before proof", "a final payment", "a public celebration", "a travel document"],
    ["indicate", "show or suggest", "hide completely", "copy exactly", "pay immediately"],
    ["method", "a way of doing something", "a result that cannot change", "a list of prices", "a private opinion"]
  ],
  contextMeanings: [
    ["The new rule may hinder small shops.", "hinder", "make progress difficult", "give official permission", "describe in detail", "pay in advance"],
    ["The manager tried to resolve the complaint.", "resolve", "find a solution to", "make larger", "read aloud", "delay without reason"],
    ["The evidence supports the speaker's claim.", "supports", "gives reason to believe", "makes impossible", "repeats exactly", "changes the topic"],
    ["The tutor emphasized the final paragraph.", "emphasized", "gave special attention to", "removed from the page", "translated into another language", "made shorter"],
    ["The policy will affect evening classes.", "affect", "change or influence", "protect from weather", "arrive before", "write by hand"]
  ],
  collocations: [
    ["make", "a decision", "do", "take", "build"],
    ["meet", "a deadline", "arrive", "touch", "hold"],
    ["give", "a presentation", "make", "take", "write"],
    ["reach", "an agreement", "arrive", "make", "hold"],
    ["raise", "a concern", "lift", "grow", "do"],
    ["take", "responsibility", "make", "give", "hold"]
  ],
  register: [
    ["The results indicate a moderate increase.", "The numbers kind of went up.", "Stuff got better, basically.", "It went up a bit, you know."],
    ["Please let me know if further information is required.", "Tell me if you need more stuff.", "You can ask if anything is missing.", "Hit me back if you want more."],
    ["The proposal should be revised before submission.", "The plan needs fixing before you send it.", "This thing should be changed first.", "Maybe tweak it before handing it in."],
    ["The applicant has relevant experience in customer service.", "The applicant knows customer-service stuff.", "The applicant has done this kind of thing.", "They have some useful work background."]
  ],
  nuance: [
    ["unlikely", "not expected to happen", "certain to happen", "already finished", "easy to measure"],
    ["roughly", "approximately", "exactly", "rarely", "immediately"],
    ["reluctant", "not willing", "not visible", "not careful", "not expensive"],
    ["plausible", "reasonable or believable", "impossible to explain", "required by law", "easy to pronounce"],
    ["subtle", "not obvious", "very loud", "already known", "fully complete"]
  ]
};

const blueprints = [
  {
    code: "g-present-simple",
    category: "Grammar",
    subcategory: "Verb tense",
    difficulty: 1.1,
    make: (i) => {
      const person = pick(names, i);
      const activity = pick(["review the vocabulary list", "check the class schedule", "answer client emails", "update the attendance sheet"], i, 2);
      return item(`Every Monday, ${person} ___ ${activity.replace(baseVerb(activity), "").trim()}.`, [thirdPerson(activity), activity, gerundPhrase(activity), `is ${gerundPhrase(activity)}`], thirdPerson(activity));
    }
  },
  {
    code: "g-past-simple",
    category: "Grammar",
    subcategory: "Verb tense",
    difficulty: 1.5,
    make: (i) => {
      const person = pick(names, i, 1);
      const action = pick([["sent", "send"], ["printed", "print"], ["joined", "join"], ["called", "call"], ["opened", "open"]], i);
      return item(`Yesterday, ${person} ___ the ${pick(simpleObjects, i)} before lunch.`, [action[0], action[1], `${action[1]}s`, `has ${action[0]}`], action[0]);
    }
  },
  {
    code: "g-articles",
    category: "Grammar",
    subcategory: "Articles",
    difficulty: 1.8,
    make: (i) => {
      const examples = [
        ["The receptionist gave me ___ appointment card.", "an"],
        ["We need ___ updated map for the new students.", "an"],
        ["Carlos found ___ useful chart in the report.", "a"],
        ["The office has ___ printer near the entrance.", "a"],
        ["Please read ___ instructions before signing.", "the"]
      ];
      const ex = pick(examples, i);
      return item(ex[0], ["a", "an", "the", "(nothing)"], ex[1]);
    }
  },
  {
    code: "g-prepositions-time",
    category: "Grammar",
    subcategory: "Prepositions",
    difficulty: 2.0,
    make: (i) => {
      const examples = [
        [`The workshop starts ___ ${pick(["Monday", "Friday", "Wednesday"], i)}.`, "on"],
        [`The interview begins ___ ${pick(["9:30", "2:15", "11:00"], i)}.`, "at"],
        [`The course begins ___ ${pick(["September", "January", "April"], i)}.`, "in"],
        [`The forms must arrive ___ Friday.`, "by"]
      ];
      const ex = pick(examples, i);
      return item(ex[0], ["in", "on", "at", "by"], ex[1]);
    }
  },
  {
    code: "g-count-noncount",
    category: "Grammar",
    subcategory: "Count and noncount nouns",
    difficulty: 2.2,
    make: (i) => {
      const examples = [
        ["The advisor gave us ___ information about the exam.", "some"],
        ["There are ___ application forms on the desk.", "several"],
        ["The teacher asked for ___ advice about the lesson plan.", "some"],
        ["The office received ___ complaints after the schedule changed.", "many"]
      ];
      const ex = pick(examples, i);
      return item(ex[0], ["some", "many", "several", "an"], ex[1]);
    }
  },
  {
    code: "g-subject-verb",
    category: "Grammar",
    subcategory: "Subject-verb agreement",
    difficulty: 2.6,
    make: (i) => {
      const noun = pick(["team", "department", "committee", "class"], i);
      return item(`Choose the correct sentence.`, [
        `The ${noun} is ready for the presentation.`,
        `The ${noun} are ready for the presentation.`,
        `The ${noun} have ready for the presentation.`,
        `The ${noun} were prepares for the presentation.`
      ], `The ${noun} is ready for the presentation.`);
    }
  },
  {
    code: "g-modals",
    category: "Grammar",
    subcategory: "Modals",
    difficulty: 2.8,
    make: (i) => item(`The safety notice says that visitors ___ wear identification badges inside the lab.`, ["must", "might", "used to", "would rather"], "must")
  },
  {
    code: "g-comparatives",
    category: "Grammar",
    subcategory: "Comparatives",
    difficulty: 3.0,
    make: (i) => {
      const adjective = pick([["clear", "clearer"], ["simple", "simpler"], ["fast", "faster"], ["quiet", "quieter"]], i);
      return item(`The revised instructions are ___ than the first version.`, [adjective[1], adjective[0], `more ${adjective[1]}`, `most ${adjective[0]}`], adjective[1]);
    }
  },
  {
    code: "g-connectors",
    category: "Grammar",
    subcategory: "Clauses and connectors",
    difficulty: 3.2,
    make: (i) => item(`Choose the best word to join the ideas: ___ the training room was small, everyone could see the screen clearly.`, ["Although", "Because", "Therefore", "Unless"], "Although")
  },
  {
    code: "g-first-conditional",
    category: "Grammar",
    subcategory: "Conditionals",
    difficulty: 3.4,
    make: (i) => {
      const result = pick(["more students will attend", "clients will receive faster replies", "the office will avoid delays", "visitors will find the room easily"], i);
      return item(`Choose the best words: If the schedule changes, ${result}.`, [result, result.replace("will ", "would "), result.replace("will ", "are "), result.replace("will ", "have ")], result);
    }
  },
  {
    code: "g-second-conditional",
    category: "Grammar",
    subcategory: "Conditionals",
    difficulty: 3.8,
    make: (i) => item(`Choose the best words: If the clinic added evening appointments, more patients ___ after work.`, ["could visit", "can visited", "will visiting", "visit"], "could visit")
  },
  {
    code: "g-passive",
    category: "Grammar",
    subcategory: "Passive voice",
    difficulty: 4.2,
    make: (i) => {
      const doc = pick(reports, i);
      return item(`The ${doc} ___ by the coordinator yesterday.`, ["was reviewed", "reviewed", "was reviewing", "has review"], "was reviewed");
    }
  },
  {
    code: "g-relative",
    category: "Grammar",
    subcategory: "Relative clauses",
    difficulty: 4.4,
    make: (i) => item(`Choose the best word: The applicant ___ resume arrived late still received an interview.`, ["whose", "who", "which", "where"], "whose")
  },
  {
    code: "g-reported-speech",
    category: "Grammar",
    subcategory: "Reported speech",
    difficulty: 4.8,
    make: (i) => item(`Choose the best way to tell another person: The manager said, "The meeting starts at noon."`, [
      "The manager said that the meeting started at noon.",
      "The manager said that the meeting start at noon.",
      "The manager said the meeting has start at noon.",
      "The manager said that noon starts the meeting."
    ], "The manager said that the meeting started at noon.")
  },
  {
    code: "g-reduced-clauses",
    category: "Grammar",
    subcategory: "Reduced clauses",
    difficulty: 5.3,
    make: (i) => item(`Choose the clearest short sentence.`, [
      "The data collected during the trial support the original hypothesis.",
      "The data which it was collected during the trial support the original hypothesis.",
      "The data collecting during the trial support the original hypothesis.",
      "The data were collected during the trial supporting the original hypothesis."
    ], "The data collected during the trial support the original hypothesis.")
  },
  {
    code: "g-inversion",
    category: "Grammar",
    subcategory: "Advanced sentence structure",
    difficulty: 5.8,
    make: (i) => item(`Choose the correct formal sentence.`, [
      "Only after the survey closed did the team analyze the responses.",
      "Only after the survey closed the team analyzed the responses.",
      "Only after closed the survey did analyze the team responses.",
      "Only after the survey did closed the team analyze responses."
    ], "Only after the survey closed did the team analyze the responses.")
  },
  {
    code: "v-easy-synonym",
    category: "Vocabulary",
    subcategory: "Everyday vocabulary",
    difficulty: 1.1,
    make: (i) => {
      const set = pick(vocabularySets.easySynonyms, i);
      return item(`Which word means almost the same as "${set[0]}"?`, set.slice(1), set[1]);
    }
  },
  {
    code: "v-workplace",
    category: "Vocabulary",
    subcategory: "Workplace vocabulary",
    difficulty: 1.7,
    make: (i) => {
      const set = pick(vocabularySets.workplace, i);
      return item(`In an office message, "${set[0]}" means ___.`, set.slice(1), set[1]);
    }
  },
  {
    code: "v-word-forms",
    category: "Vocabulary",
    subcategory: "Word forms",
    difficulty: 2.1,
    make: (i) => {
      const sets = [
        ["The tutor gave a clear ___ of the grammar rule.", "explanation", "explain", "explained", "explaining"],
        ["The office needs written ___ before it changes the booking.", "confirmation", "confirm", "confirmed", "confirming"],
        ["The chart gives a useful ___ of the survey results.", "comparison", "compare", "compared", "comparing"],
        ["The speaker made a brief ___ before the discussion.", "introduction", "introduce", "introduced", "introducing"]
      ];
      const set = pick(sets, i);
      return item(set[0], set.slice(1), set[1]);
    }
  },
  {
    code: "v-collocations",
    category: "Vocabulary",
    subcategory: "Collocations",
    difficulty: 2.5,
    make: (i) => {
      const set = pick(vocabularySets.collocations, i);
      return item(`Choose the word that sounds natural: The coordinator will ___ ${set[1]} before Friday.`, [set[0], set[2], set[3], set[4]], set[0]);
    }
  },
  {
    code: "v-phrasal-verbs",
    category: "Vocabulary",
    subcategory: "Phrasal verbs",
    difficulty: 2.9,
    make: (i) => {
      const sets = [
        ["Please fill ___ the application before the interview.", "out", "up", "over", "away"],
        ["The meeting was put ___ until Friday.", "off", "out", "up", "over"],
        ["The teacher pointed ___ the most common error.", "out", "in", "over", "through"],
        ["The receptionist looked ___ the appointment number.", "up", "off", "out", "away"]
      ];
      const set = pick(sets, i);
      return item(set[0], set.slice(1), set[1]);
    }
  },
  {
    code: "v-transitions",
    category: "Vocabulary",
    subcategory: "Transitions",
    difficulty: 3.2,
    make: (i) => item(`Choose the word that shows a different idea: The plan is inexpensive; ___, it may take too long.`, ["however", "therefore", "for example", "similarly"], "however")
  },
  {
    code: "v-context-meaning",
    category: "Vocabulary",
    subcategory: "Meaning in context",
    difficulty: 3.5,
    make: (i) => {
      const set = pick(vocabularySets.contextMeanings, i);
      return item(`What does "${set[1]}" mean in this sentence? ${set[0]}`, set.slice(2), set[2]);
    }
  },
  {
    code: "v-academic",
    category: "Vocabulary",
    subcategory: "Academic vocabulary",
    difficulty: 3.9,
    make: (i) => {
      const set = pick(vocabularySets.academic, i);
      return item(`In school or work reading, "${set[0]}" means ___.`, set.slice(1), set[1]);
    }
  },
  {
    code: "v-register",
    category: "Vocabulary",
    subcategory: "Register",
    difficulty: 4.3,
    make: (i) => {
      const set = pick(vocabularySets.register, i);
      return item(`Which sentence is most appropriate for a formal report?`, set, set[0]);
    }
  },
  {
    code: "v-nuance",
    category: "Vocabulary",
    subcategory: "Nuance",
    difficulty: 4.7,
    make: (i) => {
      const set = pick(vocabularySets.nuance, i);
      return item(`Which meaning best matches "${set[0]}"?`, set.slice(1), set[1]);
    }
  },
  {
    code: "v-hedging",
    category: "Vocabulary",
    subcategory: "Hedging and precision",
    difficulty: 5.2,
    make: (i) => item(`Which sentence is careful and not too strong?`, [
      "The findings suggest that attendance may affect course completion.",
      "The findings prove that attendance always causes success.",
      "The findings are totally certain for every student.",
      "The findings show that no other factor matters."
    ], "The findings suggest that attendance may affect course completion.")
  },
  {
    code: "v-discourse",
    category: "Vocabulary",
    subcategory: "Discourse function",
    difficulty: 5.6,
    make: (i) => item(`Which sentence says one problem with a study?`, [
      "One limitation of this study is that the sample was small.",
      "This study is perfect because the sample was small.",
      "The sample was small, so the topic is not worth discussing.",
      "A small sample proves that the results are universal."
    ], "One limitation of this study is that the sample was small.")
  }
];

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
  mirrorStats: {}
};

function createQuestionBank() {
  const bank = [];
  for (let i = 0; i < BANK_SIZE; i += 1) {
    const blueprint = blueprints[i % blueprints.length];
    const made = blueprint.make(i);
    const mirror = TEST_MIRRORS[Math.floor(i / blueprints.length) % TEST_MIRRORS.length];
    const prompt = contextualize(made.text, blueprint, i);
    bank.push({
      id: `${blueprint.code}-${i + 1}`,
      blueprint: blueprint.code,
      category: blueprint.category,
      subcategory: blueprint.subcategory,
      source: mirror,
      difficulty: jitterDifficulty(blueprint.difficulty, i),
      setupText: prompt.setup,
      taskText: prompt.task,
      text: prompt.fullText,
      options: shuffleStable(uniqueOptions(made.options), i),
      answer: made.answer
    });
  }
  validateBank(bank);
  return bank;
}

function item(text, options, answer) {
  return { text, options, answer };
}

function contextualize(text, blueprint, index) {
  const name = pick(names, index, 7);
  const topic = pick(topics, index, 3);
  const report = pick(reports, index, 5);
  const program = pick(programs, index, 11);
  const setup = blueprint.category === "Grammar"
    ? `During an English class in the ${program}, ${name} reads from the ${report} about ${topic}.`
    : `During a vocabulary lesson in the ${program}, ${name} reads from the ${report} about ${topic}.`;
  return {
    setup,
    task: text,
    fullText: `${setup} ${text}`
  };
}

function validateBank(bank) {
  const textSet = new Set();
  const issues = [];
  bank.forEach((question) => {
    const key = normalizeQuestionText(question.text);
    if (textSet.has(key)) issues.push(`Duplicate prompt: ${question.text}`);
    textSet.add(key);
    if (!question.options.includes(question.answer)) issues.push(`Missing answer: ${question.id}`);
    if (new Set(question.options).size !== question.options.length) issues.push(`Duplicate option: ${question.id}`);
    if (question.options.length !== 4) issues.push(`Wrong option count: ${question.id}`);
    if (!question.category || !question.subcategory || !question.difficulty) issues.push(`Missing metadata: ${question.id}`);
    if (!question.setupText || !question.taskText) issues.push(`Missing display parts: ${question.id}`);
    if (!learnerSubcategoryLabels[question.subcategory]) issues.push(`Missing learner label: ${question.subcategory}`);
    const technicalTerm = forbiddenPromptTerms.find((term) => normalizeQuestionText(question.taskText).includes(term));
    if (technicalTerm) issues.push(`Technical prompt term "${technicalTerm}": ${question.id}`);
    if (question.options.includes("no article")) issues.push(`Use (nothing), not no article: ${question.id}`);
    if (hasKnownAnswerAmbiguity(question)) issues.push(`Possible multiple correct answers: ${question.id}`);
  });
  if (issues.length) throw new Error(`Question bank failed QA: ${issues.slice(0, 5).join(" | ")}`);
}

function hasKnownAnswerAmbiguity(question) {
  const task = normalizeQuestionText(question.taskText);
  return task.includes("due ___ the end of the week") && question.options.includes("at") && question.options.includes("by");
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
    if (state.usedIds.has(question.id) || state.usedTexts.has(normalizeQuestionText(question.text))) continue;
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
  state.usedTexts.add(normalizeQuestionText(best.text));
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
    state.current.source,
    `Level ${state.current.difficulty.toFixed(1)}`
  ].map((tag) => `<span class="tag">${tag}</span>`).join("");
  document.getElementById("questionText").innerHTML = `
    <span class="question-setup">
      <span class="question-part-label">Situation</span>
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
  updateMirrorStats(correct);
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
  feedback.textContent = correct ? "Good answer." : `Not correct. Answer: ${state.current.answer}`;
  feedback.className = `feedback ${correct ? "good" : "needs-work"}`;

  updateResults();

  const button = document.getElementById("submitAnswer");
  if (state.questionIndex >= TOTAL_QUESTIONS) {
    button.textContent = "Done";
    button.disabled = true;
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

function updateMirrorStats(correct) {
  const mirror = state.current.source;
  state.mirrorStats[mirror] = state.mirrorStats[mirror] || { answered: 0, correct: 0 };
  state.mirrorStats[mirror].answered += 1;
  if (correct) state.mirrorStats[mirror].correct += 1;
}

function updateResults() {
  const band = cefrFromAbility(state.ability);
  const estimated = state.responses.length >= FIRST_ESTIMATE_AT;
  const correctCount = state.responses.filter((response) => response.correct).length;
  document.getElementById("result-title").textContent = estimated ? `${band} level` : "Answer 5 questions";
  document.getElementById("toeflScore").textContent = estimated ? toeflEstimate() : "after 5";
  document.getElementById("ieltsScore").textContent = estimated ? ieltsEstimate() : "after 5";
  document.getElementById("toeicScore").textContent = estimated ? toeicEstimate() : "after 5";
  document.getElementById("cefrScore").textContent = estimated ? cefrEstimate() : `${correctCount}/${state.responses.length || 0}`;
  document.getElementById("precisionText").textContent = precisionLabel();
  renderWeaknesses();
}

function precisionLabel() {
  const answered = state.responses.length;
  if (answered < FIRST_ESTIMATE_AT) return `We show your first level after ${FIRST_ESTIMATE_AT} answers.`;
  if (answered >= TOTAL_QUESTIONS) return "Finished. This is your final result.";
  return `${answered}/${TOTAL_QUESTIONS} answers. Keep going. The level gets more exact.`;
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

function restart() {
  state.questionIndex = 0;
  state.ability = 1.45;
  state.responses = [];
  state.candidateOrder = createCandidateOrder();
  state.usedIds = new Set();
  state.usedTexts = new Set();
  state.mirrorStats = {};
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
