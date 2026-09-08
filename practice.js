const {
  answerFeedback, copyText, createQuestionBank, escapeHtml, formatAnswerForFeedback, incrementCount, learnerSubcategory, orderOptionsWithBalancedAnswerPosition, questionSignature, recordAnswerPosition, shuffleRandom
} = window.EnglishRoadQuestions;

const PRACTICE_LENGTH = 25;

const levelBands = Object.fromEntries(window.EnglishRoadLearning.levels.map((level) => [level, true]));

const state = {
  bank: [],
  quiz: [],
  index: 0,
  selected: "",
  answered: false,
  level: "A2",
  topic: "",
  responses: [],
  optionPositionCounts: [0, 0, 0, 0]
};

let copyPromptResetTimer = null;

function startPractice(event) {
  if (event) event.preventDefault();
  const unfinished = (state.responses.length || state.selected) && state.index < state.quiz.length;
  const savedUnfinished = savedAttempt && (savedAttempt.responses.length || savedAttempt.selected) && savedAttempt.index < savedAttempt.quiz.length;
  if ((unfinished || savedUnfinished) && !window.confirm("Start a new practice quiz? This replaces your unfinished saved practice.")) return;
  const level = document.getElementById("levelSelect").value;
  const topic = document.getElementById("topicSelect").value;
  const quiz = selectQuizItems(level, topic);
  if (!quiz.length || !sessionStore.remove({ allowUnsaved: true })) return;
  state.level = level;
  state.topic = topic;
  state.quiz = quiz;
  state.index = 0;
  state.selected = "";
  state.answered = false;
  state.responses = [];
  state.optionPositionCounts = [0, 0, 0, 0];
  savedAttempt = null;
  activatePractice();
  renderAiPrompt();
  renderPractice();
  persistPractice();
  window.EnglishRoadUI.focusQuestion("practicePrompt");
}

function activatePractice() {
  document.getElementById("practiceLayout").hidden = false;
  document.querySelector(".practice-hero").classList.add("is-active");
  document.getElementById("practiceSetupDetails").open = false;
  document.getElementById("resumePracticeBox").hidden = true;
}

function practicePool(level, topic = "") {
  return state.bank.filter((question) => window.EnglishRoadLearning.levelForDifficulty(question.difficulty) === level && (!topic || question.subcategory === topic));
}

function updateSetup() {
  const pool = practicePool(document.getElementById("levelSelect").value, document.getElementById("topicSelect").value);
  const count = Math.min(PRACTICE_LENGTH, pool.length);
  document.getElementById("quizLength").textContent = `${count} questions`;
  document.getElementById("setupStatus").textContent = count ? "Focused topics may have fewer than 25 questions. Each question appears once in a quiz." : "No questions in this combination yet. Choose another practice band or All topics.";
  document.getElementById("startPracticeQuiz").disabled = !count;
  document.getElementById("startPracticeQuiz").textContent = "Start quiz";
}

function selectQuizItems(level, topic = "") {
  state.optionPositionCounts = [0, 0, 0, 0];
  return balancedSample(practicePool(level, topic), PRACTICE_LENGTH);
}

function balancedSample(candidates, length) {
  const pool = shuffleRandom(candidates);
  const selected = [];
  const trackers = createPracticeTrackers();
  const targetCategory = Math.ceil(length / 2);
  const passes = [
    { categoryLimit: targetCategory + 1, subcategoryLimit: 2, blueprintLimit: 1, requireUnusedFocus: true },
    { categoryLimit: targetCategory + 2, subcategoryLimit: 3, blueprintLimit: 2, requireUnusedFocus: true },
    { categoryLimit: targetCategory + 4, subcategoryLimit: 4, blueprintLimit: 3, requireUnusedFocus: true },
    { categoryLimit: length, subcategoryLimit: 5, blueprintLimit: 4, requireUnusedFocus: false },
    { categoryLimit: length, subcategoryLimit: length, blueprintLimit: length, requireUnusedFocus: false }
  ];

  for (const pass of passes) {
    for (const item of pool) {
      if (selected.length >= length) break;
      if (!canAddPracticeItem(item, trackers, pass)) continue;
      addPracticeItem(selected, item, trackers);
    }
    if (selected.length >= length) break;
  }

  return applyBalancedOptionOrders(selected.slice(0, length), state.optionPositionCounts);
}

