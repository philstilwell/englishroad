const TOTAL_QUESTIONS = 120;
const FIRST_ESTIMATE_AT = 5;
const REPORT_THRESHOLD = 60;
const BANK_SIZE = 1500;
const TEST_MIRRORS = ["TOEFL", "IELTS", "TOEIC", "CEFR"];
const REPORT_RECIPIENT = ["cGhpbHN0aWx3ZWxs", "eWFob28", "Y29t"];

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
      "After 60 answers, you can send your results. Sending ends the quiz.",
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
      "60問答えると、結果を送信できます。送信するとクイズは終了します。",
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
      "回答 60 题后，你可以发送结果。发送后，测验会结束。",
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
      "Después de 60 respuestas, puedes enviar tus resultados. Al enviarlos, el cuestionario termina.",
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
      "60 సమాధానాల తర్వాత మీ ఫలితాలను పంపవచ్చు. పంపిన తర్వాత క్విజ్ ముగుస్తుంది.",
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
      "Depois de 60 respostas, você pode enviar seus resultados. Ao enviar, o quiz termina.",
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
      "Po 60 odpowiedziach możesz wysłać wyniki. Po wysłaniu quiz się kończy.",
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
      "60문제에 답하면 결과를 보낼 수 있습니다. 보내면 퀴즈가 끝납니다.",
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
      "Après 60 réponses, vous pouvez envoyer vos résultats. L’envoi termine le quiz.",
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
const practiceSettings = ["an English practice activity", "an English study session", "a short English lesson", "an English review activity", "an English level check", "an English reading exercise", "an English class exercise", "an English warm-up task", "an English practice round", "an English learning activity"];
const practiceMaterials = ["worksheet", "practice card", "exercise page", "study screen", "review sheet", "sample question", "class handout", "workbook page", "quiz page", "learning app"];
const practicePurposes = {
  Grammar: ["grammar practice", "sentence practice", "verb practice", "word order practice", "grammar review", "accuracy practice", "sentence review", "form practice", "English practice", "level practice"],
  Vocabulary: ["word practice", "meaning practice", "phrase practice", "reading practice", "word review", "vocabulary review", "English practice", "level practice", "usage practice", "study practice"]
};

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
    ["take", "responsibility", "make", "give", "hold"],
    ["submit", "an application", "give", "make", "hold"],
    ["solve", "a problem", "answer", "make", "hold"],
    ["follow", "instructions", "make", "do", "hold"],
    ["send", "a message", "make", "take", "hold"],
    ["book", "an appointment", "do", "hold", "reach"],
    ["set", "a goal", "do", "take", "hold"],
    ["share", "information", "make", "do", "hold"],
    ["prepare", "a report", "make", "answer", "hold"]
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
      const action = pick([
        ["review", "reviews", "reviewing", "the vocabulary list"],
        ["check", "checks", "checking", "the class schedule"],
        ["answer", "answers", "answering", "client emails"],
        ["update", "updates", "updating", "the attendance sheet"],
        ["read", "reads", "reading", "the weekly notice"],
        ["prepare", "prepares", "preparing", "the lesson plan"]
      ], i, 2);
      return item(`Every Monday, ${person} ___ ${action[3]}.`, [action[1], action[0], action[2], `is ${action[2]}`], action[1]);
    }
  },
  {
    code: "g-past-simple",
    category: "Grammar",
    subcategory: "Verb tense",
    difficulty: 1.5,
    make: (i) => {
      const person = pick(names, i, 1);
      const action = pick([
        ["sent", "send", "sends", "has sent", "the emails"],
        ["printed", "print", "prints", "has printed", "the forms"],
        ["joined", "join", "joins", "has joined", "the meeting"],
        ["called", "call", "calls", "has called", "the client"],
        ["opened", "open", "opens", "has opened", "the office"],
        ["checked", "check", "checks", "has checked", "the schedule"],
        ["answered", "answer", "answers", "has answered", "the messages"],
        ["completed", "complete", "completes", "has completed", "the application"]
      ], i);
      return item(`Yesterday, ${person} ___ ${action[4]} before lunch.`, [action[0], action[1], action[2], action[3]], action[0]);
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
      const prompt = pick([
        "Choose the correct sentence.",
        "Which sentence is correct?",
        "Pick the correct sentence.",
        "Find the correct sentence.",
        "Choose the sentence that is right.",
        "Which sentence is right?"
      ], i);
      return item(prompt, [
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
    make: (i) => {
      const examples = [
        ["The safety notice says that visitors ___ wear identification badges inside the lab.", "must"],
        ["The class rule says students ___ turn off phones during the test.", "must"],
        ["The form says applicants ___ sign their names at the bottom.", "must"],
        ["The library notice says readers ___ return books by Friday.", "must"],
        ["The clinic sign says patients ___ check in before the appointment.", "must"],
        ["The travel rule says passengers ___ show photo ID at the desk.", "must"],
        ["The office policy says workers ___ lock the door after evening class.", "must"],
        ["The test instructions say students ___ write their names on every page.", "must"]
      ];
      const ex = pick(examples, i);
      return item(ex[0], [ex[1], "might", "used to", "would rather"], ex[1]);
    }
  },
  {
    code: "g-comparatives",
    category: "Grammar",
    subcategory: "Comparatives",
    difficulty: 3.0,
    make: (i) => {
      const examples = [
        ["This route is ___ than the old route.", "short", "shorter"],
        ["The new room is ___ than the first room.", "large", "larger"],
        ["The second train is ___ than the first train.", "fast", "faster"],
        ["The winter class is ___ than the summer class.", "small", "smaller"],
        ["This chair is ___ than the chair near the door.", "low", "lower"],
        ["The morning lesson is ___ than the evening lesson.", "early", "earlier"],
        ["The new printer is ___ than the old printer.", "quick", "quicker"],
        ["The blue sign is ___ than the gray sign.", "bright", "brighter"],
        ["The used book is ___ than the new book.", "cheap", "cheaper"],
        ["The first answer is ___ than the second answer.", "long", "longer"],
        ["The online form is ___ than the paper form.", "new", "newer"],
        ["The classroom is ___ than the hallway.", "warm", "warmer"]
      ];
      const ex = pick(examples, i);
      return item(ex[0], [ex[2], ex[1], `more ${ex[1]}`, `most ${ex[1]}`], ex[2], `comparative:${ex[1]}`);
    }
  },
  {
    code: "g-connectors",
    category: "Grammar",
    subcategory: "Clauses and connectors",
    difficulty: 3.2,
    make: (i) => {
      const examples = [
        ["___ the training room was small, everyone could see the screen clearly.", "Although"],
        ["___ the rain was heavy, the bus arrived on time.", "Although"],
        ["___ the form looked simple, several students made mistakes.", "Although"],
        ["___ the speaker talked quickly, the main idea was clear.", "Although"],
        ["___ the office was busy, the clerk answered every question.", "Although"],
        ["___ the book was short, it gave useful examples.", "Although"],
        ["___ the lesson was difficult, the class finished the activity.", "Although"],
        ["___ the schedule changed, most people arrived early.", "Although"]
      ];
      const ex = pick(examples, i);
      return item(`Choose the best word to join the ideas: ${ex[0]}`, [ex[1], "Because", "Therefore", "Unless"], ex[1]);
    }
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
    make: (i) => {
      const examples = [
        ["If the clinic added evening appointments, more patients ___ after work.", "could visit"],
        ["If the library opened earlier, more students ___ before class.", "could study"],
        ["If the office hired another clerk, customers ___ help faster.", "could get"],
        ["If the course offered online lessons, more workers ___ after dinner.", "could join"],
        ["If the bus stopped near the school, students ___ there easily.", "could travel"],
        ["If the form were shorter, applicants ___ it more quickly.", "could finish"],
        ["If the room had more chairs, visitors ___ comfortably.", "could sit"],
        ["If the teacher gave examples, the class ___ the rule better.", "could understand"]
      ];
      const ex = pick(examples, i);
      return item(`Choose the best words: ${ex[0]}`, [ex[1], ex[1].replace("could ", "can "), ex[1].replace("could ", "will "), ex[1].replace("could ", "")], ex[1]);
    }
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
    make: (i) => {
      const examples = [
        "The applicant ___ resume arrived late still received an interview.",
        "The student ___ notebook was missing asked for another copy.",
        "The worker ___ badge was lost reported it to security.",
        "The teacher ___ class ended early stayed to answer questions.",
        "The client ___ appointment was canceled called the office.",
        "The researcher ___ data were incomplete repeated the survey.",
        "The driver ___ license had expired could not rent the car.",
        "The guest ___ ticket was damaged went to the service desk."
      ];
      return item(`Choose the best word: ${pick(examples, i)}`, ["whose", "who", "which", "where"], "whose");
    }
  },
  {
    code: "g-reported-speech",
    category: "Grammar",
    subcategory: "Reported speech",
    difficulty: 4.8,
    make: (i) => {
      const examples = [
        ["The manager said, \"The meeting starts at noon.\"", "The manager said that the meeting started at noon.", "The manager said that the meeting start at noon.", "The manager said the meeting has start at noon.", "The manager said that noon starts the meeting."],
        ["The teacher said, \"The test begins at nine.\"", "The teacher said that the test began at nine.", "The teacher said that the test begin at nine.", "The teacher said the test has begin at nine.", "The teacher said that nine begins the test."],
        ["The clerk said, \"The office closes at five.\"", "The clerk said that the office closed at five.", "The clerk said that the office close at five.", "The clerk said the office has close at five.", "The clerk said that five closes the office."],
        ["The guide said, \"The bus leaves at six.\"", "The guide said that the bus left at six.", "The guide said that the bus leave at six.", "The guide said the bus has leave at six.", "The guide said that six leaves the bus."],
        ["The nurse said, \"The clinic opens at eight.\"", "The nurse said that the clinic opened at eight.", "The nurse said that the clinic open at eight.", "The nurse said the clinic has open at eight.", "The nurse said that eight opens the clinic."],
        ["The trainer said, \"The lesson ends at four.\"", "The trainer said that the lesson ended at four.", "The trainer said that the lesson end at four.", "The trainer said the lesson has end at four.", "The trainer said that four ends the lesson."],
        ["The assistant said, \"The report arrives today.\"", "The assistant said that the report arrived that day.", "The assistant said that the report arrive that day.", "The assistant said the report has arrive today.", "The assistant said that day arrives the report."],
        ["The director said, \"The program starts next week.\"", "The director said that the program started the next week.", "The director said that the program start the next week.", "The director said the program has start next week.", "The director said that next week starts the program."]
      ];
      const ex = pick(examples, i);
      return item(`Choose the best way to tell another person: ${ex[0]}`, ex.slice(1), ex[1]);
    }
  },
  {
    code: "g-reduced-clauses",
    category: "Grammar",
    subcategory: "Reduced clauses",
    difficulty: 5.3,
    make: (i) => {
      const examples = [
        ["Choose the clearest short sentence.", "The data collected during the trial support the original hypothesis.", "The data which it was collected during the trial support the original hypothesis.", "The data collecting during the trial support the original hypothesis.", "The data were collected during the trial supporting the original hypothesis."],
        ["Choose the clearest short sentence.", "The forms submitted after Friday require special approval.", "The forms which they submitted after Friday require special approval.", "The forms submitting after Friday require special approval.", "The forms were submitted after Friday requiring special approval."],
        ["Choose the clearest short sentence.", "The notes written during the meeting explain the decision.", "The notes which they were written during the meeting explain the decision.", "The notes writing during the meeting explain the decision.", "The notes were written during the meeting explaining the decision."],
        ["Choose the clearest short sentence.", "The emails sent before noon reached every participant.", "The emails which they were sent before noon reached every participant.", "The emails sending before noon reached every participant.", "The emails were sent before noon reaching every participant."],
        ["Choose the clearest short sentence.", "The survey completed by the students shows clear progress.", "The survey which it completed by the students shows clear progress.", "The survey completing by the students shows clear progress.", "The survey was completed by the students showing clear progress."],
        ["Choose the clearest short sentence.", "The schedule posted near the door lists all room changes.", "The schedule which it was posted near the door lists all room changes.", "The schedule posting near the door lists all room changes.", "The schedule was posted near the door listing all room changes."],
        ["Choose the clearest short sentence.", "The chart prepared for the lesson compares two answers.", "The chart which it was prepared for the lesson compares two answers.", "The chart preparing for the lesson compares two answers.", "The chart was prepared for the lesson comparing two answers."],
        ["Choose the clearest short sentence.", "The rules printed on the card apply to all visitors.", "The rules which they printed on the card apply to all visitors.", "The rules printing on the card apply to all visitors.", "The rules were printed on the card applying to all visitors."]
      ];
      const ex = pick(examples, i);
      return item(ex[0], ex.slice(1), ex[1]);
    }
  },
  {
    code: "g-inversion",
    category: "Grammar",
    subcategory: "Advanced sentence structure",
    difficulty: 5.8,
    make: (i) => {
      const examples = [
        ["Only after the survey closed did the team analyze the responses.", "Only after the survey closed the team analyzed the responses.", "Only after closed the survey did analyze the team responses.", "Only after the survey did closed the team analyze responses."],
        ["Only after the meeting ended did the manager send the notes.", "Only after the meeting ended the manager sent the notes.", "Only after ended the meeting did send the manager notes.", "Only after the meeting did ended the manager send notes."],
        ["Only after the data arrived did the researcher write the report.", "Only after the data arrived the researcher wrote the report.", "Only after arrived the data did write the researcher report.", "Only after the data did arrived the researcher write report."],
        ["Only after the class finished did the teacher collect the papers.", "Only after the class finished the teacher collected the papers.", "Only after finished the class did collect the teacher papers.", "Only after the class did finished the teacher collect papers."],
        ["Only after the office opened did the clerk answer the calls.", "Only after the office opened the clerk answered the calls.", "Only after opened the office did answer the clerk calls.", "Only after the office did opened the clerk answer calls."],
        ["Only after the rule changed did the school update the form.", "Only after the rule changed the school updated the form.", "Only after changed the rule did update the school form.", "Only after the rule did changed the school update form."],
        ["Only after the test began did the students see the instructions.", "Only after the test began the students saw the instructions.", "Only after began the test did see the students instructions.", "Only after the test did began the students see instructions."],
        ["Only after the clinic closed did the nurse check the schedule.", "Only after the clinic closed the nurse checked the schedule.", "Only after closed the clinic did check the nurse schedule.", "Only after the clinic did closed the nurse check schedule."]
      ];
      const set = pick(examples, i);
      return item(`Choose the correct formal sentence.`, set, set[0]);
    }
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
        ["The tutor gave a clear ___ of the grammar rule.", "explanation", "explain", "explained", "explaining", "explain"],
        ["The office needs written ___ before it changes the booking.", "confirmation", "confirm", "confirmed", "confirming", "confirm"],
        ["The worksheet includes a short ___ of the survey results.", "summary", "summarize", "summarized", "summarizing", "summarize"],
        ["The speaker made a brief ___ before the discussion.", "introduction", "introduce", "introduced", "introducing", "introduce"],
        ["The teacher asked for a quick ___ before class ended.", "decision", "decide", "decided", "deciding", "decide"],
        ["The lesson showed clear ___ after more practice.", "improvement", "improve", "improved", "improving", "improve"],
        ["The student gave a polite ___ to the question.", "response", "respond", "responded", "responding", "respond"],
        ["The office sent a request for ___ before Friday.", "payment", "pay", "paid", "paying", "pay"],
        ["The program requires an online ___ first.", "application", "apply", "applied", "applying", "apply"],
        ["The two groups reached an ___ after the meeting.", "agreement", "agree", "agreed", "agreeing", "agree"],
        ["The form asks for a short ___ of the problem.", "description", "describe", "described", "describing", "describe"],
        ["The activity begins with a clear ___ from the teacher.", "instruction", "instruct", "instructed", "instructing", "instruct"],
        ["The list shows the final ___ for the course.", "selection", "select", "selected", "selecting", "select"],
        ["The manager gave official ___ for the new plan.", "approval", "approve", "approved", "approving", "approve"],
        ["The club sent an ___ to every new student.", "invitation", "invite", "invited", "inviting", "invite"],
        ["The report includes a careful ___ of the answers.", "analysis", "analyze", "analyzed", "analyzing", "analyze"]
      ];
      const set = pick(sets, i);
      return item(set[0], set.slice(1, 5), set[1], `word-form:${set[5]}`);
    }
  },
  {
    code: "v-collocations",
    category: "Vocabulary",
    subcategory: "Collocations",
    difficulty: 2.5,
    make: (i) => {
      const set = pick(vocabularySets.collocations, i);
      return item(`Choose the word that sounds natural: The coordinator will ___ ${set[1]} before Friday.`, [set[0], set[2], set[3], set[4]], set[0], `words-together:${set[0]} ${set[1]}`);
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
    make: (i) => {
      const examples = [
        "The plan is inexpensive; ___, it may take too long.",
        "The room is small; ___, it has enough chairs.",
        "The form is short; ___, some questions are difficult.",
        "The course is useful; ___, it requires a lot of homework.",
        "The office is busy; ___, the staff answer calls quickly.",
        "The book is old; ___, the examples are still helpful.",
        "The bus is slow; ___, it is cheaper than a taxi.",
        "The lesson is hard; ___, most students can follow it."
      ];
      return item(`Choose the word that shows a different idea: ${pick(examples, i)}`, ["however", "therefore", "for example", "similarly"], "however");
    }
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
    make: (i) => {
      const examples = [
        ["The findings suggest that attendance may affect course completion.", "The findings prove that attendance always causes success.", "The findings are totally certain for every student.", "The findings show that no other factor matters."],
        ["The survey results suggest that cost may influence enrollment.", "The survey results prove that cost always controls enrollment.", "The survey results are totally certain for every school.", "The survey results show that no other issue matters."],
        ["The data indicate that class size may affect participation.", "The data prove that class size always causes participation.", "The data are totally certain for every class.", "The data show that no other factor matters."],
        ["The responses suggest that clearer instructions may reduce errors.", "The responses prove that instructions always remove all errors.", "The responses are totally certain for every student.", "The responses show that no other problem matters."],
        ["The pattern suggests that practice may improve test performance.", "The pattern proves that practice always guarantees high scores.", "The pattern is totally certain for every learner.", "The pattern shows that no other factor matters."],
        ["The chart indicates that wait times may affect satisfaction.", "The chart proves that wait times always cause satisfaction.", "The chart is totally certain for every customer.", "The chart shows that no other detail matters."],
        ["The report suggests that reminders may increase attendance.", "The report proves that reminders always force attendance.", "The report is totally certain for every event.", "The report shows that no other factor matters."],
        ["The results indicate that location may influence student choice.", "The results prove that location always controls student choice.", "The results are totally certain for every student.", "The results show that no other factor matters."]
      ];
      const set = pick(examples, i);
      return item(`Which sentence is careful and not too strong?`, set, set[0]);
    }
  },
  {
    code: "v-discourse",
    category: "Vocabulary",
    subcategory: "Discourse function",
    difficulty: 5.6,
    make: (i) => {
      const examples = [
        ["One limitation of this study is that the sample was small.", "This study is perfect because the sample was small.", "The sample was small, so the topic is not worth discussing.", "A small sample proves that the results are universal."],
        ["One limitation of this survey is that most responses came from one school.", "This survey is perfect because most responses came from one school.", "One school answered, so the topic is not worth discussing.", "Responses from one school prove that the results are universal."],
        ["One limitation of this report is that it uses data from only two months.", "This report is perfect because it uses data from only two months.", "Two months of data mean the topic is not worth discussing.", "Two months of data prove that the results are universal."],
        ["One limitation of this experiment is that the groups were not the same size.", "This experiment is perfect because the groups were not the same size.", "Unequal groups mean the topic is not worth discussing.", "Unequal groups prove that the results are universal."],
        ["One limitation of this analysis is that some answers were incomplete.", "This analysis is perfect because some answers were incomplete.", "Incomplete answers mean the topic is not worth discussing.", "Incomplete answers prove that the results are universal."],
        ["One limitation of this study is that it did not include evening students.", "This study is perfect because it did not include evening students.", "Missing one group means the topic is not worth discussing.", "Missing one group proves that the results are universal."],
        ["One limitation of this survey is that the questions were very general.", "This survey is perfect because the questions were very general.", "General questions mean the topic is not worth discussing.", "General questions prove that the results are universal."],
        ["One limitation of this report is that it compares only two locations.", "This report is perfect because it compares only two locations.", "Two locations mean the topic is not worth discussing.", "Two locations prove that the results are universal."]
      ];
      const set = pick(examples, i);
      return item(`Which sentence says one problem with a study?`, set, set[0]);
    }
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
  mirrorStats: {},
  reportSent: false,
  reportSending: false
};

function createQuestionBank() {
  const bank = [];
  const blueprintCounts = {};
  for (let i = 0; i < BANK_SIZE; i += 1) {
    const blueprint = blueprints[i % blueprints.length];
    const localIndex = blueprintCounts[blueprint.code] || 0;
    blueprintCounts[blueprint.code] = localIndex + 1;
    const made = blueprint.make(localIndex);
    const mirror = TEST_MIRRORS[Math.floor(i / blueprints.length) % TEST_MIRRORS.length];
    const prompt = contextualize(made.text, blueprint, localIndex, made);
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
      answer: made.answer,
      focusKey: made.focusKey || ""
    });
  }
  validateBank(bank);
  return bank;
}

