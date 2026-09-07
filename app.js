const {
  clamp, copyText, createQuestionBank, escapeHtml, formatAnswerForFeedback, incrementCount, learnerSubcategory, normalizeQuestionText, orderOptionsWithBalancedAnswerPosition, questionSignature, randomInt, recordAnswerPosition, shuffleRandom, splitTaskText, hasKnownAnswerAmbiguity, hasPluralCountQuantifierAmbiguity, hasKnownAwkwardPhrase, hasDisplayGuidanceProblem
} = window.EnglishRoadQuestions;

const TOTAL_QUESTIONS = 100;
const STORAGE_KEY = "englishroad-level-check-session-v1";
const SESSION_VERSION = 5;
const DIFFICULTY_BANDS = [
  { key: "starter", max: 2.2, target: 28 },
  { key: "developing", max: 3.3, target: 28 },
  { key: "independent", max: 4.5, target: 24 },
  { key: "advanced", max: 6.1, target: 20 }
];
const LEVEL_CHECK_DIVERSITY_PASSES = [
  { categoryLimit: 56, subcategoryLimit: 7, blueprintLimit: 3, focusLimit: 1, avoidRecentBlueprint: true },
  { categoryLimit: 58, subcategoryLimit: 9, blueprintLimit: 4, focusLimit: 1, avoidRecentBlueprint: false },
  { categoryLimit: 62, subcategoryLimit: 11, blueprintLimit: 5, focusLimit: 2, avoidRecentBlueprint: false },
  { categoryLimit: 70, subcategoryLimit: 14, blueprintLimit: 7, focusLimit: 3, avoidRecentBlueprint: false },
  { categoryLimit: TOTAL_QUESTIONS, subcategoryLimit: TOTAL_QUESTIONS, blueprintLimit: TOTAL_QUESTIONS, focusLimit: TOTAL_QUESTIONS, avoidRecentBlueprint: false }
];

