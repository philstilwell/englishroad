# Audit in progress

The 4,200-item bank has been exported as 35 topic files under `editorial/items/`. Each file contains the exact sentences, options, keys, and feedback presented by the existing engine, divided into six groups of 20.

An item is not considered reviewed because its wording is unique or because a script accepts its structure. The item-level `audit` record must explain its learning point, level demand, original problems, pedagogical value, and distinction from other items.

Run `node scripts/compile-editorial-bank.cjs --progress` for the actual count. The compiler refuses to replace the active bank until all 4,200 records have complete editorial decisions. Pending records are not approved for quality by this audit. `--validate-reviewed` checks the completed records without publishing an incomplete bank.

The first topic pass covers all 120 Articles items, including sentence, alternatives, key, feedback, learning purpose, level rationale, and similarity notes. Twelve records received a further revision after checking ambiguity, distractor relevance, and level demand. The other 4,080 records remain pending individual review. These article revisions are in the editorial source only; they have not replaced the active site bank.

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

The references guide editorial judgment; they do not independently certify these new items or their practice-band assignments.
