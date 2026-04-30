// EnglishRoad source item data and templates.
// The app generates runtime items with id, sentence, options, answer, difficulty, category, subcategory, explanation, rationales, and qaStatus.
(function () {
  window.createEnglishRoadItemData = function createEnglishRoadItemData({ pick, item }) {
    const schema = {
      version: "item-data-v1",
      generatedFields: ["id", "sentence", "options", "answer", "difficulty", "category", "subcategory", "explanation", "rationales", "qaStatus"],
      qaStatusValues: ["screened"]
    };

    const names = ["Mina", "Carlos", "Aiko", "Nadia", "Omar", "Lena", "Sofia", "Daniel", "Rina", "Mateo", "Hana", "Jonas"];
    const places = ["language center", "community college", "library", "training office", "customer service desk", "research lab", "travel agency", "health clinic", "housing office", "conference room"];
    const reports = ["attendance report", "budget summary", "customer survey", "safety notice", "research abstract", "training schedule", "course outline", "travel itinerary"];
    const topics = ["class schedules", "workplace training", "public transport", "customer feedback", "health appointments", "online learning", "housing rules", "research results", "budget planning", "job interviews"];
    const simpleObjects = ["forms", "emails", "instructions", "notices", "receipts", "charts", "applications", "reports", "messages", "appointments"];
    const programs = ["morning class", "evening class", "new-student orientation", "staff workshop", "exam review group", "conversation club", "writing lab", "internship program", "parent meeting", "online seminar", "career clinic", "visitor briefing", "research update", "reading circle", "skills course", "placement meeting", "study group"];
    const practiceSettings = ["an English practice activity", "an English study session", "a short English lesson", "an English review activity", "an English level check", "an English reading exercise", "an English class exercise", "an English warm-up task", "an English practice round", "an English learning activity"];
    const practiceMaterials = ["worksheet", "practice card", "exercise page", "study screen", "review sheet", "sample question", "class handout", "workbook page", "quiz page", "learning app"];
    const practicePurposes = {
      Grammar: ["grammar practice", "sentence practice", "verb practice", "word order practice", "grammar review", "accuracy practice", "sentence review", "form practice", "English practice", "level practice"],
      Vocabulary: ["word practice", "meaning practice", "phrase practice", "reading practice", "word review", "vocabulary review", "English practice", "level practice", "usage practice", "study practice"]
    };
    
    const vocabularySets = {
      easySynonyms: [
        ["large", "big", "late", "cold", "near"],
        ["quick", "fast", "quiet", "heavy", "full"],
        ["begin", "start", "close", "carry", "sell"],
        ["help", "assist", "arrive", "divide", "invite"],
        ["buy", "purchase", "repair", "borrow", "cancel"],
        ["job", "position", "machine", "receipt", "hallway"],
        ["speak", "talk", "lend", "print", "pack"],
        ["need", "require", "refuse", "repair", "reduce"]
      ],
      workplace: [
        ["deadline", "the time something must be finished", "a person who trains employees", "a room for interviews", "a printed advertisement"],
        ["invoice", "a document requesting payment", "a list of holidays", "a message of apology", "a workplace rule"],
        ["supervisor", "a person who manages workers", "a customer complaint", "a delivery address", "a meeting agenda"],
        ["extension", "extra time to finish something", "a written signature", "a travel discount", "a safety problem"],
        ["appointment", "an arranged meeting", "a monthly salary", "a product manual", "an office supply"]
      ],
      academic: [
        ["consistent", "matching or agreeing with something", "easy to notice", "not lasting long", "based on luck"],
        ["significant", "important enough to notice", "too simple to use", "made by hand", "written in advance"],
        ["assumption", "an idea accepted before proof", "a final payment", "a public celebration", "a travel document"],
        ["indicate", "show or suggest", "hide completely", "copy exactly", "pay immediately"],
        ["method", "a way of doing something", "a result that cannot change", "a list of prices", "a private opinion"]
      ],
      contextMeanings: [
        ["The new rule may hinder small shops.", "hinder", "make progress difficult", "give official permission", "describe in detail", "pay in advance"],
        ["The manager tried to resolve the complaint.", "resolve", "find a solution to", "make larger", "read aloud", "delay without reason"],
        ["The evidence supports the speaker's claim.", "supports", "gives reason to believe", "makes impossible", "repeats exactly", "changes the topic"],
        ["The tutor emphasized the final paragraph.", "emphasized", "gave special attention to", "removed from the page", "translated into another language", "made shorter"],
        ["The policy will affect evening classes.", "affect", "change or influence", "protect from weather", "arrive before", "write by hand"]
      ],
      collocations: [
        ["make", "a decision", "open", "send", "carry"],
        ["meet", "a deadline", "arrive", "touch", "hold"],
        ["give", "a presentation", "open", "carry", "touch"],
        ["reach", "an agreement", "arrive", "touch", "hold"],
        ["raise", "a concern", "lift", "grow", "do"],
        ["take", "responsibility", "open", "send", "meet"],
        ["submit", "an application", "open", "carry", "touch"],
        ["solve", "a problem", "answer", "make", "hold"],
        ["follow", "instructions", "make", "do", "hold"],
        ["send", "a message", "make", "take", "hold"],
        ["book", "an appointment", "do", "hold", "reach"],
        ["set", "a goal", "open", "send", "carry"],
        ["share", "information", "make", "do", "hold"],
        ["prepare", "a report", "answer", "touch", "hold"]
      ],
      register: [
        ["The results indicate a moderate increase.", "The numbers kind of went up.", "Stuff got better, basically.", "It went up a bit, you know."],
        ["Please let me know if further information is required.", "Tell me if you need more stuff.", "You can ask if anything is missing.", "Hit me back if you want more."],
        ["The proposal should be revised before submission.", "The plan needs fixing before you send it.", "This thing should be changed first.", "Maybe tweak it before handing it in."],
        ["The applicant has relevant experience in customer service.", "The applicant knows customer-service stuff.", "The applicant has done this kind of thing.", "They have some useful work background."]
      ],
      nuance: [
        ["unlikely", "not expected to happen", "certain to happen", "already finished", "easy to measure"],
        ["roughly", "approximately", "exactly", "rarely", "immediately"],
        ["reluctant", "not willing", "not visible", "not careful", "not expensive"],
        ["plausible", "reasonable or believable", "impossible to explain", "required by law", "easy to pronounce"],
        ["subtle", "not obvious", "very loud", "already known", "fully complete"]
      ]
    };
    
    const blueprints = [
      {
        code: "g-present-simple",
        category: "Grammar",
        subcategory: "Verb tense",
        difficulty: 1.1,
        make: (i) => {
          const person = pick(names, i);
          const action = pick([
            ["review", "reviews", "reviewing", "the vocabulary list"],
            ["check", "checks", "checking", "the class schedule"],
            ["answer", "answers", "answering", "client emails"],
            ["update", "updates", "updating", "the attendance sheet"],
            ["read", "reads", "reading", "the weekly notice"],
            ["prepare", "prepares", "preparing", "the lesson plan"]
          ], i, 2);
          return item(`Every Monday, ${person} ___ ${action[3]}.`, [action[1], action[0], action[2], `is ${action[2]}`], action[1]);
        }
      },
      {
        code: "g-past-simple",
        category: "Grammar",
        subcategory: "Verb tense",
        difficulty: 1.5,
        make: (i) => {
          const person = pick(names, i, 1);
          const action = pick([
            ["sent", "send", "sends", "has sent", "the emails"],
            ["printed", "print", "prints", "has printed", "the forms"],
            ["joined", "join", "joins", "has joined", "the meeting"],
            ["called", "call", "calls", "has called", "the client"],
            ["opened", "open", "opens", "has opened", "the office"],
            ["checked", "check", "checks", "has checked", "the schedule"],
            ["answered", "answer", "answers", "has answered", "the messages"],
            ["completed", "complete", "completes", "has completed", "the application"]
          ], i);
          return item(`Yesterday, ${person} ___ ${action[4]} before lunch.`, [action[0], action[1], action[2], action[3]], action[0]);
        }
      },
      {
        code: "g-articles",
        category: "Grammar",
        subcategory: "Articles",
        difficulty: 1.8,
        make: (i) => {
          const examples = [
            ["The receptionist gave me ___ appointment card.", "an"],
            ["We need ___ updated map for the new students.", "an"],
            ["Carlos found ___ useful chart in the report.", "a"],
            ["The office has ___ printer near the entrance.", "a"],
            ["Please read ___ instructions before signing.", "the"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ["a", "an", "the", "(nothing)"], ex[1]);
        }
      },
      {
        code: "g-prepositions-time",
        category: "Grammar",
        subcategory: "Prepositions",
        difficulty: 2.0,
        make: (i) => {
          const examples = [
            [`The workshop starts ___ ${pick(["Monday", "Friday", "Wednesday"], i)}.`, "on"],
            [`The interview begins ___ ${pick(["9:30", "2:15", "11:00"], i)}.`, "at"],
            [`The course begins ___ ${pick(["September", "January", "April"], i)}.`, "in"],
            [`The forms must arrive ___ Friday.`, "by"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ["in", "on", "at", "by"], ex[1]);
        }
      },
      {
        code: "g-count-noncount",
        category: "Grammar",
        subcategory: "Count and noncount nouns",
        difficulty: 2.2,
        make: (i) => {
          const examples = [
            ["The advisor gave us ___ information about the exam.", "some"],
            ["There are ___ application forms on the desk.", "several"],
            ["The teacher asked for ___ advice about the lesson plan.", "some"],
            ["The office received ___ complaints after the schedule changed.", "many"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ["some", "many", "several", "an"], ex[1]);
        }
      },
      {
        code: "g-subject-verb",
        category: "Grammar",
        subcategory: "Subject-verb agreement",
        difficulty: 2.6,
        make: (i) => {
          const noun = pick(["report", "schedule", "application", "lesson"], i);
          const prompt = pick([
            "Choose the correct sentence.",
            "Which sentence is correct?",
            "Pick the correct sentence.",
            "Find the correct sentence.",
            "Choose the sentence that is right.",
            "Which sentence is right?"
          ], i);
          return item(prompt, [
            `The ${noun} is ready for review.`,
            `The ${noun} are ready for review.`,
            `The ${noun} have ready for review.`,
            `The ${noun} were prepares for review.`
          ], `The ${noun} is ready for review.`);
        }
      },
      {
        code: "g-modals",
        category: "Grammar",
        subcategory: "Modals",
        difficulty: 2.8,
        make: (i) => {
          const examples = [
            ["The safety notice says that visitors ___ wear identification badges inside the lab.", "must"],
            ["The class rule says students ___ turn off phones during the test.", "must"],
            ["The form says applicants ___ sign their names at the bottom.", "must"],
            ["The library notice says readers ___ return books by Friday.", "must"],
            ["The clinic sign says patients ___ check in before the appointment.", "must"],
            ["The travel rule says passengers ___ show photo ID at the desk.", "must"],
            ["The office policy says workers ___ lock the door after evening class.", "must"],
            ["The test instructions say students ___ write their names on every page.", "must"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], [ex[1], "might", "used to", "would rather"], ex[1]);
        }
      },
      {
        code: "g-comparatives",
        category: "Grammar",
        subcategory: "Comparatives",
        difficulty: 3.0,
        make: (i) => {
          const examples = [
            ["This route is ___ than the old route.", "short", "shorter"],
            ["The new room is ___ than the first room.", "large", "larger"],
            ["The second train is ___ than the first train.", "fast", "faster"],
            ["The winter class is ___ than the summer class.", "small", "smaller"],
            ["This chair is ___ than the chair near the door.", "low", "lower"],
            ["The morning lesson is ___ than the evening lesson.", "early", "earlier"],
            ["The new printer is ___ than the old printer.", "quick", "quicker"],
            ["The blue sign is ___ than the gray sign.", "bright", "brighter"],
            ["The used book is ___ than the new book.", "cheap", "cheaper"],
            ["The first answer is ___ than the second answer.", "long", "longer"],
            ["The online form is ___ than the paper form.", "new", "newer"],
            ["The classroom is ___ than the hallway.", "warm", "warmer"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], [ex[2], ex[1], `more ${ex[1]}`, `most ${ex[1]}`], ex[2], `comparative:${ex[1]}`);
        }
      },
      {
        code: "g-connectors",
        category: "Grammar",
        subcategory: "Clauses and connectors",
        difficulty: 3.2,
        make: (i) => {
          const examples = [
            ["___ the training room was noisy, everyone could hear the speaker clearly.", "Although"],
            ["___ the rain was heavy, the bus arrived on time.", "Although"],
            ["___ the form looked simple, several students made mistakes.", "Although"],
            ["___ the speaker talked quickly, the main idea was clear.", "Although"],
            ["___ the office was busy, the clerk answered every question.", "Although"],
            ["___ the book was short, it gave many useful examples.", "Although"],
            ["___ the lesson was difficult, the class finished the activity.", "Although"],
            ["___ the schedule changed, most people arrived on time.", "Although"]
          ];
          const ex = pick(examples, i);
          return item(`Choose the best word to join the ideas: ${ex[0]}`, [ex[1], "Because", "Therefore", "Unless"], ex[1]);
        }
      },
      {
        code: "g-first-conditional",
        category: "Grammar",
        subcategory: "Conditionals",
        difficulty: 3.4,
        make: (i) => {
          const result = pick(["more students will attend", "clients will receive faster replies", "the office will avoid delays", "visitors will find the room easily"], i);
          return item(`Choose the best words: If the schedule changes, ___.`, [result, result.replace("will ", "would "), result.replace("will ", "are "), result.replace("will ", "have ")], result);
        }
      },
      {
        code: "g-second-conditional",
        category: "Grammar",
        subcategory: "Conditionals",
        difficulty: 3.8,
        make: (i) => {
          const examples = [
            ["If the clinic added evening appointments, more patients ___ after work.", "could visit"],
            ["If the library opened earlier, more students ___ before class.", "could study"],
            ["If the office hired another clerk, customers ___ help faster.", "could get"],
            ["If the course offered online lessons, more workers ___ after dinner.", "could join"],
            ["If the bus stopped near the school, students ___ there easily.", "could travel"],
            ["If the form were shorter, applicants ___ it more quickly.", "could finish"],
            ["If the room had more chairs, visitors ___ comfortably.", "could sit"],
            ["If the teacher gave examples, the class ___ the rule better.", "could understand"]
          ];
          const ex = pick(examples, i);
          return item(`Choose the best words: ${ex[0]}`, [ex[1], ex[1].replace("could ", "can "), ex[1].replace("could ", "will "), ex[1].replace("could ", "")], ex[1]);
        }
      },
      {
        code: "g-passive",
        category: "Grammar",
        subcategory: "Passive voice",
        difficulty: 4.2,
        make: (i) => {
          const doc = pick(reports, i);
          return item(`The ${doc} ___ by the coordinator yesterday.`, ["was reviewed", "reviewed", "was reviewing", "has review"], "was reviewed");
        }
      },
      {
        code: "g-relative",
        category: "Grammar",
        subcategory: "Relative clauses",
        difficulty: 4.4,
        make: (i) => {
          const examples = [
            "The applicant ___ resume arrived late still received an interview.",
            "The student ___ notebook was missing asked for another copy.",
            "The worker ___ badge was lost reported it to security.",
            "The teacher ___ class ended early stayed to answer questions.",
            "The client ___ appointment was canceled called the office.",
            "The researcher ___ data were incomplete repeated the survey.",
            "The driver ___ license had expired could not rent the car.",
            "The guest ___ ticket was damaged went to the service desk."
          ];
          return item(`Choose the best word: ${pick(examples, i)}`, ["whose", "who", "which", "where"], "whose");
        }
      },
      {
        code: "g-reported-speech",
        category: "Grammar",
        subcategory: "Reported speech",
        difficulty: 4.8,
        make: (i) => {
          const examples = [
            ["The manager said, \"The meeting starts at noon.\"", "The manager said that the meeting started at noon.", "The manager said that the meeting start at noon.", "The manager said the meeting has start at noon.", "The manager said that noon starts the meeting."],
            ["The teacher said, \"The test begins at nine.\"", "The teacher said that the test began at nine.", "The teacher said that the test begin at nine.", "The teacher said the test has begin at nine.", "The teacher said that nine begins the test."],
            ["The clerk said, \"The office closes at five.\"", "The clerk said that the office closed at five.", "The clerk said that the office close at five.", "The clerk said the office has close at five.", "The clerk said that five closes the office."],
            ["The guide said, \"The bus leaves at six.\"", "The guide said that the bus left at six.", "The guide said that the bus leave at six.", "The guide said the bus has leave at six.", "The guide said that six leaves the bus."],
            ["The nurse said, \"The clinic opens at eight.\"", "The nurse said that the clinic opened at eight.", "The nurse said that the clinic open at eight.", "The nurse said the clinic has open at eight.", "The nurse said that eight opens the clinic."],
            ["The trainer said, \"The lesson ends at four.\"", "The trainer said that the lesson ended at four.", "The trainer said that the lesson end at four.", "The trainer said the lesson has end at four.", "The trainer said that four ends the lesson."],
            ["The assistant said, \"The report arrives today.\"", "The assistant said that the report arrived that day.", "The assistant said that the report arrive that day.", "The assistant said the report has arrive today.", "The assistant said that day arrives the report."],
            ["The director said, \"The program starts next week.\"", "The director said that the program started the next week.", "The director said that the program start the next week.", "The director said the program has start next week.", "The director said that next week starts the program."]
          ];
          const ex = pick(examples, i);
          return item(`Choose the best way to tell another person: ${ex[0]}`, ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-reduced-clauses",
        category: "Grammar",
        subcategory: "Reduced clauses",
        difficulty: 5.3,
        make: (i) => {
          const examples = [
            ["Choose the clearest short sentence.", "The data collected during the trial support the original hypothesis.", "The data which it was collected during the trial support the original hypothesis.", "The data collecting during the trial support the original hypothesis.", "The data collected during the trial supporting the original hypothesis."],
            ["Choose the clearest short sentence.", "The forms submitted after Friday require special approval.", "The forms which they were submitted after Friday require special approval.", "The forms submitting after Friday require special approval.", "The forms submitted after Friday requiring special approval."],
            ["Choose the clearest short sentence.", "The notes written during the meeting explain the decision.", "The notes which they were written during the meeting explain the decision.", "The notes writing during the meeting explain the decision.", "The notes written during the meeting explaining the decision."],
            ["Choose the clearest short sentence.", "The emails sent before noon reached every participant.", "The emails which they were sent before noon reached every participant.", "The emails sending before noon reached every participant.", "The emails sent before noon reaching every participant."],
            ["Choose the clearest short sentence.", "The survey completed by the students shows clear progress.", "The survey which it completed by the students shows clear progress.", "The survey completing by the students shows clear progress.", "The survey completed by the students showing clear progress."],
            ["Choose the clearest short sentence.", "The schedule posted near the door lists all room changes.", "The schedule which it was posted near the door lists all room changes.", "The schedule posting near the door lists all room changes.", "The schedule posted near the door listing all room changes."],
            ["Choose the clearest short sentence.", "The chart prepared for the lesson compares two answers.", "The chart which it was prepared for the lesson compares two answers.", "The chart preparing for the lesson compares two answers.", "The chart prepared for the lesson comparing two answers."],
            ["Choose the clearest short sentence.", "The rules printed on the card apply to all visitors.", "The rules which they were printed on the card apply to all visitors.", "The rules printing on the card apply to all visitors.", "The rules printed on the card applying to all visitors."]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-inversion",
        category: "Grammar",
        subcategory: "Advanced sentence structure",
        difficulty: 5.8,
        make: (i) => {
          const examples = [
            ["Only after the survey closed did the team analyze the responses.", "Only after the survey closed the team analyzed the responses.", "Only after closed the survey did analyze the team responses.", "Only after the survey did closed the team analyze responses."],
            ["Only after the meeting ended did the manager send the notes.", "Only after the meeting ended the manager sent the notes.", "Only after ended the meeting did send the manager notes.", "Only after the meeting did ended the manager send notes."],
            ["Only after the data arrived did the researcher write the report.", "Only after the data arrived the researcher wrote the report.", "Only after arrived the data did write the researcher report.", "Only after the data did arrived the researcher write report."],
            ["Only after the class finished did the teacher collect the papers.", "Only after the class finished the teacher collected the papers.", "Only after finished the class did collect the teacher papers.", "Only after the class did finished the teacher collect papers."],
            ["Only after the office opened did the clerk answer the calls.", "Only after the office opened the clerk answered the calls.", "Only after opened the office did answer the clerk calls.", "Only after the office did opened the clerk answer calls."],
            ["Only after the rule changed did the school update the form.", "Only after the rule changed the school updated the form.", "Only after changed the rule did update the school form.", "Only after the rule did changed the school update form."],
            ["Only after the test began did the students see the instructions.", "Only after the test began the students saw the instructions.", "Only after began the test did see the students instructions.", "Only after the test did began the students see instructions."],
            ["Only after the clinic closed did the nurse check the schedule.", "Only after the clinic closed the nurse checked the schedule.", "Only after closed the clinic did check the nurse schedule.", "Only after the clinic did closed the nurse check schedule."]
          ];
          const set = pick(examples, i);
          return item(`Choose the correct formal sentence.`, set, set[0]);
        }
      },
      {
        code: "v-easy-synonym",
        category: "Vocabulary",
        subcategory: "Everyday vocabulary",
        difficulty: 1.1,
        make: (i) => {
          const set = pick(vocabularySets.easySynonyms, i);
          return item(`Which word means almost the same as "${set[0]}"?`, set.slice(1), set[1]);
        }
      },
      {
        code: "v-workplace",
        category: "Vocabulary",
        subcategory: "Workplace vocabulary",
        difficulty: 1.7,
        make: (i) => {
          const set = pick(vocabularySets.workplace, i);
          return item(`In an office message, "${set[0]}" means ___.`, set.slice(1), set[1]);
        }
      },
      {
        code: "v-word-forms",
        category: "Vocabulary",
        subcategory: "Word forms",
        difficulty: 2.1,
        make: (i) => {
          const sets = [
            ["The tutor gave a clear ___ of the grammar rule.", "explanation", "explain", "explained", "explaining", "explain"],
            ["The office needs written ___ before it changes the booking.", "confirmation", "confirm", "confirmed", "confirming", "confirm"],
            ["The worksheet includes a short ___ of the survey results.", "summary", "summarize", "summarized", "summarizing", "summarize"],
            ["The speaker made a brief ___ before the discussion.", "introduction", "introduce", "introduced", "introducing", "introduce"],
            ["The teacher asked for a quick ___ before class ended.", "decision", "decide", "decided", "deciding", "decide"],
            ["The lesson showed clear ___ after more practice.", "improvement", "improve", "improved", "improving", "improve"],
            ["The student gave a polite ___ to the question.", "response", "respond", "responded", "responding", "respond"],
            ["The office sent a request for ___ before Friday.", "payment", "pay", "paid", "paying", "pay"],
            ["The program requires an online ___ first.", "application", "apply", "applied", "applying", "apply"],
            ["The two groups reached an ___ after the meeting.", "agreement", "agree", "agreed", "agreeing", "agree"],
            ["The form asks for a short ___ of the problem.", "description", "describe", "described", "describing", "describe"],
            ["The activity begins with a clear ___ from the teacher.", "instruction", "instruct", "instructed", "instructing", "instruct"],
            ["The list shows the final ___ for the course.", "selection", "select", "selected", "selecting", "select"],
            ["The manager gave official ___ for the new plan.", "approval", "approve", "approved", "approving", "approve"],
            ["The club sent an ___ to every new student.", "invitation", "invite", "invited", "inviting", "invite"],
            ["The report includes a careful ___ of the answers.", "analysis", "analyze", "analyzed", "analyzing", "analyze"]
          ];
          const set = pick(sets, i);
          return item(set[0], set.slice(1, 5), set[1], `word-form:${set[5]}`);
        }
      },
      {
        code: "v-collocations",
        category: "Vocabulary",
        subcategory: "Collocations",
        difficulty: 2.5,
        make: (i) => {
          const set = pick(vocabularySets.collocations, i);
          return item(`Choose the word that sounds natural: The coordinator will ___ ${set[1]} before Friday.`, [set[0], set[2], set[3], set[4]], set[0], `words-together:${set[0]} ${set[1]}`);
        }
      },
      {
        code: "v-phrasal-verbs",
        category: "Vocabulary",
        subcategory: "Phrasal verbs",
        difficulty: 2.9,
        make: (i) => {
          const sets = [
            ["Please fill ___ the application before the interview.", "out", "up", "over", "away"],
            ["The meeting was put ___ until Friday.", "off", "out", "up", "over"],
            ["The teacher pointed ___ the most common error.", "out", "in", "over", "through"],
            ["The receptionist looked ___ the appointment number.", "up", "off", "out", "away"]
          ];
          const set = pick(sets, i);
          return item(set[0], set.slice(1), set[1]);
        }
      },
      {
        code: "v-transitions",
        category: "Vocabulary",
        subcategory: "Transitions",
        difficulty: 3.2,
        make: (i) => {
          const examples = [
            "The plan is inexpensive; ___, it may take too long.",
            "The room is small; ___, it has enough chairs.",
            "The form is short; ___, some questions are difficult.",
            "The course is useful; ___, it requires a lot of homework.",
            "The office is busy; ___, the staff answer calls quickly.",
            "The book is old; ___, the examples are still helpful.",
            "The bus is slow; ___, it is cheaper than a taxi.",
            "The lesson is hard; ___, most students can follow it."
          ];
          return item(`Choose the word that shows a different idea: ${pick(examples, i)}`, ["however", "therefore", "for example", "similarly"], "however");
        }
      },
      {
        code: "v-context-meaning",
        category: "Vocabulary",
        subcategory: "Meaning in context",
        difficulty: 3.5,
        make: (i) => {
          const set = pick(vocabularySets.contextMeanings, i);
          return item(`What does "${set[1]}" mean in this sentence? ${set[0]}`, set.slice(2), set[2]);
        }
      },
      {
        code: "v-academic",
        category: "Vocabulary",
        subcategory: "Academic vocabulary",
        difficulty: 3.9,
        make: (i) => {
          const set = pick(vocabularySets.academic, i);
          return item(`In school or work reading, "${set[0]}" means ___.`, set.slice(1), set[1]);
        }
      },
      {
        code: "v-register",
        category: "Vocabulary",
        subcategory: "Register",
        difficulty: 4.3,
        make: (i) => {
          const set = pick(vocabularySets.register, i);
          return item(`Which sentence is most appropriate for a formal report?`, set, set[0]);
        }
      },
      {
        code: "v-nuance",
        category: "Vocabulary",
        subcategory: "Nuance",
        difficulty: 4.7,
        make: (i) => {
          const set = pick(vocabularySets.nuance, i);
          return item(`Which meaning best matches "${set[0]}"?`, set.slice(1), set[1]);
        }
      },
      {
        code: "v-hedging",
        category: "Vocabulary",
        subcategory: "Hedging and precision",
        difficulty: 5.2,
        make: (i) => {
          const examples = [
            ["The findings suggest that attendance may affect course completion.", "The findings prove that attendance always causes success.", "The findings are totally certain for every student.", "The findings show that no other factor matters."],
            ["The survey results suggest that cost may influence enrollment.", "The survey results prove that cost always controls enrollment.", "The survey results are totally certain for every school.", "The survey results show that no other issue matters."],
            ["The data indicate that class size may affect participation.", "The data prove that class size always causes participation.", "The data are totally certain for every class.", "The data show that no other factor matters."],
            ["The responses suggest that clearer instructions may reduce errors.", "The responses prove that instructions always remove all errors.", "The responses are totally certain for every student.", "The responses show that no other problem matters."],
            ["The pattern suggests that practice may improve test performance.", "The pattern proves that practice always guarantees high scores.", "The pattern is totally certain for every learner.", "The pattern shows that no other factor matters."],
            ["The chart indicates that wait times may affect satisfaction.", "The chart proves that wait times always cause satisfaction.", "The chart is totally certain for every customer.", "The chart shows that no other detail matters."],
            ["The report suggests that reminders may increase attendance.", "The report proves that reminders always force attendance.", "The report is totally certain for every event.", "The report shows that no other factor matters."],
            ["The results indicate that location may influence student choice.", "The results prove that location always controls student choice.", "The results are totally certain for every student.", "The results show that no other factor matters."]
          ];
          const set = pick(examples, i);
          return item(`Which sentence is careful and not too strong?`, set, set[0]);
        }
      },
      {
        code: "v-discourse",
        category: "Vocabulary",
        subcategory: "Discourse function",
        difficulty: 5.6,
        make: (i) => {
          const examples = [
            ["One limitation of this study is that the sample was small.", "This study is perfect because the sample was small.", "The sample was small, so the topic is not worth discussing.", "A small sample proves that the results are universal."],
            ["One limitation of this survey is that most responses came from one school.", "This survey is perfect because most responses came from one school.", "One school answered, so the topic is not worth discussing.", "Responses from one school prove that the results are universal."],
            ["One limitation of this report is that it uses data from only two months.", "This report is perfect because it uses data from only two months.", "Two months of data mean the topic is not worth discussing.", "Two months of data prove that the results are universal."],
            ["One limitation of this experiment is that the groups were not the same size.", "This experiment is perfect because the groups were not the same size.", "Unequal groups mean the topic is not worth discussing.", "Unequal groups prove that the results are universal."],
            ["One limitation of this analysis is that some answers were incomplete.", "This analysis is perfect because some answers were incomplete.", "Incomplete answers mean the topic is not worth discussing.", "Incomplete answers prove that the results are universal."],
            ["One limitation of this study is that it did not include evening students.", "This study is perfect because it did not include evening students.", "Missing one group means the topic is not worth discussing.", "Missing one group proves that the results are universal."],
            ["One limitation of this survey is that the questions were very general.", "This survey is perfect because the questions were very general.", "General questions mean the topic is not worth discussing.", "General questions prove that the results are universal."],
            ["One limitation of this report is that it compares only two locations.", "This report is perfect because it compares only two locations.", "Two locations mean the topic is not worth discussing.", "Two locations prove that the results are universal."]
          ];
          const set = pick(examples, i);
          return item(`Which sentence says one problem with a study?`, set, set[0]);
        }
      }
    ];
    
    const supplementalQuestionSets = {
      comparisons: [
        ["Tom is ___ than Mike.", ["much more intelligent", "very more intelligent", "very much intelligent", "many more intelligent"], "much more intelligent"],
        ["Dogs are usually ___ cats.", ["larger than", "larger", "more larger than", "very larger than"], "larger than"],
        ["This zoo is ___ the one in Paris.", ["much cheaper than", "more cheaper than", "very cheap less than", "more lesser price than"], "much cheaper than"],
        ["Tom is twice ___ as Mike.", ["as tall", "as high", "as much high", "the high"], "as tall"],
        ["My new apartment is ___ my old apartment.", ["the same size as", "same size to", "same size than", "the same size to"], "the same size as"],
        ["The museums in Tokyo are ___ the museums in Paris.", ["less crowded than", "less crowded to", "less crowding than", "less crowding to"], "less crowded than"],
        ["There are ___ large animals in Africa than in Australia.", ["many more", "much more", "so many", "very many"], "many more"],
        ["This chair is ___ that one.", ["more comfortable than", "more comfortable to", "more comfort than", "very comfort than"], "more comfortable than"],
        ["The taxi costs ___ 50 dollars.", ["more than", "higher than", "very over", "more expensive"], "more than"],
        ["It is ___ today than yesterday.", ["much colder", "so colder", "very colder", "very cold"], "much colder"],
        ["Our shirts are ___ the shirts from other companies.", ["better than", "more better than", "superior than", "good than"], "better than"],
        ["The price is now almost ___ last year's price.", ["double", "double than", "double from", "twice more above"], "double"],
        ["I am ___ the other students.", ["older than", "more old than", "higher age from", "the oldest of"], "older than"],
        ["This task is ___ than I expected.", ["more difficult", "more difficult as", "very difficult than", "much difficult"], "more difficult"]
      ],
      feelings: [
        ["I ___ because my dog died.", ["am sad", "have sad", "sad", "sadness"], "am sad"],
        ["Based on his expression, he ___.", ["is angry", "is anger", "will angry", "will anger"], "is angry"],
        ["I ___ to walk in the dark by myself.", ["am scared", "am scary", "have scare", "is scared"], "am scared"],
        ["When my friend arrived unexpectedly, I ___.", ["was surprised", "was surprising", "had surprise", "have surprised"], "was surprised"],
        ["I could not see my mother this weekend, so I ___.", ["was disappointed", "was disappointing", "feel disappoint", "disappointed"], "was disappointed"],
        ["The recent decline in the economy makes me ___.", ["depressed", "a depression", "depression", "depressing"], "depressed"],
        ["Their loud voices were ___ me.", ["annoying to", "annoyance to", "annoyed", "annoying for"], "annoying to"],
        ["I ___ to find my lost keys under my bed.", ["was relieved", "had relief", "show relief", "took relief"], "was relieved"],
        ["If you ___, I recommend you take a short holiday.", ["are stressed", "are stress", "are stressful", "feel stressful"], "are stressed"],
        ["I am not ___ the danger of earthquakes.", ["worried about", "worried for", "worry about", "worried"], "worried about"],
        ["Mary's condition ___ after she left the hospital.", ["got worse", "is worse", "is worser", "worsened worse"], "got worse"],
        ["Parenting is ___ for many new parents.", ["very stressful", "high stressful", "much stressful", "so big stress"], "very stressful"]
      ],
      verbForms: [
        ["Yesterday, Daniel ___ the client before lunch.", ["called", "call", "has called", "calls"], "called"],
        ["Every Monday, Mina ___ the sales report.", ["checks", "check", "checked", "checking"], "checks"],
        ["Recently, employment ___ increasing.", ["has been", "have been", "is likely to", "will be"], "has been"],
        ["The weather ___ since this morning.", ["has changed", "changes", "is changing", "very changed"], "has changed"],
        ["I ___ that woman before.", ["have never seen", "having never seen", "never see", "not see"], "have never seen"],
        ["I ___ you ten dollars already.", ["have given", "have gave", "gave to", "did give to"], "have given"],
        ["He was severely injured, but he ___.", ["has now recovered", "did now recover", "has now recovering", "now is recovery"], "has now recovered"],
        ["The team ___ many games recently.", ["has won", "has been winning", "wins", "will win"], "has won"],
        ["I ___ my job last year because I was tired of working nights.", ["quit", "quitted", "have quitted", "will quit"], "quit"],
        ["If he ___ here tomorrow, I hope he brings a camera.", ["comes", "come", "goes", "is going"], "comes"],
        ["I would buy a car if I ___ enough money.", ["had", "have", "make", "pay"], "had"],
        ["The boss would have been happy if they ___ the report.", ["had finished", "can finish", "finish", "were finished"], "had finished"],
        ["Look outside. It ___ to rain.", ["has started", "started", "will starting", "is doing"], "has started"],
        ["By the time I ___ the database, it was already 7 p.m.", ["accessed", "accessed to", "have accessed", "have access"], "accessed"]
      ],
      prepositions: [
        ["I will return to my hometown ___ Saturday.", ["on", "at", "in", "for"], "on"],
        ["I saw a good comedy ___ television last night.", ["on", "during", "in", "while"], "on"],
        ["I hope to stay dry ___ home.", ["on my way", "during walking", "for my way", "when walk"], "on my way"],
        ["I have visited many restaurants ___ Paris.", ["in", "at", "near to", "on"], "in"],
        ["The differences ___ Tokyo and Paris are significant.", ["between", "about", "among", "of"], "between"],
        ["My increasing weight is likely related ___ eating late.", ["to", "with", "for", "on"], "to"],
        ["I was not familiar ___ London, so I got lost.", ["with", "about", "for", "on"], "with"],
        ["I was able to concentrate ___ my work despite the noise.", ["on", "at", "for", "to"], "on"],
        ["I am responsible ___ my work duties.", ["for", "all", "in", "to"], "for"],
        ["The trip will take about one hour ___ train.", ["by", "for the", "on", "with"], "by"],
        ["We replaced the old coffee machine ___ a new one.", ["with", "behind", "for", "to"], "with"],
        ["The map indicated the restaurant was north, so I headed ___ that direction.", ["in", "at", "for", "to"], "in"],
        ["I always feel tired ___ night.", ["at", "in", "over", "when"], "at"],
        ["We have the same opinion ___ this issue.", ["on", "for", "to", "with"], "on"]
      ],
      articlesAndNouns: [
        ["I found my keys under ___ old chair.", ["an", "a", "the", "(nothing)"], "an"],
        ["I bought a new car. ___ car is red.", ["The", "And", "Because a", "New"], "The"],
        ["Are you able to play ___ piano?", ["the", "a", "for", "on"], "the"],
        ["I have ___ information about the competition.", ["much", "many", "several", "a few"], "much"],
        ["There is ___ furniture in my house.", ["much", "many", "many furnitures", "much furnitures"], "much"],
        ["There was ___ traffic on the road this morning.", ["heavy", "many", "big", "such heavier"], "heavy"],
        ["Each ___ has a unique personality.", ["child", "children", "childs", "childrens"], "child"],
        ["Two ___ were sick yesterday.", ["staff members", "staffs", "staff member", "employee"], "staff members"],
        ["I drank ___ water after running.", ["a lot of", "several", "very many", "many"], "a lot of"],
        ["She got sick after eating ___ cake.", ["too much", "a lots of", "very many", "huge many"], "too much"],
        ["I have ___ money, so I cannot buy the computer.", ["little", "few", "not many", "few monies"], "little"],
        ["A few ___ in my town dislike the tourists.", ["people", "peoples", "of people", "of the people"], "people"],
        ["Almost ___ cats are smaller than dogs.", ["all", "every", "all of", "the"], "all"],
        ["Most ___ have a casual way of speaking.", ["Americans", "all American", "every American", "of Americans"], "Americans"]
      ],
      infinitivesAndGerunds: [
        ["Are you able ___ market conditions?", ["to research", "for researching", "at researching", "to researching"], "to research"],
        ["What is the best way ___ a new apartment?", ["to find", "for finding", "of finding", "to finding"], "to find"],
        ["I decided ___ the incident to the police.", ["to report", "on report", "reporting", "the report"], "to report"],
        ["They decided ___ the new product in the U.S.", ["to promote", "promotion of", "on a promote of", "to promoting"], "to promote"],
        ["I asked them ___ the broken machine.", ["to repair", "fixing", "if they repair", "repair"], "to repair"],
        ["It is easy ___ a new computer online.", ["to buy", "easily to buy", "easy for buying", "easy in buying"], "to buy"],
        ["I don't enjoy ___ in English.", ["emailing", "at times I email", "during email", "to do email"], "emailing"],
        ["I hope ___ many friends at university.", ["to make", "finding", "making", "to look"], "to make"],
        ["It is important ___ your instructor carefully.", ["to listen to", "for listening to", "to listen", "to listen for"], "to listen to"],
        ["Please consider ___ our product.", ["buying", "if can buy", "if you will buy", "to buy"], "buying"],
        ["I suggest ___ the museums in Paris.", ["visiting", "you visit to", "visiting to", "to visit for seeing"], "visiting"],
        ["I had difficulty ___ the exam.", ["completing", "for completion of", "in complete", "to complete"], "completing"],
        ["I recommend you ___ dangerous places when traveling.", ["avoid", "to avoiding", "for avoiding", "use caution to avoiding"], "avoid"],
        ["I want ___ a law degree.", ["to try to get", "the challenge of", "to challenge to", "to try so"], "to try to get"]
      ],
      wordForms: [
        ["You are always ___ on every project.", ["successful", "a succeed", "succeed", "success"], "successful"],
        ["This is the end of my ___. Are there any questions?", ["speech", "speak", "speaker", "speaking"], "speech"],
        ["I am now ___ to walk home from my office.", ["able", "ability", "able to", "have ability"], "able"],
        ["I received an ___ prize after I won the race.", ["amazing", "amazed", "amazement", "amazingly"], "amazing"],
        ["To be ___, you must think positively.", ["successful", "succeed", "success", "successfully"], "successful"],
        ["I am ___ your friendship.", ["appreciative of", "appreciating", "feeling appreciative with", "having appreciation for"], "appreciative of"],
        ["Learning any language requires time and ___.", ["effort", "efforts", "efforting", "effortful"], "effort"],
        ["His ___ is not important. He is kind even though he is short.", ["height", "high", "short", "tall"], "height"],
        ["My tennis ___ are still low.", ["skills", "skill is", "skills very", "skill are"], "skills"],
        ["Please keep personal information ___.", ["confidential", "careful", "hiding", "secretly"], "confidential"],
        ["The German ___ has been improving recently.", ["economy", "economic", "finance", "financial"], "economy"],
        ["The choice was difficult, but I ___ the blue shirt.", ["chose", "choose", "choice", "choosing"], "chose"],
        ["I am ___ that you will do well.", ["confident", "confidence", "have confident", "am confidence"], "confident"],
        ["The recent news made investors more ___.", ["optimistic", "optimism", "optimist", "optimistically"], "optimistic"]
      ],
      workplace: [
        ["We would like ___ a 10% discount.", ["to request", "for request", "to be requesting", "your request"], "to request"],
        ["Can you ___ if we buy 100 units?", ["give us a discount", "be given one", "give us", "have given this"], "give us a discount"],
        ["Please ___ the contract before Friday.", ["sign", "pay", "spend", "cost"], "sign"],
        ["The company currently ___ a strong data privacy policy.", ["does not have", "did not have", "has no", "is not having"], "does not have"],
        ["We need to keep our data ___.", ["confidential", "careful", "hiding", "secretly"], "confidential"],
        ["The manager ___ the old copy machine right now.", ["is discussing replacing", "is discussing to replace", "has discussion for replacing", "will discussing replacing"], "is discussing replacing"],
        ["I ___ a credit card last year, but I was rejected.", ["applied for", "applicant on", "applied to", "applying to"], "applied for"],
        ["The CEO ___ the project because it looked promising.", ["signed off on", "signed over", "signed up on", "signed it over"], "signed off on"],
        ["We are ___ with another company.", ["in negotiations", "having negotiating", "negotiate", "on negotiation"], "in negotiations"],
        ["Your employer must ___ if you work more than 40 hours.", ["pay you overtime", "calculate overtime into salary", "overtime pay to you", "pay for overwork"], "pay you overtime"],
        ["The new product ___ last month.", ["did not sell very well", "did not sell good", "has not selling very well", "is not selling many"], "did not sell very well"],
        ["The launch of the new products ___.", ["was unsuccessful", "do not succeed", "made successfully", "wasn't success"], "was unsuccessful"],
        ["The speaker gave three ___ sales.", ["ways to increase", "points increasing", "points to increase", "ways for increasing"], "ways to increase"],
        ["We need a way ___ our expenses.", ["to reduce", "for reducing", "in reduction of", "of reduction"], "to reduce"]
      ],
      commonPhrases: [
        ["He has already ___ a seat on the train.", ["booked", "scheduled", "had", "special"], "booked"],
        ["I usually pay with a card, but today I paid ___.", ["in cash", "by dollars", "different", "money"], "in cash"],
        ["If you blow out all the candles, your wish may ___.", ["come true", "go true", "hold true", "make true"], "come true"],
        ["I have ___ a new apartment for two weeks.", ["been looking for", "a search for", "been searching", "search for"], "been looking for"],
        ["Feel free to ___ my office anytime.", ["drop by", "return", "stop over", "visit to"], "drop by"],
        ["I'll have my boss ___ as soon as he returns.", ["call you back", "back call you", "call to you", "call to you back"], "call you back"],
        ["You should ___ both doors before we leave.", ["lock", "locking", "to lock", "to locking"], "lock"],
        ["I borrowed money from my friend, so I need to ___ soon.", ["pay him back", "have paid him back", "make payment back", "pay back it"], "pay him back"],
        ["You can ___ if you exercise every day.", ["get in shape", "conditioning", "have good condition", "shape up yourself"], "get in shape"],
        ["I got lost ___ the park.", ["on my way to", "during walking to", "on the way for", "on way to"], "on my way to"],
        ["Go ahead and borrow my coat. You can ___ later.", ["bring it back", "back to me", "return for it", "take it back to me"], "bring it back"],
        ["I need someone to wash my car. Can you ___?", ["do it", "do", "wash this", "washing"], "do it"],
        ["I ___ my favorite baseball team whenever they play.", ["cheer for", "always cheering", "cheer up", "say cheers at"], "cheer for"],
        ["We thought it wise to ___ an emergency.", ["prepare for", "have preparation for", "plan an emergency", "prepare emergencies"], "prepare for"]
      ],
      linksAndClauses: [
        ["I like cycling. ___, cycling carries a risk of injury.", ["However", "Because", "In fact", "Therefore"], "However"],
        ["The boy spent all his money on candy. ___, his mother was angry.", ["Therefore", "After", "For example", "This reason"], "Therefore"],
        ["I asked him to close the window ___ I was cold.", ["because", "due to", "since to", "so"], "because"],
        ["___ my friend is short, he is athletic.", ["Even though", "Even", "Even after", "Even if"], "Even though"],
        ["I may move to Argentina ___ I know little about the country.", ["even though", "even", "even although", "even if"], "even though"],
        ["The first idea is useful, ___ the second idea is more practical.", ["but", "for example", "so", "then"], "but"],
        ["I did well in school, ___ both of my parents were proud.", ["so", "although", "because", "that"], "so"],
        ["No one is here in the park ___ me.", ["except for", "except only", "including", "unless"], "except for"],
        ["___ bananas, are there other tropical fruits you enjoy?", ["Apart from", "Excluding banana", "Not counting banana", "Except to"], "Apart from"],
        ["I was allowed to use my father's car ___ I came home before 10 p.m.", ["on the condition that", "condition that", "if the condition", "with conditioning"], "on the condition that"],
        ["I will let you know ___ my boss gets back.", ["as soon as", "as soon", "soon", "until"], "as soon as"],
        ["I always drink coffee ___ eating breakfast.", ["while", "during", "every time I", "every time"], "while"],
        ["No one in my family believes in Santa ___ me.", ["except for", "but except", "but exception is", "except to"], "except for"],
        ["I wonder what the company will do ___ the product launch failed.", ["now that", "because that", "during", "while"], "now that"]
      ],
      correctSentences: [
        { text: "Which sentence is correct?", options: ["It is almost 2 p.m. now.", "It has almost 2 p.m. now.", "It close to 2 p.m. now.", "2 p.m. is almost now."], answer: "It is almost 2 p.m. now.", subcategory: "Advanced sentence structure" },
        { text: "Choose the correct sentence.", options: ["Because I was tired, I went to bed.", "I was tired. Because I went to bed.", "I went to bed. Because I was tired.", "Because I tired, I went to bed."], answer: "Because I was tired, I went to bed.", subcategory: "Clauses and connectors" },
        { text: "Which sentence is correct?", options: ["Could you tell me what the homework is?", "Could you tell to me the homework?", "Would you say me the homework?", "Would you say to me the homework?"], answer: "Could you tell me what the homework is?", subcategory: "Advanced sentence structure" },
        { text: "Choose the best sentence.", options: ["Were you born the same year as I was?", "Are you born the same year with me?", "Do you and I have the same year of born?", "Are we born the same year?"], answer: "Were you born the same year as I was?", subcategory: "Advanced sentence structure" },
        { text: "Which sentence is correct?", options: ["There are five participants.", "There is five participants.", "There be five participants.", "There will has five participants."], answer: "There are five participants.", subcategory: "Subject-verb agreement" },
        { text: "Choose the correct sentence.", options: ["The teacher prohibits students from eating in class.", "The teacher prohibits students to eat in class.", "The teacher has prohibit students from eating in class.", "The teacher have prohibited students from eating in class."], answer: "The teacher prohibits students from eating in class.", subcategory: "Verb tense" },
        { text: "Which sentence is correct?", options: ["My brother earns much more than I do.", "My brother make much more than I do.", "My brother has an income much more than I do.", "My brother is paid much more than I do earn."], answer: "My brother earns much more than I do.", subcategory: "Comparatives" },
        { text: "Choose the best sentence.", options: ["I had my hair cut by the barber.", "I cut my hair by the barber.", "I am cutting my hairs at the barber.", "I had my hairs cut by the barber."], answer: "I had my hair cut by the barber.", subcategory: "Passive voice" },
        { text: "Which sentence is correct?", options: ["I have been busy recently.", "I have busy life recently.", "I am busy recently.", "I had been busy recently."], answer: "I have been busy recently.", subcategory: "Verb tense" },
        { text: "Choose the correct sentence.", options: ["Most people do not worry about earthquakes.", "Almost people do not worry about earthquakes.", "Most of people do not worry about earthquakes.", "Most of the peoples do not worry about earthquakes."], answer: "Most people do not worry about earthquakes.", subcategory: "Count and noncount nouns" },
        { text: "Which sentence is correct?", options: ["I enjoy watching kittens play.", "I enjoy to watch kittens play.", "I enjoy to look kittens playing.", "I am enjoying to view kittens."], answer: "I enjoy watching kittens play.", subcategory: "Clauses and connectors" },
        { text: "Choose the best sentence.", options: ["It does not matter what people think about you.", "It does not care what people think about you.", "It does not important what people think about you.", "It does not problem what people think about you."], answer: "It does not matter what people think about you.", subcategory: "Advanced sentence structure" }
      ]
    };
    
    const supplementalBlueprints = [
      { code: "s-comparisons", category: "Grammar", subcategory: "Comparatives", difficultyOffset: -0.08, sets: supplementalQuestionSets.comparisons },
      { code: "s-feelings", category: "Vocabulary", subcategory: "Word forms", difficultyOffset: -0.12, sets: supplementalQuestionSets.feelings },
      { code: "s-verb-forms", category: "Grammar", subcategory: "Verb tense", difficultyOffset: -0.04, sets: supplementalQuestionSets.verbForms },
      { code: "s-prepositions", category: "Grammar", subcategory: "Prepositions", difficultyOffset: -0.02, sets: supplementalQuestionSets.prepositions },
      { code: "s-nouns", category: "Grammar", subcategory: "Count and noncount nouns", difficultyOffset: -0.1, sets: supplementalQuestionSets.articlesAndNouns },
      { code: "s-infinitives", category: "Grammar", subcategory: "Clauses and connectors", difficultyOffset: 0.08, sets: supplementalQuestionSets.infinitivesAndGerunds },
      { code: "s-word-forms", category: "Vocabulary", subcategory: "Word forms", difficultyOffset: 0.03, sets: supplementalQuestionSets.wordForms },
      { code: "s-workplace", category: "Vocabulary", subcategory: "Workplace vocabulary", difficultyOffset: 0.12, sets: supplementalQuestionSets.workplace },
      { code: "s-phrases", category: "Vocabulary", subcategory: "Phrasal verbs", difficultyOffset: 0.06, sets: supplementalQuestionSets.commonPhrases },
      { code: "s-links", category: "Vocabulary", subcategory: "Transitions", difficultyOffset: 0.14, sets: supplementalQuestionSets.linksAndClauses },
      { code: "s-correct-sentence", category: "Grammar", subcategory: "Advanced sentence structure", difficultyOffset: 0.18, sets: supplementalQuestionSets.correctSentences }
    ].map((blueprint) => ({
      ...blueprint,
      make: (i) => {
        const set = pick(blueprint.sets, i);
        if (set && !Array.isArray(set)) return item(set.text, set.options, set.answer, "", "", { subcategory: set.subcategory });
        return item(set[0], set[1], set[2]);
      }
    }));
    
    const supplementalDifficultyRanges = {
      "s-comparisons": [1.45, 3.85],
      "s-feelings": [1.1, 3.35],
      "s-verb-forms": [1.35, 4.45],
      "s-prepositions": [1.3, 3.9],
      "s-nouns": [1.25, 3.8],
      "s-infinitives": [1.75, 4.25],
      "s-word-forms": [1.35, 4.05],
      "s-workplace": [1.8, 4.4],
      "s-phrases": [1.75, 4.15],
      "s-links": [2.05, 4.5],
      "s-correct-sentence": [1.35, 3.95]
    };
    

    return {
      schema,
      names,
      places,
      reports,
      topics,
      simpleObjects,
      programs,
      practiceSettings,
      practiceMaterials,
      practicePurposes,
      vocabularySets,
      blueprints,
      supplementalQuestionSets,
      supplementalBlueprints,
      supplementalDifficultyRanges
    };
  };
}());
