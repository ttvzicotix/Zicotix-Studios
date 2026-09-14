/* Exports the exact shipped vector silhouette; never redistributes fonts. */
const fs = require('node:fs'); const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || '/usr/local/lib/node_modules/sharp-cli/node_modules/sharp');
const out = path.join(process.cwd(), 'public/brand'); fs.mkdirSync(out, {recursive:true});
const markPath='M8 10h48L36.5 31H50L56 54H8l19.5-21H14z';
const source=fs.readFileSync('public/art/z-mark.svg','utf8');
if(!source.includes(markPath)) throw Error('Approved logo path changed');
let art;
const rgbaSvg=(w,h,body)=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);
const mark=(x,y,size,color='#fbf8ff')=>`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 64 64"><path fill="${color}" d="${markPath}"/></svg>`;
const defs=`<defs><linearGradient id="fade"><stop stop-color="#060309" stop-opacity=".93"/><stop offset=".65" stop-color="#09040f" stop-opacity=".48"/><stop offset="1" stop-color="#10051a" stop-opacity=".2"/></linearGradient><radialGradient id="glow"><stop stop-color="#b523ff" stop-opacity=".25"/><stop offset="1" stop-color="#b523ff" stop-opacity="0"/></radialGradient></defs>`;
async function png(name,w,h,body){ await sharp(rgbaSvg(w,h,body)).png({compressionLevel:9}).toFile(path.join(out,name)); }
(async()=>{
 art='data:image/png;base64,'+(await sharp('public/art/about.webp').png().toBuffer()).toString('base64');
 await png('zicotix-logo-white-transparent.png',2048,2048,mark(0,0,2048));
 await png('zicotix-logo-purple-transparent.png',2048,2048,mark(0,0,2048,'#b523ff'));
 fs.copyFileSync('public/art/z-mark.svg',path.join(out,'zicotix-logo.svg'));
 await png('zicotix-profile-1024.png',1024,1024,`${defs}<rect width="1024" height="1024" fill="#050407"/><image href="${art}" x="-590" y="-30" width="2030" height="1070" preserveAspectRatio="xMidYMid slice" opacity=".52"/><rect width="1024" height="1024" fill="url(#fade)"/><ellipse cx="530" cy="510" rx="500" ry="470" fill="url(#glow)"/><circle cx="512" cy="512" r="395" fill="none" stroke="#bd4dee" stroke-width="2" opacity=".35"/>${mark(145,145,734)}`);
 await png('zicotix-youtube-banner-2560x1440.png',2560,1440,`${defs}<rect width="2560" height="1440" fill="#050407"/><image href="${art}" width="2560" height="1440" preserveAspectRatio="xMidYMid slice"/><rect width="2560" height="1440" fill="url(#fade)"/><ellipse cx="1000" cy="720" rx="850" ry="500" fill="url(#glow)"/>${mark(650,590,260)}<text x="970" y="726" fill="#fbf8ff" font-family="DejaVu Sans,sans-serif" font-size="122" font-weight="700" letter-spacing="12">ZICOTIX</text><text x="978" y="786" fill="#d4b7e7" font-family="DejaVu Sans,sans-serif" font-size="28" letter-spacing="4">IDEAS. SYSTEMS. REAL-WORLD IMPACT.</text>`);
 await png('zicotix-wide-banner-1500x500.png',1500,500,`${defs}<rect width="1500" height="500" fill="#050407"/><image href="${art}" width="1500" height="500" preserveAspectRatio="xMidYMid slice"/><rect width="1500" height="500" fill="url(#fade)"/>${mark(350,138,220)}<text x="606" y="259" fill="#fbf8ff" font-family="DejaVu Sans,sans-serif" font-size="79" font-weight="700" letter-spacing="7">ZICOTIX</text><text x="611" y="302" fill="#d4b7e7" font-family="DejaVu Sans,sans-serif" font-size="18" letter-spacing="2">INTELLIGENCE. WITH INTENTION.</text>`);
 await png('zicotix-social-preview-1200x630.png',1200,630,`${defs}<rect width="1200" height="630" fill="#050407"/><image href="${art}" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/><rect width="1200" height="630" fill="url(#fade)"/>${mark(82,96,132)}<text x="233" y="186" fill="#fbf8ff" font-family="DejaVu Sans,sans-serif" font-size="55" font-weight="700" letter-spacing="5">ZICOTIX</text><text x="107" y="318" fill="#fbf8ff" font-family="DejaVu Sans,sans-serif" font-size="60" font-weight="700">Intelligent systems.</text><text x="107" y="396" fill="#d78aff" font-family="DejaVu Sans,sans-serif" font-size="60" font-weight="700">Real-world purpose.</text><text x="110" y="514" fill="#c8b3d7" font-family="DejaVu Sans,sans-serif" font-size="23">Aegis · Optima · Applied automation</text>`);
 const manifest={logo:'Exact vector from public/art/z-mark.svg',profile:'1024x1024 with a circle-safe central mark',youtube:'2560x1440; central lockup kept inside the conservative safe area',wide:'1500x500 optional wide banner; review each platform crop',generatedAt:new Date().toISOString(),files:{}};
 for(const file of fs.readdirSync(out)){if(file.endsWith('.png')){const m=await sharp(path.join(out,file)).metadata(); manifest.files[file]={width:m.width,height:m.height,bytes:fs.statSync(path.join(out,file)).size};}}
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2));
 console.log(JSON.stringify(manifest,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
