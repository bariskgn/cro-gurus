import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base=path.dirname(fileURLToPath(import.meta.url));
const html=fs.readFileSync(path.join(base,'../ab-testing-wireframes.html'),'utf8');
const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate static IDs');
const handlers={};
const elements=new Map(ids.map(id=>[id,{id,innerHTML:'',textContent:'',className:'',disabled:false,hidden:false,scrollTop:0,setAttribute(){},focus(){},classList:{toggle(){}},addEventListener(name,fn){handlers[`${id}:${name}`]=fn;}}]));
const details={open:false};
const document={getElementById(id){if(id.startsWith('tab-'))return {focus(){}};assert.ok(elements.has(id),`Unknown element ${id}`);return elements.get(id);},querySelector(sel){assert.equal(sel,'.source-details');return details;},addEventListener(name,fn){handlers['document:'+name]=fn;},title:''};
const windowEvents={};
const env={document,window:{addEventListener(name,fn){windowEvents[name]=fn;}},location:{hash:''},requestAnimationFrame:fn=>fn(),console};
env.history={replaceState(_state,_title,hash){env.location.hash=hash;}};
vm.createContext(env);
vm.runInContext(code,env);
assert.match(elements.get('tabs').innerHTML,/Homepage/,'Initial page tabs did not load');
assert.ok(elements.get('ideas').innerHTML.length>100,'Initial idea list is empty');
assert.ok(elements.get('before').innerHTML.includes('<img '),'Initial comparison is empty');
const report=vm.runInContext(`(() => {
 let count=0; const uniqueAfter=new Set();
 for(const p of PAGES){
   if(p.tests.length!==SPEC[p.id].length) throw new Error('Missing spec for '+p.id);
   for(let i=0;i<p.tests.length;i++){
     navigate(p.id,i); readHash();
     if(location.hash!=='#'+p.tests[i].id || current().t.id!==p.tests[i].id) throw new Error('Stable ID navigation failure');
     if(current().s.number!==current().t.number) throw new Error('Wrong wireframe mapping');
     const a=$('before').innerHTML,b=$('after').innerHTML;
     if(a===b||a.length<100||b.length<100) throw new Error('Invalid comparison '+p.id+'-'+i);
     const visible=(a+b).replace(/data:image[^,]+,[A-Za-z0-9+/=]+/g,'embedded-image');
     if(/undefined|NaN/.test(visible)) throw new Error('Invalid output '+p.id+'-'+i);
     if(!a.includes('<img ')||!b.includes('<img '))throw new Error('Missing high-fidelity photography');
     if(/<div class="media [^"]*"><span>/.test(visible))throw new Error('Schematic image placeholder remains');
     if(!b.includes('class="changed"')) throw new Error('Missing change highlight');
     if(!$('hypothesis').innerHTML||!$('metric').innerHTML||!$('sourceBody').innerHTML) throw new Error('Missing brief');
     if(!$('sourceBody').innerHTML.includes(p.tests[i].title)) throw new Error('Wrong source');
     if($('next').disabled !== (i===p.tests.length-1)) throw new Error('Next button state');
     if($('prev').disabled !== (i===0)) throw new Error('Previous button state');
     uniqueAfter.add(b); count++;
   }
 }
 if(uniqueAfter.size!==count) throw new Error('Duplicate variants');
 if(count!==17) throw new Error('Expected 17 active ideas');
 const homepage=PAGES.find(p=>p.id==='home');
 if(homepage.tests.map(t=>t.number).join(',')!=='2,4,7') throw new Error('Rejected homepage idea still active');
 const [heroBefore,heroAfter]=SPEC.home.find(s=>s.number===4).draw();
 for(const view of [heroBefore,heroAfter]){
   if((view.match(/class="media hero"/g)||[]).length!==1 || view.includes('class="dots"')) throw new Error('Incorrect single-image hero baseline');
   if((view.match(/class="wf-btn /g)||[]).length!==1 || !view.includes('Discover our maps')) throw new Error('Hero CTA changed unexpectedly');
 }
 for(const copy of ['unforgettable memories','Discover your next adventure','Keep the memories close','Bring inspiration along']) if(!heroAfter.includes(copy)) throw new Error('Missing revised hero benefit');
 for(const rejected of [1,3,5,6,8,9,10]){
   location.hash='#home-'+rejected;readHash();
   if(current().t.number!==2 || location.hash!=='#home-2') throw new Error('Rejected-link fallback failure');
 }
 navigate('home',0);readHash();move(1);readHash();if(current().t.number!==4)throw new Error('Sparse next failure');
 move(1);readHash();if(current().t.number!==7)throw new Error('Sparse next failure');
 move(-1);readHash();if(current().t.number!==4)throw new Error('Sparse previous failure');
 const collection=PAGES.find(p=>p.id==='collection');
 if(collection.tests.map(t=>t.number).join(',')!=='1,3,8,9,10')throw new Error('Rejected collection idea still active');
 for(const rejected of [2,4,5,6,7]){
   location.hash='#collection-'+rejected;readHash();
   if(current().t.number!==1||location.hash!=='#collection-1')throw new Error('Rejected collection link fallback failure');
 }
 navigate('collection',0);readHash();move(1);readHash();if(current().t.number!==3)throw new Error('Sparse collection next failure');
 move(1);readHash();if(current().t.number!==8)throw new Error('Sparse collection next failure');
 move(-1);readHash();if(current().t.number!==3)throw new Error('Sparse collection previous failure');
 const priceSpec=SPEC.collection.find(s=>s.number===3),giftSpec=SPEC.collection.find(s=>s.number===9);
 for(const family of ['Poster','Towel','Bottle'])if(!priceSpec.draw()[1].includes(family)||!giftSpec.draw()[1].includes(family))throw new Error('Missing cross-catalog product family');
 if(!giftSpec.draw()[1].includes('Find your gift in 30 seconds'))throw new Error('Missing broad gift quiz');
 location.hash='#collection-10';readHash();
 const baseBefore=$('before').innerHTML,baseAfter=$('after').innerHTML;
 if(!baseAfter.includes('Build your bundle')||baseAfter.includes('Select for bundle'))throw new Error('Incorrect bundle entry state');
 handleBundleAction('toggle','poster');if(bundleDemo.selected.length)throw new Error('Selection before start');
 handleBundleAction('start');if(bundleDemo.selected.length||!$('after').innerHTML.includes('0 of 2 selected'))throw new Error('Bundle starts preselected');
 handleBundleAction('review');if(bundleDemo.review)throw new Error('Premature review');
 handleBundleAction('toggle','poster');
 if(!$('after').innerHTML.includes('1 of 2 selected')||bundleDemo.added)throw new Error('First selection failure');
 handleBundleAction('add');if(bundleDemo.added)throw new Error('Premature addition');
 handleBundleAction('toggle','towel');
 if(bundleDemo.selected.length!==2||!$('after').innerHTML.includes('2 of 2 selected'))throw new Error('Second selection failure');
 handleBundleAction('toggle','bottle');if(bundleDemo.selected.length!==2||bundleDemo.selected.includes('bottle'))throw new Error('Third product allowed');
 handleBundleAction('toggle','poster');handleBundleAction('toggle','bottle');
 if(bundleDemo.selected.join(',')!=='towel,bottle')throw new Error('Replacement failure');
 handleBundleAction('review');if(!bundleDemo.review||!$('after').innerHTML.includes('Add both to cart'))throw new Error('Missing review confirmation');
 handleBundleAction('edit');if(bundleDemo.review||bundleDemo.selected.length!==2)throw new Error('Edit loses selections');
 handleBundleAction('review');handleBundleAction('add');
 if(!bundleDemo.added||!$('after').innerHTML.includes('No real cart was changed'))throw new Error('Demo confirmation failure');
 handleBundleAction('add');if(bundleDemo.selected.length!==2)throw new Error('Repeated add failure');
 handleBundleAction('exit');if(bundleDemo.started||$('after').innerHTML!==baseAfter)throw new Error('Exit fails to restore browsing');
 if($('before').innerHTML!==baseBefore||location.hash!=='#collection-10')throw new Error('Demo changed control or page');
 handleBundleAction('start');handleBundleAction('toggle','poster');navigate('collection',0);readHash();
 if(bundleDemo.started||bundleDemo.selected.length)throw new Error('Demo state leaked to another idea');
 const pdp=PAGES.find(p=>p.id==='pdp');
 const [ctaBefore,ctaAfter]=SPEC.pdp.find(s=>s.number===11).draw();
 if(ctaAfter.replace(change('Selection-aware CTA',btn('Add Towel — $69.90')),btn('Add to Cart'))!==ctaBefore)throw new Error('P11 copy-only test has unrelated visual changes');
 if(!SPEC.pdp.find(s=>s.number===8).draw()[1].includes('official product gallery images shown as substitutes'))throw new Error('Unlabeled customer-media substitutes');
 if(pdp.tests.map(t=>t.number).join(',')!=='1,6,8,10,11')throw new Error('Rejected PDP idea still active');
 for(const rejected of [2,3,4,5,7,9,12]){
   location.hash='#pdp-'+rejected;readHash();
   if(current().t.number!==1||location.hash!=='#pdp-1')throw new Error('Rejected PDP link fallback failure');
 }
 const pilot=pdp.tests.find(t=>t.number===1),pilotSpec=SPEC.pdp.find(s=>s.number===1);
 for(const phrase of ['five best-selling','five three-bullet','15 bullets total','Shopify','all other PDPs stay unchanged'])if(!pilotSpec.note.includes(phrase))throw new Error('Missing visible P1 scope note: '+phrase);
 if(!pilot.fields.Applicability.includes('Only five')||!pilot.fields['Primary metric'].includes('five selected products only')||!pilot.body.includes('pending sales validation'))throw new Error('P1 source scope inconsistent');
 location.hash='#pdp-1';readHash();
 if(!$('specificNote').textContent.includes('15 bullets total'))throw new Error('P1 scope not shown');
 move(1);readHash();if(current().t.number!==6)throw new Error('Sparse PDP next failure');
 move(1);readHash();if(current().t.number!==8)throw new Error('Sparse PDP next failure');
 move(-1);readHash();if(current().t.number!==6)throw new Error('Sparse PDP previous failure');
 location.hash='#pdp-11';readHash();if(state.page!=='pdp'||state.index!==4)throw new Error('Deep link failure');
 const cart=PAGES.find(p=>p.id==='cart');
 if(cart.tests.map(t=>t.number).join(',')!=='1,2,3,5')throw new Error('Rejected cart idea still active');
 for(const rejected of [4,6,7,8]){
   location.hash='#cart-'+rejected;readHash();
   if(current().t.number!==5||location.hash!=='#cart-5')throw new Error('Rejected cart link fallback failure');
 }
 navigate('cart',2);readHash();move(1);readHash();
 if(current().t.number!==5||!$('next').disabled)throw new Error('Sparse cart next or boundary failure');
 move(-1);readHash();if(current().t.number!==3)throw new Error('Sparse cart previous failure');
 location.hash='#cart-999';readHash();if(current().t.rank!==1)throw new Error('Range handling failure');
 location.hash='#home-0';readHash();if(state.index!==0)throw new Error('Minimum handling failure');
 navigate('collection',3);readHash();if(state.page!=='collection'||state.index!==3)throw new Error('Navigation failure');
 return {tests:count,wireframeRenders:count*2,uniqueVariants:uniqueAfter.size,deepLinks:true,navigation:true,homepageIds:[2,4,7],collectionIds:[1,3,8,9,10],pdpIds:[1,6,8,10,11],cartIds:[1,2,3,5],p1FiveProductScope:true,singleImageHero:true,rejectedLinkFallbacks:true,bundleDemo:true};
})()`,env);
assert.ok(handlers['highlight:change'],'Highlight control not bound');
assert.ok(handlers['tabs:keydown'],'Keyboard tabs not bound');
handlers['next:click']();windowEvents.hashchange();
assert.match(elements.get('eyebrow').innerHTML,/Test 10/,'Next action');
handlers['prevBottom:click']();windowEvents.hashchange();
assert.match(elements.get('eyebrow').innerHTML,/Test 09/,'Previous action');
vm.runInContext("location.hash='#collection-10';readHash();",env);
const clickDemo=(action,product='',disabled=false)=>handlers['document:click']({target:{closest(selector){return selector==='[data-bundle-action]'?{disabled,dataset:{bundleAction:action,product}}:null;}}});
clickDemo('start');clickDemo('toggle','poster');clickDemo('toggle','bottle');clickDemo('review');clickDemo('add');
assert.match(elements.get('after').innerHTML,/No real cart was changed/,'Delegated demo click actions');
clickDemo('exit');clickDemo('start','',true);
assert.equal(vm.runInContext('bundleDemo.started',env),false,'Disabled demo actions ignored');
assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html),'External runtime dependency');
assert.ok(!/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(code),'Network-dependent viewer');
assert.ok(!/Experiment Atlas|CRO Audit|CRO audit/.test(html),'Old viewer naming remains');
assert.match(html,/>CG<\/div>/,'Missing CG monogram');
assert.match(html,/<h1>CRO Gurus<\/h1>/,'Missing CRO Gurus name');
assert.match(html,/Awesome Maps \/ A\/B testing ideas/,'Missing requested description');
assert.match(html,/compare no-highlights/,'Clean-design default missing');
const assets=vm.runInContext('ASSETS',env);
assert.equal(Object.keys(assets).length,17,'Unexpected brand-image count');
for(const [key,a] of Object.entries(assets)){
  assert.ok(a.alt?.length>3,`${key}: missing alternative text`);
  const [,mime,data]=a.src.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/)||[];
  assert.ok(mime&&data,`${key}: not a valid embedded image`);
  const bytes=Buffer.from(data,'base64');
  const actual=bytes.subarray(0,3).equals(Buffer.from([255,216,255]))?'image/jpeg':bytes.subarray(1,4).toString()==='PNG'?'image/png':bytes.subarray(8,12).toString()==='WEBP'?'image/webp':null;
  assert.equal(mime,actual,`${key}: image content type mismatch`);
}
for(const weight of [400,600,700])assert.ok(html.includes(`font-weight:${weight};font-display:swap;src:url(data:font/ttf;base64,`),`Missing offline Poppins ${weight}`);
assert.ok(html.includes('SIL OPEN FONT LICENSE'),'Embedded font license missing');
const refinements=vm.runInContext(`(() => {
 const views=(page,number)=>SPEC[page].find(s=>s.number===number).draw();
 const [h2Before,h2After]=views('home',2);
 if(h2Before.includes('hobby-option')||(h2After.match(/class="hobby-option"/g)||[]).length!==6)throw new Error('Homepage hobby buttons missing or leaked into control');
 for(const [label,key] of [['Dive','dive'],['Surf','waves'],['Travel','globe'],['Outdoors','mountain'],['Football','football'],['Gifts','gift']])if(!h2After.includes(label)||!hobbyShortcuts().includes(icon(key)))throw new Error('Missing hobby icon: '+key);
 const [c1Before,c1After]=views('collection',1);
 if(c1Before.includes('benefits-panel')||(c1After.match(/class="benefit-card"/g)||[]).length!==3)throw new Error('Benefit-card treatment is not isolated');
 for(const key of ['sand','wind','pack'])if(!towelBenefits(true).includes(icon(key)))throw new Error('Missing benefit icon');
 const [c3Before,c3After]=views('collection',3);
 for(const price of ['$54.90','$69.90','$69.95'])if(!c3After.includes(price)||c3Before.includes(price))throw new Error('Incorrect price treatment: '+price);
 for(const id of ['49830866485512','49830731219208','52286525047048'])if(!c3After.includes('data-variant-id="'+id+'"'))throw new Error('Missing exact price variant');
 if(c3After.includes('[poster price]')||c3After.includes('[towel price]')||c3After.includes('[bottle price]'))throw new Error('C3 still has price placeholders');
 const [c8Before,c8After]=views('collection',8);
 if(c8Before.includes('sort-ui')||(c8After.match(/class="sort-option(?: selected)?"/g)||[]).length!==4||!c8After.includes('Apply sort')||!c8After.includes('Reset'))throw new Error('Missing sort-panel design');
 if(sortControls().includes('>Price<'))throw new Error('Price sorting shown without a priced baseline');
 bundleDemo={started:false,selected:[],review:false,added:false};
 const [c10Before,c10After]=views('collection',10);
 if(c10Before.includes('bundle-start')||!c10After.includes('wf-btn demo-btn bundle-start'))throw new Error('Distinct bundle button missing or leaked into control');
 const [cart3Before,cart3After]=views('cart',3);
 for(const view of [cart3Before,cart3After])if(!view.includes(diveBottleItem())||!view.includes('<b>Subtotal</b><b>$69.95</b>'))throw new Error('Cart 03 item or subtotal mismatch');
 if(!cart3Before.includes('data-recommendation="bucketlist-map"')||!cart3After.includes('data-recommendation="dive-map"'))throw new Error('Cart 03 incorrect recommendation mapping');
 if(cart3After.replace(change('Same-interest towel pairing',interestUpsell(true)),interestUpsell(false))!==cart3Before)throw new Error('Cart 03 changes more than the recommendation');
 const [cart5Before,cart5After]=views('cart',5);
 if(cart5After.replace(change('Localized purchase reassurance',checkoutReassurance()),'')!==cart5Before.replace('<div class="cart-gap"></div>',''))throw new Error('Cart 05 unrelated control changes');
 const reassurance=checkoutReassurance();
 if(cart5Before.includes('reassurance-panel')||(reassurance.match(/class="reassurance-row"/g)||[]).length!==3)throw new Error('Cart reassurance treatment missing');
 for(const text of ['United States delivery example','5–7 business days','60-day returns on unused towels','original packaging','Return shipping is paid by you'])if(!reassurance.includes(text))throw new Error('Missing scoped reassurance: '+text);
 if(reassurance.includes('[')||reassurance.includes('30-day'))throw new Error('Outdated policy or placeholder remains');
 for(const key of ['truck','shield','returns'])if(!reassurance.includes(icon(key)))throw new Error('Missing reassurance icon');
 return {homepageIconButtons:6,collectionBenefitIcons:3,verifiedVariantPrices:3,sortOptionButtons:4,distinctBundleCTA:true,cartRecommendationIsolation:true,scopedCartReassurance:true};
})()`,env);
const styles=fs.readFileSync(path.join(base,'hifi.css'),'utf8');
assert.match(styles,/\.wf-btn\.bundle-start\{[^}]*background:#fdb813/,'Bundle button lost distinct color');
assert.match(styles,/\.hobby-option\{[^}]*min-height:98px/,'Hobby buttons not enlarged');
console.log(JSON.stringify(refinements,null,2));
// Reproduce the actual user entry point: the unbuilt template opened as a file.
const template=fs.readFileSync(path.join(base,'viewer.html'),'utf8');
const templateCode=[...template.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const testHashes=['',...vm.runInContext('PAGES.flatMap(p=>p.tests.map(t=>"#"+t.id))',env)];
let entryChecks=0;
for(const entry of ['file:///Users/baris/Documents/ChatGPT/Awesome%20Maps/audit/wireframe-src/viewer.html','http://127.0.0.1:53579/wireframe-src/viewer.html']){
 for(const hash of testHashes){
  for(const blocked of [false,true]){
   const sourceElements=new Map(ids.map(id=>[id,{hidden:true,textContent:'',href:'',addEventListener(){}}]));
   const classes=[];let destination;
   const query='?revision=hifi&preview=1';
   const sourceEnv={
    document:{getElementById:id=>sourceElements.get(id),addEventListener(){},body:{classList:{add:c=>classes.push(c)}}},
    window:{addEventListener(){}},
    location:{search:query,hash,replace(target){if(blocked)throw new Error('Navigation blocked');destination=new URL(target,entry).href;}}
   };
   vm.runInNewContext(templateCode,sourceEnv);
   const expected='../ab-testing-wireframes.html'+query+hash;
   assert.equal(sourceElements.get('sourceFallback').hidden,false,'Missing source-entry fallback');
   assert.equal(sourceElements.get('completeViewerLink').href,expected,'Fallback lost selected idea');
   assert.ok(classes.includes('source-template'),'Empty source interface remains visible');
   if(blocked)assert.match(sourceElements.get('fallbackStatus').textContent,/blocked automatic navigation/,'Missing blocked-navigation guidance');
   else assert.equal(destination,new URL(expected,entry).href,'Wrong complete-viewer destination');
   entryChecks++;
  }
 }
}
console.log(JSON.stringify(report,null,2));
assert.ok(!html.includes('__TEST_COUNT__'),'Unfilled test count');
assert.match(html,/17 active ideas/,'Incorrect displayed count');
console.log('Passed source mapping, all 34 high-fidelity comparison renders, distinct variants, stable IDs, rejected-link fallbacks, P1 scope, P11 copy-only isolation, bundle demo, navigation, image signatures/alt text, embedded fonts, renamed branding and offline dependency checks.');
console.log(`Passed initial-load checks and ${entryChecks} template-entry cases: file/HTTP, all active idea links, preserved query strings, and blocked-navigation fallback.`);
