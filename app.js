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

const TOTAL_QUESTIONS = 120;
const FIRST_ESTIMATE_AT = 5;
const TEST_MIRRORS = ["TOEFL", "IELTS", "TOEIC", "CEFR"];
const scenarioSettings = [
  "university advising",
  "workplace onboarding",
  "airport information desk",
  "online course",
  "community workshop",
  "medical reception",
  "library help desk",
  "customer support",
  "research seminar",
  "team meeting",
  "housing office",
  "bank appointment"
];
const scenarioTopics = [
  "scheduling",
  "market research",
  "public transportation",
  "environmental policy",
  "student services",
  "technical support",
  "health and safety",
  "budget planning",
  "travel arrangements",
  "product feedback",
  "academic writing",
  "job training"
];
const scenarioActions = [
  "clarifying a report",
  "checking a summary",
  "preparing a formal reply",
  "reviewing a short notice",
  "editing a presentation",
  "answering a client question",
  "comparing two options",
  "summarizing a policy",
  "planning a meeting",
  "evaluating instructions",
  "responding to feedback",
  "confirming details"
];
const cefrBands = [
  { min: 0, label: "A1" },
  { min: 1.8, label: "A2" },
  { min: 2.7, label: "B1" },
  { min: 3.65, label: "B2" },
  { min: 4.65, label: "C1" },
  { min: 5.45, label: "C2" }
];

const state = {
  bank: [],
  current: null,
  answered: false,
  selected: "",
  questionIndex: 0,
  ability: 3.15,
  responses: [],
  sessionQuestions: [],
  used: new Set(),
  mirrorStats: {}
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
      source: TEST_MIRRORS[i % TEST_MIRRORS.length],
      difficulty: Math.min(6, Math.max(1, template.level + ((i % 5) - 2) * 0.16)),
      text: contextualizeQuestion(made.text, i),
      options: shuffle(made.options, i),
      answer: made.answer
    });
  }

  return bank;
}

function contextualizeQuestion(text, index) {
  const setting = scenarioSettings[index % scenarioSettings.length];
  const topic = scenarioTopics[Math.floor(index / scenarioSettings.length) % scenarioTopics.length];
  const action = scenarioActions[Math.floor(index / (scenarioSettings.length * scenarioTopics.length)) % scenarioActions.length];
  return `In a ${setting} context about ${topic}, a speaker is ${action}. ${text}`;
}

function lowercaseFirst(text) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function shuffle(items, seed) {
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

function createSessionQuestions() {
  const seenTexts = new Set();
  const randomized = shuffleRandom(state.bank);
  const selected = [];

  for (const question of randomized) {
    const key = normalizeQuestionText(question.text);
    if (seenTexts.has(key)) continue;
    seenTexts.add(key);
    selected.push(question);
    if (selected.length === TOTAL_QUESTIONS) break;
  }

  if (selected.length < TOTAL_QUESTIONS) {
    throw new Error(`Only ${selected.length} unique questions are available for this session.`);
  }

  return selected;
}

function normalizeQuestionText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function chooseQuestion() {
  const next = state.sessionQuestions[state.questionIndex];
  state.used.add(next.id);
  return next;
}

function renderQuestion() {
  state.current = chooseQuestion();
  state.answered = false;
  state.selected = "";

  document.getElementById("questionNumber").textContent = String(state.questionIndex + 1);
  document.getElementById("totalQuestions").textContent = String(TOTAL_QUESTIONS);
  document.getElementById("meterFill").style.width = `${((state.questionIndex + 1) / TOTAL_QUESTIONS) * 100}%`;
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
  feedback.textContent = correct ? "Correct. The estimate has been adjusted upward." : `Not quite. Correct answer: ${state.current.answer}`;
  feedback.className = `feedback ${correct ? "good" : "needs-work"}`;

  updateResults();

  const button = document.getElementById("submitAnswer");
  if (state.questionIndex >= TOTAL_QUESTIONS) {
    button.textContent = "Assessment complete";
    button.disabled = true;
  } else {
    button.textContent = "Next question";
  }
}

function updateAbility(correct) {
  const answeredCount = state.responses.length + 1;
  const expected = 1 / (1 + Math.exp(-(state.ability - state.current.difficulty) * 1.35));
  const error = (correct ? 1 : 0) - expected;
  const learningRate = Math.max(0.18, 0.76 - answeredCount * 0.0045);
  state.ability = clamp(state.ability + learningRate * error, 1, 6);
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
  const title = estimated ? `${band} estimate` : "Collecting signal";

  document.getElementById("result-title").textContent = title;
  document.getElementById("toeflScore").textContent = estimated ? toeflEstimate() : "after 5";
  document.getElementById("ieltsScore").textContent = estimated ? ieltsEstimate() : "after 5";
  document.getElementById("toeicScore").textContent = estimated ? toeicEstimate() : "after 5";
  document.getElementById("cefrScore").textContent = estimated ? cefrEstimate() : `${correctCount}/${state.responses.length || 0}`;
  document.getElementById("precisionText").textContent = precisionLabel();

  renderWeaknesses();
}

function precisionLabel() {
  const answered = state.responses.length;
  if (answered < FIRST_ESTIMATE_AT) return `First estimate after ${FIRST_ESTIMATE_AT} questions`;
  if (answered >= TOTAL_QUESTIONS) return "Final 120-question estimate";
  return `${answered}/${TOTAL_QUESTIONS} answered. Precision tightens every question across TOEFL, IELTS, TOEIC, and CEFR mirrors.`;
}

function standardError() {
  const answered = Math.max(FIRST_ESTIMATE_AT, state.responses.length);
  return Math.max(0.1, 1.25 / Math.sqrt(answered / 4));
}

function abilityRange() {
  const spread = standardError();
  return {
    low: clamp(state.ability - spread, 1, 6),
    high: clamp(state.ability + spread, 1, 6)
  };
}

function cefrFromAbility(ability) {
  return cefrBands.reduce((active, band) => ability >= band.min ? band.label : active, cefrBands[0].label);
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

function toeflFromAbility(ability) {
  return Math.round(clamp(5 + ((ability - 1) / 5) * 115, 0, 120));
}

function ieltsFromAbility(ability) {
  return roundToStep(clamp(1 + ((ability - 1) / 5) * 8, 1, 9), 0.5);
}

function toeicFromAbility(ability) {
  return roundToStep(clamp(10 + ((ability - 1) / 5) * 980, 10, 990), 5);
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
  state.sessionQuestions = createSessionQuestions();
  state.used = new Set();
  state.mirrorStats = {};
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
