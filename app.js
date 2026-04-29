const grammarItems = [
  {
    sub: "Verb tense",
    level: 1,
    make: (c) => ({
      text: `Choose the best verb: ${c.person} ___ ${c.time} ${c.activity}.`,
      options: [c.correctVerb, c.wrongVerbA, c.wrongVerbB, c.wrongVerbC],
      answer: c.correctVerb
    })
  },
  {
    sub: "Articles",
    level: 2,
    make: (c) => ({
      text: `Choose the correct article: ${c.sentence}`,
      options: c.articleOptions,
      answer: c.articleAnswer
    })
  },
  {
    sub: "Prepositions",
    level: 2,
    make: (c) => ({
      text: `Choose the best preposition: ${c.person} is interested ___ ${c.topic}.`,
      options: ["in", "on", "at", "for"],
      answer: "in"
    })
  },
  {
    sub: "Subject-verb agreement",
    level: 3,
    make: (c) => ({
      text: `Choose the sentence with correct agreement.`,
      options: [
        `The ${c.group} ${c.singularVerb} ready for the presentation.`,
        `The ${c.group} ${c.pluralVerb} ready for the presentation.`,
        `The ${c.group} were prepares for the presentation.`,
        `The ${c.group} have ready for the presentation.`
      ],
      answer: `The ${c.group} ${c.singularVerb} ready for the presentation.`
    })
  },
  {
    sub: "Clauses and connectors",
    level: 4,
    make: (c) => ({
      text: `Choose the best connector: ___ the report was short, it explained the problem clearly.`,
      options: ["Although", "Because", "Unless", "Therefore"],
      answer: "Although"
    })
  },
  {
    sub: "Conditionals",
    level: 4,
    make: (c) => ({
      text: `Choose the best form: If the company ${c.condition}, it would attract more clients.`,
      options: ["reduced its prices", "will reduce its prices", "reduces its prices", "has reduced its prices"],
      answer: "reduced its prices"
    })
  },
  {
    sub: "Passive voice",
    level: 5,
    make: (c) => ({
      text: `Choose the best passive form: The survey results ___ by the research team yesterday.`,
      options: ["were analyzed", "analyzed", "have analyzing", "were analyze"],
      answer: "were analyzed"
    })
  },
  {
    sub: "Reduced clauses",
    level: 6,
    make: (c) => ({
      text: `Choose the most concise academic sentence.`,
      options: [
        `The data collected during the trial support the original hypothesis.`,
        `The data which it was collected during the trial support the original hypothesis.`,
        `The data were collected during the trial supporting the original hypothesis.`,
        `The data collecting during the trial support the original hypothesis.`
      ],
      answer: `The data collected during the trial support the original hypothesis.`
    })
  }
];

const vocabularyItems = [
  {
    sub: "Everyday vocabulary",
    level: 1,
    make: (c) => ({
      text: `Which word means almost the same as "${c.easyWord}"?`,
      options: c.easyOptions,
      answer: c.easyAnswer
    })
  },
  {
    sub: "Word forms",
    level: 2,
    make: (c) => ({
      text: `Choose the correct word form: The teacher gave a clear ___ of the rule.`,
      options: ["explanation", "explain", "explained", "explaining"],
      answer: "explanation"
    })
  },
  {
    sub: "Business vocabulary",
    level: 3,
    make: (c) => ({
      text: `In a workplace email, "deadline" means the time when something must be ___.`,
      options: ["finished", "forgotten", "expanded", "borrowed"],
      answer: "finished"
    })
  },
  {
    sub: "Transitions",
    level: 3,
    make: (c) => ({
      text: `Choose the transition that shows contrast: The plan is inexpensive; ___, it may take too long.`,
      options: ["however", "therefore", "for example", "similarly"],
      answer: "however"
    })
  },
  {
    sub: "Academic vocabulary",
    level: 4,
    make: (c) => ({
      text: `Which word best completes the sentence? The results were ___ with the earlier study.`,
      options: ["consistent", "casual", "temporary", "visible"],
      answer: "consistent"
    })
  },
  {
    sub: "Meaning in context",
    level: 4,
    make: (c) => ({
      text: `In the sentence "The policy may hinder small businesses," what does "hinder" mean?`,
      options: ["make progress difficult", "give official permission", "describe in detail", "pay in advance"],
      answer: "make progress difficult"
    })
  },
  {
    sub: "Collocations",
    level: 5,
    make: (c) => ({
      text: `Choose the natural collocation: The committee will ___ a decision after reviewing the evidence.`,
      options: ["make", "do", "take up", "create up"],
      answer: "make"
    })
  },
  {
    sub: "Register and nuance",
    level: 6,
    make: (c) => ({
      text: `Which phrase is most appropriate in a formal report?`,
      options: [
        "The findings indicate a moderate increase.",
        "The numbers kind of went up.",
        "Things got a bit better, basically.",
        "We saw stuff rise a little."
      ],
      answer: "The findings indicate a moderate increase."
    })
  }
];