function item(text, options, answer, focusKey = "", setup = "") {
  return { text, options, answer, focusKey, setup };
}

function contextualize(text, blueprint, index, made) {
  const setup = made.setup || helpfulSetup(text, blueprint, index);
  return {
    setup,
    task: text,
    fullText: `${setup} ${text}`
  };
}

function helpfulSetup(text, blueprint, index = 0) {
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
      "The sentence describes what may happen after a schedule change.",
      "The if-clause is about a real future possibility.",
      "Choose the result form for a possible future event.",
      "The sentence connects a real condition with a future result."
    ], index);
  }
  if (blueprint.code === "g-second-conditional") {
    return pick([
      "The sentence imagines a different situation.",
      "The if-clause is not about a real plan.",
      "Choose the result form for an imagined situation.",
      "The sentence talks about what could happen in a different case."
    ], index);
  }

  const setups = {
    Articles: ["The blank comes before a noun or noun phrase.", "Look at the sound and meaning of the noun phrase.", "Choose the small word that fits before the noun.", "The noun phrase after the blank gives the clue."],
    Prepositions: ["The blank comes before a time word.", "Use the time expression after the blank.", "Choose the small word that fits the time phrase.", "The answer depends on the day, clock time, or month."],
    "Count and noncount nouns": ["The blank comes before a noun phrase.", "Think about whether the noun is countable.", "Choose the amount word that fits the noun.", "The noun after the blank gives the clue."],
    "Subject-verb agreement": ["Each option describes the same idea with different grammar.", "Choose the sentence where the subject and verb fit.", "The subject controls the verb form.", "Only one option has a matching subject and verb."],
    Modals: ["A rule or notice is giving an instruction.", "The sentence says what people are required to do.", "Choose the helping verb that shows a requirement.", "The sentence gives a rule, not a preference."],
    Comparatives: ["The sentence compares two things.", "The word than shows a comparison.", "Choose the form used to compare two things.", "The answer should fit before than."],
    "Clauses and connectors": ["Choose the word that connects the two ideas clearly.", "The two ideas contrast with each other.", "Choose the joining word that fits both ideas.", "The first idea is surprising with the second idea."],
    "Passive voice": ["The sentence describes what happened to a document yesterday.", "The focus is on the thing, not the person.", "Choose the form that shows the document received the action.", "The by phrase names who did the action."],
    "Relative clauses": ["The sentence gives more information about a person.", "The missing word connects a person with something they have.", "Choose the word that shows possession.", "The noun after the blank belongs to the person."],
    "Reported speech": ["A person is telling someone what another person said earlier.", "Choose the sentence that reports the direct quote.", "The original words are being retold later.", "The answer should sound like reported information."],
    "Reduced clauses": ["Choose the shorter sentence that keeps the same meaning.", "The best sentence removes extra words cleanly.", "Choose the clear short form.", "The answer should be shorter but still grammatical."],
    "Advanced sentence structure": ["Choose the formal sentence with correct word order.", "The sentence begins with Only after.", "Choose the sentence with correct formal inversion.", "The formal opening changes the word order."],
    "Everyday vocabulary": ["Choose the word with the same meaning.", "Find the closest simple meaning.", "Choose the matching everyday word.", "The answer should mean almost the same thing."],
    "Workplace vocabulary": ["Use the office-message meaning of the word.", "Choose the meaning that fits a work message.", "Think about how this word is used at work.", "The answer should fit an office context."],
    "Word forms": ["Choose the form of the word that fits the sentence.", "The sentence needs the right word-family form.", "Choose the noun, verb, or -ing form that fits.", "The words are from the same family."],
    Collocations: ["Choose the word that naturally goes with the phrase.", "Only one word makes a common phrase.", "Choose the word pair that sounds natural.", "The answer should make a common English phrase."],
    "Phrasal verbs": ["Choose the small word that completes the verb phrase.", "The verb needs one small word after it.", "Choose the word that makes the phrase natural.", "The answer completes a common verb phrase."],
    Transitions: ["Choose the word that shows how the two ideas connect.", "The second idea is different from the first.", "Choose the linking word that fits the relationship.", "The answer should show contrast."],
    "Meaning in context": ["Use the sentence to choose the meaning of the quoted word.", "The sentence gives the clue for the word meaning.", "Choose the meaning that fits this sentence.", "The answer should match the quoted word in context."],
    "Academic vocabulary": ["Choose the school or work meaning of the word.", "The answer should fit formal reading.", "Choose the meaning used in study or work texts.", "Think about how the word is used in reports or lessons."],
    Register: ["Choose the sentence that fits formal writing.", "The answer should sound appropriate in a report.", "Choose the most professional sentence.", "The best option has a formal tone."],
    Nuance: ["Choose the closest meaning.", "Pick the meaning that best matches the word.", "Choose the most exact meaning.", "The answer should match the word's usual meaning."],
    "Hedging and precision": ["Choose the careful sentence that is not too strong.", "The best sentence avoids overclaiming.", "Choose the sentence that sounds cautious and precise.", "The answer should make a careful claim."],
    "Discourse function": ["Choose the sentence that states a study problem clearly.", "The answer should describe a limitation.", "Choose the sentence that explains one weakness in the study.", "The best option names a problem without exaggeration."]
  };

  return pick(setups[blueprint.subcategory] || ["Use the sentence to choose the best answer."], index);
}

