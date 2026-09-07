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

    function upperFirst(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
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

    function lowerAfterLead(text) {
      if (/^(I|I'm|I'll|I'd)\b/.test(text)) return text;
      if (people.some((name) => new RegExp(`^${name}(?:\\b|'s\\b)`).test(text))) return text;
      if (/^(Maya|Ben|Nora|Kai|Tom|Aya|Sam)(?:\b|'s\b)/.test(text)) return text;
      return lowerFirst(text);
    }

    const sentenceDetails = {
      A1: [
        "for picture day",
        "near the blue door",
        "after breakfast",
        "on the first page",
        "beside the window",
        "before the bus arrives",
        "during morning practice",
        "at the small table",
        "in the front row",
        "before the bell rings",
        "after the short song",
        "beside the coat rack",
        "during the spelling game",
        "near the lunch boxes",
        "on the classroom shelf",
        "before story time",
        "after the first exercise",
        "by the red chair",
        "during the warm-up",
        "near the teacher's desk"
      ],
      A2: [
        "for the evening course",
        "near the reception desk",
        "before the train leaves",
        "on the registration page",
        "after the phone call",
        "during the travel lesson",
        "for the weekend trip",
        "beside the printer",
        "before the interview",
        "on the student portal",
        "after the reminder email",
        "during the workshop",
        "for the online task",
        "at the language center",
        "before the review quiz",
        "on the class website",
        "after reading the guide",
        "near the office door",
        "during pair practice",
        "before submitting the form"
      ],
      B1: [
        "for the orientation group",
        "during the staff meeting",
        "before the client call",
        "in the course update",
        "after the schedule change",
        "during the safety briefing",
        "for the department update",
        "before the application review",
        "in the weekly summary",
        "after the survey closed",
        "during the planning discussion",
        "for the supervisor's email",
        "before the team review",
        "in the student handbook",
        "after the policy reminder",
        "during the support call",
        "for the training session",
        "before filing the documents",
        "in the project checklist",
        "after the tutor's explanation"
      ],
      B2: [
        "for the audit file",
        "during the policy review",
        "before the budget meeting",
        "in the manager's briefing",
        "after the complaint review",
        "during the data check",
        "for the training portal",
        "before signing the contract",
        "in the customer update",
        "after the planning call",
        "during the hiring process",
        "for the project dashboard",
        "before the board discussion",
        "on the revised procedure",
        "after the service report",
        "during the operations review",
        "for the quarterly summary",
        "before the compliance check",
        "in the evaluation memo",
        "after the final interview"
      ],
      C1: [
        "for the committee review",
        "in the methodology section",
        "during the stakeholder meeting",
        "before issuing the recommendation",
        "after comparing the evidence",
        "during the compliance review",
        "on the evaluation form",
        "after the pilot program",
        "before publishing the findings",
        "in the grant application",
        "during the seminar discussion",
        "on the risk assessment",
        "after coding the interviews",
        "before the final vote",
        "in the appendix note",
        "for the advisory brief",
        "during the protocol review",
        "on the evidence table",
        "before the policy draft",
        "in the assessment rubric"
      ],
      C2: [
        "in the legal memorandum",
        "during the evidentiary hearing",
        "before the arbitration panel meets",
        "in the fiduciary briefing",
        "after the methodological critique",
        "before the precedent is cited",
        "in the interpretive framework",
        "during the appellate review",
        "in the technical memorandum",
        "after the objections are synthesized",
        "before the caveat is removed",
        "in the published corrigendum",
        "during the ethics review",
        "on the counterargument table",
        "before the final adjudication",
        "in the statutory analysis",
        "during expert testimony",
        "in the compliance addendum",
        "after the longitudinal model is revised",
        "before the ruling is issued"
      ]
    };

    const sentenceTails = {
      A1: [
        "today",
        "in class",
        "after lunch",
        "at school",
        "this morning",
        "before class",
        "near the door",
        "at home",
        "on Monday",
        "in the kitchen",
        "after school",
        "by the window",
        "before dinner",
        "at the park",
        "on the bus",
        "in the hallway",
        "with the teacher",
        "before the bell",
        "during the lesson",
        "at the front"
      ],
      A2: [
        "for the evening course",
        "at the front desk",
        "before registration",
        "on the class website",
        "after the phone call",
        "during the travel lesson",
        "for the weekend trip",
        "near the printer",
        "before the interview",
        "on the student portal",
        "after the reminder email",
        "during the workshop",
        "for the online task",
        "at the language center",
        "before the review quiz",
        "on the notice board",
        "after reading the guide",
        "near the office door",
        "during pair practice",
        "before the form is submitted"
      ],
      B1: [
        "for the orientation group",
        "during the staff meeting",
        "before the client call",
        "in the course update",
        "after the schedule change",
        "during the safety briefing",
        "for the department update",
        "before the application review",
        "in the weekly summary",
        "after the survey closed",
        "during the planning discussion",
        "in the supervisor's email",
        "before the team review",
        "in the student handbook",
        "after the policy reminder",
        "during the support call",
        "for the training session",
        "before the documents are filed",
        "in the project checklist",
        "after the tutor's explanation"
      ],
      B2: [
        "for the audit file",
        "during the policy review",
        "before the budget meeting",
        "in the manager's briefing",
        "after the complaint review",
        "during the data check",
        "for the training portal",
        "before the contract is signed",
        "in the customer update",
        "after the planning call",
        "during the hiring process",
        "for the project dashboard",
        "before the board discussion",
        "under the revised procedure",
        "after the service report",
        "during the operations review",
        "for the quarterly summary",
        "before the compliance check",
        "in the evaluation memo",
        "after the final interview"
      ],
      C1: [
        "for the committee review",
        "in the methodology section",
        "during the stakeholder meeting",
        "before the recommendation is issued",
        "after the evidence is compared",
        "during the compliance review",
        "on the evaluation form",
        "after the pilot program",
        "before the findings are published",
        "in the grant application",
        "during the seminar discussion",
        "on the risk assessment",
        "after the interviews are coded",
        "before the final vote",
        "in the appendix note",
        "for the advisory brief",
        "during the protocol review",
        "on the evidence table",
        "before the policy draft",
        "in the assessment rubric"
      ],
      C2: [
        "in the legal memorandum",
        "during the evidentiary hearing",
        "before the arbitration panel meets",
        "in the fiduciary briefing",
        "after the methodological critique",
        "before the precedent is cited",
        "in the interpretive framework",
        "during the appellate review",
        "in the technical memorandum",
        "after the objections are synthesized",
        "before the caveat is removed",
        "in the published corrigendum",
        "during the ethics review",
        "on the counterargument table",
        "before the final adjudication",
        "in the statutory analysis",
        "during expert testimony",
        "in the compliance addendum",
        "after the longitudinal model is revised",
        "before the ruling is issued"
      ]
    };

    function sentenceDetail(level, index) {
      return pick(sentenceDetails[level] || sentenceDetails.B1, index);
    }

    function sentenceTail(level, index) {
      return pick(sentenceTails[level] || sentenceTails.B1, index);
    }

    function appendSentenceTail(text, level, index) {
      const tail = sentenceTail(level, index);
      return ensurePeriod(text).replace(/([.!?])$/, ` ${tail}$1`);
    }

    function addSentenceDetail(text, level, index) {
      return appendSentenceTail(text, level, index);
    }

    function addPromptLead(text, level, index) {
      if (!text) return text;
      return `${pick(surfaceLeads[level] || surfaceLeads.A2, index)}, ${lowerAfterLead(text)}`;
    }

    function escapeRegExp(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function hasChangingDetail(text, index) {
      const c = row(index);
      return [c.person, c.other, c.team]
        .filter(Boolean)
        .some((value) => new RegExp(`\\b${escapeRegExp(value)}\\b`, "i").test(text));
    }

    function personalizeStaticBlank(text, level, index) {
      if (!text.includes("___") || hasChangingDetail(text, index)) return text;
      const replacements = [
        [/\bthe test\b/i, ["the spelling test", "the listening test", "the grammar test", "the reading test", "the placement test", "the midterm test", "the vocabulary test", "the online test", "the short test", "the entrance test", "the practice test", "the end-of-unit test", "the speaking test", "the weekly test", "the timed test", "the writing test", "the review test", "the final test", "the sample test", "the comprehension test"]],
        [/\bthe quiz\b/i, ["the warm-up quiz", "the chapter quiz", "the listening quiz", "the reading quiz", "the grammar quiz", "the vocabulary quiz", "the placement quiz", "the review quiz", "the online quiz", "the Friday quiz", "the practice quiz", "the exit quiz", "the diagnostic quiz", "the timed quiz", "the short quiz", "the end-of-week quiz", "the pronunciation quiz", "the writing quiz", "the comprehension quiz", "the final quiz"]],
        [/\bthe office\b/i, ["the front office", "the school office", "the housing office", "the clinic office", "the campus office", "the admissions office", "the records office", "the travel office", "the testing office", "the evening office", "the finance office", "the registrar's office", "the program office", "the language office", "the support office", "the reception office", "the training office", "the local office", "the department office", "the main office"]],
        [/\bthe committee\b/i, ["the review committee", "the planning committee", "the admissions committee", "the curriculum committee", "the safety committee", "the hiring committee", "the scholarship committee", "the appeals committee", "the ethics committee", "the budget committee", "the language committee", "the policy committee", "the research committee", "the assessment committee", "the oversight committee", "the advisory committee", "the examination committee", "the standards committee", "the disciplinary committee", "the steering committee"]],
        [/\bthe review\b/i, ["the file review", "the annual review", "the document review", "the safety review", "the budget review", "the course review", "the policy review", "the evidence review", "the application review", "the external review", "the legal review", "the final review", "the internal review", "the curriculum review", "the compliance review", "the audit review", "the method review", "the ethics review", "the peer review", "the technical review"]],
        [/\bthe appendix\b/i, ["the technical appendix", "the statistical appendix", "the legal appendix", "the methodological appendix", "the data appendix", "the policy appendix", "the evidentiary appendix", "the research appendix", "the final appendix", "the published appendix", "the supplementary appendix", "the explanatory appendix", "the archival appendix", "the comparative appendix", "the compliance appendix", "the assessment appendix", "the procedural appendix", "the interpretive appendix", "the empirical appendix", "the revised appendix"]],
        [/\bthe notice\b/i, ["the hallway notice", "the class notice", "the safety notice", "the office notice", "the entrance notice", "the registration notice", "the bus notice", "the online notice", "the clinic notice", "the library notice", "the workshop notice", "the travel notice", "the housing notice", "the evening notice", "the deadline notice", "the testing notice", "the visitor notice", "the schedule notice", "the update notice", "the reminder notice"]],
        [/\bthe form\b/i, ["the registration form", "the application form", "the refund form", "the consent form", "the travel form", "the housing form", "the clinic form", "the online form", "the printed form", "the renewal form", "the course form", "the payroll form", "the complaint form", "the transfer form", "the safety form", "the tax form", "the intake form", "the visa form", "the permission form", "the appeal form"]],
        [/\bthe report\b/i, ["the attendance report", "the budget report", "the safety report", "the survey report", "the research report", "the progress report", "the audit report", "the training report", "the incident report", "the quarterly report", "the evaluation report", "the inspection report", "the policy report", "the field report", "the annual report", "the final report", "the compliance report", "the financial report", "the statistical report", "the draft report"]],
        [/\bthe manager\b/i, ["the branch manager", "the program manager", "the office manager", "the training manager", "the shift manager", "the project manager", "the hiring manager", "the service manager", "the finance manager", "the clinic manager", "the store manager", "the regional manager", "the department manager", "the operations manager", "the records manager", "the safety manager", "the event manager", "the payroll manager", "the support manager", "the facilities manager"]],
        [/\bthe teacher\b/i, ["the English teacher", "the evening teacher", "the substitute teacher", "the writing teacher", "the reading teacher", "the grammar teacher", "the class teacher", "the lead teacher", "the online teacher", "the new teacher", "the senior teacher", "the pronunciation teacher", "the test-prep teacher", "the morning teacher", "the science teacher", "the art teacher", "the math teacher", "the music teacher", "the language teacher", "the history teacher"]],
        [/\bthe class\b/i, ["the morning class", "the evening class", "the writing class", "the reading class", "the grammar class", "the online class", "the beginner class", "the pronunciation class", "the Saturday class", "the exam-prep class", "the conversation class", "the small class", "the mixed-level class", "the summer class", "the skills class", "the adult class", "the placement class", "the first class", "the final class", "the workshop class"]]
      ];
      for (const [pattern, variants] of replacements) {
        if (pattern.test(text)) {
          const replaced = text.replace(pattern, pick(variants, index));
          return /^[A-Z]/.test(text) && /^[a-z]/.test(replaced) ? upperFirst(replaced) : replaced;
        }
      }

      return addSentenceDetail(text, level, index);
    }

    function individualizeBlankChoice(choice, level, index) {
      if (!Array.isArray(choice) || typeof choice[0] !== "string" || !choice[0].includes("___")) return choice;
      return [personalizeStaticBlank(choice[0], level, index), choice[1], choice[2], choice[3]];
    }

    function levelIndexFromFocusKey(focusKey) {
      const match = String(focusKey || "").match(/:([ABC][12]):(\d+)$/i);
      if (!match) return null;
      return { level: match[1].toUpperCase(), index: Number(match[2]) };
    }

    function sentenceChoice(prompt, correct, wrongs, focusKey = "") {
      const position = levelIndexFromFocusKey(focusKey);
      if (!position || /bespoke/i.test(focusKey)) return makeItem(prompt, [correct, ...wrongs], correct, focusKey);
      const options = [correct, ...wrongs].map((option) => addSentenceDetail(option, position.level, position.index));
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
      const indefiniteA = ["a", "an", "many", "(nothing)"];
      const indefiniteAn = ["an", "a", "many", "(nothing)"];
      const definite = ["the", "a", "an", "(nothing)"];
      const definiteStart = ["The", "A", "An", "(nothing)"];
      const zero = ["(nothing)", "the", "a", "an"];
      const zeroStart = ["(nothing)", "The", "A", "An"];
      const sets = {
        A1: [
          ["For picture day, please bring ___ photo.", indefiniteA, "a"],
          ["I need ___ eraser for this page.", indefiniteAn, "an"],
          ["___ door is open; please close it.", definiteStart, "The"],
          ["We drink ___ water after practice.", zeroStart, "(nothing)"],
          ["Carlos has ___ notebook in his bag.", indefiniteA, "a"],
          ["There is ___ apple beside the lunch box.", indefiniteAn, "an"],
          ["___ bus outside is full.", definiteStart, "The"],
          ["Children like ___ music in the morning.", zero, "(nothing)"],
          ["Aiko found ___ key on the floor.", indefiniteA, "a"],
          ["Please take ___ umbrella if it rains.", indefiniteAn, "an"],
          ["___ pencil on your desk is mine.", definiteStart, "The"],
          ["We need ___ rice for lunch.", zeroStart, "(nothing)"],
          ["Nadia drew ___ picture of her house.", indefiniteA, "a"],
          ["Omar saw ___ elephant at the zoo.", indefiniteAn, "an"],
          ["___ window near Lena is closed.", definiteStart, "The"],
          ["Students read ___ books after lunch.", zeroStart, "(nothing)"],
          ["Hana wants ___ sandwich after class.", indefiniteA, "a"],
          ["Jonas needs ___ ID card for the library.", indefiniteAn, "an"],
          ["___ clock above the board is slow.", definiteStart, "The"],
          ["I like ___ tea with breakfast.", zeroStart, "(nothing)"]
        ],
        A2: [
          ["I bought a new car. ___ car is red.", definiteStart, "The"],
          ["Lena sent ___ email to the office.", indefiniteAn, "an"],
          ["The school hired ___ new tutor.", indefiniteA, "a"],
          ["___ Training starts at nine tomorrow.", zeroStart, "(nothing)"],
          ["Please upload ___ application before Friday.", indefiniteAn, "an"],
          ["We stayed in a small hotel. ___ hotel was near the station.", definiteStart, "The"],
          ["Mina needs ___ passport for the trip.", indefiniteA, "a"],
          ["Carlos waited for ___ hour outside the clinic.", indefiniteAn, "an"],
          ["___ information on this page is old.", definiteStart, "The"],
          ["Nurses need ___ patience with nervous patients.", zero, "(nothing)"],
          ["There is ___ useful map near the entrance.", indefiniteA, "a"],
          ["Sofia left ___ umbrella near the window.", indefiniteAn, "an"],
          ["___ printer by the door is broken.", definiteStart, "The"],
          ["I study ___ English after work.", zeroStart, "(nothing)"],
          ["The office gave me ___ receipt.", indefiniteA, "a"],
          ["Aiko chose ___ online course.", indefiniteAn, "an"],
          ["___ address on the form is wrong.", definiteStart, "The"],
          ["We need ___ advice before choosing.", zeroStart, "(nothing)"],
          ["The teacher asked for ___ short answer.", indefiniteA, "a"],
          ["They opened ___ account yesterday.", indefiniteAn, "an"]
        ],
        B1: [
          ["___ Reports can help new students understand the course.", zeroStart, "(nothing)"],
          ["The tutor gave ___ useful explanation before the quiz.", indefiniteA, "a"],
          ["Aiko sent ___ email about the schedule change.", indefiniteAn, "an"],
          ["___ information in this file is confidential.", definiteStart, "The"],
          ["The office requested ___ additional evidence before approving the form.", zero, "(nothing)"],
          ["___ Students in the evening class often need extra practice.", zeroStart, "(nothing)"],
          ["The guide includes ___ clear example of the rule.", indefiniteA, "a"],
          ["Rina wrote ___ honest apology after the mistake.", indefiniteAn, "an"],
          ["___ schedule for tomorrow is on the wall.", definiteStart, "The"],
          ["We discussed ___ housing after the meeting.", zero, "(nothing)"],
          ["The manager made ___ difficult decision.", indefiniteA, "a"],
          ["The file contains ___ old invoice.", indefiniteAn, "an"],
          ["___ answer at the bottom is correct.", definiteStart, "The"],
          ["Researchers need ___ reliable data.", zero, "(nothing)"],
          ["Omar found ___ broken printer in the lab.", indefiniteA, "a"],
          ["The clinic has ___ emergency exit beside the stairs.", indefiniteAn, "an"],
          ["___ students who missed the test must call the office.", definiteStart, "The"],
          ["I need ___ feedback on this draft.", zeroStart, "(nothing)"],
          ["The report gives ___ useful summary of the interviews.", indefiniteA, "a"],
          ["Lena noticed ___ unusual error in the totals.", indefiniteAn, "an"]
        ],
        B2: [
          ["This is ___ most useful form in the packet.", definite, "the"],
          ["Carlos made ___ unusually careful comparison of the two schedules.", indefiniteAn, "an"],
          ["The committee needs ___ clearer policy before the program expands.", indefiniteA, "a"],
          ["___ Privacy is a concern whenever records are shared.", zeroStart, "(nothing)"],
          ["The newer form includes ___ option that the old form did not offer.", indefiniteAn, "an"],
          ["The complaint led to ___ review of the policy.", indefiniteA, "a"],
          ["___ only review that began in March is still open.", definiteStart, "The"],
          ["Applicants often confuse ___ advice with a requirement.", zero, "(nothing)"],
          ["The school introduced ___ online system for payments.", indefiniteAn, "an"],
          ["This is ___ only entrance after six.", definite, "the"],
          ["The team ran ___ pilot study before the launch.", indefiniteA, "a"],
          ["___ evidence collected after June changed the result.", definiteStart, "The"],
          ["Students who use ___ public transport get a discount.", zero, "(nothing)"],
          ["The course requires ___ essay at the end.", indefiniteAn, "an"],
          ["The memo gives ___ reason for rejecting the appeal.", indefiniteA, "a"],
          ["___ reason given in the memo was incomplete.", definiteStart, "The"],
          ["Managers value ___ experience more than certificates.", zero, "(nothing)"],
          ["The clinic added ___ appointment slot on Saturdays.", indefiniteAn, "an"],
          ["The study found ___ link between practice and speed.", indefiniteA, "a"],
          ["___ only link reported last year was weaker.", definiteStart, "The"]
        ],
        C1: [
          ["Mina studies ___ public policy at night.", zero, "(nothing)"],
          ["The annual review describes ___ most serious limitation in the original design.", definite, "the"],
          ["The author gives ___ unusually cautious interpretation of the data.", indefiniteAn, "an"],
          ["The department adopted ___ more transparent procedure after the audit.", indefiniteA, "a"],
          ["___ Evidence is difficult to evaluate without dates.", zeroStart, "(nothing)"],
          ["The proposal includes ___ analysis of attendance records.", indefiniteAn, "an"],
          ["___ only analysis in section four contradicts the abstract.", definiteStart, "The"],
          ["Researchers in this field study ___ language acquisition.", zero, "(nothing)"],
          ["The policy created ___ exception for part-time staff.", indefiniteAn, "an"],
          ["The committee rejected ___ only argument that costs were irrelevant.", definite, "the"],
          ["The report offers ___ framework for comparing outcomes.", indefiniteA, "a"],
          ["___ only framework used in the pilot was too narrow.", definiteStart, "The"],
          ["Funding changed ___ education policy across the region.", zero, "(nothing)"],
          ["The reviewer requested ___ more precise definition.", indefiniteA, "a"],
          ["The article treats ___ attendance as a proxy for engagement.", zero, "(nothing)"],
          ["The court accepted ___ only interpretation proposed by the agency.", definite, "the"],
          ["Studies often use ___ interview data to explain patterns.", zero, "(nothing)"],
          ["The appendix contains ___ estimate of the response rate.", indefiniteAn, "an"],
          ["The chair asked for ___ explanation that non-specialists could follow.", indefiniteAn, "an"],
          ["___ only explanation that appears in the appendix is shorter.", definiteStart, "The"]
        ],
        C2: [
          ["The analysis examines ___ role of timing in attendance.", definite, "the"],
          ["The appendix offers ___ empirical account of the policy's effect.", indefiniteAn, "an"],
          ["The board requested ___ narrower definition before approving the clause.", indefiniteA, "a"],
          ["___ Causation cannot be inferred from these figures alone.", zeroStart, "(nothing)"],
          ["The dissent relies on ___ only precedent cited in the earlier ruling.", definite, "the"],
          ["The statute grants ___ authority to review late appeals.", zero, "(nothing)"],
          ["The opinion draws ___ distinction between notice and consent.", indefiniteA, "a"],
          ["___ distinction drawn by the dissent is narrower.", definiteStart, "The"],
          ["The claim rests on ___ only assumption that attendance was voluntary.", definite, "the"],
          ["The author proposes ___ alternative reading of the clause.", indefiniteAn, "an"],
          ["The memo treats ___ silence as evidence of consent.", zero, "(nothing)"],
          ["The court adopted ___ only reading advanced by the respondent.", definite, "the"],
          ["The analysis turns on ___ public meaning of the phrase.", definite, "the"],
          ["The reviewer found ___ equivocal pattern in the data.", indefiniteAn, "an"],
          ["The agency issued ___ guidance on data retention.", zero, "(nothing)"],
          ["The panel identified ___ procedural defect in the filing.", indefiniteA, "a"],
          ["___ only defect identified on page two was later cured.", definiteStart, "The"],
          ["The argument invokes ___ earlier precedent without explaining its facts.", indefiniteAn, "an"],
          ["The brief uses ___ methodology that the appendix never defines.", indefiniteA, "a"],
          ["___ only methodology used in the appendix is not replicable.", definiteStart, "The"]
        ]
      };
      return makeItem(...pick(sets[level], i));
    }

    function prepositions(level, i) {
      const c = row(i);
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
      if (level === "A1") return makeItem(timeText, ["on", "in", "at", "by"], timeAnswer);
      if (level === "A2") {
        return makeItem(...pick([
          ["The trip will take about one hour ___ train.", ["by", "on", "in", "at"], "by"],
          ["The new notice is ___ the classroom wall.", ["on", "in", "to", "by"], "on"],
          ["The receipt is ___ the blue folder.", ["in", "on", "at", "to"], "in"],
          ["Please wait ___ the front desk.", ["at", "in", "to", "on"], "at"],
          ["Mina left the station and walked ___ the museum.", ["to", "at", "in", "on"], "to"],
          ["The keys are ___ Carlos's coat pocket.", ["in", "on", "at", "to"], "in"],
          ["A poster about the trip is ___ the notice board.", ["on", "in", "by", "to"], "on"],
          ["The next class begins ___ half past two.", ["at", "on", "in", "by"], "at"],
          ["Lena sent the file ___ email.", ["by", "on", "in", "at"], "by"],
          ["The cafe is closed ___ Sundays.", ["on", "in", "at", "by"], "on"],
          ["The suitcase is ___ the bed, not under it.", ["on", "in", "at", "to"], "on"],
          ["Omar moved the chairs ___ the meeting room.", ["to", "on", "at", "by"], "to"],
          ["The answer is ___ page six.", ["on", "in", "at", "to"], "on"],
          ["The train arrives ___ the evening.", ["in", "on", "at", "by"], "in"],
          ["Put your name ___ the top of the form.", ["at", "in", "to", "by"], "at"],
          ["The office is open ___ Friday afternoon.", ["on", "in", "at", "by"], "on"],
          ["The children ran ___ the park after school.", ["to", "on", "in", "by"], "to"],
          ["The ticket is ___ my phone.", ["on", "in", "at", "to"], "on"],
          ["Please return the book ___ Monday morning.", ["by", "in", "at", "to"], "by"],
          ["The meeting is ___ room 204.", ["in", "on", "at", "to"], "in"]
        ], i));
      }
      const sets = {
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
      const a1ModalItems = [
        ["Students ___ bring a pencil to class.", ["must", "must to", "musted", "musting"], "must"],
        ["Carlos ___ swim across the pool.", ["can", "can to", "cans", "is can"], "can"],
        ["It ___ rain later, so bring a coat.", ["may", "may to", "mays", "is may"], "may"],
        ["The bus ___ arrive at noon.", ["will", "will to", "wills", "is will"], "will"],
        ["Students ___ talk during the test.", ["must not", "must not to", "musted not", "do must not"], "must not"],
        ["You ___ wash your hands before lunch.", ["must", "must to", "musting", "are must"], "must"],
        ["Mina ___ ride a bike now.", ["can", "can to", "cans", "is can"], "can"],
        ["The shop ___ close early today.", ["may", "may to", "mays", "is may"], "may"],
        ["Dad ___ call after work.", ["will", "will to", "wills", "is will"], "will"],
        ["Visitors ___ enter this room.", ["must not", "must not to", "do must not", "musted not"], "must not"],
        ["We ___ be quiet in the library.", ["must", "must to", "musted", "musting"], "must"],
        ["Lena ___ read the small sign.", ["can", "can to", "cans", "is can"], "can"],
        ["The cafe ___ open at eight.", ["will", "will to", "wills", "is will"], "will"],
        ["It ___ be cold tonight.", ["may", "may to", "mays", "is may"], "may"],
        ["Children ___ run near the street.", ["must not", "must not to", "do must not", "musted not"], "must not"],
        ["You ___ show your ticket here.", ["must", "must to", "musted", "musting"], "must"],
        ["Omar ___ speak a little Spanish.", ["can", "can to", "cans", "is can"], "can"],
        ["The lesson ___ start soon.", ["will", "will to", "wills", "is will"], "will"],
        ["The phone ___ be in my bag.", ["may", "may to", "mays", "is may"], "may"],
        ["We ___ use phones during the movie.", ["must not", "must not to", "do must not", "musted not"], "must not"]
      ];
      const a2ModalItems = [
        ["For better results, Mina ___ check her answer again.", ["should", "must", "might", "can"], "should"],
        ["The notice says visitors ___ show ID at the entrance.", ["must", "might", "would", "used to"], "must"],
        ["Aiko ___ be late; the train was delayed.", ["might", "should", "must", "can"], "might"],
        ["You ___ borrow a dictionary during the lesson.", ["can", "should", "might", "would"], "can"],
        ["The office ___ close early tomorrow because of the storm.", ["may", "must", "should", "can"], "may"],
        ["Jonas has a fever, so he ___ stay home today.", ["should", "can", "would", "used to"], "should"],
        ["All passengers ___ wear a seat belt.", ["must", "might", "would", "can"], "must"],
        ["Sofia is not sure, but she ___ need another form.", ["might", "must", "can", "should"], "might"],
        ["Students ___ use the computers after class.", ["can", "must", "might", "would"], "can"],
        ["The evening class ___ move online if the snow gets worse.", ["may", "must", "should", "can"], "may"],
        ["You ___ ask before taking photos in the museum.", ["should", "might", "would", "used to"], "should"],
        ["Staff ___ wash their hands before preparing food.", ["must", "might", "would", "can"], "must"],
        ["The package ___ arrive today, but I am not certain.", ["might", "must", "should", "can"], "might"],
        ["Visitors ___ park behind the clinic on weekends.", ["can", "must", "might", "would"], "can"],
        ["The teacher ___ give us a short quiz tomorrow.", ["may", "must", "should", "can"], "may"],
        ["You ___ keep a copy of the receipt.", ["should", "might", "would", "used to"], "should"],
        ["Every applicant ___ sign the last page.", ["must", "might", "would", "can"], "must"],
        ["The lights are off, so the office ___ be closed.", ["might", "should", "can", "would"], "might"],
        ["We ___ sit here until the next class starts.", ["can", "must", "might", "would"], "can"],
        ["The clinic ___ call you this afternoon if a time opens.", ["may", "must", "should", "can"], "may"]
      ];
      if (level === "A1") return makeItem(...pick(a1ModalItems, i));
      if (level === "A2") return makeItem(...pick(a2ModalItems, i));
      const sets = {
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
      if (["careful", "helpful", "useful", "polite", "formal", "regular", "honest", "steady", "brief", "direct", "practical", "reliable", "complete"].includes(adjective)) return `more ${adjective}`;
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
      const a1ComparativeItems = [
        ["The blue bag is ___ than the red bag.", ["bigger", "big", "biggest", "more big"], "bigger"],
        ["This pencil is ___ than the marker.", ["shorter", "short", "shortest", "more short"], "shorter"],
        ["The soup is ___ than the tea.", ["hotter", "hot", "hottest", "more hot"], "hotter"],
        ["My box is ___ than your box.", ["heavier", "heavy", "heaviest", "more heavy"], "heavier"],
        ["The white cup is ___ than the black cup.", ["cleaner", "clean", "cleanest", "more clean"], "cleaner"],
        ["This street is ___ than our street.", ["quieter", "quiet", "quietest", "more quiet"], "quieter"],
        ["The red chair is ___ than the sofa.", ["lighter", "light", "lightest", "more light"], "lighter"],
        ["The morning class is ___ than the evening class.", ["earlier", "early", "earliest", "more early"], "earlier"],
        ["The new shoes are ___ than the old shoes.", ["cleaner", "clean", "cleanest", "more clean"], "cleaner"],
        ["This bag is ___ than that suitcase.", ["smaller", "small", "smallest", "more small"], "smaller"],
        ["The green apple is ___ than the yellow one.", ["harder", "hard", "hardest", "more hard"], "harder"],
        ["The second song is ___ than the first song.", ["slower", "slow", "slowest", "more slow"], "slower"],
        ["My room is ___ than the kitchen.", ["colder", "cold", "coldest", "more cold"], "colder"],
        ["This exercise is ___ than the homework.", ["easier", "easy", "easiest", "more easy"], "easier"],
        ["The park is ___ than the station.", ["nearer", "near", "nearest", "more near"], "nearer"],
        ["The back door is ___ than the front door.", ["wider", "wide", "widest", "more wide"], "wider"],
        ["The baby is ___ than his sister.", ["younger", "young", "youngest", "more young"], "younger"],
        ["The brown desk is ___ than the round table.", ["older", "old", "oldest", "more old"], "older"],
        ["The bus is ___ than the bicycle.", ["faster", "fast", "fastest", "more fast"], "faster"],
        ["The library is ___ than the cafe.", ["larger", "large", "largest", "more large"], "larger"]
      ];
      const a2ComparativeItems = [
        ["The new elevator is ___ than the stairs.", ["faster", "fast", "fastest", "more fast"], "faster"],
        ["This backpack is not ___ as my old one.", ["as heavy", "heavier", "heavy than", "more heavy"], "as heavy"],
        ["Of the three buses, the blue bus is ___.", ["the earliest", "earlier", "early than", "most early"], "the earliest"],
        ["The online map is ___ than the paper map.", ["more useful", "usefuler", "most useful", "useful than"], "more useful"],
        ["The second hotel is ___ expensive than the first.", ["less", "least", "little", "fewer"], "less"],
        ["The red suitcase is ___ than the black suitcase.", ["easier to carry", "easy carry", "easiest to carry", "more easy carry"], "easier to carry"],
        ["The afternoon train is ___ than the morning train.", ["more crowded", "crowdeder", "most crowded", "crowded than"], "more crowded"],
        ["This answer is ___ than the one I wrote yesterday.", ["clearer", "clear", "clearest", "more clearer"], "clearer"],
        ["The small room is ___ than the main hall.", ["warmer", "warm", "warmest", "more warmer"], "warmer"],
        ["My new phone is ___ than my old phone.", ["better", "gooder", "best", "more good"], "better"],
        ["The last question was ___ than the first question.", ["more difficult", "difficulter", "most difficult", "difficult than"], "more difficult"],
        ["The side entrance is ___ than the main entrance.", ["narrower", "narrow", "narrowest", "more narrower"], "narrower"],
        ["This week's schedule is ___ than last week's.", ["busier", "busy", "busiest", "more busier"], "busier"],
        ["The new chair is ___ comfortable than the old chair.", ["more", "most", "much", "many"], "more"],
        ["The river path is ___ than the road.", ["safer", "safe", "safest", "more safer"], "safer"],
        ["This form is the ___ of the two.", ["shorter", "short", "shortest", "more short"], "shorter"],
        ["The second explanation is not ___ as the first.", ["as simple", "simpler", "simple than", "more simple"], "as simple"],
        ["The new printer is ___ than the old one.", ["noisier", "noisy", "noisiest", "more noisier"], "noisier"],
        ["The weekend class is ___ popular than the weekday class.", ["more", "most", "many", "much"], "more"],
        ["This route is ___ than it looks on the map.", ["longer", "long", "longest", "more longer"], "longer"]
      ];
      if (level === "A1") return makeItem(...pick(a1ComparativeItems, i));
      if (level === "A2") return makeItem(...pick(a2ComparativeItems, i));
      const b1ComparativeFrames = [
        [`${c.person}'s explanation was much ___ than the first one.`, "explanation"],
        [`The route through the ${c.place} was much ___ than the map suggested.`, "route"],
        [`The second answer looked much ___ after the tutor revised it.`, "answer"],
        [`This week's practice task felt much ___ than last week's.`, "task"],
        [`The new waiting area is much ___ than the old hallway.`, "area"],
        [`The afternoon session moved much ___ once the projector worked.`, "session"],
        [`The replacement form was much ___ for beginners to follow.`, "form"],
        [`The room near the ${c.otherPlace} became much ___ after lunch.`, "room"],
        [`The second paragraph was much ___ after ${c.person} cut two examples.`, "paragraph"],
        [`The reminder sounded much ___ than the first announcement.`, "reminder"],
        [`The online checklist was much ___ after the update.`, "checklist"],
        [`The practice conversation was much ___ when the instructions changed.`, "conversation"],
        [`The revised timetable felt much ___ to new students.`, "timetable"],
        [`The front desk was much ___ before the evening rush.`, "front desk"],
        [`The replacement badge looked much ___ than the temporary one.`, "badge"],
        [`The older guide was much ___ than the one on the website.`, "guide"],
        [`The volunteer's voice sounded much ___ after the microphone was fixed.`, "voice"],
        [`The weak claim became much ___ after the example was added.`, "claim"],
        [`The clinic entrance was much ___ than the sign suggested.`, "entrance"],
        [`The final stop was much ___ from the school than I expected.`, "stop"]
      ];
      const sets = {
        B1: [[b1ComparativeFrames[i % b1ComparativeFrames.length][0], [comp, `very ${comp}`, `more ${comp}`, adj], comp]],
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
      const c2Outcomes = [
        "the reviewers would have caught the numbering error",
        "the morning session would have opened without delay",
        "the editor could have resolved the ambiguity",
        "the clerk might have prevented the duplicate filing",
        "the director would have approved the revised timeline",
        "the class could have used the new materials",
        "the printer would not have jammed during registration",
        "the reception desk might have avoided the long queue",
        "the applicants could have received confirmation sooner",
        "the tutor would have noticed the missing page",
        "the committee might have postponed the vote",
        "the auditors could have verified the figures",
        "the client would not have questioned the estimate",
        "the manager could have arranged a replacement",
        "the visitors might have found the entrance more easily",
        "the coordinator would have updated the shared calendar",
        "the school could have avoided the second notice",
        "the analyst might have flagged the weak comparison",
        "the panel would have narrowed the disputed issue",
        "the agency could have released the summary earlier"
      ];
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
        C2: [[`Had ${c.person} ___ ${object} earlier, ${pick(c2Outcomes, i)}.`, [pp, `have ${pp}`, `to ${base}`, ing], pp]]
      };
      return makeItem(...chooseByLevel(level, sets, i));
    }

    function passiveVoice(level, i) {
      const c = row(i);
      const [base, , past, pp, ing, object] = c.action;
      const passiveObject = object.replace(/^the /, "The ");
      const simpleObject = pick(["room", "desk", "floor", "window", "table"], i);
      const pluralPassiveObject = /\b(forms|questions|documents|results)\b/i.test(passiveObject);
      const b1PassiveAnswer = `${pluralPassiveObject ? "were" : "was"} ${pp}`;
      const b1PassiveWrongBe = `${pluralPassiveObject ? "was" : "were"} ${pp}`;
      const b2PassiveAnswer = `${pluralPassiveObject ? "have" : "has"} been ${pp}`;
      const b2PassiveWrongBe = `${pluralPassiveObject ? "has" : "have"} been ${pp}`;
      const passiveReasons = [
        "for the registration packet",
        "before the parents arrived",
        "after the morning review",
        "for the clinic archive",
        "before the director returned",
        "during the lunch break",
        "for the evening class",
        "after the power outage",
        "before the applicants queued",
        "for the tutor's folder",
        "during the office move",
        "after the deadline changed",
        "for the safety inspection",
        "before the workshop opened",
        "during the first session",
        "for the language center",
        "after the software update",
        "before the appeal hearing",
        "during the final check",
        "for the monthly summary"
      ];
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
        B1: [[`${passiveObject} ___ by ${c.person} ${pick(passiveReasons, i)}.`, [b1PassiveAnswer, past, `has ${base}`, b1PassiveWrongBe], b1PassiveAnswer]],
        B2: [[`${passiveObject} ___ by three different reviewers ${pick(passiveReasons, i)}.`, [b2PassiveAnswer, `has ${pp}`, `was ${ing}`, b2PassiveWrongBe], b2PassiveAnswer]],
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
      const a1GerundItems = [
        ["Mina wants ___ English after work.", ["to study", "study", "studying", "to studying"], "to study"],
        ["The students need ___ their names on the form.", ["to write", "write", "writing", "to writing"], "to write"],
        ["Aiko enjoys ___ music after dinner.", ["listening to", "listen", "to listening", "listen to"], "listening to"],
        ["We hope ___ the lesson early.", ["to start", "start", "starting", "to starting"], "to start"],
        ["The children want ___ outside today.", ["to play", "play", "playing", "to playing"], "to play"],
        ["Carlos plans ___ a sandwich after class.", ["to buy", "buy", "buying", "to buying"], "to buy"],
        ["Lena enjoys ___ pictures of flowers.", ["drawing", "to draw", "draw", "to drawing"], "drawing"],
        ["Please remember ___ the door.", ["to close", "close", "closing", "to closing"], "to close"],
        ["Omar finished ___ his homework at six.", ["doing", "to doing", "do", "to do"], "doing"],
        ["Rina needs ___ a clean shirt.", ["to wear", "wear", "wearing", "to wearing"], "to wear"],
        ["The baby enjoys ___ with the red ball.", ["playing", "play", "to playing", "played"], "playing"],
        ["Jonas forgot ___ his lunch bag.", ["to bring", "bring", "bringing", "to bringing"], "to bring"],
        ["Sara finished ___ the story aloud.", ["reading", "read", "to reading", "to read"], "reading"],
        ["Luis wants ___ near the window.", ["to sit", "sit", "sitting", "to sitting"], "to sit"],
        ["Emma enjoys ___ tea in the morning.", ["drinking", "drink", "to drinking", "drank"], "drinking"],
        ["Noah needs ___ the bus at seven.", ["to catch", "catch", "catching", "to catching"], "to catch"],
        ["Yara stopped ___ when the teacher spoke.", ["talking", "talk", "to talking", "to talk"], "talking"],
        ["Theo hopes ___ his friend tomorrow.", ["to see", "see", "seeing", "to seeing"], "to see"],
        ["My sister enjoys ___ in the kitchen.", ["cooking", "cook", "to cooking", "cooked"], "cooking"],
        ["We need ___ before the movie starts.", ["to leave", "leave", "leaving", "to leaving"], "to leave"]
      ];
      const a2GerundItems = [
        ["Mina enjoys ___ short stories.", ["reading", "to read", "read", "to reading"], "reading"],
        ["The class finished ___ the worksheet before lunch.", ["checking", "to check", "check", "to checking"], "checking"],
        ["Aiko decided ___ the office before five.", ["to call", "calling", "call", "to calling"], "to call"],
        ["Please avoid ___ near the exam room.", ["talking", "to talk", "talk", "to talking"], "talking"],
        ["The teacher promised ___ the results tomorrow.", ["to send", "sending", "send", "to sending"], "to send"],
        ["Carlos agreed ___ the chairs after class.", ["to move", "moving", "move", "to moving"], "to move"],
        ["Lena kept ___ notes during the video.", ["taking", "to take", "take", "to taking"], "taking"],
        ["Omar hopes ___ a new job this month.", ["to find", "finding", "find", "to finding"], "to find"],
        ["Rina avoided ___ the same question twice.", ["asking", "to ask", "ask", "to asking"], "asking"],
        ["Jonas offered ___ the new student.", ["to help", "helping", "help", "to helping"], "to help"],
        ["Sara quit ___ sugar in her tea.", ["putting", "to put", "put", "to putting"], "putting"],
        ["Luis chose ___ by bus instead of train.", ["to travel", "traveling", "travel", "to traveling"], "to travel"],
        ["Emma practiced ___ the new words aloud.", ["saying", "to say", "say", "to saying"], "saying"],
        ["Noah expects ___ home before dark.", ["to arrive", "arriving", "arrive", "to arriving"], "to arrive"],
        ["Yara missed ___ with her old classmates.", ["studying", "to study", "study", "to studying"], "studying"],
        ["Theo learned ___ a simple email in English.", ["to write", "writing", "write", "to writing"], "to write"],
        ["The nurse suggested ___ more water.", ["drinking", "to drink", "drink", "to drinking"], "drinking"],
        ["The driver refused ___ without a ticket.", ["to leave", "leaving", "leave", "to leaving"], "to leave"],
        ["The children kept ___ when the music began.", ["dancing", "to dancing", "dance", "to dance"], "dancing"],
        ["The clerk reminded us ___ the last page.", ["to sign", "signing", "sign", "to signing"], "to sign"]
      ];
      if (level === "A1") return makeItem(...pick(a1GerundItems, i));
      if (level === "A2") return makeItem(...pick(a2GerundItems, i));
      const sets = {
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
      const adjectiveAdverbFrames = {
        A1: [
          "Mina gave a ___ answer to the teacher.",
          "Carlos made a ___ stop near the clinic.",
          "Aiko found a ___ place to study.",
          "Nadia is a ___ partner in class.",
          "Omar wrote a ___ note for the new student.",
          "Lena chose a ___ question for practice.",
          "Sofia gave a ___ reply at the counter.",
          "Daniel wrote an ___ address on the form.",
          "Rina found a ___ route to school.",
          "Mateo gave the class a ___ example.",
          "Hana wrote a ___ email about the schedule.",
          "Jonas has a ___ lesson on Mondays.",
          "Priya used a ___ voice with the child.",
          "Kenji gave an ___ answer after the mistake.",
          "Sara kept a ___ pace during the walk.",
          "Luis wrote a ___ message on the board.",
          "Emma gave a ___ answer at the desk.",
          "Noah suggested a ___ plan for lunch.",
          "Yara found a ___ printer near the window.",
          "Theo submitted a ___ form before class."
        ],
        A2: [
          "Mina explained the answer ___.",
          `Carlos closed the door ___ after the lesson.`,
          `Aiko entered the room ___ during the test.`,
          `Nadia checked the address ___ before sending it.`,
          `Omar explained the rule ___ to the new student.`,
          `Lena described the step ___.`,
          `Sofia asked for help ___ at the counter.`,
          `Daniel copied the number ___ from the screen.`,
          `Rina carried the glass ___ to the table.`,
          `The guide ___ explains the route for new visitors.`,
          `Hana wrote the formal letter ___.`,
          `Jonas attends the evening class ___.`,
          `Priya waited ___ while the clerk searched.`,
          `Kenji answered ___ when the nurse asked.`,
          `Attendance increased ___ during the month.`,
          `Luis summarized the message ___.`,
          `Emma gave the directions ___ to the visitor.`,
          `Noah was ___ ready before lunch.`,
          `The help desk replied ___ after each request.`,
          `Theo finished the checklist ___.`
        ],
        B1: [
          `The reports were written ___ for beginners.`,
          `The clerk handled the complaint ___ after the call.`,
          `The students worked ___ during the reading hour.`,
          `The tutor marked the essays ___ before lunch.`,
          `The manager spoke ___ during the meeting.`,
          `The chart explains the process ___ for new learners.`,
          `The receptionist answered the questions ___ despite the line.`,
          `The clerk copied the figures ___ into the file.`,
          `The trainer demonstrated the task ___ for the new group.`,
          `The guide describes the process ___ on page two.`,
          `The office announced the deadline ___ in the staff update.`,
          `The class meets ___ for writing practice.`,
          `The volunteer reported the problem ___ to the office.`,
          `The adviser replied ___ to the student's question.`,
          `Attendance rose ___ during the first week.`,
          `The assistant summarized the issue ___ for the team.`,
          `The teacher corrected the example ___ on the board.`,
          `The plan was ___ impossible after the budget cut.`,
          `The records were stored ___ after the move.`,
          `The packet was prepared ___ before registration.`
        ],
        B2: [
          `The new ${c.thing} is ___ than the old one.`,
          "The revised signup process is ___ than the old one.",
          "The new study room is ___ than the hallway.",
          "The second procedure is ___ than the informal workaround.",
          "The manager's reply was ___ than the earlier message.",
          "The new form is ___ than the paper packet.",
          "The receptionist's reply was ___ than the first answer.",
          "The final estimate is ___ than the rough total.",
          "The new walking route is ___ than the old shortcut.",
          "The training example is ___ than the abstract rule.",
          "The email template is ___ than the handwritten note.",
          "The review cycle is ___ than the old monthly process.",
          "The second explanation is ___ than the first warning.",
          "The revised statement is ___ than the original claim.",
          "The reminder system is ___ than occasional announcements.",
          "The short summary is ___ than the full appendix.",
          "The direct question is ___ than the vague prompt.",
          "The practical example is ___ than the abstract rule.",
          "The new help desk is ___ than the old phone line.",
          "The completed file is ___ than the partial packet."
        ]
      };
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
        const c1Frames = [
          "The reviewer found the summary ___ despite its length.",
          "The revised method seems ___ in the pilot data.",
          "The appendix was ___ with the main argument.",
          "The description of the sampling process is unusually ___.",
          "The distinction between the two claims is too ___ to ignore.",
          "The proposed schedule remains ___ for a small staff.",
          "The witness's explanation sounded ___ after the records appeared.",
          "The objection is ___ to the narrow issue before the panel.",
          "The result looks ___ across all three samples.",
          "The instruction is ___ about what counts as late.",
          "The warning is ___ rather than directly stated.",
          "The conclusion is ___ until the missing data are checked.",
          "The instrument appears ___ for measuring listening speed.",
          "The checklist is ___ enough for repeated use.",
          "The inference is ___ only if the timeline is correct.",
          "The email is ___ without sounding distant.",
          "The comment is ___ of the unsupported claim.",
          "The response is ___ rather than merely descriptive.",
          "The final paragraph is ___ enough to change a reader's mind.",
          "The revised procedure is ___ about who approves appeals."
        ];
        return makeItem(c1Frames[i % c1Frames.length], [advancedAdj, advancedAdv, noun, `very ${advancedAdv}`], advancedAdj);
      }
      if (level === "C2") {
        const [advancedAdj, advancedAdv, noun] = pick(c2Forms, i);
        const c2Frames = [
          "The panel reviewed the objection ___ before issuing the order.",
          "The authors documented the coding decisions ___ in the appendix.",
          "The arbitrator weighed the testimony ___ rather than rhetorically.",
          "The dissent examines the precedent ___ but not dismissively.",
          "The expert separated the two estimates ___ before combining them.",
          "The committee published the limitations ___ in the final addendum.",
          "The reviewer treated the alternative explanation ___ throughout.",
          "The chair introduced the amendment ___ to avoid surprise.",
          "The analyst reported the interval ___ in the technical note.",
          "The memo treats the two doctrines ___ without collapsing them.",
          "The claim was tested ___ against the archive.",
          "The brief develops the argument ___ across three sections.",
          "The investigator checked the sequence ___ before assigning blame.",
          "The agency applied the standard ___ after the appeal.",
          "The committee framed the conclusion ___ until replication is possible.",
          "The court addressed the objection ___ rather than procedurally.",
          "The minutes present the votes ___ as they occurred.",
          "The report interprets the silence ___ in light of the statute.",
          "The reviewer approached the claim ___ because the data were thin.",
          "The panel applied the exception ___ to avoid overreach."
        ];
        return makeItem(c2Frames[i % c2Frames.length], [advancedAdv, advancedAdj, noun, `${advancedAdj} evaluation`], advancedAdv);
      }
      const sets = {
        A1: [[adjectiveAdverbFrames.A1[i % adjectiveAdverbFrames.A1.length], [adj, adv, noun, `very ${adv}`], adj]],
        A2: [[adjectiveAdverbFrames.A2[i % adjectiveAdverbFrames.A2.length], [adv, adj, noun, `very ${adj}`], adv]],
        B1: [[adjectiveAdverbFrames.B1[i % adjectiveAdverbFrames.B1.length], [adv, adj, noun, `very ${adj}`], adv]],
        B2: [[adjectiveAdverbFrames.B2[i % adjectiveAdverbFrames.B2.length], [comp, adv, `most ${adj}`, noun], comp]]
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

    const bespokeEmphasisSets = {
      A2: [
        {
          correct: "Here comes the airport bus.",
          reason: 'With "here comes," the verb comes before the noun phrase when something is arriving now.',
          wrongs: [
            ["Here the airport bus comes.", 'This order is possible in a different style, but it is not the natural arrival phrase "Here comes" plus a noun.'],
            ["Here does come the airport bus.", '"Does" is not used in this simple arrival inversion.'],
            ["Here comes it the airport bus.", '"It" cannot be added before the noun phrase.']
          ]
        },
        {
          correct: "There goes our last train.",
          reason: 'With "there goes," the verb comes before the noun phrase to point out something leaving.',
          wrongs: [
            ["There our last train goes.", 'This is understandable but it loses the natural emphatic order "There goes" plus a noun.'],
            ["There does go our last train.", '"Does" is not used in this simple pointing expression.'],
            ["There goes it our last train.", 'The pronoun "it" cannot appear before the noun phrase.']
          ]
        },
        {
          correct: "I did send the receipt this morning.",
          reason: '"Did" before the base verb adds emphasis: the speaker really sent it.',
          wrongs: [
            ["I did sent the receipt this morning.", 'After "did," use the base verb "send," not "sent."'],
            ["I do sent the receipt this morning.", '"Do" does not fit the past-time meaning here.'],
            ["I sent did the receipt this morning.", '"Did" belongs before the main verb.']
          ]
        },
        {
          correct: "She does know the answer.",
          reason: '"Does know" emphasizes that the statement is true for one present-tense subject.',
          wrongs: [
            ["She does knows the answer.", 'After "does," the main verb stays in the base form: "know."'],
            ["She do know the answer.", '"Do" does not match the singular subject "she."'],
            ["She knows does the answer.", '"Does" cannot be placed after the main verb.']
          ]
        },
        {
          correct: "It was Carlos who called the clinic.",
          reason: 'This cleft sentence emphasizes the person who made the call.',
          wrongs: [
            ["It Carlos was who called the clinic.", '"It was Carlos who called the clinic" is the correct cleft order.'],
            ["Was Carlos it who called the clinic.", 'This changes the sentence into an unnatural question-like order.'],
            ["It was Carlos which called the clinic.", 'Use "who" for a person, not "which."']
          ]
        },
        {
          correct: "It is this form that needs a signature.",
          reason: 'The cleft pattern "It is this form that needs a signature" emphasizes exactly which form needs attention.',
          wrongs: [
            ["It this form is that needs a signature.", 'The verb "is" belongs after "it."'],
            ["This is form that needs a signature.", 'The phrase needs "this form," not "this is form."'],
            ["It is this form needs that a signature.", '"That" should introduce the clause after the emphasized noun phrase.']
          ]
        },
        {
          correct: "Rina is tired, and so am I.",
          reason: '"So am I" uses the same be verb to say the second person is tired too.',
          wrongs: [
            ["Rina is tired, and so do I.", '"Do" does not match the be verb "is."'],
            ["Rina is tired, and so I am.", 'This order is not the usual short agreement pattern after "so."'],
            ["Rina is tired, and so I do.", '"Do" does not fit a sentence built with "be."']
          ]
        },
        {
          correct: "The office is not open, and neither is the cafe.",
          reason: '"Neither is" plus a subject matches a negative sentence with the be verb.',
          wrongs: [
            ["The office is not open, and neither the cafe is.", 'After "neither," the verb comes before the subject.'],
            ["The office is not open, and neither does the cafe.", '"Does" does not match the be verb "is."'],
            ["The office is not open, and so is the cafe.", '"So" continues a positive idea, not a negative one.']
          ]
        },
        {
          correct: "Only Rina saw the notice.",
          reason: '"Only" before the subject means Rina, and no one else, saw it.',
          wrongs: [
            ["Rina only saw the notice.", 'This can mean she only saw it and did nothing else, so it shifts the emphasis.'],
            ["Rina saw only the notice.", 'This means she saw the notice and nothing else.'],
            ["Only saw Rina the notice.", 'This uses unnatural word order for this level.']
          ]
        },
        {
          correct: "I want tea, not coffee.",
          reason: 'Putting "not coffee" after the comma clearly contrasts the wanted drink with the rejected one.',
          wrongs: [
            ["I want not tea, coffee.", 'This order makes the contrast unclear and unnatural.'],
            ["Not I want tea, coffee.", '"Not" cannot be placed before the subject this way.'],
            ["I not want tea, not coffee.", 'Simple present negatives need "do not" if the main verb is negated.']
          ]
        },
        {
          correct: "This is my seat, not yours.",
          reason: 'The contrast at the end emphasizes whose seat it is.',
          wrongs: [
            ["This my seat is, not yours.", 'The verb "is" belongs after "this."'],
            ["This is my seat, no yours.", 'Use "not yours" for contrast, not "no yours."'],
            ["This is not my seat, yours.", 'This says the opposite of the intended meaning.']
          ]
        },
        {
          correct: "The blue folder is here, not the red one.",
          reason: 'The final contrast makes clear which folder is present.',
          wrongs: [
            ["The blue folder here is, not the red one.", 'The normal order is "folder is here."'],
            ["The blue folder is here, no the red one.", 'Use "not the red one" after a contrast.'],
            ["The blue folder is not here, the red one.", 'This reverses the main meaning.']
          ]
        },
        {
          correct: "What I need is a quiet room.",
          reason: 'The pattern "What I need is" plus a noun phrase emphasizes the thing needed.',
          wrongs: [
            ["What I need it is a quiet room.", '"It" is not used inside this pattern.'],
            ["What need I is a quiet room.", 'The clause after "what" uses normal subject-verb order.'],
            ["What I need are a quiet room.", 'Use "is" because "a quiet room" is singular.']
          ]
        },
        {
          correct: "The answer is on page two, not page three.",
          reason: 'The contrast at the end highlights the correct page.',
          wrongs: [
            ["The answer on page two is, not page three.", 'The be verb should come before the location: "is on page two."'],
            ["The answer is page two, not on page three.", 'Use "on" with a page number.'],
            ["Not page three, the answer is on page two is.", 'The final "is" is extra and ungrammatical.']
          ]
        },
        {
          correct: "I can help, and so can Omar.",
          reason: '"So can Omar" repeats the modal "can" with inverted word order.',
          wrongs: [
            ["I can help, and so Omar can.", 'The short agreement pattern puts "can" before the subject.'],
            ["I can help, and so does Omar.", '"Does" does not match the modal "can."'],
            ["I can help, and so can Omar can.", 'The modal is repeated unnecessarily after the subject.']
          ]
        },
        {
          correct: "I do want to join the class.",
          reason: '"Do want" emphasizes that the speaker really wants to join.',
          wrongs: [
            ["I do wants to join the class.", 'After "do," use the base verb "want."'],
            ["I am want to join the class.", '"Am" cannot be used before the main verb "want" in this sentence.'],
            ["I want do to join the class.", '"Do" belongs before the main verb when it adds emphasis.']
          ]
        },
        {
          correct: "The lesson starts now, not later.",
          reason: '"Not later" emphasizes the contrast with "now."',
          wrongs: [
            ["The lesson now starts, not later.", 'This order is less natural for the simple time contrast.'],
            ["The lesson starts not now, later.", 'This reverses the intended contrast.'],
            ["The lesson does starts now, not later.", 'After "does," the verb would be "start"; here "does" is unnecessary.']
          ]
        },
        {
          correct: "Here is the key you lost.",
          reason: '"Here is" plus a noun phrase presents something to the listener in natural word order.',
          wrongs: [
            ["Here the key is you lost.", 'The relative clause "you lost" should follow "the key" after the main phrase.'],
            ["Here does the key is you lost.", '"Does" cannot combine with "is" this way.'],
            ["Here is it the key you lost.", 'Do not add "it" before the noun phrase.']
          ]
        },
        {
          correct: "It was the rain that delayed the game.",
          reason: 'The cleft sentence emphasizes the cause of the delay.',
          wrongs: [
            ["It the rain was that delayed the game.", 'The correct cleft order is "It was the rain that delayed the game."'],
            ["The rain it was that delayed the game.", 'This mixes two structures and sounds unnatural.'],
            ["It was the rain which delayed by the game.", 'The phrase "delayed by the game" changes the grammar and meaning.']
          ]
        },
        {
          correct: "The visitors did arrive before noon.",
          reason: '"Did arrive" emphasizes that the arrival really happened in the past.',
          wrongs: [
            ["The visitors did arrived before noon.", 'After "did," use the base verb "arrive."'],
            ["The visitors does arrive before noon.", '"Does" does not match a plural subject or past time.'],
            ["Did the visitors arrived before noon.", 'This is a question form, and "arrived" should become "arrive" after "did."']
          ]
        }
      ],
      B1: [
        {
          correct: "Not only was the room cold, but it was also noisy.",
          reason: '"Not only" before a be-verb clause requires inversion: "was the room."',
          wrongs: [
            ["Not only the room was cold, but it was also noisy.", 'After initial "not only," put the be verb before the subject.'],
            ["Not only was cold the room, but it was also noisy.", 'The adjective should stay after the subject complement pattern: "the room cold."'],
            ["Not only did the room cold, but it was also noisy.", '"Did" cannot replace the be verb "was" here.']
          ]
        },
        {
          correct: "Only then did the clerk notice the missing date.",
          reason: 'After "only then," use inversion with "did" before the subject.',
          wrongs: [
            ["Only then the clerk noticed the missing date.", 'The verb must come before the subject after "only then."'],
            ["Only then noticed the clerk the missing date.", 'Use "did" plus the base verb, not direct inversion with a lexical verb.'],
            ["Only then did the clerk noticed the missing date.", 'After "did," use "notice," not "noticed."']
          ]
        },
        {
          correct: "Here are the forms you asked for.",
          reason: '"Here are" matches the plural noun "forms" and presents them naturally.',
          wrongs: [
            ["Here is the forms you asked for.", '"Is" does not agree with plural "forms."'],
            ["Here the forms are you asked for.", 'This breaks the natural presentation phrase and the relative clause.'],
            ["Here do the forms are you asked for.", '"Do" cannot be added before "are."']
          ]
        },
        {
          correct: "The manager did apologize for the delay.",
          reason: '"Did apologize" emphasizes that the apology really happened.',
          wrongs: [
            ["The manager did apologized for the delay.", 'After "did," use the base verb "apologize."'],
            ["The manager was apologize for the delay.", '"Was" cannot stand before the base verb in this sentence.'],
            ["The manager apologized did for the delay.", '"Did" belongs before the main verb when it adds emphasis.']
          ]
        },
        {
          correct: "What surprised me was the extra fee.",
          reason: 'This pseudo-cleft emphasizes the surprising thing by placing it after "was."',
          wrongs: [
            ["What surprised me it was the extra fee.", '"It" is not used in this pseudo-cleft pattern.'],
            ["What did surprise me was the extra fee.", 'This can be grammatical in a question-like style, but it is not the intended statement pattern here.'],
            ["What surprised me were the extra fee.", 'Use "was" because "the extra fee" is singular.']
          ]
        },
        {
          correct: "It was the evening class that filled first.",
          reason: 'The cleft sentence emphasizes which class filled first.',
          wrongs: [
            ["It the evening class was that filled first.", 'The verb "was" comes right after "it."'],
            ["It was the evening class which it filled first.", 'The extra "it" after "which" is ungrammatical.'],
            ["Was the evening class it that filled first.", 'This is question-like order, not a statement.']
          ]
        },
        {
          correct: "The first report was useful, and so was the second.",
          reason: '"So was the second" repeats the be verb for the second report.',
          wrongs: [
            ["The first report was useful, and so did the second.", '"Did" does not match the be verb "was."'],
            ["The first report was useful, and so the second was.", 'This order is not the usual short agreement pattern after "so."'],
            ["The first report was useful, and so was useful the second.", 'The adjective should not be repeated before the subject this way.']
          ]
        },
        {
          correct: "I have not seen the file, and neither has Lena.",
          reason: '"Neither has Lena" matches the present perfect helper "have/has" in a negative sentence.',
          wrongs: [
            ["I have not seen the file, and neither Lena has.", 'After "neither," put the helper before the subject.'],
            ["I have not seen the file, and neither does Lena.", '"Does" does not match the present perfect form.'],
            ["I have not seen the file, and so has Lena.", '"So" continues a positive idea; this sentence is negative.']
          ]
        },
        {
          correct: "The tutor did explain the rule clearly.",
          reason: '"Did explain" emphasizes the truth of the past action.',
          wrongs: [
            ["The tutor did explained the rule clearly.", 'After "did," the main verb must be "explain."'],
            ["The tutor was explain the rule clearly.", '"Was" is not used before the base verb here.'],
            ["The tutor explained did the rule clearly.", '"Did" cannot be placed after the main verb.']
          ]
        },
        {
          correct: "Only after lunch did the printer start working.",
          reason: 'A fronted "only after" phrase requires inversion with "did."',
          wrongs: [
            ["Only after lunch the printer started working.", 'Use inversion after "only after" at the beginning.'],
            ["Only after lunch started the printer working.", 'This direct verb-subject order is not natural here.'],
            ["Only after lunch did the printer started working.", 'After "did," use "start," not "started."']
          ]
        },
        {
          correct: "There stood an old clock beside the door.",
          reason: '"There stood" plus a noun phrase is a descriptive inversion that highlights location before the subject.',
          wrongs: [
            ["There an old clock stood beside the door.", 'This loses the literary/descriptive inversion being tested.'],
            ["There did stood an old clock beside the door.", 'Do not use "did" with the past verb "stood" in this inversion.'],
            ["There was stood an old clock beside the door.", '"Was stood" is not the intended active descriptive form.']
          ]
        },
        {
          correct: "The online form is simple, and so is the paper one.",
          reason: '"So is the paper one" repeats the be verb for another positive statement.',
          wrongs: [
            ["The online form is simple, and so does the paper one.", '"Does" does not match "is."'],
            ["The online form is simple, and so the paper one is.", 'This is not the normal short agreement order after "so."'],
            ["The online form is simple, and neither is the paper one.", '"Neither" follows a negative statement, not a positive one.']
          ]
        },
        {
          correct: "What the class needs is more speaking practice.",
          reason: 'The "what" clause plus "is" pattern emphasizes the needed thing.',
          wrongs: [
            ["What the class needs it is more speaking practice.", 'Do not add "it" inside this pattern.'],
            ["What does the class need is more speaking practice.", 'That is a question form mixed into a statement.'],
            ["What the class need is more speaking practice.", '"Class" is singular here, so use "needs."']
          ]
        },
        {
          correct: "It was in June that the policy changed.",
          reason: 'This cleft sentence emphasizes the time of the change.',
          wrongs: [
            ["It in June was that the policy changed.", 'The verb "was" belongs after "it."'],
            ["In June it was that changed the policy.", 'This changes the meaning by making the policy the object.'],
            ["It was June when changed the policy.", 'The clause needs a subject: "the policy changed."']
          ]
        },
        {
          correct: "Never did the receptionist raise her voice.",
          reason: 'Initial "never" requires inversion with "did" in this emphatic sentence.',
          wrongs: [
            ["Never the receptionist raised her voice.", 'After initial "never," use auxiliary inversion.'],
            ["Never raised the receptionist her voice.", 'Modern English normally uses "did" plus the base verb here.'],
            ["Never did the receptionist raised her voice.", 'After "did," use "raise," not "raised."']
          ]
        },
        {
          correct: "The students can use the lab, and so can the tutors.",
          reason: '"So can the tutors" repeats the modal "can" with inverted order.',
          wrongs: [
            ["The students can use the lab, and so do the tutors.", '"Do" does not match the modal "can."'],
            ["The students can use the lab, and so the tutors can.", 'The short agreement pattern puts the modal before the subject.'],
            ["The students can use the lab, and neither can the tutors.", '"Neither" would continue a negative idea, but the first clause is positive.']
          ]
        },
        {
          correct: "The director did approve the revised schedule.",
          reason: '"Did approve" corrects or emphasizes a past action.',
          wrongs: [
            ["The director did approved the revised schedule.", 'After "did," use the base verb "approve."'],
            ["The director approved did the revised schedule.", '"Did" cannot sit after the main verb.'],
            ["The director was approve the revised schedule.", '"Was approve" is not a grammatical verb form here.']
          ]
        },
        {
          correct: "Only in the final paragraph does the author mention cost.",
          reason: 'After an initial "only in" phrase, use inversion with "does" before the subject.',
          wrongs: [
            ["Only in the final paragraph the author mentions cost.", 'The fronted "only" phrase requires auxiliary inversion.'],
            ["Only in the final paragraph mentions the author cost.", 'Use "does" plus the base verb rather than direct inversion here.'],
            ["Only in the final paragraph does the author mentions cost.", 'After "does," use "mention," not "mentions."']
          ]
        },
        {
          correct: "It was the new password that caused the problem.",
          reason: 'The cleft pattern emphasizes the cause of the problem.',
          wrongs: [
            ["It the new password was that caused the problem.", 'The correct order is "It was the new password that caused the problem."'],
            ["It was the new password caused that the problem.", '"That" should introduce the clause before the verb "caused."'],
            ["The new password it was caused the problem.", 'This mixes a cleft with a regular statement.']
          ]
        },
        {
          correct: "Neither answer is correct, and neither is the example.",
          reason: 'The second "neither is" phrase continues the negative meaning with the be verb.',
          wrongs: [
            ["Neither answer is correct, and so is the example.", '"So" would continue a positive idea, not a negative one.'],
            ["Neither answer is correct, and neither the example is.", 'After "neither," put the be verb before the subject.'],
            ["Neither answer is correct, and neither does the example.", '"Does" does not match the be verb "is."']
          ]
        }
      ],
      B2: [
        {
          correct: "Not until the final interview did the panel discuss salary.",
          reason: 'A fronted "not until" phrase requires inversion with "did."',
          wrongs: [
            ["Not until the final interview the panel discussed salary.", 'After "not until" at the front, the auxiliary comes before the subject.'],
            ["Not until the final interview discussed the panel salary.", 'Use "did" plus the base verb in this structure.'],
            ["Not until the final interview did the panel discussed salary.", 'After "did," use "discuss," not "discussed."']
          ]
        },
        {
          correct: "Rarely does a single survey answer that question.",
          reason: 'Initial "rarely" triggers inversion with "does" in formal emphatic style.',
          wrongs: [
            ["Rarely a single survey answers that question.", 'After initial "rarely," use auxiliary inversion.'],
            ["Rarely answers a single survey that question.", 'This direct inversion sounds unnatural with a normal action verb.'],
            ["Rarely does a single survey answers that question.", 'After "does," use the base verb "answer."']
          ]
        },
        {
          correct: "What the report does not explain is why costs rose.",
          reason: 'The pseudo-cleft emphasizes the missing explanation.',
          wrongs: [
            ["What does the report not explain is why costs rose.", 'This mixes question order with a statement.'],
            ["What the report does not explain it is why costs rose.", 'Do not add "it" before "is" in this pattern.'],
            ["What the report does not explains is why costs rose.", 'After "does," use "explain," not "explains."']
          ]
        },
        {
          correct: "It was the late notice, not the fee, that upset applicants.",
          reason: 'The cleft sentence emphasizes one cause and contrasts it with another.',
          wrongs: [
            ["It was the late notice, not the fee, which applicants upset.", 'This reverses who upset whom.'],
            ["It the late notice was, not the fee, that upset applicants.", 'The verb "was" must follow "it."'],
            ["It was the late notice, not the fee, upset that applicants.", '"That" should introduce the clause before "upset."']
          ]
        },
        {
          correct: "Only by comparing both forms can students see the difference.",
          reason: 'After "only by" at the front, the modal "can" comes before the subject.',
          wrongs: [
            ["Only by comparing both forms students can see the difference.", 'The modal should come before the subject after the fronted "only" phrase.'],
            ["Only by compare both forms can students see the difference.", 'After "by," use the -ing form "comparing."'],
            ["Only comparing both forms can students by see the difference.", 'The phrase "by comparing" must stay together.']
          ]
        },
        {
          correct: "The deadline changed, and so did the submission rules.",
          reason: '"So did" plus a subject matches a past simple verb and avoids repeating "changed."',
          wrongs: [
            ["The deadline changed, and so were the submission rules.", '"Were" does not match the action verb "changed."'],
            ["The deadline changed, and so the submission rules did.", 'This is not the normal short agreement order after "so."'],
            ["The deadline changed, and so did the submission rules changed.", 'After "did," do not repeat the past-tense verb.']
          ]
        },
        {
          correct: "Under no circumstances should passwords be shared.",
          reason: 'The negative fronted phrase "under no circumstances" requires inversion with "should."',
          wrongs: [
            ["Under no circumstances passwords should be shared.", 'The modal "should" must come before the subject.'],
            ["Under no circumstances should be passwords shared.", 'The subject should come right after the modal: "should passwords be shared."'],
            ["Under no circumstances do passwords should be shared.", 'Do not combine "do" with the modal "should."']
          ]
        },
        {
          correct: "The refund was approved only after the manager checked the receipt.",
          reason: 'Placing "only after" at the end emphasizes the condition without requiring inversion.',
          wrongs: [
            ["The refund was approved only after checked the manager the receipt.", 'The time clause needs normal subject-verb order.'],
            ["Only after the manager checked the receipt the refund was approved.", 'With "only after" at the front, this would need inversion: "was the refund approved."'],
            ["The refund only was approved after the manager checked the receipt.", 'Putting "only" before "was" gives an awkward and unclear emphasis.']
          ]
        },
        {
          correct: "It is the wording of the question that makes it difficult.",
          reason: 'The cleft sentence emphasizes the source of the difficulty.',
          wrongs: [
            ["It the wording of the question is that makes it difficult.", 'The verb "is" must follow "it."'],
            ["The wording of the question it is that makes difficult.", 'This mixes a normal subject with the cleft structure.'],
            ["It is the wording of the question makes that it difficult.", '"That" should introduce the clause before "makes."']
          ]
        },
        {
          correct: "Little did the team realize how much time the review would take.",
          reason: 'Initial "little" with this meaning triggers inversion with "did."',
          wrongs: [
            ["Little the team realized how much time the review would take.", 'Use auxiliary inversion after initial "little."'],
            ["Little realized the team how much time the review would take.", 'Modern English normally uses "did" plus the base verb here.'],
            ["Little did the team realized how much time the review would take.", 'After "did," use "realize," not "realized."']
          ]
        },
        {
          correct: "What matters most is whether the evidence is reliable.",
          reason: 'The "what" clause plus "is" pattern focuses attention on the central issue.',
          wrongs: [
            ["What does matter most is whether the evidence is reliable.", 'This mixes a question-like form into a statement.'],
            ["What matters most it is whether the evidence is reliable.", 'Do not add "it" before "is" in this pattern.'],
            ["What matter most is whether the evidence is reliable.", '"What matters" needs the singular verb form here.']
          ]
        },
        {
          correct: "Only when the data were checked did the pattern become clear.",
          reason: 'Initial "only when" requires inversion in the main clause.',
          wrongs: [
            ["Only when the data were checked the pattern became clear.", 'The main clause needs "did" before the subject.'],
            ["Only when were the data checked did the pattern become clear.", 'The "when" clause itself keeps normal order here.'],
            ["Only when the data were checked did the pattern became clear.", 'After "did," use "become," not "became."']
          ]
        },
        {
          correct: "Not only has attendance improved, but complaints have fallen.",
          reason: 'Initial "not only" with present perfect requires "has" before the subject.',
          wrongs: [
            ["Not only attendance has improved, but complaints have fallen.", 'After initial "not only," put the helper before the subject.'],
            ["Not only has attendance improve, but complaints have fallen.", 'Present perfect needs the past participle "improved."'],
            ["Not only did attendance has improved, but complaints have fallen.", 'Do not combine "did" with present perfect "has improved."']
          ]
        },
        {
          correct: "In the appendix, the author does acknowledge one limitation.",
          reason: '"Does acknowledge" emphasizes that the author really includes the limitation.',
          wrongs: [
            ["In the appendix, the author does acknowledges one limitation.", 'After "does," use the base verb "acknowledge."'],
            ["In the appendix, does the author acknowledge one limitation.", 'That is question order unless it follows a negative or limiting fronted phrase.'],
            ["In the appendix, the author is acknowledge one limitation.", '"Is acknowledge" is not the right verb form.']
          ]
        },
        {
          correct: "So confusing was the notice that several parents called the office.",
          reason: 'The fronted adjective "so confusing" can trigger inversion for emphasis.',
          wrongs: [
            ["So confusing the notice was that several parents called the office.", 'This misses the inversion used after fronted "so + adjective."'],
            ["So was confusing the notice that several parents called the office.", 'The adjective should follow the subject after "was."'],
            ["So confusing did the notice was that several parents called the office.", 'Do not mix "did" with the be verb "was."']
          ]
        },
        {
          correct: "Neither the old password nor the new code worked.",
          reason: '"Neither" paired with "nor" emphasizes that both alternatives failed.',
          wrongs: [
            ["Neither the old password or the new code worked.", 'Use "nor" after "neither."'],
            ["Neither worked the old password nor the new code.", 'This order is unnatural for the paired subject.'],
            ["Neither the old password nor the new code were worked.", '"Worked" is already the main verb; do not make it passive.']
          ]
        },
        {
          correct: "The schedule was not merely late; it was impossible to use.",
          reason: '"Not merely" followed by a second clause emphasizes a stronger second point.',
          wrongs: [
            ["The schedule was not merely late; was impossible to use.", 'The second clause needs the subject "it."'],
            ["The schedule not merely was late; it was impossible to use.", 'The normal placement is "was not merely late."'],
            ["The schedule was merely not late; it was impossible to use.", 'This changes the meaning by denying lateness instead of strengthening it.']
          ]
        },
        {
          correct: "Only if the receipt is original will the office issue a refund.",
          reason: 'After initial "only if," the main clause inverts: "will the office issue."',
          wrongs: [
            ["Only if the receipt is original the office will issue a refund.", 'The fronted "only if" phrase requires inversion in the main clause.'],
            ["Only if is the receipt original will the office issue a refund.", 'The if-clause keeps normal order here.'],
            ["Only if the receipt is original will the office issues a refund.", 'After the modal "will," use "issue," not "issues."']
          ]
        },
        {
          correct: "It was the lack of dates that made the evidence weak.",
          reason: 'The cleft sentence emphasizes the reason the evidence was weak.',
          wrongs: [
            ["It the lack of dates was that made the evidence weak.", 'The correct cleft order is "It was the lack of dates that made the evidence weak."'],
            ["The lack of dates it was that made the evidence weak.", 'This mixes a regular subject with the cleft pattern.'],
            ["It was the lack of dates made that the evidence weak.", '"That" belongs before the clause "made the evidence weak."']
          ]
        },
        {
          correct: "No longer can students submit the form by email.",
          reason: 'Initial "no longer" can take inversion to emphasize a changed rule.',
          wrongs: [
            ["No longer students can submit the form by email.", 'After initial "no longer," the modal comes before the subject.'],
            ["No longer can submit students the form by email.", 'The subject should follow the modal: "can students submit."'],
            ["No longer do students can submit the form by email.", 'Do not combine "do" with the modal "can."']
          ]
        }
      ],
      C1: [
        {
          correct: "Only after the raw data were released did the criticism become persuasive.",
          reason: 'The fronted "only after" phrase requires inversion in the main clause.',
          wrongs: [
            ["Only after the raw data were released the criticism became persuasive.", 'The main clause needs auxiliary inversion after initial "only after."'],
            ["Only after were the raw data released did the criticism become persuasive.", 'The "after" clause keeps normal subject-verb order here.'],
            ["Only after the raw data were released did the criticism became persuasive.", 'After "did," use "become," not "became."']
          ]
        },
        {
          correct: "Not only did the proposal reduce costs, it also simplified reporting.",
          reason: 'Initial "not only" with a past action uses "did" before the subject.',
          wrongs: [
            ["Not only the proposal reduced costs, it also simplified reporting.", 'After initial "not only," use auxiliary inversion.'],
            ["Not only did the proposal reduced costs, it also simplified reporting.", 'After "did," use "reduce," not "reduced."'],
            ["Not only reduced the proposal costs, it also simplified reporting.", 'Use "did" plus the base verb with this action verb.']
          ]
        },
        {
          correct: "Seldom has a short memo caused such a long debate.",
          reason: 'Initial "seldom" triggers inversion with the present perfect helper "has."',
          wrongs: [
            ["Seldom a short memo has caused such a long debate.", 'The helper must come before the subject after initial "seldom."'],
            ["Seldom has a short memo cause such a long debate.", 'Present perfect needs the past participle "caused."'],
            ["Seldom did a short memo has caused such a long debate.", 'Do not combine "did" with present perfect "has caused."']
          ]
        },
        {
          correct: "What the policy leaves unclear is who may approve exceptions.",
          reason: 'The pseudo-cleft highlights the unresolved question.',
          wrongs: [
            ["What does the policy leave unclear is who may approve exceptions.", 'This mixes question order into a statement.'],
            ["What the policy leaves unclear it is who may approve exceptions.", 'Do not add "it" before "is" in a pseudo-cleft.'],
            ["What the policy leave unclear is who may approve exceptions.", '"Policy" is singular, so use "leaves."']
          ]
        },
        {
          correct: "It is the assumption behind the model that I find problematic.",
          reason: 'The cleft sentence emphasizes the exact part of the model being criticized.',
          wrongs: [
            ["It the assumption behind the model is that I find problematic.", 'The cleft needs "It is" before the emphasized phrase.'],
            ["The assumption behind the model it is that I find problematic.", 'This mixes a regular subject with a cleft.'],
            ["It is the assumption behind the model which I find it problematic.", 'Do not repeat the object with "it" after "find."']
          ]
        },
        {
          correct: "Under no circumstances may interview notes be shared outside the team.",
          reason: 'The negative fronted phrase requires inversion with the modal "may."',
          wrongs: [
            ["Under no circumstances interview notes may be shared outside the team.", 'The modal must come before the subject.'],
            ["Under no circumstances may be shared interview notes outside the team.", 'The subject should follow the modal before the passive verb phrase.'],
            ["Under no circumstances do interview notes may be shared outside the team.", 'Do not combine "do" with the modal "may."']
          ]
        },
        {
          correct: "Had the archive been complete, the conclusion would have been stronger.",
          reason: 'This is conditional inversion: initial "Had" means "If something had happened" in a formal style.',
          wrongs: [
            ["Had the archive complete, the conclusion would have been stronger.", 'The passive perfect needs "been complete" here.'],
            ["If had the archive been complete, the conclusion would have been stronger.", 'Do not combine "if" with this inverted conditional form.'],
            ["Had the archive been complete, the conclusion had been stronger.", 'The result clause needs "would have been."']
          ]
        },
        {
          correct: "The committee did not reject the idea; it rejected the evidence offered for it.",
          reason: 'The contrast after the semicolon emphasizes what was rejected and what was not.',
          wrongs: [
            ["The committee did not reject the idea; rejected the evidence offered for it.", 'The second clause needs a subject.'],
            ["The committee rejected not the idea; it rejected the evidence offered for it.", 'This placement of "not" is unnatural in modern English.'],
            ["Not the committee rejected the idea; it rejected the evidence offered for it.", 'This incorrectly emphasizes the subject instead of the object.']
          ]
        },
        {
          correct: "Only in the revised appendix does the author define the key term.",
          reason: 'An initial "only in" phrase requires inversion with "does."',
          wrongs: [
            ["Only in the revised appendix the author defines the key term.", 'The fronted "only" phrase requires auxiliary inversion.'],
            ["Only in the revised appendix defines the author the key term.", 'Use "does" plus the base verb with this action verb.'],
            ["Only in the revised appendix does the author defines the key term.", 'After "does," use "define," not "defines."']
          ]
        },
        {
          correct: "So limited was the sample that the authors avoided broad claims.",
          reason: 'Fronted "so + adjective" can trigger inversion to emphasize degree.',
          wrongs: [
            ["So limited the sample was that the authors avoided broad claims.", 'The be verb should come before the subject in this emphatic structure.'],
            ["So was limited the sample that the authors avoided broad claims.", 'The adjective belongs before "was the sample."'],
            ["So limited did the sample was that the authors avoided broad claims.", 'Do not mix "did" with the be verb "was."']
          ]
        },
        {
          correct: "No sooner had the funding been approved than the timeline changed.",
          reason: 'The pattern is "No sooner had" plus a clause, then "than" plus the next event.',
          wrongs: [
            ["No sooner the funding had been approved than the timeline changed.", 'After "no sooner," the helper comes before the subject.'],
            ["No sooner had the funding approved than the timeline changed.", 'The passive form needs "been approved."'],
            ["No sooner had the funding been approved when the timeline changed.", 'Use "than," not "when," after "no sooner."']
          ]
        },
        {
          correct: "The issue is not whether the data exist, but whether they are usable.",
          reason: 'The paired contrast "not whether" and "but whether" focuses the exact issue.',
          wrongs: [
            ["The issue is not whether the data exist, but they are usable.", 'The second half should repeat "whether" for parallel contrast.'],
            ["Not the issue is whether the data exist, but whether they are usable.", 'This places "not" before the subject unnaturally.'],
            ["The issue not is whether the data exist, but whether they are usable.", 'The normal order is "is not."']
          ]
        },
        {
          correct: "Little did the reviewers know that the files had been mislabeled.",
          reason: 'Initial "little" with this meaning requires inversion with "did."',
          wrongs: [
            ["Little the reviewers knew that the files had been mislabeled.", 'Use auxiliary inversion after initial "little."'],
            ["Little knew the reviewers that the files had been mislabeled.", 'Modern English normally uses "did" plus the base verb here.'],
            ["Little did the reviewers knew that the files had been mislabeled.", 'After "did," use "know," not "knew."']
          ]
        },
        {
          correct: "It was because the baseline shifted that the comparison became misleading.",
          reason: 'The cleft sentence emphasizes the reason for the misleading comparison.',
          wrongs: [
            ["It because the baseline shifted was that the comparison became misleading.", 'The cleft needs "It was because" in this order.'],
            ["Because the baseline shifted it was that the comparison became misleading.", 'This mixes an ordinary because-clause with a cleft.'],
            ["It was because the baseline shifted which the comparison became misleading.", 'Use "that" to complete this cleft structure.']
          ]
        },
        {
          correct: "Not a single applicant was told why the form had changed.",
          reason: '"Not a single" strongly emphasizes that no applicant received the explanation.',
          wrongs: [
            ["Not a single applicant were told why the form had changed.", '"Applicant" is singular, so use "was."'],
            ["Not single applicant was told why the form had changed.", 'The phrase needs the article "a": "not a single."'],
            ["A not single applicant was told why the form had changed.", '"Not" belongs before "a single applicant."']
          ]
        },
        {
          correct: "Only if the limitation is disclosed can the estimate be trusted.",
          reason: 'A fronted "only if" phrase requires inversion in the main clause.',
          wrongs: [
            ["Only if the limitation is disclosed the estimate can be trusted.", 'The modal "can" must come before the subject in the main clause.'],
            ["Only if is the limitation disclosed can the estimate be trusted.", 'The if-clause itself keeps normal order here.'],
            ["Only if the limitation is disclosed can be trusted the estimate.", 'The subject should come before the passive verb phrase after "can."']
          ]
        },
        {
          correct: "The report emphasizes accuracy rather than speed.",
          reason: '"Rather than" clearly emphasizes the preferred quality by contrasting it with another.',
          wrongs: [
            ["The report emphasizes rather accuracy than speed.", 'The phrase is "accuracy rather than speed."'],
            ["Rather the report emphasizes accuracy than speed.", 'This placement of "rather" is not natural for the contrast.'],
            ["The report rather than emphasizes accuracy speed.", 'This breaks the verb phrase and loses the contrast.']
          ]
        },
        {
          correct: "Scarcely had the hearing begun when the recording failed.",
          reason: 'The pattern is "Scarcely had" plus a clause, then "when" plus the next event.',
          wrongs: [
            ["Scarcely the hearing had begun when the recording failed.", 'After initial "scarcely," put the helper before the subject.'],
            ["Scarcely had the hearing begin when the recording failed.", 'Past perfect needs the past participle "begun."'],
            ["Scarcely had begun the hearing when the recording failed.", 'The subject should follow the helper before the main verb.']
          ]
        },
        {
          correct: "What the witness remembered most clearly was the final warning.",
          reason: 'The pseudo-cleft places the most clearly remembered detail at the end for emphasis.',
          wrongs: [
            ["What did the witness remember most clearly was the final warning.", 'This mixes question order into a statement.'],
            ["What the witness remembered most clearly it was the final warning.", 'Do not add "it" before "was" in this pattern.'],
            ["What the witness remembered most clearly were the final warning.", 'Use "was" because the emphasized noun phrase is singular.']
          ]
        },
        {
          correct: "Nowhere in the policy does it say that late appeals are automatic.",
          reason: 'Initial "nowhere" requires inversion with "does."',
          wrongs: [
            ["Nowhere in the policy it says that late appeals are automatic.", 'After initial "nowhere," use auxiliary inversion.'],
            ["Nowhere in the policy says it that late appeals are automatic.", 'Use "does it say" with this action verb.'],
            ["Nowhere in the policy does it says that late appeals are automatic.", 'After "does," use "say," not "says."']
          ]
        }
      ],
      C2: [
        {
          correct: "Only by treating silence as ambiguous can the ruling avoid overreach.",
          reason: 'The fronted "only by" phrase requires modal inversion in the main clause.',
          wrongs: [
            ["Only by treating silence as ambiguous the ruling can avoid overreach.", 'The modal "can" must come before the subject after initial "only by."'],
            ["Only by treat silence as ambiguous can the ruling avoid overreach.", 'After "by," use the -ing form "treating."'],
            ["Only treating silence as ambiguous by can the ruling avoid overreach.", 'The phrase "by treating" must stay together.']
          ]
        },
        {
          correct: "Not since the 1998 amendment has the clause been read so narrowly.",
          reason: 'Initial "not since" triggers inversion with the present perfect helper "has."',
          wrongs: [
            ["Not since the 1998 amendment the clause has been read so narrowly.", 'The helper must come before the subject after initial "not since."'],
            ["Not since the 1998 amendment has the clause read so narrowly.", 'The passive perfect needs "been read."'],
            ["Not since the 1998 amendment did the clause has been read so narrowly.", 'Do not combine "did" with present perfect "has been read."']
          ]
        },
        {
          correct: "What the dissent elides is the difference between permission and consent.",
          reason: 'The pseudo-cleft emphasizes the omitted distinction.',
          wrongs: [
            ["What does the dissent elide is the difference between permission and consent.", 'This mixes question order into a statement.'],
            ["What the dissent elides it is the difference between permission and consent.", 'Do not insert "it" before "is" in a pseudo-cleft.'],
            ["What the dissent elide is the difference between permission and consent.", '"Dissent" is singular, so use "elides."']
          ]
        },
        {
          correct: "It is not the outcome but the reasoning that the panel questions.",
          reason: 'This cleft contrast emphasizes that the reasoning, not the result, is disputed.',
          wrongs: [
            ["It is not the outcome but the reasoning which the panel questions it.", 'Do not repeat the object with "it."'],
            ["It not is the outcome but the reasoning that the panel questions.", 'The normal order is "It is not" plus the contrasted phrase.'],
            ["Not it is the outcome but the reasoning that the panel questions.", '"Not" does not belong before "it" in this cleft.']
          ]
        },
        {
          correct: "Had the parties intended arbitration, the contract would have said so expressly.",
          reason: 'This formal conditional inversion means "If the parties had intended arbitration."',
          wrongs: [
            ["Had the parties intend arbitration, the contract would have said so expressly.", 'The inverted past perfect needs the past participle "intended."'],
            ["If had the parties intended arbitration, the contract would have said so expressly.", 'Do not combine "if" with the inverted conditional form.'],
            ["Had the parties intended arbitration, the contract had said so expressly.", 'The result clause needs "would have said."']
          ]
        },
        {
          correct: "So attenuated was the causal chain that liability could not attach.",
          reason: 'Fronted "so + adjective" triggers inversion to emphasize degree.',
          wrongs: [
            ["So attenuated the causal chain was that liability could not attach.", 'The be verb should come before the subject.'],
            ["So was attenuated the causal chain that liability could not attach.", 'The adjective belongs before "was the causal chain."'],
            ["So attenuated did the causal chain was that liability could not attach.", 'Do not mix "did" with the be verb "was."']
          ]
        },
        {
          correct: "Under no plausible reading does the statute confer jurisdiction.",
          reason: 'The negative fronted phrase requires inversion with "does."',
          wrongs: [
            ["Under no plausible reading the statute confers jurisdiction.", 'After this negative fronted phrase, use auxiliary inversion.'],
            ["Under no plausible reading confers the statute jurisdiction.", 'Use "does" plus the base verb with this action verb.'],
            ["Under no plausible reading does the statute confers jurisdiction.", 'After "does," use "confer," not "confers."']
          ]
        },
        {
          correct: "No sooner had the injunction expired than the agency reinstated the rule.",
          reason: 'The formal pattern is "No sooner had" plus a clause, then "than" plus the next event.',
          wrongs: [
            ["No sooner the injunction had expired than the agency reinstated the rule.", 'After initial "no sooner," put the helper before the subject.'],
            ["No sooner had the injunction expire than the agency reinstated the rule.", 'Past perfect needs the past participle "expired."'],
            ["No sooner had the injunction expired when the agency reinstated the rule.", 'Use "than," not "when," after "no sooner."']
          ]
        },
        {
          correct: "The brief challenges not the facts themselves, but the inference drawn from them.",
          reason: 'The delayed "not" and "but" contrast emphasizes the real target of the challenge.',
          wrongs: [
            ["The brief not challenges the facts themselves, but the inference drawn from them.", 'This placement of "not" is unnatural with the verb.'],
            ["The brief challenges not the facts themselves, but inference drawn from them.", 'The second noun phrase needs "the" because it is specific.'],
            ["Not the brief challenges the facts themselves, but the inference drawn from them.", 'This incorrectly emphasizes the subject rather than the object.']
          ]
        },
        {
          correct: "At issue is whether the waiver was knowing and voluntary.",
          reason: 'This subject-complement inversion foregrounds the disputed question.',
          wrongs: [
            ["At issue whether the waiver was knowing and voluntary is.", 'The verb should come before the content clause.'],
            ["At issue does whether the waiver was knowing and voluntary.", '"Does" is not used in this be-verb inversion.'],
            ["At issue is whether was the waiver knowing and voluntary.", 'The embedded question keeps statement word order.']
          ]
        },
        {
          correct: "Not only had the evidence been withheld, it had also been mislabeled.",
          reason: 'Initial "not only" with past perfect passive requires "had" before the subject.',
          wrongs: [
            ["Not only the evidence had been withheld, it had also been mislabeled.", 'The helper must come before the subject after initial "not only."'],
            ["Not only had the evidence withheld, it had also been mislabeled.", 'The passive perfect needs "been withheld."'],
            ["Not only did the evidence had been withheld, it had also been mislabeled.", 'Do not combine "did" with past perfect "had been withheld."']
          ]
        },
        {
          correct: "What makes the exception difficult to apply is its unclear scope.",
          reason: 'The pseudo-cleft emphasizes the source of the practical difficulty.',
          wrongs: [
            ["What does make the exception difficult to apply is its unclear scope.", 'This mixes question order into a statement.'],
            ["What makes the exception difficult to apply it is its unclear scope.", 'Do not add "it" before "is" in this pattern.'],
            ["What make the exception difficult to apply is its unclear scope.", '"What makes" needs the singular verb form.']
          ]
        },
        {
          correct: "Scarcely had counsel begun when the judge interrupted.",
          reason: 'The pattern "Scarcely had" plus a clause, then "when" plus the next event, emphasizes immediacy.',
          wrongs: [
            ["Scarcely counsel had begun when the judge interrupted.", 'After initial "scarcely," put the helper before the subject.'],
            ["Scarcely had counsel begin when the judge interrupted.", 'Past perfect needs "begun."'],
            ["Scarcely had begun counsel when the judge interrupted.", 'The subject should follow the helper before the main verb.']
          ]
        },
        {
          correct: "Only if the agency discloses its assumptions will the estimate be reviewable.",
          reason: 'Initial "only if" requires inversion in the main clause.',
          wrongs: [
            ["Only if the agency discloses its assumptions the estimate will be reviewable.", 'The modal "will" must come before the subject in the main clause.'],
            ["Only if does the agency disclose its assumptions will the estimate be reviewable.", 'The if-clause itself keeps normal order here.'],
            ["Only if the agency discloses its assumptions will be reviewable the estimate.", 'The subject should follow the modal before the adjective.']
          ]
        },
        {
          correct: "The doctrine is not merely narrow; it is internally unstable.",
          reason: '"Not merely" followed by a second clause emphasizes that the second criticism is stronger.',
          wrongs: [
            ["The doctrine is not merely narrow; is internally unstable.", 'The second clause needs the subject "it."'],
            ["The doctrine not merely is narrow; it is internally unstable.", 'The normal placement is "is not merely narrow."'],
            ["The doctrine is merely not narrow; it is internally unstable.", 'This changes the meaning by denying narrowness instead of strengthening the criticism.']
          ]
        },
        {
          correct: "Nowhere does the record indicate that consent was informed.",
          reason: 'Initial "nowhere" requires inversion with "does."',
          wrongs: [
            ["Nowhere the record indicates that consent was informed.", 'After initial "nowhere," use auxiliary inversion.'],
            ["Nowhere indicates the record that consent was informed.", 'Use "does" plus the base verb with this action verb.'],
            ["Nowhere does the record indicates that consent was informed.", 'After "does," use "indicate," not "indicates."']
          ]
        },
        {
          correct: "It is the timing of disclosure, rather than its content, that proves decisive.",
          reason: 'This cleft contrast emphasizes which aspect of disclosure matters.',
          wrongs: [
            ["It the timing of disclosure is, rather than its content, that proves decisive.", 'The verb "is" should follow "it."'],
            ["The timing of disclosure it is, rather than its content, that proves decisive.", 'This mixes a regular subject with the cleft pattern.'],
            ["It is the timing of disclosure, rather than its content, proves that decisive.", '"That" should introduce the clause before "proves decisive."']
          ]
        },
        {
          correct: "Were the clause severable, the rest of the agreement could stand.",
          reason: 'This formal conditional inversion means "If the clause were severable."',
          wrongs: [
            ["If were the clause severable, the rest of the agreement could stand.", 'Do not combine "if" with the inverted conditional form.'],
            ["Were severable the clause, the rest of the agreement could stand.", 'The subject should follow "were."'],
            ["Were the clause severable, the rest of the agreement can stood.", 'The result clause needs "could stand."']
          ]
        },
        {
          correct: "Little does the opinion say about how damages should be calculated.",
          reason: 'Initial "little" triggers inversion and emphasizes the lack of discussion.',
          wrongs: [
            ["Little the opinion says about how damages should be calculated.", 'After initial "little," use auxiliary inversion.'],
            ["Little says the opinion about how damages should be calculated.", 'Use "does" plus the base verb with this action verb.'],
            ["Little does the opinion says about how damages should be calculated.", 'After "does," use "say," not "says."']
          ]
        },
        {
          correct: "What the precedent forecloses is the broader reading urged by the appellant.",
          reason: 'The pseudo-cleft emphasizes the reading that the precedent rules out.',
          wrongs: [
            ["What does the precedent foreclose is the broader reading urged by the appellant.", 'This mixes question order into a statement.'],
            ["What the precedent forecloses it is the broader reading urged by the appellant.", 'Do not insert "it" before "is."'],
            ["What the precedent foreclose is the broader reading urged by the appellant.", '"Precedent" is singular, so use "forecloses."']
          ]
        }
      ]
    };

    function bespokeEmphasisItem(level, i) {
      const entry = pick(bespokeEmphasisSets[level], i);
      const options = [entry.correct, ...entry.wrongs.map(([option]) => option)];
      const explanation = `${entry.reason} The correct sentence is: ${entry.correct}`;
      const rationales = {
        [entry.correct]: explanation
      };
      for (const [option, note] of entry.wrongs) rationales[option] = note;
      return makeItem(
        "Choose the sentence that gives clear emphasis.",
        options,
        entry.correct,
        `inversion:${level}:bespoke:${i}`,
        "",
        { explanation, rationales }
      );
    }

    function inversion(level, i) {
      if (level === "A1") return bespokeA1Emphasis(i);
      return bespokeEmphasisItem(level, i);
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

    const vocabEntryAdditions = {
      "Everyday vocabulary": {
        A1: [["happy", "pleased", "The child is happy."], ["sad", "unhappy", "The story made Aya sad."], ["clean", "not dirty", "The kitchen is clean."], ["hot", "having a high temperature", "The soup is hot."], ["new", "not old", "This is a new notebook."], ["old", "not new", "The old chair is by the door."], ["easy", "not difficult", "The first question is easy."], ["hard", "difficult", "The test is hard."], ["open", "not closed", "The shop is open now."], ["late", "after the expected time", "The bus is late."], ["full", "containing all it can hold", "The bottle is full."], ["empty", "with nothing inside", "The box is empty."], ["buy", "get by paying money", "I will buy a ticket."], ["find", "discover where something is", "Mina found her keys."], ["leave", "go away from a place", "The class will leave at noon."]],
        A2: [["cancel", "decide something will not happen", "The office will cancel the meeting."], ["arrive", "come to a place", "The train will arrive soon."], ["carry", "hold while moving", "Please carry this bag."], ["lend", "give for a short time", "Can you lend me a pen?"], ["invite", "ask someone to come", "Nadia will invite her neighbor."], ["pack", "put things into a bag or box", "Please pack your bag before class."], ["move", "change place", "We need to move the table."], ["wait", "stay until something happens", "Please wait outside."], ["enough", "as much as needed", "We have enough chairs."], ["early", "before the expected time", "The class ended early."], ["busy", "having a lot to do", "The clinic is busy today."], ["safe", "not dangerous", "This road is safe at night."], ["same", "not different", "We chose the same answer."], ["different", "not the same", "Their schedules are different."], ["usually", "most of the time", "The cafe usually opens at seven."]],
        B1: [["confirm", "say that something is true or certain", "Please confirm your address."], ["replace", "put a new thing in place of an old one", "The school will replace the broken printer."], ["include", "have as one part", "The fee includes lunch."], ["reduce", "make smaller", "The new route may reduce travel time."], ["increase", "make or become larger", "Prices may increase next month."], ["support", "help or give backing to", "The tutor will support new students."], ["remain", "stay the same or stay in place", "The office will remain open."], ["collect", "bring things together", "The clerk will collect the forms."], ["provide", "give what is needed", "The guide provides useful examples."], ["compare", "look at similarities and differences", "Students compare two answers."], ["notice", "see or become aware of", "I noticed a mistake on the form."], ["depend", "be affected or decided by something", "The price depends on the date."], ["suggest", "mention as a possible idea", "The teacher suggested a shorter answer."], ["protect", "keep safe", "The rule protects student privacy."], ["explain", "make clear", "The chart explains the process."]],
        B2: [["efficient", "working well without wasting time", "The new process is efficient."], ["flexible", "able to change easily", "The schedule is flexible."], ["limited", "not large in amount or number", "The course has limited space."], ["essential", "very necessary", "A passport is essential for the trip."], ["optional", "not required", "The final workshop is optional."], ["previous", "earlier", "The previous version was shorter."], ["current", "happening or used now", "The current rule is stricter."], ["entire", "whole", "The entire class passed the test."], ["delay", "a period of waiting", "The delay lasted twenty minutes."], ["benefit", "an advantage", "The main benefit is lower cost."], ["challenge", "a difficult task or problem", "The new system created a challenge."], ["issue", "a problem or topic", "The team discussed one safety issue."], ["solution", "an answer to a problem", "The manager proposed a solution."], ["request", "ask for something", "The student made a request."], ["accessible", "easy to reach or use", "The online form is accessible after login."]],
        C1: [["ambivalent", "having mixed feelings", "The committee was ambivalent about the proposal."], ["plausible", "reasonable or believable", "The explanation sounded plausible."], ["redundant", "unnecessary because it repeats something", "The final paragraph was redundant."], ["infer", "reach a conclusion from evidence", "Readers may infer a change in policy."], ["revise", "change to improve", "The author will revise the introduction."], ["clarify", "make easier to understand", "The note clarifies the deadline."], ["constraint", "a limit", "The budget created a serious constraint."], ["priority", "something more important than other things", "Safety became the first priority."], ["integrate", "combine into a whole", "The course integrates reading and writing."], ["modify", "change partly", "The office modified the rule."], ["monitor", "watch carefully over time", "The clinic will monitor attendance."], ["resolve", "settle or solve", "The team resolved the complaint."], ["retain", "keep", "The school retained the old schedule."], ["shift", "change direction or emphasis", "The discussion shifted to cost."], ["widespread", "found in many places", "The problem was widespread."]],
        C2: [["concede", "admit something is true despite reluctance", "The author concedes one limitation."], ["undermine", "weaken support for something", "The missing data undermine the claim."], ["warrant", "justify", "The evidence does not warrant that conclusion."], ["sustain", "keep going or support over time", "The program could not sustain the early gains."], ["presume", "accept as likely without proof", "The model presumes stable attendance."], ["refute", "show that a claim is false", "The appendix tries to refute the objection."], ["reconcile", "make two things consistent", "The revision reconciles two conflicting rules."], ["diminish", "make less important or strong", "The exception may diminish the policy's effect."], ["compelling", "strong and persuasive", "The testimony was compelling."], ["marginal", "small and not central", "The benefit was marginal."], ["provisional", "temporary and open to change", "The conclusion is provisional."], ["robust", "strong under different conditions", "The result remained robust."], ["misleading", "likely to give a wrong idea", "The average was misleading."], ["inherent", "built into the nature of something", "The plan has inherent risks."], ["subsequent", "coming later", "Subsequent interviews changed the interpretation."]]
      },
      "Workplace vocabulary": {
        A1: [["office", "a place where people work at desks", "The office opens at nine."], ["worker", "a person who works", "Each worker has a badge."], ["meeting", "a time when people discuss work", "The meeting starts soon."], ["break", "a short rest from work", "We take a break at noon."], ["task", "a piece of work", "This task is easy."], ["manager", "a person who directs work", "The manager called the staff."], ["customer", "a person who buys goods or services", "The customer needs help."], ["team", "a group working together", "Our team is small."], ["desk", "a table used for work", "The form is on the desk."], ["phone", "a device used to call people", "The phone is ringing."], ["file", "a set of papers or records", "The file is in the drawer."], ["form", "a document with spaces to fill in", "Please complete the form."], ["sale", "an act of selling", "The sale ended today."], ["shop", "a place that sells things", "The shop closes at six."], ["email", "an electronic message", "I sent an email."]],
        A2: [["schedule", "a plan of times", "The schedule changed yesterday."], ["salary", "regular pay for a job", "Her salary is paid monthly."], ["training", "learning skills for work", "New staff need training."], ["employee", "a person who works for a company", "Each employee received a card."], ["customer service", "help given to customers", "The job requires customer service."], ["receipt", "proof of payment", "Keep the receipt for your records."], ["refund", "money returned to a customer", "The store gave a refund."], ["signature", "a written name", "The form needs a signature."], ["uniform", "special clothes for work", "Workers wear a uniform."], ["branch", "one office of a larger business", "The bank opened a new branch."], ["position", "a job", "She applied for a position."], ["hire", "give someone a job", "The company will hire two clerks."], ["resign", "leave a job officially", "The manager plans to resign."], ["deliver", "bring goods to a place", "They deliver packages daily."], ["supply", "provide what is needed", "The office will supply notebooks."]],
        B1: [["colleague", "a person you work with", "Ask a colleague for help."], ["department", "one part of an organization", "The finance department approved the payment."], ["candidate", "a person applying for a position", "The candidate arrived early."], ["promotion", "move to a higher job", "Omar received a promotion."], ["absence", "time away from work", "The supervisor recorded the absence."], ["benefits", "extra things given with a job", "The job includes health benefits."], ["complaint", "a statement that something is wrong", "The client filed a complaint."], ["procedure", "an official way to do something", "Follow the safety procedure."], ["equipment", "tools or machines used for work", "The lab bought new equipment."], ["inventory", "goods a business has", "The store checked inventory."], ["shift", "a scheduled period of work", "Lena changed her shift."], ["contractor", "a person hired for a specific job", "The contractor repaired the office."], ["reference", "a person who comments on an applicant", "The applicant listed a reference."], ["review", "an official check or evaluation", "The annual review is next week."], ["wage", "pay based on hours or days", "The hourly wage increased."]],
        B2: [["allocate", "give for a particular purpose", "The manager allocated funds for training."], ["delegate", "give a task to another person", "The supervisor delegated the report."], ["evaluate", "judge the quality or value", "The team evaluated the proposal."], ["streamline", "make a process simpler and faster", "The office streamlined registration."], ["outsource", "pay another company to do work", "The company outsourced payroll."], ["retain", "keep employees or customers", "Better benefits helped retain staff."], ["turnover", "the rate at which workers leave", "Turnover fell after wages rose."], ["shortlist", "choose a small group from many", "The panel shortlisted five candidates."], ["compliance", "following rules", "The audit checked compliance."], ["quota", "a required number or amount", "The sales team met its quota."], ["vendor", "a company that sells goods or services", "The vendor sent a revised invoice."], ["liability", "legal responsibility", "The contract limits liability."], ["onboarding", "introducing a new employee to a job", "Onboarding begins Monday."], ["revenue", "money a business receives", "Revenue increased this quarter."], ["procurement", "buying supplies or services", "Procurement approved the order."]],
        C1: [["remuneration", "payment for work", "The contract specifies remuneration."], ["retention", "keeping staff or customers", "Retention improved after the policy change."], ["redundancy", "loss of a job because it is no longer needed", "The merger led to redundancies."], ["grievance", "a formal workplace complaint", "The employee filed a grievance."], ["deliverable", "a required work product", "The final deliverable is due Friday."], ["escalate", "send a problem to a higher level", "The clerk escalated the complaint."], ["forecast", "predict future results", "The analyst forecast lower sales."], ["margin", "the difference between cost and selling price", "The margin narrowed last quarter."], ["audit trail", "records showing what happened", "The system keeps an audit trail."], ["counterparty", "the other side in an agreement", "The counterparty accepted the revised clause."], ["handover", "transfer of responsibility", "The handover took place before noon."], ["benchmark", "a standard for comparison", "The team set a benchmark."], ["contingency", "a plan for a possible problem", "The project needs a contingency."], ["jurisdiction", "official authority over an area", "The agency questioned its jurisdiction."], ["tendering", "inviting bids for work or supplies", "Tendering rules delayed the purchase."]],
        C2: [["indemnity", "protection against legal loss", "The contract includes an indemnity clause."], ["noncompete", "agreement limiting future work for competitors", "The noncompete clause was challenged."], ["fiduciary duty", "legal duty to act for another's benefit", "Directors owe a fiduciary duty."], ["liquidated damages", "pre-set compensation for breach", "The agreement specifies liquidated damages."], ["force majeure", "uncontrollable event preventing performance", "The storm triggered force majeure."], ["material breach", "serious failure to meet a contract", "Late delivery was treated as a material breach."], ["severance", "payment after leaving a job", "The executive negotiated severance."], ["arbitrator", "neutral person who settles a dispute", "The arbitrator issued a decision."], ["collective bargaining", "negotiation between workers and employer", "Collective bargaining resumed Tuesday."], ["whistleblower", "person reporting wrongdoing", "The whistleblower received protection."], ["due process", "fair legal procedure", "The dismissal raised due process concerns."], ["restraint of trade", "restriction on business competition", "The court examined restraint of trade."], ["vesting", "gaining a right over time", "The stock options vest gradually."], ["subcontractor", "company hired by a contractor", "The subcontractor missed the deadline."], ["solvency", "ability to pay debts", "The audit questioned solvency."]]
      },
      "Academic vocabulary": {
        A1: [["class", "a lesson with students", "The class begins at ten."], ["book", "pages with words to read", "The book is on the table."], ["page", "one side of paper in a book", "Open page five."], ["word", "a unit of language", "This word is new."], ["teacher", "a person who teaches", "The teacher explained the answer."], ["student", "a person who studies", "Each student has a book."], ["question", "something you ask", "The question is easy."], ["exam", "a test", "The exam is tomorrow."], ["read", "look at words and understand them", "Please read the sentence."], ["write", "make words on paper or a screen", "Write your name here."], ["listen", "pay attention to sound", "Listen to the teacher."], ["practice", "repeat to improve", "Practice helps spelling."], ["score", "number of points", "The score was high."], ["library", "a place with books", "The library closes at six."], ["homework", "schoolwork done outside class", "The homework is short."]],
        A2: [["definition", "the meaning of a word", "The dictionary gives a definition."], ["example", "one case that shows an idea", "The teacher gave an example."], ["paragraph", "a group of sentences", "The paragraph has one main idea."], ["grade", "a mark for work", "The grade was fair."], ["subject", "an area of study", "Science is her favorite subject."], ["result", "what happens at the end", "The result was surprising."], ["research", "careful study to learn facts", "The class began simple research."], ["survey", "questions asked to many people", "The survey had ten questions."], ["chart", "a picture showing information", "The chart shows attendance."], ["average", "a typical middle amount", "The average score rose."], ["compare", "look at how things are similar or different", "Students compare two texts."], ["summarize", "state the main points briefly", "Please summarize the article."], ["identify", "find or name", "Identify the main idea."], ["reason", "why something happens", "The reason was unclear."], ["detail", "a small piece of information", "Use one detail from the text."]],
        B1: [["claim", "a statement someone says is true", "The claim needs evidence."], ["data", "information used for study", "The data came from a survey."], ["section", "one part of a text", "The final section is short."], ["interpret", "explain the meaning", "Students interpret the graph."], ["conclude", "decide after thinking", "The author concludes that costs fell."], ["define", "state the meaning", "The paper defines the term."], ["process", "a series of steps", "The process takes two weeks."], ["structure", "the way parts are organized", "The essay has a clear structure."], ["respond", "answer or react", "Participants responded online."], ["select", "choose", "The researcher selected one group."], ["trend", "a general direction of change", "The trend continued for months."], ["source", "where information comes from", "The source is listed below."], ["bias", "unfair influence on judgment", "The sample may show bias."], ["cite", "mention as evidence", "The essay cites two articles."], ["context", "the situation around something", "Context changes the meaning."]],
        B2: [["criterion", "a standard for judging", "Cost was one criterion."], ["sequence", "the order of events", "The sequence was hard to follow."], ["proportion", "a part compared with the whole", "A large proportion answered yes."], ["contrast", "a clear difference", "The contrast is important."], ["approach", "a way of dealing with something", "The study uses a new approach."], ["scope", "the range covered", "The scope of the report is narrow."], ["infer", "reach a conclusion from evidence", "The reader inferred the answer from context."], ["assess", "judge carefully", "The panel assessed the evidence."], ["consistent", "not changing or conflicting", "The findings were consistent."], ["principle", "a basic rule or idea", "The principle applies broadly."], ["sample", "the group studied", "The sample was small."], ["method", "a way of doing research", "The method was simple."], ["outcome", "the final result", "The outcome was positive."], ["model", "a simplified representation of an idea or system", "The model explains the pattern."], ["indicator", "a sign or measure used to show something", "Attendance was one indicator of engagement."]],
        C1: [["replicate", "repeat a study to check results", "The team tried to replicate the experiment."], ["synthesis", "combination of ideas into a whole", "The chapter offers a synthesis."], ["limitation", "a weakness or boundary", "The author notes one limitation."], ["causation", "the act of causing something", "The data do not prove causation."], ["replication", "repeating a study to check results", "Replication strengthened the finding."], ["reliability", "consistency of a measure", "Reliability improved after piloting."], ["tentative", "careful and not final", "The conclusion remains tentative."], ["inference", "a conclusion drawn from evidence", "The inference was too broad."], ["construct", "an abstract idea being measured", "The construct was defined narrowly."], ["literature", "published research on a subject", "The literature is divided."], ["operationalize", "define so something can be measured", "The study operationalizes engagement narrowly."], ["qualitative", "based on qualities rather than numbers", "The interviews provide qualitative data."], ["quantitative", "based on numbers", "The survey gives quantitative evidence."], ["theoretical", "related to ideas rather than practice", "The theoretical issue remains unsettled."], ["conceptual", "related to concepts", "The model has a conceptual weakness."]],
        C2: [["epistemic", "related to knowledge or justification", "The argument has an epistemic problem."], ["ontology", "study of what exists", "The paper discusses social ontology."], ["heuristic", "useful method for discovery", "The model is a helpful heuristic."], ["taxonomy", "system for classifying things", "The article proposes a taxonomy."], ["normative", "about how things should be", "The claim is normative, not descriptive."], ["descriptive", "about how things are", "The passage makes a descriptive claim."], ["counterfactual", "imagined contrary-to-fact situation", "The analysis uses a counterfactual."], ["falsifiable", "able to be tested and shown false", "A useful hypothesis is falsifiable."], ["generalizability", "how far findings apply elsewhere", "Generalizability is limited."], ["triangulate", "check by using multiple sources", "Researchers triangulate interview data."], ["dialectic", "reasoning through opposing ideas", "The article presents a dialectic."], ["synchronic", "focused on one point in time", "The analysis is synchronic."], ["metatheory", "theory about theories", "The chapter develops a metatheory."], ["problematize", "show as more complex", "The essay problematizes the distinction."], ["teleology", "explanation by purpose or end", "The argument rejects teleology."]]
      },
      "Meaning in context": {
        A1: [["bright", "full of light", "The room is bright."], ["fair", "not too bad; acceptable", "The price is fair."], ["kind", "nice and helpful", "The teacher is kind."], ["fine", "well or acceptable", "I feel fine today."], ["poor", "having little money", "The family was poor."], ["rich", "having a lot of money", "The city is rich."], ["mean", "not kind", "The comment was mean."], ["short", "not long", "The story is short."], ["long", "not short", "The road is long."], ["left", "remaining", "Only two tickets are left."], ["right", "the opposite of left", "Turn right at the door."], ["back", "the rear part", "Write your name on the back."], ["light", "from the sun or a lamp", "The light is too bright."], ["cold", "ill with a common sickness", "Mina has a cold."], ["hard", "solid and not soft", "The chair is hard."]],
        A2: [["pick up", "collect someone or something", "I will pick up the tickets."], ["take off", "remove clothing", "Please take off your coat."], ["break", "stop working", "The printer may break."], ["change", "money returned after paying", "Keep the change."], ["course", "a series of lessons", "The course lasts six weeks."], ["miss", "feel sad because someone is absent", "I miss my family."], ["save", "avoid spending", "The coupon will save money."], ["stand", "be in an upright position", "Please stand near the door."], ["run", "move quickly on foot", "The children run after school."], ["clear", "without anything blocking", "The road is clear now."], ["book", "reserve", "We need to book a room."], ["watch", "look at for a period of time", "Watch the video carefully."], ["line", "people waiting in order", "The line is long."], ["mind", "be bothered by", "Do you mind waiting here?"], ["date", "a day on a calendar", "Write the date at the top."]],
        B1: [["charge", "ask someone to pay", "The hotel will charge a small fee."], ["draw", "attract", "The event may draw a large crowd."], ["raise", "mention for discussion", "The student raised a concern."], ["settle", "end a disagreement", "The two sides settled the dispute."], ["cover", "include or deal with", "The course covers grammar."], ["apply", "be relevant", "The rule does not apply here."], ["handle", "manage or deal with", "The office handles complaints."], ["reflect", "show", "The survey reflects student opinion."], ["secure", "obtain with effort", "The team secured funding."], ["serve", "have a function", "The chart serves as evidence."], ["decline", "refuse politely", "The applicant declined the offer."], ["maintain", "continue to state", "The author maintains that costs fell."], ["extend", "make longer", "The office extended the deadline."], ["note", "mention briefly", "The report notes one limitation."], ["shift", "change", "The discussion shifted to safety."]],
        B2: [["qualify", "make less absolute", "The final paragraph qualifies the claim."], ["frame", "present in a particular way", "The introduction frames the issue as practical."], ["mediate", "influence the relation between things", "Cost may mediate the policy's effect."], ["offset", "balance or reduce", "Savings offset the higher fee."], ["undercut", "weaken", "The exception undercuts the rule."], ["render", "make", "The missing signature renders the form invalid."], ["bear", "carry or support", "The data bear on the conclusion."], ["project", "estimate into the future", "The graph projects next year's cost."], ["screen", "check in order to select", "The clinic screens applicants."], ["address", "speak to", "The director addressed the staff."], ["issue", "a topic or problem", "Safety became the central issue."], ["conduct", "manage oneself", "Staff must conduct themselves professionally."], ["approach", "move closer to", "The train approached the station."], ["maintain", "keep in good condition", "Workers maintain the equipment."], ["principle", "basic belief or rule", "The decision rests on one principle."]],
        C1: [["entail", "involve as a necessary result", "The change would entail extra costs."], ["preclude", "prevent or make impossible", "The deadline may preclude late appeals."], ["substantiate", "support with evidence", "The appendix substantiates the claim."], ["construe", "interpret", "Readers may construe the phrase as a warning."], ["ameliorate", "make better", "The policy may ameliorate the problem."], ["undermine", "weaken", "The exception undermines the argument."], ["invoke", "mention as support or authority", "The lawyer invoked the earlier ruling."], ["exceed", "go beyond", "The cost exceeded the estimate."], ["constitute", "amount to", "The delay may constitute a breach."], ["attribute", "explain as caused by", "The author attributes the rise to training."], ["preserve", "keep unchanged", "The policy preserves the old exception."], ["undergo", "experience", "The system will undergo review."], ["offset", "balance", "The grant offsets higher fees."], ["warrant", "justify", "The result warrants further study."], ["approximate", "come close to", "The estimate approximates the final total."]],
        C2: [["militate", "have force or influence", "The delay militates against approval."], ["problematize", "show as more complex", "The article problematizes the usual distinction."], ["instantiate", "represent by example", "The case instantiates the broader principle."], ["circumscribe", "limit", "The ruling circumscribes agency discretion."], ["vitiate", "spoil or weaken legally", "The omission may vitiate consent."], ["adduce", "cite as evidence", "The defense adduced new testimony."], ["impute", "attribute, often blame", "The report imputes negligence to the contractor."], ["reify", "treat an abstraction as a thing", "The essay reifies culture."], ["supersede", "replace with something newer", "The statute supersedes the old rule."], ["attenuate", "make weaker", "The delay attenuates the causal claim."], ["corroborate", "confirm with evidence", "The emails corroborate the timeline."], ["foreclose", "rule out", "The ruling forecloses that interpretation."], ["predicate", "base on", "The appeal is predicated on procedural error."], ["buttress", "support", "The examples buttress the argument."], ["elide", "leave out or gloss over", "The summary elides a key distinction."]]
      },
      Nuance: {
        A1: [["always", "every time", "The library always closes at six."], ["never", "not at any time", "The office never opens on Sunday."], ["sometimes", "on some occasions", "Sometimes the bus is late."], ["soon", "after a short time", "The lesson will start soon."], ["again", "one more time", "Please read the sentence again."], ["still", "continuing now", "Mina is still at school."], ["already", "before now", "The class has already started."], ["just", "a very short time ago", "The train just arrived."], ["too", "more than wanted", "The bag is too heavy."], ["very", "to a high degree", "The room is very cold."], ["quite", "fairly", "The test is quite short."], ["really", "very", "The answer is really clear."], ["together", "with each other", "We studied together."], ["alone", "without other people", "Carlos worked alone."], ["enough", "as much as needed", "There is enough time."]],
        A2: [["barely", "only just", "We barely caught the bus."], ["nearly", "almost", "The form is nearly complete."], ["especially", "more than usual", "The rule is especially important."], ["probably", "likely", "The office will probably call."], ["possibly", "maybe", "The meeting may possibly move online."], ["exactly", "with no difference", "The train left exactly at noon."], ["currently", "at the present time", "The office is currently closed."], ["mostly", "for the most part", "The course is mostly online."], ["rather", "quite; to some degree", "The room was rather noisy."], ["fairly", "moderately", "The instructions were fairly clear."], ["instead", "as a replacement", "We met online instead."], ["either", "one or the other", "Choose either answer."], ["both", "the two together", "Both forms are required."], ["neither", "not one and not the other", "Neither answer is correct."], ["around", "approximately", "The trip takes around an hour."]],
        B1: [["apparently", "as it seems", "Apparently, the office closed early."], ["relatively", "compared with others", "The fee is relatively low."], ["mostly", "for the most part", "The comments were mostly positive."], ["partly", "not completely", "The delay was partly our fault."], ["temporarily", "for a short time", "The clinic closed temporarily."], ["primarily", "mainly", "The rule applies primarily to visitors."], ["frequently", "often", "Students frequently ask this question."], ["rarely", "not often", "The system rarely fails."], ["slight", "small in degree", "The form had a slight error."], ["serious", "important or worrying", "The delay caused a serious problem."], ["particular", "one exact thing, not any thing", "Give a particular example."], ["general", "not detailed or specific", "The comment was too general."], ["official", "connected with rules or public duties", "The email used official language."], ["informal", "casual", "The note was informal."], ["short-term", "lasting only for a short time", "The change is short-term."]],
        B2: [["arguably", "it can reasonably be argued", "The new rule is arguably fairer."], ["presumably", "as one may reasonably suppose", "The office is presumably closed."], ["comparatively", "when compared with others", "The method is comparatively simple."], ["approximately", "not exactly but close", "The class lasted approximately an hour."], ["notably", "in a way worth noticing", "Notably, costs fell after the change."], ["substantially", "by a large amount", "Attendance increased substantially."], ["marginally", "by a small amount", "Scores improved marginally."], ["apparently", "seemingly", "The file was apparently lost."], ["exact", "fully correct in detail", "The teacher asked for an exact answer."], ["sensible", "showing good judgment", "The request seemed sensible."], ["obvious", "easy to notice", "The cause was not obvious."], ["significant", "large or important enough to matter", "There was a significant increase."], ["estimated", "judged roughly rather than measured exactly", "The chart gives an estimated number."], ["considerable", "large enough to matter", "The change made a considerable difference."], ["modest", "limited but real", "The program had a modest effect."]],
        C1: [["ostensibly", "apparently but perhaps not actually", "The change was ostensibly made for safety."], ["implicitly", "without being directly stated", "The policy implicitly excludes late appeals."], ["explicitly", "directly and clearly", "The rule explicitly mentions refunds."], ["inherently", "by its nature", "The method is inherently limited."], ["nominally", "in name only", "The course is nominally optional."], ["materially", "in an important way", "The correction materially changes the result."], ["tentatively", "not finally", "The committee tentatively approved the plan."], ["durable", "able to remain strong over time", "The result was durable."], ["peripheral", "not central", "The issue was peripheral."], ["salient", "most noticeable or important", "The salient issue was cost."], ["equivocal", "unclear or mixed", "The evidence was equivocal."], ["contingent", "dependent on something else", "Approval is contingent on funding."], ["unstated", "not said directly", "The memo contained an unstated warning."], ["overt", "open and direct", "The requirement was overt."], ["intrinsic", "belonging naturally to something", "The design has intrinsic limits."]],
        C2: [["putative", "supposed but not proven", "The putative cause was a software error."], ["purportedly", "allegedly", "The data were purportedly complete."], ["purported", "claimed but not proved", "The purported purpose was efficiency."], ["nominal", "existing in name more than reality", "The fee was nominal."], ["substantive", "meaningful in content", "The revision was substantive."], ["tacit", "understood without being said", "The agreement included a tacit exception."], ["tenuous", "weak or uncertain", "The connection is tenuous."], ["de minimis", "too minor to matter legally or practically", "The effect was de minimis."], ["material", "important to the issue", "The omission was material."], ["qualified", "limited rather than absolute", "The endorsement was qualified."], ["provisional", "temporary and open to revision", "The finding remains provisional."], ["categorical", "absolute and without exceptions", "The denial was categorical."], ["ambivalent", "mixed or uncertain", "The response was ambivalent."], ["germane", "directly relevant", "The germane fact was timing."], ["conditional", "depending on something else", "The result is conditional on compliance."]]
      }
    };

    for (const [topic, byLevel] of Object.entries(vocabEntryAdditions)) {
      for (const level of levels) vocabEntries[topic][level].push(...byLevel[level]);
    }

    function rotatedOtherEntries(entries, answer, index) {
      const seenMeanings = new Set([answer]);
      const others = [];
      for (let offset = 0; offset < entries.length * 2 && others.length < 3; offset += 1) {
        const entry = pick(entries, index + offset);
        if (seenMeanings.has(entry[1])) continue;
        seenMeanings.add(entry[1]);
        others.push(entry);
      }
      return others;
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
      const focusTarget = topic === "Meaning in context" ? `${entry[0]}:${entry[1]}` : entry[0];
      return makeItem(
        `What does "${entry[0]}" mean in this sentence? ${sentence}`,
        [entry[1], ...distractors.map((choice) => choice[1])],
        entry[1],
        `vocab:${topic}:${level}:${focusTarget}`,
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

    const collocationAdditions = {
      A1: [
        ["drink", "water", ["eat", "do", "make"]],
        ["brush", "your teeth", ["wash", "make", "do"]],
        ["wear", "shoes", ["use", "carry", "open"]],
        ["open", "the door", ["start", "make", "do"]],
        ["close", "the window", ["finish", "stop", "catch"]],
        ["wash", "your hands", ["clean", "do", "make"]],
        ["read", "a book", ["look", "speak", "listen"]],
        ["write", "your name", ["say", "do", "open"]],
        ["ride", "a bike", ["drive", "take", "do"]],
        ["play", "music", ["do", "listen", "open"]],
        ["answer", "a question", ["tell", "do", "open"]],
        ["carry", "a bag", ["wear", "drive", "drink"]],
        ["use", "a key", ["wear", "drink", "ride"]],
        ["take", "a picture", ["make", "do", "catch"]],
        ["open", "a book", ["start", "do", "wear"]]
      ],
      A2: [
        ["keep", "a receipt", ["hold", "do", "make"]],
        ["miss", "a bus", ["lose", "drop", "leave"]],
        ["make", "a mistake", ["do", "take", "catch"]],
        ["take", "notes", ["make", "do", "write"]],
        ["complete", "a form", ["do", "make", "write"]],
        ["attend", "a meeting", ["visit", "assist", "join"]],
        ["join", "a class", ["enter", "attend", "follow"]],
        ["catch", "a train", ["take", "meet", "reach"]],
        ["pay", "a fee", ["spend", "cost", "buy"]],
        ["sign", "a contract", ["write", "mark", "draw"]],
        ["cancel", "an appointment", ["stop", "close", "leave"]],
        ["arrange", "a meeting", ["put", "set", "make"]],
        ["follow", "instructions", ["keep", "walk", "move"]],
        ["give", "advice", ["say", "tell", "speak"]],
        ["make", "progress", ["do", "take", "hold"]]
      ],
      B1: [
        ["meet", "requirements", ["touch", "visit", "arrive"]],
        ["raise", "awareness", ["lift", "grow", "make"]],
        ["resolve", "a dispute", ["answer", "close", "finish"]],
        ["submit", "a request", ["open", "do", "give"]],
        ["conduct", "an interview", ["make", "solve", "take"]],
        ["make", "arrangements", ["do", "set", "put"]],
        ["give", "permission", ["make", "allow", "send"]],
        ["take", "action", ["make", "do", "move"]],
        ["provide", "support", ["make", "hold", "set"]],
        ["collect", "data", ["touch", "solve", "raise"]],
        ["draw", "a conclusion", ["make", "take", "hold"]],
        ["receive", "feedback", ["take", "hear", "accept"]],
        ["reduce", "costs", ["close", "solve", "hold"]],
        ["improve", "performance", ["grow", "build", "repair"]],
        ["gain", "confidence", ["win", "earn", "take"]]
      ],
      B2: [
        ["conduct", "an analysis", ["hold", "reach", "take"]],
        ["pose", "a question", ["do", "hold", "reach"]],
        ["allocate", "funding", ["put", "send", "follow"]],
        ["implement", "a policy", ["perform", "do", "install"]],
        ["address", "concerns", ["speak", "tell", "answer"]],
        ["maintain", "standards", ["save", "make", "open"]],
        ["assume", "responsibility", ["hold", "make", "carry"]],
        ["present", "evidence", ["make", "hold", "reach"]],
        ["achieve", "an objective", ["touch", "hold", "make"]],
        ["establish", "criteria", ["open", "touch", "reach"]],
        ["assess", "risk", ["count", "answer", "make"]],
        ["facilitate", "discussion", ["make", "open", "solve"]],
        ["fulfill", "an obligation", ["serve", "open", "touch"]],
        ["revise", "an estimate", ["change", "review", "renew"]],
        ["monitor", "progress", ["hold", "meet", "open"]]
      ],
      C1: [
        ["formulate", "a strategy", ["make", "write", "design"]],
        ["implement", "safeguards", ["install", "perform", "do"]],
        ["obtain", "consent", ["take", "make", "hold"]],
        ["evaluate", "outcomes", ["make", "hold", "raise"]],
        ["establish", "a precedent", ["open", "follow", "touch"]],
        ["identify", "constraints", ["make", "hold", "answer"]],
        ["reconcile", "differences", ["make", "hold", "raise"]],
        ["refine", "a methodology", ["clean", "move", "hold"]],
        ["challenge", "assumptions", ["fight", "refuse", "move"]],
        ["address", "limitations", ["speak", "hold", "make"]],
        ["generate", "insight", ["hold", "touch", "send"]],
        ["maintain", "confidentiality", ["save", "hold", "make"]],
        ["assess", "feasibility", ["measure", "open", "hold"]],
        ["ensure", "compliance", ["make", "guard", "hold"]],
        ["foster", "collaboration", ["raise", "make", "hold"]]
      ],
      C2: [
        ["adduce", "evidence", ["infer", "derive", "construe"]],
        ["vitiate", "consent", ["damage", "cancel", "weaken"]],
        ["circumscribe", "discretion", ["draw", "define", "preclude"]],
        ["construe", "the statute", ["adduce", "rebut", "attenuate"]],
        ["substantiate", "an allegation", ["state", "infer", "confer"]],
        ["attenuate", "causality", ["derive", "preclude", "instantiate"]],
        ["invoke", "precedent", ["give", "take", "draw"]],
        ["rebut", "a presumption", ["derive", "confer", "circumscribe"]],
        ["reconcile", "authorities", ["combine", "settle", "join"]],
        ["delimit", "scope", ["mark", "measure", "discharge"]],
        ["interrogate", "assumptions", ["ask", "inspect", "question"]],
        ["instantiate", "a principle", ["create", "derive", "rebut"]],
        ["preclude", "recovery", ["confer", "derive", "instantiate"]],
        ["confer", "jurisdiction", ["remove", "limit", "challenge"]],
        ["discharge", "an obligation", ["remove", "confer", "rebut"]]
      ]
    };

    for (const level of levels) collocations[level].push(...collocationAdditions[level]);

    function collocationItem(level, i) {
      const [verb, object, wrongs] = pick(collocations[level], i);
      const c = row(i);
      const phrase = `${verb} ${object}`;
      const occasions = {
        A1: ["before class", "after breakfast", "at school", "before lunch", "at home", "before the bus arrives", "after the lesson", "in the kitchen", "before practice", "at the community center", "before the bell rings", "during the morning routine", "after the teacher speaks", "on the first page", "before the picture activity", "at the front desk", "before the short test", "during the warm-up", "before the cafe opens", "after the final example"],
        A2: ["before the appointment", "on the registration page", "before the train leaves", "during the travel lesson", "before the office closes", "after the phone call", "for the evening class", "at the language center", "before the interview", "on the student portal", "during the workshop", "before the deadline", "after reading the guide", "for the online task", "before the review quiz", "at reception", "before Friday's lesson", "on the class website", "after the reminder", "before submitting the form"],
        B1: ["before the staff meeting", "in the project plan", "before the client call", "during the training session", "before the deadline", "after the schedule changed", "for the safety briefing", "in the weekly report", "before the application review", "after the survey closed", "during the planning discussion", "for the department update", "before the course begins", "in the student handbook", "after the policy reminder", "before the team review", "on the checklist", "for the supervisor's email", "during the support call", "before the final report"],
        B2: ["before the audit deadline", "during the policy review", "in the manager's briefing", "before the budget meeting", "after the complaint review", "for the training portal", "during the data check", "before signing the contract", "in the customer update", "after the planning call", "for the project dashboard", "before the board discussion", "during the hiring process", "on the revised procedure", "after the service report", "for the quarterly summary", "before the compliance check", "during the operations review", "in the evaluation memo", "before the final decision"],
        C1: ["before the committee review", "in the methodology section", "during the stakeholder meeting", "before issuing the recommendation", "after comparing the evidence", "for the compliance review", "on the evaluation form", "after the pilot program", "before publishing the findings", "in the grant application", "during the seminar", "on the risk assessment", "after coding the interviews", "before the final vote", "in the appendix", "for the advisory brief", "during the protocol review", "on the evidence table", "before the policy draft", "in the assessment rubric"],
        C2: ["during the evidentiary hearing", "in the legal memorandum", "before the arbitration panel meets", "on the fiduciary briefing", "after the methodological critique", "before the precedent is cited", "in the interpretive framework", "during the appellate review", "on the technical memorandum", "after the objections are synthesized", "before the caveat is removed", "in the published corrigendum", "during the ethics review", "on the counterargument table", "before the final adjudication", "in the statutory analysis", "during the expert testimony", "on the compliance addendum", "after the longitudinal model is revised", "before the ruling is issued"]
      };
      const customContexts = {
        "brush your teeth": "Before bed, remember to ___ your teeth.",
        "wear shoes": "Visitors must ___ shoes inside the workshop.",
        "wash your hands": "Before lunch, please ___ your hands.",
        "write your name": "Please ___ your name at the top of the page.",
        "ride a bike": `${c.person} learned to ___ a bike in the park.`,
        "play music": `${c.person} likes to ___ music while cooking.`,
        "take a picture": `${c.person} wants to ___ a picture of the class project.`,
        "miss a bus": `${c.person} left early because ${c.person} did not want to ___ a bus.`,
        "make a mistake": `It is easy to ___ a mistake when the instructions change.`,
        "provide support": `The tutor can ___ support during the first week.`,
        "provide evidence": `The author must ___ evidence for the central claim.`,
        "implement safeguards": `The team plans to ___ safeguards after the risk review.`,
        "foster collaboration": `The new workshop is designed to ___ collaboration among teachers.`,
        "mitigate risk": `The revised procedure is intended to ___ risk during the hearing.`,
        "yield results": `The small pilot may ___ results that justify further study.`,
        "exert influence": `A funding change can ___ influence over local practice.`,
        "scrutinize evidence": `The panel must ___ evidence before accepting the claim.`,
        "formulate a hypothesis": `The researchers tried to ___ a hypothesis before collecting data.`,
        "adduce evidence": `The defense will ___ evidence before the arbitration panel.`,
        "vitiate consent": `A hidden fee may ___ consent under the revised policy.`,
        "circumscribe discretion": `The ruling may ___ discretion in later cases.`,
        "construe the statute": `The court must ___ the statute in light of the amendment.`,
        "substantiate an allegation": `The witness tried to ___ an allegation with dated records.`,
        "attenuate causality": `The delayed intervention may ___ causality in the model.`,
        "invoke precedent": `The appellant may ___ precedent from the earlier ruling.`,
        "rebut a presumption": `The agency tried to ___ a presumption created by the statute.`,
        "reconcile authorities": `The brief attempts to ___ authorities that appear to conflict.`,
        "delimit scope": `The definition helps ___ scope without rewriting the rule.`,
        "interrogate assumptions": `The seminar asks students to ___ assumptions behind the method.`,
        "instantiate a principle": `The example may ___ a principle that the article states abstractly.`,
        "preclude recovery": `The missed deadline may ___ recovery under the contract.`,
        "confer jurisdiction": `The statute may ___ jurisdiction on the review panel.`,
        "discharge an obligation": `The signed receipt can ___ an obligation created by the settlement.`
      };
      const text = customContexts[phrase] || `${c.person} needs to ___ ${object} ${pick(occasions[level], i)}.`;
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

    const phrasalAdditions = {
      A1: [
        ["get up", "leave bed", "{person} gets up at seven."],
        ["come back", "return to a place", "Please come back after lunch."],
        ["go away", "leave this place", "The visitors went away quietly."],
        ["lie down", "put your body flat", "The child needs to lie down."],
        ["turn around", "face the other way", "Turn around and read the sign."],
        ["come over", "come to someone's place", "{person} will come over tonight."],
        ["hurry up", "move faster", "Hurry up or we will miss the bus."],
        ["slow down", "move more slowly", "Please slow down near the school."],
        ["line up", "stand in a line", "The students line up outside."],
        ["clean up", "make a place clean", "We clean up after lunch."],
        ["go back", "return", "The class will go back inside."],
        ["come out", "leave an inside place", "The teacher came out of the room."],
        ["look up", "raise your eyes", "Look up at the board."],
        ["turn back", "return the way you came", "The driver had to turn back."],
        ["move in", "start living in a place", "The family will move in tomorrow."]
      ],
      A2: [
        ["turn off", "stop a machine", "Turn off the lights before you leave."],
        ["put on", "place clothing on your body", "Put on your coat before you go outside."],
        ["take off", "remove clothing", "Please take off your shoes."],
        ["write down", "write so you remember", "Write down the new address."],
        ["pick up", "collect", "{person} will pick up the tickets."],
        ["drop off", "leave someone or something somewhere", "The bus will drop off students near the station."],
        ["check in", "register when you arrive", "Please check in at the desk."],
        ["check out", "pay and leave a hotel", "We check out before noon."],
        ["get on", "enter a bus or train", "The students got on the bus."],
        ["get off", "leave a bus or train", "Get off at the next stop."],
        ["try on", "put on clothing to test it", "Can I try on this jacket?"],
        ["hang up", "end a phone call", "Do not hang up until the clerk answers."],
        ["look after", "take care of", "{person} looks after her younger brother."],
        ["run out", "have none left", "We ran out of paper."],
        ["fill in", "write information in a space", "Fill in your name at the top."]
      ],
      B1: [
        ["carry on", "continue", "The class carried on after the break."],
        ["set up", "prepare for use", "The workers set up the chairs."],
        ["get along", "have a friendly relationship", "The two interns get along well."],
        ["deal with", "handle", "The office deals with housing questions."],
        ["hand in", "give work to a teacher", "Please hand in the worksheet."],
        ["show up", "arrive", "Only six people showed up."],
        ["calm down", "become less upset", "The child calmed down after a minute."],
        ["go over", "review", "The teacher went over the answers."],
        ["hold on", "wait briefly", "Hold on while I check the file."],
        ["cut down", "reduce", "{person} cut down on coffee."],
        ["bring back", "return something", "Bring back the library book tomorrow."],
        ["pick out", "choose", "The class picked out a topic."],
        ["leave out", "not include", "The report left out one detail."],
        ["come up", "happen or appear", "A problem came up during registration."],
        ["break down", "stop working", "The printer broke down again."]
      ],
      B2: [
        ["follow up", "take further action", "The manager followed up after the complaint."],
        ["back out", "withdraw from an agreement", "The vendor backed out at the last minute."],
        ["come across", "find by chance", "{person} came across an old receipt."],
        ["make up for", "compensate for", "Extra staff made up for the delay."],
        ["sort out", "solve or organize", "The team sorted out the scheduling problem."],
        ["take on", "accept responsibility for", "The office took on three new cases."],
        ["put forward", "suggest formally", "The committee put forward a proposal."],
        ["account for", "explain", "The report accounts for the missing cases."],
        ["set out", "explain in writing", "The policy sets out the appeal process."],
        ["carry over", "continue into a later period", "Unused funds carried over into April."],
        ["draw on", "use as a source", "The article draws on interview data."],
        ["look over", "check quickly", "Please look over the draft before Monday."],
        ["go through", "examine carefully", "The clerk went through each application."],
        ["bring about", "cause", "The change brought about fewer errors."],
        ["stand for", "represent", "The initials stand for the program name."]
      ],
      C1: [
        ["clamp down on", "control more strictly", "The agency clamped down on late filings."],
        ["follow through", "complete what was promised", "The manager followed through on the agreement."],
        ["come under", "be subjected to", "The policy came under review."],
        ["bear on", "be relevant to", "The evidence bears on the final claim."],
        ["amount to", "be equal to in effect", "The delay amounts to a refusal."],
        ["build on", "develop from", "The new study builds on earlier research."],
        ["touch on", "mention briefly", "The article touches on privacy concerns."],
        ["set forth", "state formally", "The contract sets forth the parties' duties."],
        ["opt out of", "choose not to participate", "Participants may opt out of the survey."],
        ["phase in", "introduce gradually", "The school phased in the new policy."],
        ["weed out", "remove unwanted cases", "The first review weeded out duplicate files."],
        ["home in on", "move attention toward", "The report homes in on one limitation."],
        ["come down to", "depend mainly on", "The choice comes down to cost."],
        ["open up", "create access to", "The grant opened up new training options."],
        ["push back against", "resist or challenge", "Staff pushed back against the proposal."]
      ],
      C2: [
        ["hinge on", "depend crucially on", "The appeal hinges on the timing of consent."],
        ["impinge on", "affect or limit", "The rule impinges on local discretion."],
        ["abide by", "follow a rule", "Both parties must abide by the settlement."],
        ["dispense with", "do without", "The court dispensed with oral argument."],
        ["reckon with", "consider seriously", "The authors reckon with the strongest objection."],
        ["fall short of", "fail to reach", "The evidence falls short of proof."],
        ["give rise to", "cause or produce", "The ambiguity gives rise to litigation."],
        ["do away with", "abolish", "The revision does away with the exception."],
        ["bear upon", "be relevant to", "The precedent bears upon the appeal."],
        ["pass over", "ignore or skip", "The summary passes over a key distinction."],
        ["read into", "find more meaning than is stated", "The dissent reads too much into the phrase."],
        ["strip away", "remove completely", "The analysis strips away irrelevant detail."],
        ["map onto", "correspond to", "The categories map onto prior distinctions."],
        ["square with", "be consistent with", "That interpretation squares with the statute."],
        ["weigh against", "count as a reason against", "The delay weighs against approval."]
      ]
    };

    for (const level of levels) phrasal[level].push(...phrasalAdditions[level]);

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

    const wordFormAdditions = {
      A1: [
        ["paint", "painter", "The ___ colored the wall.", ["paint", "paints", "painting"]],
        ["sing", "singer", "The ___ stood near the piano.", ["sing", "sings", "singing"]],
        ["clean", "cleaner", "The ___ opened the supply closet.", ["clean", "cleans", "cleaning"]],
        ["farm", "farmer", "The ___ brought fresh eggs.", ["farm", "farms", "farming"]],
        ["dance", "dancer", "One ___ moved across the stage.", ["dance", "dances", "dancing"]],
        ["bake", "baker", "The ___ made bread this morning.", ["bake", "bakes", "baking"]],
        ["lead", "leader", "The ___ showed us the way.", ["lead", "leads", "leading"]],
        ["read", "reader", "Each ___ needs a library card.", ["read", "reads", "reading"]],
        ["learn", "learner", "Every ___ makes mistakes.", ["learn", "learns", "learning"]],
        ["shop", "shopper", "The ___ carried two bags.", ["shop", "shops", "shopping"]],
        ["play", "player", "The ___ kicked the ball.", ["play", "plays", "playing"]],
        ["help", "helper", "A ___ brought extra chairs.", ["help", "helps", "helping"]],
        ["own", "owner", "The ___ locked the shop.", ["own", "owns", "owning"]],
        ["run", "runner", "The ___ finished first.", ["run", "runs", "running"]],
        ["swim", "swimmer", "The ___ crossed the pool.", ["swim", "swims", "swimming"]]
      ],
      A2: [
        ["arrive", "arrival", "The late ___ caused a problem.", ["arrive", "arrived", "arriving"]],
        ["choose", "choice", "Her final ___ surprised the class.", ["choose", "chose", "choosing"]],
        ["describe", "description", "The guide gives a short ___.", ["describe", "described", "describing"]],
        ["discuss", "discussion", "The ___ lasted ten minutes.", ["discuss", "discussed", "discussing"]],
        ["agree", "agreement", "The two teams reached an ___.", ["agree", "agreed", "agreeing"]],
        ["inform", "information", "The website has useful ___.", ["inform", "informed", "informing"]],
        ["prepare", "preparation", "Good ___ made the trip easier.", ["prepare", "prepared", "preparing"]],
        ["reserve", "reservation", "The hotel lost our ___.", ["reserve", "reserved", "reserving"]],
        ["cancel", "cancellation", "The sudden ___ changed our plans.", ["cancel", "cancelled", "cancelling"]],
        ["register", "registration", "Online ___ closes tonight.", ["register", "registered", "registering"]],
        ["organize", "organization", "The event needs better ___.", ["organize", "organized", "organizing"]],
        ["deliver", "delivery", "The ___ arrived before lunch.", ["deliver", "delivered", "delivering"]],
        ["permit", "permission", "Students need ___ to leave early.", ["permit", "permitted", "permitting"]],
        ["collect", "collection", "The ___ of forms begins at noon.", ["collect", "collected", "collecting"]],
        ["translate", "translation", "The ___ took two days.", ["translate", "translated", "translating"]]
      ],
      B1: [
        ["safe", "safety", "Worker ___ is important.", ["safe", "safely", "safer"]],
        ["fluent", "fluency", "Daily practice improves ___.", ["fluent", "fluently", "influence"]],
        ["patient", "patience", "The long line tested our ___.", ["patient", "patiently", "patients"]],
        ["active", "activity", "The evening ___ starts at six.", ["active", "actively", "activate"]],
        ["clear", "clarity", "The email lacked ___.", ["clear", "clearly", "clarify"]],
        ["able", "ability", "The test measures reading ___.", ["able", "ably", "enable"]],
        ["creative", "creativity", "The project encouraged ___.", ["creative", "creatively", "create"]],
        ["honest", "honesty", "The teacher valued his ___.", ["honest", "honestly", "dishonest"]],
        ["popular", "popularity", "The course gained ___ quickly.", ["popular", "popularly", "populate"]],
        ["similar", "similarity", "The ___ between the answers confused us.", ["similar", "similarly", "simulate"]],
        ["difficult", "difficulty", "The final task caused some ___.", ["difficult", "difficultly", "differ"]],
        ["independent", "independence", "The program encourages learner ___.", ["independent", "independently", "depend"]],
        ["important", "importance", "The speaker stressed the ___ of practice.", ["important", "importantly", "import"]],
        ["different", "difference", "The ___ between the forms is small.", ["different", "differently", "differ"]],
        ["frequent", "frequency", "The ___ of errors fell after training.", ["frequent", "frequently", "frequented"]]
      ],
      B2: [
        ["evaluate", "evaluation", "The final ___ mentioned two strengths.", ["evaluate", "evaluated", "evaluating"]],
        ["distribute", "distribution", "The ___ of materials took an hour.", ["distribute", "distributed", "distributing"]],
        ["contribute", "contribution", "Her ___ improved the project.", ["contribute", "contributed", "contributing"]],
        ["adjust", "adjustment", "A small ___ solved the problem.", ["adjust", "adjusted", "adjusting"]],
        ["require", "requirement", "The new ___ starts next month.", ["require", "required", "requiring"]],
        ["develop", "development", "The ___ of the course took a year.", ["develop", "developed", "developing"]],
        ["investigate", "investigation", "The ___ found three errors.", ["investigate", "investigated", "investigating"]],
        ["propose", "proposal", "The written ___ included a budget.", ["propose", "proposed", "proposing"]],
        ["assess", "assessment", "The ___ measured listening skills.", ["assess", "assessed", "assessing"]],
        ["interpret", "interpretation", "Her ___ of the chart was careful.", ["interpret", "interpreted", "interpreting"]],
        ["respond", "response", "The first ___ arrived by email.", ["respond", "responded", "responding"]],
        ["apply", "application", "The online ___ took fifteen minutes.", ["apply", "applied", "applying"]],
        ["maintain", "maintenance", "Regular ___ keeps the system reliable.", ["maintain", "maintained", "maintaining"]],
        ["consult", "consultation", "The ___ helped clarify the policy.", ["consult", "consulted", "consulting"]],
        ["revise", "revision", "The final ___ corrected the examples.", ["revise", "revised", "revising"]]
      ],
      C1: [
        ["credible", "credibility", "The witness's ___ was questioned.", ["credible", "credibly", "credit"]],
        ["reliable", "reliability", "The survey's ___ improved after piloting.", ["reliable", "reliably", "rely"]],
        ["transparent", "transparency", "The process lacked ___.", ["transparent", "transparently", "transpire"]],
        ["feasible", "feasibility", "The team tested the plan's ___.", ["feasible", "feasibly", "feature"]],
        ["precise", "precision", "The estimate requires greater ___.", ["precise", "precisely", "imprecise"]],
        ["complex", "complexity", "The model's ___ made it hard to explain.", ["complex", "complexly", "complicate"]],
        ["objective", "objectivity", "The review aimed for ___.", ["objective", "objectively", "object"]],
        ["stable", "stability", "The system's ___ improved after repair.", ["stable", "stably", "stabilize"]],
        ["subtle", "subtlety", "The ___ of the distinction matters.", ["subtle", "subtly", "subtler"]],
        ["adequate", "adequacy", "The reviewer questioned the evidence's ___.", ["adequate", "adequately", "adapt"]],
        ["robust", "robustness", "The ___ of the finding surprised the panel.", ["robust", "robustly", "robustnesses"]],
        ["ethical", "ethics", "The proposal raised questions of ___.", ["ethical", "ethically", "ethicist"]],
        ["anonymous", "anonymity", "The study protected participant ___.", ["anonymous", "anonymously", "anonymize"]],
        ["variable", "variability", "The data showed considerable ___.", ["variable", "variably", "vary"]],
        ["significant", "significance", "The result's statistical ___ was unclear.", ["significant", "significantly", "signify"]]
      ],
      C2: [
        ["equivocal", "equivocation", "The response's ___ weakened the apology.", ["equivocal", "equivocally", "equivocate"]],
        ["substantive", "substance", "The objection has little ___ without evidence.", ["substantive", "substantively", "substantiate"]],
        ["contingent", "contingency", "The contract includes a narrow ___.", ["contingent", "contingently", "contend"]],
        ["epistemic", "epistemology", "The article turns to social ___.", ["epistemic", "epistemically", "epistemologist"]],
        ["ontological", "ontology", "The debate concerns social ___.", ["ontological", "ontologically", "ontologist"]],
        ["theoretical", "theorization", "The chapter offers a new ___ of agency.", ["theoretical", "theoretically", "theorize"]],
        ["normative", "normativity", "The paper defends the ___ of the rule.", ["normative", "normatively", "normalize"]],
        ["hermeneutic", "hermeneutics", "The seminar focused on legal ___.", ["hermeneutic", "hermeneutically", "hermitage"]],
        ["dialectical", "dialectic", "The author frames the debate as a ___.", ["dialectical", "dialectically", "dialect"]],
        ["probative", "probity", "The court questioned the witness's ___.", ["probative", "probatively", "probate"]],
        ["fallible", "fallibility", "The argument acknowledges human ___.", ["fallible", "fallibly", "fallacy"]],
        ["indeterminate", "indeterminacy", "The clause's ___ caused litigation.", ["indeterminate", "indeterminately", "determine"]],
        ["commensurable", "commensurability", "The models' ___ remains disputed.", ["commensurable", "commensurably", "measure"]],
        ["incommensurable", "incommensurability", "The theories' ___ limits comparison.", ["incommensurable", "incommensurably", "compare"]],
        ["defeasible", "defeasibility", "The claim's ___ matters in this context.", ["defeasible", "defeasibly", "defeat"]]
      ]
    };

    for (const level of levels) wordForms[level].push(...wordFormAdditions[level]);

    function wordFormItem(level, i) {
      const [base, answer, sentence, distractors] = pick(wordForms[level], i);
      const c = row(i);
      const wrongs = distractors.filter((choice) => choice !== answer).slice(0, 3);
      const text = personalizeStaticBlank(fill(sentence, c), level, i);
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

    const transitionAdditions = {
      A1: [
        ["or", "shows a choice", "You can use a pencil or a pen.", ["shows a reason", "shows a result", "adds a different idea"]],
        ["before", "shows an earlier time", "Wash your hands before lunch.", ["shows a reason", "adds another idea", "shows a result"]],
        ["after", "shows a later time", "{person} studied after dinner.", ["shows a choice", "shows a reason", "adds a different idea"]],
        ["when", "shows the time something happens", "Call me when the bus arrives.", ["shows a choice", "shows an opposite idea", "shows a result"]],
        ["if", "shows a condition", "If it rains, we will stay inside.", ["adds another idea", "shows a finished action", "shows a different idea"]],
        ["also", "adds one more thing", "{person} reads English and also watches videos.", ["shows a reason", "shows a choice", "shows the next time"]],
        ["first", "shows the beginning step", "First, write your name.", ["shows a result", "shows a reason", "shows an opposite idea"]],
        ["next", "shows the following step", "Next, open your book.", ["shows a cause", "shows a choice", "shows a contrast"]],
        ["finally", "shows the last step", "Finally, check your answers.", ["shows a reason", "shows a choice", "starts a list"]],
        ["too", "adds the same idea", "{person} likes tea, and I do too.", ["shows a reason", "shows an opposite idea", "shows a condition"]],
        ["now", "shows the present time", "Now we can start.", ["shows a result", "shows a contrast", "gives an example"]],
        ["later", "shows a future time", "We will practice later.", ["shows a reason", "adds another choice", "shows contrast"]],
        ["again", "shows repetition", "Please read the sentence again.", ["shows a cause", "shows the final step", "shows an example"]],
        ["with", "adds something together", "Bring your book with your notebook.", ["shows an opposite idea", "shows a condition", "shows a result"]],
        ["without", "shows something is not included", "Do not leave without your keys.", ["adds a reason", "shows the next step", "gives an example"]]
      ],
      A2: [
        ["although", "shows contrast", "Although the room was small, it was comfortable.", ["shows a result", "introduces an example", "shows a replacement"]],
        ["because", "shows a reason", "The office called because the form was missing.", ["shows contrast", "introduces an example", "adds information"]],
        ["before", "shows earlier time", "Read the guide before you sign.", ["shows a result", "shows contrast", "gives a replacement"]],
        ["after", "shows later time", "The class met after the rain stopped.", ["introduces an example", "shows a choice", "shows contrast"]],
        ["when", "shows the time of an action", "Call the desk when you arrive.", ["shows a result", "adds an opposite idea", "gives an example"]],
        ["if", "shows a condition", "If the room is closed, we will meet online.", ["adds information", "shows a past time", "introduces an example"]],
        ["so that", "shows purpose", "Speak slowly so that everyone can follow.", ["shows contrast", "shows a replacement", "adds an example"]],
        ["then", "shows the next step", "Pay the fee, then collect your card.", ["shows a reason", "shows contrast", "introduces an example"]],
        ["for instance", "introduces an example", "Bring ID, for instance, a passport.", ["shows a result", "shows a replacement", "adds contrast"]],
        ["besides", "adds another point", "The app is free; besides, it is easy to use.", ["shows a reason", "shows a condition", "shows a replacement"]],
        ["later", "shows a later time", "The results will be posted later.", ["adds contrast", "shows cause", "introduces an example"]],
        ["finally", "introduces the last step", "Finally, press Submit.", ["shows contrast", "shows cause", "adds a choice"]],
        ["while", "shows two actions at the same time", "Read the notice while you wait.", ["shows a result", "introduces an example", "shows a replacement"]],
        ["unless", "means if not", "Unless the office calls, the appointment is confirmed.", ["shows a reason", "introduces an example", "adds information"]],
        ["as well", "adds the same kind of point", "The course teaches writing as well.", ["shows contrast", "shows purpose", "shows a result"]]
      ],
      B1: [
        ["even though", "shows contrast", "Even though the task was hard, the group finished it.", ["shows a reason", "means if not", "shows a result"]],
        ["because of", "introduces a cause as a noun phrase", "Because of the delay, the meeting started late.", ["shows contrast", "means immediately after", "adds an example"]],
        ["due to", "means caused by", "The cancellation was due to heavy rain.", ["adds a choice", "shows a contrast", "means before"]],
        ["as", "shows a reason", "As the office was closed, we waited outside.", ["means if not", "adds a contrast", "gives a final step"]],
        ["once", "means after something happens", "Once the file arrives, we can begin.", ["shows a reason", "shows contrast", "adds another point"]],
        ["until", "shows the ending point of a time", "Wait until the clerk returns.", ["shows a reason", "shows contrast", "gives an example"]],
        ["as long as", "means only if", "You can join as long as you register today.", ["shows an example", "adds an opposite idea", "shows a result"]],
        ["in addition", "adds another point", "The fee is low; in addition, books are free.", ["shows a reason", "shows a condition", "introduces a contrast"]],
        ["in fact", "adds stronger or clearer information", "The class was useful; in fact, every student passed.", ["shows a choice", "means if not", "shows time order"]],
        ["for instance", "introduces an example", "Several documents are accepted; for instance, a passport is fine.", ["shows contrast", "means if not", "shows a result"]],
        ["on the other hand", "introduces a different side", "The online class is convenient; on the other hand, it has fewer speaking tasks.", ["shows a cause", "means immediately after", "adds an example"]],
        ["therefore", "shows a result", "The office was closed; therefore, the forms arrived late.", ["shows contrast", "means if not", "introduces an example"]],
        ["as a result", "shows an effect", "The instructions were clearer; as a result, errors fell.", ["shows a contrast", "means while", "adds a choice"]],
        ["in order to", "shows purpose", "The guide was rewritten in order to reduce mistakes.", ["shows a result", "shows an exception", "adds an example"]],
        ["after all", "adds a reason already known", "We should wait; after all, the train is only five minutes late.", ["shows time order only", "means if not", "introduces a definition"]]
      ],
      B2: [
        ["by comparison", "compares with another case", "The old system was slow; by comparison, the new one is efficient.", ["shows an effect", "means if not", "adds a cause"]],
        ["consequently", "shows a result", "Several files were missing; consequently, the review was delayed.", ["shows contrast", "adds an example", "means at the same time"]],
        ["furthermore", "adds a related point", "The course is affordable; furthermore, it offers evening classes.", ["shows an exception", "shows a replacement", "means if not"]],
        ["even so", "adds contrast after a difficulty", "The sample was small; even so, the trend was clear.", ["shows a cause", "introduces an example", "means before"]],
        ["in particular", "points to a specific example", "Several sections need revision, in particular the conclusion.", ["shows a result", "adds contrast", "means if not"]],
        ["for this reason", "shows why a result follows", "The rule confused applicants; for this reason, it was rewritten.", ["shows a contrast", "introduces an example", "shows simultaneous action"]],
        ["similarly", "shows likeness", "The first group improved; similarly, the second group made gains.", ["shows a cause", "means if not", "shows an opposite result"]],
        ["conversely", "introduces the opposite relation", "Higher fees reduced demand; conversely, discounts increased it.", ["adds the same point", "shows a cause", "means afterward"]],
        ["despite this", "shows contrast with the previous idea", "The deadline was short; despite this, most applicants finished.", ["shows a result", "adds an example", "means only if"]],
        ["in other words", "restates the idea", "The plan is optional; in other words, no one has to join.", ["shows contrast", "adds a new cause", "shows time order"]],
        ["namely", "identifies exactly what is meant", "One issue remains, namely the cost of training.", ["shows a result", "adds a contrast", "means if not"]],
        ["provided that", "means only if", "The course will run provided that ten students register.", ["shows a result", "introduces an example", "adds the same idea"]],
        ["unless", "means if not", "The appeal will fail unless the missing signature is added.", ["shows a reason", "adds an example", "means at the same time"]],
        ["whereas", "compares two contrasting facts", "The first option saves time, whereas the second saves money.", ["shows a result", "means if not", "adds an example"]],
        ["to illustrate", "introduces an example", "Some errors change meaning; to illustrate, compare these two sentences.", ["shows a condition", "shows a result", "adds contrast"]]
      ],
      C1: [
        ["assuming that", "sets a condition as a starting point", "Assuming that the records are complete, the result is defensible.", ["adds a concession", "shows a result", "introduces an example"]],
        ["given that", "introduces a reason already accepted", "Given that the sample is small, the claim should be cautious.", ["means only if", "adds a contrast", "shows sequence"]],
        ["accordingly", "shows a result based on what came before", "The figures were revised; accordingly, the conclusion changed.", ["adds a concession", "compares two facts", "introduces an example"]],
        ["even so", "keeps a point despite a limitation", "The response rate was low; even so, the comments were useful.", ["means only if", "shows a cause", "defines a term"]],
        ["conversely", "presents the reverse relation", "Extra guidance reduced errors; conversely, vague instructions increased them.", ["adds a reason", "means after that", "introduces an example"]],
        ["moreover", "adds a supporting point", "The method is transparent; moreover, it is easy to replicate.", ["sets a condition", "shows contrast", "means if not"]],
        ["thereafter", "means after that point", "The policy was revised in March; thereafter, complaints declined.", ["shows contrast", "adds a cause", "means only if"]],
        ["to that end", "introduces the intended means", "The office wanted fewer errors; to that end, it rewrote the form.", ["shows contrast", "adds a concession", "means before"]],
        ["insofar as", "means to the extent that", "The claim is persuasive insofar as the sample is representative.", ["adds an example", "shows a result", "means despite"]],
        ["albeit", "adds a concession inside the same idea", "The result is useful, albeit limited.", ["shows a cause", "means afterward", "introduces a definition"]],
        ["notably", "marks something as worth attention", "Notably, the strongest gains appeared among beginners.", ["sets a condition", "means if not", "shows a replacement"]],
        ["in turn", "shows the next effect in a chain", "Clearer forms reduced calls, which in turn saved staff time.", ["adds an unrelated example", "shows contrast only", "means if not"]],
        ["by extension", "applies an idea to a related case", "If the rule protects students, by extension it may protect applicants too.", ["shows a cause", "means before", "adds a concession"]],
        ["with respect to", "limits the topic being discussed", "With respect to attendance, the program improved.", ["shows a result", "means if not", "introduces an example"]],
        ["in light of", "means considering", "In light of the new evidence, the decision was revised.", ["means despite", "shows sequence only", "adds an unrelated point"]]
      ],
      C2: [
        ["insofar as", "to the extent that", "The rule is defensible insofar as it treats similar cases alike.", ["despite that", "therefore", "to avoid the risk that"]],
        ["accordingly", "as a result of that reasoning", "The premise fails; accordingly, the conclusion must be revised.", ["despite", "only if", "by contrast"]],
        ["conversely", "in the opposite relation", "If narrow notice weakens consent, conversely, clear notice strengthens it.", ["therefore", "despite", "for example"]],
        ["thereafter", "after that point", "The clause was amended; thereafter, the exception no longer applied.", ["despite that", "because of that", "only if"]],
        ["whereby", "by which process", "The statute creates a procedure whereby applicants may appeal.", ["despite", "therefore", "to avoid the risk"]],
        ["albeit", "although", "The precedent is relevant, albeit not controlling.", ["therefore", "only if", "by that means"]],
        ["even assuming that", "granting a point for argument's sake", "Even assuming that notice was late, the appeal remains timely.", ["therefore", "for example", "by contrast"]],
        ["save that", "except that", "The two provisions are identical, save that one includes an appeal period.", ["therefore", "because of that", "to avoid the risk"]],
        ["to wit", "namely", "The defect is procedural, to wit, the absence of notice.", ["despite", "only if", "by doing that"]],
        ["namely", "specifically", "Only one question remains, namely whether consent was informed.", ["therefore", "despite", "to avoid the risk"]],
        ["by contrast", "introducing a sharp difference", "The majority treats the clause broadly; by contrast, the dissent reads it narrowly.", ["therefore", "only if", "by doing that"]],
        ["on that basis", "using that reason", "The evidence was incomplete; on that basis, the panel remanded the case.", ["despite", "for example", "except that"]],
        ["for all that", "despite that", "The objection is forceful; for all that, it does not defeat the claim.", ["therefore", "namely", "only if"]],
        ["if and only if", "only under this exact condition", "The appeal is valid if and only if notice was timely.", ["despite", "therefore", "by doing that"]],
        ["in consequence", "as a formal result", "The filing was defective; in consequence, the order was vacated.", ["despite", "only if", "for example"]]
      ]
    };

    for (const level of levels) transitions[level].push(...transitionAdditions[level]);

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
      const options = [formal, ...wrongs].map((option) => addSentenceDetail(option, level, i));
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
      const options = [careful, ...wrongs].map((option) => addSentenceDetail(option, level, i));
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
      discourseSets.push(...{
        A1: [
          [
            `Read this note: "The lesson starts at nine. Please arrive early." What does the second sentence do?`,
            "It gives a request.",
            ["It gives a reason.", "It changes the place.", "It gives an example."]
          ],
          [
            `Read this note: "Do not touch the hot pan." What does the sentence do?`,
            "It gives a warning.",
            ["It asks for a name.", "It gives a choice.", "It describes yesterday."]
          ],
          [
            `Read this note: "Bring a notebook, a pencil, and your ID card." What does the sentence do?`,
            "It lists things to bring.",
            ["It gives a reason.", "It shows a problem.", "It asks a question."]
          ],
          [
            `Read this note: "The test is not today. It is tomorrow." What does the second sentence do?`,
            "It corrects the time.",
            ["It gives an example.", "It asks for help.", "It gives a reason."]
          ],
          [
            `Read this note: "The office is closed today." What does the sentence do?`,
            "It gives information.",
            ["It gives a choice.", "It asks a question.", "It gives an example."]
          ],
          [
            `Read this note: "Can you help me with this word?" What does the sentence do?`,
            "It asks for help.",
            ["It gives a warning.", "It lists steps.", "It changes the topic."]
          ],
          [
            `Read this note: "Put your bag under the chair." What does the sentence do?`,
            "It gives an instruction.",
            ["It gives a reason.", "It asks for a time.", "It gives an example."]
          ],
          [
            `Read this note: "The first room is full. Use the room next door." What does the second sentence do?`,
            "It gives the solution.",
            ["It gives the cause.", "It asks a question.", "It lists two choices."]
          ],
          [
            `Read this note: "I like tea. My sister likes coffee." What does the second sentence add?`,
            "It adds different information.",
            ["It gives a warning.", "It shows the next step.", "It gives a place."]
          ],
          [
            `Read this note: "Turn left at the library." What does the sentence do?`,
            "It gives directions.",
            ["It gives a reason.", "It asks for permission.", "It gives an example."]
          ],
          [
            `Read this note: "The bus leaves at six, so come now." What does so show?`,
            "It shows a result.",
            ["It gives a choice.", "It names a person.", "It gives an example."]
          ],
          [
            `Read this note: "Use the blue form, not the yellow one." What does not the yellow one do?`,
            "It tells which choice to avoid.",
            ["It gives a reason.", "It gives the next step.", "It asks for help."]
          ],
          [
            `Read this note: "The cafe is beside the station." What does the sentence tell you?`,
            "It gives a place.",
            ["It gives a warning.", "It lists materials.", "It gives a result."]
          ],
          [
            `Read this note: "Sorry, class is late today." What does sorry do?`,
            "It shows an apology.",
            ["It gives an example.", "It gives a direction.", "It asks a question."]
          ],
          [
            `Read this note: "Check your answer again." What does again show?`,
            "It asks for repetition.",
            ["It gives a choice.", "It changes the place.", "It gives a reason."]
          ]
        ],
        A2: [
          [
            `Read this note: "If you arrive late, call the office." What does if show?`,
            "It gives a condition.",
            ["It gives an example.", "It shows a contrast.", "It gives a definition."]
          ],
          [
            `Read this note: "The guide was rewritten so that beginners could understand it." What does so that show?`,
            "It shows purpose.",
            ["It gives a contrast.", "It lists examples.", "It gives an opposite idea."]
          ],
          [
            `Read this note: "First pay the fee. Next collect your card." What does Next do?`,
            "It shows the following step.",
            ["It gives a reason.", "It introduces a problem.", "It shows a contrast."]
          ],
          [
            `Read this note: "Most students passed, except two who were absent." What does except show?`,
            "It gives an exception.",
            ["It gives a cause.", "It asks for advice.", "It introduces an example."]
          ],
          [
            `Read this note: "The room is available after 2 p.m." What does after 2 p.m. show?`,
            "It gives a time limit.",
            ["It shows a result.", "It gives an example.", "It asks a question."]
          ],
          [
            `Read this note: "You may bring a passport or a residence card." What does or do?`,
            "It gives alternatives.",
            ["It gives a cause.", "It gives a warning.", "It shows a result."]
          ],
          [
            `Read this note: "The class is full; therefore, new students must wait." What does therefore show?`,
            "It shows a result.",
            ["It gives an example.", "It shows an opposite idea.", "It asks for permission."]
          ],
          [
            `Read this note: "The course is useful. Also, it is free." What does Also do?`,
            "It adds another point.",
            ["It gives a contrast.", "It shows a condition.", "It gives a time."]
          ],
          [
            `Read this note: "Do not send cash by mail." What does the sentence do?`,
            "It gives a rule.",
            ["It gives a definition.", "It gives an example.", "It asks for a reason."]
          ],
          [
            `Read this note: "A valid ID means a passport, license, or residence card." What does means do?`,
            "It gives a definition.",
            ["It gives a contrast.", "It shows a warning.", "It lists the next step."]
          ],
          [
            `Read this note: "The test was short. However, it was difficult." What does However show?`,
            "It shows contrast.",
            ["It gives a reason.", "It shows a result.", "It gives an example."]
          ],
          [
            `Read this note: "Because the line was long, the office opened a second desk." What does the first part do?`,
            "It gives the cause.",
            ["It gives the final result.", "It lists examples.", "It asks a question."]
          ],
          [
            `Read this note: "Bring a photo, for example, a passport photo." What does for example do?`,
            "It gives one example.",
            ["It gives a condition.", "It shows contrast.", "It gives a result."]
          ],
          [
            `Read this note: "The class moved online instead." What does instead show?`,
            "It shows a replacement.",
            ["It gives a reason.", "It gives an example.", "It adds a warning."]
          ],
          [
            `Read this note: "Please check the date before you pay." What does before show?`,
            "It shows the order of actions.",
            ["It gives a definition.", "It shows an exception.", "It gives an example."]
          ]
        ],
        B1: [
          [
            `Read this sentence: "Only students with smartphones answered the survey." What problem does it show?`,
            "The sample may exclude some learners.",
            ["The survey used too many questions.", "The results prove the app worked.", "The time period was too long."]
          ],
          [
            `Read this sentence: "The report does not say when the interviews happened." What problem does it show?`,
            "The timing is unclear.",
            ["The sample is definitely too large.", "The results are guaranteed.", "The topic is unrelated to learning."]
          ],
          [
            `Read this sentence: "The teacher who designed the course also graded the survey." What problem does it show?`,
            "The results may be biased.",
            ["The class had no teacher.", "The survey had too many dates.", "The definition was too narrow."]
          ],
          [
            `Read this sentence: "The chart shows percentages but not the number of students." What problem does it show?`,
            "The size of the group is missing.",
            ["The chart gives too many examples.", "The survey question is translated badly.", "The conclusion is certainly false."]
          ],
          [
            `Read this sentence: "The survey asked, 'Was the lesson nice?'" What problem does it show?`,
            "The wording may be unclear.",
            ["The sample includes every group.", "The time period is too long.", "The result proves improvement."]
          ],
          [
            `Read this sentence: "The report compares this year's beginners with last year's advanced class." What problem does it show?`,
            "The groups may not be comparable.",
            ["The report has no comparison.", "The sample is too detailed.", "The survey has no questions."]
          ],
          [
            `Read this sentence: "The conclusion is based on three comments." What problem does it show?`,
            "There may be too little evidence.",
            ["The time period is too long.", "The question is too precise.", "The result is certainly universal."]
          ],
          [
            `Read this sentence: "The form was changed at the same time that a new teacher started." What problem does it show?`,
            "Another factor may explain the result.",
            ["The report has no event.", "The form is impossible to read.", "The conclusion is already proven."]
          ],
          [
            `Read this sentence: "Students reported their own attendance." What problem does it show?`,
            "The data may depend on memory or honesty.",
            ["The sample is too large.", "The report gives too much context.", "The result cannot be counted."]
          ],
          [
            `Read this sentence: "The report says scores improved, but it gives no earlier scores." What problem does it show?`,
            "There is no clear starting point for comparison.",
            ["The report has too many starting points.", "The results prove the method failed.", "The sample includes too many classes."]
          ],
          [
            `Read this sentence: "Only the afternoon class used the new worksheet." What problem does it show?`,
            "The result may not apply to other classes.",
            ["The worksheet was used by everyone.", "The time period is not mentioned.", "The survey question is too long."]
          ],
          [
            `Read this sentence: "The report says 'many students' but gives no number." What problem does it show?`,
            "The amount is vague.",
            ["The report gives too many numbers.", "The sample is definitely balanced.", "The conclusion is too cautious."]
          ],
          [
            `Read this sentence: "The survey was optional." What problem does it show?`,
            "People with stronger opinions may be more likely to answer.",
            ["All students had to answer.", "The questions were all definitions.", "The time period was too short."]
          ],
          [
            `Read this sentence: "The report only includes students who completed the course." What problem does it show?`,
            "It leaves out students who stopped attending.",
            ["It includes too many beginners.", "It gives an unnecessary definition.", "It proves the course was too short."]
          ],
          [
            `Read this sentence: "The conclusion uses one class to describe the whole school." What problem does it show?`,
            "The conclusion may be too broad.",
            ["The report gives no conclusion.", "The class was not part of the school.", "The results are too specific to understand."]
          ]
        ],
        B2: [
          [
            `Read this sentence: "The new portal reduced errors, although older users needed extra support." What does although show?`,
            "It adds a limitation to a positive result.",
            ["It defines a technical term.", "It gives only the cause.", "It lists steps in order."]
          ],
          [
            `Read this sentence: "A completed file refers to an application with every required document attached." What does the sentence do?`,
            "It defines a working term.",
            ["It predicts a future result.", "It reports a disadvantage.", "It gives a personal opinion."]
          ],
          [
            `Read this sentence: "The first plan lowers cost, whereas the second reduces waiting time." What does whereas do?`,
            "It contrasts two advantages.",
            ["It gives the cause of both plans.", "It defines waiting time.", "It shows that the plans are identical."]
          ],
          [
            `Read this sentence: "Since reminders were sent twice, missed appointments fell." What does the first part do?`,
            "It presents a likely reason.",
            ["It gives an exception.", "It introduces a definition.", "It rejects the data."]
          ],
          [
            `Read this sentence: "The policy applies only to new applicants." What does only do?`,
            "It limits the scope.",
            ["It gives a result.", "It introduces an example.", "It shows a contrast between two policies."]
          ],
          [
            `Read this sentence: "For example, late files were returned without review." What does For example do?`,
            "It supports a general point with a case.",
            ["It gives the main conclusion.", "It shows a cause.", "It gives an opposite argument."]
          ],
          [
            `Read this sentence: "The change may save time; however, the evidence is still limited." What does however do?`,
            "It adds caution after a possible benefit.",
            ["It proves the benefit.", "It defines the change.", "It gives a step in a process."]
          ],
          [
            `Read this sentence: "In other words, students could appeal only once." What does In other words do?`,
            "It restates the rule more plainly.",
            ["It adds an unrelated example.", "It shows a new cause.", "It reports a future prediction."]
          ],
          [
            `Read this sentence: "The comparison excludes students who joined late." What does the sentence do?`,
            "It names a boundary of the analysis.",
            ["It defines every term.", "It reports only a benefit.", "It changes the topic to cost."]
          ],
          [
            `Read this sentence: "The increase was larger among beginners than among advanced students." What does the sentence do?`,
            "It compares two groups.",
            ["It gives a definition.", "It shows time order.", "It rejects the whole study."]
          ],
          [
            `Read this sentence: "The form was redesigned to reduce duplicate entries." What does to reduce duplicate entries show?`,
            "It states the purpose of the redesign.",
            ["It gives a contrast.", "It defines duplicate entries.", "It introduces an exception."]
          ],
          [
            `Read this sentence: "The old policy required signatures; the revised policy accepts digital consent." What does the sentence do?`,
            "It identifies a change in rules.",
            ["It gives an unrelated example.", "It proves both policies failed.", "It reports a missing sample."]
          ],
          [
            `Read this sentence: "The finding is based on attendance records rather than student opinions." What does rather than show?`,
            "It distinguishes the evidence source.",
            ["It gives a reason for attendance.", "It introduces a time limit.", "It defines student opinions."]
          ],
          [
            `Read this sentence: "This result should be interpreted cautiously because the sample was small." What does because do?`,
            "It explains why caution is needed.",
            ["It introduces a replacement.", "It gives a definition.", "It lists two equal choices."]
          ],
          [
            `Read this sentence: "The survey captures satisfaction, not actual progress." What does not actual progress do?`,
            "It clarifies what the survey does not measure.",
            ["It gives a cause.", "It adds a future plan.", "It defines satisfaction."]
          ]
        ],
        C1: [
          [
            `Read this claim: "The effect appears stronger among learners who attended regularly." What does appears do?`,
            "It makes the claim cautious.",
            ["It removes uncertainty.", "It gives a definition.", "It changes the topic."]
          ],
          [
            `Read this claim: "The conclusion depends on whether missing responses are counted as failures." What does depends on show?`,
            "It makes the conclusion conditional.",
            ["It gives a direct cause.", "It rejects the conclusion.", "It adds an example only."]
          ],
          [
            `Read this sentence: "The study controls for age but not prior schooling." What does but not do?`,
            "It marks a remaining limitation.",
            ["It gives the main result.", "It defines prior schooling.", "It shows that age was ignored."]
          ],
          [
            `Read this sentence: "The authors distinguish attendance from engagement." What does the sentence do?`,
            "It separates two related concepts.",
            ["It gives a time order.", "It proves engagement increased.", "It introduces an unrelated example."]
          ],
          [
            `Read this sentence: "The pattern is consistent with improved instruction, though motivation may also matter." What does though add?`,
            "It introduces an alternative factor.",
            ["It proves the first explanation.", "It defines motivation.", "It gives a procedural step."]
          ],
          [
            `Read this sentence: "The estimate excludes learners who changed levels midterm." What does the sentence do?`,
            "It states an exclusion from the analysis.",
            ["It gives a universal conclusion.", "It explains a grammar rule.", "It adds an example of success."]
          ],
          [
            `Read this sentence: "A finished attempt means that all twenty items were answered." What does the sentence do?`,
            "It defines a key measure.",
            ["It gives a cause.", "It adds a contrast.", "It describes a problem with timing."]
          ],
          [
            `Read this sentence: "This explanation accounts for the timing of the change but not its size." What does but not its size do?`,
            "It limits the reach of the explanation.",
            ["It restates the explanation.", "It gives another example.", "It proves the explanation false."]
          ],
          [
            `Read this sentence: "The pilot suggests feasibility rather than effectiveness." What does rather than do?`,
            "It prevents overreading the result.",
            ["It gives a reason for the pilot.", "It reports a sequence of steps.", "It defines effectiveness."]
          ],
          [
            `Read this sentence: "The data were coded independently to reduce reviewer bias." What does to reduce reviewer bias show?`,
            "It gives the purpose of the method.",
            ["It shows a contrast.", "It gives an exception.", "It defines independent coding."]
          ],
          [
            `Read this sentence: "Even if the improvement is real, its cause remains uncertain." What does Even if do?`,
            "It grants one point while preserving doubt.",
            ["It proves the cause.", "It lists two measurements.", "It introduces an example."]
          ],
          [
            `Read this sentence: "The strongest evidence comes from classes observed before and after the change." What does before and after help show?`,
            "It supports comparison over time.",
            ["It defines the class level.", "It gives a legal condition.", "It reports a personal opinion."]
          ],
          [
            `Read this sentence: "The authors use attendance as a proxy for participation." What does as a proxy for do?`,
            "It names an indirect measure.",
            ["It gives a contrast.", "It proves attendance is unimportant.", "It gives a chronological order."]
          ],
          [
            `Read this sentence: "The recommendation follows only if the cost estimates are accurate." What does only if show?`,
            "It states a necessary condition.",
            ["It gives a concession.", "It adds an example.", "It gives a definition."]
          ],
          [
            `Read this sentence: "The appendix corroborates the timeline but leaves the motive unclear." What does the second part do?`,
            "It separates support for timing from uncertainty about motive.",
            ["It rejects the timeline.", "It gives a definition of motive.", "It changes the topic to cost."]
          ]
        ],
        C2: [
          [
            `Read this comment: "The claim is plausible only insofar as the comparison group is genuinely comparable." What does only insofar as do?`,
            "It restricts the conditions under which the claim works.",
            ["It removes the need for evidence.", "It gives a dictionary definition.", "It rejects comparison entirely."]
          ],
          [
            `Read this comment: "The majority treats silence as consent; the dissent treats it as ambiguity." What does the sentence do?`,
            "It contrasts two interpretations of the same fact.",
            ["It gives a procedural instruction.", "It proves both views are false.", "It summarizes a timeline."]
          ],
          [
            `Read this comment: "The objection has force, but only against the broader version of the argument." What does the but part do?`,
            "It narrows the objection's target.",
            ["It rejects the objection completely.", "It defines force.", "It introduces a new example."]
          ],
          [
            `Read this comment: "The evidence is probative, not conclusive." What does not conclusive do?`,
            "It distinguishes support from proof.",
            ["It denies that the evidence matters.", "It gives a cause.", "It changes the topic to procedure."]
          ],
          [
            `Read this comment: "This reading preserves the exception while avoiding a contradiction in the rule." What does while do?`,
            "It presents two effects of the interpretation together.",
            ["It gives a chronological sequence only.", "It rejects the exception.", "It defines contradiction."]
          ],
          [
            `Read this comment: "Even granting the factual premise, the legal conclusion does not follow." What does Even granting do?`,
            "It accepts a premise for argument while challenging the inference.",
            ["It proves the premise false.", "It introduces a new law.", "It gives an example."]
          ],
          [
            `Read this comment: "The term notice is doing more work here than the statute can bear." What does the sentence criticize?`,
            "It says the interpretation depends too heavily on one term.",
            ["It praises the statute's precision.", "It gives filing instructions.", "It summarizes witness testimony."]
          ],
          [
            `Read this comment: "The analysis conflates eligibility with entitlement." What does the sentence do?`,
            "It identifies a confused distinction.",
            ["It gives a result.", "It adds a concession.", "It reports a sequence of events."]
          ],
          [
            `Read this comment: "The analogy illuminates the problem but cannot settle it." What does the second part do?`,
            "It limits what the analogy can prove.",
            ["It rejects the analogy as useless.", "It gives the next procedural step.", "It defines analogy."]
          ],
          [
            `Read this comment: "The premise is descriptive; the conclusion is normative." What does the semicolon help show?`,
            "It sets up a conceptual contrast.",
            ["It gives a time sequence.", "It lists examples of one category.", "It reports the same idea twice."]
          ],
          [
            `Read this comment: "The argument turns not on intent but on the public meaning of the text." What does not on intent but on do?`,
            "It redirects the basis of the argument.",
            ["It adds a concession.", "It gives a cause of intent.", "It defines public meaning."]
          ],
          [
            `Read this comment: "The caveat is easy to miss, yet it controls the scope of the holding." What does yet do?`,
            "It contrasts low visibility with high importance.",
            ["It gives a definition.", "It reports a cause.", "It adds an example."]
          ],
          [
            `Read this comment: "The objection presupposes the very distinction it aims to reject." What does the sentence do?`,
            "It exposes a circular problem in the objection.",
            ["It summarizes a timeline.", "It gives a neutral definition.", "It accepts the objection fully."]
          ],
          [
            `Read this comment: "The finding is not false; it is underdetermined." What does the second clause do?`,
            "It replaces rejection with a more precise criticism.",
            ["It gives an example.", "It proves the finding true.", "It changes the topic to cost."]
          ],
          [
            `Read this comment: "The framework explains individual choices at the expense of institutional context." What does at the expense of show?`,
            "It identifies what the explanation sacrifices.",
            ["It gives a result in time order.", "It defines institutional context.", "It gives a procedural condition."]
          ]
        ]
      }[level]);
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