const contexts = [
  {
    person: "Mina",
    time: "every morning",
    activity: "reviews her notes",
    correctVerb: "reviews",
    wrongVerbA: "review",
    wrongVerbB: "reviewing",
    wrongVerbC: "is review",
    sentence: "I saw ___ useful chart in the lecture notes.",
    articleOptions: ["a", "an", "the", "no article"],
    articleAnswer: "a",
    topic: "environmental policy",
    group: "team",
    singularVerb: "is",
    pluralVerb: "are",
    condition: "reduced its prices",
    easyWord: "large",
    easyOptions: ["big", "late", "cold", "near"],
    easyAnswer: "big"
  },
  {
    person: "Carlos",
    time: "on weekends",
    activity: "studies business vocabulary",
    correctVerb: "studies",
    wrongVerbA: "study",
    wrongVerbB: "studying",
    wrongVerbC: "has study",
    sentence: "She is ___ honest applicant with strong references.",
    articleOptions: ["an", "a", "the", "no article"],
    articleAnswer: "an",
    topic: "customer service",
    group: "department",
    singularVerb: "is",
    pluralVerb: "are",
    condition: "improved its website",
    easyWord: "quick",
    easyOptions: ["fast", "quiet", "heavy", "full"],
    easyAnswer: "fast"
  },
  {
    person: "Aiko",
    time: "after class",
    activity: "practices listening exercises",
    correctVerb: "practices",
    wrongVerbA: "practice",
    wrongVerbB: "practiced",
    wrongVerbC: "is practice",
    sentence: "The speaker described ___ unusual solution.",
    articleOptions: ["an", "a", "the", "no article"],
    articleAnswer: "an",
    topic: "public transportation",
    group: "committee",
    singularVerb: "is",
    pluralVerb: "are",
    condition: "changed its schedule",
    easyWord: "begin",
    easyOptions: ["start", "close", "carry", "sell"],
    easyAnswer: "start"
  },
  {
    person: "Nadia",
    time: "each Friday",
    activity: "writes a short report",
    correctVerb: "writes",
    wrongVerbA: "write",
    wrongVerbB: "writing",
    wrongVerbC: "does write",
    sentence: "We need ___ information before we decide.",
    articleOptions: ["no article", "a", "an", "the"],
    articleAnswer: "no article",
    topic: "online learning",
    group: "staff",
    singularVerb: "is",
    pluralVerb: "are",
    condition: "offered training",
    easyWord: "help",
    easyOptions: ["assist", "arrive", "divide", "invite"],
    easyAnswer: "assist"
  }
];

const scoreBands = [
  { min: 0, cefr: "A1", toefl: "0-17", ielts: "1.0-2.0", toeic: "10-120" },
  { min: 1.8, cefr: "A2", toefl: "18-41", ielts: "2.5-3.5", toeic: "125-224" },
  { min: 2.7, cefr: "B1", toefl: "42-71", ielts: "4.0-5.0", toeic: "225-549" },
  { min: 3.65, cefr: "B2", toefl: "72-94", ielts: "5.5-6.5", toeic: "550-784" },
  { min: 4.65, cefr: "C1", toefl: "95-114", ielts: "7.0-8.0", toeic: "785-944" },
  { min: 5.45, cefr: "C2", toefl: "115-120", ielts: "8.5-9.0", toeic: "945-990" }
];

const state = {
  bank: [],
  current: null,
  answered: false,
  selected: "",
  questionIndex: 0,
  ability: 3.15,
  responses: [],
  used: new Set()
};

function createQuestionBank() {
  const bank = [];
  const templates = [...grammarItems.map((item) => ({ ...item, category: "Grammar" })), ...vocabularyItems.map((item) => ({ ...item, category: "Vocabulary" }))];

  for (let i = 0; i < 1500; i += 1) {
    const template = templates[i % templates.length];
    const context = contexts[(i + template.level) % contexts.length];
    const made = template.make(context);
    const id = `${template.category[0]}-${template.sub.replace(/\W+/g, "-").toLowerCase()}-${i + 1}`;

    bank.push({
      id,
      category: template.category,
      subcategory: template.sub,
      source: ["TOEFL", "IELTS", "TOEIC"][i % 3],
      difficulty: Math.min(6, Math.max(1, template.level + ((i % 5) - 2) * 0.16)),
      text: made.text,
      options: shuffle(made.options, i),
      answer: made.answer
    });
  }

  return bank;
}