function validateBank(bank) {
  const textSet = new Set();
  const focusCounts = {};
  const issues = [];
  bank.forEach((question) => {
    const key = questionSignature(question);
    textSet.add(key);
    if (question.focusKey) focusCounts[question.focusKey] = (focusCounts[question.focusKey] || 0) + 1;
    if (!question.options.includes(question.answer)) issues.push(`Missing answer: ${question.id}`);
    if (new Set(question.options).size !== question.options.length) issues.push(`Duplicate option: ${question.id}`);
    if (question.options.length !== 4) issues.push(`Wrong option count: ${question.id}`);
    if (!question.category || !question.subcategory || !question.difficulty) issues.push(`Missing metadata: ${question.id}`);
    if (!question.setupText || !question.taskText) issues.push(`Missing display parts: ${question.id}`);
    if (!learnerSubcategoryLabels[question.subcategory]) issues.push(`Missing learner label: ${question.subcategory}`);
    if (normalizeQuestionText(question.setupText).startsWith("during ")) issues.push(`Generic setup text: ${question.id}`);
    const setupProblem = forbiddenSetupTerms.find((term) => normalizeQuestionText(question.setupText).includes(term));
    if (setupProblem) issues.push(`Mixed setup context "${setupProblem}": ${question.id}`);
    const technicalTerm = forbiddenPromptTerms.find((term) => normalizeQuestionText(question.taskText).includes(term));
    if (technicalTerm) issues.push(`Technical prompt term "${technicalTerm}": ${question.id}`);
    if (question.options.includes("no article")) issues.push(`Use (nothing), not no article: ${question.id}`);
    if (hasKnownAnswerAmbiguity(question)) issues.push(`Possible multiple correct answers: ${question.id}`);
    if (hasKnownAwkwardPhrase(question)) issues.push(`Awkward phrase: ${question.id}`);
  });
  const focusClumps = Object.entries(focusCounts).filter(([, count]) => count > 8);
  if (focusClumps.length) {
    const examples = focusClumps.slice(0, 5).map(([key, count]) => `${key} (${count})`).join(", ");
    issues.push(`Repeated focus terms: ${examples}`);
  }
  if (textSet.size < TOTAL_QUESTIONS) {
    issues.push(`Too few unique question signatures: ${textSet.size}`);
  }
  if (issues.length) throw new Error(`Question bank failed QA: ${issues.slice(0, 5).join(" | ")}`);
}

