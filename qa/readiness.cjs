const {chromium,devices}=require(process.env.PLAYWRIGHT_MODULE||'/usr/local/lib/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const root=process.env.TEST_URL||'http://127.0.0.1:4175';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const errors=[],checks=[];
 const c=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
 for(const id of ['aegis','optima']){
  await p.goto(`${root}/?project=${id}#${id}`,{waitUntil:'networkidle'});
  assert.equal(await p.locator('dialog[open] h2').textContent(),id==='aegis'?'Aegis':'Optima');
  await p.getByRole('button',{name:'Copy project link',exact:true}).click();
  assert.equal(await p.evaluate(()=>navigator.clipboard.readText()),`https://ttvzicotix.github.io/?project=${id}#${id}`);
  await p.keyboard.press('Escape');assert.equal(await p.locator('dialog[open]').count(),0);assert(!new URL(p.url()).searchParams.has('project'));
 }
 checks.push('Both shareable project URLs open the correct details; copy and close work');
 await p.goto(root+'/?project=not-a-project',{waitUntil:'networkidle'});assert.equal(await p.locator('dialog[open]').count(),0);checks.push('Unknown project parameters ignored');
 const mc=await browser.newContext({...devices['iPhone 13'],reducedMotion:'reduce'});const m=await mc.newPage();m.on('pageerror',e=>errors.push(e.message));
 await m.goto(root,{waitUntil:'networkidle'});await m.getByRole('button',{name:'Open navigation'}).tap();await m.setViewportSize({width:390,height:700});assert.equal(await m.getByRole('button',{name:'Close navigation'}).getAttribute('aria-expanded'),'true');
 await m.locator('.nav-links a[href="#optima"]').tap();await m.getByRole('button',{name:'Learn more about Optima'}).tap();await m.screenshot({path:'qa/phone-project.png'});await m.keyboard.press('Escape');
 await m.getByRole('button',{name:/Start a conversation/}).tap();await m.screenshot({path:'qa/phone-contact.png'});
 await m.setViewportSize({width:844,height:390});assert(await m.locator('.dialog-close').isVisible());assert(await m.locator('dialog').evaluate(e=>e.getBoundingClientRect().height<=window.innerHeight));
 assert(await m.locator('.delivery-notice').isVisible());await m.screenshot({path:'qa/phone-landscape-contact.png'});checks.push('Phone toolbar resize, touch navigation, contact panel and short landscape viewport pass');
 const ac=await browser.newContext({viewport:{width:1440,height:900}});const a=await ac.newPage();await a.goto(root,{waitUntil:'networkidle'});await a.getByRole('button',{name:/Let's Build/}).click();assert.equal(await a.locator('.hero').getAttribute('data-paused'),'true');await a.keyboard.press('Escape');checks.push('Hero atmosphere suspended behind open dialog');
 assert.equal(errors.length,0);await browser.close();
 fs.writeFileSync('qa/readiness-results.json',JSON.stringify({checks,errors,passed:true,testedAt:new Date().toISOString(),limitations:['Chromium with touch emulation; not physical iPhone Safari','Form delivery not sent or verified by this test']},null,2));console.log(JSON.stringify({checks,errors,passed:true},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
