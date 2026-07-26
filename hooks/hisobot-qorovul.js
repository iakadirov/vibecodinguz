#!/usr/bin/env node
/**
 * vibecoding · hisobot qorovuli
 *
 * PreToolUse hook. `git commit` buyrug'ini ushlaydi va hujjatlar yangilanmagan bo'lsa
 * commitni to'xtatib, hisobotchi agentni chaqirishni so'raydi.
 *
 * Uxlash rejimi: loyihada `sprints/` papkasi (yoki ildizda SPRINT-*.md) bo'lmasa,
 * qorovul umuman aralashmaydi. Shuning uchun plugin Dars 6'da o'rnatilsa ham,
 * S1 boshlanguncha sezilmaydi.
 *
 * Har qanday kutilmagan xato = jim o'tkazib yuborish (exit 0). Qorovul hech qachon
 * foydalanuvchi ishini buzmasligi kerak.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const MARKER_TTL_MS = 30 * 60 * 1000; // 30 daqiqa
const MAX_DENY = 3; // shundan keyin o'tkazib yuboriladi (tsikldan himoya)

function ok() {
  process.exit(0);
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch (e) {
    return false;
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch (e) {
    return false;
  }
}

/** `git ... commit ...` buyrug'ini aniqlash (&&, ;, | bilan ajratilgan qismlar ichida ham). */
function isGitCommit(command) {
  if (!command || typeof command !== 'string') return false;
  const segments = command.split(/&&|\|\||;|\||\n/);
  for (const segment of segments) {
    const tokens = segment.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) continue;
    let i = 0;
    // oldidagi VAR=value belgilashlarini o'tkazib yuborish
    while (i < tokens.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(tokens[i])) i++;
    if (i >= tokens.length) continue;
    const base = path.basename(tokens[i].replace(/^["']|["']$/g, '')).toLowerCase();
    if (base !== 'git' && base !== 'git.exe') continue;
    if (tokens.slice(i + 1).some((t) => t === 'commit')) return true;
  }
  return false;
}

/** Loyihada sprint fayllari bormi? */
function sprintlarBor(root) {
  if (isDir(path.join(root, 'sprints'))) return true;
  try {
    return fs.readdirSync(root).some((f) => /^SPRINT-.*\.md$/i.test(f));
  } catch (e) {
    return false;
  }
}

function urinishSoni(stateFile) {
  try {
    const raw = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    if (Date.now() - (raw.t || 0) > MARKER_TTL_MS) return 0;
    return Number(raw.n) || 0;
  } catch (e) {
    return 0;
  }
}

function urinishYoz(stateFile, n) {
  try {
    fs.writeFileSync(stateFile, JSON.stringify({ n: n, t: Date.now() }));
  } catch (e) {
    /* jim */
  }
}

function ochir(p) {
  try {
    fs.unlinkSync(p);
  } catch (e) {
    /* jim */
  }
}

const XABAR = [
  '[vibecoding · hisobotchi] Commit to\'xtatildi — avval loyiha hujjatlarini yangilash kerak.',
  '',
  'Quyidagini shu tartibda bajaring:',
  '1. `vibecoding:hisobotchi` agentini ishga tushiring (Task/Agent tool, subagent_type: "vibecoding:hisobotchi").',
  '   Promptda shu sessiyada nima qilinganini qisqacha yozing.',
  '2. Agent joriy SPRINT faylini yangilaydi (tasklar, Hisobot, Handoff), kerak bo\'lsa',
  '   DECISIONS.md va ROADMAP.md\'ga yozadi va `.vibecoding/hisobot-ok` faylini yaratadi.',
  '3. Shundan keyin `git commit`ni qaytadan bajaring — xabar o\'zbekcha va mazmunli bo\'lsin.',
  '',
  'Agent ishlamasa: `.vibecoding/hisobot-ok` faylini qo\'lda yarating va commitni takrorlang.',
].join('\n');

function main() {
  let raw = '';
  try {
    raw = fs.readFileSync(0, 'utf8');
  } catch (e) {
    ok();
  }

  let input;
  try {
    input = JSON.parse(raw);
  } catch (e) {
    ok();
  }

  if (!input || input.tool_name !== 'Bash') ok();
  const command = input.tool_input && input.tool_input.command;
  if (!isGitCommit(command)) ok();

  const root = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  if (!sprintlarBor(root)) ok(); // uxlash rejimi

  const stateDir = path.join(root, '.vibecoding');
  const marker = path.join(stateDir, 'hisobot-ok');
  const stateFile = path.join(stateDir, 'hisobot-urinish.json');

  if (isFile(marker)) {
    let yangi = false;
    try {
      yangi = Date.now() - fs.statSync(marker).mtimeMs < MARKER_TTL_MS;
    } catch (e) {
      yangi = false;
    }
    ochir(marker);
    if (yangi) {
      ochir(stateFile);
      ok(); // hisobotchi ishlagan — commitga ruxsat
    }
  }

  const n = urinishSoni(stateFile) + 1;
  if (n > MAX_DENY) {
    ochir(stateFile);
    ok(); // tsikldan himoya: uchinchi urinishdan keyin o'tkazib yuboriladi
  }

  try {
    if (!isDir(stateDir)) fs.mkdirSync(stateDir, { recursive: true });
    const gi = path.join(stateDir, '.gitignore');
    if (!isFile(gi)) fs.writeFileSync(gi, 'hisobot-ok\nhisobot-urinish.json\n');
  } catch (e) {
    /* jim */
  }
  urinishYoz(stateFile, n);

  process.stderr.write(XABAR + '\n');
  process.exit(2);
}

try {
  main();
} catch (e) {
  ok();
}
