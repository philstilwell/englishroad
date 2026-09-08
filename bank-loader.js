// The catalogue is small; full question text is loaded only for selected groups.
(() => {
  const index = window.EnglishRoadBankIndex;
  if (!index) throw new Error('Question catalogue unavailable.');
  const bank = index.groups.flatMap(group => Array.from({length:group.count},(_,i) => ({
    id:`${group.code}-${group.start+i}`, blueprint:group.code, category:group.category,
    subcategory:group.subcategory, difficulty:group.difficulty,
    focusKey:`${group.code}-${group.start+i}`, _catalogue:true
  })));
  const byId = new Map(bank.map(q=>[q.id,q]));
  const groups = new Map(index.groups.map(g=>[g.code,g]));
  const pending = new Map();
  async function loadGroup(code) {
    if(pending.has(code)) return pending.get(code);
    const group=groups.get(code);
    const request=(async () => {
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),10000);
      try {
        const response=await fetch(group.file,{signal:controller.signal});
        if(!response.ok) throw new Error('Question download failed.');
        const buffer=await response.arrayBuffer();
        const digest=await crypto.subtle.digest('SHA-256',buffer);
        const hash=Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,'0')).join('');
        if(hash!==group.hash) throw new Error('Question file did not match this version.');
        const items=JSON.parse(new TextDecoder().decode(buffer));
        if(items.length!==group.count||items.some((q,i)=>q.id!==`${code}-${group.start+i}`||q.blueprint!==code||!q.options?.includes(q.answer))) throw new Error('Invalid question file.');
        items.forEach(q=>Object.assign(byId.get(q.id),q,{_catalogue:true}));
      } finally {clearTimeout(timeout);}
    })();
    pending.set(code,request);
    try {await request;} catch(error) {pending.delete(code);throw error;}
  }
  async function ensure(ids) {
    const questions=ids.map(id=>byId.get(id));
    if(questions.some(q=>!q)) throw new Error('Unknown question.');
    const queue=[...new Set(questions.filter(q=>!q.options).map(q=>q.blueprint))];
    let next=0;
    await Promise.all(Array.from({length:Math.min(4,queue.length)},async()=>{while(next<queue.length) await loadGroup(queue[next++]);}));
    return questions;
  }
  window.EnglishRoadBank=Object.freeze({bank,revision:index.revision,ensure});
})();