function createPracticeTrackers() {
  return {
    usedIds: new Set(),
    usedSignatures: new Set(),
    usedFocusKeys: new Set(),
    categoryCounts: {},
    subcategoryCounts: {},
    blueprintCounts: {}
  };
}

function canAddPracticeItem(item, trackers, limits) {
  if (!isUniquePracticeCandidate(item, trackers.usedIds, trackers.usedSignatures)) return false;
  const focusKey = practiceFocusKey(item);
  if (limits.requireUnusedFocus && focusKey && trackers.usedFocusKeys.has(focusKey)) return false;
  if ((trackers.categoryCounts[item.category] || 0) >= limits.categoryLimit) return false;
  if ((trackers.subcategoryCounts[item.subcategory] || 0) >= limits.subcategoryLimit) return false;
  if ((trackers.blueprintCounts[item.blueprint] || 0) >= limits.blueprintLimit) return false;
  return true;
}

function isUniquePracticeCandidate(item, usedIds, usedSignatures) {
  return !usedIds.has(item.id) && !usedSignatures.has(questionSignature(item));
}

function addPracticeItem(selected, item, trackers) {
  selected.push(item);
  trackers.usedIds.add(item.id);
  trackers.usedSignatures.add(questionSignature(item));
  const focusKey = practiceFocusKey(item);
  if (focusKey) trackers.usedFocusKeys.add(focusKey);
  incrementCount(trackers.categoryCounts, item.category);
  incrementCount(trackers.subcategoryCounts, item.subcategory);
  incrementCount(trackers.blueprintCounts, item.blueprint);
}

function practiceFocusKey(item) {
  return item.focusKey || "";
}

function applyBalancedOptionOrders(items, positionCounts) {
  return items.map((question) => {
    const options = orderOptionsWithBalancedAnswerPosition(question.options, question.answer, positionCounts);
    recordAnswerPosition(options, question.answer, positionCounts);
    return { ...question, options };
  });
}

function renderPractice() {
  document.getElementById("practiceFeedback").textContent = "";
  document.getElementById("practiceFeedback").className = "feedback";
  document.getElementById("practiceAnswerHint").hidden = false;
  const item = state.quiz[state.index];
  const review = document.getElementById("practiceReview");
  if (review) review.hidden = true;
  renderSidePanel();
  if (!item) {
    renderCompletion();
    return;
  }

  const displayNumber = state.index + 1;
  document.getElementById("practiceNumber").textContent = String(displayNumber);
  document.getElementById("practiceTotal").textContent = String(state.quiz.length);
  document.getElementById("practiceMeta").innerHTML = [
    item.category,
    learnerSubcategory(item.subcategory),
    `${state.level} practice band`
  ].map((label) => `<span class="tag">${escapeHtml(label)}</span>`).join("");

  document.getElementById("practicePrompt").innerHTML = `
    <div class="prompt-help">
      <span class="part-label">Information</span>
      ${escapeHtml(item.setupText)}
    </div>
    <div class="prompt-task">
      <span class="part-label">Answer this</span>
      <span class="instruction">${escapeHtml(item.taskText)}</span>
    </div>
  `;

  document.getElementById("practiceAnswers").innerHTML = item.options.map((option) => `
    <label class="answer-option">
      <input type="radio" name="practiceAnswer" value="${escapeHtml(option)}"${state.selected === option ? " checked" : ""}>
      <span>${escapeHtml(option)}</span>
    </label>
  `).join("");

  document.querySelectorAll("input[name='practiceAnswer']").forEach((input) => {
    input.addEventListener("change", (changeEvent) => {
      state.selected = changeEvent.target.value;
      document.getElementById("practiceAnswerHint").hidden = true;
      document.getElementById("checkPracticeAnswer").disabled = false;
      persistPractice();
    });
  });

  document.getElementById("checkPracticeAnswer").hidden = false;
  document.getElementById("checkPracticeAnswer").disabled = !state.selected;
  document.getElementById("nextPracticeItem").hidden = true;
  if (state.answered) showPracticeFeedback();
}

