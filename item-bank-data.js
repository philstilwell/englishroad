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
        ["The notice says the deadline for the form is Friday.", "deadline", "the time something must be finished", "a person who trains employees", "a room for interviews", "a printed advertisement"],
        ["The company sent an invoice after the customer bought the chairs.", "invoice", "a document requesting payment", "a list of holidays", "a message of apology", "a workplace rule"],
        ["Please ask your supervisor before changing your work schedule.", "supervisor", "a person who manages workers", "a customer complaint", "a delivery address", "a meeting agenda"],
        ["The teacher gave the class an extension, so the project is due next week.", "extension", "extra time to finish something", "a written signature", "a travel discount", "a safety problem"],
        ["My appointment with the adviser is at 3 p.m.", "appointment", "an arranged meeting", "a monthly salary", "a product manual", "an office supply"]
      ],
      academic: [
        ["The two reports gave consistent results, so the manager trusted the numbers.", "consistent", "matching or agreeing with something", "easy to notice", "not lasting long", "based on luck"],
        ["The new schedule made a significant difference because fewer students arrived late.", "significant", "important enough to notice", "too simple to use", "made by hand", "written in advance"],
        ["The plan was based on the assumption that most students had internet access.", "assumption", "an idea accepted before proof", "a final payment", "a public celebration", "a travel document"],
        ["The arrows on the map indicate the safest exit from the building.", "indicate", "show or suggest", "hide completely", "copy exactly", "pay immediately"],
        ["The teacher showed a new method for remembering vocabulary words.", "method", "a way of doing something", "a result that cannot change", "a list of prices", "a private opinion"]
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
            ["The receptionist gave me ___ appointment card.", "an", ["a", "an", "many", "(nothing)"]],
            ["We need ___ updated map for the new students.", "an", ["a", "an", "many", "(nothing)"]],
            ["Carlos found ___ useful chart in the report.", "a", ["a", "an", "many", "(nothing)"]],
            ["The office has ___ printer near the entrance.", "a", ["a", "an", "many", "(nothing)"]],
            ["Please bring ___ umbrella if it rains.", "an", ["a", "an", "many", "(nothing)"]]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex[2], ex[1]);
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
        subcategory: "Inversion and emphasis",
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
        code: "g-gerund-infinitive",
        category: "Grammar",
        subcategory: "Gerunds and infinitives",
        difficulty: 3.1,
        make: (i) => {
          const examples = [
            ["The teacher suggested ___ the article before class.", "reading", "to read", "read", "to reading"],
            ["The office agreed ___ the deadline by two days.", "to extend", "extending", "extend", "to extending"],
            ["Nadia avoided ___ the same mistake twice.", "making", "to make", "make", "to making"],
            ["The manager expects the team ___ the form today.", "to finish", "finishing", "finish", "to finishing"],
            ["Students practiced ___ short answers in pairs.", "writing", "to write", "write", "to writing"],
            ["Carlos hopes ___ the certificate this year.", "to earn", "earning", "earn", "to earning"],
            ["The notice reminded visitors ___ their badges.", "to wear", "wearing", "wear", "to wearing"],
            ["Mina is interested in ___ online classes.", "taking", "to take", "take", "to taking"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-question-forms",
        category: "Grammar",
        subcategory: "Question forms",
        difficulty: 3.3,
        make: (i) => {
          const examples = [
            ["Where did the interview take place?", "Where the interview took place?", "Where did took place the interview?", "Where was the interview took place?"],
            ["How many students joined the class?", "How many students did joined the class?", "How many joined students the class?", "How many students were join the class?"],
            ["Why was the office closed yesterday?", "Why the office was closed yesterday?", "Why did the office was closed yesterday?", "Why was closed the office yesterday?"],
            ["When will the course begin?", "When the course will begin?", "When will begin the course?", "When does the course will begin?"],
            ["What does this notice mean?", "What this notice means?", "What does mean this notice?", "What is this notice mean?"],
            ["Who did the teacher call after class?", "Who the teacher called after class?", "Who did called the teacher after class?", "Who was the teacher call after class?"],
            ["How long has Daniel worked there?", "How long Daniel has worked there?", "How long has worked Daniel there?", "How long did Daniel has worked there?"],
            ["Which form should applicants complete first?", "Which form applicants should complete first?", "Which form should complete applicants first?", "Which form do applicants should complete first?"]
          ];
          const set = pick(examples, i);
          return item("Choose the correct question.", set, set[0]);
        }
      },
      {
        code: "g-pronouns-reference",
        category: "Grammar",
        subcategory: "Pronouns and reference",
        difficulty: 3.6,
        make: (i) => {
          const examples = [
            ["The report was long, so I read ___ twice.", "it", "them", "they", "she"],
            ["Mina and Sofia finished the task, and ___ sent it to the teacher.", "they", "she", "it", "we"],
            ["The students asked the teacher if ___ could leave early.", "they", "it", "she", "him"],
            ["The printer is broken, so please do not use ___.", "it", "them", "they", "her"],
            ["The forms are ready; please put ___ on the desk.", "them", "it", "they", "she"],
            ["Aiko lost her card, but she found ___ later.", "it", "them", "they", "him"],
            ["The clinic changed its hours because ___ had fewer evening patients.", "it", "they", "them", "she"],
            ["The books were heavy, so Carlos carried ___ in two bags.", "them", "it", "they", "he"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-determiners-quantifiers",
        category: "Grammar",
        subcategory: "Determiners and quantifiers",
        difficulty: 3.7,
        make: (i) => {
          const examples = [
            ["Several students came, but only ___ brought photo ID.", "a few", "much", "any", "a little"],
            ["There was too ___ noise in the hallway.", "much", "many", "few", "several"],
            ["We have enough chairs for ___ participant.", "each", "all", "many", "much"],
            ["The office has ___ copies left, so please print more.", "few", "a little", "much", "every"],
            ["Both rooms have ___ own projector.", "their", "its", "his", "our"],
            ["I have ___ time before class, so I can help.", "a little", "few", "many", "several"],
            ["Neither answer is complete, so ___ one is correct.", "neither", "both", "all", "many"],
            ["Every applicant must bring ___ passport.", "a", "many", "much", "any"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-adjective-adverb",
        category: "Grammar",
        subcategory: "Adjective and adverb forms",
        difficulty: 3.9,
        make: (i) => {
          const examples = [
            ["The assistant explained the rule ___.", "clearly", "clear", "clearness", "clearer"],
            ["The instructions were ___.", "clear", "clearly", "clearness", "clearer than"],
            ["The speaker talked ___ enough for the class to follow.", "slowly", "slow", "slowness", "slower"],
            ["The room became ___ after the repair.", "quiet", "quietly", "quietness", "quieter than"],
            ["The clerk handled the complaint ___.", "politely", "polite", "politeness", "more polite"],
            ["The result was ___ different from last year.", "slightly", "slight", "slightness", "slighter"],
            ["The students worked ___ during the practice test.", "carefully", "careful", "carefulness", "more careful"],
            ["The answer sounds ___.", "natural", "naturally", "nature", "more naturally"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-sentence-boundaries",
        category: "Grammar",
        subcategory: "Sentence boundaries",
        difficulty: 4.0,
        make: (i) => {
          const examples = [
            ["Although the room was small, everyone found a seat.", "Although the room was small. Everyone found a seat.", "Although the room was small everyone found.", "Although small room, everyone a seat."],
            ["The train was late, so the class started at ten.", "The train was late, so at ten.", "The train was late. So the class.", "The train late so class started ten."],
            ["Because the form was missing, the office called the applicant.", "Because the form was missing. The office called.", "Because missing the form, the applicant.", "Because the form missing called the applicant."],
            ["The instructions were clear; however, several students asked questions.", "The instructions were clear however several students.", "The instructions clear; however asked questions.", "However clear instructions, several students."],
            ["I checked the report before I sent it.", "I checked the report before.", "Before I sent it the report checked.", "I checked before sent the report."],
            ["When the meeting ended, the manager sent the notes.", "When the meeting ended. The manager sent.", "When ended meeting, the manager notes.", "The meeting ended when sent the notes."],
            ["The desk was closed, but the clerk answered the phone.", "The desk was closed but.", "But the clerk answered the phone the desk.", "The desk closed answered phone."],
            ["If the rain stops, the class will meet outside.", "If the rain stops. The class will.", "If stops rain, class outside.", "The class if rain stops meet outside."]
          ];
          const set = pick(examples, i);
          return item("Choose the complete sentence.", set, set[0]);
        }
      },
      {
        code: "g-parallel-structure",
        category: "Grammar",
        subcategory: "Parallel structure",
        difficulty: 4.6,
        make: (i) => {
          const examples = [
            ["The program helps students read faster, write clearly, and speak confidently.", "The program helps students read faster, clear writing, and speaking confidently.", "The program helps students reading faster, write clearly, and confident speech.", "The program helps students to read faster, writing clearly, and speak confidence."],
            ["The new policy is simple, fair, and easy to follow.", "The new policy is simple, fairness, and easy to follow.", "The new policy is simply, fair, and following easily.", "The new policy is simple, it is fair, and following."],
            ["The workshop teaches planning, writing, and revising.", "The workshop teaches planning, to write, and revision.", "The workshop teaches to plan, writing, and revise.", "The workshop teaches plans, writing, and to revise."],
            ["The manager asked us to check the data, update the chart, and send the file.", "The manager asked us to check the data, updating the chart, and the file sent.", "The manager asked us checking data, update the chart, and to send the file.", "The manager asked us to check the data, the chart update, and sending the file."],
            ["The report was accurate, organized, and useful.", "The report was accurate, organization, and useful.", "The report was accurately, organized, and usefulness.", "The report was accuracy, organized, and usefully."],
            ["Good feedback is specific, timely, and respectful.", "Good feedback is specific, timing, and respectful.", "Good feedback is specifically, timely, and respect.", "Good feedback is specific, time, and respectfully."],
            ["The course requires reading articles, joining discussions, and completing quizzes.", "The course requires reading articles, discussions to join, and complete quizzes.", "The course requires to read articles, joining discussions, and quizzes completed.", "The course requires article reading, to join discussions, and complete quizzes."],
            ["The team needs a clear goal, a realistic schedule, and a shared checklist.", "The team needs a clear goal, schedule realistically, and sharing checklist.", "The team needs clearly goal, a realistic schedule, and checklist shared.", "The team needs goal clear, realistic scheduling, and to share checklist."]
          ];
          const set = pick(examples, i);
          return item("Choose the sentence with matching parts.", set, set[0]);
        }
      },
      {
        code: "g-subjunctive",
        category: "Grammar",
        subcategory: "Subjunctive and unreal forms",
        difficulty: 5.1,
        make: (i) => {
          const examples = [
            ["The policy requires that each visitor ___ a badge.", "wear", "wears", "wore", "wearing"],
            ["The director suggested that the team ___ the report again.", "review", "reviews", "reviewed", "reviewing"],
            ["The rule requires that every applicant ___ on time.", "arrive", "arrives", "arrived", "arriving"],
            ["The teacher requested that each student ___ the form.", "submit", "submits", "submitted", "submitting"],
            ["The committee recommended that the office ___ the schedule.", "change", "changes", "changed", "changing"],
            ["It is important that the data ___ accurate.", "be", "is", "are", "being"],
            ["The lawyer insisted that the contract ___ signed today.", "be", "is", "was", "being"],
            ["The notice requires that payment ___ made before Friday.", "be", "is", "was", "being"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "g-cleft-emphasis",
        category: "Grammar",
        subcategory: "Inversion and emphasis",
        difficulty: 5.5,
        make: (i) => {
          const examples = [
            ["What the office needs most is a clearer schedule.", "What the office needs most are a clearer schedule.", "The office what needs most is a clearer schedule.", "What needs most the office is a clearer schedule."],
            ["It was Lena who found the missing form.", "It was Lena which found the missing form.", "Lena was it who found the missing form.", "It found Lena who was the missing form."],
            ["What surprised the class was the final example.", "What surprised the class were the final example.", "The class what surprised was the final example.", "What was surprised the class was the final example."],
            ["It is the deadline that worries the applicants.", "It is the deadline who worries the applicants.", "The deadline it is that worries applicants.", "It worries the deadline that the applicants."],
            ["What matters most is clear communication.", "What matter most is clear communication.", "What most matters are clear communication.", "Clear communication what matters most is."],
            ["It was after lunch that the results arrived.", "It was after lunch when did the results arrived.", "After lunch it was that arrived the results.", "It arrived after lunch that the results."],
            ["What the students wanted was more practice time.", "What the students wanted were more practice time.", "The students what wanted was more practice time.", "What wanted the students was more practice time."],
            ["It is this rule that causes the most mistakes.", "It is this rule who causes the most mistakes.", "This rule it is that the most mistakes.", "It causes this rule that most mistakes."]
          ];
          const set = pick(examples, i);
          return item("Choose the sentence that gives clear emphasis.", set, set[0]);
        }
      },
      {
        code: "v-school-work-terms",
        category: "Vocabulary",
        subcategory: "Academic vocabulary",
        difficulty: 2.7,
        make: (i) => {
          const examples = [
            ["The students must enroll before the class begins.", "enroll", "officially join a course", "pay for lunch", "write a complaint", "leave early"],
            ["The guide gave a brief overview before the tour.", "overview", "a short general explanation", "a lost object", "a private meeting", "a printed ticket"],
            ["The form asks for your current address.", "current", "true now", "very expensive", "written by hand", "easy to break"],
            ["The teacher asked us to identify the main problem.", "identify", "find and name", "repair quickly", "make smaller", "copy twice"],
            ["The office will notify applicants by email.", "notify", "tell officially", "invite socially", "refuse politely", "clean carefully"],
            ["The chart shows the annual cost of the program.", "annual", "happening once a year", "happening every day", "very private", "hard to understand"],
            ["The class will focus on practical skills.", "practical", "useful in real life", "hard to see", "not allowed", "written in the past"],
            ["The report includes a brief comment from the director.", "brief", "short", "late", "angry", "empty"]
          ];
          const set = pick(examples, i);
          return item(`What does "${set[1]}" mean in this sentence? ${set[0]}`, set.slice(2), set[2]);
        }
      },
      {
        code: "v-work-actions",
        category: "Vocabulary",
        subcategory: "Workplace vocabulary",
        difficulty: 3.1,
        make: (i) => {
          const examples = [
            ["The supervisor will ___ the final report before it is sent.", "review", "borrow", "ignore", "decorate"],
            ["Please ___ your password if you cannot log in.", "reset", "translate", "measure", "invite"],
            ["The office will ___ the appointment if the doctor is sick.", "reschedule", "celebrate", "describe", "rent"],
            ["The manager will ___ the new rules at the meeting.", "explain", "damage", "lend", "forget"],
            ["The assistant will ___ the files by date.", "organize", "repair", "refund", "complain"],
            ["The company will ___ the cost of travel after the trip.", "reimburse", "interrupt", "predict", "borrow"],
            ["The clerk will ___ your address in the system.", "update", "perform", "measure", "reserve"],
            ["The team will ___ the plan after receiving feedback.", "revise", "delay", "cancel", "print"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "v-cause-result",
        category: "Vocabulary",
        subcategory: "Transitions",
        difficulty: 3.6,
        make: (i) => {
          const examples = [
            ["The form was late; ___, it was not accepted.", "as a result", "in contrast", "for example", "in the meantime"],
            ["The room was full; ___, the class moved online.", "therefore", "however", "for instance", "similarly"],
            ["The bus was delayed; ___, several students arrived late.", "as a result", "on the other hand", "for example", "likewise"],
            ["The instructions were unclear; ___, many people asked questions.", "therefore", "nevertheless", "for instance", "instead"],
            ["The price increased; ___, fewer customers bought the product.", "as a result", "similarly", "for example", "meanwhile"],
            ["The website was down; ___, applicants could not submit forms.", "therefore", "however", "for example", "in addition"],
            ["The reminder was helpful; ___, attendance improved.", "as a result", "in contrast", "for instance", "meanwhile"],
            ["The office added another clerk; ___, waiting times became shorter.", "therefore", "however", "for example", "otherwise"]
          ];
          const ex = pick(examples, i);
          return item(`Choose the phrase that best connects the ideas: ${ex[0]}`, ex.slice(1), ex[1]);
        }
      },
      {
        code: "v-precise-verbs",
        category: "Vocabulary",
        subcategory: "Nuance",
        difficulty: 4.1,
        make: (i) => {
          const examples = [
            ["The chart ___ a steady increase in attendance.", "shows", "borrows", "excuses", "carries"],
            ["The report ___ several possible causes of the delay.", "identifies", "forgets", "decorates", "borrows"],
            ["The teacher ___ the difference between the two words.", "clarified", "damaged", "delivered", "rented"],
            ["The policy ___ visitors from entering after six.", "prevents", "invites", "borrows", "translates"],
            ["The example ___ how the rule works.", "illustrates", "cancels", "repairs", "rents"],
            ["The survey ___ that most students prefer evening classes.", "indicates", "carries", "prints", "interrupts"],
            ["The new rule ___ all applicants equally.", "applies to", "borrows from", "laughs at", "sleeps through"],
            ["The data ___ the manager's main point.", "support", "forget", "rent", "decorate"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "v-word-family-advanced",
        category: "Vocabulary",
        subcategory: "Word forms",
        difficulty: 4.5,
        make: (i) => {
          const examples = [
            ["The ___ of the data took two days.", "analysis", "analyze", "analyzed", "analyzing"],
            ["The manager asked for a more ___ explanation.", "detailed", "detail", "details", "detailing"],
            ["The chart shows a clear ___ in attendance.", "increase", "increasing", "increased", "increases"],
            ["The team made a careful ___ of the options.", "comparison", "compare", "compared", "comparing"],
            ["The school needs written ___ from a parent.", "permission", "permit", "permitted", "permitting"],
            ["The speaker gave a ___ answer to the question.", "direct", "direction", "directly", "directed"],
            ["The course requires regular ___ in class.", "participation", "participate", "participated", "participating"],
            ["The office needs an accurate ___ of the total cost.", "calculation", "calculate", "calculated", "calculating"]
          ];
          const ex = pick(examples, i);
          return item(ex[0], ex.slice(1), ex[1]);
        }
      },
      {
        code: "v-formal-choice",
        category: "Vocabulary",
        subcategory: "Register",
        difficulty: 5.0,
        make: (i) => {
          const examples = [
            ["We would appreciate your response by Friday.", "Please answer us by Friday, okay?", "Tell us by Friday if you can.", "Get back to us soon if possible."],
            ["The attached document provides further details.", "The file has more stuff in it.", "Look at the thing I sent for more.", "The attachment tells you more things."],
            ["Please contact the office if you require assistance.", "Call us if you need help.", "Tell the office if help is wanted.", "You can ask if you get stuck."],
            ["The meeting has been postponed until Monday.", "The meeting got pushed to Monday.", "We moved the meeting thing to Monday.", "Monday is when the meeting happens now."],
            ["We apologize for any inconvenience this may cause.", "Sorry if this causes trouble.", "We feel bad if this makes problems.", "Sorry about the mess this causes."],
            ["Your application is currently under review.", "We are looking at your application now.", "Your form is being checked these days.", "We have your application and look at it."],
            ["Please confirm your attendance at your earliest convenience.", "Please say if you will come when you can.", "Tell us soon if you are coming.", "Let us know about coming whenever."],
            ["The revised schedule will be distributed tomorrow.", "We will send the changed schedule tomorrow.", "The new schedule goes out tomorrow.", "Tomorrow we give everyone the fixed schedule."]
          ];
          const set = pick(examples, i);
          return item("Which sentence is best for a formal email?", set, set[0]);
        }
      },
      {
        code: "v-inference-meaning",
        category: "Vocabulary",
        subcategory: "Meaning in context",
        difficulty: 5.4,
        make: (i) => {
          const examples = [
            ["The manager ruled out closing the office because too many clients still needed help.", "ruled out", "decided not to consider", "made into a law", "wrote on a form", "counted carefully"],
            ["The team carried out the survey over three weeks.", "carried out", "completed or performed", "held in their hands", "moved outdoors", "cancelled suddenly"],
            ["The director backed up the decision with sales data.", "backed up", "supported", "moved backward", "copied a file only", "delayed"],
            ["The teacher went over the rule again before the quiz.", "went over", "reviewed", "walked above", "accepted quickly", "ignored"],
            ["The company phased out the old system during the summer.", "phased out", "stopped using gradually", "fixed completely", "announced loudly", "sold cheaply"],
            ["The report points out that costs rose in March.", "points out", "mentions clearly", "draws a picture", "stands near", "hides"],
            ["The office set aside two rooms for interviews.", "set aside", "reserved", "threw away", "cleaned badly", "counted twice"],
            ["The plan fell through when the supplier cancelled.", "fell through", "failed to happen", "became stronger", "arrived early", "became cheaper"]
          ];
          const set = pick(examples, i);
          return item(`What does "${set[1]}" mean in this sentence? ${set[0]}`, set.slice(2), set[2]);
        }
      },
      {
        code: "v-main-point",
        category: "Vocabulary",
        subcategory: "Academic vocabulary",
        difficulty: 5.7,
        make: (i) => {
          const examples = [
            ["The survey was useful, but only twenty students answered it.", "The survey may help, but the number of answers was small.", "The survey proves every student agrees.", "The survey is useless because students answered.", "The survey was about twenty different schools."],
            ["The new schedule reduced late arrivals, but some evening students still had problems.", "The schedule helped overall, but not for everyone.", "The schedule failed completely for every student.", "Evening students never arrive late now.", "Late arrivals were not measured."],
            ["The price is lower than before, although delivery now takes longer.", "The product costs less, but customers wait longer.", "The product costs more and arrives faster.", "Delivery is free for all customers.", "The price and delivery time did not change."],
            ["The app is easy to use, but it needs clearer instructions for new users.", "The app works well, but beginners need more guidance.", "The app is too hard for all users.", "The instructions are perfect for new users.", "No one can use the app."],
            ["The class improved speaking scores, though writing scores stayed the same.", "Speaking improved, but writing did not.", "Writing improved more than speaking.", "Both speaking and writing became worse.", "The class did not measure speaking."],
            ["The office answered calls faster after hiring staff, but email replies stayed slow.", "Phone service improved, but email service did not.", "Email replies became faster than calls.", "Hiring staff made every service worse.", "The office stopped answering calls."],
            ["The training helped new workers, but experienced workers learned little from it.", "The training was useful mainly for new workers.", "Experienced workers learned the most.", "No worker found the training useful.", "The training was only for managers."],
            ["The policy saved money, but it also made the process more difficult.", "The policy lowered costs but added difficulty.", "The policy cost more and became easier.", "The process did not change.", "The policy had no effect on money."]
          ];
          const set = pick(examples, i);
          return item(`Which sentence best states the main point? ${set[0]}`, set.slice(1), set[1]);
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
          return item(`What does "${set[1]}" mean in this sentence? ${set[0]}`, set.slice(2), set[2]);
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
          const frames = {
            "make a decision": "The manager must ___ a decision before Friday.",
            "meet a deadline": "The team needs to ___ a deadline before Friday.",
            "give a presentation": "The speaker will ___ a presentation on Friday.",
            "reach an agreement": "The two offices hope to ___ an agreement before Friday.",
            "raise a concern": "A student may ___ a concern during the meeting.",
            "take responsibility": "Each worker should ___ responsibility for their task.",
            "submit an application": "Applicants must ___ an application before Friday.",
            "solve a problem": "The team will ___ a problem before Friday.",
            "follow instructions": "Students should ___ instructions during the test.",
            "send a message": "Please ___ a message before Friday.",
            "book an appointment": "Patients can ___ an appointment online.",
            "set a goal": "Each student should ___ a goal for the week.",
            "share information": "The teacher will ___ information before Friday.",
            "prepare a report": "The analyst will ___ a report before Friday."
          };
          const focusKey = `words-together:${set[0]} ${set[1]}`;
          return item(`Choose the word that sounds natural: ${frames[`${set[0]} ${set[1]}`]}`, [set[0], set[2], set[3], set[4]], set[0], focusKey);
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
          return item(`What does "${set[1]}" mean in this sentence? ${set[0]}`, set.slice(2), set[2]);
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
        ["I found my keys under ___ old chair.", ["an", "a", "many", "(nothing)"], "an"],
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
      ],
      verbPatterns: [
        ["The teacher encouraged students ___ every day.", ["to practice", "practicing", "practice", "to practicing"], "to practice"],
        ["Lena finished ___ the report before dinner.", ["writing", "to write", "write", "to writing"], "writing"],
        ["The guide offered ___ us find the station.", ["to help", "helping", "help", "to helping"], "to help"],
        ["Carlos kept ___ notes during the lecture.", ["taking", "to take", "take", "to taking"], "taking"],
        ["The office promised ___ the forms by Monday.", ["to send", "sending", "send", "to sending"], "to send"],
        ["The students stopped ___ when the test began.", ["talking", "to talk", "talk", "to talking"], "talking"],
        ["Aiko learned ___ the new software quickly.", ["to use", "using", "use", "to using"], "to use"],
        ["The class discussed ___ the schedule.", ["changing", "to change", "change", "to changing"], "changing"]
      ],
      questions: [
        ["Choose the correct question.", ["Why did the manager cancel the meeting?", "Why the manager cancelled the meeting?", "Why did cancelled the manager the meeting?", "Why was the manager cancel the meeting?"], "Why did the manager cancel the meeting?"],
        ["Which question is correct?", ["How often do you check your email?", "How often you check your email?", "How often are you check your email?", "How often do check you your email?"], "How often do you check your email?"],
        ["Choose the correct question.", ["What time does the library open?", "What time the library opens?", "What time does open the library?", "What time is the library open it?"], "What time does the library open?"],
        ["Which question is correct?", ["Where should we put the extra chairs?", "Where we should put the extra chairs?", "Where should put we the extra chairs?", "Where do we should put the extra chairs?"], "Where should we put the extra chairs?"],
        ["Choose the correct question.", ["Have you submitted the form yet?", "Have submitted you the form yet?", "Did you submitted the form yet?", "Are you submit the form yet?"], "Have you submitted the form yet?"],
        ["Which question is correct?", ["Who will lead the discussion?", "Who the discussion will lead?", "Who will leads the discussion?", "Who does will lead the discussion?"], "Who will lead the discussion?"],
        ["Choose the correct question.", ["How much time do we have?", "How much time we have?", "How much time are we have?", "How much do we have time?"], "How much time do we have?"],
        ["Which question is correct?", ["Which answer did you choose?", "Which answer you chose?", "Which did you chose answer?", "Which answer were you choose?"], "Which answer did you choose?"]
      ],
      pronouns: [
        ["The old schedule was confusing, so the office replaced ___.", ["it", "them", "they", "her"], "it"],
        ["The students finished the worksheets and handed ___ in.", ["them", "it", "they", "she"], "them"],
        ["The teacher spoke to Carlos and asked ___ to read aloud.", ["him", "he", "they", "it"], "him"],
        ["The course has many lessons, and ___ are all online.", ["they", "it", "them", "he"], "they"],
        ["Mina emailed the office because ___ needed a receipt.", ["she", "her", "they", "it"], "she"],
        ["The files are private, so please do not share ___.", ["them", "it", "they", "he"], "them"],
        ["The notice is important; please read ___ carefully.", ["it", "them", "they", "her"], "it"],
        ["The children brought umbrellas because ___ expected rain.", ["they", "them", "it", "he"], "they"]
      ],
      amountWords: [
        ["Only ___ people came to the early meeting.", ["a few", "a little", "much", "any"], "a few"],
        ["We need ___ more time to finish the project.", ["a little", "a few", "many", "several"], "a little"],
        ["___ participant received a name card.", ["Each", "Many", "Much", "Few"], "Each"],
        ["The room has ___ chairs for all visitors.", ["enough", "much", "little", "any"], "enough"],
        ["There are ___ mistakes in this paragraph, so please check it.", ["several", "much", "a little", "every"], "several"],
        ["The office has ___ paper left, so we can print the forms.", ["some", "many", "few", "several"], "some"],
        ["___ of the two answers is correct.", ["Neither", "All", "Many", "Several"], "Neither"],
        ["We invited ten people, and ___ of them replied.", ["most", "much", "each", "any"], "most"]
      ],
      describingForms: [
        ["The speaker answered the question ___.", ["quickly", "quick", "quickness", "quicker"], "quickly"],
        ["The answer was ___ enough for everyone to understand.", ["simple", "simply", "simplicity", "simpler than"], "simple"],
        ["The student looked ___ after the long exam.", ["tired", "tiredly", "tiringly", "tire"], "tired"],
        ["The teacher spoke ___ because the room was noisy.", ["loudly", "loud", "loudness", "louder than"], "loudly"],
        ["The new instructions are ___ helpful.", ["especially", "especial", "special", "specialness"], "especially"],
        ["The team worked ___ to meet the deadline.", ["hard", "hardly", "hardness", "harder than"], "hard"],
        ["The bus arrived ___, so we missed the first activity.", ["late", "lately", "lateness", "later than"], "late"],
        ["The worksheet was ___ difficult for beginners.", ["too", "to", "very much", "many"], "too"]
      ],
      sentenceBoundaries: [
        ["Choose the complete sentence.", ["The office closed early because the storm was strong.", "The office closed early because.", "Because the storm was strong the office.", "The storm strong, office closed."], "The office closed early because the storm was strong."],
        ["Which sentence is complete?", ["When the class ended, the students left quietly.", "When the class ended.", "The students left quietly when.", "When ended class, left quietly."], "When the class ended, the students left quietly."],
        ["Choose the complete sentence.", ["The report was short, but it answered the question.", "The report was short but.", "But it answered the question the report.", "Short report, but answered."], "The report was short, but it answered the question."],
        ["Which sentence is complete?", ["If the office calls, please write down the message.", "If the office calls.", "Please write down if office.", "The office calls if the message."], "If the office calls, please write down the message."],
        ["Choose the complete sentence.", ["The form was missing, so the clerk printed another copy.", "The form was missing so.", "So the clerk printed.", "Missing form, another copy clerk."], "The form was missing, so the clerk printed another copy."],
        ["Which sentence is complete?", ["Although the test was hard, many students passed.", "Although the test was hard.", "Many students passed although.", "Although hard test, passed students."], "Although the test was hard, many students passed."],
        ["Choose the complete sentence.", ["The email arrived after the meeting had ended.", "After the meeting had ended.", "The email after meeting.", "Had ended the meeting email arrived."], "The email arrived after the meeting had ended."],
        ["Which sentence is complete?", ["The teacher gave examples, and the class understood the rule.", "The teacher gave examples and.", "And the class understood.", "Examples teacher gave understood rule."], "The teacher gave examples, and the class understood the rule."]
      ],
      formalRequirements: [
        ["The contract requires that each page ___ signed.", ["be", "is", "was", "being"], "be"],
        ["The principal requested that the teacher ___ the scores today.", ["submit", "submits", "submitted", "submitting"], "submit"],
        ["The rule requires that every visitor ___ an ID card.", ["show", "shows", "showed", "showing"], "show"],
        ["The committee recommended that the policy ___ revised.", ["be", "is", "was", "being"], "be"],
        ["The judge insisted that the document ___ available to both sides.", ["be", "is", "was", "being"], "be"],
        ["The office requests that each applicant ___ a phone number.", ["provide", "provides", "provided", "providing"], "provide"],
        ["The notice requires that all bags ___ checked at the entrance.", ["be", "are", "were", "being"], "be"],
        ["The director suggested that the team ___ a clearer chart.", ["prepare", "prepares", "prepared", "preparing"], "prepare"]
      ],
      matchingParts: [
        ["Choose the sentence with matching parts.", ["The course is useful, practical, and affordable.", "The course is useful, practice, and affordability.", "The course is usefully, practical, and affordable.", "The course is useful, practically, and afford."], "The course is useful, practical, and affordable."],
        ["Which sentence has matching parts?", ["The plan saves time, reduces errors, and improves service.", "The plan saves time, reducing errors, and service improvement.", "The plan saving time, reduces errors, and improves service.", "The plan saves time, errors are reduced, and improves service."], "The plan saves time, reduces errors, and improves service."],
        ["Choose the sentence with matching parts.", ["The teacher asked us to read, summarize, and discuss the article.", "The teacher asked us to read, summary, and discussing the article.", "The teacher asked us reading, summarize, and discuss the article.", "The teacher asked us to read, to summary, and discussion."], "The teacher asked us to read, summarize, and discuss the article."],
        ["Which sentence has matching parts?", ["The job requires patience, accuracy, and good communication.", "The job requires patience, accurate, and communicating well.", "The job requires patiently, accuracy, and good communication.", "The job requires patience, accuracy, and communicate well."], "The job requires patience, accuracy, and good communication."],
        ["Choose the sentence with matching parts.", ["The report is clear, concise, and well organized.", "The report is clear, concision, and organizing well.", "The report is clearly, concise, and well organized.", "The report is clear, concise, and organization."], "The report is clear, concise, and well organized."],
        ["Which sentence has matching parts?", ["The app helps users check levels, review mistakes, and plan practice.", "The app helps users check levels, mistakes reviewing, and practice plans.", "The app helps users checking levels, review mistakes, and plan practice.", "The app helps users levels check, mistakes review, and planning practice."], "The app helps users check levels, review mistakes, and plan practice."],
        ["Choose the sentence with matching parts.", ["Good instructions are short, clear, and easy to follow.", "Good instructions are short, clarity, and easy to follow.", "Good instructions are shortly, clear, and following easily.", "Good instructions are short, clear, and easiness."], "Good instructions are short, clear, and easy to follow."],
        ["Which sentence has matching parts?", ["The team needs to test the page, fix the errors, and publish the update.", "The team needs to test the page, fixing errors, and the update published.", "The team needs testing the page, fix the errors, and publish update.", "The team needs to test, error fixing, and publishing the update."], "The team needs to test the page, fix the errors, and publish the update."]
      ],
      emphasisPatterns: [
        ["Choose the sentence that gives clear emphasis.", ["It was the schedule that caused the delay.", "It was the schedule who caused the delay.", "The schedule it was caused the delay.", "It caused the schedule that delay."], "It was the schedule that caused the delay."],
        ["Which sentence gives clear emphasis?", ["What the class needs is more listening practice.", "What the class needs are more listening practice.", "The class what needs is more listening practice.", "What needs the class is more listening practice."], "What the class needs is more listening practice."],
        ["Choose the sentence that gives clear emphasis.", ["It was Rina who noticed the error first.", "It was Rina which noticed the error first.", "Rina was it who noticed first error.", "It noticed Rina who the error first."], "It was Rina who noticed the error first."],
        ["Which sentence gives clear emphasis?", ["What matters here is the final deadline.", "What matter here is the final deadline.", "What here matters are the final deadline.", "The final deadline what matters here."], "What matters here is the final deadline."],
        ["Choose the sentence that gives clear emphasis.", ["Only after the payment arrived did the office send the receipt.", "Only after the payment arrived the office sent the receipt.", "Only after arrived the payment did send the office receipt.", "Only after payment did arrived the office send receipt."], "Only after the payment arrived did the office send the receipt."],
        ["Which sentence gives clear emphasis?", ["Not until Friday did the manager approve the plan.", "Not until Friday the manager approved the plan.", "Not until Friday did approved the manager the plan.", "Not until approved Friday the manager plan."], "Not until Friday did the manager approve the plan."],
        ["Choose the sentence that gives clear emphasis.", ["Rarely do students finish the task so quickly.", "Rarely students finish the task so quickly.", "Rarely do finish students the task so quickly.", "Rarely finished students do the task quickly."], "Rarely do students finish the task so quickly."],
        ["Which sentence gives clear emphasis?", ["What surprised everyone was the low cost.", "What surprised everyone were the low cost.", "Everyone what surprised was the low cost.", "What was surprised everyone was the low cost."], "What surprised everyone was the low cost."]
      ],
      schoolTerms: [
        ["What does \"requirement\" mean in this sentence? A passport is a requirement for this trip.", ["something that is necessary", "something that is optional", "a type of payment", "a short holiday"], "something that is necessary"],
        ["What does \"evidence\" mean in this sentence? The chart gives evidence for the claim.", ["information that supports an idea", "a personal dislike", "a future plan", "a written apology"], "information that supports an idea"],
        ["What does \"factor\" mean in this sentence? Cost is one factor in the decision.", ["one thing that affects a result", "a person who signs forms", "a place to study", "a wrong answer"], "one thing that affects a result"],
        ["What does \"outcome\" mean in this sentence? The outcome of the meeting was positive.", ["the result", "the location", "the invitation", "the question"], "the result"],
        ["What does \"source\" mean in this sentence? Please include the source of this information.", ["where the information came from", "when the class begins", "how much money is needed", "who will clean the room"], "where the information came from"],
        ["What does \"accurate\" mean in this sentence? The final number must be accurate.", ["correct", "early", "private", "heavy"], "correct"],
        ["What does \"relevant\" mean in this sentence? Please include only relevant details.", ["closely connected to the topic", "very expensive", "easy to pronounce", "written in pencil"], "closely connected to the topic"],
        ["What does \"complex\" mean in this sentence? The process is complex.", ["having many parts", "very cheap", "not allowed", "full of light"], "having many parts"]
      ],
      preciseActions: [
        ["The report ___ the main reason for the delay.", ["explains", "borrows", "washes", "decorates"], "explains"],
        ["The new software ___ the number of typing errors.", ["reduces", "invites", "repairs", "borrows"], "reduces"],
        ["The teacher ___ the answer with a simple example.", ["demonstrated", "cancelled", "borrowed", "refunded"], "demonstrated"],
        ["The manager ___ the problem before choosing a solution.", ["analyzed", "decorated", "returned", "rented"], "analyzed"],
        ["The form ___ a signature at the bottom.", ["requires", "hides", "borrows", "celebrates"], "requires"],
        ["The office ___ all applicants by email.", ["contacted", "measured", "damaged", "translated"], "contacted"],
        ["The data ___ that attendance improved.", ["suggest", "borrow", "decorate", "interrupt"], "suggest"],
        ["The teacher ___ the instructions to make them easier.", ["simplified", "borrowed", "escaped", "rented"], "simplified"]
      ],
      formalEmail: [
        ["Which sentence is best for a formal email?", ["Thank you for your prompt response.", "Thanks for answering fast.", "Cool, you answered quickly.", "Nice, you got back to me."], "Thank you for your prompt response."],
        ["Which sentence is best for a formal email?", ["Please find the updated schedule attached.", "Here is the fixed schedule thing.", "I stuck the new schedule here.", "The schedule is with this email, okay."], "Please find the updated schedule attached."],
        ["Which sentence is best for a formal email?", ["I would be grateful for any additional information.", "Give me more details if you have them.", "More info would be nice.", "Send extra stuff if possible."], "I would be grateful for any additional information."],
        ["Which sentence is best for a formal email?", ["We look forward to your reply.", "We want you to answer soon.", "Please write back when you can.", "Hope you message us."], "We look forward to your reply."],
        ["Which sentence is best for a formal email?", ["The issue has now been resolved.", "The problem is fixed now.", "We fixed the thing.", "That trouble is done."], "The issue has now been resolved."],
        ["Which sentence is best for a formal email?", ["Please accept our apologies for the delay.", "Sorry we were late.", "Sorry for taking so long.", "We are sorry about the slow reply."], "Please accept our apologies for the delay."],
        ["Which sentence is best for a formal email?", ["Further details will be provided next week.", "More details come next week.", "We will tell you more stuff next week.", "Next week you get more."], "Further details will be provided next week."],
        ["Which sentence is best for a formal email?", ["Your request has been approved.", "Your request is okay.", "We said yes to your request.", "Your request got a yes."], "Your request has been approved."]
      ],
      higherMeanings: [
        ["What does \"feasible\" mean in this sentence? The plan is feasible if we hire one more worker.", ["possible to do", "too expensive to discuss", "already finished", "not connected"], "possible to do"],
        ["What does \"temporary\" mean in this sentence? This is a temporary rule for the summer.", ["lasting for a short time", "required by law", "easy to measure", "very popular"], "lasting for a short time"],
        ["What does \"priority\" mean in this sentence? Safety is our top priority.", ["most important concern", "oldest problem", "written answer", "private opinion"], "most important concern"],
        ["What does \"consistent\" mean in this sentence? Her attendance has been consistent.", ["steady and regular", "late and careless", "short and simple", "private and hidden"], "steady and regular"],
        ["What does \"approach\" mean in this sentence? We need a new approach to this problem.", ["way of dealing with something", "place near a door", "written signature", "late payment"], "way of dealing with something"],
        ["What does \"substantial\" mean in this sentence? The change made a substantial difference.", ["large or important", "hard to see", "not allowed", "written in advance"], "large or important"],
        ["What does \"retain\" mean in this sentence? The company wants to retain experienced workers.", ["keep", "train for the first time", "pay late", "ask to leave"], "keep"],
        ["What does \"briefly\" mean in this sentence? Please explain the issue briefly.", ["in a short way", "with great anger", "at a later time", "with no reason"], "in a short way"]
      ],
      moreWordFamilies: [
        ["The teacher gave a clear ___ of the new rule.", ["explanation", "explain", "explained", "explaining"], "explanation"],
        ["The ___ of the office will begin next month.", ["renovation", "renovate", "renovated", "renovating"], "renovation"],
        ["The company made an important ___ yesterday.", ["announcement", "announce", "announced", "announcing"], "announcement"],
        ["The student gave a very ___ answer.", ["confident", "confidence", "confidently", "confide"], "confident"],
        ["The ___ of the new system took three weeks.", ["installation", "install", "installed", "installing"], "installation"],
        ["The instructions were written ___ for beginners.", ["clearly", "clear", "clarity", "clearer"], "clearly"],
        ["The team needs a more ___ solution.", ["practical", "practice", "practically", "practiced"], "practical"],
        ["The school asked for ___ before the trip.", ["permission", "permit", "permitted", "permitting"], "permission"]
      ],
      resultLinks: [
        ["The teacher spoke slowly; ___, the students understood the rule.", ["as a result", "however", "for example", "in contrast"], "as a result"],
        ["The price was high; ___, many customers waited for a sale.", ["therefore", "similarly", "for instance", "meanwhile"], "therefore"],
        ["The train arrived early; ___, we had time for coffee.", ["as a result", "however", "for example", "nevertheless"], "as a result"],
        ["The form was incomplete; ___, the office returned it.", ["therefore", "in contrast", "for example", "similarly"], "therefore"],
        ["The room was too small; ___, the meeting moved downstairs.", ["as a result", "for instance", "however", "likewise"], "as a result"],
        ["The website was easier to use; ___, more people completed the form.", ["therefore", "however", "meanwhile", "for example"], "therefore"],
        ["The office sent reminders; ___, fewer people missed appointments.", ["as a result", "in contrast", "for example", "otherwise"], "as a result"],
        ["The lesson included examples; ___, the homework was easier.", ["therefore", "however", "in contrast", "for instance"], "therefore"]
      ],
      phraseMeanings: [
        ["What does \"look into\" mean in this sentence? The manager will look into the complaint.", ["examine", "enter", "watch from outside", "forget"], "examine"],
        ["What does \"set up\" mean in this sentence? The assistant will set up the meeting room.", ["prepare", "cancel", "clean badly", "leave"], "prepare"],
        ["What does \"take over\" mean in this sentence? Lina will take over the project next week.", ["become responsible for", "throw away", "visit briefly", "pay for"], "become responsible for"],
        ["What does \"bring up\" mean in this sentence? Please bring up the safety issue at the meeting.", ["mention", "carry upstairs", "make louder", "hide"], "mention"],
        ["What does \"work out\" mean in this sentence? The plan worked out well.", ["succeeded", "exercised", "became more expensive", "left early"], "succeeded"],
        ["What does \"turn down\" mean in this sentence? The applicant turned down the job offer.", ["refused", "made quieter", "arrived late", "accepted"], "refused"],
        ["What does \"find out\" mean in this sentence? We need to find out why the file is missing.", ["discover", "lose", "pay", "translate"], "discover"],
        ["What does \"carry on\" mean in this sentence? The class will carry on after lunch.", ["continue", "hold something", "arrive", "complain"], "continue"]
      ],
      carefulClaims: [
        ["Which sentence is careful and not too strong?", ["The results suggest that practice may improve scores.", "Practice always guarantees perfect scores.", "The results prove every student will improve.", "No other factor matters."], "The results suggest that practice may improve scores."],
        ["Which sentence is careful and not too strong?", ["The survey indicates that cost may affect enrollment.", "Cost is the only reason people enroll.", "The survey proves all students think the same way.", "No student cares about anything except cost."], "The survey indicates that cost may affect enrollment."],
        ["Which sentence is careful and not too strong?", ["The data suggest that reminders may reduce missed appointments.", "Reminders always stop missed appointments.", "The data prove people never forget after reminders.", "No other problem affects attendance."], "The data suggest that reminders may reduce missed appointments."],
        ["Which sentence is careful and not too strong?", ["The chart indicates that demand may increase next month.", "Demand will certainly increase forever.", "The chart proves every customer will buy more.", "Demand cannot decrease."], "The chart indicates that demand may increase next month."],
        ["Which sentence is careful and not too strong?", ["The report suggests that clearer forms may reduce errors.", "Clearer forms remove all errors every time.", "The report proves no one will ever make a mistake.", "Errors happen only because forms are unclear."], "The report suggests that clearer forms may reduce errors."],
        ["Which sentence is careful and not too strong?", ["The pattern suggests that smaller classes may help participation.", "Small classes always make every student participate.", "The pattern proves class size is the only factor.", "Participation cannot improve in large classes."], "The pattern suggests that smaller classes may help participation."],
        ["Which sentence is careful and not too strong?", ["The responses indicate that location may influence attendance.", "Location completely controls attendance.", "The responses prove everyone chooses by location only.", "No other issue affects attendance."], "The responses indicate that location may influence attendance."],
        ["Which sentence is careful and not too strong?", ["The evidence suggests that training may improve customer service.", "Training always creates perfect customer service.", "The evidence proves all workers improve equally.", "No worker needs anything except training."], "The evidence suggests that training may improve customer service."]
      ]
    };
    
    const supplementalBlueprints = [
      { code: "s-comparisons", category: "Grammar", subcategory: "Comparatives", difficultyOffset: -0.08, sets: supplementalQuestionSets.comparisons },
      { code: "s-feelings", category: "Vocabulary", subcategory: "Word forms", difficultyOffset: -0.12, sets: supplementalQuestionSets.feelings },
      { code: "s-verb-forms", category: "Grammar", subcategory: "Verb tense", difficultyOffset: -0.04, sets: supplementalQuestionSets.verbForms },
      { code: "s-prepositions", category: "Grammar", subcategory: "Prepositions", difficultyOffset: -0.02, sets: supplementalQuestionSets.prepositions },
      { code: "s-nouns", category: "Grammar", subcategory: "Count and noncount nouns", difficultyOffset: -0.1, sets: supplementalQuestionSets.articlesAndNouns },
      { code: "s-infinitives", category: "Grammar", subcategory: "Gerunds and infinitives", difficultyOffset: 0.08, sets: supplementalQuestionSets.infinitivesAndGerunds },
      { code: "s-word-forms", category: "Vocabulary", subcategory: "Word forms", difficultyOffset: 0.03, sets: supplementalQuestionSets.wordForms },
      { code: "s-workplace", category: "Vocabulary", subcategory: "Workplace vocabulary", difficultyOffset: 0.12, sets: supplementalQuestionSets.workplace },
      { code: "s-phrases", category: "Vocabulary", subcategory: "Phrasal verbs", difficultyOffset: 0.06, sets: supplementalQuestionSets.commonPhrases },
      { code: "s-links", category: "Vocabulary", subcategory: "Transitions", difficultyOffset: 0.14, sets: supplementalQuestionSets.linksAndClauses },
      { code: "s-correct-sentence", category: "Grammar", subcategory: "Advanced sentence structure", difficultyOffset: 0.18, sets: supplementalQuestionSets.correctSentences },
      { code: "s-verb-patterns", category: "Grammar", subcategory: "Gerunds and infinitives", difficultyOffset: 0.16, sets: supplementalQuestionSets.verbPatterns },
      { code: "s-questions", category: "Grammar", subcategory: "Question forms", difficultyOffset: 0.08, sets: supplementalQuestionSets.questions },
      { code: "s-pronouns", category: "Grammar", subcategory: "Pronouns and reference", difficultyOffset: 0.04, sets: supplementalQuestionSets.pronouns },
      { code: "s-amount-words", category: "Grammar", subcategory: "Determiners and quantifiers", difficultyOffset: 0.06, sets: supplementalQuestionSets.amountWords },
      { code: "s-describing-forms", category: "Grammar", subcategory: "Adjective and adverb forms", difficultyOffset: 0.12, sets: supplementalQuestionSets.describingForms },
      { code: "s-sentence-boundaries", category: "Grammar", subcategory: "Sentence boundaries", difficultyOffset: 0.2, sets: supplementalQuestionSets.sentenceBoundaries },
      { code: "s-formal-requirements", category: "Grammar", subcategory: "Subjunctive and unreal forms", difficultyOffset: 0.28, sets: supplementalQuestionSets.formalRequirements },
      { code: "s-matching-parts", category: "Grammar", subcategory: "Parallel structure", difficultyOffset: 0.24, sets: supplementalQuestionSets.matchingParts },
      { code: "s-emphasis", category: "Grammar", subcategory: "Inversion and emphasis", difficultyOffset: 0.34, sets: supplementalQuestionSets.emphasisPatterns },
      { code: "s-school-terms", category: "Vocabulary", subcategory: "Academic vocabulary", difficultyOffset: 0.12, sets: supplementalQuestionSets.schoolTerms },
      { code: "s-precise-actions", category: "Vocabulary", subcategory: "Nuance", difficultyOffset: 0.18, sets: supplementalQuestionSets.preciseActions },
      { code: "s-formal-email", category: "Vocabulary", subcategory: "Register", difficultyOffset: 0.24, sets: supplementalQuestionSets.formalEmail },
      { code: "s-higher-meanings", category: "Vocabulary", subcategory: "Meaning in context", difficultyOffset: 0.28, sets: supplementalQuestionSets.higherMeanings },
      { code: "s-more-word-families", category: "Vocabulary", subcategory: "Word forms", difficultyOffset: 0.18, sets: supplementalQuestionSets.moreWordFamilies },
      { code: "s-result-links", category: "Vocabulary", subcategory: "Transitions", difficultyOffset: 0.16, sets: supplementalQuestionSets.resultLinks },
      { code: "s-phrase-meanings", category: "Vocabulary", subcategory: "Phrasal verbs", difficultyOffset: 0.22, sets: supplementalQuestionSets.phraseMeanings },
      { code: "s-careful-claims", category: "Vocabulary", subcategory: "Hedging and precision", difficultyOffset: 0.32, sets: supplementalQuestionSets.carefulClaims }
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
      "s-correct-sentence": [1.35, 3.95],
      "s-verb-patterns": [2.15, 4.85],
      "s-questions": [1.85, 4.15],
      "s-pronouns": [1.65, 3.85],
      "s-amount-words": [1.6, 4.05],
      "s-describing-forms": [1.85, 4.25],
      "s-sentence-boundaries": [2.35, 5.05],
      "s-formal-requirements": [4.35, 6],
      "s-matching-parts": [3.55, 5.7],
      "s-emphasis": [4.45, 6],
      "s-school-terms": [2.05, 4.55],
      "s-precise-actions": [2.65, 5.05],
      "s-formal-email": [3.6, 5.8],
      "s-higher-meanings": [3.75, 6],
      "s-more-word-families": [2.5, 5.3],
      "s-result-links": [2.2, 4.8],
      "s-phrase-meanings": [3.25, 5.75],
      "s-careful-claims": [4.25, 6]
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