function hasKnownAnswerAmbiguity(question) {
  const task = normalizeQuestionText(question.taskText);
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
  if (state.reportSent) return;

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
  renderReportPanel();
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

function renderReportPanel() {
  const panel = document.getElementById("reportPanel");
  const form = document.getElementById("reportForm");
  const status = document.getElementById("reportStatus");
  const button = document.getElementById("sendReport");
  const intro = document.getElementById("reportIntro");
  const complete = document.getElementById("reportComplete");
  const copy = panel ? panel.querySelector(".report-copy") : null;
  if (!panel || !form || !status || !button || !intro || !complete || !copy) return;

  const answered = state.responses.length;
  const canReport = answered >= REPORT_THRESHOLD;
  panel.classList.toggle("is-hidden", !canReport && !state.reportSent);
  if (!canReport && !state.reportSent) return;

  complete.classList.toggle("is-hidden", !state.reportSent);
  copy.classList.toggle("is-hidden", state.reportSent);
  status.classList.toggle("is-hidden", state.reportSent);

  intro.textContent = `${answered}/${TOTAL_QUESTIONS} answers are complete. The report includes scores, question history, and grammar and vocabulary areas to practice.`;
  form.classList.toggle("is-hidden", state.reportSent);
  button.disabled = state.reportSending || state.reportSent;
  button.textContent = state.reportSending ? "Sending..." : "Send report and end quiz";

  if (state.reportSent) {
    status.textContent = "Report sent. This quiz has ended.";
    status.className = "report-status good";
  } else if (!status.textContent) {
    status.textContent = "The email address is hidden on this page.";
    status.className = "report-status";
  }
}

async function submitReport(event) {
  event.preventDefault();
  if (state.reportSent || state.reportSending) return;

  const status = document.getElementById("reportStatus");
  const studentName = document.getElementById("studentName").value.trim();
  const teacherName = document.getElementById("teacherName").value.trim();

  if (state.responses.length < REPORT_THRESHOLD) {
    status.textContent = `You can send a report after ${REPORT_THRESHOLD} answers.`;
    status.className = "report-status needs-work";
    return;
  }

  if (!studentName || !teacherName) {
    status.textContent = "Please enter the student name and teacher name.";
    status.className = "report-status needs-work";
    return;
  }

  state.reportSending = true;
  status.textContent = "Sending report...";
  status.className = "report-status";
  renderReportPanel();

  try {
    const report = buildReport(studentName, teacherName);
    const formData = new FormData();
    Object.entries({
      _subject: `EnglishRoad report: ${studentName}`,
      _template: "table",
      _captcha: "false",
      student_name: studentName,
      teacher_name: teacherName,
      questions_answered: String(report.summary.questionsAnswered),
      total_correct: String(report.summary.correct),
      accuracy: report.summary.accuracy,
      cefr: report.scores.CEFR,
      toefl_ibt: report.scores.TOEFL,
      ielts: report.scores.IELTS,
      toeic_lr: report.scores.TOEIC,
      grammar_weaknesses: formatCounts(report.weaknesses.Grammar),
      vocabulary_weaknesses: formatCounts(report.weaknesses.Vocabulary),
      mirror_stats: JSON.stringify(report.mirrorStats, null, 2),
      full_report_json: JSON.stringify(report, null, 2)
    }).forEach(([key, value]) => formData.append(key, value));

    const response = await fetch(reportEndpoint(), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData
    });

    if (!response.ok) throw new Error("Report service did not accept the report.");
    state.reportSent = true;
    endQuizAfterReport();
    renderReportPanel();
  } catch (error) {
    status.textContent = "The report could not be sent. Please try again.";
    status.className = "report-status needs-work";
  } finally {
    state.reportSending = false;
    renderReportPanel();
  }
}

