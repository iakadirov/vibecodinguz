# vibecoding — Claude Code plugini

G'oyadan hujjatlargacha bo'lgan yo'lni avtomatlashtiradigan plugin.
**Vibe Coding Express** kursi uchun. Butun muloqot lotin o'zbek tilida.

```
charxla  ->  qovurdoq  ->  prdla        + hisobotchi
g'oyani      savolga        hujjatlar      har commitda
charxlash    tutish         paketi         hisobot yozadi
```

---

## O'rnatish (2 qadam)

Claude Code ichida quyidagi ikki buyruqni yozing:

```
/plugin marketplace add iakadirov/vibecodinguz
```

```
/plugin install vibecoding@vibecoding-uz
```

Tekshirish: `/plugin` deb yozing — ro'yxatda `vibecoding` ko'rinadi.
Yoki `/` bosing — `charxla`, `qovurdoq`, `prdla` ro'yxatda chiqadi.

**Yangilash:**

```
/plugin marketplace update vibecoding-uz
```

---

## Nima qiladi

### 1. `charxla` — g'oyani charxlash

Xomaki, tumanli g'oyani bitta jumlada aytiladigan g'oyaga keltiradi.

- 2-4 ta aniqlashtiruvchi savol beradi (bittalab, tayyor variantlar bilan)
- G'oya juda keng bo'lsa — toraytiradi, qolganini "kelajak" ro'yxatiga yozadi
- Natija: `[KIM]` uchun `[MUAMMO]`ni hal qiladigan `[YECHIM]` — bitta jumla

```
/charxla
```

yoki shunchaki: `g'oyamni charxlab ber: odamlar mashinasini ijaraga bermoqchi...`

### 2. `qovurdoq` — savolga tutish

Charxlangan g'oyani 5 blok bo'yicha chuqur savolga tutadi.

| Blok | Mavzu |
|------|-------|
| 1/5 | Mahsulot mohiyati |
| 2/5 | Foydalanuvchilar va rollar |
| 3/5 | Asosiy oqim |
| 4/5 | Pul va qoidalar |
| 5/5 | Chegaralar va xavflar |

- Jami 25-30 savol, blokma-blok (hech qachon hammasi birato'la emas)
- Har savolda tayyor variantlar + "o'zim yozaman" + **"bilmayman — keyin hal qilamiz"**
- "Bilmayman" jarimasiz: u **ochiq savol** bo'lib PRD'ga tushadi
- Xulosa `.vibecoding/qovurdoq.md`'ga saqlanadi (sessiya uzilsa yo'qolmasligi uchun)

```
/qovurdoq
```

### 3. `prdla` — hujjatlar paketi

Qovurdoq javoblaridan to'liq hujjatlar paketini yozadi:

```
PRD.md          g'oya, rollar, oqim, funksiyalar, ochiq savollar
STACK.md        qotirilgan reference stack + API-first qarori
ROADMAP.md      S1..S6 magistral + tarmoqlar + kelajak
DECISIONS.md    qarorlar jurnali (sana - qaror - sabab)
sprints/        SPRINT-1..6 + SPRINT-SHABLON (7 fayl)
```

Sprint tasklari **sizning loyihangizga konkret** yoziladi — umumiy shablon emas.

```
/prdla
```

### 4. `hisobotchi` — hisobot agenti

Har commitdan oldin avtomatik ishga tushadi va:

1. Joriy SPRINT faylida bajarilgan tasklarni belgilaydi
2. **Hisobot** bo'limiga 1-2 qator yozadi
3. **Handoff**ni yangilaydi — keyingi sessiya nimadan boshlanadi
4. Sessiyada qaror bo'lgan bo'lsa — `DECISIONS.md`'ga yozadi
5. Sprint yakunlansa — `ROADMAP.md`'da belgilaydi
6. O'zbekcha, mazmunli commit xabarini taklif qiladi

**Uxlash rejimi:** loyihada `sprints/` papkasi paydo bo'lmaguncha hisobotchi
umuman aralashmaydi. Ya'ni pluginni bugun o'rnatsangiz ham, u S1 boshlanganda
o'zi uyg'onadi.

---

## Zanjir

Uchala skill bitta sessiyada ketma-ket ishlashga mo'ljallangan:

```
charxla -> qovurdoq -> prdla
```

Lekin har biri mustaqil ham chaqiriladi. Kontekstda oldingi bosqich natijasi bo'lmasa,
skill sizni to'g'ri joyga yo'naltiradi (masalan `prdla` avval `qovurdoq`ni so'raydi).

---

## Talablar

- Claude Code (istalgan yangi versiya)
- `hisobotchi` avtomatik ishga tushishi uchun — **Node.js** (Claude Code'ni npm orqali
  o'rnatgan bo'lsangiz allaqachon bor). Node bo'lmasa qolgani ishlaydi, faqat commit
  qorovuli ishlamaydi — hisobotchini qo'lda chaqirasiz.

---

## Muammo bo'lsa

| Muammo | Yechim |
|--------|--------|
| Skill ro'yxatda yo'q | Claude Code'ni qayta ishga tushiring yoki `/reload-plugins` |
| `/plugin install` topmayapti | Avval `/plugin marketplace add iakadirov/vibecodinguz` |
| Commit to'xtab qolyapti | Hisobotchi agentni ishga tushiring, yoki `.vibecoding/hisobot-ok` faylini qo'lda yarating |
| Yangi versiya kelmayapti | `/plugin marketplace update vibecoding-uz` |

---

## Litsenziya

MIT — [LICENSE](LICENSE)

---

*vibecoding plugin · vibecoding.uz*