const languageGuides = {
  "en": {
    "title": "How to use English Road",
    "purpose": "Review your English grammar and vocabulary. This is practice, not an official test or an assessment of your overall English level.",
    "functionText": "Answer 100 multiple-choice questions. The report shows your correct answers and topics to practice. Practice bands are approximate labels, not examination scores.",
    "steps": [
      "Choose an answer and click Check answer.",
      "Read the explanation, then click Next question.",
      "Check the save status. You can download your progress if saving is unavailable.",
      "After 100 answers, copy your activity report or choose a topic for more practice."
    ]
  },
  "ja": {
    "title": "English Road の使い方",
    "purpose": "英語の文法と語彙を復習します。これは練習用であり、公式試験や総合的な英語力の判定ではありません。",
    "functionText": "100問の選択問題に答えます。レポートには正解数と練習する項目が表示されます。練習の段階はおおよその目安であり、試験スコアではありません。",
    "steps": [
      "答えを選び、Check answer を押します。",
      "説明を読んで、Next question を押します。",
      "保存状況を確認してください。保存できない場合は、進捗をダウンロードできます。",
      "100問の後、学習レポートをコピーするか、項目を選んで練習を続けられます。"
    ]
  },
  "zh": {
    "title": "如何使用 English Road",
    "purpose": "复习英语语法和词汇。这是练习，不是正式考试，也不是对综合英语水平的评估。",
    "functionText": "回答100道选择题。报告显示答对的题数和可以继续练习的主题。练习等级只是大致标签，不是考试成绩。",
    "steps": [
      "选择答案，然后点击 Check answer。",
      "阅读解释，然后点击 Next question。",
      "检查保存状态。如果无法保存，可以下载学习进度。",
      "回答100题后，可以复制练习报告或选择一个主题继续练习。"
    ]
  },
  "es": {
    "title": "Cómo usar English Road",
    "purpose": "Repasa gramática y vocabulario en inglés. Es una práctica, no un examen oficial ni una evaluación de tu nivel general de inglés.",
    "functionText": "Responde 100 preguntas de opción múltiple. El informe muestra tus aciertos y temas para practicar. Las bandas de práctica son orientativas, no puntuaciones de examen.",
    "steps": [
      "Elige una respuesta y pulsa Check answer.",
      "Lee la explicación y pulsa Next question.",
      "Comprueba el estado del guardado. Si no se puede guardar, puedes descargar tu progreso.",
      "Después de 100 respuestas, copia el informe de la actividad o elige un tema para seguir practicando."
    ]
  },
  "pt": {
    "title": "Como usar o English Road",
    "purpose": "Revise gramática e vocabulário em inglês. Esta é uma atividade de prática, não um exame oficial nem uma avaliação do seu nível geral de inglês.",
    "functionText": "Responda a 100 perguntas de múltipla escolha. O relatório mostra seus acertos e temas para praticar. As faixas de prática são aproximadas, não notas de exames.",
    "steps": [
      "Escolha uma resposta e clique em Check answer.",
      "Leia a explicação e clique em Next question.",
      "Verifique o estado do salvamento. Se não for possível salvar, você pode baixar seu progresso.",
      "Depois de 100 respostas, copie o relatório da atividade ou escolha um tema para continuar praticando."
    ]
  },
  "pl": {
    "title": "Jak korzystać z English Road",
    "purpose": "Powtórz angielską gramatykę i słownictwo. To ćwiczenie, a nie oficjalny egzamin ani ocena ogólnego poziomu angielskiego.",
    "functionText": "Odpowiedz na 100 pytań wielokrotnego wyboru. Raport pokazuje poprawne odpowiedzi i tematy do ćwiczeń. Poziomy ćwiczeń są orientacyjne i nie są wynikami egzaminów.",
    "steps": [
      "Wybierz odpowiedź i kliknij Check answer.",
      "Przeczytaj wyjaśnienie i kliknij Next question.",
      "Sprawdź stan zapisu. Jeśli zapisywanie nie działa, możesz pobrać swoje postępy.",
      "Po 100 odpowiedziach skopiuj raport z ćwiczenia lub wybierz temat do dalszej nauki."
    ]
  },
  "ko": {
    "title": "English Road 사용 방법",
    "purpose": "영어 문법과 어휘를 복습하세요. 이 활동은 연습이며, 공식 시험이나 종합적인 영어 수준 평가가 아닙니다.",
    "functionText": "객관식 100문제에 답합니다. 보고서는 맞힌 문제 수와 연습할 주제를 보여 줍니다. 연습 단계는 대략적인 구분이며 시험 점수가 아닙니다.",
    "steps": [
      "답을 고르고 Check answer를 누르세요.",
      "설명을 읽고 Next question을 누르세요.",
      "저장 상태를 확인하세요. 저장할 수 없다면 학습 진행 내용을 다운로드할 수 있습니다.",
      "100문제 후 활동 보고서를 복사하거나 주제를 골라 연습을 계속하세요."
    ]
  },
  "fr": {
    "title": "Comment utiliser English Road",
    "purpose": "Révisez la grammaire et le vocabulaire anglais. Cette activité est un entraînement, pas un examen officiel ni une évaluation de votre niveau général d’anglais.",
    "functionText": "Répondez à 100 questions à choix multiple. Le rapport indique vos bonnes réponses et les thèmes à travailler. Les catégories de pratique sont approximatives, pas des scores d’examen.",
    "steps": [
      "Choisissez une réponse et cliquez sur Check answer.",
      "Lisez l’explication, puis cliquez sur Next question.",
      "Vérifiez l’état de l’enregistrement. Si celui-ci ne fonctionne pas, vous pouvez télécharger votre progression.",
      "Après 100 réponses, copiez le rapport de l’activité ou choisissez un thème pour continuer à vous entraîner."
    ]
  },
  "te": {
    "title": "English Road ఎలా ఉపయోగించాలి",
    "purpose": "ఆంగ్ల వ్యాకరణం మరియు పదజాలాన్ని అభ్యసించండి. ఇది సాధన మాత్రమే; అధికారిక పరీక్ష లేదా మీ మొత్తం ఆంగ్ల స్థాయి అంచనా కాదు.",
    "functionText": "100 బహుళ ఎంపిక ప్రశ్నలకు సమాధానం ఇవ్వండి. నివేదిక మీ సరైన సమాధానాలను, సాధన చేయాల్సిన అంశాలను చూపిస్తుంది. సాధన స్థాయులు సుమారు సూచనలు మాత్రమే; పరీక్ష స్కోర్లు కావు.",
    "steps": [
      "ఒక సమాధానం ఎంచుకొని Check answer నొక్కండి.",
      "వివరణ చదివి Next question నొక్కండి.",
      "సేవ్ స్థితిని తనిఖీ చేయండి. సేవ్ చేయలేకపోతే, మీ పురోగతిని డౌన్‌లోడ్ చేసుకోవచ్చు.",
      "100 సమాధానాల తర్వాత, సాధన నివేదికను కాపీ చేయండి లేదా మరింత సాధన కోసం ఒక అంశాన్ని ఎంచుకోండి."
    ]
  }
};

