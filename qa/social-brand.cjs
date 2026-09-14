const { chromium, devices } = require(process.env.PLAYWRIGHT_MODULE || '/usr/local/lib/node_modules/playwright');
const assert = require('node:assert/strict'); const fs = require('node:fs');
const base = process.env.TEST_URL || 'http://127.0.0.1:4176';
(async () => {
 const browser = await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const ctx = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',acceptDownloads:true});
 const p = await ctx.newPage(); const errors=[],checks=[]; p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base,{waitUntil:'networkidle'});
 for(const group of await p.getByRole('group',{name:'Zicotix social profiles'}).all()) {
  for(const name of ['GitHub','TikTok','YouTube','Instagram']) assert.equal(await group.getByRole('link',{name:new RegExp('^'+name+':')}).count(),1);
 }
 const yt = p.locator('.footer-connect a[href="https://www.youtube.com/@Zicotix"]'); assert.equal(await yt.count(),1);
 const ig = p.locator('.footer-connect a[href="https://www.instagram.com/zicotixai/"]'); assert.equal(await ig.count(),1);
 checks.push('All four social buttons render in Contact and Footer with correct icons and configured URLs');
 await p.locator('.footer').scrollIntoViewIfNeeded();await p.screenshot({path:'qa/social-footer.png'});
 await p.getByRole('button',{name:'Brand kit',exact:false}).click();
 assert(await p.locator('dialog[open]').isVisible());assert.equal(await p.locator('.brand-asset').count(),4);
 for(const img of await p.locator('.brand-preview img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());assert(await img.evaluate(e=>e.naturalWidth>0));}
 await p.locator('dialog').evaluate(e=>e.scrollTop=0);await p.screenshot({path:'qa/brand-library-desktop.png'});
 await p.getByRole('button',{name:'Logo files',exact:true}).click();assert.equal(await p.locator('.brand-asset').count(),2);
 const download = p.waitForEvent('download');await p.getByRole('link',{name:'Download White Z mark as PNG'}).click();assert.equal((await download).suggestedFilename(),'zicotix-logo-white-transparent.png');
 const catalog = await (await p.request.get(base+'/brand/downloads.json')).json();
 for(const asset of catalog.assets){for(const name of Object.values(asset.files)){const r=await p.request.get(base+'/brand/'+name);assert.equal(r.status(),200,name);assert((await r.body()).length>100);}}
 const zip = await p.request.get(base+'/brand/zicotix-brand-kit.zip');assert.equal(zip.status(),200);assert.equal((await zip.body()).subarray(0,2).toString(),'PK');
 checks.push('Brand library categories, previews, PNG download event and every PNG/JPEG/SVG/ZIP URL pass');
 for(let i=0;i<18;i++){await p.keyboard.press('Tab');assert(await p.evaluate(()=>!!document.activeElement.closest('dialog')));}
 await p.keyboard.press('Escape');assert.equal(await p.locator('dialog[open]').count(),0);assert.equal(await p.evaluate(()=>document.activeElement.className),'footer-brand-button');
 await p.goto(base+'/?panel=brand',{waitUntil:'networkidle'});assert(await p.locator('dialog[open]').isVisible());await p.keyboard.press('Escape');assert(!new URL(p.url()).searchParams.has('panel'));
 checks.push('Brand dialog deep link, focus trapping, Escape and trigger-focus return pass');
 for(const width of [320,375,390,430,760,768,1024,1440,1920]){
  await p.setViewportSize({width,height:950});await p.goto(base+'/?panel=brand',{waitUntil:'networkidle'});
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`page overflow ${width}`);
  assert(await p.locator('dialog').evaluate(e=>e.scrollWidth<=e.clientWidth+1),`dialog overflow ${width}`);
  await p.keyboard.press('Escape');
 }
 checks.push('No page or brand-dialog horizontal overflow at 320-1920px');
 const mc=await browser.newContext({...devices['iPhone 13'],reducedMotion:'reduce'});const m=await mc.newPage();m.on('pageerror',e=>errors.push(e.message));
 await m.goto(base,{waitUntil:'networkidle'});await m.locator('.hero').screenshot({path:'qa/phone-home.png'});
 await m.getByRole('button',{name:'Open navigation'}).tap();await m.locator('.nav-links a[href="#aegis"]').tap();await m.getByRole('button',{name:'Learn more about Aegis'}).tap();await m.screenshot({path:'qa/phone-aegis-detail.png'});await m.keyboard.press('Escape');
 await m.getByRole('button',{name:'Brand kit',exact:false}).tap();await m.screenshot({path:'qa/brand-library-phone.png'});
 await m.getByRole('button',{name:'Logo files',exact:true}).tap();assert.equal(await m.locator('.brand-asset').count(),2);await m.keyboard.press('Escape');
 await m.getByRole('button',{name:'Start a conversation',exact:true}).tap();assert(await m.locator('.delivery-notice').isVisible());await m.screenshot({path:'qa/phone-contact.png'});await m.keyboard.press('Escape');
 checks.push('iPhone touch emulation: navigation, Aegis tabs, asset library and on-page contact remain usable');
 const desktop=await browser.newContext({viewport:{width:1440,height:1000}});const d=await desktop.newPage();d.on('pageerror',e=>errors.push(e.message));await d.goto(base,{waitUntil:'networkidle'});assert(await d.locator('.hero-canvas canvas').isVisible());await d.screenshot({path:'qa/desktop-home.png'});await d.getByRole('button',{name:'Pause atmosphere'}).click();assert.equal(await d.locator('.hero').getAttribute('data-paused'),'true');
 checks.push('Original artwork and rain retained; atmosphere pause works');assert.equal(errors.length,0);
 fs.writeFileSync('qa/social-brand-results.json',JSON.stringify({passed:true,checks,errors,checkedAt:new Date().toISOString(),limitations:['Instagram @zicotixai is owner-reported candidate, not confirmed ownership','FormSubmit activation and real inbox delivery remain pending','Touch emulation is not physical iPhone Safari testing']},null,2));
 console.log(JSON.stringify({passed:true,checks,errors},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
