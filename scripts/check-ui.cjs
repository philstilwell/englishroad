// Real shared storage logic exercised with two independent tab contexts.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('site-ui.js', 'utf8');
const entries = new Map();
const storage = {
  get length() {return entries.size;},
  key: index => [...entries.keys()][index] ?? null,
  getItem: key => entries.get(key) ?? null,
  setItem: (key, value) => entries.set(key, value),
  removeItem: key => entries.delete(key)
};
function tab(storageOverride = storage) {
  const status = {textContent: '', classList: {toggle() {}}};
  const context = vm.createContext({
    localStorage: storageOverride, sessionStorage: storage,
    window: {addEventListener() {}},
    document: {getElementById: () => status, addEventListener() {}}
  });
  vm.runInContext(source, context);
  return {store: context.window.EnglishRoadUI.sessionStore('attempt', () => true), status, ui: context.window.EnglishRoadUI};
}
const first = tab(), second = tab();
assert.equal(first.store.read(), null);
assert.equal(second.store.read(), null);
assert.equal(first.store.save({answer: 'first'}), true);
assert.equal(second.store.save({answer: 'second'}), false, 'A tab that originally saw empty storage must not overwrite a new attempt');
assert.equal(storage.getItem('attempt'), JSON.stringify({answer: 'first'}));
assert.equal(second.store.failed(), true);
assert.equal(second.store.remove({allowUnsaved: true}), false, 'Starting fresh must still protect another tab’s saved work');
assert.match(second.status.textContent, /another tab/);
assert.equal(first.store.save({answer: 'updated'}), true, 'The owning tab can continue saving');
const third = tab(); third.store.read();
storage.removeItem('attempt');
assert.equal(third.store.save({answer: 'resurrected'}), false, 'Deleted work must not silently return from another tab');
assert.equal(first.store.remove(), false, 'A stale tab cannot delete another tab’s work');
first.store.read();
assert.equal(first.store.remove(), true);
assert.equal(first.store.save({answer: 'fresh'}), true, 'Explicitly starting again permits a fresh save');
const blocked = tab({getItem() {throw new Error('blocked');}});
assert.equal(blocked.store.read(), null);
assert.equal(blocked.store.save({answer: 'unsaved'}), false);
assert.equal(blocked.store.failed(), true);
assert.match(blocked.status.textContent, /not being saved/);
console.log('Saved-work replacement and cross-tab protection checks passed.');

assert.equal(blocked.store.remove({allowUnsaved: true}), true, 'Unavailable storage must still allow practice in memory');

storage.setItem('englishroad-practice-session-v1', 'practice');
storage.setItem('englishroad-level-check-session-v1', 'check');
storage.setItem('another-site-setting', 'keep');
assert.equal(first.ui.removeEnglishRoadStorage(), true);
assert.equal(storage.getItem('englishroad-practice-session-v1'), null);
assert.equal(storage.getItem('englishroad-level-check-session-v1'), null);
assert.equal(storage.getItem('another-site-setting'), 'keep', 'Deletion must remain scoped to English Road');
console.log('Browser-data deletion scope check passed.');
