import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const base = path.dirname(fileURLToPath(import.meta.url));
const audit = path.dirname(base);
const definitions = [
  ['home', 'Homepage', '06-homepage-recommendations.md', 3, '2026-09-05 · client correction 2026-09-07', [2,4,7]],
  ['collection', 'Collection', '07-collection-recommendations.md', 5, '2026-09-07 · client feedback incorporated', [1,3,9,10,8]],
  ['pdp', 'Product page', '08-pdp-recommendations.md', 5, '2026-09-05 · client feedback 2026-09-07', [1,6,8,10,11]],
  ['cart', 'Cart drawer', '09-cart-recommendations.md', 4, '2026-09-07 · client feedback incorporated', [5,2,1,3]],
];
const pages = definitions.map(([id,label,file,expected,date,order]) => {
  const md = fs.readFileSync(path.join(audit,file),'utf8');
  const tests = [...md.matchAll(/^### Test (\d+) — (.+)\n([\s\S]*?)(?=^#{2,3} |$(?![\s\S]))/gm)].map(m => {
    const number = Number(m[1]);
    const fields = {};
    for (const f of m[3].matchAll(/^\*\*([^\n*]+):\*\*\s*([\s\S]*?)(?=^\*\*[^\n*]+:\*\*|$(?![\s\S]))/gm)) {
      fields[f[1]] = f[2].trim();
    }
    for (const field of ['Observed opportunity','Hypothesis','Control','Primary metric','Guardrails','Priority']) {
      if (!fields[field]) throw new Error(`${id}-${number}: missing ${field}`);
    }
    if (!fields.Variant && !fields['Variant A']) throw new Error(`${id}-${number}: missing variant`);
    return {id:`${id}-${number}`,number,title:m[2],fields,body:m[3].trim(),rank:order.indexOf(number)+1};
  });
  if(tests.length!==expected) throw new Error(`${id}: expected ${expected}, got ${tests.length}`);
  if(new Set(tests.map(t=>t.number)).size!==tests.length || new Set(order).size!==tests.length || tests.some(t=>t.rank<1)) throw new Error(`${id}: invalid test IDs or launch order`);
  return {id,label,file,date,tests};
});
const json=JSON.stringify(pages).replace(/</g,'\\u003c');
const count=pages.reduce((sum,p)=>sum+p.tests.length,0);
const manifest=JSON.parse(fs.readFileSync(path.join(base,'assets.json'),'utf8'));
const license=fs.readFileSync(path.join(base,'assets','Poppins-OFL.txt'),'utf8');
const assets={};let fonts='/* Embedded Poppins font license\n'+license.replaceAll('*/','* /')+'\n*/\n';
for(const [key,asset] of Object.entries(manifest)){
  const data=fs.readFileSync(path.join(base,'assets',asset.file));
  const ext=path.extname(asset.file).slice(1);
  const mime=ext==='ttf'?'font/ttf':data.subarray(0,3).equals(Buffer.from([255,216,255]))?'image/jpeg':data.subarray(1,4).toString()==='PNG'?'image/png':data.subarray(8,12).toString()==='WEBP'?'image/webp':null;
  if(!mime)throw new Error('Unsupported asset signature: '+key);
  const uri=`data:${mime};base64,${data.toString('base64')}`;
  if(asset.weight)fonts+=`@font-face{font-family:Poppins;font-style:normal;font-weight:${asset.weight};font-display:swap;src:url(${uri}) format('truetype')}\n`;
  else assets[key]={src:uri,alt:asset.alt};
}
let html=fs.readFileSync(path.join(base,'viewer.html'),'utf8')
  .replace('/*AUDIT_DATA*/',`const PAGES = ${json};`)
  .replace('/*BRAND_ASSETS*/',`const ASSETS = ${JSON.stringify(assets).replace(/</g,'\\u003c')};`)
  .replace('/*HIFI_STYLES*/',fonts+fs.readFileSync(path.join(base,'hifi.css'),'utf8'))
  .replaceAll('__TEST_COUNT__',String(count));
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if(scripts.length!==1) throw new Error('Expected one application script');
new vm.Script(scripts[0][1]);
if(/\/\*(AUDIT_DATA|BRAND_ASSETS|HIFI_STYLES)\*\//.test(html)) throw new Error('Unfilled build marker');
const out=path.join(audit,'ab-testing-wireframes.html');
fs.writeFileSync(out,html);
console.log(`Built ${out}\n${pages.reduce((sum,p)=>sum+p.tests.length,0)} tests · ${Buffer.byteLength(html)} bytes · self-contained`);
