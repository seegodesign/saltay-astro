import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const { paths } = JSON.parse(fs.readFileSync('docs/legacy-url-audit.json', 'utf8'));
assert.equal(new Set(paths).size, 37, 'Expected all 37 requested paths');
for (const route of paths) {
  const file = path.join('dist/client', route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing built page: ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `Expected one page heading: ${route}`);
  assert.equal((html.match(/<!doctype html>/gi) ?? []).length, 1, `Expected one document: ${route}`);
  assert.ok(!/\[woocommerce_|avia-builder-el|<style[^>]*data-created_by/.test(html), `Unprocessed WordPress content: ${route}`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (target.startsWith('/assets/')) {
      assert.ok(fs.existsSync(path.join('public', decodeURI(target.split(/[?#]/)[0]))), `Missing asset on ${route}: ${target}`);
    } else if (target.startsWith('#') && target !== '#') {
      assert.ok(ids.has(decodeURIComponent(target.slice(1))), `Missing anchor on ${route}: ${target}`);
    } else if (target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/_')) {
      const local = target.split(/[?#]/)[0];
      if (!path.extname(local)) assert.ok(fs.existsSync(path.join('dist/client', local, 'index.html')), `Missing linked page on ${route}: ${target}`);
    }
  }
}
console.log(`Verified all ${paths.length} requested pages: HTML, headings, local assets, links, and fragment targets.`);
