const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless:'new',userDataDir:'/tmp/pup-s3',args:['--no-sandbox','--disable-blink-features=AutomationControlled','--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36']});
  const page = await browser.newPage();
  await page.setViewport({width:1440,height:900});
  await page.goto('https://www.linkedin.com/login',{waitUntil:'networkidle2',timeout:30000});
  await new Promise(r=>setTimeout(r,4000));
  const inputs = await page.evaluate(()=>[...document.querySelectorAll('input')].map(i=>({id:i.id,name:i.name,type:i.type})));
  console.log('INPUTS:',JSON.stringify(inputs));
  const selectors = ['#username','input[name="session_key"]','input[autocomplete="username"]','input[type="text"]','input[type="email"]'];
  let ef=null;for(const s of selectors){ef=await page.$(s);if(ef){console.log('Found email:',s);break;}}
  const ps = ['#password','input[name="session_password"]','input[type="password"]'];
  let pf=null;for(const s of ps){pf=await page.$(s);if(pf){console.log('Found pass:',s);break;}}
  if(ef&&pf){
    await ef.click({clickCount:3});await ef.type('selmasearom@hotmail.com',{delay:80});
    await pf.click({clickCount:3});await pf.type('estrela16*',{delay:80});
    const btn=await page.$('button[type="submit"]');if(btn)await btn.click();
    await new Promise(r=>setTimeout(r,12000));
    console.log('URL:',page.url());
    await page.screenshot({path:'/tmp/li-fix-result.png'});
    console.log(page.url().includes('/feed')?'SUCCESS':'STATUS:'+page.url());
  }else{console.log('NO FIELDS');}
  await browser.close();
})();
