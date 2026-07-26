# O'zgarishlar tarixi

Versiya `plugin.json`da qo'lda boshqariladi. Skill mantiqi o'zgarsa raqam ko'tariladi;
faqat hujjat tuzatilsa — ko'tarilmaydi (o'quvchilarga tarqatadigan narsa yo'q).

Yangilanish o'quvchiga sessiya boshlanganda fon rejimida o'zi yetib boradi.
Darhol kerak bo'lsa: `/plugin marketplace update vibecoding-uz` va
`/plugin update vibecoding@vibecoding-uz`.

---

## 1.1.1

- `savala`: natijani saqlash **majburiy** qilindi va tavsiyalardan oldinga ko'chirildi.
  Sabab: test-run'da skill yumaloq stolni chatda chiqarib to'xtardi — `SAVALA.md`
  yozilmay qolardi.

## 1.1.0

- **Yangi skill: `savala`** — PRD'ni 7 nafar ekspert paneli tanqid qiladi va
  Go / Shartli Go / No-Go qarorini yumaloq stol vizualizatsiyasi bilan chiqaradi.
  - 6 doimiy ekspert + domenga moslashadigan mehmon ekspert (7 ovoz, toq son)
  - 2 raund, 6-8 ochiq savol; "javobim yo'q" jarimasiz, ochiq xavfga yoziladi
  - Qaror arifmetika bilan: NO-GO >= 3 -> NO-GO · GO >= 4 va NO-GO <= 1 -> GO ·
    qolgani -> SHARTLI GO
  - NO-GO holatida 2 ta pivot yo'nalishi majburiy
  - Tashqi raqam uydirish taqiqlangan: faqat PRD raqamlari
  - Natija `SAVALA.md`, qarorlar `DECISIONS.md`ga

## 1.0.3

- `qovurdoq`: `AskUserQuestion` bitta savolga 4 variant sig'ishi yozib qo'yildi
  (3 tayyor + "bilmayman"), aks holda tool xato beradi
- `hisobotchi`: Handoff 3 qator, har qator bitta gap

## 1.0.2

- `hisobotchi`: Hisobot eng ko'pi 2 qator, Handoff 3 qator — qat'iy chegara.
  Sabab: test-run'da hisobot 40 qatorlik "roman" bo'lib ketdi
- Hook xabari endi agent ishlamagan holat uchun ham to'liq ko'rsatma beradi
- README: `/plugin update vibecoding@vibecoding-uz` to'g'ri shakli

## 1.0.1

- Shablonlar alohida fayllardan `SKILL.md` ichiga ko'chirildi
  (`skills/prdla/shablonlar/` va `skills/qovurdoq/savollar.md` o'chirildi).
  **Sabab:** plugin papkasi loyihadan tashqarida bo'lgani uchun skill o'z yordamchi
  faylini o'qiy olmadi va mazmunini jimgina to'qib chiqardi — `STACK.md`ga
  Hetzner + Caddy o'rniga Vercel yozildi.
- `scripts/tekshir.js`: reference stack va 5 blok `SKILL.md` ichida borligini tekshiradi

## 1.0.0

Birinchi reliz.

- `charxla` — xomaki g'oyani bitta jumlaga (KIM · MUAMMO · YECHIM)
- `qovurdoq` — 5 blok, 25-30 savol, ochiq savollar
- `prdla` — PRD.md, STACK.md, ROADMAP.md, DECISIONS.md + `sprints/` (7 fayl)
- `hisobotchi` agenti — commit oldidan hisobot, handoff va o'zbekcha commit xabari
- Commit qorovuli (PreToolUse hook) — `sprints/` yo'q bo'lsa uxlaydi
- `.claude-plugin/marketplace.json` — 2 qadamda o'rnatish
- GitHub Actions: kirill belgilar, manifestlar va komponentlar tekshiruvi

---

*vibecoding plugin · vibecoding.uz*
