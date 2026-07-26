#!/usr/bin/env node
/**
 * vibecoding plugin — repo tekshiruvi.
 *
 * 1. Kirill belgilar yo'qligini tekshiradi (U+0400..U+04FF).
 * 2. plugin.json va marketplace.json to'g'ri JSON va majburiy maydonlari borligini.
 * 3. Skill va agent fayllari joyida va frontmatteri to'g'riligini.
 *
 * Ishlatish:  node scripts/tekshir.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', '.vibecoding']);
const CHECK_EXT = new Set(['.md', '.json', '.js', '.yml', '.yaml', '.txt']);
// Diqqat: shablonni escape bilan yozamiz — aks holda tekshiruvchining o'zi xato beradi.
const KIRILL = new RegExp('[\\u0400-\\u04FF]');

const xatolar = [];
const ogohlantirishlar = [];

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile()) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

// --- 1. Kirill tekshiruvi ---
function kirillTekshir(fayllar) {
  let topildi = 0;
  for (const fayl of fayllar) {
    if (!CHECK_EXT.has(path.extname(fayl).toLowerCase())) continue;
    const matn = fs.readFileSync(fayl, 'utf8');
    if (!KIRILL.test(matn)) continue;
    matn.split(/\r?\n/).forEach((qator, i) => {
      const m = qator.match(KIRILL);
      if (!m) return;
      topildi++;
      xatolar.push(
        `KIRILL: ${path.relative(ROOT, fayl)}:${i + 1} — "${m[0]}" | ${qator.trim().slice(0, 80)}`
      );
    });
  }
  if (!topildi) console.log('OK  kirill belgilar topilmadi');
}

// --- 2. JSON manifestlar ---
function jsonTekshir() {
  const p = path.join(ROOT, '.claude-plugin', 'plugin.json');
  const m = path.join(ROOT, '.claude-plugin', 'marketplace.json');

  let plugin = null;
  try {
    plugin = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!plugin.name) xatolar.push('plugin.json: "name" maydoni yo\'q');
    if (!plugin.version) ogohlantirishlar.push('plugin.json: "version" yo\'q (commit SHA ishlatiladi)');
    console.log(`OK  plugin.json — ${plugin.name}@${plugin.version || 'sha'}`);
  } catch (e) {
    xatolar.push(`plugin.json o'qilmadi: ${e.message}`);
  }

  try {
    const market = JSON.parse(fs.readFileSync(m, 'utf8'));
    if (!market.name) xatolar.push('marketplace.json: "name" maydoni yo\'q');
    if (!market.owner || !market.owner.name) xatolar.push('marketplace.json: "owner.name" yo\'q');
    if (!Array.isArray(market.plugins) || !market.plugins.length) {
      xatolar.push('marketplace.json: "plugins" ro\'yxati bo\'sh');
    } else {
      for (const entry of market.plugins) {
        if (!entry.name) xatolar.push('marketplace.json: plugin yozuvida "name" yo\'q');
        if (!entry.source) xatolar.push(`marketplace.json: "${entry.name}" uchun "source" yo'q`);
      }
      if (plugin && market.plugins[0].name !== plugin.name) {
        xatolar.push(
          `nom mos kelmadi: marketplace "${market.plugins[0].name}" vs plugin "${plugin.name}"`
        );
      }
      if (plugin && market.plugins[0].version && plugin.version &&
          market.plugins[0].version !== plugin.version) {
        xatolar.push(
          `versiya mos kelmadi: marketplace ${market.plugins[0].version} vs plugin ${plugin.version}`
        );
      }
    }
    console.log(`OK  marketplace.json — ${market.name}`);
  } catch (e) {
    xatolar.push(`marketplace.json o'qilmadi: ${e.message}`);
  }
}

// --- 3. Komponentlar ---
function frontmatter(fayl) {
  const matn = fs.readFileSync(fayl, 'utf8');
  const m = matn.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const obj = {};
  for (const qator of m[1].split(/\r?\n/)) {
    const kv = qator.match(/^([a-zA-Z-]+):\s*(.*)$/);
    if (kv) obj[kv[1]] = kv[2].trim();
  }
  return obj;
}

function komponentTekshir() {
  const kutilgan = ['charxla', 'qovurdoq', 'prdla'];
  for (const nom of kutilgan) {
    const fayl = path.join(ROOT, 'skills', nom, 'SKILL.md');
    if (!fs.existsSync(fayl)) {
      xatolar.push(`skill topilmadi: skills/${nom}/SKILL.md`);
      continue;
    }
    const fm = frontmatter(fayl);
    if (!fm) xatolar.push(`skills/${nom}/SKILL.md: frontmatter yo'q`);
    else if (fm.name !== nom) xatolar.push(`skills/${nom}/SKILL.md: name "${fm.name}" != "${nom}"`);
    else if (!fm.description) xatolar.push(`skills/${nom}/SKILL.md: description yo'q`);
    else console.log(`OK  skill — ${nom}`);
  }

  const agent = path.join(ROOT, 'agents', 'hisobotchi.md');
  if (!fs.existsSync(agent)) {
    xatolar.push('agent topilmadi: agents/hisobotchi.md');
  } else {
    const fm = frontmatter(agent);
    if (!fm || !fm.name || !fm.description) xatolar.push('agents/hisobotchi.md: frontmatter to\'liq emas');
    else console.log('OK  agent — hisobotchi');
  }

  const hooks = path.join(ROOT, 'hooks', 'hooks.json');
  if (!fs.existsSync(hooks)) {
    xatolar.push('hooks/hooks.json topilmadi');
  } else {
    try {
      const h = JSON.parse(fs.readFileSync(hooks, 'utf8'));
      if (!h.hooks || !h.hooks.PreToolUse) xatolar.push('hooks.json: PreToolUse yo\'q');
      else console.log('OK  hook — PreToolUse/Bash');
    } catch (e) {
      xatolar.push(`hooks.json o'qilmadi: ${e.message}`);
    }
  }

  const skript = path.join(ROOT, 'hooks', 'hisobot-qorovul.js');
  if (!fs.existsSync(skript)) xatolar.push('hooks/hisobot-qorovul.js topilmadi');

  // Skill'lar o'zini o'zi ta'minlashi kerak: shablonlar SKILL.md ichida bo'lsin,
  // chunki plugin papkasi loyihadan tashqarida va o'qish uchun ruxsat kerak bo'lib qoladi.
  const prdla = path.join(ROOT, 'skills', 'prdla', 'SKILL.md');
  if (fs.existsSync(prdla)) {
    const matn = fs.readFileSync(prdla, 'utf8');
    const stack = [
      'Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind',
      'Caddy', 'GitHub Actions', 'Hetzner', 'Telegram Mini App', 'API-first',
    ];
    const yoq = stack.filter((s) => !matn.includes(s));
    if (yoq.length) xatolar.push(`prdla/SKILL.md ichida reference stack to'liq emas: ${yoq.join(', ')}`);
    else console.log('OK  reference stack — prdla/SKILL.md ichida to\'liq');

    const sprintlar = ['SPRINT-1-kesim', 'SPRINT-2-xotira', 'SPRINT-3-auth',
      'SPRINT-4-chuqurlik', 'SPRINT-5-telegram', 'SPRINT-6-admin', 'SPRINT-SHABLON'];
    const yoqSprint = sprintlar.filter((s) => !matn.includes(s));
    if (yoqSprint.length) xatolar.push(`prdla/SKILL.md: sprint fayllari yetishmayapti: ${yoqSprint.join(', ')}`);
    else console.log('OK  sprintlar — 7 fayl ta\'riflangan');
  }

  const qovurdoq = path.join(ROOT, 'skills', 'qovurdoq', 'SKILL.md');
  if (fs.existsSync(qovurdoq)) {
    const matn = fs.readFileSync(qovurdoq, 'utf8');
    const bloklar = ['Blok 1/5', 'Blok 2/5', 'Blok 3/5', 'Blok 4/5', 'Blok 5/5'];
    const yoq = bloklar.filter((b) => !matn.includes(b));
    if (yoq.length) xatolar.push(`qovurdoq/SKILL.md: bloklar yetishmayapti: ${yoq.join(', ')}`);
    else console.log('OK  qovurdoq — 5 blok savollar bankasi ichida');
  }
}

// --- Ishga tushirish ---
const fayllar = walk(ROOT, []);
kirillTekshir(fayllar);
jsonTekshir();
komponentTekshir();

console.log('');
for (const o of ogohlantirishlar) console.log(`OGOH  ${o}`);

if (xatolar.length) {
  console.error(`\n${xatolar.length} ta xato topildi:\n`);
  for (const x of xatolar) console.error(`  ${x}`);
  process.exit(1);
}

console.log('Hammasi joyida.');
