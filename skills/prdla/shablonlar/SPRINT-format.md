# Har SPRINT-N faylining formati

Quyidagi struktura AYNAN saqlanadi — hisobotchi agent shu sarlavhalarni qidiradi.
`{{...}}` joylari loyihaga moslab to'ldiriladi.

```markdown
# SPRINT {{N}} — {{QISQA NOM}}

**Maqsad:** {{bitta jumla}}

**Savol:** {{shu sprint javob beradigan savol}}

## Tasklar

- [ ] {{konkret task 1}}
- [ ] {{konkret task 2}}
- [ ] {{konkret task 3}}

## Qabul mezoni

- {{qanday tekshiriladi — ko'z bilan ko'riladigan natija}}
- {{...}}

## Hisobot

<!-- hisobotchi to'ldiradi -->

## Handoff

<!-- hisobotchi to'ldiradi -->

---

*{{LOYIHA}} · vibecoding plugin bilan yaratilgan · vibecoding.uz*
```

## Task yozish qoidalari

- 3 tadan 7 tagacha task. Ko'p bo'lsa — sprint juda katta, keyingisiga surish kerak.
- Har task **ko'rinadigan natija** bersin: sahifa, tugma, endpoint, jadval.
- Loyihaga konkret bo'lsin, umumiy bo'lmasin:
  - Yomon: "Frontend qismini yoz"
  - Yaxshi: "Mashinalar ro'yxati sahifasi — seed bilan 4 ta mashina ko'rinadi"
- Barcha checkbox bo'sh: `- [ ]`
- **Hisobot** va **Handoff** bo'limlari bo'sh qoldiriladi.

## Qabul mezoni qoidalari

Qabul mezoni — "ishladi" deyish uchun ko'z bilan ko'rish mumkin bo'lgan natija.

- Yomon: "Kod toza bo'lsin"
- Yaxshi: "Bosh sahifada 4 ta mashina ko'rinadi va bittasiga bosilganda sana tanlash ochiladi"
