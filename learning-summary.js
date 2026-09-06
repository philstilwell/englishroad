// Practice guidance only. These editorial difficulty labels are not CEFR calibration.
(() => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const boundaries = [1, 1.8, 2.7, 3.65, 4.65, 5.45];
  function levelForDifficulty(difficulty) {
    return levels[boundaries.reduce((index, boundary, i) => difficulty >= boundary ? i : index, 0)];
  }
  function selectionDifficulty(responses) {
    // Fit the whole history each time; there is no recency weighting. A wrong
    // answer can only lower this selection cue, even on a difficult question.
    // The logistic curve is a pacing heuristic, not a validated ability model.
    let low = 1;
    let high = 6;
    for (let step = 0; step < 48; step += 1) {
      const value = (low + high) / 2;
      const residual = responses.reduce((sum, response) =>
        sum + Number(response.correct) - 1 / (1 + Math.exp(response.difficulty - value)), 0)
        - (value - 1.45);
      if (residual > 0) low = value;
      else high = value;
    }
    return (low + high) / 2;
  }
  function practiceSuggestion(responses) {
    const groups = levels.map((level) => {
      const answers = responses.filter((response) => levelForDifficulty(response.difficulty) === level);
      return { level, attempted: answers.length, correct: answers.filter((r) => r.correct).length };
    });
    const supported = groups.filter((group) => group.attempted >= 5 && group.correct / group.attempted >= 0.75);
    const best = supported.at(-1);
    return best ? {
      level: best.level,
      reason: `You answered ${best.correct} of ${best.attempted} questions in our ${best.level} practice band correctly. Try that band and adjust it if needed.`
    } : {
      level: "A1",
      reason: "There is not enough consistent evidence for a higher practice band yet. Start with A1, or choose another band if it feels too easy."
    };
  }
  window.EnglishRoadLearning = Object.freeze({ levels, levelForDifficulty, selectionDifficulty, practiceSuggestion });
})();
