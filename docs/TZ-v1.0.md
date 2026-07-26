# TZ — VIBECODING PLUGIN (Claude Code plugin + 3 skill + hisobotchi agent)
## Vibe Coding Express kursi uchun · v1.0 · 2026-26-iyul

> **Bu hujjat nima:** vibecoding pluginini alohida sessiyada qurish uchun texnik topshiriq. Plugin GitHub reposiga joylanadi, o'quvchilar Claude Code'ga o'rnatib oladi. Maqsad: Dars 6 zanjiri (`charxla → qovurdoq → prdla`) va S1'dan boshlab ishlaydigan hisobotchi agent.

---

## 1. UMUMIY TALABLAR

**Nomi:** `vibecoding` (marketplace nomi: `vibecoding-uz`)
**Tarqatish:** ochiq GitHub repo → o'quvchi Claude Code ichida marketplace qo'shib o'rnatadi. O'rnatish 2 qadamdan oshmasin — aniq buyruqlar README'ga yoziladi (bu keyin kurs kontent.md'siga ko'chiriladi).
**Til:** skill'larning BARCHA chiqishi va savollari — faqat lotin o'zbek. Bironta kirill belgi bo'lmasin (repoda CI yoki test bilan tekshirilsin: `[\u0400-\u04FF]` diapazoni bo'yicha).
**Yangilanish:** versiya `plugin.json`'da; o'quvchi plugin yangilaganda skill'lar almashadi, loyiha fayllariga tegilmaydi.

**Repo strukturasi (Claude Code plugin standarti):**
```
vibecoding/
├── .claude-plugin/
│   └── plugin.json          (nom, versiya, tavsif)
├── skills/
│   ├── charxla/SKILL.md
│   ├── qovurdoq/SKILL.md
│   └── prdla/SKILL.md
├── agents/
│   └── hisobotchi.md
├── README.md                (o'rnatish qo'llanmasi, o'zbekcha)
└── LICENSE
```

**Umumiy printsip (uchala skill uchun):** skill o'ylashni EMAS, formatni avtomatlashtiradi. Qarorlar — foydalanuvchidan. Skill hech qachon foydalanuvchi o'rniga mahsulot qarori qabul qilmaydi, javob uydirmaydi, bo'sh joyni taxmin bilan to'ldirmaydi.

**Zanjir konteksti:** uchala skill bitta sessiyada ketma-ket ishlashga mo'ljallangan (charxla natijasi qovurdoqqa, qovurdoq javoblari prdla'ga kontekst orqali o'tadi). Lekin har skill mustaqil ham chaqirila olishi kerak: kontekstda oldingi bosqich natijasi bo'lmasa, skill uni so'rab oladi (masalan prdla to'g'ridan-to'g'ri chaqirilsa: "avval qovurdoqdan o'tganmisiz? bo'lmasa boshlaymizmi?").

---

## 2. SKILL 1 — `charxla`

**Vazifasi:** xomaki, tumanli g'oyani mahsulot qilib chiqarishga tayyor, bitta jumlada aytiladigan startup g'oyasiga keltirish.

**Trigger:** foydalanuvchi "charxla", "g'oyamni charxla", "charxlab ber" desa — g'oya matni bilan yoki g'oyasiz.

**Kirish:** erkin matn — 1 gapdan 1 sahifagacha bo'lgan xomaki g'oya. G'oya berilmagan bo'lsa skill o'zi so'raydi: "G'oyangizni erkin yozing — tartibsiz bo'lsa ham mayli."

**Xatti-harakati:**
1. G'oyani o'qib, uch savol bo'yicha nima yetishmayotganini aniqlaydi: **KIM** (aniq auditoriya) · **MUAMMO** (qaysi og'riq) · **YECHIM** (qanday hal qiladi).
2. Yetishmagan qismlar bo'yicha **2–4 ta aniqlashtiruvchi savol** beradi — BITTALAB, har biriga 2-3 tayyor variant + "o'zim yozaman" imkoni bilan. 4 tadan oshirmaydi.
3. G'oya "ekotizim" bo'lsa (bir nechta auditoriya, bir nechta mahsulot) — toraytiradi: "bitta jumlaga sig'magan g'oya — bir nechta g'oya. Qaysi BITTASI asosiy?" Qolganlarini "kelajak roadmap" sifatida qayd etadi.
4. Yakuniy natijani chiqaradi.