function checkPracticeAnswer() {
  if (!state.selected || state.answered) return;
  const item = state.quiz[state.index];
  const correct = state.selected === item.answer;
  state.answered = true;
  state.responses.push({
    id: item.id,
    category: item.category,
    subcategory: item.subcategory,
    difficulty: item.difficulty,
    setupText: item.setupText,
    taskText: item.taskText,
    options: item.options,
    answer: item.answer,
    selected: state.selected,
    explanation: item.explanation,
    rationales: item.rationales,
    correct
  });

  showPracticeFeedback();
  persistPractice();
  document.getElementById("nextPracticeItem").focus({ preventScroll: true });
}

function showPracticeFeedback() {
  const item = state.quiz[state.index];
  const correct = state.selected === item.answer;
  document.querySelectorAll(".answer-option").forEach((option) => {
    const input = option.querySelector("input");
    input.disabled = true;
    if (input.value === item.answer) {
      option.classList.add("correct");
      option.insertAdjacentHTML("beforeend", '<span class="option-result">✓ Correct answer</span>');
    }
    if (input.checked && input.value !== item.answer) {
      option.classList.add("incorrect");
      option.insertAdjacentHTML("beforeend", '<span class="option-result">Your answer · Not quite</span>');
    }
  });

  const feedback = document.getElementById("practiceFeedback");
  feedback.textContent = answerFeedback(item, state.selected);
  feedback.className = `feedback ${correct ? "good" : "needs-work"}`;
  document.getElementById("practiceAnswerHint").hidden = true;
  renderSidePanel();
  document.getElementById("checkPracticeAnswer").hidden = true;
  const nextButton = document.getElementById("nextPracticeItem");
  nextButton.hidden = false;
  nextButton.textContent = state.index + 1 >= state.quiz.length ? "See summary" : "Next question";

}

function nextPracticeItem() {
  if (!state.answered) return;
  state.index += 1;
  state.selected = "";
  state.answered = false;
  renderPractice();
  persistPractice();
  window.EnglishRoadUI.focusQuestion("practicePrompt");
}

function renderCompletion() {
  document.getElementById("practiceAnswerHint").hidden = true;
  const correct = state.responses.filter((response) => response.correct).length;
  document.getElementById("practiceNumber").textContent = String(state.quiz.length);
  updatePracticeMeter(state.responses, state.quiz.length);
  document.getElementById("practiceMeta").innerHTML = `<span class="tag">${escapeHtml(state.level)}</span><span class="tag">Complete</span>`;
  document.getElementById("practicePrompt").innerHTML = `
    <div class="quiz-complete">
      <h2>Practice complete</h2>
      <p>You answered all ${state.quiz.length} questions, with ${correct} correct answers. Review your answers below or copy a study prompt for more practice.</p>
      <p><a href="https://englishladder.com/${["A1", "A2"].includes(state.level) ? "beginner" : ["B1", "B2"].includes(state.level) ? "intermediate" : "advanced"}.html">Try an English Ladder reading lesson ↗</a></p>
      <p class="side-note">This is a broad reading suggestion. You can choose a different track on English Ladder.</p>
    </div>
  `;
  document.getElementById("practiceAnswers").innerHTML = "";
  document.getElementById("checkPracticeAnswer").hidden = true;
  document.getElementById("nextPracticeItem").hidden = true;
  renderPracticeReview();
  renderAiPrompt();
}