const state = {
  bank: [],
  current: null,
  answered: false,
  selected: "",
  questionIndex: 0,
  selectionCue: 1.45,
  responses: [],
  candidateOrder: [],
  usedIds: new Set(),
  usedTexts: new Set(),
  completedAt: "",
  mixTargets: null,
  optionPositionCounts: [0, 0, 0, 0]
};

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

  for (const diversityPass of LEVEL_CHECK_DIVERSITY_PASSES) {
    best = null;
    bestScore = Number.POSITIVE_INFINITY;

    for (const question of state.candidateOrder) {
      if (!canUseLevelCheckCandidate(question, balance, diversityPass, recentBlueprints)) continue;
      const outsideRange = question.difficulty < floor || question.difficulty > ceiling;
      const distance = Math.abs(question.difficulty - target);
      const blueprintPenalty = recentBlueprints.has(question.blueprint) ? 1.2 : 0;
      const weaknessPenalty = recentWeaknesses.has(question.subcategory) ? 0.55 : 0;
      const categoryPenalty = desiredCategory() === question.category ? 0 : 0.16;
      const outsidePenalty = outsideRange ? 4 + Math.abs(question.difficulty - clamp(question.difficulty, floor, ceiling)) : 0;
      const balancePenalty = sessionBalancePenalty(question, balance);
      const diversityPenalty = levelCheckDiversityPenalty(question, balance);
      const randomTieBreak = randomInt(1000) / 100000;
      const score = distance + blueprintPenalty + weaknessPenalty + categoryPenalty + outsidePenalty + balancePenalty + diversityPenalty + randomTieBreak;
      if (score < bestScore) {
        best = question;
        bestScore = score;
      }
    }

    if (best) break;
  }

  if (!best) throw new Error("No unused question is available.");
  state.usedIds.add(best.id);
  state.usedTexts.add(questionSignature(best));
  return prepareQuestionOptions(best);
}

function canUseLevelCheckCandidate(question, balance, diversityPass, recentBlueprints) {
  if (state.usedIds.has(question.id) || state.usedTexts.has(questionSignature(question))) return false;
  const focusKey = questionFocusKey(question);
  if (focusKey && (balance.focusKeys[focusKey] || 0) >= diversityPass.focusLimit) return false;
  if ((balance.categories[question.category] || 0) >= diversityPass.categoryLimit) return false;
  if ((balance.subcategories[question.subcategory] || 0) >= diversityPass.subcategoryLimit) return false;
  if ((balance.blueprints[question.blueprint] || 0) >= diversityPass.blueprintLimit) return false;
  if (diversityPass.avoidRecentBlueprint && recentBlueprints.has(question.blueprint)) return false;
  return true;
}

function levelCheckDiversityPenalty(question, balance) {
  const focusKey = questionFocusKey(question);
  const focusCount = focusKey ? balance.focusKeys[focusKey] || 0 : 0;
  const blueprintCount = balance.blueprints[question.blueprint] || 0;
  const subcategoryCount = balance.subcategories[question.subcategory] || 0;
  return (focusCount * 1.4) + (blueprintCount * 0.28) + (subcategoryCount * 0.08);
}

function questionFocusKey(question) {
  return question.focusKey || "";
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
    incrementCount(balance.difficultyBands, difficultyBand(response.difficulty).key);
    incrementCount(balance.blueprints, response.blueprint);
    const focusKey = questionFocusKey(response);
    if (focusKey) incrementCount(balance.focusKeys, focusKey);
    return balance;
  }, {
    categories: {},
    subcategories: {},
    difficultyBands: {},
    blueprints: {},
    focusKeys: {}
  });
}

