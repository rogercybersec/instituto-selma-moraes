const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: '/tmp/pup-selma',
    args: ['--no-sandbox','--disable-blink-features=AutomationControlled',
           '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36']
  });
  const page = await browser.newPage();
  await page.setViewport({width:1440,height:900});
  await page.goto('https://www.linkedin.com/login', {waitUntil:'networkidle2', timeout:30000});
  await new Promise(r=>setTimeout(r,4000));

  const ef = await page.$('#username');
  const pf = await page.$('#password');

  if(ef && pf) {
    await ef.click({clickCount:3});
    await ef.type('selmasearom@hotmail.com', {delay:100});
    await pf.click({clickCount:3});
    await pf.type('estrela16*', {delay:100});
    await new Promise(r=>setTimeout(r,1000));
    const btn = await page.$('button[type="submit"]');
    if(btn) await btn.click();
    await new Promise(r=>setTimeout(r,12000));
    const url = page.url();
    console.log('URL: ' + url);
    await page.screenshot({path:'/tmp/li-fresh.png'});
    if(url.includes('/feed')) console.log('SUCCESS');
    else console.log('STATUS: ' + url);
  } else {
    console.log('NO FIELDS');
    await page.screenshot({path:'/tmp/li-fresh-nf.png'});
  }
  await browser.close();
})();
