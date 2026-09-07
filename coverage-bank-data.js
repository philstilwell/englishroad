// Balanced active quiz bank. It creates 20 unique items for every
// topic-level pair: 35 topics * 6 practice bands * 20 = 4,200 items.
(function () {
  window.createEnglishRoadCoverageBlueprints = function createEnglishRoadCoverageBlueprints({ item }) {
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const perCell = 20;
    const levelDifficulty = { A1: 1.25, A2: 2.1, B1: 3.1, B2: 4.1, C1: 5.05, C2: 5.75 };
    const topics = [
      ["Vocabulary", "Academic vocabulary"],
      ["Grammar", "Adjective and adverb forms"],
      ["Grammar", "Advanced sentence structure"],
      ["Grammar", "Articles"],
      ["Grammar", "Clauses and connectors"],
      ["Vocabulary", "Collocations"],
      ["Grammar", "Comparatives"],
      ["Grammar", "Conditionals"],
      ["Grammar", "Count and noncount nouns"],
      ["Grammar", "Determiners and quantifiers"],
      ["Vocabulary", "Discourse function"],
      ["Vocabulary", "Everyday vocabulary"],
      ["Grammar", "Gerunds and infinitives"],
      ["Vocabulary", "Hedging and precision"],
      ["Grammar", "Inversion and emphasis"],
      ["Vocabulary", "Meaning in context"],
      ["Grammar", "Modals"],
      ["Vocabulary", "Nuance"],
      ["Grammar", "Parallel structure"],
      ["Grammar", "Passive voice"],
      ["Vocabulary", "Phrasal verbs"],
      ["Grammar", "Prepositions"],
      ["Grammar", "Pronouns and reference"],
      ["Grammar", "Question forms"],
      ["Grammar", "Reduced clauses"],
      ["Vocabulary", "Register"],
      ["Grammar", "Relative clauses"],
      ["Grammar", "Reported speech"],
      ["Grammar", "Sentence boundaries"],
      ["Grammar", "Subject-verb agreement"],
      ["Grammar", "Subjunctive and unreal forms"],
      ["Vocabulary", "Transitions"],
      ["Grammar", "Verb tense"],
      ["Vocabulary", "Word forms"],
      ["Vocabulary", "Workplace vocabulary"]
    ];

    const people = ["Mina", "Carlos", "Aiko", "Nadia", "Omar", "Lena", "Sofia", "Daniel", "Rina", "Mateo", "Hana", "Jonas", "Priya", "Kenji", "Sara", "Luis", "Emma", "Noah", "Yara", "Theo"];
    const teams = ["the students", "the teachers", "the nurses", "the clerks", "the drivers", "the volunteers", "the researchers", "the visitors", "the managers", "the applicants", "the workers", "the parents", "the assistants", "the tutors", "the trainees", "the readers", "the analysts", "the coordinators", "the guests", "the interns"];
    const places = ["library", "clinic", "office", "school", "station", "museum", "training room", "conference room", "housing desk", "language center", "airport", "bookstore", "laboratory", "community center", "garden", "market", "workshop", "reception desk", "classroom", "cafeteria"];
    const things = ["report", "schedule", "form", "notice", "email", "chart", "application", "message", "contract", "invoice", "lesson plan", "survey", "manual", "proposal", "receipt", "agenda", "map", "guide", "policy", "summary"];
    const pluralThings = ["reports", "schedules", "forms", "notices", "emails", "charts", "applications", "messages", "contracts", "invoices", "lesson plans", "surveys", "manuals", "proposals", "receipts", "agendas", "maps", "guides", "policies", "summaries"];
    const times = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "the morning", "the afternoon", "the evening", "June", "September", "winter", "spring", "noon", "3 p.m.", "the weekend", "next week", "last month", "the meeting", "class", "the interview"];
    const adjectives = ["clear", "quick", "quiet", "careful", "helpful", "simple", "polite", "accurate", "safe", "useful", "formal", "regular", "calm", "honest", "steady", "brief", "direct", "practical", "reliable", "complete"];
    const adverbs = ["clearly", "quickly", "quietly", "carefully", "helpfully", "simply", "politely", "accurately", "safely", "usefully", "formally", "regularly", "calmly", "honestly", "steadily", "briefly", "directly", "practically", "reliably", "completely"];
    const actions = [
      ["review", "reviews", "reviewed", "reviewed", "reviewing", "the report"],
      ["check", "checks", "checked", "checked", "checking", "the schedule"],
      ["write", "writes", "wrote", "written", "writing", "the summary"],
      ["send", "sends", "sent", "sent", "sending", "the email"],
      ["update", "updates", "updated", "updated", "updating", "the list"],
      ["prepare", "prepares", "prepared", "prepared", "preparing", "the lesson"],
      ["print", "prints", "printed", "printed", "printing", "the forms"],
      ["open", "opens", "opened", "opened", "opening", "the office"],
      ["answer", "answers", "answered", "answered", "answering", "the questions"],
      ["read", "reads", "read", "read", "reading", "the notice"],
      ["choose", "chooses", "chose", "chosen", "choosing", "the topic"],
      ["make", "makes", "made", "made", "making", "the plan"],
      ["find", "finds", "found", "found", "finding", "the file"],
      ["teach", "teaches", "taught", "taught", "teaching", "the class"],
      ["bring", "brings", "brought", "brought", "bringing", "the documents"],
      ["begin", "begins", "began", "begun", "beginning", "the session"],
      ["complete", "completes", "completed", "completed", "completing", "the application"],
      ["explain", "explains", "explained", "explained", "explaining", "the rule"],
      ["compare", "compares", "compared", "compared", "comparing", "the results"],
      ["approve", "approves", "approved", "approved", "approving", "the request"]
    ];

    const articleNouns = [
      ["appointment card", "an"], ["updated map", "an"], ["useful chart", "a"], ["online form", "an"], ["printed guide", "a"],
      ["emergency notice", "an"], ["short report", "a"], ["office key", "an"], ["simple example", "a"], ["hour-long lesson", "an"],
      ["student card", "a"], ["answer sheet", "an"], ["new invoice", "a"], ["interesting article", "an"], ["training video", "a"],
      ["early interview", "an"], ["final receipt", "a"], ["old address", "an"], ["weekly message", "a"], ["open question", "an"]
    ];

    function pick(values, index, offset = 0) {
      return values[(index + offset) % values.length];
    }

    function slug(value) {
      return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    function row(index) {
      return {
        person: pick(people, index),
        other: pick(people, index, 7),
        team: pick(teams, index),
        place: pick(places, index),
        otherPlace: pick(places, index, 9),
        thing: pick(things, index),
        thing2: pick(things, index, 6),
        plural: pick(pluralThings, index),
        plural2: pick(pluralThings, index, 8),
        time: pick(times, index),
        adjective: pick(adjectives, index),
        adverb: pick(adverbs, index),
        action: pick(actions, index)
      };
    }

    function fill(template, context) {
      return template.replace(/\{([a-z0-9]+)\}/gi, (_, key) => context[key] || "");
    }

    function lowerFirst(text) {
      return text.charAt(0).toLowerCase() + text.slice(1);
    }

    function withoutFinalPeriod(text) {
      return text.replace(/\.$/, "");
    }

    function makeItem(text, options, answer, focusKey = "", setup = "", metadata = {}) {
      return item(text, options, answer, focusKey, setup, { ...metadata, qaStatus: "draft" });
    }

    function sentenceChoice(prompt, correct, wrongs, focusKey = "") {
      return makeItem(prompt, [correct, ...wrongs], correct, focusKey);
    }

    function chooseByLevel(level, sets, index) {
      return pick(sets[level], index);
    }

    function verbTense(level, i) {
      const c = row(i);
      const [base, s, past, pp, ing, object] = c.action;
      const sets = {
        A1: [
          [`Every morning, ${c.person} ___ ${object}.`, [s, base, past, `is ${ing}`], s],
          [`Yesterday, ${c.person} ___ ${object}.`, [past, s, `has ${pp}`, ing], past]
        ],
        A2: [
          [`Right now, ${c.person} ___ ${object}.`, [`is ${ing}`, s, past, `has ${pp}`], `is ${ing}`],
          [`Tomorrow, ${c.person} ___ ${object}.`, [`is going to ${base}`, `goes to ${base}`, past, `has ${pp}`], `is going to ${base}`]
        ],
        B1: [
          [`Since Monday, ${c.person} ___ ${object} twice.`, [`has ${pp}`, past, `is ${ing}`, `has ${base}`], `has ${pp}`],
          [`If ${c.person} ${s} ${object} today, ${c.team} will use it tomorrow.`, [s, base, `will ${base}`, `has ${pp}`], s]
        ],
        B2: [
          [`By the time the meeting began, ${c.person} ___ ${object}.`, [`had ${pp}`, `has ${pp}`, past, `was ${ing}`], `had ${pp}`],
          [`When I arrived, ${c.person} ___ ${object}.`, [`was ${ing}`, `has ${pp}`, base, `had ${base}`], `was ${ing}`]
        ],
        C1: [
          [`By next Friday, ${c.person} ___ ${object}.`, [`will have ${pp}`, `will ${base}`, `will be ${ing}`, `had ${pp}`], `will have ${pp}`],
          [`Before the notice was sent, ${c.person} ___ ${object} for two hours.`, [`had been ${ing}`, `has been ${ing}`, `was ${ing}`, `had ${base}`], `had been ${ing}`]
        ],
        C2: [
          [`By this time next month, ${c.person} ___ ${object} for three years.`, [`will have been ${ing}`, `will be ${ing}`, `will have ${pp}`, `had been ${ing}`], `will have been ${ing}`],
          [`Hardly had ${c.person} ___ ${object} when the director requested a change.`, [pp, `have ${pp}`, `to ${base}`, ing], pp]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function articles(level, i) {
      const c = row(i);
      const [noun, article] = pick(articleNouns, i);
      const abstractNouns = ["timing", "feedback", "training", "attendance", "assessment", "funding", "translation", "privacy", "transport", "housing"];
      if (level === "A2" && i === 0) {
        return makeItem("I bought a new car. ___ car is red.", ["The", "A", "An", "(nothing)"], "The");
      }
      const sets = {
        A1: [[`Please bring ___ ${noun} to class.`, [article, article === "a" ? "an" : "a", "many", "(nothing)"], article]],
        A2: [[`${c.person} bought a ${c.thing} yesterday. ___ ${c.thing} is on the desk.`, ["The", "A", "An", "(nothing)"], "The"]],
        B1: [[`___ ${c.plural} can help new students understand the course.`, ["(nothing)", "A", "An", "Much"], "(nothing)"]],
        B2: [[`This is ___ most useful ${c.thing} in the office.`, ["the", "a", "an", "(nothing)"], "the"]],
        C1: [[`${c.person} studies ___ public policy at night.`, ["(nothing)", "the", "a", "an"], "(nothing)"]],
        C2: [[`The report on the ${c.thing} examines ___ role of ${pick(abstractNouns, i)} in ${pick(abstractNouns, i, 3)}.`, ["the", "a", "an", "(nothing)"], "the"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function prepositions(level, i) {
      const c = row(i);
      if (level === "A2" && i === 0) {
        return makeItem("The trip will take about one hour ___ train.", ["by", "on", "in", "at"], "by");
      }
      const sets = {
        A1: [[`The class starts ___ ${withoutFinalPeriod(c.time)}.`, ["on", "in", "at", "by"], ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "the weekend"].includes(c.time) ? "on" : ["noon", "3 p.m."].includes(c.time) ? "at" : "in"]],
        A2: [[`${c.person} left the ${c.place} and walked ___ the ${c.otherPlace}.`, ["to", "at", "in", "on"], "to"]],
        B1: [[`${c.person} is responsible ___ checking the ${c.thing}.`, ["for", "to", "at", "with"], "for"]],
        B2: [[`There was a sharp increase ___ ${c.plural} this month.`, ["in", "on", "at", "for"], "in"]],
        C1: [[`The decision about the ${c.thing} was made ___ response to student feedback.`, ["in", "on", "at", "by"], "in"]],
        C2: [[`The proposal about the ${c.thing} is consistent ___ the school's published policy.`, ["with", "to", "for", "at"], "with"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function countNouns(level, i) {
      const c = row(i);
      const noncount = pick(["information", "advice", "homework", "equipment", "traffic", "research", "evidence", "feedback", "furniture", "money"], i);
      const pieceNoun = pick(["advice", "evidence", "equipment", "furniture", "information", "research"], i);
      const sets = {
        A1: [[`There are ___ ${c.plural} on the table.`, ["two", "much", "a", "an"], "two"]],
        A2: [[`${c.person} needs ___ ${noncount} before Friday.`, ["some", "many", "several", "an"], "some"]],
        B1: [[`The office added three ___ of ${pieceNoun} to the file about the ${c.thing}.`, ["pieces", "piece", "many", "much"], "pieces"]],
        B2: [[`Only ___ ${pick(["students", "workers", "visitors", "parents", "applicants"], i)} at the ${c.place} understood the final question.`, ["a few", "a little", "much", "an"], "a few"]],
        C1: [[`The report about the ${c.thing} provides ___ evidence to support the decision.`, ["little", "few", "many", "several"], "little"]],
        C2: [[`The committee requested ___ additional research before changing the ${c.thing}.`, ["further", "many", "several", "a few"], "further"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function subjectVerb(level, i) {
      const c = row(i);
      const singular = c.thing;
      const plural = c.plural;
      const sets = {
        A1: [`${c.person} works at the ${c.place}.`, `${c.person} work at the ${c.place}.`, `${c.person} working at the ${c.place}.`, `${c.person} are work at the ${c.place}.`],
        A2: [`There are three ${plural} on the desk.`, `There is three ${plural} on the desk.`, `There has three ${plural} on the desk.`, `There are a ${plural} on the desk.`],
        B1: [`Each ${singular} has a number at the top.`, `Each ${singular} have a number at the top.`, `Each ${singular} having a number at the top.`, `Each ${singular} are have a number at the top.`],
        B2: [`The list of ${plural} is ready for review.`, `The list of ${plural} are ready for review.`, `The list of ${plural} have ready for review.`, `The list of ${plural} were prepares for review.`],
        C1: [`Neither ${c.person} nor the ${plural} were ready to leave.`, `Neither ${c.person} nor the ${plural} was ready to leave.`, `Neither ${c.person} nor the ${plural} has ready to leave.`, `Neither ${c.person} nor the ${plural} being ready to leave.`],
        C2: [`What matters most is the accuracy of the final ${plural}.`, `What matters most are the accuracy of the final ${plural}.`, `What matter most is the accuracy of the final ${plural}.`, `What matters most being the accuracy of the final ${plural}.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence with correct grammar.", set[0], set.slice(1), `subject-verb:${level}:${i}`);
    }

    function modals(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`${c.team} ___ bring a pencil to class.`, ["must", "must to", "musted", "musting"], "must"]],
        A2: [[`${c.person} ___ be at the ${c.place}; the lights are on.`, ["might", "must to", "should to", "can to"], "might"]],
        B1: [[`${c.team} ___ wear badges inside the building.`, ["have to", "have", "must to", "are must"], "have to"]],
        B2: [[`${c.person} ___ have left the file at home; it is not in the bag.`, ["may", "must to", "should to", "can to"], "may"]],
        C1: [[`${c.person} ___ rather finish the ${c.thing} before lunch.`, ["would", "had", "should to", "must to"], "would"]],
        C2: [[`${c.person} ___ have submitted the form earlier, but the office accepted it anyway.`, ["should", "must to", "would to", "can to"], "should"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function comparativeForm(adjective) {
      if (adjective === "good") return "better";
      if (adjective === "bad") return "worse";
      if (adjective === "far") return "farther";
      if (["careful", "helpful", "useful", "formal", "regular", "honest", "practical", "reliable", "complete"].includes(adjective)) return `more ${adjective}`;
      if (adjective.endsWith("y")) return `${adjective.slice(0, -1)}ier`;
      return `${adjective}er`;
    }

    function comparatives(level, i) {
      const c = row(i);
      const adj = pick(["small", "large", "quick", "slow", "cheap", "warm", "clear", "bright", "long", "short", "safe", "easy", "quiet", "busy", "new", "old", "strong", "weak", "close", "far"], i);
      const comp = comparativeForm(adj);
      const sets = {
        A1: [[`This ${c.thing} is ___ than that one.`, [comp, adj, `most ${adj}`, `very ${comp}`], comp]],
        A2: [[`The new ${c.place} is ___ the old one.`, [`bigger than`, `big than`, `more big than`, `biggest than`], "bigger than"]],
        B1: [[`${c.person}'s answer was much ___ than the first answer.`, [comp, `very ${comp}`, `more ${comp}`, adj], comp]],
        B2: [[`This is ___ useful ${c.thing} in the folder.`, ["the most", "most than", "more than", "the more"], "the most"]],
        C1: [[`The revised ${c.thing} is no ___ ${adj} than the original one.`, ["less", "least", "lesser", "little"], "less"]],
        C2: [[`The second explanation about the ${c.thing} is all the more ___ because it includes real examples.`, ["persuasive", "persuading", "persuaded", "persuasion"], "persuasive"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function connectors(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`${c.person} stayed home ___ it was raining.`, ["because", "so", "although", "unless"], "because"]],
        A2: [[`${c.person} was tired, ___ she finished the ${c.thing}.`, ["but", "because", "unless", "so that"], "but"]],
        B1: [[`___ the room was noisy, ${c.team} understood the speaker.`, ["Although", "Because", "Therefore", "Unless"], "Although"]],
        B2: [[`${c.person} saved the file ___ the computer restarted.`, ["before", "during", "therefore", "despite"], "before"]],
        C1: [[`${c.person} revised the proposal, ___ the main argument remained unchanged.`, ["whereas", "because", "unless", "so that"], "whereas"]],
        C2: [[`The plan for the ${c.thing} is feasible ___ the committee approves the extra funding.`, ["provided that", "despite that", "because of", "therefore"], "provided that"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function conditionals(level, i) {
      const c = row(i);
      const [base, s, past, pp, ing, object] = c.action;
      const sets = {
        A1: [[`If it rains, ${c.person} ___ inside.`, ["will stay", "stays to", "stayed to", "will stayed"], "will stay"]],
        A2: [[`If ${c.person} ${s} early, ${c.team} will have more time.`, [s, base, `will ${base}`, `has ${pp}`], s]],
        B1: [[`${c.person} would help if she ___ more time.`, ["had", "has", "will have", "having"], "had"]],
        B2: [[`If ${c.person} had checked the ${c.thing}, she ___ the error.`, ["would have found", "will find", "would find", "has found"], "would have found"]],
        C1: [[`If the ${c.thing} were clearer, fewer people ___ mistakes.`, ["would make", "will make", "made", "had made"], "would make"]],
        C2: [[`Had ${c.person} ${pp} ${object} earlier, the meeting would have started on time.`, [pp, `have ${pp}`, `to ${base}`, ing], pp]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function passiveVoice(level, i) {
      const c = row(i);
      const [base, , past, pp, ing, object] = c.action;
      const passiveObject = object.replace(/^the /, "The ");
      const sets = {
        A1: [[`${passiveObject} ___ every Friday.`, [`is ${pp}`, past, `is ${ing}`, `has ${base}`], `is ${pp}`]],
        A2: [[`${passiveObject} ___ yesterday.`, [`was ${pp}`, past, `was ${ing}`, `has ${pp}`], `was ${pp}`]],
        B1: [[`${passiveObject} ___ by ${c.person} before lunch.`, [`was ${pp}`, past, `has ${base}`, `were ${pp}`], `was ${pp}`]],
        B2: [[`${passiveObject} ___ by three different reviewers.`, [`has been ${pp}`, `has ${pp}`, `was ${ing}`, `have been ${pp}`], `has been ${pp}`]],
        C1: [[`${passiveObject} should ___ before it is published.`, [`be ${pp}`, pp, `being ${pp}`, `have ${pp}`], `be ${pp}`]],
        C2: [[`The error is believed ___ during the final update.`, [`to have been ${pp}`, `to ${base}`, `being ${pp}`, `was ${pp}`], `to have been ${pp}`]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function relatives(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`The teacher ___ works in the ${c.place} is kind.`, ["who", "which", "where", "whose"], "who"]],
        A2: [[`This is the ${c.thing} ___ ${c.person} needs today.`, ["that", "where", "whose", "what"], "that"]],
        B1: [[`The ${c.place} ___ we met last week is closed today.`, ["where", "who", "whose", "what"], "where"]],
        B2: [[`The student ___ ${c.thing} was missing asked for another copy.`, ["whose", "who", "which", "where"], "whose"]],
        C1: [[`The ${c.thing}, ___ was revised twice, is ready now.`, ["which", "that", "what", "where"], "which"]],
        C2: [[`The policy under ___ the ${c.thing} program operates will be reviewed next month.`, ["which", "that", "what", "where"], "which"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function reportedSpeech(level, i) {
      const c = row(i);
      const sets = {
        A1: [`${c.person} said that she was tired.`, `${c.person} said that she is tired yesterday.`, `${c.person} said that tired she was.`, `${c.person} said she tired was.`],
        A2: [`${c.person} said that the class started at nine.`, `${c.person} said that the class start at nine.`, `${c.person} said the class has start at nine.`, `${c.person} said that nine started the class.`],
        B1: [`${c.person} asked where the ${c.place} was.`, `${c.person} asked where was the ${c.place}.`, `${c.person} asked where the ${c.place} is yesterday.`, `${c.person} asked where did the ${c.place} be.`],
        B2: [`${c.person} said that the meeting would start at noon.`, `${c.person} said that the meeting will started at noon.`, `${c.person} said the meeting would starts at noon.`, `${c.person} said that noon would the meeting start.`],
        C1: [`${c.person} explained that she had already sent the ${c.thing}.`, `${c.person} explained that she has already send the ${c.thing}.`, `${c.person} explained had she already sent the ${c.thing}.`, `${c.person} explained that already sent she the ${c.thing}.`],
        C2: [`${c.person} denied having changed the ${c.thing}.`, `${c.person} denied to have changed the ${c.thing}.`, `${c.person} denied that having changed the ${c.thing}.`, `${c.person} denied changed having the ${c.thing}.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the correct reported sentence.", set[0], set.slice(1), `reported:${level}:${i}`);
    }

    function reducedClauses(level, i) {
      const c = row(i);
      const sets = {
        A1: [`The ${pick(["man", "woman", "student", "teacher", "worker"], i)} wearing a blue coat in the ${c.place} is my teacher.`, `The ${pick(["man", "woman", "student", "teacher", "worker"], i)} wears a blue coat in the ${c.place} is my teacher.`, `The ${pick(["man", "woman", "student", "teacher", "worker"], i)} which wearing a blue coat in the ${c.place} is my teacher.`, `The ${pick(["man", "woman", "student", "teacher", "worker"], i)} wearing a blue coat in the ${c.place} my teacher.`],
        A2: [`The ${pick(["students", "workers", "visitors", "children", "parents"], i)} sitting near the window in the ${c.place} can hear clearly.`, `The ${pick(["students", "workers", "visitors", "children", "parents"], i)} sit near the window in the ${c.place} can hear clearly.`, `The ${pick(["students", "workers", "visitors", "children", "parents"], i)} which sitting near the window in the ${c.place} can hear clearly.`, `The ${pick(["students", "workers", "visitors", "children", "parents"], i)} sitting near the window in the ${c.place} hearing clearly.`],
        B1: [`The ${c.plural} printed yesterday are on the desk.`, `The ${c.plural} which they printed yesterday are on the desk.`, `The ${c.plural} printing yesterday are on the desk.`, `The ${c.plural} printed yesterday being on the desk.`],
        B2: [`The ${c.thing} prepared for the meeting explains the change.`, `The ${c.thing} which it was prepared for the meeting explains the change.`, `The ${c.thing} preparing for the meeting explains the change.`, `The ${c.thing} prepared for the meeting explaining the change.`],
        C1: [`The data collected during the ${c.thing} review support the conclusion.`, `The data which it was collected during the ${c.thing} review support the conclusion.`, `The data collecting during the ${c.thing} review support the conclusion.`, `The data collected during the ${c.thing} review supporting the conclusion.`],
        C2: [`The objections raised during the ${c.thing} review deserve careful attention.`, `The objections which they were raised during the ${c.thing} review deserve careful attention.`, `The objections raising during the ${c.thing} review deserve careful attention.`, `The objections raised during the ${c.thing} review deserving careful attention.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence with correct grammar.", set[0], set.slice(1), `reduced:${level}:${i}`);
    }

    function advancedStructure(level, i) {
      const c = row(i);
      const sets = {
        A1: [`There is a ${c.thing} on the desk.`, `There a ${c.thing} is on the desk.`, `On the desk has a ${c.thing}.`, `There are a ${c.thing} on the desk.`],
        A2: [`Could you tell me where the ${c.place} is?`, `Could you tell me where is the ${c.place}?`, `Could you tell to me where the ${c.place} is?`, `Could you tell me the ${c.place} where is?`],
        B1: [`It is important for ${c.person} to check the ${c.thing}.`, `It is important ${c.person} check the ${c.thing}.`, `It important for ${c.person} to check the ${c.thing}.`, `It is important for ${c.person} checking the ${c.thing}.`],
        B2: [`What ${c.person} needs is a clearer ${c.thing}.`, `What ${c.person} needs are a clearer ${c.thing}.`, `What needs ${c.person} is a clearer ${c.thing}.`, `What ${c.person} needs it is a clearer ${c.thing}.`],
        C1: [`Not only did ${c.person} revise the ${c.thing}, but she also explained the change.`, `Not only ${c.person} revised the ${c.thing}, but she also explained the change.`, `Not only did ${c.person} revised the ${c.thing}, but she also explained the change.`, `Not only revised ${c.person} the ${c.thing}, but also explained the change.`],
        C2: [`Had ${c.person} known about the delay, she would have changed the schedule.`, `Had ${c.person} knew about the delay, she would have changed the schedule.`, `If had ${c.person} known about the delay, she would have changed the schedule.`, `Had known ${c.person} about the delay, she would have changed the schedule.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence with correct grammar.", set[0], set.slice(1), `advanced:${level}:${i}`);
    }

    function gerundsInfinitives(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`${c.person} wants ___ English after work.`, ["to study", "study", "studying", "to studying"], "to study"]],
        A2: [[`${c.person} enjoys ___ short stories.`, ["reading", "to read", "read", "to reading"], "reading"]],
        B1: [[`The office agreed ___ the deadline for the ${c.thing}.`, ["to extend", "extending", "extend", "to extending"], "to extend"]],
        B2: [[`${c.person} avoided ___ the same mistake twice.`, ["making", "to make", "make", "to making"], "making"]],
        C1: [[`${c.person} is accustomed to ___ complex instructions.`, ["reading", "read", "to read", "to reading"], "reading"]],
        C2: [[`${c.person} objected to ___ without enough evidence.`, ["being criticized", "criticize", "be criticized", "to criticize"], "being criticized"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function questionForms(level, i) {
      const c = row(i);
      const sets = {
        A1: [`Where is the ${c.place}?`, `Where the ${c.place} is?`, `Where does the ${c.place} is?`, `Where is be the ${c.place}?`],
        A2: [`What time does the ${pick(["class", "meeting", "lesson", "interview", "workshop"], i)} at the ${c.place} start?`, `What time the ${pick(["class", "meeting", "lesson", "interview", "workshop"], i)} at the ${c.place} starts?`, `What time does the ${pick(["class", "meeting", "lesson", "interview", "workshop"], i)} at the ${c.place} starts?`, `What time is start the ${pick(["class", "meeting", "lesson", "interview", "workshop"], i)} at the ${c.place}?`],
        B1: [`How long has ${c.person} worked there?`, `How long ${c.person} has worked there?`, `How long has worked ${c.person} there?`, `How long did ${c.person} has worked there?`],
        B2: [`Could you explain why the ${c.thing} was changed?`, `Could you explain why was the ${c.thing} changed?`, `Could you explain why did the ${c.thing} changed?`, `Could you explain why changed was the ${c.thing}?`],
        C1: [`Do you know whether the committee has approved the ${c.thing}?`, `Do you know whether has the committee approved the ${c.thing}?`, `Do you know whether the committee have approve the ${c.thing}?`, `Do you know whether approved has the committee the ${c.thing}?`],
        C2: [`To what extent does the evidence about the ${c.thing} support the conclusion?`, `To what extent the evidence about the ${c.thing} supports the conclusion?`, `To what extent does support the evidence about the ${c.thing} the conclusion?`, `To what extent is the evidence about the ${c.thing} support the conclusion?`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the correct question.", set[0], set.slice(1), `question:${level}:${i}`);
    }

    function pronouns(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`${c.person} has a book. ___ is on the desk.`, ["It", "They", "Them", "She"], "It"]],
        A2: [[`${c.person} and ${c.other} finished the task, and ___ sent it to the teacher.`, ["they", "she", "it", "him"], "they"]],
        B1: [[`The ${c.plural} are ready; please put ___ in the folder.`, ["them", "it", "they", "he"], "them"]],
        B2: [[`Every ${pick(["student", "worker", "visitor", "applicant", "reader"], i)} at the ${c.place} should bring ___ own notebook.`, ["his or her", "their are", "them", "it"], "his or her"]],
        C1: [[`The ${pick(["committee", "company", "school", "office", "agency"], i)} at the ${c.place} published ___ final decision after the review.`, ["its", "their are", "them", "itself are"], "its"]],
        C2: [[`${c.person} gave the report to ${c.other} and ___.`, ["me", "I", "myself I", "mine"], "me"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function determiners(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`${c.person} needs ___ ${pick(["pencil", "notebook", "ticket", "folder", "receipt"], i)} for the test.`, ["a", "many", "much", "(nothing)"], "a"]],
        A2: [[`There is ___ ${pick(["milk", "water", "coffee", "rice", "paper"], i)} in the ${c.place}.`, ["some", "many", "a", "an"], "some"]],
        B1: [[`___ ${pick(["student", "worker", "visitor", "applicant", "reader"], i)} in the ${c.place} must sign the form.`, ["Each", "Many", "Much", "Several"], "Each"]],
        B2: [[`We have enough chairs for ___ ${pick(["visitor", "student", "parent", "guest", "trainee"], i)} in the ${c.place}.`, ["every", "much", "several", "few"], "every"]],
        C1: [[`Neither answer about the ${c.thing} gives ___ detail to support the claim.`, ["enough", "many", "several", "few"], "enough"]],
        C2: [[`The report about the ${c.thing} offers little, if ___, evidence for that conclusion.`, ["any", "many", "several", "few"], "any"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function adjectiveAdverb(level, i) {
      const c = row(i);
      const adj = c.adjective;
      const adv = c.adverb;
      const comp = comparativeForm(adj);
      const sets = {
        A1: [[`${c.person} is a ___ student.`, [adj, adv, `${adj}ness`, `very ${adv}`], adj]],
        A2: [[`${c.person} answered the question ___.`, [adv, adj, `${adj}ness`, `very ${adj}`], adv]],
        B1: [[`The ${c.plural} were written ___ for beginners.`, [adv, adj, `${adj}ness`, `very ${adj}`], adv]],
        B2: [[`The new ${c.thing} is ___ than the old one.`, [comp, adv, `${adj}est`, `${adj}ness`], comp]],
        C1: [[`The explanation about the ${c.thing} was surprisingly ___ for such a complex topic.`, [adj, adv, `${adj}ness`, `very ${adv}`], adj]],
        C2: [[`The committee responded in a ___ ${adj} way.`, [adv, adj, `${adj}ness`, `${adj} response`], adv]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function parallel(level, i) {
      const c = row(i);
      const sets = {
        A1: [`${c.person} likes reading, writing, and speaking.`, `${c.person} likes reading, writing, and to speak.`, `${c.person} likes read, writing, and speaking.`, `${c.person} likes reading, writes, and speaking.`],
        A2: [`The ${c.thing} requires patience, accuracy, and teamwork.`, `The ${c.thing} requires patience, accurate, and teamwork.`, `The ${c.thing} requires patient, accuracy, and teamwork.`, `The ${c.thing} requires patience, accuracy, and work as a team.`],
        B1: [`The ${c.thing} teaches students to plan, to revise, and to present.`, `The ${c.thing} teaches students to plan, revising, and to present.`, `The ${c.thing} teaches students planning, to revise, and to present.`, `The ${c.thing} teaches students to plan, to revise, and presenting.`],
        B2: [`The manager asked ${c.team} to check the data, correct the errors, and send the file.`, `The manager asked ${c.team} to check the data, correcting the errors, and send the file.`, `The manager asked ${c.team} checking the data, correct the errors, and send the file.`, `The manager asked ${c.team} to check the data, correct the errors, and sending the file.`],
        C1: [`The ${c.thing} is designed to reduce costs, improve service, and protect privacy.`, `The ${c.thing} is designed to reduce costs, improving service, and protect privacy.`, `The ${c.thing} is designed for reducing costs, improve service, and protect privacy.`, `The ${c.thing} is designed to reduce costs, improve service, and privacy protection.`],
        C2: [`The ${c.thing} was criticized for being vague, for lacking evidence, and for ignoring costs.`, `The ${c.thing} was criticized for being vague, lacking evidence, and for ignoring costs.`, `The ${c.thing} was criticized for vagueness, for lacking evidence, and ignoring costs.`, `The ${c.thing} was criticized being vague, for lacking evidence, and for ignoring costs.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence with matching structure.", set[0], set.slice(1), `parallel:${level}:${i}`);
    }

    function inversion(level, i) {
      const c = row(i);
      const sets = {
        A1: [`I am ready, and so is ${c.person}.`, `I am ready, and so ${c.person} is.`, `I am ready, and so does ${c.person}.`, `I am ready, and so ${c.person} does.`],
        A2: [`Here comes the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} from the ${c.place}.`, `Here the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} comes it from the ${c.place}.`, `Here does come the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} from the ${c.place}.`, `Here is comes the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} from the ${c.place}.`],
        B1: [`${c.person} likes English, and so do I.`, `${c.person} likes English, and so I do.`, `${c.person} likes English, and so am I.`, `${c.person} likes English, and so I am.`],
        B2: [`Not only did ${c.person} finish the ${c.thing}, but she also checked it.`, `Not only ${c.person} finished the ${c.thing}, but she also checked it.`, `Not only did ${c.person} finished the ${c.thing}, but she also checked it.`, `Not only finished ${c.person} the ${c.thing}, but she also checked it.`],
        C1: [`Only after the meeting ended did ${c.person} send the notes.`, `Only after the meeting ended ${c.person} sent the notes.`, `Only after ended the meeting did ${c.person} send the notes.`, `Only after the meeting did ended ${c.person} send the notes.`],
        C2: [`No sooner had ${c.person} opened the file than the system stopped working.`, `No sooner ${c.person} had opened the file than the system stopped working.`, `No sooner had opened ${c.person} the file than the system stopped working.`, `No sooner had ${c.person} open the file than the system stopped working.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence that gives clear emphasis.", set[0], set.slice(1), `inversion:${level}:${i}`);
    }

    function subjunctive(level, i) {
      const c = row(i);
      const sets = {
        A1: [[`${c.person} wishes she ___ at home now.`, ["were", "is", "be", "being"], "were"]],
        A2: [[`If I ___ ${c.person}, I would ask for help.`, ["were", "am", "be", "being"], "were"]],
        B1: [[`The teacher suggested that ${c.person} ___ early.`, ["arrive", "arrives", "arrived", "arriving"], "arrive"]],
        B2: [[`It is important that every ${pick(["applicant", "student", "visitor", "worker", "parent"], i)} at the ${c.place} ___ the form today.`, ["complete", "completes", "completed", "completing"], "complete"]],
        C1: [[`The policy requires that the ${c.thing} ___ submitted by Friday.`, ["be", "is", "was", "being"], "be"]],
        C2: [[`The committee insisted that the wording in the ${c.thing} ___ unchanged until the review ended.`, ["remain", "remains", "remained", "remaining"], "remain"]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function boundaries(level, i) {
      const c = row(i);
      const sets = {
        A1: [`${c.person} was tired, so she went home.`, `${c.person} was tired she went home.`, `${c.person} was tired, she went home.`, `${c.person} was tired so went home.`],
        A2: [`Because the train was late, ${c.person} called the office.`, `Because the train was late. ${c.person} called the office.`, `${c.person} called the office because. The train was late.`, `Because was late the train, ${c.person} called the office.`],
        B1: [`The ${c.thing} was incomplete, so the office returned it.`, `The ${c.thing} was incomplete the office returned it.`, `The ${c.thing} was incomplete, the office returned it.`, `The ${c.thing} was incomplete, so returned it the office.`],
        B2: [`The ${c.thing} changed; however, most students arrived on time.`, `The ${c.thing} changed, however most students arrived on time.`, `The ${c.thing} changed however most students arrived on time.`, `The ${c.thing} changed; however most students arriving on time.`],
        C1: [`The results for the ${c.thing} were promising; nevertheless, more evidence is needed.`, `The results for the ${c.thing} were promising, nevertheless more evidence is needed.`, `The results for the ${c.thing} were promising nevertheless more evidence is needed.`, `The results for the ${c.thing} were promising; nevertheless more evidence needing.`],
        C2: [`The sample for the ${c.thing} was small; therefore, the conclusion should be treated cautiously.`, `The sample for the ${c.thing} was small, therefore the conclusion should be treated cautiously.`, `The sample for the ${c.thing} was small therefore the conclusion should be treated cautiously.`, `The sample for the ${c.thing} was small; therefore the conclusion should treated cautiously.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence with clear punctuation and grammar.", set[0], set.slice(1), `boundaries:${level}:${i}`);
    }

    function grammar(topic, level, i) {
      const makers = {
        "Verb tense": verbTense,
        Articles: articles,
        Prepositions: prepositions,
        "Count and noncount nouns": countNouns,
        "Subject-verb agreement": subjectVerb,
        Modals: modals,
        Comparatives: comparatives,
        "Clauses and connectors": connectors,
        Conditionals: conditionals,
        "Passive voice": passiveVoice,
        "Relative clauses": relatives,
        "Reported speech": reportedSpeech,
        "Reduced clauses": reducedClauses,
        "Advanced sentence structure": advancedStructure,
        "Gerunds and infinitives": gerundsInfinitives,
        "Question forms": questionForms,
        "Pronouns and reference": pronouns,
        "Determiners and quantifiers": determiners,
        "Adjective and adverb forms": adjectiveAdverb,
        "Parallel structure": parallel,
        "Inversion and emphasis": inversion,
        "Subjunctive and unreal forms": subjunctive,
        "Sentence boundaries": boundaries
      };
      return makers[topic](level, i);
    }

    const definitionDistractors = [
      "a place where people wait",
      "a printed list of names",
      "money paid after a mistake",
      "a rule for using a building",
      "a person who repairs equipment",
      "a short holiday from work",
      "a document used for travel",
      "a sound made by a machine",
      "a way to hide information",
      "a tool for measuring distance"
    ];

    const vocabEntries = {
      "Everyday vocabulary": {
        A1: [["big", "large", "The {thing} is big."], ["small", "not large", "The room is small."], ["fast", "quick", "The train is fast."], ["near", "not far away", "The {place} is near the {otherPlace}."], ["begin", "start", "The lesson will begin at noon."]],
        A2: [["repair", "fix", "{person} will repair the chair."], ["borrow", "use and return", "{person} needs to borrow a pen."], ["return", "go or give back", "Please return the book tomorrow."], ["quiet", "not noisy", "The {place} is quiet today."], ["choose", "pick", "{person} must choose one answer."]],
        B1: [["delay", "make something happen later", "Heavy rain may delay the bus."], ["improve", "become better", "Practice can improve writing."], ["require", "need", "The trip will require a passport."], ["allow", "permit", "The rule will allow late registration."], ["avoid", "stay away from", "{person} tries to avoid mistakes."]],
        B2: [["brief", "short", "The manager gave a brief explanation."], ["reliable", "able to be trusted", "The new schedule is reliable."], ["accurate", "correct", "The final number must be accurate."], ["complex", "having many parts", "The process is complex."], ["available", "ready to be used", "The room is available after lunch."]],
        C1: [["reluctant", "not willing", "{person} was reluctant to change the plan."], ["subtle", "not easy to notice", "The difference was subtle."], ["substantial", "large or important", "The change made a substantial difference."], ["temporary", "lasting for a short time", "This is a temporary {thing}."], ["consistent", "steady and not changing", "Her attendance was consistent."]],
        C2: [["tentative", "not final or certain", "The committee reached a tentative agreement."], ["ambiguous", "having more than one possible meaning", "The instruction was ambiguous."], ["redundant", "not needed because it repeats something", "The final sentence was redundant."], ["plausible", "reasonable or believable", "The explanation seemed plausible."], ["deteriorate", "become worse", "The old building may deteriorate without repairs."]]
      },
      "Workplace vocabulary": {
        A1: [["job", "work that someone is paid to do", "{person} found a new job."], ["boss", "a person who manages workers", "The boss called a meeting."], ["pay", "give money for work or goods", "The company will pay on Friday."], ["staff", "people who work for an organization", "The staff are in the office."], ["shift", "a period of work time", "{person} works the morning shift."]],
        A2: [["deadline", "the time something must be finished", "The deadline for the form is Friday."], ["invoice", "a document requesting payment", "The office sent an invoice."], ["supervisor", "a person who manages workers", "Ask your supervisor before leaving."], ["appointment", "an arranged meeting", "The appointment is at 3 p.m."], ["overtime", "extra work hours", "{person} worked overtime yesterday."]],
        B1: [["contract", "a written agreement", "The contract starts next month."], ["client", "a person or company that uses a service", "The client requested a refund."], ["policy", "an official rule or plan", "The company changed its privacy policy."], ["application", "a formal request", "The application must be signed."], ["budget", "a plan for spending money", "The budget includes training costs."]],
        B2: [["negotiate", "discuss to reach an agreement", "The company will negotiate the price."], ["authorize", "give official permission", "Only the manager can authorize the payment."], ["implement", "put a plan into use", "The team will implement the new system."], ["reimburse", "pay back money spent", "The office will reimburse travel costs."], ["inventory", "goods or supplies kept by a business", "The store checked its inventory."]],
        C1: [["compliance", "following rules or laws", "The audit checked compliance with safety rules."], ["procurement", "the process of buying supplies", "Procurement took longer than expected."], ["liability", "legal responsibility", "The contract limits the company's liability."], ["stakeholder", "a person or group affected by a decision", "Each stakeholder received the update."], ["workflow", "the order in which work is done", "The new workflow reduced delays."]],
        C2: [["due diligence", "careful checking before a decision", "The buyer completed due diligence."], ["fiduciary", "related to a duty to act for someone else's benefit", "The board discussed its fiduciary duty."], ["contingency", "a plan for a possible problem", "The contract includes a contingency clause."], ["arbitration", "settling a dispute outside court", "The dispute went to arbitration."], ["benchmark", "a standard used for comparison", "The company used sales as a benchmark."]]
      },
      "Academic vocabulary": {
        A1: [["lesson", "a period of teaching", "The lesson starts at nine."], ["test", "an exam or check", "The test has ten questions."], ["answer", "a response to a question", "{person} wrote the answer."], ["study", "learn by reading or practice", "{person} will study tonight."], ["topic", "the subject being discussed", "The topic is transport."]],
        A2: [["method", "a way of doing something", "The teacher showed a new method."], ["source", "where information came from", "Please include the source."], ["evidence", "information that supports an idea", "The chart gives evidence."], ["factor", "one thing that affects a result", "Cost is one factor."], ["outcome", "the result", "The outcome was positive."]],
        B1: [["indicate", "show or suggest", "The arrows indicate the exit."], ["significant", "important enough to notice", "The change was significant."], ["assumption", "an idea accepted before proof", "The plan was based on an assumption."], ["analyze", "study carefully", "The class will analyze the data."], ["relevant", "closely connected to the topic", "Use only relevant details."]],
        B2: [["hypothesis", "an idea tested by research", "The experiment tested a hypothesis."], ["variable", "something that can change", "Age was one variable in the study."], ["interpret", "explain the meaning of something", "Students must interpret the graph."], ["framework", "a system of ideas", "The report uses a simple framework."], ["derive", "get from a source", "The conclusion was derived from survey data."]],
        C1: [["methodology", "the methods used in a study", "The article explains its methodology."], ["correlation", "a relationship between two measures", "The data show a correlation."], ["validity", "how well something measures what it should", "The researcher questioned the test's validity."], ["preliminary", "early and not final", "These are preliminary results."], ["implication", "a possible effect or meaning", "The finding has practical implications."]],
        C2: [["paradigm", "a model or way of thinking", "The theory changed the research paradigm."], ["synthesize", "combine ideas into a whole", "The paper synthesizes several studies."], ["empirical", "based on observation or data", "The claim needs empirical support."], ["extrapolate", "estimate beyond known data", "The report extrapolates from a small sample."], ["longitudinal", "following subjects over time", "The team designed a longitudinal study."]]
      },
      "Meaning in context": {
        A1: [["cold", "having a low temperature", "The room is cold today."], ["light", "not heavy", "This bag is light."], ["right", "correct", "Your answer is right."], ["hard", "difficult", "The question is hard."], ["free", "costing no money", "The class is free."]],
        A2: [["miss", "fail to catch or attend", "{person} might miss the bus."], ["save", "keep for later", "Please save the file."], ["stand", "accept or tolerate", "I cannot stand loud noise."], ["run", "manage or operate", "The school runs evening classes."], ["clear", "easy to understand", "The instructions are clear."]],
        B1: [["affect", "change or influence", "The rule will affect evening classes."], ["resolve", "find a solution to", "The manager tried to resolve the complaint."], ["support", "give reason to believe", "The evidence supports the claim."], ["emphasize", "give special attention to", "The tutor emphasized the final paragraph."], ["hinder", "make progress difficult", "The delay may hinder the project."]],
        B2: [["address", "deal with a problem", "The meeting will address safety concerns."], ["issue", "give officially", "The office will issue new cards."], ["conduct", "carry out", "The team will conduct a survey."], ["maintain", "keep at the same level", "The school wants to maintain quality."], ["approach", "way of dealing with something", "We need a new approach."]],
        C1: [["rule out", "decide not to consider", "The manager ruled out closing the office."], ["carry out", "complete or perform", "The team carried out the survey."], ["back up", "support with evidence", "The director backed up the decision with data."], ["phase out", "stop using gradually", "The company phased out the old {thing} during the summer."], ["set aside", "reserve", "The office set aside two rooms."]],
        C2: [["qualify", "make less absolute", "The final paragraph qualifies the claim."], ["undermine", "weaken", "The missing data undermine the conclusion."], ["account for", "explain", "The report accounts for seasonal changes."], ["bear out", "support or confirm", "The later evidence bore out the prediction."], ["give rise to", "cause", "The new rule gave rise to several complaints."]]
      },
      "Nuance": {
        A1: [["often", "many times", "{person} often studies after dinner."], ["usually", "most of the time", "The office usually opens at nine."], ["maybe", "possibly", "Maybe the class is full."], ["almost", "nearly", "The work is almost finished."], ["only", "no more than", "Only five students arrived."]],
        A2: [["roughly", "approximately", "The trip takes roughly one hour."], ["likely", "expected to happen", "Rain is likely tonight."], ["unlikely", "not expected to happen", "A delay is unlikely."], ["mainly", "mostly", "The course is mainly for beginners."], ["recently", "not long ago", "{person} moved recently."]],
        B1: [["temporary", "lasting for a short time", "This is a temporary rule."], ["formal", "suitable for official situations", "The letter used formal language."], ["minor", "not very serious", "The form had a minor error."], ["major", "very important or serious", "The delay caused a major problem."], ["specific", "clearly named or exact", "Please give a specific example."]],
        B2: [["precise", "exact and careful", "The teacher asked for a precise answer."], ["approximate", "not exact but close", "The chart gives an approximate number."], ["reasonable", "fair or sensible", "The request seemed reasonable."], ["apparent", "easy to see or understand", "The cause was not apparent."], ["notable", "important enough to notice", "There was a notable increase."]],
        C1: [["marginal", "small and not very important", "The change had only a marginal effect."], ["robust", "strong and reliable", "The results were robust."], ["inherent", "existing as a natural part", "The plan has inherent risks."], ["implicit", "suggested but not directly stated", "The message contained an implicit warning."], ["explicit", "clear and directly stated", "The rule was explicit."]],
        C2: [["negligible", "so small it is not important", "The cost difference was negligible."], ["ostensible", "stated but possibly not real", "The ostensible reason was safety."], ["contingent", "depending on something else", "Approval is contingent on funding."], ["equivocal", "not clearly one thing or the other", "The evidence was equivocal."], ["salient", "most noticeable or important", "The salient point was cost."]]
      }
    };

    function vocabMeaning(topic, level, i) {
      const entries = vocabEntries[topic][level];
      const entry = pick(entries, Math.floor(i / 4));
      const c = row(i);
      const sentence = fill(entry[2], c);
      const wrongs = definitionDistractors.filter((choice) => choice !== entry[1]).slice(i % 5, i % 5 + 3);
      return makeItem(`What does "${entry[0]}" mean in this sentence? ${sentence}`, [entry[1], ...wrongs], entry[1], `vocab:${topic}:${level}:${entry[0]}`);
    }

    const collocations = {
      A1: [["take", "a break"], ["make", "a cake"], ["have", "lunch"], ["catch", "a bus"], ["do", "homework"]],
      A2: [["make", "a choice"], ["keep", "a promise"], ["ask", "a question"], ["send", "an email"], ["follow", "the rules"]],
      B1: [["meet", "a deadline"], ["raise", "a concern"], ["book", "an appointment"], ["solve", "a problem"], ["set", "a goal"]],
      B2: [["reach", "a conclusion"], ["draw", "attention"], ["take", "responsibility"], ["gain", "experience"], ["hold", "a meeting"]],
      C1: [["pose", "a challenge"], ["conduct", "research"], ["allocate", "resources"], ["submit", "a proposal"], ["provide", "evidence"]],
      C2: [["mitigate", "risk"], ["yield", "results"], ["exert", "influence"], ["scrutinize", "evidence"], ["formulate", "a hypothesis"]]
    };

    function collocationItem(level, i) {
      const [verb, object] = pick(collocations[level], Math.floor(i / 4));
      const c = row(i);
      const wrongs = ["open", "touch", "carry", "watch", "move", "paint", "repair"].filter((word) => word !== verb).slice(i % 4, i % 4 + 3);
      return makeItem(`${c.person} needs to ___ ${object} before ${withoutFinalPeriod(c.time)}.`, [verb, ...wrongs], verb, `collocation:${level}:${verb}:${object}`);
    }

    const phrasal = {
      A1: [["wake up", "stop sleeping", "{person} wakes up early."], ["sit down", "take a seat", "Please sit down."], ["come in", "enter", "You can come in now."], ["go out", "leave home for an activity", "{person} will go out tonight."], ["stand up", "rise to your feet", "The class stood up."]],
      A2: [["fill out", "complete a form", "Please fill out the form."], ["turn on", "start a machine", "Turn on the computer."], ["look for", "try to find", "{person} will look for the file."], ["give back", "return", "Please give back the book."], ["put away", "place where it belongs", "Put away your notes."]],
      B1: [["put off", "delay", "The meeting was put off until Friday."], ["point out", "mention clearly", "The teacher pointed out the error."], ["look up", "search for information", "{person} looked up the address."], ["call back", "return a phone call", "The office will call back tomorrow."], ["find out", "discover", "We need to find out the reason."]],
      B2: [["look into", "examine", "The manager will look into the complaint."], ["take over", "become responsible for", "{person} will take over the project."], ["bring up", "mention", "Please bring up the safety issue."], ["work out", "succeed", "The plan worked out well."], ["turn down", "refuse", "The applicant turned down the offer."]],
      C1: [["phase out", "stop using gradually", "The company phased out the old system."], ["carry out", "perform", "The team carried out the survey."], ["set aside", "reserve", "The school set aside two rooms."], ["rule out", "decide not to consider", "The director ruled out closing the office."], ["back up", "support", "The data back up the claim."]],
      C2: [["bear out", "confirm", "Later evidence bore out the prediction."], ["scale back", "reduce", "The office scaled back the project."], ["factor in", "include in a calculation", "The report factors in transport costs."], ["iron out", "resolve small problems", "They ironed out the final problems."], ["zero in on", "focus on", "The review zeroed in on one error."]]
    };

    function phrasalItem(level, i) {
      const entry = pick(phrasal[level], Math.floor(i / 4));
      const c = row(i);
      const sentence = fill(entry[2], c);
      const wrongs = definitionDistractors.slice((i + 2) % 5, (i + 2) % 5 + 3);
      return makeItem(`What does "${entry[0]}" mean in this sentence? ${sentence}`, [entry[1], ...wrongs], entry[1], `phrasal:${level}:${entry[0]}`);
    }

    const wordForms = {
      A1: [["teach", "teacher", "The ___ helped the class."], ["work", "worker", "Each ___ needs a badge."], ["write", "writer", "The ___ signed the book."], ["drive", "driver", "The ___ stopped the bus."], ["visit", "visitor", "One ___ asked a question."]],
      A2: [["explain", "explanation", "The teacher gave a clear ___."], ["decide", "decision", "The final ___ was difficult."], ["invite", "invitation", "The office sent an ___."], ["pay", "payment", "The ___ arrived yesterday."], ["improve", "improvement", "The report showed clear ___." ]],
      B1: [["accurate", "accuracy", "The ___ of the number matters."], ["confident", "confidence", "Practice builds ___."], ["possible", "possibility", "The team discussed one ___."], ["responsible", "responsibility", "Each worker has a ___."], ["successful", "success", "The project was a ___." ]],
      B2: [["analyze", "analysis", "The ___ took two weeks."], ["participate", "participation", "The course requires regular ___."], ["calculate", "calculation", "The ___ was incorrect."], ["approve", "approval", "The plan needs official ___."], ["compare", "comparison", "The ___ was useful." ]],
      C1: [["valid", "validity", "The study questioned the test's ___."], ["relevant", "relevance", "The teacher explained the detail's ___."], ["coherent", "coherence", "The essay lacked ___."], ["efficient", "efficiency", "The change improved ___."], ["consistent", "consistency", "The data showed strong ___." ]],
      C2: [["ambiguous", "ambiguity", "The wording created ___."], ["imply", "implication", "The result has one practical ___."], ["derive", "derivation", "The article explains the term's ___."], ["assume", "assumption", "The model depends on that ___."], ["infer", "inference", "The final ___ was too strong." ]]
    };

    function wordFormItem(level, i) {
      const [base, answer, sentence] = pick(wordForms[level], Math.floor(i / 4));
      const c = row(i);
      const wrongs = [base, `${base}ed`, `${base}ing`, `${answer}ly`].filter((choice) => choice !== answer).slice(0, 3);
      return makeItem(`During the ${c.place} activity, ${lowerFirst(fill(sentence, c))}`, [answer, ...wrongs], answer, `word-form:${level}:${base}`);
    }

    const transitions = {
      A1: [["because", "shows a reason", "{person} stayed home because it rained."], ["and", "adds another idea", "{person} read and wrote."], ["but", "shows a different idea", "The room was small but clean."], ["so", "shows a result", "It rained, so we stayed inside."], ["then", "shows the next time", "{person} ate lunch, then studied."]],
      A2: [["however", "shows contrast", "The class was hard; however, it was useful."], ["therefore", "shows a result", "The form was late; therefore, it was returned."], ["for example", "introduces an example", "Bring ID, for example, a passport."], ["also", "adds information", "The course is cheap and also practical."], ["instead", "shows a replacement", "The room was full, so we met outside instead."]],
      B1: [["although", "shows contrast", "Although it rained, the class continued."], ["unless", "means if not", "Unless the office calls, the meeting is on."], ["while", "shows two things at the same time or contrast", "While the price is low, delivery is slow."], ["since", "shows a reason", "Since the form was missing, the office called."], ["as soon as", "means immediately after", "Call me as soon as the file arrives."]],
      B2: [["nevertheless", "shows contrast despite what came before", "The sample was small; nevertheless, the result was useful."], ["in contrast", "shows a difference", "Costs fell; in contrast, delays increased."], ["as a result", "shows an effect", "The form was clearer; as a result, errors fell."], ["meanwhile", "shows another action at the same time", "The team revised the form; meanwhile, the office trained staff."], ["otherwise", "means if not", "Submit the file today; otherwise, it will be late."]],
      C1: [["whereas", "compares two different facts", "The first plan saves money, whereas the second saves time."], ["provided that", "means only if", "The trip will continue provided that the weather improves."], ["consequently", "shows a result", "Demand increased; consequently, prices rose."], ["nonetheless", "shows contrast", "The evidence is limited; nonetheless, it is useful."], ["by contrast", "introduces a clear difference", "The old form was long; by contrast, the new one is brief."]],
      C2: [["notwithstanding", "despite", "Notwithstanding the delay, the project succeeded."], ["inasmuch as", "to the extent that", "The plan is fair inasmuch as it treats all groups equally."], ["thereby", "by doing that", "The new rule reduced errors, thereby saving time."], ["hence", "therefore", "The figures were incomplete; hence, the cautious conclusion."], ["lest", "to avoid the risk that", "The files were checked twice lest errors remain."]]
    };

    function transitionItem(level, i) {
      const entry = pick(transitions[level], Math.floor(i / 4));
      const sentence = fill(entry[2], row(i));
      const wrongs = definitionDistractors.slice((i + 3) % 5, (i + 3) % 5 + 3);
      return makeItem(`What does "${entry[0]}" do in this sentence? ${sentence}`, [entry[1], ...wrongs], entry[1], `transition:${level}:${entry[0]}`);
    }

    function registerItem(level, i) {
      const c = row(i);
      const formal = {
        A1: `Please sit down in the ${c.place}.`,
        A2: `Please send the ${c.thing} by Friday.`,
        B1: `Could you please confirm your appointment?`,
        B2: `Please let me know if further information is required.`,
        C1: `We apologize for any inconvenience this delay may cause.`,
        C2: `The attached document provides a concise summary of the revised proposal.`
      }[level];
      const wrongs = [
        `Hey, do the ${c.thing} soon, okay?`,
        `This ${c.thing} thing needs fixing fast.`,
        `Just send stuff when you can.`
      ];
      return sentenceChoice(`Which sentence is best for a formal message about the ${c.thing}?`, formal, wrongs, `register:${level}:${i}`);
    }

    function hedgingItem(level, i) {
      const c = row(i);
      const careful = {
        A1: `This answer about the ${c.thing} may be correct.`,
        A2: `The new ${c.thing} may help some students.`,
        B1: `The survey about the ${c.thing} suggests that reminders may improve attendance.`,
        B2: `The data about the ${c.thing} indicate that clearer forms may reduce errors.`,
        C1: `The results for the ${c.thing} suggest a possible relationship between practice and performance.`,
        C2: `The available evidence about the ${c.thing} is consistent with, but does not prove, a modest training effect.`
      }[level];
      const wrongs = [
        `This proves that every student will improve.`,
        `No other factor matters at all.`,
        `The result is certainly true in every situation.`
      ];
      return sentenceChoice("Which sentence is careful and not too strong?", careful, wrongs, `hedging:${level}:${i}`);
    }

    function discourseItem(level, i) {
      const c = row(i);
      const good = {
        A1: `This sentence gives an example about the ${c.thing}.`,
        A2: `This sentence explains the reason for the ${c.thing} change.`,
        B1: `One limitation is that only a few ${pick(["students", "workers", "visitors", "parents", "applicants"], i)} at the ${c.place} answered the survey.`,
        B2: `The paragraph compares the advantages and disadvantages of the ${c.thing}.`,
        C1: `The final sentence qualifies the claim about the ${c.thing} by noting a possible exception.`,
        C2: `The paragraph reframes the objection about the ${c.thing} as a question about evidence rather than intention.`
      }[level];
      const wrongs = [
        `This sentence proves that the study is perfect.`,
        `This sentence says the topic is not worth discussing.`,
        `This sentence removes every possible uncertainty.`
      ];
      return sentenceChoice("Which sentence best describes the purpose?", fill(good, c), wrongs, `discourse:${level}:${i}`);
    }

    function vocabulary(topic, level, i) {
      if (vocabEntries[topic]) return vocabMeaning(topic, level, i);
      if (topic === "Collocations") return collocationItem(level, i);
      if (topic === "Phrasal verbs") return phrasalItem(level, i);
      if (topic === "Word forms") return wordFormItem(level, i);
      if (topic === "Transitions") return transitionItem(level, i);
      if (topic === "Register") return registerItem(level, i);
      if (topic === "Hedging and precision") return hedgingItem(level, i);
      if (topic === "Discourse function") return discourseItem(level, i);
      throw new Error(`Missing vocabulary maker: ${topic}`);
    }

    return topics.flatMap(([category, subcategory]) => levels.map((level) => ({
      code: `coverage-${slug(subcategory)}-${level.toLowerCase()}`,
      category,
      subcategory,
      difficulty: levelDifficulty[level],
      level,
      perCell,
      make(index) {
        return category === "Grammar" ? grammar(subcategory, level, index) : vocabulary(subcategory, level, index);
      }
    })));
  };
}());