function sessionBalancePenalty(question, balance) {
  const targets = state.mixTargets || createMixTargets();
  const nextPosition = state.responses.length + 1;
  const categoryTarget = targets.categoryTargets[question.category] || TOTAL_QUESTIONS / 2;
  const subcategoryTarget = targets.subcategoryTargets[question.subcategory] || 5;
  const band = difficultyBand(question.difficulty);
  const bandTarget = targets.difficultyTargets[band.key] || band.target;
  const categoryCount = balance.categories[question.category] || 0;
  const subcategoryCount = balance.subcategories[question.subcategory] || 0;
  const bandCount = balance.difficultyBands[band.key] || 0;
  let penalty = 0;

  penalty += pacedQuotaPenalty(categoryCount, categoryTarget, nextPosition, 0.9, 1.1);
  penalty += pacedQuotaPenalty(subcategoryCount, subcategoryTarget, nextPosition, 0.35, 0.32);
  penalty += pacedQuotaPenalty(bandCount, bandTarget, nextPosition, 1.2, 0.28);

  if (categoryCount >= categoryTarget + 4) penalty += 6 + (categoryCount - categoryTarget) * 0.35;
  else if (categoryCount >= categoryTarget) penalty += 1.6 + (categoryCount - categoryTarget) * 0.2;
  else if (categoryCount < categoryTarget - 5) penalty -= 0.04;

  if (subcategoryCount >= subcategoryTarget + 2) penalty += 4 + (subcategoryCount - subcategoryTarget) * 0.5;
  else if (subcategoryCount >= subcategoryTarget) penalty += 1.2 + (subcategoryCount - subcategoryTarget) * 0.32;
  else if (subcategoryCount < Math.max(1, subcategoryTarget - 2)) penalty -= 0.06;

  if (state.responses.length >= 16 && bandCount >= bandTarget) penalty += 0.28 + (bandCount - bandTarget) * 0.04;

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

function targetDifficulty() {
  const answered = state.responses.length;
  if (answered < 4) return 1.3 + answered * 0.18;
  const rolling = rollingAccuracy(8);
  const gentleLift = rolling >= 0.85 ? 0.42 : rolling >= 0.7 ? 0.18 : -0.1;
  return clamp(state.selectionCue + gentleLift, 1.1, 6);
}

function difficultyFloor() {
  const answered = state.responses.length;
  if (answered < 8) return 1;
  return clamp(state.selectionCue - 0.9, 1, 6);
}

function difficultyCeiling() {
  const answered = state.responses.length;
  const rolling = rollingAccuracy(8);
  if (answered < 5) return 2.1;
  if (answered < 10) return rolling >= 0.8 ? 2.8 : 2.35;
  if (answered < 20) return rolling >= 0.85 ? 3.5 : rolling >= 0.65 ? 3.0 : 2.55;
  if (answered < 40) return rolling >= 0.85 ? state.selectionCue + 1.0 : state.selectionCue + 0.55;
  return rolling >= 0.85 ? state.selectionCue + 1.15 : rolling >= 0.65 ? state.selectionCue + 0.75 : state.selectionCue + 0.35;
}

function renderQuestion() {
  state.current = chooseQuestion();
  state.answered = false;
  state.selected = "";
  renderCurrentQuestion();
  updateResults();
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
    `${window.EnglishRoadLearning.levelForDifficulty(state.current.difficulty)} practice band`
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
      <span>${escapeHtml(option)}</span>
    </label>
  `).join("");

  document.querySelectorAll("input[name='answer']").forEach((input) => {
    if (state.answered) {
      input.disabled = true;
      const option = input.closest(".answer-option");
      if (input.value === state.current.answer) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", '<span class="option-result">✓ Correct answer</span>');
      }
      if (input.checked && input.value !== state.current.answer) {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", '<span class="option-result">Your answer · Not quite</span>');
      }
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
    feedback.textContent = correct ? `✓ Correct. ${state.current.explanation}` : `Not quite. Correct answer: ${formatAnswerForFeedback(state.current.answer)} ${state.current.explanation}`;
    feedback.className = `feedback ${correct ? "good" : "needs-work"}`;
    button.textContent = state.questionIndex >= TOTAL_QUESTIONS ? "Completed" : "Next question";
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
    document.getElementById("feedback").textContent = "Choose an answer first.";
    return;
  }

  if (state.answered) {
    if (state.questionIndex >= TOTAL_QUESTIONS) return;
    renderQuestion();
    window.EnglishRoadUI.focusQuestion("questionText");
    return;
  }

  const correct = state.selected === state.current.answer;
  updateSelectionCue(correct);
  state.responses.push({ ...state.current, correct, selected: state.selected });
  state.questionIndex += 1;
  state.answered = true;
  if (state.questionIndex >= TOTAL_QUESTIONS && !state.completedAt) state.completedAt = new Date().toISOString();

  document.querySelectorAll(".answer-option").forEach((option) => {
    const input = option.querySelector("input");
    input.disabled = true;
    if (input.value === state.current.answer) {
      option.classList.add("correct");
      option.insertAdjacentHTML("beforeend", '<span class="option-result">✓ Correct answer</span>');
    }
    if (input.checked && input.value !== state.current.answer) {
      option.classList.add("incorrect");
      option.insertAdjacentHTML("beforeend", '<span class="option-result">Your answer · Not quite</span>');
    }
  });

  const feedback = document.getElementById("feedback");
  feedback.textContent = correct ? `✓ Correct. ${state.current.explanation}` : `Not quite. Correct answer: ${formatAnswerForFeedback(state.current.answer)} ${state.current.explanation}`;
  feedback.className = `feedback ${correct ? "good" : "needs-work"}`;

  updateResults();

  const button = document.getElementById("submitAnswer");
  if (state.questionIndex >= TOTAL_QUESTIONS) {
    button.textContent = "Completed";
    button.disabled = true;
  } else {
    button.textContent = "Next question";
  }
  persistSession();
}

function updateSelectionCue(correct) {
  state.selectionCue = window.EnglishRoadLearning.selectionDifficulty([
    ...state.responses, { difficulty: state.current.difficulty, correct }
  ]);
}

function updateResults() {
  const count = state.responses.length;
  const correct = state.responses.filter((response) => response.correct).length;
  document.getElementById("answerProgress").textContent = `${count} of ${TOTAL_QUESTIONS} answered`;
  document.getElementById("meterFill").style.width = `${count / TOTAL_QUESTIONS * 100}%`;
  document.getElementById("completionLink").hidden = count < TOTAL_QUESTIONS;
  document.getElementById("result-title").textContent = count ? `${correct} of ${count} correct` : "Your answers so far";
  document.getElementById("precisionText").textContent = "This is a record of this grammar and vocabulary activity. It does not measure your overall English level or predict examination scores.";
  document.getElementById("practiceSuggestions").hidden = !count;
  document.getElementById("practiceStartingPoint").hidden = count < 10;
  const suggestion = window.EnglishRoadLearning.practiceSuggestion(state.responses);
  document.getElementById("suggestionReason").textContent = suggestion.reason;
  document.getElementById("suggestedPractice").textContent = `Try ${suggestion.level} practice →`;
  document.getElementById("suggestedPractice").href = practiceUrl();
  for (const category of ["Grammar", "Vocabulary"]) {
    const answers = state.responses.filter((response) => response.category === category);
    document.getElementById(`${category.toLowerCase()}Performance`).textContent = `${answers.filter((r) => r.correct).length} of ${answers.length} correct`;
  }
  document.getElementById("downloadProgress").disabled = !count;
  renderWeaknesses();
  renderFinalReport();
}

function renderWeaknesses() {
  for (const category of ["Grammar", "Vocabulary"]) {
    const areas = areaStats().filter((area) => area.category === category && area.missed > 0).sort((a, b) => b.missed - a.missed);
    document.getElementById(`${category.toLowerCase()}Count`).textContent = String(areas.reduce((sum, area) => sum + area.missed, 0));
    document.getElementById(`${category.toLowerCase()}Weaknesses`).innerHTML = areas.length
      ? areas.map((area) => `<a class="chip" href="${escapeHtml(practiceUrl(area.subcategory))}">${escapeHtml(area.label)} · ${area.correct}/${area.attempted} correct${area.attempted < 3 ? " · small sample" : ""} →</a>`).join("")
      : '<span class="chip empty">No missed answers recorded</span>';
  }
}

function practiceUrl(topic = "") {
  const learning = window.EnglishRoadLearning;
  let { level } = learning.practiceSuggestion(state.responses);
  if (topic) {
    const available = [...new Set(state.bank.filter((q) => q.subcategory === topic).map((q) => learning.levelForDifficulty(q.difficulty)))];
    const suggestedIndex = learning.levels.indexOf(level);
    available.sort((a, b) => Math.abs(learning.levels.indexOf(a) - suggestedIndex) - Math.abs(learning.levels.indexOf(b) - suggestedIndex) || learning.levels.indexOf(a) - learning.levels.indexOf(b));
    level = available[0] || level;
  }
  return `practice.html?${new URLSearchParams({ level, ...(topic ? { topic } : {}) })}`;
}

function renderFinalReport() {
  const finished = state.responses.length >= TOTAL_QUESTIONS;
  renderReportPreview(finished);
  document.getElementById("finalReport").hidden = !finished;
  if (!finished) return;
  if (!state.completedAt) state.completedAt = new Date().toISOString();
  document.getElementById("copyReport").disabled = false;
  document.getElementById("copyReportStatus").textContent = "";
  document.getElementById("finalReportDate").textContent = `Completed: ${formatReportDate(new Date(state.completedAt))}`;
  document.getElementById("finalCorrect").textContent = `${state.responses.filter((response) => response.correct).length}/${TOTAL_QUESTIONS}`;
  const suggestion = window.EnglishRoadLearning.practiceSuggestion(state.responses);
  document.getElementById("finalSuggestion").textContent = suggestion.reason;
  document.getElementById("finalPracticeLink").href = practiceUrl();
  document.getElementById("finalPracticeLink").textContent = `Try ${suggestion.level} practice →`;
  const track = ["A1", "A2"].includes(suggestion.level) ? "beginner" : ["B1", "B2"].includes(suggestion.level) ? "intermediate" : "advanced";
  document.getElementById("finalLadderLink").href = `https://englishladder.com/${track}.html`;
  renderReportChips("finalStrongAreas", strongestAreas(), "Not enough consistent evidence for a strength yet");
  document.getElementById("finalWeakAreas").innerHTML = areaStats().filter((area) => area.missed).sort((a, b) => b.missed - a.missed).slice(0, 5).map((area) =>
    `<a class="chip" href="${escapeHtml(practiceUrl(area.subcategory))}">${escapeHtml(area.label)} · ${area.correct}/${area.attempted} correct${area.attempted < 3 ? " · small sample" : ""} →</a>`).join("") || '<span class="chip">No missed answers recorded</span>';
}

function renderReportPreview(finished) {
  const preview = document.getElementById("reportPreview");
  if (!preview) return;
  preview.hidden = finished;
  document.getElementById("reportPreviewNote").textContent = `Your report will be available after ${TOTAL_QUESTIONS} answers.`;
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
  const count = state.responses.length;
  const correct = state.responses.filter((response) => response.correct).length;
  const suggestion = window.EnglishRoadLearning.practiceSuggestion(state.responses);
  return [
    `English Road — ${count >= TOTAL_QUESTIONS ? "Completed" : "In-progress"} grammar and vocabulary review`,
    `Date: ${formatReportDate(new Date(state.completedAt || Date.now()))}`,
    `Answered: ${count}/${TOTAL_QUESTIONS}. Correct: ${correct}/${count}.`,
    "This summarizes this self-study activity only. It is not a CEFR assessment, examination prediction, or certificate.",
    ...(count >= 10 ? [`Practice starting point: ${suggestion.level}. ${suggestion.reason}`] : []),
    "Results by area:",
    ...areaStats().map((area) => `${area.label}: ${area.correct}/${area.attempted} correct${area.attempted < 3 ? " (small sample)" : ""}`),
    "", "Answers reviewed:",
    ...state.responses.map((response, index) => `${index + 1}. [${response.id}] ${response.taskText}\nYour answer: ${response.selected}\nKeyed answer: ${response.answer}\n${response.explanation}`),
    "", "Method and limitations: https://englishroad.com/about.html"
  ].join("\n");
}

function strongestAreas() {
  return areaStats()
    .filter((area) => area.attempted >= 3 && area.correct / area.attempted >= 0.75)
    .sort((a, b) => (b.correct / b.attempted) - (a.correct / a.attempted) || b.correct - a.correct || b.attempted - a.attempted)
    .slice(0, 5)
    .map((area) => `${area.label} ${area.correct}/${area.attempted}`);
}

function areaStats() {
  const stats = {};
  state.responses.forEach((response) => {
    const label = learnerSubcategory(response.subcategory);
    if (!stats[label]) stats[label] = { label, subcategory: response.subcategory, category: response.category, attempted: 0, correct: 0, missed: 0 };
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

function restart(event) {
  if ((state.responses.length || state.selected) && !window.confirm("Start a new level check? Your current answers and saved report will be cleared.")) return;
  if (event) clearSavedSession();
  state.questionIndex = 0;
  state.selectionCue = 1.45;
  state.responses = [];
  state.candidateOrder = createCandidateOrder();
  state.usedIds = new Set();
  state.usedTexts = new Set();
  state.completedAt = "";
  state.optionPositionCounts = [0, 0, 0, 0];
  updateResults();
  renderQuestion();
  if (event) window.EnglishRoadUI.focusQuestion("questionText");
}

function persistSession() {
  if (!state.current) return;
  sessionStore.save({
    version: SESSION_VERSION,
    bankSize: state.bank.length, bankRevision: BANK_REVISION,
    answered: state.answered,
    selected: state.selected,
    currentId: state.current.id,
    completedAt: state.completedAt,
    currentOptions: state.current.options,
    candidateOrderIds: state.candidateOrder.map((question) => question.id),
    responses: state.responses.map((response) => ({ id: response.id, options: response.options, selected: response.selected }))
  });
}

function restoreSession() {
  const saved = sessionStore.read();
  if (!saved) return false;
  try {
    if (saved.version !== SESSION_VERSION || saved.bankSize !== state.bank.length || saved.bankRevision !== BANK_REVISION) throw new Error("updated");
    const byId = questionMap();
    const current = byId.get(saved.currentId);
    const order = saved.candidateOrderIds;
    if (!current || !Array.isArray(order) || order.length !== state.bank.length || new Set(order).size !== order.length || order.some((id) => !byId.has(id))) throw new Error("invalid");
    if (!Array.isArray(saved.responses) || saved.responses.length > TOTAL_QUESTIONS) throw new Error("invalid");
    const responses = saved.responses.map((response) => hydrateResponse(response, byId));
    if (responses.some((response) => !response) || new Set(responses.map(questionSignature)).size !== responses.length) throw new Error("invalid");
    if (!window.EnglishRoadUI.validOptions(saved.currentOptions, current.options) || typeof saved.answered !== "boolean" || !["", ...current.options].includes(saved.selected)) throw new Error("invalid");
    const last = responses.at(-1);
    if (saved.answered ? (!last || last.id !== current.id || last.selected !== saved.selected) : responses.some((r) => questionSignature(r) === questionSignature(current))) throw new Error("invalid");
    if (responses.length === TOTAL_QUESTIONS && !saved.answered) throw new Error("invalid");
    state.responses = responses;
    state.questionIndex = responses.length;
    state.selectionCue = window.EnglishRoadLearning.selectionDifficulty(responses);
    state.candidateOrder = order.map((id) => byId.get(id));
    state.current = { ...current, options: saved.currentOptions };
    state.answered = saved.answered;
    state.selected = saved.selected;
    state.completedAt = responses.length === TOTAL_QUESTIONS && Number.isFinite(Date.parse(saved.completedAt)) ? saved.completedAt : "";
    state.usedIds = new Set([...responses.map((r) => r.id), current.id]);
    state.usedTexts = new Set([...responses.map(questionSignature), questionSignature(current)]);
    state.optionPositionCounts = [0, 0, 0, 0];
    responses.forEach((r) => recordAnswerPosition(r.options, r.answer, state.optionPositionCounts));
    if (!state.answered) recordAnswerPosition(state.current.options, current.answer, state.optionPositionCounts);
    renderCurrentQuestion();
    updateResults();
    sessionStore.restored();
    return true;
  } catch (error) {
    sessionStore.reject(error.message === "updated" ? "The questions and reports have been updated. Your previous attempt cannot be resumed with the revised bank. A new attempt is ready." : "The saved attempt is incomplete or unreadable. A new attempt is ready.");
    return false;
  }
}

function hydrateResponse(savedResponse, byId) {
  if (!savedResponse || typeof savedResponse !== "object") return null;
  const question = byId.get(savedResponse.id);
  if (!question || !question.options.includes(savedResponse.selected) || !window.EnglishRoadUI.validOptions(savedResponse.options, question.options)) return null;
  return { ...question, options: savedResponse.options, selected: savedResponse.selected, correct: savedResponse.selected === question.answer };
}

function questionMap() {
  return new Map(state.bank.map((question) => [question.id, question]));
}

function clearSavedSession() {
  sessionStore.remove();
}

function rollingAccuracy(size) {
  const recent = state.responses.slice(-size);
  if (!recent.length) return 0.5;
  return recent.filter((response) => response.correct).length / recent.length;
}

function renderLanguageInfo(languageKey = "en") {
  const validKey = Object.hasOwn(languageGuides, languageKey) ? languageKey : "en";
  const guide = languageGuides[validKey];
  document.querySelector(".language-info").lang = validKey;
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
      ${qaMetricCard("Awaiting editorial review", audit.qaStatusIssues)}
    </div>
    <div class="qa-table-grid">
      ${qaTable("By Category", audit.categoryCounts)}
      ${qaTable("By Difficulty Band", audit.difficultyCounts)}
      ${qaTable("By Author", audit.sourceCounts)}
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
      ` : "<p>No automated flags. This does not establish linguistic correctness.</p>"}
    </section>
  `;

  const exportButton = document.getElementById("downloadQaReport");
  if (exportButton) exportButton.addEventListener("click", () => downloadQaReport(audit));
}

function downloadQaReport(audit) {
  const payload = {
    generatedAt: new Date().toISOString(),
    bankSize: state.bank.length, bankRevision: BANK_REVISION,
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
    qaStatusIssues: state.bank.filter((question) => question.qaStatus !== "reviewed").length,
    flaggedItems: flaggedItems.slice(0, 80)
  };
}

function itemQaIssues(question) {
  const issues = [];
  if (!question.explanation) issues.push("Missing explanation");
  if (!question.rationales || question.options.some((option) => !question.rationales[option])) issues.push("Missing option rationale");
  if (question.qaStatus !== "reviewed") issues.push("Editorial review pending");
  if (hasKnownAnswerAmbiguity(question)) issues.push("Possible answer ambiguity");
  if (hasPluralCountQuantifierAmbiguity(question)) issues.push("Plural count quantifier ambiguity");
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

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

const sessionStore = window.EnglishRoadUI.sessionStore(STORAGE_KEY, () => Boolean(state.responses.length || state.selected));

document.getElementById("downloadProgress").addEventListener("click", () => window.EnglishRoadUI.downloadText(buildReportText(), "englishroad-progress.txt"));
document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
document.getElementById("restart").addEventListener("click", restart);
document.getElementById("instructionsToggle").addEventListener("click", toggleInstructions);
document.getElementById("languageSelect").addEventListener("change", (event) => {
  renderLanguageInfo(event.target.value);
});
document.getElementById("copyReport").addEventListener("click", copyFinalReport);
state.bank = createQuestionBank();
const BANK_REVISION = window.EnglishRoadQuestions.bankRevision(state.bank);
state.mixTargets = createMixTargets();
document.getElementById("bankSize").textContent = state.bank.length.toLocaleString();
renderLanguageInfo(document.getElementById("languageSelect").value);
renderQaDashboard();
if (!restoreSession()) restart();
document.getElementById("restart").disabled = false;
window.englishRoadReady();
