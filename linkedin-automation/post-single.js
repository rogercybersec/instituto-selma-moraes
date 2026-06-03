const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Read creds from vault
let email='',pass='';
try{
  const lines=fs.readFileSync(path.join(process.env.HOME,'.selma-automation','.env'),'utf8').split('\n');
  for(const l of lines){
    if(l.startsWith('LINKEDIN_EMAIL='))email=l.split('=').slice(1).join('=').trim();
    if(l.startsWith('LINKEDIN_PASS='))pass=l.split('=').slice(1).join('=').trim();
  }
}catch(e){process.exit(1);}
if(!email||!pass){console.log('No creds');process.exit(1);}

// Read posts
const postsFile = path.join(__dirname, 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile,'utf8'));
const post = posts.find(p=>!p.posted);
if(!post){console.log('ALL_POSTED');process.exit(0);}
console.log('Posting #'+post.id+' (Week '+post.week+', '+post.day+')');

(async()=>{
  const browser = await puppeteer.launch({headless:'new',userDataDir:'/tmp/pup-post-'+Date.now(),args:['--no-sandbox','--disable-blink-features=AutomationControlled','--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15']});
  const page = await browser.newPage();
  await page.setViewport({width:1440,height:900});
  await page.evaluateOnNewDocument(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});});

  // Login
  await page.goto('https://www.linkedin.com/login',{waitUntil:'networkidle2',timeout:30000});
  await new Promise(r=>setTimeout(r,5000));
  await page.evaluate(()=>{document.querySelectorAll('iframe').forEach(f=>f.remove());});
  await new Promise(r=>setTimeout(r,500));

  const loggedIn = await page.evaluate((e,p)=>{
    const allInputs=[...document.querySelectorAll('input')];
    const ei=allInputs.find(i=>i.type==='email'||i.type==='text'||i.autocomplete==='username');
    const pi=allInputs.find(i=>i.type==='password');
    if(!ei||!pi)return false;
    const ns=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
    ns.call(ei,e);ei.dispatchEvent(new Event('input',{bubbles:true}));
    ns.call(pi,p);pi.dispatchEvent(new Event('input',{bubbles:true}));
    return true;
  }, email, pass);

  if(!loggedIn){console.log('Login fields failed');await browser.close();return;}

  await page.evaluate(()=>{const b=document.querySelector('button[type="submit"]')||[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Sign in'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,10000));

  if(!page.url().includes('/feed')){
    console.log('LOGIN_FAIL:',page.url());
    await page.screenshot({path:'/tmp/li-post-fail.png'});
    await browser.close();return;
  }
  console.log('Logged in.');

  // Click "Start a post"
  await new Promise(r=>setTimeout(r,2000));
  const clicked = await page.evaluate(()=>{
    const triggers=[...document.querySelectorAll('button,div[role="button"]')];
    const t=triggers.find(x=>x.textContent.includes('Start a post')||x.textContent.includes('Começar')||x.className.includes('share-box'));
    if(t){t.click();return true;}
    return false;
  });
  if(!clicked){console.log('No start post btn');await page.screenshot({path:'/tmp/li-post-nostart.png'});await browser.close();return;}
  console.log('Editor opened');
  await new Promise(r=>setTimeout(r,3000));

  // Type post content
  const typed = await page.evaluate((text)=>{
    const editor=document.querySelector('[role="textbox"][contenteditable="true"]')||document.querySelector('.ql-editor');
    if(!editor)return false;
    editor.focus();
    editor.innerHTML='<p>'+text.split('\n').join('</p><p>')+'</p>';
    editor.dispatchEvent(new Event('input',{bubbles:true}));
    return true;
  }, post.text);

  if(!typed){console.log('Editor not found');await page.screenshot({path:'/tmp/li-post-noed.png'});await browser.close();return;}
  console.log('Text entered');
  await new Promise(r=>setTimeout(r,2000));
  await page.screenshot({path:'/tmp/li-post-'+post.id+'-typed.png'});

  // Click Post/Publicar
  const posted = await page.evaluate(()=>{
    const btns=[...document.querySelectorAll('button')];
    const pb=btns.find(b=>(b.textContent.trim()==='Post'||b.textContent.trim()==='Publicar')&&!b.disabled);
    if(pb){pb.click();return true;}
    return false;
  });

  if(!posted){console.log('Post btn not found/disabled');await page.screenshot({path:'/tmp/li-post-'+post.id+'-nobtn.png'});await browser.close();return;}
  console.log('PUBLISHED!');
  await new Promise(r=>setTimeout(r,6000));
  await page.screenshot({path:'/tmp/li-post-'+post.id+'-published.png'});

  // Mark as posted
  post.posted=true;
  post.postedAt=new Date().toISOString();
  fs.writeFileSync(postsFile,JSON.stringify(posts,null,2));
  console.log('Post #'+post.id+' marked as posted.');
  console.log('SUCCESS');
  await browser.close();
})();
