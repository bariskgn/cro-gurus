// Explicit public brand-asset downloads; the generated viewer makes no network requests.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const assets=JSON.parse(await fs.readFile(path.join(base,'assets.json'),'utf8'));
await fs.mkdir(path.join(base,'assets'),{recursive:true});
for(const [key,a] of Object.entries(assets)){
  const url=new URL(a.url);
  if(!['awesome-maps.com','cdn.shopify.com','fonts.gstatic.com'].includes(url.hostname))throw new Error('Unapproved asset host');
  if(path.basename(a.file)!==a.file)throw new Error('Invalid asset filename');
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  const mime=response.headers.get('content-type')||'';
  if(!response.ok||!(a.weight?/font|octet-stream/:/image/).test(mime))throw new Error(`${key}: ${response.status} ${mime}`);
  const data=Buffer.from(await response.arrayBuffer());
  if(data.length<100||data.length>8_000_000)throw new Error('Unexpected asset size: '+key);
  await fs.writeFile(path.join(base,'assets',a.file),data);
  console.log(`${key}: ${data.length} bytes · ${mime}`);
}
const license=await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt',{signal:AbortSignal.timeout(30000)});
if(!license.ok)throw new Error('Font license download failed');
const licenseText=await license.text();
if(!licenseText.includes('SIL OPEN FONT LICENSE'))throw new Error('Unexpected font license');
await fs.writeFile(path.join(base,'assets','Poppins-OFL.txt'),licenseText);
