// Dependency-free regression checks: node scripts/check.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function context(app) {
  let seed = 12345;
  const c = vm.createContext({ URLSearchParams, console, window: {
    crypto: { getRandomValues(values) { for (let i = 0; i < values.length; i++) { seed = (Math.imul(1664525, seed) + 1013904223) >>> 0; values[i] = seed; } } },
    EnglishRoadUI: { sessionStore: () => ({}) }
  } });
  for (const file of ['item-bank-data.js', 'coverage-bank-data.js', 'question-engine.js', 'learning-summary.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), c);
  if (app) {
    let code = fs.readFileSync(app, 'utf8');
    code = code.slice(0, code.indexOf(app === 'app.js' ? '\nconst sessionStore =' : '\nstate.bank = createQuestionBank();'));
    vm.runInContext(code, c);
    vm.runInContext('state.bank = createQuestionBank();', c);
  }
  return c;
}
const c = context('app.js');
const run = (code) => vm.runInContext(code, c);
const bank = run('state.bank');
const activeBankSize = 4200;
const minTopicLevelItems = 5;
const levelCheckHtml = fs.readFileSync('level-check.html', 'utf8');
const practiceHtml = fs.readFileSync('practice.html', 'utf8');
const familyCss = fs.readFileSync('family.css', 'utf8');
assert(levelCheckHtml.includes('id="meterSegments"'), 'Level check needs a sequential result meter container');
assert(practiceHtml.includes('id="practiceMeterSegments"'), 'Practice needs a sequential result meter container');
assert(!levelCheckHtml.includes('id="meterFill"'), 'Old level-check single-fill meter should not return');
assert(!practiceHtml.includes('id="practiceMeter"'), 'Old practice single-fill meter should not return');
assert(/\.meter \{[^}]*height: 12px/.test(familyCss), 'Result meter should stay visibly thicker');
assert(familyCss.includes('--correct-meter: #72c776;'), 'Result meter should use the lighter green color');
assert(familyCss.includes('.meter-segment.is-correct') && familyCss.includes('.meter-segment.is-incorrect'), 'Result meter needs correct and incorrect segment styles');
const revision = c.window.EnglishRoadQuestions.bankRevision(bank);
assert.notEqual(revision, c.window.EnglishRoadQuestions.bankRevision(bank.map((q, i) => i ? q : {...q, taskText:q.taskText+' Updated'})), 'A content change must invalidate an old saved attempt');
assert.equal(bank.length, activeBankSize);
assert.equal(run('new Set(state.bank.map(questionSignature)).size'), bank.length);
assert.equal(bank.reduce((sum, q) => sum + q.variationCount, 0), bank.length);
for (const q of bank) {
  assert.equal(q.options.length, 4, q.id);
  assert(q.options.includes(q.answer), q.id);
  assert(q.qaStatus === 'draft' || (q.qaStatus === 'reviewed' && q.reviewer && q.reviewDate), q.id);
  assert.equal(q.source, 'English Road');
  assert(!q.explanation.includes('The sentence needs this form of the word family.'), q.id);
  assert(q.options.every((option) => q.rationales[option]), q.id);
}
const contentStemItems = bank.filter(q => q.taskText.includes('___') || /^What does/.test(q.taskText));
const repeatedContentStems = [...contentStemItems.reduce((counts, q) => counts.set(q.taskText, (counts.get(q.taskText) || 0) + 1), new Map()).entries()].filter(([, count]) => count > 1);
assert.equal(repeatedContentStems.length, 0, `Repeated content stems: ${repeatedContentStems.slice(0, 3).map(([text, count]) => `${count}x ${text}`).join(' / ')}`);
const genericWrongRationales = bank.flatMap(q => q.options.filter(option => option !== q.answer).map(option => q.rationales[option])).filter(text => /does not fit the grammar or meaning of this item/.test(text));
assert.equal(genericWrongRationales.length, 0, 'Wrong-answer feedback should name the specific problem.');
const genericExplanationFragments = /best answer for this item|best matches the meaning in this item|makes the natural English phrase\.|most formal and professional\.|careful claim without saying too much|clearly states one reasonable problem|clearest short/i;
const genericExplanations = bank.filter(q => genericExplanationFragments.test(q.explanation) || genericExplanationFragments.test(q.taskText));
assert.equal(genericExplanations.length, 0, `Generic or confusing prompt/explanation text remains: ${genericExplanations[0]?.id}`);
const textGlitchPattern = /\.\.|\{[a-z0-9]+\}|which they were sent|undefined|null/i;
const textGlitch = bank.find(q => textGlitchPattern.test([q.taskText, q.explanation, ...q.options, ...Object.values(q.rationales || {})].join(' ')));
assert(!textGlitch, `Generated text glitch: ${textGlitch?.id}`);
const generatedChoices = bank.flatMap(q => q.options.map(option => ({ ...q, option, completed: q.taskText.replace('___', option) })));
const artificialOptionPattern = /\b(simpleer|largeer|safeer|closeer|carefulest|usefulest|formalest|regularest|reliableest|completeest|balancedly)\b/i;
const artificialOption = generatedChoices.find(q => artificialOptionPattern.test(q.option));
assert(!artificialOption, `Artificial-looking option form: ${artificialOption?.id} / ${artificialOption?.option}`);
const accidentalCollocationPattern = /\b(scrutinize results|gain attention|hold attention|provide research|submit evidence|scrutinize a hypothesis)\b/i;
const accidentalCollocation = generatedChoices.find(q => q.subcategory === 'Collocations' && accidentalCollocationPattern.test(q.completed));
assert(!accidentalCollocation, `Plausible collocation used as a distractor: ${accidentalCollocation?.id} / ${accidentalCollocation?.completed}`);
const namePronounMismatchPattern = /\b(Carlos|Omar|Daniel|Mateo|Jonas|Kenji|Luis|Noah|Theo)\b[^.?!]*\bshe\b|\bshe\b[^.?!]*\b(Carlos|Omar|Daniel|Mateo|Jonas|Kenji|Luis|Noah|Theo)\b/i;
const namePronounMismatch = bank.find(q => namePronounMismatchPattern.test([q.taskText, ...q.options].join(' ')));
assert(!namePronounMismatch, `Possible name/pronoun mismatch: ${namePronounMismatch?.id}`);
const transport = bank.find(q => q.taskText.includes('one hour ___ train'));
assert.match(transport.explanation, /transport/);
assert.doesNotMatch(transport.explanation, /later than/);
assert.equal(bank.find(q => q.taskText.includes('I bought a new car.')).subcategory, 'Articles');
assert(!bank.some(q => q.taskText === 'We invited ten people, and ___ of them replied.'));
assert(!bank.some(q => /complete sentence|sentence.*complete/.test(q.taskText) && q.options.includes('And the class understood.')));
const learning = c.window.EnglishRoadLearning;
const topics = Object.keys(c.window.EnglishRoadQuestions.learnerSubcategoryLabels);
assert.equal(new Set(bank.map(q => q.subcategory)).size, topics.length);
const expectedTopicLevelItems = activeBankSize / (topics.length * learning.levels.length);
let minObservedTopicLevelItems = Infinity;
for (const topic of topics) {
  for (const level of learning.levels) {
    const count = bank.filter(q => q.subcategory === topic && learning.levelForDifficulty(q.difficulty) === level).length;
    minObservedTopicLevelItems = Math.min(minObservedTopicLevelItems, count);
    assert(count >= minTopicLevelItems, `${topic} / ${level} has only ${count} items`);
    assert.equal(count, expectedTopicLevelItems, `${topic} / ${level} should have ${expectedTopicLevelItems} items`);
  }
}
// Selection cue is monotonic for every response and independent of response order.
const history = bank.slice(0, 30).map((q, i) => ({ difficulty: q.difficulty, correct: i % 3 !== 0 }));
const baseline = learning.selectionDifficulty(history);
for (let difficulty = 1; difficulty <= 6; difficulty += 0.1) {
  assert(learning.selectionDifficulty([...history, { difficulty, correct: false }]) <= baseline + 1e-9);
  assert(learning.selectionDifficulty([...history, { difficulty, correct: true }]) >= baseline - 1e-9);
}
assert(Math.abs(learning.selectionDifficulty([...history].reverse()) - baseline) < 1e-9);
assert.equal(learning.practiceSuggestion([]).level, 'A1');
assert.equal(learning.practiceSuggestion(Array.from({length: 4}, () => ({difficulty: 6, correct: true}))).level, 'A1');
assert.equal(learning.practiceSuggestion(Array.from({length: 5}, () => ({difficulty: 6, correct: true}))).level, 'C2');
const results = [];
for (const pattern of ['all-correct', 'all-wrong', 'quarter-correct', 'early-correct', 'late-correct']) {
  c.pattern = pattern;
  const result = run(`(() => {
    state.questionIndex=0;state.selectionCue=1.45;state.responses=[];state.usedIds=new Set();state.usedTexts=new Set();state.optionPositionCounts=[0,0,0,0];state.mixTargets=createMixTargets();state.candidateOrder=createCandidateOrder();
    for(let i=0;i<100;i++) {
      state.current=chooseQuestion();
      const correct=pattern==='all-correct'?true:pattern==='all-wrong'?false:pattern==='quarter-correct'?i%4===0:pattern==='early-correct'?i<50:i>=50;
      const previous=state.selectionCue;
      updateSelectionCue(correct);
      if ((!correct && state.selectionCue > previous + 1e-9) || (correct && state.selectionCue < previous - 1e-9)) throw new Error('Non-monotonic update');
      state.responses.push({...state.current,correct,selected:correct?state.current.answer:state.current.options.find(o=>o!==state.current.answer)});state.questionIndex++;
    }
    return { pattern, correct:state.responses.filter(r=>r.correct).length, cue:state.selectionCue, distinct:new Set(state.responses.map(questionSignature)).size, report:buildReportText() };
  })()`);
  assert.equal(result.distinct, 100);
  assert.doesNotMatch(result.report, /Confidence:|TOEFL iBT estimate:|CEFR estimate:|English Road level range:/);
  if(pattern === 'all-wrong') assert(result.cue < 1.01);
  if(pattern === 'all-correct') assert(result.cue > 5.99);
  results.push({ pattern, correct: result.correct, selectionCue: Number(result.cue.toFixed(2)), distinct: result.distinct });
}
const p = context('practice.js');
assert.equal(JSON.stringify(bank), JSON.stringify(vm.runInContext('state.bank', p)), 'Both tools must use identical questions and feedback');
let focused = 0;
for (const level of ['A1','A2','B1','B2','C1','C2']) {
  p.level = level;
  const quiz = vm.runInContext('selectQuizItems(level)', p);
  assert.equal(quiz.length, 25, level);
  assert.equal(new Set(quiz.map(q=>q.id)).size, 25);
  for (const topic of new Set(bank.map(q=>q.subcategory))) {
    p.topic = topic;
    c.topic = topic;
    const suggestionUrl = new URL(run('practiceUrl(topic)'), 'https://englishroad.com/');
    p.suggestedLevel = suggestionUrl.searchParams.get('level');
    assert(vm.runInContext('practicePool(suggestedLevel, topic).length > 0', p), 'Report links must open an available set');
    const quiz = vm.runInContext('selectQuizItems(level, topic)', p);
    assert(quiz.length <= 25);
    assert(quiz.every(q=>q.subcategory===topic));
    assert.equal(new Set(quiz.map(q=>q.id)).size, quiz.length);
    if(quiz.length) focused++;
  }
}
console.log(JSON.stringify({ activeItems: bank.length, uniqueItems: run('new Set(state.bank.map(questionSignature)).size'), topics: topics.length, practiceBands: learning.levels.length, minItemsPerTopicBand: minObservedTopicLevelItems, reviewedItems:bank.filter(q=>q.qaStatus==='reviewed').length, focusedCombinations:focused, simulations:results },null,2));
console.log('All question-bank, scoring-boundary, shared-engine and quiz-selection checks passed.');
