# Completed AI-assisted item review

The original 4,200-item bank was exported as 35 topic files under `editorial/items/`. Those files now contain the individually reviewed sentences, options, keys, feedback, and editorial decisions, divided into six groups of 20. See [the full audit report](AUDIT-REPORT.md) for the coverage table and readable review copies.

An item is not considered reviewed because its wording is unique or because a script accepts its structure. The item-level `audit` record must explain its learning point, level demand, original problems, pedagogical value, and distinction from other items.

Run `node scripts/compile-editorial-bank.cjs --progress` for the actual count. The compiler refuses to replace the active bank until all 4,200 records have complete editorial decisions. Pending records are not approved for quality by this audit. `--validate-reviewed` checks the completed records without publishing an incomplete bank.

All 4,200 items have individual editorial decisions. Six parallel reviewers covered the 34 non-Articles topics; the coordinator reviewed Articles, and another reviewer subsequently checked all 120 Articles records and refined six. Coordinating checks returned additional items for stronger distractors, less leading instructions, simpler beginner wording, and more distinct learning contrasts. The compiled bank is accepted only when it matches the complete reviewed source.

## Completed parallel assignments

- Verb tense; Passive voice; Reported speech; Subjunctive and unreal forms; Question forms.
- Conditionals; Clauses and connectors; Relative clauses; Reduced clauses; Sentence boundaries; Parallel structure.
- Modals; Gerunds and infinitives; Inversion and emphasis; Adjective and adverb forms; Comparatives; Subject-verb agreement.
- Determiners and quantifiers; Count and noncount nouns; Pronouns and reference; Prepositions; Word forms.
- Register; Everyday vocabulary; Workplace vocabulary; Collocations; Academic vocabulary; Advanced sentence structure.
- Hedging and precision; Discourse function; Meaning in context; Nuance; Transitions; Phrasal verbs, plus a second review of Articles after the coordinator's revisions.

Each reviewer owns separate topic files. The coordinating pass handles shared-bank integration and checks for overlap between topics. No reviewer is permitted to approve an unread record or generate student-facing prose by substitution.

## Verification

- `node scripts/check-editorial-bank.cjs` overlays completed records on the real quiz engine, checks exact preservation of all display fields, and tests the incomplete-publication guard. It also checks that a 20-item quiz distributes correct answers equally across the four displayed positions.
- Add `--full-checks` to run the wider quiz regression suite against that in-memory preview without changing the active bank file.
- `node scripts/screen-reviewed-items.cjs` produces an advisory report for near-duplicate wording, repeated explanations, generic feedback, repeated stated learning points, and possible longest-answer cues. These are review leads, not automated certification.
- After all individual reviews finish, `node scripts/balance-editorial-options.cjs` reorders the existing choices so each written set has five correct answers in each position. It never authors prose or changes an answer or explanation. The compiler independently enforces this distribution; live quizzes also randomize balanced positions.
- `node scripts/check.cjs` exercises coverage, shared content, quiz selection, saved-attempt compatibility, and scoring behaviour. It does not substitute for a semantic review.
- The engine distinguishes structural failures from linguistic pattern warnings. For example, an indefinite article alongside `the` requires contextual review; it is not automatically an ambiguous item. Deliberately incorrect choices are not treated as accidental errors in the keyed sentence.

`initial-screening.json` records an automated screening result for every original active item. It found 4,080 items whose wrong-answer messages share a structure after quoted option/term strings are removed, 1,419 with a detected nonspecific correct-answer explanation, 29 that insert `(nothing)` into explanatory text, and 120 with grammar-only instructions on register or cautious-claim questions. Counts overlap. These are targeted screening categories, not a comprehensive count of linguistic defects.

## Confirmed problems in the original bank

- Tense choices sometimes permit both simple and continuous readings without enough context to select one.
- Article questions can reject grammatical definite or indefinite alternatives when context does not establish the intended reference.
- Feedback inserts the interface label `(nothing)` into completed sentences instead of omitting an article.
- Some higher-level items test elementary form choices inside academic wording, rather than advanced control of English.
- Whole groups repeat a sentence frame with different nouns or appended time/place phrases.
- Many wrong-answer messages do not identify the actual error. Some meaning/register items even give a grammar-only instruction when every choice is grammatical.
- Existing automated checks contain broad assumptions, such as treating any a/an item with the as an alternative as automatically ambiguous. Editorially constrained contexts need a more careful assessment.

## Limit of the review claim

This is an AI-assisted editorial review. It does not provide empirical item-difficulty calibration, independent human review, or evidence from learner trials. The public practice bands must continue to be described as editorial guidance.

## Language references checked

- [Cambridge: accommodation in British English](https://dictionary.cambridge.org/grammar/british-grammar/accommodation)
- [Cambridge: articles and countable interpretations of abstract nouns](https://dictionaryblog.cambridge.org/2017/12/13/how-to-use-articles-another-look-1/)
- [Cambridge: article use with meals and determiner constructions](https://dictionaryblog.cambridge.org/2018/01/03/how-to-use-articles-another-look-2/)
- [Cambridge: superlatives and optional the after a linking verb](https://dictionary.cambridge.org/grammar/british-grammar/comparison-adjectives-bigger-biggest-more-interesting-most-interesting)
- [British Council: indefinite articles, including formal a most](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/indefinite-article?page=0%2C1%3Fpage%3D0%2C1)
- [Cambridge: further, including an indefinite article with an additional monetary amount](https://dictionary.cambridge.org/dictionary/english/further)
- [Stanford Encyclopedia of Philosophy: hypothetical conditionals need not have false antecedents](https://plato.stanford.edu/entries/counterfactuals/)

The references guide editorial judgment; they do not independently certify these new items or their practice-band assignments.