function buildReport(studentName, teacherName) {
  const correct = state.responses.filter((response) => response.correct).length;
  const answered = state.responses.length;
  return {
    studentName,
    teacherName,
    sentAt: new Date().toISOString(),
    summary: {
      questionsAnswered: answered,
      totalQuestions: TOTAL_QUESTIONS,
      correct,
      incorrect: answered - correct,
      accuracy: formatPercent(correct, answered),
      ability: Number(state.ability.toFixed(2)),
      reportThreshold: REPORT_THRESHOLD
    },
    scores: {
      TOEFL: toeflEstimate(),
      IELTS: ieltsEstimate(),
      TOEIC: toeicEstimate(),
      CEFR: cefrEstimate()
    },
    mirrorStats: mirrorReport(),
    weaknesses: weaknessReport(),
    responses: state.responses.map((response, index) => ({
      number: index + 1,
      id: response.id,
      source: response.source,
      category: response.category,
      subcategory: response.subcategory,
      displaySubcategory: learnerSubcategory(response.subcategory),
      difficulty: Number(response.difficulty.toFixed(1)),
      correct: response.correct,
      selected: response.selected,
      answer: response.answer,
      setup: response.setupText,
      item: response.taskText
    }))
  };
}

function mirrorReport() {
  return TEST_MIRRORS.reduce((report, mirror) => {
    const stats = state.mirrorStats[mirror] || { answered: 0, correct: 0 };
    report[mirror] = {
      answered: stats.answered,
      correct: stats.correct,
      accuracy: formatPercent(stats.correct, stats.answered)
    };
    return report;
  }, {});
}