function renderPracticeReview() {
  const review = document.getElementById("practiceReview");
  if (!review) return;

  review.hidden = false;
  review.innerHTML = `
    <h2 id="practiceReviewTitle">Review answers</h2>
    <p>Use this after the quiz to see the answer, the main reason, and your selected choice.</p>
    <div class="review-list">
      ${state.responses.map((response, index) => {
        const selectedRationale = response.rationales && response.rationales[response.selected]
          ? response.rationales[response.selected]
          : "This choice does not fit the grammar or meaning of the item.";
        const selectedLine = response.correct
          ? "Your answer was correct."
          : `Your answer: ${formatAnswerForFeedback(response.selected)} ${selectedRationale}`;
        return `
          <article class="review-item ${response.correct ? "is-correct" : "is-missed"}">
            <h3>${index + 1}. ${escapeHtml(response.correct ? "Correct" : "Review this item")}</h3>
            <p class="review-context">${escapeHtml(response.setupText)}</p>
            <p class="review-target"><strong>${escapeHtml(response.taskText)}</strong></p>
            <p class="review-meta">Correct answer: <strong>${escapeHtml(response.answer)}</strong></p>
            <p class="review-rationale">${escapeHtml(response.explanation || "This is the best answer for the item.")}</p>
            <p class="review-rationale">${escapeHtml(selectedLine)}</p>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderAiPrompt() {
  const completed = state.quiz.length > 0 && state.index >= state.quiz.length;
  document.getElementById("aiPromptBox").hidden = !completed;
  const promptField = document.getElementById("aiPromptText");
  const status = document.getElementById("copyAiPromptStatus");
  if (!promptField) return;
  promptField.value = completed ? buildAiPrompt() : "";
  resetCopyPromptButton();
  if (status) status.textContent = "";
}

function buildAiPrompt() {
  if (!state.quiz.length || state.index < state.quiz.length) return "";
  const missed = state.responses.filter((response) => !response.correct);
  const review = missed.length ? missed : state.responses;
  return [
    `Help me review my completed English Road ${state.level} practice quiz${state.topic ? ` on ${learnerSubcategory(state.topic)}` : ""}.`,
    "This is self-study grammar and vocabulary practice, not a validated English-level assessment.",
    missed.length ? "Focus on my missed answers below." : "All my answers matched the key. Help me reinforce the patterns below.",
    "For each question, explain how my choice differs from the keyed answer. Check whether the key and explanation are defensible; flag ambiguity or valid alternatives instead of assuming the key is always right.",
    "Use simple English and give three new example sentences for each pattern. Do not infer an examination score or overall English level.",
    "", ...review.map((response) => formatItemForAiPrompt(response, state.responses.indexOf(response)))
  ].join("\n\n");
}

function formatItemForAiPrompt(item, index) {
  return [
    `Item ${index + 1} [${item.id}]`,
    `Context and instruction: ${item.setupText}`,
    `Question: ${item.taskText}`,
    `Choices: ${item.options.join(" | ")}`,
    `My answer: ${item.selected}`,
    `Keyed answer: ${item.answer}`,
    `Site explanation: ${item.explanation}`,
    `Feedback on my answer: ${item.rationales[item.selected]}`,
    `Area: ${item.category} / ${learnerSubcategory(item.subcategory)}`
  ].join("\n");
}

function copyAiPrompt() {
  const button = document.getElementById("copyAiPrompt");
  const status = document.getElementById("copyAiPromptStatus");
  const prompt = document.getElementById("aiPromptText").value;
  if (!prompt) return;
  copyText(prompt)
    .then(() => {
      if (status) status.textContent = "Study prompt copied. Paste it into your chosen AI service.";
      if (!button) return;
      button.textContent = "Copied!";
      button.classList.add("is-copied");
      window.clearTimeout(copyPromptResetTimer);
      copyPromptResetTimer = window.setTimeout(resetCopyPromptButton, 5000);
    })
    .catch(() => {
      resetCopyPromptButton();
      if (status) status.textContent = "Copy did not work. Select the text and copy it.";
    });
}

function resetCopyPromptButton() {
  const button = document.getElementById("copyAiPrompt");
  window.clearTimeout(copyPromptResetTimer);
  copyPromptResetTimer = null;
  if (!button) return;
  button.textContent = "Copy study prompt";
  button.classList.remove("is-copied");
}

function updatePracticeMeter(responses, total) {
  const meter = document.getElementById("practiceMeterSegments");
  const width = `${100 / Math.max(1, total)}%`;
  meter.replaceChildren(...responses.map((response) => {
    const segment = document.createElement("span");
    segment.className = `meter-segment ${response.correct ? "is-correct" : "is-incorrect"}`;
    segment.style.setProperty("--meter-segment-width", width);
    return segment;
  }));
}

function renderSidePanel() {
  const correct = state.responses.filter((response) => response.correct).length;
  const incorrect = state.responses.length - correct;
  updatePracticeMeter(state.responses, state.quiz.length);
  document.getElementById("sideLevel").textContent = state.level;
  document.getElementById("sideCorrect").textContent = `${correct} of ${state.responses.length}`;
  document.getElementById("practiceAnswered").textContent = state.responses.length
    ? `${state.responses.length} of ${state.quiz.length} answered · ${correct} correct, ${incorrect} incorrect`
    : `${state.responses.length} of ${state.quiz.length} answered`;
  document.getElementById("practiceEmpty").hidden = state.responses.length > 0;
  document.getElementById("practiceStats").hidden = !state.responses.length;
  document.getElementById("practiceSummary").hidden = !state.responses.length;
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

const PRACTICE_STORAGE_KEY = "englishroad-practice-session-v1";
const PRACTICE_SESSION_VERSION = 1;
const sessionStore = window.EnglishRoadUI.sessionStore(PRACTICE_STORAGE_KEY, () => Boolean(state.responses.length || state.selected));
let savedAttempt = null;

function persistPractice() {
  if (!state.quiz.length) return;
  sessionStore.save({
    version: PRACTICE_SESSION_VERSION, bankSize: state.bank.length, bankRevision: BANK_REVISION,
    level: state.level, topic: state.topic, index: state.index,
    selected: state.selected, answered: state.answered,
    quiz: state.quiz.map((item) => ({ id: item.id, options: item.options })),
    responses: state.responses.map((response) => ({ id: response.id, selected: response.selected }))
  });
}

function readPractice() {
  const saved = sessionStore.read();
  if (!saved) return null;
  try {
    if (saved.version !== PRACTICE_SESSION_VERSION || saved.bankSize !== state.bank.length || saved.bankRevision !== BANK_REVISION) throw new Error("updated");
    if (!Object.hasOwn(levelBands, saved.level) || typeof saved.topic !== "string" || (saved.topic && !state.bank.some((q) => q.subcategory === saved.topic))) throw new Error("invalid");
    if (!Array.isArray(saved.quiz) || saved.quiz.length < 1 || saved.quiz.length > PRACTICE_LENGTH) throw new Error("invalid");
    const byId = new Map(state.bank.map((question) => [question.id, question]));
    const quiz = saved.quiz.map((item) => {
      const question = item && byId.get(item.id);
      if (!question || !window.EnglishRoadUI.validOptions(item.options, question.options)) throw new Error("invalid");
      return { ...question, options: item.options };
    });
    if (new Set(quiz.map(questionSignature)).size !== quiz.length) throw new Error("invalid");
    if (!Number.isInteger(saved.index) || saved.index < 0 || saved.index > quiz.length || typeof saved.answered !== "boolean" || !Array.isArray(saved.responses)) throw new Error("invalid");
    if (saved.responses.length !== saved.index + Number(saved.answered) || saved.responses.length > quiz.length) throw new Error("invalid");
    const responses = saved.responses.map((response, index) => {
      if (!response || response.id !== quiz[index].id || !quiz[index].options.includes(response.selected)) throw new Error("invalid");
      return { ...quiz[index], selected: response.selected, correct: response.selected === quiz[index].answer };
    });
    if (saved.index === quiz.length ? (saved.answered || saved.selected !== "") : !["", ...quiz[saved.index].options].includes(saved.selected)) throw new Error("invalid");
    if (saved.answered && saved.selected !== responses.at(-1).selected) throw new Error("invalid");
    return { ...saved, quiz, responses };
  } catch (error) {
    sessionStore.reject(error.message === "updated" ? "The practice bank has changed. The old saved practice was cleared. Choose a new quiz." : "The saved practice is incomplete or unreadable. Choose a new quiz.");
    return null;
  }
}

function resumePractice() {
  if (!savedAttempt) return;
  Object.assign(state, { level: savedAttempt.level, topic: savedAttempt.topic, quiz: savedAttempt.quiz, responses: savedAttempt.responses, index: savedAttempt.index, selected: savedAttempt.selected, answered: savedAttempt.answered });
  document.getElementById("levelSelect").value = state.level;
  document.getElementById("topicSelect").value = state.topic;
  updateSetup();
  activatePractice();
  renderPractice();
  renderAiPrompt();
  sessionStore.restored();
  savedAttempt = null;
  window.EnglishRoadUI.focusQuestion("practicePrompt");
}

function clearStudentData() {
  if (!window.confirm("Delete all English Road data from this browser and reset this page? This cannot be undone.")) return;
  if (!sessionStore.clearAll()) return;
  Object.assign(state, {
    quiz: [],
    index: 0,
    selected: "",
    answered: false,
    level: "A2",
    topic: "",
    responses: [],
    optionPositionCounts: [0, 0, 0, 0]
  });
  savedAttempt = null;
  document.getElementById("levelSelect").value = state.level;
  document.getElementById("topicSelect").value = state.topic;
  document.getElementById("resumePracticeBox").hidden = true;
  document.getElementById("practiceLayout").hidden = true;
  document.querySelector(".practice-hero").classList.remove("is-active");
  document.getElementById("practiceSetupDetails").open = true;
  document.getElementById("practiceFeedback").textContent = "";
  document.getElementById("practiceFeedback").className = "feedback";
  document.getElementById("practiceAnswerHint").hidden = true;
  document.getElementById("practiceReview").hidden = true;
  document.getElementById("practiceReview").innerHTML = '<h2 id="practiceReviewTitle">Review answers</h2>';
  document.getElementById("practicePrompt").innerHTML = "";
  document.getElementById("practiceAnswers").innerHTML = "";
  document.getElementById("practiceMeta").innerHTML = "";
  renderAiPrompt();
  updateSetup();
  document.getElementById("startPracticeQuiz").focus({ preventScroll: true });
}

state.bank = createQuestionBank();
const BANK_REVISION = window.EnglishRoadQuestions.bankRevision(state.bank);
const topics = [...new Set(state.bank.map((question) => question.subcategory))].sort((a, b) => learnerSubcategory(a).localeCompare(learnerSubcategory(b)));
document.getElementById("topicSelect").innerHTML = '<option value="">— All topics</option>' + topics.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(learnerSubcategory(topic))}</option>`).join("");
const params = new URLSearchParams(location.search);
if (Object.hasOwn(levelBands, params.get("level"))) document.getElementById("levelSelect").value = params.get("level");
if (topics.includes(params.get("topic"))) document.getElementById("topicSelect").value = params.get("topic");
document.getElementById("practiceSetup").addEventListener("submit", startPractice);
document.getElementById("levelSelect").addEventListener("change", updateSetup);
document.getElementById("topicSelect").addEventListener("change", updateSetup);
document.getElementById("checkPracticeAnswer").addEventListener("click", checkPracticeAnswer);
document.getElementById("nextPracticeItem").addEventListener("click", nextPracticeItem);
document.getElementById("restartPractice").addEventListener("click", startPractice);
document.getElementById("copyAiPrompt").addEventListener("click", copyAiPrompt);
document.getElementById("resumePractice").addEventListener("click", resumePractice);
document.getElementById("deleteStudentData").addEventListener("click", clearStudentData);
document.getElementById("bankSize").textContent = state.bank.length.toLocaleString();
savedAttempt = readPractice();
if (savedAttempt) {
  document.getElementById("resumePracticeBox").hidden = false;
  document.getElementById("resumePracticeMessage").textContent = `${savedAttempt.level} practice${savedAttempt.topic ? ` · ${learnerSubcategory(savedAttempt.topic)}` : ""}: ${savedAttempt.responses.length} of ${savedAttempt.quiz.length} answered.`;
  document.getElementById("resumePractice").textContent = savedAttempt.index === savedAttempt.quiz.length ? "Open saved review" : "Resume saved quiz";
}
updateSetup();
window.englishRoadReady();
