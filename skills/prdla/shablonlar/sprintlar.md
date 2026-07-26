# Sprintlar magistrali — S1..S6

Tartib **o'zgarmaydi**. Har sprint bitta savolga javob beradi va oldingisining ustiga quriladi.
Quyidagi maqsad va savollar barcha loyihalar uchun bir xil; **tasklar** esa har loyihaga
qovurdoq javoblaridan kelib chiqib konkret yoziladi.

---

## SPRINT 1 — kesim (`SPRINT-1-kesim.md`)

**Savol:** Ishlaydimi?
**Maqsad:** Yurak amalni boshidan oxirigacha bitta vertikal kesimda ishlatib ko'rish.

Task yo'nalishlari:
- Loyiha skeleti (Next.js + TypeScript + Tailwind) va bitta ishlaydigan sahifa
- Yurak amal yo'lidagi 2-3 ekran, ma'lumot vaqtincha kodda (seed) bo'lsa ham bo'ladi
- Yurak amalni bajaradigan bitta API yo'li
- Natija brauzerda ko'rinadi

Bu sprintda YO'Q: ro'yxatdan o'tish, ma'lumotlar bazasi, rollar, dizayn nafisligi.

---

## SPRINT 2 — xotira (`SPRINT-2-xotira.md`)

**Savol:** Eslab qoladimi?
**Maqsad:** Ma'lumot serverni qayta ishga tushirgandan keyin ham saqlanib qolsin.

Task yo'nalishlari:
- PostgreSQL ulanishi va Prisma sxemasi (PRD'dagi jadval nomlari bo'yicha)
- S1'dagi seed ma'lumotni bazaga ko'chirish
- Yaratish va o'qish amallari baza orqali ishlaydi
- Rasm yoki fayl yuklash (loyihada kerak bo'lsa)

---

## SPRINT 3 — auth (`SPRINT-3-auth.md`)

**Savol:** Kim kirdi?
**Maqsad:** Foydalanuvchi kirsin, va har rol faqat o'ziga tegishlisini ko'rsin.

Task yo'nalishlari:
- Telefon raqami + bir martalik kod (OTP) bilan kirish
- Sessiya saqlanishi
- PRD'dagi rollar va har rolning huquqlari
- Himoyalangan sahifalar: kirmagan foydalanuvchi ko'ra olmaydi

---

## SPRINT 4 — chuqurlik (`SPRINT-4-chuqurlik.md`)

**Savol:** Haqiqiy hayotda chidaydimi?
**Maqsad:** Holatlar, to'qnashuvlar va biznes qoidalarini to'g'ri ishlatish.

Task yo'nalishlari:
- PRD'dagi holatlar zanjiri (yangi -> ... -> yopildi) va o'tishlar
- To'qnashuv holati (ikki kishi bir vaqtda) — PRD'dagi qoida bo'yicha
- Narx hisobi, bekor qilish qoidasi, depozit (PRD'da bo'lsa)
- Chegaraviy holatlar: bo'sh ro'yxat, noto'g'ri sana, ruxsatsiz amal

---

## SPRINT 5 — telegram (`SPRINT-5-telegram.md`)

**Savol:** Qo'lda turadimi?
**Maqsad:** Mahsulot Telegram ichida ishlasin va o'zi xabar bersin.

Task yo'nalishlari:
- Telegram Mini App sifatida ochilishi
- Telegram akkaunti bilan bog'lanish
- Bildirishnomalar (yangi so'rov, tasdiq, bekor qilish)
- Fon vazifalari (eslatma, muddati o'tgan yozuvlarni yopish)

---

## SPRINT 6 — admin (`SPRINT-6-admin.md`)

**Savol:** Boshqarib bo'ladimi?
**Maqsad:** Egasi mahsulotni kod yozmasdan boshqara olsin.

Task yo'nalishlari:
- Boshqaruv paneli: ro'yxatlar, qidiruv, filtr
- Tasdiqlash va bloklash amallari (PRD'da kim kimni tasdiqlashi bo'yicha)
- Oddiy statistika: nechta yozuv, nechta faol, nechta yopilgan
- Qo'lda tuzatish imkoni (ma'lumotni o'zgartirish)

---

## SPRINT-SHABLON.md

`shablonlar/SPRINT-SHABLON.md` faylidan aynan ko'chiriladi (faqat loyiha nomi almashadi).