function shuffle(items, seed) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = (seed + i * 7) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function chooseQuestion() {
  const available = state.bank
    .filter((question) => !state.used.has(question.id))
    .sort((a, b) => Math.abs(a.difficulty - state.ability) - Math.abs(b.difficulty - state.ability));
  const window = available.slice(0, 18);
  const next = window[(state.questionIndex * 5 + state.responses.length) % window.length] || available[0];
  state.used.add(next.id);
  return next;
}

function renderQuestion() {
  state.current = chooseQuestion();
  state.answered = false;
  state.selected = "";

  document.getElementById("questionNumber").textContent = String(state.questionIndex + 1);
  document.getElementById("meterFill").style.width = `${((state.questionIndex + 1) / 5) * 100}%`;
  document.getElementById("questionMeta").innerHTML = [
    state.current.category,
    state.current.subcategory,
    state.current.source,
    `Level ${state.current.difficulty.toFixed(1)}`
  ].map((tag) => `<span class="tag">${tag}</span>`).join("");
  document.getElementById("questionText").textContent = state.current.text;
  document.getElementById("answers").innerHTML = state.current.options.map((option, index) => `
    <label class="answer-option">
      <input type="radio" name="answer" value="${escapeAttribute(option)}" ${index === 0 ? "" : ""}>
      <span>${option}</span>
    </label>
  `).join("");
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("submitAnswer").textContent = "Submit answer";
  document.getElementById("submitAnswer").disabled = false;

  document.querySelectorAll("input[name='answer']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.selected = event.target.value;
    });
  });
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function submitAnswer() {
  if (!state.selected && !state.answered) {
    document.getElementById("feedback").textContent = "Choose an answer to continue.";
    return;
  }

  if (state.answered) {
    if (state.questionIndex >= 5) return;
    renderQuestion();
    return;
  }

  const correct = state.selected === state.current.answer;
  const difficultyGap = state.current.difficulty - state.ability;
  state.ability = clamp(state.ability + (correct ? 0.46 + Math.max(0, difficultyGap) * 0.08 : -0.42 + Math.min(0, difficultyGap) * 0.06), 1, 6);
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
  feedback.textContent = correct ? "Correct. The estimate has been adjusted upward." : `Not quite. Correct answer: ${state.current.answer}`;
  feedback.className = `feedback ${correct ? "good" : "needs-work"}`;

  updateResults();

  const button = document.getElementById("submitAnswer");
  if (state.questionIndex >= 5) {
    button.textContent = "Assessment complete";
    button.disabled = true;
  } else {
    button.textContent = "Next question";
  }
}

function updateResults() {
  const band = scoreBands.reduce((active, bandOption) => state.ability >= bandOption.min ? bandOption : active, scoreBands[0]);
  const finished = state.responses.length >= 5;
  const correctCount = state.responses.filter((response) => response.correct).length;
  const title = finished ? `${band.cefr} estimate` : `${band.cefr} developing`;

  document.getElementById("result-title").textContent = title;
  document.getElementById("toeflScore").textContent = finished ? band.toefl : "after 5";
  document.getElementById("ieltsScore").textContent = finished ? band.ielts : "after 5";
  document.getElementById("toeicScore").textContent = finished ? band.toeic : "after 5";
  document.getElementById("cefrScore").textContent = finished ? band.cefr : `${correctCount}/${state.responses.length || 0}`;

  renderWeaknesses();
}

function renderWeaknesses() {
  const misses = state.responses.filter((response) => !response.correct);
  const groups = {
    Grammar: countBySubcategory(misses.filter((response) => response.category === "Grammar")),
    Vocabulary: countBySubcategory(misses.filter((response) => response.category === "Vocabulary"))
  };

  document.getElementById("grammarCount").textContent = String(Object.values(groups.Grammar).reduce((sum, count) => sum + count, 0));
  document.getElementById("vocabularyCount").textContent = String(Object.values(groups.Vocabulary).reduce((sum, count) => sum + count, 0));
  renderChips("grammarWeaknesses", groups.Grammar, "No grammar weakness registered yet");
  renderChips("vocabularyWeaknesses", groups.Vocabulary, "No vocabulary weakness registered yet");
}

function countBySubcategory(items) {
  return items.reduce((counts, item) => {
    counts[item.subcategory] = (counts[item.subcategory] || 0) + 1;
    return counts;
  }, {});
}

function renderChips(targetId, values, emptyText) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1]);
  document.getElementById(targetId).innerHTML = entries.length
    ? entries.map(([label, count]) => `<span class="chip">${label} ${count}</span>`).join("")
    : `<span class="chip empty">${emptyText}</span>`;
}

function restart() {
  state.questionIndex = 0;
  state.ability = 3.15;
  state.responses = [];
  state.used = new Set();
  updateResults();
  renderQuestion();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
document.getElementById("restart").addEventListener("click", restart);
state.bank = createQuestionBank();
document.getElementById("bankSize").textContent = state.bank.length.toLocaleString();
restart();