**Chiqish formati (qat'iy):**
```
🎯 CHARXLANGAN G'OYA:
[KIM] uchun [MUAMMO]ni hal qiladigan [YECHIM] — bitta jumla.

Auditoriya: ...
Og'riq: ...
Yechim mohiyati: ...

Kelajakka qoldirilganlar: (bo'lsa)
- ...

Keyingi qadam: "Qovurdoq boshla" deng — g'oyani savolga tutamiz.
```

**Chegaralar:** kod yozmaydi · fayl yaratmaydi · PRD yozmaydi · texnologiya muhokama qilmaydi · 4 savoldan oshirmaydi.

**Sifat mezoni:** natija jumlasini biror notanish odam o'qisa, mahsulot nima ekanini tushunishi kerak.

---

## 3. SKILL 2 — `qovurdoq`

**Vazifasi:** charxlangan g'oyani chuqur savolga tutish — PRD'ni mukammal, suvosti toshlarisiz yozish uchun barcha ma'lumotni yig'ish.

**Trigger:** "qovurdoq", "qovurdoq boshla", "grill qil".

**Kirish:** kontekstdagi charxlangan g'oya. Bo'lmasa: avval charxla'ga yo'naltiradi yoki g'oyani bir jumlada so'rab oladi.

**Xatti-harakati — 5 blok, jami 25–30 savol:**

| Blok | Mavzu | Savollar mazmuni (taxminan 5-6 tadan) |
|------|-------|--------------------------------------|
| 1/5 | Mahsulot mohiyati | yurak amal nima · mahsulot bir jumlada nima qiladi · nimasi bilan mavjud yechimlardan farq qiladi · muvaffaqiyat nimada o'lchanadi |
| 2/5 | Foydalanuvchilar va rollar | qanday rollar bor (mijoz/ega/operator/admin...) · har rol nimani ko'radi va qila oladi · ro'yxatdan o'tish qanday (telefon? nima uchun?) · kim kimni tasdiqlaydi |
| 3/5 | Asosiy oqim | foydalanuvchi kirganidan maqsadga yetguncha qadamlar · resurs qanday qo'shiladi (kim, qanday ma'lumot bilan) · bron/buyurtma qanday yaratiladi · holatlar qanday o'zgaradi (yangi → ... → yopildi) · to'qnashuv holati (ikki kishi bir vaqtda?) |
| 4/5 | Pul va qoidalar | narx qanday hisoblanadi (birlik: soat/kun/oy) · depozit bormi, qancha · bekor qilish qoidasi · to'lov qachon va qanday (hozircha rejada) · jarima/kechikish bormi |
| 5/5 | Chegaralar va xavflar | v1'ga NIMA KIRMAYDI (ochiq ro'yxat) · eng katta xavf nima · qonuniy/ishonch masalalari · qaysi ma'lumotlar maxfiy |

