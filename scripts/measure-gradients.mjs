/**
 * Renders each surface gradient on its own and reports the extreme pixel:
 * lightest for dark themes, darkest for light themes. That extreme is the
 * background a text token actually has to beat, and measuring it removes the
 * guesswork from the analytic worst-case model in palette.py.
 */
import fs from 'fs';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const hex = (a) => '#' + a.map((v) => v.toString(16).padStart(2, '0')).join('');

const css = fs.readFileSync('app/project-themes.css', 'utf8')
  + fs.readFileSync('app/globals.css', 'utf8');

// Pull every --site-surface-gradient declaration with the selector that owns it.
const targets = [];
const re = /(^|\n)((?:\.dark )?(?:\[data-project='(\d+)'\]|:root|\.dark))\s*\{([\s\S]*?)\n\}/g;
let m;
while ((m = re.exec(css))) {
  const sel = m[2];
  const body = m[4];
  const g = body.match(/--site-surface-gradient:\s*([\s\S]*?);/);
  if (!g) continue;
  const isLight = sel.startsWith('.dark') || sel === '.dark';
  targets.push({ sel, id: m[3] || 'site', mode: isLight ? 'light' : 'dark', gradient: g[1].trim() });
}

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
const results = [];

for (const t of targets) {
  await page.setContent(
    `<style>html,body{margin:0;height:100%}body{background:${t.gradient};background-attachment:fixed}</style>`);
  await page.waitForTimeout(60);
  const png = PNG.sync.read(await page.screenshot());
  let best = null, bestL = t.mode === 'dark' ? -1 : 2;
  for (let y = 0; y < png.height; y += 2) {
    for (let x = 0; x < png.width; x += 2) {
      const i = (png.width * y + x) << 2;
      const px = [png.data[i], png.data[i + 1], png.data[i + 2]];
      const L = lum(...px);
      if (t.mode === 'dark' ? L > bestL : L < bestL) { bestL = L; best = px; }
    }
  }
  results.push({ id: t.id, mode: t.mode, extreme: hex(best) });
  console.log(`${t.id.padEnd(5)} ${t.mode.padEnd(6)} extreme ${hex(best)}`);
}

fs.writeFileSync('/home/claude/gradient-extremes.json', JSON.stringify(results, null, 2));
await b.close();
