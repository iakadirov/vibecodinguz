# STACK — {{LOYIHA}}

Bu loyihada texnologiyalar **qotirilgan**. Tanlov muhokama qilinmaydi — sabab har
qatorda yozilgan. Maqsad: o'ylashni stackka emas, mahsulotga sarflash.

## Reference stack

| Texnologiya | Nima uchun shu |
|-------------|----------------|
| **Next.js (App Router)** | Bitta framework ichida ham sahifa, ham API — alohida backend server ko'tarish shart emas |
| **TypeScript** | Xatoni ishga tushirishdan oldin ushlaydi; AI yozgan kodni tekshirish osonlashadi |
| **PostgreSQL** | Jiddiy loyihalar uchun standart, bepul, har joyda ishlaydi, ma'lumot yo'qolmaydi |
| **Prisma** | Ma'lumot modelini bitta faylda ko'rsatadi va SQL yozishdan qutqaradi |
| **Tailwind CSS** | Dizaynni HTML ichida yozasiz — alohida CSS fayllarni boshqarish yo'q |
| **Caddy** | HTTPS sertifikatini o'zi oladi va o'zi yangilaydi, sozlash 3 qator |
| **GitHub Actions** | Push qilgandan keyin serverga chiqarish avtomatik bo'ladi |
| **Hetzner** | Arzon va barqaror server; kredit karta bilan ochiladi, soatlik hisob |
| **Telegram Mini App** | Auditoriya allaqachon Telegramda; alohida ilova yuklatish shart emas (S5) |

## Nega aynan shu to'plam

1. **Claude shu ekotizimni eng chuqur biladi.** Next.js + TypeScript + Prisma —
   internetda eng ko'p misol va eng ko'p savol-javob bor stack. Ya'ni AI kamroq adashadi.
2. **Bitta til — front ham, back ham.** TypeScript. Ikkinchi tilni o'rganish kerak emas.
3. **Eng katta hamjamiyat.** Muammoga duch kelsangiz, javob allaqachon yozilgan.

## API-first qarori

Backend **mustaqil API** sifatida quriladi.

- Web sahifalar — API'ning **1-mijozi**
- Mobil / Telegram Mini App — kelajakdagi **2-mijoz**
- Ma'lumot bilan ishlaydigan mantiq faqat API ichida yashaydi, sahifa ichida emas

**Nega:** mobil yoki Telegram versiyasi kerak bo'lganda backendni qaytadan yozish
shart bo'lmaydi — yangi mijoz o'sha API'ga ulanadi. Bu S5'da (Telegram sprinti)
haftalar tejaydi.

**Amaliy qoida:** har bir ma'lumot amali uchun API yo'li bo'lsin
(`/api/...`), sahifa esa faqat shu yo'lni chaqirsin.

## Nima QO'SHILMAYDI (v1)

- Mikroservis, Docker Swarm, Kubernetes — bitta serverga sig'adigan loyihaga kerak emas
- Redis, Kafka, GraphQL — hozircha muammo yo'q joyga yechim
- Alohida mobil ilova (React Native / Flutter) — Telegram Mini App yetarli

---

*{{LOYIHA}} · vibecoding plugin bilan yaratilgan · vibecoding.uz*