**Interaktivlik qoidalari (kritik):**
- Savollar **blokma-blok** beriladi (hech qachon 30 tasi birato'la emas). Har blok boshida progress: "Blok 2/5 — Foydalanuvchilar va rollar".
- Har savolda: **2–4 tayyor variant** (raqamlangan, tanlash oson) + **"o'zim yozaman"** + **"bilmayman — keyin hal qilamiz"**.
- "Bilmayman" javobi jarimasiz qabul qilinadi va **ochiq savol** sifatida belgilanadi — keyin prdla uni DECISIONS.md'ga yozadi.
- Foydalanuvchi javobi yuzaki bo'lsa (masalan "bilmadim, oddiy qilib") — skill BIR marta chuqurlashtiruvchi savol beradi, qistamaydi.
- Blok tugaganda 2-3 qatorlik oraliq xulosa: "Hozircha rasm shunday: ..."

**Chiqish:** barcha bloklar tugagach — **QOVURDOQ XULOSASI**: 5 blok bo'yicha strukturali qisqa jamlanma + ochiq savollar ro'yxati + "Endi 'PRDla' deng — hujjatlar paketini yozamiz."

**Chegaralar:** hujjat fayl yozmaydi (bu prdla ishi) · texnologiya tanlamaydi · dizayn so'ramaydi (Dars 7 mavzusi) · javoblarni baholamaydi/tanqid qilmaydi (tanqid — alohida raund).

**Sifat mezoni:** xulosadan PRD yozish uchun bironta qo'shimcha savol kerak bo'lmasligi kerak (ochiq savollar bundan mustasno — ular ataylab ochiq).

---

## 4. SKILL 3 — `prdla`

**Vazifasi:** charxla + qovurdoq kontekstidan to'liq professional hujjatlar paketini yaratish.

**Trigger:** "prdla", "PRDla", "hujjatlarni yoz".

**Kirish:** kontekstdagi qovurdoq xulosasi. Bo'lmasa: qovurdoqqa yo'naltiradi.

**Chiqish — fayllar (loyiha ildizida):**

**`PRD.md`** — bo'limlari: G'oya bir jumlada (charxla natijasi) · Muammo va auditoriya · Yurak amal (alohida, ta'kidlangan) · Rollar va huquqlar jadvali · Asosiy oqim (qadamma-qadam) · Funksiyalar (v1 — maksimal 3 asosiy) · Ma'lumot modeli (faqat jadval NOMLARI va 1 qatorlik izoh — sxema emas) · Qoidalar (narx, bekor qilish, holatlar) · **Ochiq savollar** (qovurdoqdagi "bilmayman"lar) · V1'ga kirmaydiganlar.

**`STACK.md`** — reference stack QOTIRILGAN holda yoziladi (foydalanuvchidan so'ralmaydi, tanlov berilmaydi):
- Next.js (App Router) + TypeScript + PostgreSQL + Prisma + Tailwind
- Caddy + GitHub Actions + Hetzner · Telegram Mini App (S5'da)
- Har texnologiyaga 1 qatorlik "nega shu" sababi (kurs pozitsiyasi: Claude eng chuqur biladigan ekotizim, bitta tilda front+back, eng katta hamjamiyat)
- **API-first qarori** alohida bo'lim: backend = mustaqil API; web — 1-mijoz, mobil — kelajakdagi 2-mijoz

**`ROADMAP.md`** — magistral: S1→S6 (quyidagi sprints bilan mos) + tarmoqlar (har biriga qovurdoq javobidan kelib chiqqan sabab) + kelajak (v2+: to'lov, AI funksiya, mobil — charxla'da qoldirilganlar shu yerga).

**`DECISIONS.md`** — jurnal formati: sana · qaror · sabab. Birinchi yozuvlar: bugungi qarorlar (stack, API-first, yurak amal, chegaralar) + **OCHIQ SAVOLLAR** bo'limi (qovurdoq "bilmayman"lari, har biriga "qachon hal qilamiz" mo'ljali).

**`sprints/` papkasi** — kurs darslariga aynan mos:
```
sprints/
├── SPRINT-1-kesim.md         (yurak amal vertikal kesimda — Dars 8)
├── SPRINT-2-xotira.md        (to'liq DB + fayllar — Dars 9)
├── SPRINT-3-auth.md          (OTP + rollar — Dars 10)
├── SPRINT-4-chuqurlik.md     (holatlar, to'qnashuv, qoidalar — Dars 11)
├── SPRINT-5-telegram.md      (Mini App + bildirishnoma + fon — Dars 12)
├── SPRINT-6-admin.md         (boshqaruv paneli — Dars 13)
└── SPRINT-SHABLON.md         (yangi sprint qanday ochiladi — qisqa shablon)
```
Har SPRINT-N.md formati: **Maqsad (1 jumla)** · **Savol** (S1: "Ishlaydimi?"...) · **Tasklar (3-7 ta, bo'sh checkbox)** · **Qabul mezoni** · **Hisobot** (bo'sh — hisobotchi to'ldiradi) · **Handoff** (bo'sh). Tasklar foydalanuvchi loyihasiga moslab, qovurdoq javoblaridan konkret yoziladi (umumiy "backend qur" emas — "mashina ro'yxati sahifasi (seed 4 ta)" darajasida).

`SPRINT-SHABLON.md`: sprint ochish ritali (SPRINT faylni o'qi → Plan Mode → qur → tekshir → commit) + bo'sh shablon.

**Yozish qoidalari:**
- Hujjatlar faqat qovurdoq javoblaridan quriladi — skill o'zidan funksiya QO'SHMAYDI. Javob bo'lmagan joy → "Ochiq savollar"ga.
- Har fayl oxirida: `*[Loyiha nomi] · vibecoding plugin bilan yaratilgan · vibecoding.uz*`
- Yaratib bo'lgach qisqa xulosa: qaysi fayllar chiqdi, har biri nima uchun + keyingi qadam: "PRD'ni tanqid qildiring (Dars 6) yoki Dars 7'ga o'ting."

**Chegaralar:** kod yozmaydi · DB sxema/migratsiya yozmaydi · dizayn qismini bo'sh qoldiradi (DESIGN.md yaratmaydi — u Dars 7'da) · sprints tartibini o'zgartirmaydi.

---

## 5. HISOBOTCHI AGENT — `agents/hisobotchi.md`

**Vazifasi:** har commit oldidan loyiha hujjatlarini avtomatik yangilab borish. Dars 6'da o'rnatiladi lekin "uxlaydi" — repo/sprint fayllar paydo bo'lganda (S1, Dars 8) tabiiy ishga tushadi.

**Ishga tushishi:** foydalanuvchi "commit qil" deganda Claude commitdan OLDIN hisobotchi vazifalarini bajaradi. (Implementatsiya tanlovi quruvchi sessiyaga: agent-instruktsiya sifatida CLAUDE.md/skill qoidasi orqali yoki hook orqali — qaysi biri Claude Code'da barqaror ishlasa o'sha; test bilan isbotlansin.)

**Har commitda qiladigan ishlari (tartib bilan):**
1. Joriy SPRINT-N.md'da bajarilgan tasklarni ✅ belgilaydi va **Hisobot** bo'limiga 1-2 qatorlik yozuv qo'shadi (nima qilindi, qaysi fayllar).
2. **Handoff** bo'limini yangilaydi: keyingi sessiya nimadan boshlashi (1-3 qator).
3. Sessiyada muhim qaror bo'lgan bo'lsa — DECISIONS.md'ga yozadi (sana · qaror · sabab). Qaror bo'lmasa tegmaydi.
4. Sprint yakunlangan bo'lsa — ROADMAP.md'da S-N'ni ✅ qiladi.
5. Commit xabarini O'ZBEKCHA, mazmunli yozadi (masalan: "S1: mashina sahifasi va sana tanlash qo'shildi").

**Qoidalar:** yozuvlar QISQA (hisobot 1-2 qator, roman emas) · mavjud matnni o'chirmaydi, faqat qo'shadi/belgilaydi · sprint fayli topilmasa jimgina faqat commit qiladi (xato chiqarmaydi) · faqat lotin o'zbek.

---

## 6. QABUL MEZONLARI (quruvchi sessiya uchun test rejasi)

Carenta g'oyasi bilan to'liq test-run — barcha bandlar ✅ bo'lishi shart:

- [ ] O'rnatish: toza Claude Code'da 2 qadamda o'rnatiladi, uch skill ro'yxatda ko'rinadi
- [ ] `charxla`: chala g'oya kiritilganda 2-4 savol beradi (ko'p emas), natija KIM·MUAMMO·YECHIM formatida bitta jumla
- [ ] `charxla`: "ekotizim" g'oyada toraytirish ishlaydi
- [ ] `qovurdoq`: savollar blokma-blok (5 blok), har savolda variantlar + "o'zim yozaman" + "bilmayman", jami 25-30
- [ ] `qovurdoq`: "bilmayman" javobi ochiq savol sifatida xulosaga tushadi
- [ ] `prdla`: 4 hujjat + sprints/ (7 fayl) yaratiladi, PRD'da "Ochiq savollar" bo'limi bor
- [ ] `prdla`: STACK.md'da aynan reference stack + API-first (foydalanuvchidan so'ramagan holda)
- [ ] `prdla`: SPRINT-1..6 tasklari foydalanuvchi loyihasiga KONKRET moslangan (umumiy shablon emas)
- [ ] Zanjir: uchala skill bitta sessiyada ketma-ket ishlaydi; prdla mustaqil chaqirilsa qovurdoqqa yo'naltiradi
- [ ] Hisobotchi: test repoda "commit qil" → sprint hisobot + handoff + o'zbekcha commit; sprint fayl yo'q holatda xatosiz jim ishlaydi
- [ ] Barcha chiqishlarda kirill YO'Q (avtomatik tekshiruv repoda)
- [ ] README: o'rnatish qo'llanmasi o'zbekcha, 2 qadam

---

## 7. KELAJAK (v1'ga KIRMAYDI — repoda issue sifatida qoldirilsin)

- `dizaynla` skilli (Dars 7 uchun: 3 uslub varianti + DESIGN.md) — Dars 7 rejasi yakunlangach
- `tanqidla` skilli (PRD tanqid raundi avtomatlashtirilgan) — hozircha oddiy prompt bilan
- Sprint kengaytirish skilli (v2 funksiyalar uchun yangi sprint generatsiyasi)

---

*Vibe Coding Express · vibecoding plugin TZ v1.0 · vibecoding.uz*
