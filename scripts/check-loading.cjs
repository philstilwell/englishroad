const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {webcrypto}=require('node:crypto');
const {gzipSync}=require('node:zlib');
(async()=>{
  let requests=0, active=0, maximum=0, fail=false, corrupt=false;
  const context=vm.createContext({window:{},crypto:webcrypto,AbortController,TextDecoder,Uint8Array,setTimeout,clearTimeout,
    fetch:async file=>{
      requests++;active++;maximum=Math.max(maximum,active);
      await new Promise(resolve=>setImmediate(resolve));active--;
      if(fail) throw new Error('Network unavailable');
      const body=corrupt?Buffer.from('[]'):fs.readFileSync(file);
      return {ok:true,arrayBuffer:async()=>body.buffer.slice(body.byteOffset,body.byteOffset+body.byteLength)};
    }});
  for(const file of ['bank-index.js','bank-loader.js','question-engine.js','learning-summary.js','study-tools.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context);
  const provider=context.window.EnglishRoadBank;
  assert.equal(provider.bank.length,4200);
  assert.equal(requests,0,'Opening the catalogue must not download question text');
  const first=provider.bank[0];
  fail=true;await assert.rejects(provider.ensure([first.id]));assert(!first.options);
  fail=false;corrupt=true;await assert.rejects(provider.ensure([first.id]));assert(!first.options,'Corrupt content must never be installed');
  corrupt=false;await Promise.all([provider.ensure([first.id]),provider.ensure([first.id])]);
  assert(first.options.includes(first.answer));assert.equal(requests,3,'Concurrent requests for one file should be shared');
  await provider.ensure([first.id]);assert.equal(requests,3,'Loaded groups should be reused');
  await assert.rejects(provider.ensure(['unknown']));
  await provider.ensure(provider.bank.map(q=>q.id));assert(maximum<=4,'Limit parallel downloads');
  const full=vm.createContext({window:{}});
  for(const file of ['coverage-bank-data.js','question-engine.js','learning-summary.js']) vm.runInContext(fs.readFileSync(file,'utf8'),full);
  const original=full.window.EnglishRoadQuestions.createQuestionBank();
  for(let i=0;i<original.length;i++) for(const key of Object.keys(original[i])) assert.equal(JSON.stringify(provider.bank[i][key]),JSON.stringify(original[i][key]),`${original[i].id}: ${key}`);
  assert.equal(provider.revision,full.window.EnglishRoadQuestions.bankRevision(original),'Existing content fingerprints must stay compatible');
  const fixture={...provider.bank[0],selected:provider.bank[0].options.find(o=>o!==provider.bank[0].answer),correct:false};
  const study=context.window.EnglishRoadStudy;
  for(const mode of ['coach','vocabulary','grammar','dialogue']) {
    const prompt=study.buildPrompt([fixture],'A1',mode);
    assert(prompt.includes(fixture.selected)&&prompt.includes(fixture.setupText)&&prompt.includes(fixture.explanation));
    assert.match(prompt,/wait/i);assert.match(prompt,/Start the lesson now/);
  }
  assert.equal(study.selectResponses([fixture],`item:${fixture.id}`).length,1);
  assert.equal(study.selectResponses([fixture],'missed').length,1);
  const indexBytes=gzipSync(fs.readFileSync('bank-index.js')).length;
  const firstBytes=gzipSync(fs.readFileSync(context.window.EnglishRoadBankIndex.groups[0].file)).length;
  const fullBytes=gzipSync(fs.readFileSync('coverage-bank-data.js')).length;
  assert(indexBytes+firstBytes<fullBytes*.05,'Initial catalogue plus first question group should be under 5% of the former bank download');
  console.log(JSON.stringify({loadingChecks:'passed',initialCatalogueGzip:indexBytes,firstGroupGzip:firstBytes,formerBankGzip:fullBytes,maxParallelDownloads:maximum}));
})().catch(error=>{console.error(error);process.exitCode=1;});
