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
  for (const file of ['coverage-bank-data.js', 'question-engine.js', 'learning-summary.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), c);
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
// Catch bare vocabulary targets, but leave references to people or situations alone.
function unquotedMeaningTarget(task) {
  const match = task.match(/^What (?:does|do) (.+?) (?:mean|refer to|stand for)(?=\s|[?.,])/);
  if (!match) return null;
  const explicitLabel = /^(?:the )?(?:word|words|phrase|expression|term|verb|noun|adjective|adverb)\s+/;
  const target = match[1].replace(explicitLabel, '');
  if (/^(?:'[^\n]+'|"[^\n]+"|\u2018[^\n]+\u2019|\u201c[^\n]+\u201d)$/.test(target)) return null;
  if (!explicitLabel.test(match[1]) && /^(?:this|that|these|those|it|he|she|they|you|we|I|the|a|an|his|her|their|our|your|my)\b|^[A-Z]/.test(target)) return null;
  return target;
}
for (const [task, expected] of [
  ['What does studies mean here?', 'studies'],
  ['What does carry on mean in this message?', 'carry on'],
  ['What does the word studies mean here?', 'studies'],
  ["What does 'studies' mean here?", null],
  ['What does "one\'s own" mean here?', null],
  ['What does \u2018carry on\u2019 mean here?', null],
  ['What does she mean here?', null],
  ['What does the test mean for the learner?', null],
  ['What does Mei mean here?', null]
]) assert.equal(unquotedMeaningTarget(task), expected, task);
for (const q of bank) {
  assert.equal(unquotedMeaningTarget(q.taskText), null, `${q.id}: put a word or phrase being defined in quotation marks`);
}
assert.equal(bank.find(q => q.id === 'coverage-academic-vocabulary-a1-4').taskText, "What does 'studies' mean here?", 'The studies prompt must keep its quoted vocabulary target');
const missingBankContext = context();
delete missingBankContext.window.createEnglishRoadCoverageBlueprints;
assert.throws(() => vm.runInContext('window.EnglishRoadQuestions.createQuestionBank()', missingBankContext), /question bank did not load/, 'A missing bank must not revive legacy template questions');
const activeBankSize = 4200;
const minTopicLevelItems = 5;
const templateAuditTerms = [
  'Mina','Carlos','Aiko','Nadia','Omar','Lena','Sofia','Daniel','Rina','Mateo','Hana','Jonas','Priya','Kenji','Sara','Luis','Emma','Noah','Yara','Theo','Maya','Ben','Nora','Kai','Tom','Aya','Sam',
  'library','clinic','office','school','station','museum','training room','conference room','housing desk','language center','airport','bookstore','laboratory','community center','garden','market','workshop','reception desk','classroom','cafeteria',
  'report','schedule','form','notice','email','chart','application','message','contract','invoice','lesson plan','survey','manual','proposal','receipt','agenda','map','guide','policy','summary',
  'reports','schedules','forms','notices','emails','charts','applications','messages','contracts','invoices','lesson plans','surveys','manuals','proposals','receipts','agendas','maps','guides','policies','summaries',
  'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','June','September','winter','spring','noon','3 p.m.','9 a.m.','midnight','lunchtime','desk','table','room','door','window','bus','train',
  'teacher','student','students','workers','visitors','parents','applicants','readers','nurses','clerks','drivers','volunteers','researchers','managers','assistants','tutors','trainees','analysts','coordinators','guests','interns'
].sort((a, b) => b.length - a.length);
function escapedPattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function templateSkeleton(text) {
  let skeleton = text.toLowerCase().replace(/["“”]/g, '').replace(/\b\d+\b/g, 'NUM');
  for (const term of templateAuditTerms) {
    skeleton = skeleton.replace(new RegExp(`\\b${escapedPattern(term.toLowerCase())}\\b`, 'g'), 'X');
  }
  return skeleton
    .replace(/\b[a-z]+ed\b/g, 'Ved')
    .replace(/\b[a-z]+ing\b/g, 'Ving')
    .replace(/\b[a-z]+s\b/g, 'Ns')
    .replace(/\s+/g, ' ')
    .trim();
}
function antiTemplateSurface(question) {
  if (question.taskText.includes('___')) return question.taskText;
  if (/^(Choose|Which|Pick|Find)\b/.test(question.taskText) && !/["'“”]/.test(question.taskText) && /[.!?]$/.test(question.answer)) return question.answer;
  return `${question.setupText} ${question.taskText}`;
}
function innerItemSurface(question) {
  let text = antiTemplateSurface(question);
  const meaningTask = text.match(/^What does "([^"]+)" (?:mean|do) in this sentence\?\s*(.+)$/i);
  if (meaningTask) {
    text = `${meaningTask[1]} :: ${meaningTask[2]}`;
  } else {
    const quoted = [...text.matchAll(/"([^"]+)"/g)].map(match => match[1]);
    const sentences = quoted.filter(quote => quote.split(/\s+/).length >= 6);
    if (sentences.length === 1) text = sentences[0];
  }
  return text
    .replace(/^within (?:the|a) [^,]+,\s*/i, '')
    .replace(/^the [a-z ]+ note says,\s*/i, '')
    .replace(/^[A-Z][a-z]+(?:'s)? (?:worksheet says|reminder reads|copied this sentence):\s*/i, '')
    .replace(/^for the [a-z ]+ staff,\s*/i, '')
    .replace(/^a practice card for the [a-z ]+ says,\s*/i, '')
    .replace(/^in a message to [a-z ]+,\s*/i, '')
    .replace(/^the first line of the [a-z ]+ says,\s*/i, '')
    .replace(/^on the [a-z ]+ board,\s*/i, '')
    .replace(/^during a short review,\s*/i, '')
    .replace(/^the example in the [a-z ]+ is:\s*/i, '')
    .replace(/^for tomorrow's lesson,\s*/i, '')
    .replace(/^a note beside the [a-z ]+ says,\s*/i, '')
    .replace(/^in the practice text,\s*/i, '')
    .replace(/^the instruction on the [a-z ]+ reads,\s*/i, '')
    .replace(/^for the final question,\s*/i, '')
    .replace(/^a message from [A-Z][a-z]+ says,\s*/i, '')
    .replace(/^the classroom example is:\s*/i, '')
    .replace(/^on the review screen,\s*/i, '')
    .replace(/^(?:for|during|before|after|in|on|near|at|beside|by) [^,]{2,80},\s*/i, '')
    .replace(/^what does "[^"]+" (?:mean|do) in this sentence\?\s*/i, '')
    .replace(/^read this (?:note|sentence|claim|comment):\s*/i, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
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
const feedbackFixture = { ...bank[0], options: ['The correct sentence.', 'The selected sentence.', 'Third choice.', 'Fourth choice.'],
  answer: 'The correct sentence.', explanation: 'The exact teaching explanation.',
  rationales: { 'The selected sentence.': 'The diagnostic reason for this particular error.' } };
const wrongFeedback = c.window.EnglishRoadQuestions.answerFeedback(feedbackFixture, 'The selected sentence.');
assert(wrongFeedback.includes(feedbackFixture.rationales['The selected sentence.']), 'Immediate feedback must include the selected distractor diagnosis');
assert(wrongFeedback.includes(feedbackFixture.explanation), 'Immediate feedback must retain the correct-answer explanation');
assert(!wrongFeedback.includes('sentence..'), 'Feedback must not double an answer\'s final period');
assert.equal(c.window.EnglishRoadQuestions.answerFeedback(feedbackFixture, feedbackFixture.answer), `Correct. ${feedbackFixture.explanation}`);
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
const repeatedContentStems = [...contentStemItems.reduce((counts, q) => {
  const surface = antiTemplateSurface(q);
  return counts.set(surface, (counts.get(surface) || 0) + 1);
}, new Map()).entries()].filter(([, count]) => count > 1);
assert.equal(repeatedContentStems.length, 0, `Repeated content stems: ${repeatedContentStems.slice(0, 3).map(([text, count]) => `${count}x ${text}`).join(' / ')}`);
const genericWrongRationales = bank.flatMap(q => q.options.filter(option => option !== q.answer).map(option => q.rationales[option])).filter(text => /does not fit the grammar or meaning of this item/.test(text));
assert.equal(genericWrongRationales.length, 0, 'Wrong-answer feedback should name the specific problem.');
const genericExplanationFragments = /best answer for this item|best matches the meaning in this item|makes the natural English phrase\.|most formal and professional\.|careful claim without saying too much|clearly states one reasonable problem|clearest short/i;
const genericExplanations = bank.filter(q => genericExplanationFragments.test(q.explanation) || genericExplanationFragments.test(q.taskText));
assert.equal(genericExplanations.length, 0, `Generic or confusing prompt/explanation text remains: ${genericExplanations[0]?.id}`);
const textGlitchPattern = /(?<!\.)\.\.(?!\.)|\{[a-z0-9]+\}|\bundefined\b/i;
const textGlitch = bank.find(q => textGlitchPattern.test([q.taskText, q.explanation, ...q.options, ...Object.values(q.rationales || {})].join(' ')));
assert(!textGlitch, `Generated text glitch: ${textGlitch?.id}`);
const articleGlitchPattern = /\ba (email|application|invoice|agenda|office|airport|answer|address|example|interview|updated|old|online|early|emergency|appointment)\b/i;
// Check completed keyed clozes, not deliberate errors in distractors or quoted feedback.
const articleGlitch = bank.find(q => q.taskText.includes('___') && articleGlitchPattern.test(q.taskText.replace('___', q.answer === '(nothing)' ? '' : q.answer)));
assert(!articleGlitch, `Generated a/an glitch: ${articleGlitch?.id}`);
const generatedChoices = bank.flatMap(q => q.options.map(option => ({ ...q, option, completed: q.taskText.replace('___', option) })));
const artificialOptionPattern = /\b(simpleer|largeer|safeer|closeer|carefulest|usefulest|formalest|regularest|reliableest|completeest|balancedly)\b/i;
const artificialOption = generatedChoices.find(q => artificialOptionPattern.test(q.option));
assert(!artificialOption, `Artificial-looking option form: ${artificialOption?.id} / ${artificialOption?.option}`);
const lowercaseNamePattern = /\b(mina|carlos|aiko|nadia|omar|lena|sofia|daniel|rina|mateo|hana|jonas|priya|kenji|sara|luis|emma|noah|yara|theo|maya|ben|nora|kai|tom|aya|sam)\b/;
const lowercaseName = bank.find(q => lowercaseNamePattern.test([q.taskText, q.explanation, ...q.options, ...Object.values(q.rationales || {})].join(' ')));
assert(!lowercaseName, `Generated lowercase proper name: ${lowercaseName?.id}`);
const boilerplateSurfacePattern = /\bworksheet says,|\breminder reads,|\bcopied this sentence:|\ba practice card for the [a-z ]+ says,|\bthe classroom example is:|\bon the review screen,|a practice card says,|choose the clearest short/i;
const boilerplateSurface = bank.find(q => boilerplateSurfacePattern.test([q.taskText, q.explanation, ...q.options, ...Object.values(q.rationales || {})].join(' ')));
assert(!boilerplateSurface, `Boilerplate surface text remains: ${boilerplateSurface?.id}`);
const transport = c.window.EnglishRoadQuestions.explainAnswer({ subcategory: 'Prepositions', taskText: 'The trip will take about one hour ___ train.', answer: 'by' });
assert.match(transport, /transport/);
assert.doesNotMatch(transport, /later than/);
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
const a1EmphasisItems = bank.filter(q => q.subcategory === 'Inversion and emphasis' && learning.levelForDifficulty(q.difficulty) === 'A1');
assert.equal(a1EmphasisItems.length, expectedTopicLevelItems, 'A1 Emphasis should keep its full 20-item cell');
assert.equal(new Set(a1EmphasisItems.map(q => c.window.EnglishRoadQuestions.questionSignature(q))).size, a1EmphasisItems.length, 'A1 Emphasis tasks and choice sets must be distinct; short correct forms may legitimately recur');
assert(!a1EmphasisItems.some(q => /\bready\b/i.test([q.setupText, q.taskText, q.explanation, ...q.options, ...Object.values(q.rationales)].join(' '))), 'A1 Emphasis should not reuse the old "ready" template');
assert(!a1EmphasisItems.some(q => /opening phrase changes the word order|formal sentence/i.test(q.explanation)), 'A1 Emphasis needs targeted feedback, not the old generic explanation');
const templateClusters = [];
const answerBalanceProblems = [];
const repeatedInnerSurfaces = [];
const repeatedFocusTargets = [];
for (const topic of topics) {
  for (const level of learning.levels) {
    const cell = bank.filter(q => q.subcategory === topic && learning.levelForDifficulty(q.difficulty) === level);
    const counts = new Map();
    for (const question of cell) {
      const skeleton = templateSkeleton(antiTemplateSurface(question));
      counts.set(skeleton, (counts.get(skeleton) || 0) + 1);
    }
    const [skeleton, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    if (count >= 8) templateClusters.push(`${topic} / ${level}: ${count}x ${skeleton}`);
    const positionCounts = [0, 0, 0, 0];
    for (const question of cell) {
      const ordered = c.window.EnglishRoadQuestions.orderOptionsWithBalancedAnswerPosition(question.options, question.answer, positionCounts);
      c.window.EnglishRoadQuestions.recordAnswerPosition(ordered, question.answer, positionCounts);
    }
    if (positionCounts.some(count => count !== 5)) answerBalanceProblems.push(`${topic} / ${level}: ${positionCounts.join(', ')}`);
    const focusCounts = cell
      .filter(question => question.focusKey)
      .reduce((map, question) => map.set(question.focusKey, (map.get(question.focusKey) || 0) + 1), new Map());
    const repeatedFocus = [...focusCounts.entries()].filter(([, focusCount]) => focusCount > 1);
    if (repeatedFocus.length) {
      repeatedFocusTargets.push(`${topic} / ${level}: ${repeatedFocus.map(([focus, focusCount]) => `${focusCount}x ${focus}`).slice(0, 3).join(', ')}`);
    }
    const innerCounts = cell
      .filter(question => question.taskText.includes('___') || /^What does|^Read\b|^[A-Z][^,]+, read\b/i.test(question.taskText))
      .reduce((map, question) => {
        const inner = innerItemSurface(question);
        return map.set(inner, (map.get(inner) || 0) + 1);
      }, new Map());
    const [inner, innerCount] = [...innerCounts.entries()].sort((a, b) => b[1] - a[1])[0] || ['', 0];
    if (innerCount > 1) repeatedInnerSurfaces.push(`${topic} / ${level}: ${innerCount}x ${inner}`);
  }
}
assert.equal(templateClusters.length, 0, `Topic-level cells still look templated: ${templateClusters.slice(0, 5).join(' | ')}`);
assert.equal(answerBalanceProblems.length, 0, `Topic-level cells have unbalanced displayed answer positions: ${answerBalanceProblems.slice(0, 5).join(' | ')}`);
assert.equal(repeatedFocusTargets.length, 0, `Topic-level cells still repeat focus targets: ${repeatedFocusTargets.slice(0, 5).join(' | ')}`);
assert.equal(repeatedInnerSurfaces.length, 0, `Topic-level cells still repeat inner items: ${repeatedInnerSurfaces.slice(0, 5).join(' | ')}`);
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
const reviewElement = { innerHTML: '', hidden: true };
p.document = { getElementById(id) { assert.equal(id, 'practiceReview'); return reviewElement; } };
p.reviewFixture = { ...feedbackFixture, setupText: '<b>Essential context: the object is already known.</b>',
  taskText: 'The speaker writes: "Please bring ___ object."', selected: 'The selected sentence.', correct: false };
vm.runInContext('state.responses = [reviewFixture]; renderPracticeReview();', p);
assert(reviewElement.innerHTML.includes('&lt;b&gt;Essential context: the object is already known.&lt;/b&gt;'), 'Completed review must preserve and escape essential context');
assert(!reviewElement.innerHTML.includes('<b>Essential context'), 'Context must never be interpreted as HTML');
assert(reviewElement.innerHTML.includes('The speaker writes: &quot;Please bring ___ object.&quot;'), 'Review must not split or repunctuate the authored task');
assert(reviewElement.innerHTML.includes(feedbackFixture.rationales['The selected sentence.']));
const studyPrompt = vm.runInContext('formatItemForAiPrompt(reviewFixture, 0)', p);
assert(studyPrompt.includes(p.reviewFixture.setupText), 'Study prompts need the same context as the quiz');
assert(studyPrompt.includes(feedbackFixture.rationales['The selected sentence.']), 'Study prompts need the selected-choice diagnosis');
vm.runInContext('state.responses = [];', p);
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
