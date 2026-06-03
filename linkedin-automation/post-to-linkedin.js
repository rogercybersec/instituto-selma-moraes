#!/usr/bin/env node
/**
 * LinkedIn Auto-Poster for Selma Moraes
 * Picks the next unposted post from posts.json, posts via Puppeteer,
 * adds first comment with link, marks as posted.
 *
 * Usage: LINKEDIN_EMAIL=x LINKEDIN_PASS=y node post-to-linkedin.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, 'posts.json');

const email = process.env.LINKEDIN_EMAIL || '';
const pass = process.env.LINKEDIN_PASS || '';

if (!email || !pass) {
  console.error('Set LINKEDIN_EMAIL and LINKEDIN_PASS');
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const nextPost = posts.find(p => !p.posted);

if (!nextPost) {
  console.log('ALL_POSTED');
  process.exit(0);
}

console.log('Posting #' + nextPost.id);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    const emailField = await page.$('input[name="session_key"]') || await page.$('#username');
    const passField = await page.$('input[name="session_password"]') || await page.$('#password');

    if (!emailField || !passField) {
      await page.screenshot({ path: '/tmp/li-error.png' });
      process.exit(1);
    }

    await emailField.type(email, { delay: 80 });
    await passField.type(pass, { delay: 80 });

    const btn = await page.$('button[type="submit"]');
    if (btn) await btn.click();
    await new Promise(r => setTimeout(r, 8000));

    if (!page.url().includes('/feed')) {
      console.error('LOGIN_FAILED: ' + page.url());
      await page.screenshot({ path: '/tmp/li-login-fail.png' });
      process.exit(1);
    }

    console.log('LOGIN_OK');

    const startBtn = await page.evaluateHandle(() => {
      const b = [...document.querySelectorAll('button')];
      return b.find(x => x.textContent.includes('Start a post') || x.textContent.includes('publicação'));
    });
    if (startBtn) { await startBtn.click(); await new Promise(r => setTimeout(r, 3000)); }

    const editor = await page.$('[role="textbox"]') || await page.$('.ql-editor');
    if (editor) { await editor.click(); await page.keyboard.type(nextPost.text, { delay: 5 }); await new Promise(r => setTimeout(r, 2000)); }

    const postBtn = await page.evaluateHandle(() => {
      const b = [...document.querySelectorAll('button')];
      return b.find(x => (x.textContent.trim() === 'Post' || x.textContent.trim() === 'Publicar') && !x.disabled);
    });
    if (postBtn) { await postBtn.click(); await new Promise(r => setTimeout(r, 5000)); console.log('POSTED'); }

    if (nextPost.comment) {
      await new Promise(r => setTimeout(r, 3000));
      const cmtBtn = await page.evaluateHandle(() => {
        const b = [...document.querySelectorAll('button')];
        return b.find(x => x.textContent.includes('Comment') || x.textContent.includes('Comentar'));
      });
      if (cmtBtn) {
        await cmtBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        const cmtBox = await page.$('[role="textbox"]');
        if (cmtBox) {
          await cmtBox.click();
          await page.keyboard.type(nextPost.comment, { delay: 5 });
          await new Promise(r => setTimeout(r, 1000));
          const subCmt = await page.evaluateHandle(() => {
            const b = [...document.querySelectorAll('button')];
            return b.find(x => x.textContent.includes('Post') || x.textContent.includes('Publicar'));
          });
          if (subCmt) { await subCmt.click(); console.log('COMMENTED'); }
        }
      }
    }

    await page.screenshot({ path: '/tmp/linkedin-post-' + nextPost.id + '.png' });
    nextPost.posted = true;
    nextPost.postedAt = new Date().toISOString();
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    console.log('SUCCESS: Post #' + nextPost.id);
  } catch (err) {
    console.error('ERROR: ' + err.message);
  } finally {
    await browser.close();
  }
})();
