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

    function ensurePeriod(text) {
      return /[.!?]$/.test(text) ? text : `${text}.`;
    }

    function articleFor(noun) {
      return /^[aeiou]|^hour\b/i.test(noun) ? `an ${noun}` : `a ${noun}`;
    }

    function completedSentence(text, answer) {
      return text.includes("___") ? text.replace("___", answer) : answer;
    }

    function rationales(options, answer, correctReason, wrongReason) {
      return options.reduce((messages, option) => {
        messages[option] = option === answer ? correctReason : wrongReason(option);
        return messages;
      }, {});
    }

    function makeItem(text, options, answer, focusKey = "", setup = "", metadata = {}) {
      return item(text, options, answer, focusKey, setup, { ...metadata, qaStatus: "draft" });
    }

    function chooseByLevel(level, sets, index) {
      return individualizeBlankChoice(pick(sets[level], index), level, index);
    }

    const surfaceLeads = {
      A1: [
        "Today",
        "At school",
        "In class",
        "This morning",
        "At home",
        "After lunch",
        "Before class",
        "At the door",
        "In the shop",
        "At the cafe",
        "On Monday",
        "In the lesson",
        "At the park",
        "On the bus",
        "In the kitchen",
        "After school",
        "At the desk",
        "Before dinner",
        "In the hallway",
        "At the window"
      ],
      A2: [
        "Before the lesson",
        "In a short message",
        "At the front desk",
        "After the phone call",
        "During the morning class",
        "On the notice board",
        "At the train station",
        "In the school office",
        "Before the interview",
        "After the break",
        "During the workshop",
        "On the registration form",
        "At the language center",
        "In the travel plan",
        "Before the weekend",
        "After the teacher's reminder",
        "During the pair exercise",
        "On the class website",
        "At the reception desk",
        "In the final exercise"
      ],
      B1: [
        "During the staff meeting",
        "In the course update",
        "Before the deadline",
        "After the schedule changed",
        "In the training session",
        "On the application form",
        "During the client call",
        "In the weekly report",
        "Before the office opened",
        "After the survey ended",
        "In the project notes",
        "During the safety briefing",
        "On the department website",
        "After the teacher's explanation",
        "In the planning email",
        "Before the documents were filed",
        "During the review meeting",
        "In the student handbook",
        "After the reminder was sent",
        "On the checklist"
      ],
      B2: [
        "In the manager's summary",
        "During the policy review",
        "After the first draft",
        "Before the audit began",
        "In the survey report",
        "During the budget meeting",
        "On the revised form",
        "After the complaint was reviewed",
        "Before the results were shared",
        "In the staff memo",
        "During the hiring process",
        "On the training portal",
        "After the data check",
        "Before the contract was signed",
        "In the customer update",
        "During the planning call",
        "On the project dashboard",
        "After the instructions changed",
        "Before the board discussion",
        "In the final schedule"
      ],
      C1: [
        "In the research note",
        "During the committee review",
        "After the preliminary analysis",
        "Before the policy was finalized",
        "In the methodology section",
        "During the stakeholder meeting",
        "On the revised proposal",
        "After the evidence was compared",
        "Before the recommendation was issued",
        "In the executive summary",
        "During the compliance review",
        "On the evaluation form",
        "After the pilot program ended",
        "Before the findings were published",
        "In the grant application",
        "During the seminar",
        "On the risk assessment",
        "After the interviews were coded",
        "Before the final vote",
        "In the appendix"
      ],
      C2: [
        "In the peer reviewer's response",
        "During the legal analysis",
        "After the longitudinal data were examined",
        "Before the theoretical claim was accepted",
        "In the policy addendum",
        "During the methodological critique",
        "On the arbitration record",
        "After the counterargument was addressed",
        "Before the findings were generalized",
        "In the final adjudication",
        "During the ethics review",
        "On the fiduciary briefing",
        "After the statistical model was revised",
        "Before the precedent was cited",
        "In the interpretive framework",
        "During the evidentiary hearing",
        "On the technical memorandum",
        "After the objections were synthesized",
        "Before the caveat was removed",
        "In the published corrigendum"
      ]
    };

    const questionLeads = {
      A1: [
        "Excuse me",
        "At school",
        "In class",
        "This morning",
        "At the desk",
        "Before class",
        "At the door",
        "In the shop",
        "At the cafe",
        "On the bus",
        "At the park",
        "In the hallway",
        "After lunch",
        "At home",
        "In the lesson",
        "At the window",
        "Before dinner",
        "After school",
        "Today",
        "At the front"
      ],
      A2: [
        "Excuse me",
        "At reception",
        "Before the lesson",
        "In the school office",
        "At the train station",
        "During registration",
        "After the phone call",
        "On the class website",
        "At the language center",
        "Before the interview",
        "After the break",
        "During the workshop",
        "At the front desk",
        "In the final exercise",
        "Before the weekend",
        "After the reminder",
        "During the pair exercise",
        "At the office door",
        "In the travel plan",
        "On Monday"
      ],
      B1: [
        "During the meeting",
        "In the update",
        "Before the deadline",
        "After the schedule changed",
        "In the training session",
        "On the application form",
        "During the client call",
        "In the weekly report",
        "Before the office opened",
        "After the survey ended",
        "In the project notes",
        "During the safety briefing",
        "On the department website",
        "After the explanation",
        "In the planning email",
        "Before filing the documents",
        "During the review",
        "In the handbook",
        "After the reminder",
        "On the checklist"
      ],
      B2: [
        "In the manager's summary",
        "During the review",
        "After the first draft",
        "Before the audit",
        "In the survey report",
        "During the budget meeting",
        "On the revised form",
        "After the complaint review",
        "Before sharing the results",
        "In the staff memo",
        "During the hiring process",
        "On the training portal",
        "After the data check",
        "Before signing the contract",
        "In the customer update",
        "During the planning call",
        "On the dashboard",
        "After the instructions changed",
        "Before the board discussion",
        "In the final schedule"
      ],
      C1: [
        "In the research note",
        "During the committee review",
        "After the preliminary analysis",
        "Before finalizing the policy",
        "In the methodology section",
        "During the stakeholder meeting",
        "On the revised proposal",
        "After comparing the evidence",
        "Before issuing the recommendation",
        "In the executive summary",
        "During the compliance review",
        "On the evaluation form",
        "After the pilot program",
        "Before publishing the findings",
        "In the grant application",
        "During the seminar",
        "On the risk assessment",
        "After coding the interviews",
        "Before the final vote",
        "In the appendix"
      ],
      C2: [
        "In the reviewer's response",
        "During the legal analysis",
        "After examining the longitudinal data",
        "Before accepting the theoretical claim",
        "In the policy addendum",
        "During the methodological critique",
        "On the arbitration record",
        "After addressing the counterargument",
        "Before generalizing the findings",
        "In the final adjudication",
        "During the ethics review",
        "On the fiduciary briefing",
        "After revising the model",
        "Before citing the precedent",
        "In the interpretive framework",
        "During the evidentiary hearing",
        "On the technical memorandum",
        "After synthesizing the objections",
        "Before removing the caveat",
        "In the published corrigendum"
      ]
    };

    function lowerAfterLead(text) {
      if (/^(I|I'm|I'll|I'd)\b/.test(text)) return text;
      if (people.some((name) => new RegExp(`^${name}(?:\\b|'s\\b)`).test(text))) return text;
      if (/^(Maya|Ben|Nora|Kai|Tom|Aya|Sam)(?:\b|'s\b)/.test(text)) return text;
      return lowerFirst(text);
    }

    function addSurfaceLead(text, level, index, leads = surfaceLeads) {
      if (!text || text.includes(": \"")) return text;
      const c = row(index);
      const sentence = ensurePeriod(text);
      const lower = lowerAfterLead(sentence);
      const lead = pick(leads[level] || surfaceLeads.A2, index);
      return [
        `${lead}, ${lower}`,
        `The ${c.place} note says, "${sentence}"`,
        `${c.other}'s worksheet says, "${sentence}"`,
        `For the ${c.place} staff, ${lower}`,
        `A practice card for the ${c.place} says, "${sentence}"`,
        `In a message to ${c.team}, ${lower}`,
        `The first line of the ${c.thing} says, "${sentence}"`,
        `${c.person}'s reminder reads, "${sentence}"`,
        `On the ${c.place} board, ${lower}`,
        `During a short review, ${lower}`,
        `The example in the ${c.thing2} is: "${sentence}"`,
        `For tomorrow's lesson, ${lower}`,
        `A note beside the ${c.otherPlace} says, "${sentence}"`,
        `${c.other} copied this sentence: "${sentence}"`,
        `In the practice text, ${lower}`,
        `The instruction on the ${c.thing} reads, "${sentence}"`,
        `For the final question, ${lower}`,
        `A message from ${c.person} says, "${sentence}"`,
        `The classroom example is: "${sentence}"`,
        `On the review screen, ${lower}`
      ][index % 20];
    }

    function addPromptLead(text, level, index) {
      if (!text) return text;
      return `${pick(surfaceLeads[level] || surfaceLeads.A2, index)}, ${lowerAfterLead(text)}`;
    }

    function individualizeBlankChoice(choice, level, index) {
      if (!Array.isArray(choice) || typeof choice[0] !== "string" || !choice[0].includes("___")) return choice;
      return [addSurfaceLead(choice[0], level, index), choice[1], choice[2], choice[3]];
    }

    function levelIndexFromFocusKey(focusKey) {
      const match = String(focusKey || "").match(/:([ABC][12]):(\d+)$/i);
      if (!match) return null;
      return { level: match[1].toUpperCase(), index: Number(match[2]) };
    }

    function sentenceChoice(prompt, correct, wrongs, focusKey = "") {
      const position = levelIndexFromFocusKey(focusKey);
      if (!position || /bespoke/i.test(focusKey)) return makeItem(prompt, [correct, ...wrongs], correct, focusKey);
      const leads = /^question:/i.test(focusKey) ? questionLeads : surfaceLeads;
      const options = [correct, ...wrongs].map((option) => addSurfaceLead(option, position.level, position.index, leads));
      return makeItem(prompt, options, options[0], focusKey);
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
          [`If ${c.person} ___ ${object} today, ${c.team} will use it tomorrow.`, [s, base, `will ${base}`, `has ${pp}`], s]
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
        A1: [
          [`Please bring ___ ${noun} to class.`, [article, article === "a" ? "an" : "a", "many", "(nothing)"], article],
          [`I need ___ pencil for the test.`, ["a", "an", "many", "(nothing)"], "a"],
          [`The office gave me ___ address card.`, ["an", "a", "many", "(nothing)"], "an"],
          [`___ teacher is waiting by the door.`, ["The", "A", "An", "(nothing)"], "The"],
          [`We have ___ water on the table.`, ["(nothing)", "a", "an", "many"], "(nothing)"]
        ],
        A2: [
          [`${c.person} bought ${articleFor(c.thing)} yesterday. ___ ${c.thing} is on the desk.`, ["The", "A", "An", "(nothing)"], "The"],
          [`Please upload ___ application before Friday.`, ["an", "a", "many", "(nothing)"], "an"],
          [`The office needs ___ new printer for the front desk.`, ["a", "an", "many", "(nothing)"], "a"],
          [`___ training starts at nine tomorrow.`, ["(nothing)", "A", "An", "The"], "(nothing)"],
          [`${c.person} left ___ umbrella near the window.`, ["an", "a", "many", "(nothing)"], "an"]
        ],
        B1: [
          [`___ ${c.plural} can help new students understand the course.`, ["(nothing)", "A", "An", "Much"], "(nothing)"],
          [`The tutor gave ___ useful explanation before the quiz.`, ["a", "an", "many", "(nothing)"], "a"],
          [`${c.person} sent ___ email about the schedule change.`, ["an", "a", "many", "(nothing)"], "an"],
          [`___ information in this file is confidential.`, ["The", "A", "An", "(nothing)"], "The"],
          [`The office requested ___ additional evidence before approving the form.`, ["(nothing)", "an", "a", "the"], "(nothing)"]
        ],
        B2: [
          [`This is ___ most useful ${c.thing} in the office.`, ["the", "a", "an", "(nothing)"], "the"],
          [`${c.person} made ___ unusually careful comparison of the two schedules.`, ["an", "a", "many", "(nothing)"], "an"],
          [`The committee needs ___ clearer policy before the program expands.`, ["a", "an", "many", "(nothing)"], "a"],
          [`___ privacy is a concern whenever records are shared.`, ["(nothing)", "A", "An", "The"], "(nothing)"],
          [`The newer form includes ___ option that the old form did not offer.`, ["an", "a", "many", "(nothing)"], "an"]
        ],
        C1: [
          [`${c.person} studies ___ public policy at night.`, ["(nothing)", "the", "a", "an"], "(nothing)"],
          [`The review describes ___ most serious limitation in the original design.`, ["the", "a", "an", "(nothing)"], "the"],
          [`The author gives ___ unusually cautious interpretation of the data.`, ["an", "a", "many", "(nothing)"], "an"],
          [`The department adopted ___ more transparent procedure after the audit.`, ["a", "an", "many", "(nothing)"], "a"],
          [`___ evidence from two earlier studies supports the claim.`, ["(nothing)", "The", "A", "An"], "(nothing)"]
        ],
        C2: [
          [`The report on the ${c.thing} examines ___ role of ${pick(abstractNouns, i)} in ${pick(abstractNouns, i, 3)}.`, ["the", "a", "an", "(nothing)"], "the"],
          [`The appendix offers ___ empirical account of the policy's effect.`, ["an", "a", "many", "(nothing)"], "an"],
          [`The board requested ___ narrower definition before approving the clause.`, ["a", "an", "many", "(nothing)"], "a"],
          [`___ causation cannot be inferred from these figures alone.`, ["(nothing)", "The", "A", "An"], "(nothing)"],
          [`The dissent relies on ___ precedent cited in the earlier ruling.`, ["the", "a", "an", "(nothing)"], "the"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function prepositions(level, i) {
      const c = row(i);
      if (level === "A2" && i === 0) {
        return makeItem(addSurfaceLead("The trip will take about one hour ___ train.", level, i), ["by", "on", "in", "at"], "by");
      }
      const timePrepositionItems = [
        [`The class starts ___ Monday.`, "on"],
        [`The workshop begins ___ Tuesday.`, "on"],
        [`The office opens ___ Friday.`, "on"],
        [`The test is ___ Wednesday.`, "on"],
        [`The meeting is ___ Thursday.`, "on"],
        [`The class starts ___ June.`, "in"],
        [`The course begins ___ September.`, "in"],
        [`The garden opens ___ spring.`, "in"],
        [`The office is busy ___ the morning.`, "in"],
        [`The lesson starts ___ the afternoon.`, "in"],
        [`The meeting starts ___ noon.`, "at"],
        [`The train leaves ___ 3 p.m.`, "at"],
        [`The office opens ___ 9 a.m.`, "at"],
        [`The class begins ___ midnight.`, "at"],
        [`The interview starts ___ lunchtime.`, "at"],
        [`Please finish the ${c.thing} ___ Friday.`, "by"],
        [`Send the ${c.thing2} ___ noon.`, "by"],
        [`Return the ${c.thing} ___ 3 p.m.`, "by"],
        [`Complete the ${c.thing2} ___ Monday.`, "by"],
        [`Bring the ${c.thing} ___ the end of the day.`, "by"]
      ];
      const [timeText, timeAnswer] = pick(timePrepositionItems, i);
      const sets = {
        A1: [[timeText, ["on", "in", "at", "by"], timeAnswer]],
        A2: [
          [`${c.person} left the ${c.place} and walked ___ the ${c.otherPlace}.`, ["to", "at", "in", "on"], "to"],
          [`The new notice is ___ the classroom wall.`, ["on", "in", "to", "by"], "on"],
          [`The receipt is ___ the folder.`, ["in", "on", "at", "to"], "in"],
          [`Please wait ___ the front desk.`, ["at", "in", "to", "on"], "at"],
          [`The trip will take about one hour ___ train.`, ["by", "on", "in", "at"], "by"]
        ],
        B1: [
          [`${c.person} is responsible ___ checking the ${c.thing}.`, ["for", "to", "at", "with"], "for"],
          [`The students are interested ___ joining the evening class.`, ["in", "on", "at", "to"], "in"],
          [`The manager was worried ___ the missing ${c.thing}.`, ["about", "for", "to", "with"], "about"],
          [`${c.person} is good ___ explaining the rule clearly.`, ["at", "in", "for", "to"], "at"],
          [`This form is similar ___ the one we used last year.`, ["to", "with", "for", "at"], "to"]
        ],
        B2: [
          [`There was a sharp increase ___ ${c.plural} this month.`, ["in", "on", "at", "for"], "in"],
          [`The complaint was related ___ the new registration system.`, ["to", "with", "for", "about"], "to"],
          [`The team is familiar ___ the updated procedure.`, ["with", "to", "for", "at"], "with"],
          [`The manager objected ___ changing the deadline again.`, ["to", "for", "with", "about"], "to"],
          [`The decision depends ___ whether the records are complete.`, ["on", "in", "at", "with"], "on"]
        ],
        C1: [
          [`The decision about the ${c.thing} was made ___ response to student feedback.`, ["in", "on", "at", "by"], "in"],
          [`The distinction ___ policy and practice matters here.`, ["between", "among", "with", "for"], "between"],
          [`The committee placed new emphasis ___ privacy protections.`, ["on", "in", "at", "to"], "on"],
          [`The report gives staff access ___ the revised records.`, ["to", "for", "with", "at"], "to"],
          [`The objection was based ___ a narrow reading of the rule.`, ["on", "in", "with", "for"], "on"]
        ],
        C2: [
          [`The proposal about the ${c.thing} is consistent ___ the school's published policy.`, ["with", "to", "for", "at"], "with"],
          [`Approval is contingent ___ the committee's final review.`, ["on", "with", "to", "for"], "on"],
          [`The rule applies irrespective ___ whether the applicant appeals.`, ["of", "to", "with", "for"], "of"],
          [`This objection is analogous ___ the concern raised in the earlier case.`, ["to", "with", "for", "about"], "to"],
          [`The records were released ___ accordance with the court order.`, ["in", "on", "by", "at"], "in"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function countNouns(level, i) {
      const c = row(i);
      const noncount = pick(["information", "advice", "homework", "equipment", "traffic", "research", "evidence", "feedback", "furniture", "money"], i);
      const pieceNoun = pick(["advice", "evidence", "equipment", "furniture", "information", "research"], i);
      const sets = {
        A1: [
          [`There are ___ ${c.plural} on the table.`, ["two", "much", "a", "an"], "two"],
          [`I need ___ water after class.`, ["some", "many", "a", "an"], "some"],
          [`___ students are waiting by the door.`, ["Many", "Much", "A little", "An"], "Many"],
          [`The room has ___ chairs for the group.`, ["enough", "much", "an", "a"], "enough"],
          [`There is ___ rice in the bowl.`, ["a little", "many", "several", "an"], "a little"]
        ],
        A2: [
          [`${c.person} needs ___ ${noncount} before Friday.`, ["some", "many", "several", "an"], "some"],
          [`The office received ___ complaints after the schedule changed.`, ["many", "much", "a little", "an"], "many"],
          [`The teacher gave us ___ advice before the test.`, ["a little", "many", "several", "an"], "a little"],
          [`There are ___ application forms near the printer.`, ["several", "much", "a little", "an"], "several"],
          [`Only ___ money remains in the class fund.`, ["a little", "a few", "many", "several"], "a little"]
        ],
        B1: [
          [`The office added three ___ of ${pieceNoun} to the file about the ${c.thing}.`, ["pieces", "piece", "many", "much"], "pieces"],
          [`There was too ___ traffic for the bus to arrive on time.`, ["much", "many", "several", "a few"], "much"],
          [`Several ___ were missing from the application packet.`, ["documents", "equipment", "advice", "research"], "documents"],
          [`The report includes a great ___ of useful information.`, ["deal", "number", "few", "many"], "deal"],
          [`Only a small ___ of feedback mentioned the new schedule.`, ["amount", "number", "many", "few"], "amount"]
        ],
        B2: [
          [`Only ___ ${pick(["students", "workers", "visitors", "parents", "applicants"], i)} at the ${c.place} understood the final question.`, ["a few", "a little", "much", "an"], "a few"],
          [`The survey collected ___ data to support a cautious conclusion.`, ["enough", "many", "several", "few"], "enough"],
          [`Very ___ evidence was available before the policy changed.`, ["little", "few", "many", "several"], "little"],
          [`A large ___ of the complaints concerned the same form.`, ["number", "amount", "many", "much"], "number"],
          [`The committee had only a limited ___ of time for review.`, ["amount", "number", "few", "several"], "amount"]
        ],
        C1: [
          [`The report about the ${c.thing} provides ___ evidence to support the decision.`, ["little", "few", "many", "several"], "little"],
          [`The interviews produced a considerable ___ of qualitative data.`, ["amount", "number", "few", "several"], "amount"],
          [`Few ___ in the sample came from evening classes.`, ["respondents", "research", "equipment", "feedback"], "respondents"],
          [`The article cites numerous ___ from earlier studies.`, ["examples", "evidence", "advice", "research"], "examples"],
          [`The reviewer found insufficient ___ for the strongest claim.`, ["support", "examples", "respondents", "records"], "support"]
        ],
        C2: [
          [`The committee requested ___ additional research before changing the ${c.thing}.`, ["further", "many", "several", "a few"], "further"],
          [`The archive contains scant ___ for that interpretation.`, ["evidence", "examples", "documents", "respondents"], "evidence"],
          [`The analysis depends on several untested ___.`, ["assumptions", "research", "advice", "equipment"], "assumptions"],
          [`The dissent gives little ___ to the procedural objection.`, ["weight", "examples", "respondents", "documents"], "weight"],
          [`The model incorporates a large ___ of longitudinal data.`, ["amount", "number", "few", "several"], "amount"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function subjectVerb(level, i) {
      const c = row(i);
      const singular = c.thing;
      const plural = c.plural;
      const sets = {
        A1: [
          [`${c.person} works at the ${c.place}.`, `${c.person} work at the ${c.place}.`, `${c.person} working at the ${c.place}.`, `${c.person} are work at the ${c.place}.`],
          [`The bus stops near the ${c.place}.`, `The bus stop near the ${c.place}.`, `The bus stopping near the ${c.place}.`, `The bus are stops near the ${c.place}.`],
          [`Two students are in the ${c.place}.`, `Two students is in the ${c.place}.`, `Two students be in the ${c.place}.`, `Two students has in the ${c.place}.`],
          [`The ${singular} is on the desk.`, `The ${singular} are on the desk.`, `The ${singular} be on the desk.`, `The ${singular} have on the desk.`],
          [`My teachers help every morning.`, `My teachers helps every morning.`, `My teachers helping every morning.`, `My teachers is help every morning.`]
        ],
        A2: [
          [`There are three ${plural} on the desk.`, `There is three ${plural} on the desk.`, `There has three ${plural} on the desk.`, `There are a ${plural} on the desk.`],
          [`One ${singular} was missing after class.`, `One ${singular} were missing after class.`, `One ${singular} be missing after class.`, `One ${singular} have missing after class.`],
          [`The students have new notebooks.`, `The students has new notebooks.`, `The students having new notebooks.`, `The students is have new notebooks.`],
          [`Each teacher checks the attendance sheet.`, `Each teacher check the attendance sheet.`, `Each teacher checking the attendance sheet.`, `Each teacher are checks the attendance sheet.`],
          [`Several visitors were waiting outside.`, `Several visitors was waiting outside.`, `Several visitors waits outside.`, `Several visitors has waiting outside.`]
        ],
        B1: [
          [`Each ${singular} has a number at the top.`, `Each ${singular} have a number at the top.`, `Each ${singular} having a number at the top.`, `Each ${singular} are have a number at the top.`],
          [`Everyone in the ${c.place} needs a visitor badge.`, `Everyone in the ${c.place} need a visitor badge.`, `Everyone in the ${c.place} needing a visitor badge.`, `Everyone in the ${c.place} are need a visitor badge.`],
          [`The number of late applications has increased.`, `The number of late applications have increased.`, `The number of late applications are increased.`, `The number of late applications increasing.`],
          [`One of the ${plural} is missing from the folder.`, `One of the ${plural} are missing from the folder.`, `One of the ${plural} be missing from the folder.`, `One of the ${plural} have missing from the folder.`],
          [`Both answers explain the rule clearly.`, `Both answers explains the rule clearly.`, `Both answers explaining the rule clearly.`, `Both answers is explain the rule clearly.`]
        ],
        B2: [
          [`The list of ${plural} is available for review.`, `The list of ${plural} are available for review.`, `The list of ${plural} have available for review.`, `The list of ${plural} were prepares for review.`],
          [`A group of visitors was waiting near the entrance.`, `A group of visitors were waiting near the entrance.`, `A group of visitors be waiting near the entrance.`, `A group of visitors have waiting near the entrance.`],
          [`Neither of the two answers explains the rule.`, `Neither of the two answers explain the rule.`, `Neither of the two answers explaining the rule.`, `Neither of the two answers are explain the rule.`],
          [`The data from the survey show a small increase.`, `The data from the survey shows a small increase.`, `The data from the survey is show a small increase.`, `The data from the survey showing a small increase.`],
          [`The manager, along with two assistants, has signed the report.`, `The manager, along with two assistants, have signed the report.`, `The manager, along with two assistants, are signed the report.`, `The manager, along with two assistants, signing the report.`]
        ],
        C1: [
          [`Neither the ${plural} nor the ${singular} was available for review.`, `Neither the ${plural} nor the ${singular} were available for review.`, `Neither the ${plural} nor the ${singular} have available for review.`, `Neither the ${plural} nor the ${singular} being available for review.`],
          [`A series of clerical errors has delayed the decision.`, `A series of clerical errors have delayed the decision.`, `A series of clerical errors are delayed the decision.`, `A series of clerical errors delaying the decision.`],
          [`What matters most is the accuracy of the final ${plural}.`, `What matters most are the accuracy of the final ${plural}.`, `What matter most is the accuracy of the final ${plural}.`, `What matters most being the accuracy of the final ${plural}.`],
          [`The findings in the appendix support the recommendation.`, `The findings in the appendix supports the recommendation.`, `The findings in the appendix is supporting the recommendation.`, `The findings in the appendix has support the recommendation.`],
          [`Not only the reviewers but also the editor was concerned about the change.`, `Not only the reviewers but also the editor were concerned about the change.`, `Not only the reviewers but also the editor have concerned about the change.`, `Not only the reviewers but also the editor being concerned about the change.`]
        ],
        C2: [
          [`What matters most is the accuracy of the final ${plural}.`, `What matters most are the accuracy of the final ${plural}.`, `What matter most is the accuracy of the final ${plural}.`, `What matters most being the accuracy of the final ${plural}.`],
          [`The validity of the conclusions depends on the sampling method.`, `The validity of the conclusions depend on the sampling method.`, `The validity of the conclusions are depend on the sampling method.`, `The validity of the conclusions depending on the sampling method.`],
          [`Neither the absence of signatures nor the delay justifies rejecting the appeal.`, `Neither the absence of signatures nor the delay justify rejecting the appeal.`, `Neither the absence of signatures nor the delay are justify rejecting the appeal.`, `Neither the absence of signatures nor the delay justifying rejecting the appeal.`],
          [`A range of objections has been raised by the reviewers.`, `A range of objections have been raised by the reviewers.`, `A range of objections are been raised by the reviewers.`, `A range of objections being raised by the reviewers.`],
          [`The evidence, together with the interview notes, suggests a narrower conclusion.`, `The evidence, together with the interview notes, suggest a narrower conclusion.`, `The evidence, together with the interview notes, are suggesting a narrower conclusion.`, `The evidence, together with the interview notes, have suggests a narrower conclusion.`]
        ]
      };
      const set = pick(sets[level], i);
      return sentenceChoice("Choose the sentence with correct grammar.", set[0], set.slice(1), `subject-verb:${level}:${i}`);
    }

    function modals(level, i) {
      const c = row(i);
      const sets = {
        A1: [
          [`${c.team} ___ bring a pencil to class.`, ["must", "must to", "musted", "musting"], "must"],
          [`${c.person} ___ swim across the pool.`, ["can", "can to", "cans", "is can"], "can"],
          [`It ___ rain later, so bring a coat.`, ["may", "may to", "mays", "is may"], "may"],
          [`The bus ___ arrive at noon.`, ["will", "will to", "wills", "is will"], "will"],
          [`Students ___ talk during the test.`, ["must not", "must not to", "musted not", "do must not"], "must not"]
        ],
        A2: [
          [`For better results, ${c.person} ___ check the ${c.thing} again.`, ["should", "must", "might", "can"], "should"],
          [`The notice says visitors ___ show ID at the entrance.`, ["must", "might", "would", "used to"], "must"],
          [`${c.person} ___ be late; the train was delayed.`, ["might", "should", "must", "can"], "might"],
          [`You ___ borrow a dictionary during the lesson.`, ["can", "should", "might", "would"], "can"],
          [`The office ___ close early tomorrow because of the storm.`, ["may", "must", "should", "can"], "may"]
        ],
        B1: [
          [`${c.team} ___ wear badges inside the building.`, ["have to", "have", "must to", "are must"], "have to"],
          [`Before the online form, applicants ___ mail every document.`, ["used to", "use to", "were use to", "are used"], "used to"],
          [`${c.person} ___ call the office before changing the appointment.`, ["had better", "had better to", "had to better", "better had"], "had better"],
          [`The new clerk ___ answer most questions without help.`, ["is able to", "is able", "can to", "able to"], "is able to"],
          [`The form ___ be signed before it is accepted.`, ["has to", "has", "must to", "is have to"], "has to"]
        ],
        B2: [
          [`I am not sure, but ${c.person} ___ have left the file at home; it is not in the bag.`, ["may", "must", "should", "would"], "may"],
          [`The lights are off, so the office ___ have closed early.`, ["must", "should", "would", "can"], "must"],
          [`The answer is unclear; the student ___ have misunderstood the instructions.`, ["might", "must", "should", "will"], "might"],
          [`The policy is optional, so staff ___ wear the badge outside the lab.`, ["need not", "must not", "should not", "would not"], "need not"],
          [`The file arrived late, but the team ___ still finish the review today.`, ["could", "must", "used to", "should have"], "could"]
        ],
        C1: [
          [`${c.person} ___ rather finish the ${c.thing} before lunch than rush through it later.`, ["would", "will", "should", "must"], "would"],
          [`The committee ___ well reject the proposal if the evidence remains weak.`, ["may", "must", "should", "would"], "may"],
          [`The applicant ___ have to submit a second form if the address changes.`, ["might", "must", "will", "would rather"], "might"],
          [`The report ___ not be circulated until the names are removed.`, ["should", "would rather", "used to", "is able to"], "should"],
          [`The reviewer ___ have overlooked the appendix, given the comment on page two.`, ["could", "must", "will", "has to"], "could"]
        ],
        C2: [
          [`${c.person} ___ have submitted the form earlier; the late file delayed the review.`, ["should", "must", "might", "would"], "should"],
          [`The board ___ have anticipated the objection, since the same issue arose last year.`, ["could", "will", "can", "is to"], "could"],
          [`The clause ___ be interpreted narrowly if the precedent applies.`, ["may", "must to", "used to", "would rather"], "may"],
          [`The dissent ___ have persuaded the court if stronger evidence had been available.`, ["might", "must", "will", "can"], "might"],
          [`The agency ___ not have disclosed the records without consent.`, ["should", "would", "can", "used to"], "should"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function comparativeForm(adjective) {
      if (adjective === "good") return "better";
      if (adjective === "bad") return "worse";
      if (adjective === "far") return "farther";
      if (["careful", "helpful", "useful", "formal", "regular", "honest", "practical", "reliable", "complete"].includes(adjective)) return `more ${adjective}`;
      if (adjective.endsWith("y")) return `${adjective.slice(0, -1)}ier`;
      if (adjective.endsWith("e")) return `${adjective}r`;
      return `${adjective}er`;
    }

    function adjectiveNounForm(adjective) {
      return {
        clear: "clarity",
        quick: "quickness",
        quiet: "quietness",
        careful: "carefulness",
        helpful: "helpfulness",
        simple: "simplicity",
        polite: "politeness",
        accurate: "accuracy",
        safe: "safety",
        useful: "usefulness",
        formal: "formality",
        regular: "regularity",
        calm: "calmness",
        honest: "honesty",
        steady: "steadiness",
        brief: "brevity",
        direct: "directness",
        practical: "practicality",
        reliable: "reliability",
        complete: "completeness"
      }[adjective] || `${adjective}ness`;
    }

    function comparatives(level, i) {
      const c = row(i);
      const adj = pick(["small", "large", "quick", "slow", "cheap", "warm", "clear", "bright", "long", "short", "safe", "easy", "quiet", "busy", "new", "old", "strong", "weak", "close", "far"], i);
      const comp = comparativeForm(adj);
      const sets = {
        A1: [[`This ${c.thing} is ___ than that one.`, [comp, adj, `most ${adj}`, `very ${comp}`], comp]],
        A2: [
          [`The new ${c.place} is ___ the old one.`, [`bigger than`, `big than`, `more big than`, `biggest than`], "bigger than"],
          [`This route is ___ than the route on the map.`, ["shorter", "short", "most short", "very shorter"], "shorter"],
          [`The second room is ___ than the first room.`, ["quieter", "quiet", "most quiet", "more quietest"], "quieter"],
          [`The online form is ___ than the paper form.`, ["easier", "easy", "most easy", "more easier"], "easier"],
          [`The morning train is ___ than the evening train.`, ["faster", "fast", "most fast", "more faster"], "faster"]
        ],
        B1: [[`${c.person}'s answer was much ___ than the first answer.`, [comp, `very ${comp}`, `more ${comp}`, adj], comp]],
        B2: [
          [`This is ___ useful ${c.thing} in the folder.`, ["the most", "most than", "more than", "the more"], "the most"],
          [`The revised chart is ___ clear than the first version.`, ["far more", "far most", "more far", "most far"], "far more"],
          [`Of the three schedules, the afternoon option is ___.`, ["the least expensive", "least than expensive", "less expensive", "the less expensive"], "the least expensive"],
          [`The new instructions are ___ easier to follow than the old ones.`, ["slightly", "slight", "slightest", "more slightly"], "slightly"],
          [`No other form in the packet is ___ this one.`, ["as confusing as", "as confusing than", "so confusing than", "more confusing as"], "as confusing as"]
        ],
        C1: [
          [`The revised ${c.thing} is no ___ ${adj} than the original one.`, ["less", "least", "lesser", "little"], "less"],
          [`The second proposal is ___ preferable to the first because it protects privacy.`, ["clearly", "clear", "clearest", "clarity"], "clearly"],
          [`The new policy is not ___ as flexible as the draft version.`, ["nearly", "near", "nearest", "nearness"], "nearly"],
          [`This explanation is the ___ of the two available summaries.`, ["more convincing", "most convincing", "convincing than", "more convinced"], "more convincing"],
          [`The final model is marginally ___ robust than the earlier model.`, ["more", "most", "much", "many"], "more"]
        ],
        C2: [
          [`The second explanation about the ${c.thing} is all the more ___ because it includes real examples.`, ["persuasive", "persuading", "persuaded", "persuasion"], "persuasive"],
          [`The objection becomes all the less ___ once the missing data are included.`, ["compelling", "compel", "compelled", "compellingly"], "compelling"],
          [`The precedent is no more ___ here than it was in the earlier appeal.`, ["decisive", "decisively", "decision", "decide"], "decisive"],
          [`The narrower interpretation is by far the ___ defensible option.`, ["most", "more", "much", "many"], "most"],
          [`The minority report is none the ___ for acknowledging the strongest objection.`, ["weaker", "weak", "weakest", "weakly"], "weaker"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function connectors(level, i) {
      const c = row(i);
      const sets = {
        A1: [
          [`${c.person} stayed home ___ it was raining.`, ["because", "so", "although", "unless"], "because"],
          [`The room was cold, ___ we closed the window.`, ["so", "because", "but", "unless"], "so"],
          [`${c.person} wanted tea, ___ ${c.other} wanted coffee.`, ["but", "because", "so", "then"], "but"],
          [`The students opened their books ___ read the first page.`, ["and", "because", "but", "so"], "and"],
          [`The students washed their hands, ___ they ate lunch.`, ["then", "because", "but", "unless"], "then"]
        ],
        A2: [
          [`${c.person} was tired, ___ ${c.person} finished the ${c.thing}.`, ["but", "because", "unless", "so that"], "but"],
          [`The office called ___ the form was missing.`, ["because", "although", "unless", "so that"], "because"],
          [`___ the train arrived, the students walked to class.`, ["After", "Because", "Unless", "Therefore"], "After"],
          [`Please read the guide ___ you sign the ${c.thing}.`, ["before", "because", "although", "therefore"], "before"],
          [`The class will meet online ___ the room is closed.`, ["if", "because of", "despite", "therefore"], "if"]
        ],
        B1: [
          [`___ the room was noisy, ${c.team} understood the speaker.`, ["Although", "Because", "Therefore", "Unless"], "Although"],
          [`___ the office calls, the meeting will start at noon.`, ["Unless", "Although", "Therefore", "Despite"], "Unless"],
          [`___ ${c.person} checked the file, ${c.other} answered questions.`, ["While", "Unless", "Therefore", "Despite"], "While"],
          [`___ the form was incomplete, the clerk returned it.`, ["Since", "Although", "Unless", "Nevertheless"], "Since"],
          [`Call the office ___ the new file arrives.`, ["as soon as", "despite", "therefore", "unless"], "as soon as"]
        ],
        B2: [
          [`${c.person} saved the file ___ the computer restarted.`, ["before", "during", "therefore", "despite"], "before"],
          [`The office reopened ___ the repairs were finished.`, ["after", "despite", "therefore", "during"], "after"],
          [`___ the high cost, the school approved the training.`, ["Despite", "Because", "Therefore", "Unless"], "Despite"],
          [`The first plan saves time, ___ the second plan reduces errors.`, ["whereas", "because", "unless", "so that"], "whereas"],
          [`The instructions were rewritten ___ applicants could complete the form more easily.`, ["so that", "because of", "despite", "whereas"], "so that"]
        ],
        C1: [
          [`${c.person} revised the proposal, ___ the main argument remained unchanged.`, ["whereas", "because", "unless", "so that"], "whereas"],
          [`The policy will apply ___ the committee grants an exemption.`, ["unless", "whereas", "therefore", "because of"], "unless"],
          [`The increase may reflect better reminders ___ stronger motivation.`, ["rather than", "provided that", "despite", "therefore"], "rather than"],
          [`The finding is useful ___ the sample represents the full class.`, ["provided that", "whereas", "despite", "therefore"], "provided that"],
          [`The new data support the result, ___ they do not explain its cause.`, ["although", "because of", "therefore", "unless"], "although"]
        ],
        C2: [
          [`The plan for the ${c.thing} is feasible ___ the committee approves the extra funding.`, ["provided that", "despite that", "because of", "therefore"], "provided that"],
          [`The conclusion is defensible ___ the missing cases are treated as nonresponses.`, ["insofar as", "despite", "therefore", "unless of"], "insofar as"],
          [`The files were checked twice ___ any clerical errors remain.`, ["lest", "therefore", "because of", "inasmuch"], "lest"],
          [`___ the narrow sample, the authors avoid broad claims.`, ["Given", "Therefore", "Unless", "Whereas"], "Given"],
          [`The objection matters ___ it challenges the study's central assumption.`, ["inasmuch as", "despite", "therefore", "lest"], "inasmuch as"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function conditionals(level, i) {
      const c = row(i);
      const [base, s, past, pp, ing, object] = c.action;
      const sets = {
        A1: [
          [`If it rains, ${c.person} ___ inside.`, ["will stay", "stays to", "stayed to", "will stayed"], "will stay"],
          [`If the door is open, the students ___ in.`, ["can come", "can comes", "came to", "are come"], "can come"],
          [`If the bell rings, class ___ soon.`, ["will start", "starts to", "started to", "will started"], "will start"],
          [`If ${c.person} is hungry, ${c.person} ___ lunch now.`, ["can eat", "can eats", "ate to", "is eat"], "can eat"],
          [`If the bus is late, ${c.person} ___ to school.`, ["will walk", "walks to", "walked to", "will walked"], "will walk"]
        ],
        A2: [[`If ${c.person} ___ ${object} early, ${c.team} will have more time.`, [s, base, `will ${base}`, `has ${pp}`], s]],
        B1: [
          [`${c.person} would help if there ___ more time.`, ["were", "is", "will be", "being"], "were"],
          [`If ${c.person} ___ the answer, ${c.person} would explain it.`, ["knew", "knows", "will know", "knowing"], "knew"],
          [`The class would be quieter if the room ___ larger.`, ["were", "is", "will be", "being"], "were"],
          [`If the office ___ open later, more workers could come.`, ["stayed", "stays", "will stay", "staying"], "stayed"],
          [`${c.person} could finish today if ${c.person} ___ the missing file.`, ["had", "has", "will have", "having"], "had"]
        ],
        B2: [
          [`If ${c.person} had checked the ${c.thing}, the team ___ the error.`, ["would have found", "will find", "would find", "has found"], "would have found"],
          [`If the notice had been clearer, fewer students ___ the office.`, ["would have called", "will call", "would call", "have called"], "would have called"],
          [`The review could have ended sooner if the files ___ complete.`, ["had been", "have been", "were being", "will be"], "had been"],
          [`If ${c.person} had arrived earlier, the group ___ the first train.`, ["would not have missed", "will not miss", "would not miss", "has not missed"], "would not have missed"],
          [`The manager might have approved the request if the budget ___ room for it.`, ["had included", "includes", "will include", "has included"], "had included"]
        ],
        C1: [
          [`If the ${c.thing} were clearer, fewer people ___ mistakes.`, ["would make", "will make", "made", "had made"], "would make"],
          [`Were the evidence stronger, the committee ___ the proposal.`, ["would approve", "will approve", "approved", "had approved"], "would approve"],
          [`If the sample represented all learners, the finding ___ more persuasive.`, ["would be", "will be", "has been", "being"], "would be"],
          [`The policy could work if staff ___ enough training.`, ["received", "receive", "will receive", "had receiving"], "received"],
          [`If the wording were less vague, the objection ___ less force.`, ["would have", "will have", "had", "has had"], "would have"]
        ],
        C2: [[`Had ${c.person} ___ ${object} earlier, the meeting would have started on time.`, [pp, `have ${pp}`, `to ${base}`, ing], pp]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function passiveVoice(level, i) {
      const c = row(i);
      const [base, , past, pp, ing, object] = c.action;
      const passiveObject = object.replace(/^the /, "The ");
      const simpleObject = pick(["room", "desk", "floor", "window", "table"], i);
      const sets = {
        A1: [
          [`The ${simpleObject} at the ${c.place} ___ after class.`, ["is cleaned", "cleans", "is cleaning", "has clean"], "is cleaned"],
          [`The front door ___ at nine every morning.`, ["is opened", "opens it", "is opening", "has open"], "is opened"],
          [`The homework ___ by the teacher.`, ["is checked", "checks", "is checking", "has check"], "is checked"],
          [`The books ___ on the shelf after class.`, ["are put", "put", "are putting", "has put"], "are put"],
          [`Lunch ___ in the cafeteria at noon.`, ["is served", "serves", "is serving", "has serve"], "is served"]
        ],
        A2: [
          [`The ${simpleObject} at the ${c.place} ___ yesterday.`, ["was cleaned", "cleaned", "was cleaning", "has cleaned"], "was cleaned"],
          [`The notices ___ before lunch.`, ["were printed", "printed", "were printing", "has printed"], "were printed"],
          [`The message ___ to every parent.`, ["was sent", "sent", "was sending", "has send"], "was sent"],
          [`The classroom windows ___ during the break.`, ["were opened", "opened", "were opening", "has opened"], "were opened"],
          [`The final answer ___ on the board.`, ["was written", "wrote", "was writing", "has write"], "was written"]
        ],
        B1: [[`${passiveObject} ___ by ${c.person} before lunch.`, [`was ${pp}`, past, `has ${base}`, `were ${pp}`], `was ${pp}`]],
        B2: [[`${passiveObject} ___ by three different reviewers.`, [`has been ${pp}`, `has ${pp}`, `was ${ing}`, `have been ${pp}`], `has been ${pp}`]],
        C1: [
          [`The ${c.thing} should ___ before it is shared.`, ["be reviewed", "review", "being reviewed", "have reviewed"], "be reviewed"],
          [`All names must ___ before the data are published.`, ["be removed", "remove", "being removed", "have removed"], "be removed"],
          [`The revised policy ought to ___ by legal staff.`, ["be checked", "check", "being checked", "have checked"], "be checked"],
          [`The survey results need to ___ in context.`, ["be interpreted", "interpret", "being interpreted", "have interpreted"], "be interpreted"],
          [`The complaint is likely to ___ at the next meeting.`, ["be discussed", "discuss", "being discussed", "have discussed"], "be discussed"]
        ],
        C2: [
          [`The mistake in the ${c.thing} is believed ___ during the final update.`, ["to have been introduced", "to introduce", "being introduced", "was introduced"], "to have been introduced"],
          [`The records are alleged ___ without proper consent.`, ["to have been disclosed", "to disclose", "being disclosed", "were disclosed"], "to have been disclosed"],
          [`The clause is understood ___ narrowly in recent decisions.`, ["to have been interpreted", "to interpret", "being interpreted", "was interpreted"], "to have been interpreted"],
          [`The objection is expected ___ during the hearing.`, ["to be addressed", "to address", "being addressed", "was addressed"], "to be addressed"],
          [`The findings are said ___ by later interviews.`, ["to have been corroborated", "to corroborate", "being corroborated", "were corroborated"], "to have been corroborated"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function relatives(level, i) {
      const c = row(i);
      const sets = {
        A1: [
          [`The teacher ___ works in the ${c.place} is kind.`, ["who", "which", "where", "whose"], "who"],
          [`This is the room ___ we study English.`, ["where", "who", "whose", "what"], "where"],
          [`The book ___ is on the desk is mine.`, ["that", "who", "where", "whose"], "that"],
          [`I know the student ___ bag is blue.`, ["whose", "who", "which", "where"], "whose"],
          [`The woman ___ teaches math is friendly.`, ["who", "which", "where", "what"], "who"]
        ],
        A2: [
          [`This is the ${c.thing} ___ ${c.person} needs today.`, ["that", "where", "whose", "what"], "that"],
          [`The office ___ we registered is upstairs.`, ["where", "who", "whose", "what"], "where"],
          [`The man ___ called earlier left a message.`, ["who", "which", "where", "whose"], "who"],
          [`The student ___ notebook was lost asked for help.`, ["whose", "who", "which", "where"], "whose"],
          [`The form ___ arrived yesterday is on the desk.`, ["which", "who", "where", "whose"], "which"]
        ],
        B1: [
          [`The ${c.place} ___ we met last week is closed today.`, ["where", "who", "whose", "what"], "where"],
          [`The reason ___ the office called was unclear.`, ["why", "who", "where", "whose"], "why"],
          [`The applicant ___ completed the form received a reply.`, ["who", "which", "where", "whose"], "who"],
          [`The ${c.thing} ___ ${c.person} sent yesterday was incomplete.`, ["that", "where", "whose", "what"], "that"],
          [`The day ___ the course begins is printed on the form.`, ["when", "who", "where", "whose"], "when"]
        ],
        B2: [
          [`The student ___ ${c.thing} was missing asked for another copy.`, ["whose", "who", "which", "where"], "whose"],
          [`The report, ___ I read twice, changed the recommendation.`, ["which", "who", "where", "whose"], "which"],
          [`The clerk to ___ the form was given signed the receipt.`, ["whom", "who", "which", "where"], "whom"],
          [`The office in ___ the records are stored closes at five.`, ["which", "that", "what", "whose"], "which"],
          [`The reason ___ the schedule changed was never explained.`, ["why", "who", "where", "whose"], "why"]
        ],
        C1: [
          [`The ${c.thing}, ___ was revised twice, is on file now.`, ["which", "that", "what", "where"], "which"],
          [`The applicant, ___ experience impressed the panel, received an offer.`, ["whose", "who", "which", "where"], "whose"],
          [`The point at ___ the argument changes is easy to miss.`, ["which", "that", "what", "where"], "which"],
          [`The researcher to ___ the grant was awarded thanked the committee.`, ["whom", "who", "which", "whose"], "whom"],
          [`The process ___ appeals are reviewed changed after the audit.`, ["whereby", "where", "which", "what"], "whereby"]
        ],
        C2: [
          [`The conditions under ___ the ${c.thing} was approved will be reviewed next month.`, ["which", "that", "what", "where"], "which"],
          [`The tribunal, ___ jurisdiction was challenged, delayed the hearing.`, ["whose", "who", "which", "where"], "whose"],
          [`The witnesses, several of ___ challenged the timeline, were recalled.`, ["whom", "who", "which", "whose"], "whom"],
          [`The statute, the meaning of ___ remains contested, was amended twice.`, ["which", "that", "what", "where"], "which"],
          [`The mechanism ___ the policy affects attendance is still unclear.`, ["whereby", "where", "which", "what"], "whereby"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function reportedSpeech(level, i) {
      const c = row(i);
      const sets = {
        A1: [`${c.other} said that ${c.person} was tired.`, `${c.other} said that ${c.person} is tired yesterday.`, `${c.other} said that tired ${c.person} was.`, `${c.other} said ${c.person} tired was.`],
        A2: [`${c.person} said that the class started at nine.`, `${c.person} said that the class start at nine.`, `${c.person} said the class has start at nine.`, `${c.person} said that nine started the class.`],
        B1: [`${c.person} asked where the ${c.place} was.`, `${c.person} asked where was the ${c.place}.`, `${c.person} asked where the ${c.place} is yesterday.`, `${c.person} asked where did the ${c.place} be.`],
        B2: [`${c.person} said that the meeting would start at noon.`, `${c.person} said that the meeting will started at noon.`, `${c.person} said the meeting would starts at noon.`, `${c.person} said that noon would the meeting start.`],
        C1: [`${c.other} explained that ${c.person} had already sent the ${c.thing}.`, `${c.other} explained that ${c.person} has already send the ${c.thing}.`, `${c.other} explained had ${c.person} already sent the ${c.thing}.`, `${c.other} explained that already sent ${c.person} the ${c.thing}.`],
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
        A1: [`There is ${articleFor(c.thing)} on the desk.`, `There ${articleFor(c.thing)} is on the desk.`, `On the desk has ${articleFor(c.thing)}.`, `There are ${articleFor(c.thing)} on the desk.`],
        A2: [`Could you tell me where the ${c.place} is?`, `Could you tell me where is the ${c.place}?`, `Could you tell to me where the ${c.place} is?`, `Could you tell me the ${c.place} where is?`],
        B1: [`It is important for ${c.person} to check the ${c.thing}.`, `It is important ${c.person} check the ${c.thing}.`, `It important for ${c.person} to check the ${c.thing}.`, `It is important for ${c.person} checking the ${c.thing}.`],
        B2: [`What ${c.person} needs is a clearer ${c.thing}.`, `What ${c.person} needs are a clearer ${c.thing}.`, `What needs ${c.person} is a clearer ${c.thing}.`, `What ${c.person} needs it is a clearer ${c.thing}.`],
        C1: [`Not only did ${c.person} revise the ${c.thing}, but ${c.person} also explained the change.`, `Not only ${c.person} revised the ${c.thing}, but ${c.person} also explained the change.`, `Not only did ${c.person} revised the ${c.thing}, but ${c.person} also explained the change.`, `Not only revised ${c.person} the ${c.thing}, but also explained the change.`],
        C2: [`Had ${c.person} known about the delay, ${c.person} would have changed the schedule.`, `Had ${c.person} knew about the delay, ${c.person} would have changed the schedule.`, `If had ${c.person} known about the delay, ${c.person} would have changed the schedule.`, `Had known ${c.person} about the delay, ${c.person} would have changed the schedule.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence with correct grammar.", set[0], set.slice(1), `advanced:${level}:${i}`);
    }

    function gerundsInfinitives(level, i) {
      const c = row(i);
      const sets = {
        A1: [
          [`${c.person} wants ___ English after work.`, ["to study", "study", "studying", "to studying"], "to study"],
          [`The students need ___ their names on the form.`, ["to write", "write", "writing", "to writing"], "to write"],
          [`${c.person} likes ___ music after dinner.`, ["to listen to", "listen", "listening to", "to listening"], "to listen to"],
          [`We hope ___ the lesson early.`, ["to start", "start", "starting", "to starting"], "to start"],
          [`The children want ___ outside today.`, ["to play", "play", "playing", "to playing"], "to play"]
        ],
        A2: [
          [`${c.person} enjoys ___ short stories.`, ["reading", "to read", "read", "to reading"], "reading"],
          [`The class finished ___ the worksheet before lunch.`, ["checking", "to check", "check", "to checking"], "checking"],
          [`${c.person} decided ___ the office before five.`, ["to call", "calling", "call", "to calling"], "to call"],
          [`Please avoid ___ near the exam room.`, ["talking", "to talk", "talk", "to talking"], "talking"],
          [`The teacher promised ___ the results tomorrow.`, ["to send", "sending", "send", "to sending"], "to send"]
        ],
        B1: [
          [`The office agreed ___ the deadline for the ${c.thing}.`, ["to extend", "extending", "extend", "to extending"], "to extend"],
          [`${c.person} admitted ___ the wrong file.`, ["opening", "to open", "open", "to opening"], "opening"],
          [`The manager refused ___ the incomplete form.`, ["to accept", "accepting", "accept", "to accepting"], "to accept"],
          [`The class practiced ___ questions politely.`, ["asking", "to ask", "ask", "to asking"], "asking"],
          [`${c.person} managed ___ the missing receipt.`, ["to find", "finding", "find", "to finding"], "to find"]
        ],
        B2: [
          [`${c.person} avoided ___ the same mistake twice.`, ["making", "to make", "make", "to making"], "making"],
          [`The committee considered ___ the deadline by one week.`, ["extending", "to extend", "extend", "to extending"], "extending"],
          [`The applicant expected ___ a reply by Friday.`, ["to receive", "receiving", "receive", "to receiving"], "to receive"],
          [`The manager postponed ___ the final decision.`, ["announcing", "to announce", "announce", "to announcing"], "announcing"],
          [`The team planned ___ the survey after the meeting.`, ["to revise", "revising", "revise", "to revising"], "to revise"]
        ],
        C1: [
          [`${c.person} is accustomed to ___ complex instructions.`, ["reading", "read", "to read", "to reading"], "reading"],
          [`The committee is committed to ___ the review transparent.`, ["making", "make", "to make", "to making"], "making"],
          [`The policy aims ___ unnecessary delays.`, ["to reduce", "reducing", "reduce", "to reducing"], "to reduce"],
          [`The researcher resisted ___ the finding too broadly.`, ["interpreting", "to interpret", "interpret", "to interpreting"], "interpreting"],
          [`The report failed ___ the strongest objection.`, ["to address", "addressing", "address", "to addressing"], "to address"]
        ],
        C2: [
          [`${c.person} objected to ___ without enough evidence.`, ["being criticized", "criticize", "be criticized", "to criticize"], "being criticized"],
          [`The author acknowledged ___ the original claim too broadly.`, ["having stated", "to have stated", "state", "having state"], "having stated"],
          [`The dissent stops short of ___ the statute invalid.`, ["calling", "to call", "call", "to calling"], "calling"],
          [`The panel declined ___ the precedent beyond this case.`, ["to extend", "extending", "extend", "to extending"], "to extend"],
          [`The memo recommends ___ the disputed clause intact.`, ["leaving", "to leave", "leave", "to leaving"], "leaving"]
        ]
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
        A1: [
          [`${c.person} has a book. ___ is on the desk.`, ["It", "They", "Them", "She"], "It"],
          [`The girl is in class. ___ has a red bag.`, ["She", "It", "They", "Her"], "She"],
          [`The boys are outside. ___ are playing soccer.`, ["They", "He", "Them", "It"], "They"],
          [`The teacher gave the papers to ___.`, ["us", "we", "our", "ours"], "us"],
          [`The boy cannot find ___ pencil.`, ["his", "he", "him", "they"], "his"]
        ],
        A2: [
          [`${c.person} and ${c.other} finished the task, and ___ sent it to the teacher.`, ["they", "she", "it", "him"], "they"],
          [`The receipt is missing, so please look for ___.`, ["it", "they", "them", "he"], "it"],
          [`The students left early, but the teacher called ___ back.`, ["them", "they", "their", "it"], "them"],
          [`The manager asked Carlos to bring ___ passport.`, ["his", "he", "him", "its"], "his"],
          [`Lena forgot her notebook, so I lent ___ mine.`, ["her", "she", "hers", "it"], "her"]
        ],
        B1: [
          [`The ${c.plural} are complete; please put ___ in the folder.`, ["them", "it", "they", "he"], "them"],
          [`Neither answer explains ___ clearly.`, ["itself", "themselves", "theirself", "them"], "itself"],
          [`The workers completed the forms by ___.`, ["themselves", "itself", "theirselves", "them"], "themselves"],
          [`The office changed ___ hours after the holiday.`, ["its", "it's", "itself", "they"], "its"],
          [`The student ___ won the prize thanked the class.`, ["who", "which", "where", "what"], "who"]
        ],
        B2: [
          [`Every ${pick(["student", "worker", "visitor", "applicant", "reader"], i)} at the ${c.place} should bring ___ own notebook.`, ["their", "there", "them", "its"], "their"],
          [`The committee released ___ decision after the vote.`, ["its", "it's", "itself", "them"], "its"],
          [`The two departments blamed each other instead of solving the problem ___.`, ["themselves", "itself", "theirself", "them"], "themselves"],
          [`The applicant to ___ the email was sent replied immediately.`, ["whom", "who", "which", "where"], "whom"],
          [`The report refers to two policies but explains only the newer ___.`, ["one", "ones", "it", "them"], "one"]
        ],
        C1: [
          [`The agency at the ${c.place} published ___ final decision after the review.`, ["its", "it's", "itself", "them"], "its"],
          [`Each researcher checked the figures for ___.`, ["herself", "she", "her", "itself"], "herself"],
          [`The proposal, ___ critics initially rejected, was later revised.`, ["which", "who", "where", "whose"], "which"],
          [`The committee divided the remaining tasks among ___.`, ["itself", "themselves", "theirselves", "them"], "itself"],
          [`The two reports contradict each other, so ___ can both be correct.`, ["neither", "none", "either", "both"], "neither"]
        ],
        C2: [
          [`The committee members disagreed among ___ about the final ${c.thing}.`, ["themselves", "itself", "theirselves", "them"], "themselves"],
          [`The statute leaves open the question of ___ must authorize the appeal.`, ["who", "whom", "which", "whose"], "who"],
          [`The dissent criticizes the majority for contradicting ___.`, ["itself", "themselves", "theirselves", "them"], "itself"],
          [`The expert on ___ the panel relied later revised the estimate.`, ["whom", "who", "which", "where"], "whom"],
          [`The framework treats each objection on ___ own terms.`, ["its", "it's", "itself", "their"], "its"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function determiners(level, i) {
      const c = row(i);
      const sets = {
        A1: [
          [`${c.person} needs ___ ${pick(["pencil", "notebook", "ticket", "folder", "receipt"], i)} for the test.`, ["a", "many", "much", "(nothing)"], "a"],
          [`There are ___ books on the desk.`, ["three", "much", "a", "an"], "three"],
          [`I do not have ___ money today.`, ["any", "many", "a", "an"], "any"],
          [`___ student has a name card.`, ["Each", "Many", "Much", "Several"], "Each"],
          [`We need ___ water for lunch.`, ["some", "many", "a", "an"], "some"]
        ],
        A2: [
          [`There is ___ ${pick(["milk", "water", "coffee", "rice", "paper"], i)} in the ${c.place}.`, ["some", "many", "a", "an"], "some"],
          [`___ students finished the form before noon.`, ["Several", "Much", "A", "An"], "Several"],
          [`Please bring ___ ID card to the office.`, ["your", "you", "yours", "yourself"], "your"],
          [`The class does not have ___ extra chairs.`, ["enough", "many of", "much of", "each"], "enough"],
          [`I saw ___ teacher near the front desk.`, ["another", "much", "several", "any"], "another"]
        ],
        B1: [
          [`___ ${pick(["student", "worker", "visitor", "applicant", "reader"], i)} in the ${c.place} must sign the form.`, ["Each", "Many", "Much", "Several"], "Each"],
          [`The office has ___ copies for everyone in the room.`, ["enough", "much", "each", "another"], "enough"],
          [`There were ___ complaints after the schedule changed.`, ["several", "much", "a little", "each"], "several"],
          [`___ of the two answers is completely correct.`, ["Neither", "Several", "Many", "Much"], "Neither"],
          [`The teacher gave ___ student the same instructions.`, ["each", "many", "much", "several"], "each"]
        ],
        B2: [
          [`We have enough chairs for ___ ${pick(["visitor", "student", "parent", "guest", "trainee"], i)} in the ${c.place}.`, ["every", "much", "several", "few"], "every"],
          [`Only ___ of the applicants submitted both forms.`, ["some", "much", "each", "another"], "some"],
          [`The report gives ___ detail to support the conclusion.`, ["little", "few", "many", "several"], "little"],
          [`___ participants who missed the first session must attend the review.`, ["All", "Much", "Every", "Each of"], "All"],
          [`The committee rejected ___ proposal because both were incomplete.`, ["both", "either", "neither", "each"], "both"]
        ],
        C1: [
          [`Neither answer about the ${c.thing} gives ___ detail to support the claim.`, ["enough", "many", "several", "few"], "enough"],
          [`The report includes ___ evidence to justify a cautious recommendation.`, ["sufficient", "many", "several", "few"], "sufficient"],
          [`___ of the proposed explanations accounts for every case.`, ["None", "Each", "Every", "Much"], "None"],
          [`The reviewer found ___ inconsistencies in the appendix.`, ["several", "much", "each", "any of"], "several"],
          [`The method leaves ___ room for subjective interpretation.`, ["little", "few", "many", "several"], "little"]
        ],
        C2: [
          [`The report about the ${c.thing} offers little, if ___, evidence for that conclusion.`, ["any", "many", "several", "few"], "any"],
          [`___ interpretation can be defended without additional evidence.`, ["Neither", "Both", "Several", "Much"], "Neither"],
          [`The dissent accepts ___ of the majority's factual assumptions.`, ["none", "every", "each", "much"], "none"],
          [`The model depends on ___ assumptions that remain untested.`, ["several", "much", "each", "any of"], "several"],
          [`The clause gives the agency ___ discretion than the earlier version did.`, ["less", "fewer", "many", "several"], "less"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function adjectiveAdverb(level, i) {
      const c = row(i);
      const adj = c.adjective;
      const adv = c.adverb;
      const comp = comparativeForm(adj);
      const noun = adjectiveNounForm(adj);
      const c1Forms = [
        ["coherent", "coherently", "coherence"], ["efficient", "efficiently", "efficiency"], ["consistent", "consistently", "consistency"], ["precise", "precisely", "precision"], ["subtle", "subtly", "subtlety"],
        ["practical", "practically", "practicality"], ["credible", "credibly", "credibility"], ["relevant", "relevantly", "relevance"], ["robust", "robustly", "robustness"], ["explicit", "explicitly", "explicitness"],
        ["implicit", "implicitly", "implicitness"], ["tentative", "tentatively", "tentativeness"], ["valid", "validly", "validity"], ["methodical", "methodically", "method"], ["logical", "logically", "logic"],
        ["formal", "formally", "formality"], ["critical", "critically", "criticism"], ["analytical", "analytically", "analysis"], ["persuasive", "persuasively", "persuasion"], ["transparent", "transparently", "transparency"]
      ];
      const c2Forms = [
        ["systematic", "systematically", "system"], ["rigorous", "rigorously", "rigor"], ["objective", "objectively", "objectivity"], ["critical", "critically", "critique"], ["independent", "independently", "independence"],
        ["transparent", "transparently", "transparency"], ["cautious", "cautiously", "caution"], ["deliberate", "deliberately", "deliberation"], ["precise", "precisely", "precision"], ["comparative", "comparatively", "comparison"],
        ["empirical", "empirically", "empiricism"], ["analytical", "analytically", "analysis"], ["methodical", "methodically", "method"], ["consistent", "consistently", "consistency"], ["provisional", "provisionally", "provision"],
        ["substantive", "substantively", "substance"], ["sequential", "sequentially", "sequence"], ["contextual", "contextually", "context"], ["skeptical", "skeptically", "skepticism"], ["judicious", "judiciously", "judgment"]
      ];
      if (level === "C1") {
        const [advancedAdj, advancedAdv, noun] = pick(c1Forms, i);
        return makeItem(addSurfaceLead(`The explanation about the ${c.thing} was surprisingly ___ for such a complex topic.`, level, i), [advancedAdj, advancedAdv, noun, `very ${advancedAdv}`], advancedAdj);
      }
      if (level === "C2") {
        const [advancedAdj, advancedAdv, noun] = pick(c2Forms, i);
        return makeItem(addSurfaceLead(`${c.person} evaluated the concerns ___ before revising the ${c.thing}.`, level, i), [advancedAdv, advancedAdj, noun, `${advancedAdj} evaluation`], advancedAdv);
      }
      const sets = {
        A1: [[`${c.person} is a ___ student.`, [adj, adv, noun, `very ${adv}`], adj]],
        A2: [[`${c.person} answered the question ___.`, [adv, adj, noun, `very ${adj}`], adv]],
        B1: [[`The ${c.plural} were written ___ for beginners.`, [adv, adj, noun, `very ${adj}`], adv]],
        B2: [[`The new ${c.thing} is ___ than the old one.`, [comp, adv, `most ${adj}`, noun], comp]]
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

    const a1EmphasisSetups = [
      "Use so or neither with the helper verb before the second subject.",
      "Match the helper verb in the first part, then put it before the second subject.",
      "For this emphasis pattern, the helper verb comes before the second subject.",
      "The second part should use the same helper verb pattern as the first part."
    ];

    const a1EmphasisItems = [
      {
        correct: "I am hungry, and so is my little sister.",
        reason: '"So is my little sister" matches "am hungry": use a form of be before the second subject.',
        wrongs: [
          ["I am hungry, and so do my little sister.", '"Do" does not match the be verb in "am hungry."'],
          ["I am hungry, and so is my little sister is.", "This repeats the be verb after the second subject."],
          ["I am hungry, and so my little sister.", "The second part is missing the helper verb before the subject."]
        ]
      },
      {
        correct: "Lena likes soccer, and so does Omar.",
        reason: '"So does Omar" matches the simple present verb "likes" for one other person.',
        wrongs: [
          ["Lena likes soccer, and so do Omar.", '"Do" does not match the singular subject "Omar."'],
          ["Lena likes soccer, and so is Omar.", '"Is" does not match the action verb "likes."'],
          ["Lena likes soccer, and so does Omar likes soccer.", 'After "does," the main verb should not keep the -s ending.']
        ]
      },
      {
        correct: "We can swim, and so can the twins.",
        reason: '"So can the twins" repeats the modal helper "can" before the second subject.',
        wrongs: [
          ["We can swim, and so do the twins.", '"Do" does not match the modal helper "can."'],
          ["We can swim, and so can the twins can.", 'The helper "can" is repeated after the second subject.'],
          ["We can swim, and so can the twins swims.", 'A verb after "can" should use the base form, not an -s form.']
        ]
      },
      {
        correct: "The bus was late, and so was the train.",
        reason: '"So was the train" uses the past be verb before the second subject.',
        wrongs: [
          ["The bus was late, and so were the train.", '"Were" does not match the singular subject "the train."'],
          ["The bus was late, and so did the train.", '"Did" does not match the be verb "was."'],
          ["The bus was late, and so was the train was.", "This repeats the past be verb after the second subject."]
        ]
      },
      {
        correct: "My socks are wet, and so are my shoes.",
        reason: '"So are my shoes" uses the plural be verb before the second subject.',
        wrongs: [
          ["My socks are wet, and so is my shoes.", '"Is" does not match the plural subject "my shoes."'],
          ["My socks are wet, and so do my shoes.", '"Do" does not match the be verb "are."'],
          ["My socks are wet, and so are my shoes are.", "This repeats the be verb after the second subject."]
        ]
      },
      {
        correct: "Dad will call, and so will Mom.",
        reason: '"So will Mom" repeats the future helper "will" before the second subject.',
        wrongs: [
          ["Dad will call, and so does Mom.", '"Does" does not match the future helper "will."'],
          ["Dad will call, and so will Mom calls.", 'A verb after "will" should use the base form, not an -s form.'],
          ["Dad will call, and so will Mom will.", 'The helper "will" is repeated after the second subject.']
        ]
      },
      {
        correct: "Maya has a red bag, and so does Ben.",
        reason: '"So does Ben" is the correct simple-present helper for another person having the same thing.',
        wrongs: [
          ["Maya has a red bag, and so do Ben.", '"Do" does not match the singular subject "Ben."'],
          ["Maya has a red bag, and so is Ben.", '"Is" does not match the verb "has."'],
          ["Maya has a red bag, and so does Ben has one.", 'After "does," the verb should be "have," not "has."']
        ]
      },
      {
        correct: "I like music, and so does my brother.",
        reason: '"So does my brother" uses "does" because the second subject is one person.',
        wrongs: [
          ["I like music, and so do my brother.", '"Do" does not match the singular subject "my brother."'],
          ["I like music, and so is my brother.", '"Is" does not match the action verb "like."'],
          ["I like music, and so does my brother likes music.", 'After "does," the main verb should not keep the -s ending.']
        ]
      },
      {
        correct: "The children were quiet, and so was the teacher.",
        reason: '"So was the teacher" uses a singular be verb for the second subject.',
        wrongs: [
          ["The children were quiet, and so were the teacher.", '"Were" does not match the singular subject "the teacher."'],
          ["The children were quiet, and so did the teacher.", '"Did" does not match the be verb in "were quiet."'],
          ["The children were quiet, and so was the teacher was.", "This repeats the be verb after the second subject."]
        ]
      },
      {
        correct: "Nora can read the sign, and so can I.",
        reason: '"So can I" repeats the modal helper "can" before the second subject.',
        wrongs: [
          ["Nora can read the sign, and so do I.", '"Do" does not match the modal helper "can."'],
          ["Nora can read the sign, and so can I can.", 'The helper "can" is repeated after the second subject.'],
          ["Nora can read the sign, and so can I reads it.", 'A verb after "can" should use the base form, not an -s form.']
        ]
      },
      {
        correct: "I am not sleepy, and neither is Kai.",
        reason: '"Neither is Kai" matches the negative be sentence "I am not sleepy."',
        wrongs: [
          ["I am not sleepy, and neither Kai is.", 'With "neither," the be verb should come before the subject.'],
          ["I am not sleepy, and neither does Kai.", '"Does" does not match the be verb in "am not sleepy."'],
          ["I am not sleepy, and neither is Kai is.", "This repeats the be verb after the second subject."]
        ]
      },
      {
        correct: "The door is open, and so is the window.",
        reason: '"So is the window" uses the singular be verb before the second subject.',
        wrongs: [
          ["The door is open, and so are the window.", '"Are" does not match the singular subject "the window."'],
          ["The door is open, and so does the window.", '"Does" does not match the be verb "is."'],
          ["The door is open, and so is the window is.", "This repeats the be verb after the second subject."]
        ]
      },
      {
        correct: "Emma went home, and so did Luis.",
        reason: '"So did Luis" uses the past helper "did" for the same past action.',
        wrongs: [
          ["Emma went home, and so was Luis.", '"Was" does not match the past action verb "went."'],
          ["Emma went home, and so do Luis.", '"Do" does not match the singular subject or the past time.'],
          ["Emma went home, and so did Luis went home.", 'After "did," the main verb should be the base form "go."']
        ]
      },
      {
        correct: "The soup smells good, and so does the bread.",
        reason: '"So does the bread" uses "does" for a simple present verb with one second subject.',
        wrongs: [
          ["The soup smells good, and so do the bread.", '"Do" does not match the singular subject "the bread."'],
          ["The soup smells good, and so is the bread.", '"Is" does not match the action-like verb "smells."'],
          ["The soup smells good, and so does the bread smells good.", 'After "does," the main verb should not keep the -s ending.']
        ]
      },
      {
        correct: "Tom cannot come today, and neither can I.",
        reason: '"Neither can I" repeats the modal helper "can" for the same negative idea.',
        wrongs: [
          ["Tom cannot come today, and neither do I.", '"Do" does not match the modal helper "can."'],
          ["Tom cannot come today, and neither I can.", 'With "neither," the helper verb should come before the subject.'],
          ["Tom cannot come today, and neither can I can.", 'The helper "can" is repeated after the second subject.']
        ]
      },
      {
        correct: "Our room has two windows, and so does their room.",
        reason: '"So does their room" uses "does" because the second subject is one room.',
        wrongs: [
          ["Our room has two windows, and so do their room.", '"Do" does not match the singular subject "their room."'],
          ["Our room has two windows, and so is their room.", '"Is" does not match the verb "has."'],
          ["Our room has two windows, and so does their room has two.", 'After "does," the verb should be "have," not "has."']
        ]
      },
      {
        correct: "Sam is laughing, and so are the girls.",
        reason: '"So are the girls" uses the plural be verb for the second subject.',
        wrongs: [
          ["Sam is laughing, and so is the girls.", '"Is" does not match the plural subject "the girls."'],
          ["Sam is laughing, and so do the girls.", '"Do" does not match the be verb in "is laughing."'],
          ["Sam is laughing, and so are the girls are.", "This repeats the be verb after the second subject."]
        ]
      },
      {
        correct: "The baby slept well, and so did Grandma.",
        reason: '"So did Grandma" uses the past helper "did" for the same past action.',
        wrongs: [
          ["The baby slept well, and so does Grandma.", '"Does" does not match the past time of "slept."'],
          ["The baby slept well, and so was Grandma.", '"Was" does not match the action verb "slept."'],
          ["The baby slept well, and so did Grandma slept well.", 'After "did," the main verb should be the base form "sleep."']
        ]
      },
      {
        correct: "I need a pencil, and so does Aya.",
        reason: '"So does Aya" uses "does" because the second subject is one person.',
        wrongs: [
          ["I need a pencil, and so do Aya.", '"Do" does not match the singular subject "Aya."'],
          ["I need a pencil, and so is Aya.", '"Is" does not match the action verb "need."'],
          ["I need a pencil, and so does Aya needs a pencil.", 'After "does," the main verb should not keep the -s ending.']
        ]
      },
      {
        correct: "The shop opens early, and so does the cafe.",
        reason: '"So does the cafe" uses "does" for a simple present verb with one second subject.',
        wrongs: [
          ["The shop opens early, and so do the cafe.", '"Do" does not match the singular subject "the cafe."'],
          ["The shop opens early, and so is the cafe.", '"Is" does not match the action verb "opens."'],
          ["The shop opens early, and so does the cafe opens early.", 'After "does," the main verb should not keep the -s ending.']
        ]
      }
    ];

    function bespokeA1Emphasis(i) {
      const entry = pick(a1EmphasisItems, i);
      const options = [entry.correct, ...entry.wrongs.map(([option]) => option)];
      const explanation = `${entry.reason} The correct sentence is: ${entry.correct}`;
      const rationales = {
        [entry.correct]: explanation
      };
      for (const [option, note] of entry.wrongs) rationales[option] = note;
      return makeItem(
        "Choose the sentence with correct word order.",
        options,
        entry.correct,
        `inversion:a1-bespoke:${i}`,
        pick(a1EmphasisSetups, i),
        { explanation, rationales }
      );
    }

    function inversion(level, i) {
      const c = row(i);
      if (level === "A1") return bespokeA1Emphasis(i);
      const sets = {
        A2: [`Here comes the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} from the ${c.place}.`, `Here the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} comes it from the ${c.place}.`, `Here does come the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} from the ${c.place}.`, `Here is comes the ${pick(["bus", "train", "teacher", "visitor", "manager"], i)} from the ${c.place}.`],
        B1: [`${c.person} likes English, and so do I.`, `${c.person} likes English, and so I do.`, `${c.person} likes English, and so am I.`, `${c.person} likes English, and so I am.`],
        B2: [`Not only did ${c.person} finish the ${c.thing}, but ${c.person} also checked it.`, `Not only ${c.person} finished the ${c.thing}, but ${c.person} also checked it.`, `Not only did ${c.person} finished the ${c.thing}, but ${c.person} also checked it.`, `Not only finished ${c.person} the ${c.thing}, but ${c.person} also checked it.`],
        C1: [`Only after the meeting ended did ${c.person} send the notes.`, `Only after the meeting ended ${c.person} sent the notes.`, `Only after ended the meeting did ${c.person} send the notes.`, `Only after the meeting did ended ${c.person} send the notes.`],
        C2: [`No sooner had ${c.person} opened the file than the system stopped working.`, `No sooner ${c.person} had opened the file than the system stopped working.`, `No sooner had opened ${c.person} the file than the system stopped working.`, `No sooner had ${c.person} open the file than the system stopped working.`]
      };
      const set = sets[level];
      return sentenceChoice("Choose the sentence that gives clear emphasis.", set[0], set.slice(1), `inversion:${level}:${i}`);
    }

    function subjunctive(level, i) {
      const c = row(i);
      const sets = {
        A1: [
          [`${c.other} wishes ${c.person} ___ at home now.`, ["were", "is", "be", "being"], "were"],
          [`I wish I ___ a pencil.`, ["had", "have", "will have", "having"], "had"],
          [`The children wish they ___ outside today.`, ["could play", "can played", "could played", "playing"], "could play"],
          [`I wish I ___ the answer.`, ["knew", "know", "will know", "knowing"], "knew"],
          [`The students wish school ___ closed today.`, ["were", "is", "be", "being"], "were"]
        ],
        A2: [
          [`If I ___ ${c.person}, I would ask for help.`, ["were", "am", "be", "being"], "were"],
          [`If the office ___ earlier, we could get the form before class.`, ["opened", "opens", "will open", "opening"], "opened"],
          [`If ${c.person} ___ more time, the answer would be clearer.`, ["had", "has", "will have", "having"], "had"],
          [`I would call the teacher if I ___ the number.`, ["knew", "know", "will know", "knowing"], "knew"],
          [`The class could finish today if the printer ___ working.`, ["were", "is", "will be", "being"], "were"]
        ],
        B1: [
          [`The teacher suggested that ${c.person} ___ early.`, ["arrive", "arrives", "arrived", "arriving"], "arrive"],
          [`The manager asked that the clerk ___ the receipt today.`, ["file", "files", "filed", "filing"], "file"],
          [`The rule requires that each student ___ a badge.`, ["wear", "wears", "wore", "wearing"], "wear"],
          [`The office requested that the form ___ signed in blue ink.`, ["be", "is", "was", "being"], "be"],
          [`The tutor recommended that ${c.person} ___ the essay again.`, ["revise", "revises", "revised", "revising"], "revise"]
        ],
        B2: [
          [`It is important that every ${pick(["applicant", "student", "visitor", "worker", "parent"], i)} at the ${c.place} ___ the form today.`, ["complete", "completes", "completed", "completing"], "complete"],
          [`The director insisted that the notice ___ posted before noon.`, ["be", "is", "was", "being"], "be"],
          [`The policy requires that every complaint ___ a case number.`, ["receive", "receives", "received", "receiving"], "receive"],
          [`The committee recommended that the deadline ___ extended.`, ["be", "is", "was", "being"], "be"],
          [`It is essential that the reviewer ___ the missing appendix.`, ["check", "checks", "checked", "checking"], "check"]
        ],
        C1: [
          [`The rule requires that the ${c.thing} ___ submitted by Friday.`, ["be", "is", "was", "being"], "be"],
          [`The chair requested that the report ___ confidential until Monday.`, ["remain", "remains", "remained", "remaining"], "remain"],
          [`The proposal recommends that the office ___ a clearer appeals process.`, ["adopt", "adopts", "adopted", "adopting"], "adopt"],
          [`The contract stipulates that payment ___ made within thirty days.`, ["be", "is", "was", "being"], "be"],
          [`The reviewer suggested that the author ___ the claim more narrowly.`, ["state", "states", "stated", "stating"], "state"]
        ],
        C2: [
          [`The committee insisted that the wording in the ${c.thing} ___ unchanged until the review ended.`, ["remain", "remains", "remained", "remaining"], "remain"],
          [`The order requires that all identifying details ___ redacted before release.`, ["be", "are", "were", "being"], "be"],
          [`The dissent urges that the precedent ___ applied only to similar cases.`, ["be", "is", "was", "being"], "be"],
          [`The panel recommended that the agency ___ the disputed clause.`, ["reconsider", "reconsiders", "reconsidered", "reconsidering"], "reconsider"],
          [`The settlement demands that neither party ___ liability.`, ["admit", "admits", "admitted", "admitting"], "admit"]
        ]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function boundaries(level, i) {
      const c = row(i);
      const sets = {
        A1: [`${c.person} was tired, so ${c.person} went home.`, `${c.person} was tired ${c.person} went home.`, `${c.person} was tired, ${c.person} went home.`, `${c.person} was tired so went home.`],
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

    const vocabEntries = {
      "Everyday vocabulary": {
        A1: [["big", "large", "The {thing} is big."], ["small", "not large", "The room is small."], ["fast", "quick", "The train is fast."], ["near", "not far away", "The {place} is near the {otherPlace}."], ["begin", "start", "The lesson will begin at noon."]],
        A2: [["repair", "fix", "{person} will repair the chair."], ["borrow", "use and return", "{person} needs to borrow a pen."], ["return", "go or give back", "Please return the book tomorrow."], ["quiet", "not noisy", "The {place} is quiet today."], ["choose", "pick", "{person} must choose one answer."]],
        B1: [["delay", "make something happen later", "Heavy rain may delay the bus."], ["improve", "become better", "Practice can improve writing."], ["require", "need", "The trip will require a passport."], ["allow", "permit", "The rule will allow late registration."], ["avoid", "stay away from", "{person} tries to avoid mistakes."]],
        B2: [["brief", "short", "The manager gave a brief explanation."], ["reliable", "able to be trusted", "The new schedule is reliable."], ["accurate", "correct", "The final number must be accurate."], ["complex", "having many parts", "The process is complex."], ["available", "able to be used", "The room is available after lunch."]],
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
        C1: [["attribute", "see as caused by", "The report attributes the delay to late data."], ["constitute", "be or amount to", "The change may constitute a new policy."], ["retain", "keep", "The school will retain the existing schedule."], ["offset", "balance or reduce the effect of", "The discount may offset the higher fee."], ["undergo", "experience a change or process", "The form will undergo review next month."]],
        C2: [["substantiate", "support with evidence", "The appendix substantiates the central claim."], ["preclude", "make impossible or rule out", "The missing signature may preclude approval."], ["ameliorate", "make better", "The new policy may ameliorate the problem."], ["construe", "interpret in a particular way", "Readers may construe the wording as a warning."], ["entail", "involve or make necessary", "The change would entail additional costs."]]
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

    function rotatedOtherEntries(entries, answer, index) {
      const others = entries.filter((entry) => entry[1] !== answer);
      return [0, 1, 2].map((offset) => pick(others, index + offset));
    }

    function meaningRationales(term, answer, distractors, sentence) {
      const correct = `In this sentence, "${term}" means "${answer}": ${sentence}`;
      const options = [answer, ...distractors.map((entry) => entry[1])];
      return rationales(options, answer, correct, (choice) => {
        const source = distractors.find((entry) => entry[1] === choice);
        return `"${choice}" is a real meaning, but it matches ${source ? `"${source[0]}"` : "another word"}, not "${term}" in this sentence.`;
      });
    }

    function isImperativeSentence(sentence) {
      return /^(Please|Turn|Put|Bring|Use|Ask|Submit|Send|Return|Complete|Call|Read|Choose)\b/.test(sentence);
    }

    function contextualMeaningSentence(sentence, c, index) {
      const clean = withoutFinalPeriod(sentence);
      const variant = index % 20;
      if (variant === 0) return ensurePeriod(clean);

      if (isImperativeSentence(clean)) {
        return [
          `The note says, "${clean}."`,
          `In the ${c.place}, the instruction is, "${clean}."`,
          `For the ${c.thing}, the message says, "${clean}."`,
          `A sign by the door says, "${clean}."`,
          `The teacher writes, "${clean}."`,
          `The reminder says, "${clean}."`,
          `On the checklist, it says, "${clean}."`,
          `The email tells students, "${clean}."`,
          `At the reception desk, the clerk says, "${clean}."`,
          `The class notice says, "${clean}."`,
          `On the first page, the direction is, "${clean}."`,
          `Before the activity, the speaker says, "${clean}."`,
          `The short message says, "${clean}."`,
          `On the form, the instruction reads, "${clean}."`,
          `The guide tells visitors, "${clean}."`,
          `During the lesson, the tutor says, "${clean}."`,
          `The office notice says, "${clean}."`,
          `At the start of the task, the teacher says, "${clean}."`,
          `The printed card says, "${clean}."`,
          `Before the meeting, the note says, "${clean}."`
        ][variant - 1];
      }

      const lower = lowerAfterLead(clean);
      return [
        `In the ${c.place}, ${lower}.`,
        `During the discussion, ${lower}.`,
        `The example says that ${lower}.`,
        `On the worksheet, ${lower}.`,
        `The teacher's example is this: ${clean}.`,
        `In a short message, ${lower}.`,
        `The report gives this example: ${clean}.`,
        `At the reception desk, ${lower}.`,
        `The class note says that ${lower}.`,
        `In the practice text, ${lower}.`,
        `During the lesson, ${lower}.`,
        `The first example says that ${lower}.`,
        `On the notice board, ${lower}.`,
        `The guide gives this sentence: ${clean}.`,
        `In the office email, ${lower}.`,
        `The reading passage says that ${lower}.`,
        `At the start of the activity, ${lower}.`,
        `The second example says that ${lower}.`,
        `On the class website, ${lower}.`,
        `The printed handout says that ${lower}.`
      ][variant - 1];
    }

    function vocabMeaning(topic, level, i) {
      const entries = vocabEntries[topic][level];
      const entry = pick(entries, i);
      const c = row(i);
      const sentence = contextualMeaningSentence(fill(entry[2], c), c, i);
      const distractors = rotatedOtherEntries(entries, entry[1], i);
      return makeItem(
        `What does "${entry[0]}" mean in this sentence? ${sentence}`,
        [entry[1], ...distractors.map((choice) => choice[1])],
        entry[1],
        `vocab:${topic}:${level}:${entry[0]}`,
        "",
        {
          explanation: `In this sentence, "${entry[0]}" means "${entry[1]}": ${sentence}`,
          rationales: meaningRationales(entry[0], entry[1], distractors, sentence)
        }
      );
    }

    const collocations = {
      A1: [
        ["take", "a break", ["make", "do", "catch"]],
        ["make", "a cake", ["do", "catch", "open"]],
        ["have", "lunch", ["do", "catch", "open"]],
        ["catch", "a bus", ["make", "do", "hold"]],
        ["do", "homework", ["take", "catch", "hold"]]
      ],
      A2: [
        ["make", "a choice", ["do", "take", "ask"]],
        ["keep", "a promise", ["do", "send", "follow"]],
        ["ask", "a question", ["make", "send", "keep"]],
        ["send", "an email", ["make", "ask", "follow"]],
        ["follow", "the rules", ["make", "send", "ask"]]
      ],
      B1: [
        ["meet", "a deadline", ["solve", "raise", "book"]],
        ["raise", "a concern", ["meet", "solve", "book"]],
        ["book", "an appointment", ["meet", "solve", "raise"]],
        ["solve", "a problem", ["meet", "book", "set"]],
        ["set", "a goal", ["meet", "raise", "book"]]
      ],
      B2: [
        ["reach", "a conclusion", ["hold", "gain", "take"]],
        ["draw", "attention", ["reach", "take", "carry"]],
        ["take", "responsibility", ["reach", "draw", "gain"]],
        ["gain", "experience", ["reach", "draw", "hold"]],
        ["hold", "a meeting", ["reach", "draw", "gain"]]
      ],
      C1: [
        ["pose", "a challenge", ["conduct", "allocate", "submit"]],
        ["conduct", "research", ["pose", "submit", "allocate"]],
        ["allocate", "resources", ["pose", "conduct", "submit"]],
        ["submit", "a proposal", ["pose", "conduct", "allocate"]],
        ["provide", "evidence", ["pose", "conduct", "allocate"]]
      ],
      C2: [
        ["mitigate", "risk", ["yield", "exert", "formulate"]],
        ["yield", "results", ["mitigate", "exert", "formulate"]],
        ["exert", "influence", ["yield", "mitigate", "formulate"]],
        ["scrutinize", "evidence", ["mitigate", "exert", "formulate"]],
        ["formulate", "a hypothesis", ["mitigate", "yield", "exert"]]
      ]
    };

    function collocationItem(level, i) {
      const [verb, object, wrongs] = pick(collocations[level], i);
      const c = row(i);
      const deadline = pick(["the meeting", "Friday", "the review", "the deadline"], i);
      const text = addSurfaceLead(`${c.person} needs to ___ ${object} before ${deadline}.`, level, i);
      const explanation = `The natural phrase is "${verb} ${object}." The completed sentence is: ${completedSentence(text, verb)}`;
      return makeItem(
        text,
        [verb, ...wrongs],
        verb,
        `collocation:${level}:${verb}:${object}`,
        "",
        {
          explanation,
          rationales: rationales([verb, ...wrongs], verb, explanation, (choice) => `"${choice} ${object}" is not the natural phrase for this meaning here.`)
        }
      );
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
      const entry = pick(phrasal[level], i);
      const c = row(i);
      const sentence = contextualMeaningSentence(fill(entry[2], c), c, i);
      const distractors = rotatedOtherEntries(phrasal[level], entry[1], i);
      return makeItem(
        `What does "${entry[0]}" mean in this sentence? ${sentence}`,
        [entry[1], ...distractors.map((choice) => choice[1])],
        entry[1],
        `phrasal:${level}:${entry[0]}`,
        "",
        {
          explanation: `In this sentence, "${entry[0]}" means "${entry[1]}": ${sentence}`,
          rationales: meaningRationales(entry[0], entry[1], distractors, sentence)
        }
      );
    }

    const wordForms = {
      A1: [
        ["teach", "teacher", "The ___ helped the class.", ["teach", "teaches", "taught"]],
        ["work", "worker", "Each ___ needs a badge.", ["work", "works", "working"]],
        ["write", "writer", "The ___ signed the book.", ["write", "writes", "written"]],
        ["drive", "driver", "The ___ stopped the bus.", ["drive", "drives", "driven"]],
        ["visit", "visitor", "One ___ asked a question.", ["visit", "visits", "visited"]]
      ],
      A2: [
        ["explain", "explanation", "The teacher gave a clear ___.", ["explain", "explained", "explaining"]],
        ["decide", "decision", "The final ___ was difficult.", ["decide", "decided", "deciding"]],
        ["invite", "invitation", "The office sent an ___.", ["invite", "invited", "inviting"]],
        ["pay", "payment", "The ___ arrived yesterday.", ["pay", "paid", "paying"]],
        ["improve", "improvement", "The report showed clear ___.", ["improve", "improved", "improving"]]
      ],
      B1: [
        ["accurate", "accuracy", "The ___ of the number matters.", ["accurate", "accurately", "inaccurate"]],
        ["confident", "confidence", "Practice builds ___.", ["confident", "confidently", "confide"]],
        ["possible", "possibility", "The team discussed one ___.", ["possible", "possibly", "possibilities"]],
        ["responsible", "responsibility", "Each worker has a ___.", ["responsible", "responsibly", "responsibilities"]],
        ["successful", "success", "The project was a ___.", ["successful", "successfully", "succeed"]]
      ],
      B2: [
        ["analyze", "analysis", "The ___ took two weeks.", ["analyze", "analytical", "analyzing"]],
        ["participate", "participation", "The course requires regular ___.", ["participate", "participant", "participating"]],
        ["calculate", "calculation", "The ___ was incorrect.", ["calculate", "calculated", "calculating"]],
        ["approve", "approval", "The plan needs official ___.", ["approve", "approved", "approving"]],
        ["compare", "comparison", "The ___ was useful.", ["compare", "comparative", "comparing"]]
      ],
      C1: [
        ["valid", "validity", "The study questioned the test's ___.", ["valid", "validly", "validate"]],
        ["relevant", "relevance", "The teacher explained the detail's ___.", ["relevant", "relevantly", "relate"]],
        ["coherent", "coherence", "The essay lacked ___.", ["coherent", "coherently", "cohere"]],
        ["efficient", "efficiency", "The process's ___ improved after the change.", ["efficient", "efficiently", "expedite"]],
        ["consistent", "consistency", "The data showed strong ___.", ["consistent", "consistently", "consisting"]]
      ],
      C2: [
        ["ambiguous", "ambiguity", "The wording created ___.", ["ambiguous", "ambiguously", "ambiguate"]],
        ["imply", "implication", "The result has one practical ___.", ["imply", "implied", "implying"]],
        ["derive", "derivation", "The article explains the term's ___.", ["derive", "derived", "deriving"]],
        ["assume", "assumption", "The model depends on that ___.", ["assume", "assumed", "assuming"]],
        ["infer", "inference", "The final ___ was too strong.", ["infer", "inferred", "inferring"]]
      ]
    };

    function wordFormItem(level, i) {
      const [base, answer, sentence, distractors] = pick(wordForms[level], i);
      const c = row(i);
      const wrongs = distractors.filter((choice) => choice !== answer).slice(0, 3);
      const text = addSurfaceLead(fill(sentence, c), level, i);
      const explanation = `The sentence needs "${answer}", the word-family form that fits this position. The completed sentence is: ${completedSentence(text, answer)}`;
      return makeItem(
        text,
        [answer, ...wrongs],
        answer,
        `word-form:${level}:${base}`,
        "",
        {
          explanation,
          rationales: rationales([answer, ...wrongs], answer, explanation, (choice) => `"${choice}" is related to "${base}", but it does not fit the grammar of this sentence.`)
        }
      );
    }

    const transitions = {
      A1: [
        ["because", "shows a reason", "{person} stayed home because it rained.", ["shows a result", "adds another idea", "shows the next time"]],
        ["and", "adds another idea", "{person} read and wrote.", ["shows a reason", "shows a result", "shows a different idea"]],
        ["but", "shows a different idea", "The room was small but clean.", ["shows a reason", "adds another idea", "shows the next time"]],
        ["so", "shows a result", "It rained, so we stayed inside.", ["shows a reason", "adds another idea", "shows a different idea"]],
        ["then", "shows the next time", "{person} ate lunch, then studied.", ["shows a reason", "adds another idea", "shows a different idea"]]
      ],
      A2: [
        ["however", "shows contrast", "The class was hard; however, it was useful.", ["shows a result", "introduces an example", "adds information"]],
        ["therefore", "shows a result", "The form was late; therefore, it was returned.", ["shows contrast", "introduces an example", "shows a replacement"]],
        ["for example", "introduces an example", "Bring ID, for example, a passport.", ["shows contrast", "shows a result", "shows a replacement"]],
        ["also", "adds information", "The course is cheap and also practical.", ["shows a result", "shows contrast", "shows a replacement"]],
        ["instead", "shows a replacement", "The room was full, so we met outside instead.", ["adds information", "shows a result", "introduces an example"]]
      ],
      B1: [
        ["although", "shows contrast", "Although it rained, the class continued.", ["shows a reason", "means if not", "means immediately after"]],
        ["unless", "means if not", "Unless the office calls, the meeting is on.", ["shows a reason", "shows contrast", "means immediately after"]],
        ["while", "shows two actions happening at the same time", "While {person} checked the file, {other} answered questions.", ["shows a reason", "means if not", "shows a result"]],
        ["since", "shows a reason", "Since the form was missing, the office called.", ["shows contrast", "means if not", "means immediately after"]],
        ["as soon as", "means immediately after", "Call me as soon as the file arrives.", ["shows a reason", "means if not", "shows contrast"]]
      ],
      B2: [
        ["nevertheless", "shows contrast despite what came before", "The sample was small; nevertheless, the result was useful.", ["shows an effect", "shows another action at the same time", "means if not"]],
        ["in contrast", "shows a difference", "Costs fell; in contrast, delays increased.", ["shows an effect", "shows another action at the same time", "means if not"]],
        ["as a result", "shows an effect", "The form was clearer; as a result, errors fell.", ["shows contrast", "shows a difference", "means if not"]],
        ["meanwhile", "shows another action at the same time", "The team revised the form; meanwhile, the office trained staff.", ["shows an effect", "shows a difference", "means if not"]],
        ["otherwise", "means if not", "Submit the file today; otherwise, it will be late.", ["shows an effect", "shows a difference", "shows another action at the same time"]]
      ],
      C1: [
        ["whereas", "compares two different facts", "The first plan saves money, whereas the second saves time.", ["means only if", "shows a result", "adds a concession"]],
        ["provided that", "means only if", "The trip will continue provided that the weather improves.", ["compares two different facts", "shows a result", "adds a concession"]],
        ["consequently", "shows a result", "Demand increased; consequently, prices rose.", ["compares two different facts", "means only if", "adds a concession"]],
        ["nonetheless", "adds a concession", "The evidence is limited; nonetheless, it is useful.", ["means only if", "shows a result", "compares two different facts"]],
        ["by contrast", "introduces a clear difference", "The old form was long; by contrast, the new one is brief.", ["means only if", "shows a result", "adds a concession"]]
      ],
      C2: [
        ["notwithstanding", "despite", "Notwithstanding the delay, the project succeeded.", ["because of that", "therefore", "only if"]],
        ["inasmuch as", "to the extent that", "The plan is fair inasmuch as it treats all groups equally.", ["despite", "therefore", "to avoid the risk that"]],
        ["thereby", "by doing that", "The new rule reduced errors, thereby saving time.", ["despite", "only if", "to avoid the risk that"]],
        ["hence", "therefore", "The figures were incomplete; hence, the cautious conclusion.", ["despite", "only if", "to avoid the risk that"]],
        ["lest", "to avoid the risk that", "The files were checked twice lest errors remain.", ["because of that", "therefore", "despite"]]
      ]
    };

    function transitionItem(level, i) {
      const entry = pick(transitions[level], i);
      const [word, meaning, sample, wrongMeanings] = entry;
      const c = row(i);
      const sentence = contextualMeaningSentence(fill(sample, c), c, i);
      const explanation = `"${word}" ${meaning} in this sentence: ${sentence}`;
      return makeItem(
        `What does "${word}" do in this sentence? ${sentence}`,
        [meaning, ...wrongMeanings],
        meaning,
        `transition:${level}:${word}`,
        "",
        {
          explanation,
          rationales: rationales([meaning, ...wrongMeanings], meaning, explanation, (choice) => `"${choice}" is a real text function, but it is not the job of "${word}" in this sentence.`)
        }
      );
    }

    function registerItem(level, i) {
      const c = row(i);
      const formal = {
        A1: `Please sit down in the ${c.place}.`,
        A2: `Please send the ${c.thing} by Friday.`,
        B1: `Could you please confirm the details of the ${c.thing}?`,
        B2: `Please let me know whether further information about the ${c.thing} is required.`,
        C1: `We apologize for any inconvenience caused by the delay in the ${c.thing}.`,
        C2: `The attached document provides a concise summary of the revised ${c.thing}.`
      }[level];
      const wrongs = {
        A1: [`Sit down in the ${c.place} now.`, `You need to sit in the ${c.place}, okay?`, `Go sit over there in the ${c.place}.`],
        A2: [`Send the ${c.thing} by Friday, okay?`, `I need the ${c.thing}, so send it by Friday.`, `Get the ${c.thing} to me sometime Friday.`],
        B1: [`Tell me the ${c.thing} details soon.`, `Can you say what is going on with the ${c.thing}?`, `I need you to confirm the ${c.thing}.`],
        B2: [`Tell me if you need more stuff for the ${c.thing}.`, `Send whatever else you need about the ${c.thing}.`, `I need to know if the ${c.thing} needs things.`],
        C1: [`Sorry the ${c.thing} is late and caused trouble.`, `The late ${c.thing} was unfortunate, but these things happen.`, `We know the ${c.thing} delay was annoying.`],
        C2: [`The attached file gives a quick look at the changed ${c.thing}.`, `Here is the new ${c.thing} stuff in short form.`, `This attachment says what got changed in the ${c.thing}.`]
      }[level];
      const options = [formal, ...wrongs].map((option) => addSurfaceLead(option, level, i));
      const answer = options[0];
      const explanation = `The keyed sentence is polite, precise, and appropriate for formal writing: ${answer}`;
      return makeItem(
        "Which sentence is best for a formal message?",
        options,
        answer,
        `register:${level}:${i}`,
        "",
        {
          explanation,
          rationales: rationales(options, answer, explanation, () => "This sentence is understandable, but it is too casual, too blunt, or too vague for a formal message.")
        }
      );
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
      const wrongs = {
        A1: [`This answer about the ${c.thing} is definitely correct.`, `This answer about the ${c.thing} must be correct.`, `This answer about the ${c.thing} is correct for every question.`],
        A2: [`The new ${c.thing} will help all students.`, `The new ${c.thing} proves that every student improves.`, `The new ${c.thing} is always the best solution.`],
        B1: [`The survey about the ${c.thing} proves that reminders improve attendance.`, `The survey about the ${c.thing} shows that reminders are the only factor.`, `The survey about the ${c.thing} guarantees better attendance.`],
        B2: [`The data about the ${c.thing} prove that clearer forms reduce errors.`, `The data about the ${c.thing} show that unclear forms are the only cause of errors.`, `The data about the ${c.thing} guarantee that errors will disappear.`],
        C1: [`The results for the ${c.thing} prove that practice causes better performance.`, `The results for the ${c.thing} eliminate every alternative explanation.`, `The results for the ${c.thing} show a universal law about learning.`],
        C2: [`The available evidence about the ${c.thing} proves a decisive training effect.`, `The available evidence about the ${c.thing} leaves no meaningful uncertainty.`, `The available evidence about the ${c.thing} establishes that the training always works.`]
      }[level];
      const options = [careful, ...wrongs].map((option) => addSurfaceLead(option, level, i));
      const answer = options[0];
      const explanation = `The keyed sentence makes a careful claim and leaves room for uncertainty: ${answer}`;
      return makeItem(
        "Which sentence is careful and not too strong?",
        options,
        answer,
        `hedging:${level}:${i}`,
        "",
        {
          explanation,
          rationales: rationales(options, answer, explanation, () => "This choice overstates the evidence by using absolute language such as proves, every, only, always, or no uncertainty.")
        }
      );
    }

    function discourseItem(level, i) {
      const c = row(i);
      const peopleGroup = pick(["students", "workers", "visitors", "parents", "applicants"], i);
      const discourseSets = {
        A1: [
          [
            `Read this note: "Bring one item to class. For example, bring the ${c.thing} from yesterday." What does the second sentence do?`,
            "It gives an example.",
            ["It gives the final answer.", "It asks a question.", "It changes the topic."]
          ],
          [
            `Read this note: "The class moved inside because it was raining." What does the because part do?`,
            "It gives a reason.",
            ["It gives an example.", "It asks for a name.", "It shows the next step."]
          ],
          [
            `Read this note: "First write your name. Then open the ${c.thing}." What does the second sentence do?`,
            "It gives the next step.",
            ["It gives a reason.", "It describes a person.", "It says the task is finished."]
          ],
          [
            `Read this note: "Use a pencil or a blue pen." What does the word or do?`,
            "It gives another choice.",
            ["It gives a reason.", "It shows a problem.", "It gives an example."]
          ],
          [
            `Read this note: "The office is upstairs. It is next to the ${c.place}." What does the second sentence do?`,
            "It gives more place information.",
            ["It asks a question.", "It gives a reason.", "It changes the time."]
          ]
        ],
        A2: [
          [
            `Read this note: "The office changed the ${c.thing} because many students were confused." What does the because part do?`,
            "It gives a reason.",
            ["It gives an example.", "It shows a contrast.", "It asks for advice."]
          ],
          [
            `Read this note: "The ${c.thing} is short, but it has several difficult questions." What does but show?`,
            "It shows a contrast.",
            ["It gives a time.", "It introduces a definition.", "It lists the next step."]
          ],
          [
            `Read this note: "Bring photo ID, such as a passport or student card." What does such as do?`,
            "It introduces examples.",
            ["It explains a cause.", "It shows a warning.", "It gives an opposite idea."]
          ],
          [
            `Read this note: "The room was full, so the class met online." What does so show?`,
            "It shows a result.",
            ["It gives a choice.", "It introduces a quote.", "It describes a person."]
          ],
          [
            `Read this note: "Please read the guide before you sign the ${c.thing}." What does before show?`,
            "It shows time order.",
            ["It gives a reason.", "It adds a contrast.", "It gives an example."]
          ]
        ],
        B1: [
          [
            `Read this sentence: "Only a few ${peopleGroup} at the ${c.place} answered the survey." What problem does it show?`,
            "The sample may be too small.",
            ["The survey question was translated badly.", "The results prove the program worked.", "The topic changed halfway through."]
          ],
          [
            `Read this sentence: "All responses came from morning classes." What problem does it show?`,
            "One group may be overrepresented.",
            ["The results include every possible group.", "The questions were written too simply.", "The report gives no topic."]
          ],
          [
            `Read this sentence: "Several students skipped the final question." What problem does it show?`,
            "Some data may be missing.",
            ["The answer choices were all correct.", "The sample was too large.", "The conclusion is certainly true."]
          ],
          [
            `Read this sentence: "The survey asked whether the class was good." What problem does it show?`,
            "The question may be too vague.",
            ["The question gives too much detail.", "The survey has no respondents.", "The result proves the class failed."]
          ],
          [
            `Read this sentence: "The report compares scores from only one week." What problem does it show?`,
            "The time period may be too short.",
            ["The report uses too many years of data.", "The scores are not numbers.", "The topic changed to attendance."]
          ]
        ],
        B2: [
          [
            `Read this sentence: "The ${c.thing} saved time, but it also created extra work for staff." What does the sentence do?`,
            "It compares an advantage and a disadvantage.",
            ["It defines a technical term.", "It gives instructions in order.", "It reports only a positive result."]
          ],
          [
            `Read this sentence: "Unlike the old form, the new version asks for an email address first." What does unlike show?`,
            "It compares two versions.",
            ["It gives the cause of an error.", "It shows that both versions are identical.", "It introduces an unrelated example."]
          ],
          [
            `Read this sentence: "A valid response means an answer submitted before the deadline." What does the sentence do?`,
            "It defines a term.",
            ["It reports a disadvantage.", "It rejects the whole study.", "It gives a future prediction."]
          ],
          [
            `Read this sentence: "Because the instructions were clearer, fewer applicants called the office." What does the first part do?`,
            "It explains a likely cause.",
            ["It gives an exception.", "It lists two equal choices.", "It changes the topic."]
          ],
          [
            `Read this sentence: "Although the class was popular, the evening section had low attendance." What does although show?`,
            "It adds a contrasting fact.",
            ["It proves the class was ineffective.", "It gives the next step in a process.", "It defines attendance."]
          ]
        ],
        C1: [
          [
            `Read this claim: "The results for the ${c.thing} are promising; however, the sample was small." What does the second part do?`,
            "It qualifies the claim by adding a limitation.",
            ["It repeats the claim in simpler words.", "It gives an unrelated example.", "It proves that the claim is false."]
          ],
          [
            `Read this claim: "The policy appears effective if the attendance records are complete." What does the if part do?`,
            "It states a condition for the claim.",
            ["It removes every uncertainty.", "It summarizes the conclusion only.", "It introduces a new topic."]
          ],
          [
            `Read this sentence: "The increase may reflect better reminders rather than stronger motivation." What does rather than do?`,
            "It offers an alternative explanation.",
            ["It confirms the first explanation completely.", "It gives a step-by-step instruction.", "It reports an exact definition."]
          ],
          [
            `Read this sentence: "This finding applies mainly to adult learners in evening classes." What does mainly do?`,
            "It narrows the scope of the finding.",
            ["It makes the finding universal.", "It gives a reason for the method.", "It denies that the finding exists."]
          ],
          [
            `Read this sentence: "The interview data support the survey results, but they do not explain the cause." What does the second part do?`,
            "It separates support from explanation.",
            ["It claims the data are useless.", "It gives a personal opinion.", "It changes the subject to cost."]
          ]
        ],
        C2: [
          [
            `Read this comment: "Some critics call the ${c.thing} unfair; the stronger question is whether the evidence supports that criticism." What does the second part do?`,
            "It reframes the objection as a question about evidence.",
            ["It concedes that the criticism is certainly true.", "It dismisses the objection as irrelevant.", "It summarizes the history of the disagreement."]
          ],
          [
            `Read this comment: "The correlation is clear; whether it reflects causation remains unresolved." What does the second clause do?`,
            "It distinguishes association from cause.",
            ["It treats correlation and causation as identical.", "It gives a procedural instruction.", "It abandons the topic."]
          ],
          [
            `Read this comment: "Granted, the sample is unusually narrow; nevertheless, the pattern is worth testing elsewhere." What does nevertheless do?`,
            "It moves from concession to cautious continuation.",
            ["It rejects the limitation as false.", "It gives a dictionary definition.", "It claims the result is universal."]
          ],
          [
            `Read this comment: "The term engagement is used broadly here, which makes the result harder to interpret." What does the which clause do?`,
            "It explains the effect of a broad definition.",
            ["It supplies a second example of engagement.", "It reports that the term is precise.", "It changes the subject to cost."]
          ],
          [
            `Read this comment: "The conclusion may hold for this cohort, but extrapolating beyond it would require more evidence." What does the but part do?`,
            "It limits how far the conclusion can be extended.",
            ["It proves the conclusion is false.", "It replaces evidence with opinion.", "It repeats the same claim."]
          ]
        ]
      }[level];
      const [text, answer, wrongs] = pick(discourseSets, i);
      const options = [answer, ...wrongs];
      const explanation = `${answer} That is the role of the highlighted part in the short text.`;
      return makeItem(
        addPromptLead(text, level, i),
        options,
        answer,
        `discourse:${level}:${i}`,
        "",
        {
          explanation,
          rationales: rationales(options, answer, explanation, () => "This describes a possible text function, but it is not what the quoted part is doing here.")
        }
      );
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
