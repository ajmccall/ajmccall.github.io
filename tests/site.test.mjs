import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = new URL('../dist/', import.meta.url);
const read = (file) => readFileSync(new URL(file, root), 'utf8');
const primaryPages = ['index.html', 'resume/index.html', 'blog/index.html', 'tools/index.html'];
const posts = readdirSync(new URL('../posts/', import.meta.url)).filter((file) => file.endsWith('.md') && file !== 'index.md');

test('primary pages include accessible landmarks and valid social metadata', () => {
  for (const file of primaryPages) {
    const html = read(file);
    assert.match(html, /<main id="main-content">/, file);
    assert.match(html, /class="skip-link" href="#main-content"/, file);
    assert.match(html, /<nav aria-label="Main navigation">/, file);
    for (const property of ['og:title', 'og:description', 'og:url', 'og:image']) {
      assert.ok(html.includes(`property="${property}"`), `${file}: ${property}`);
    }
    assert.doesNotMatch(html, /name="og:/, file);
    assert.match(html, /rel="canonical" href="https:\/\/alasdair\.md/, file);
  }
});

test('links and image assets on primary pages resolve in the static build', () => {
  for (const file of primaryPages) {
    const html = read(file);
    for (const [, value] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const relative = decodeURIComponent(value).replace(/^\//, '');
      const target = path.extname(relative) ? relative : `${relative}${relative && !relative.endsWith('/') ? '/' : ''}index.html`;
      assert.ok(existsSync(new URL(target, root)), `${file}: missing ${value}`);
    }
  }
});

test('RSS includes every published post with a real article URL and publication date', () => {
  const xml = read('feed.rss');
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  assert.equal(items.length, posts.length);
  for (const [, item] of items) {
    const link = item.match(/<link>(.*?)<\/link>/)?.[1];
    assert.ok(link?.startsWith('https://alasdair.md/blog/'), item);
    const url = new URL(link);
    assert.ok(existsSync(new URL(`${url.pathname.slice(1)}index.html`, root)), link);
    const date = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
    assert.ok(date && !Number.isNaN(Date.parse(date)), item);
  }
});

test('resume retains management evidence, selected portfolio, and downloadable PDF', () => {
  const html = read('resume/index.html');
  assert.match(html, /five engineering managers reporting to me/);
  assert.match(html, /up to 12 direct reports/);
  assert.match(html, /A selection of apps I’ve helped build and deliver/);
  const portfolio = html.match(/<ul class="portfolio">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(portfolio);
  assert.equal([...portfolio.matchAll(/<img /g)].length, 7);
  assert.doesNotMatch(portfolio, /Sainsbury/);
  assert.ok(readFileSync(new URL('alasdair-mccall-resume.pdf', root)).subarray(0, 5).equals(Buffer.from('%PDF-')));
  assert.ok(!existsSync(new URL('resume-targeted/', root)));
});

test('historical Fastlane article does not swallow its remaining content in a code block', () => {
  const html = read('blog/idedistributionerrordomain-code-1-error-and-fastlane/index.html');
  const endOfCode = html.indexOf('</pre>');
  assert.ok(endOfCode >= 0);
  assert.ok(html.indexOf('The problem', endOfCode) > endOfCode);
  assert.match(html, /<h5[^>]*>The fix<\/h5>/);
});