function weaknessReport() {
  const misses = state.responses.filter((response) => !response.correct);
  return {
    Grammar: countBySubcategory(misses.filter((response) => response.category === "Grammar")),
    Vocabulary: countBySubcategory(misses.filter((response) => response.category === "Vocabulary"))
  };
}

function endQuizAfterReport() {
  state.answered = true;
  document.querySelectorAll("input[name='answer']").forEach((input) => {
    input.disabled = true;
  });
  const button = document.getElementById("submitAnswer");
  button.textContent = "Quiz ended";
  button.disabled = true;
  const feedback = document.getElementById("feedback");
  feedback.textContent = "Report sent. The quiz has ended.";
  feedback.className = "feedback good";
}

function restart() {
  state.questionIndex = 0;
  state.ability = 1.45;
  state.responses = [];
  state.candidateOrder = createCandidateOrder();
  state.usedIds = new Set();
  state.usedTexts = new Set();
  state.mirrorStats = {};
  state.reportSent = false;
  state.reportSending = false;
  document.getElementById("reportForm").reset();
  document.getElementById("reportStatus").textContent = "";
  document.getElementById("reportStatus").className = "report-status";
  document.getElementById("reportComplete").classList.add("is-hidden");
  updateResults();
  renderQuestion();
}

function reportEndpoint() {
  return `https://formsubmit.co/ajax/${decodeReportPart(REPORT_RECIPIENT[0])}@${decodeReportPart(REPORT_RECIPIENT[1])}.${decodeReportPart(REPORT_RECIPIENT[2])}`;
}

function decodeReportPart(part) {
  return window.atob(part);
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

function formatCounts(values) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1]);
  return entries.length ? entries.map(([label, count]) => `${label}: ${count}`).join("; ") : "None";
}

function formatPercent(count, total) {
  return total ? `${Math.round((count / total) * 100)}%` : "0%";
}

function normalizeQuestionText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function questionSignature(question) {
  return normalizeQuestionText([question.taskText, question.options.join(" | ")].join(" "));
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
document.getElementById("reportForm").addEventListener("submit", submitReport);
document.getElementById("instructionsToggle").addEventListener("click", toggleInstructions);
document.getElementById("languageSelect").addEventListener("change", (event) => {
  renderLanguageInfo(event.target.value);
});
state.bank = createQuestionBank();
document.getElementById("bankSize").textContent = state.bank.length.toLocaleString();
renderLanguageInfo(document.getElementById("languageSelect").value);
restart();
