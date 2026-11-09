## 🏨 Otel Rezervasiyası Backend API

Salam, bu proqram otel otaqlarının idarə olunması və rezerv edilməsi üçün yazdığım bir Backend API layihəsidir.

## 🛠️ İstifadə etdiyim texnologiyalar
- Node.js & Express
- MongoDB & Mongoose 
- JWT (JSON Web Token) (Giriş və avtorizasiya üçün)
- Bcrypt (Şifrələrin təhlükəsiz şəkildə qorunması)

---

## ✨ Əsas Xüsusiyyətlər
- Qeydiyyat və Giriş: İstifadəçilər sistemə qoşulub token ala bilirlər.
- Rollar (USER və ADMIN): Admin otaqları və istifadəçiləri idarə edə bilir.
- Otaq Axtarışı: Müştəri istədiyi tarix aralığını daxil edərək həmin vaxt boş olan otaqları tapa bilir.
- Rezervasiya Qaydası: Eyni otaq eyni tarixlərdə başqası tərəfindən tutulubdursa, sistem avtomatik kəsişmənin qarşısını alır.

---

## ⚙️ .env Faylı Nümunəsi (Konfiqurasiya)
Layihənin kök qovluğunda .env faylı yaradaraq aşağıdakı strukturu qeyd etməlisən:

PORT=3000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here

---

## 🚀 Proqramı necə işə salmalı?
1. Reponu kompüterə yüklə və qovluğu VS Code-da aç.
2. Lazım olan paketləri quraşdır:
npm install
3. Yuxarıdakı nümunəyə uyğun olaraq .env faylını yarat və öz məlumatlarını yaz.
4. Serveri işə sal:
npm run dev

---

## 🧪 Postman ilə Test Etmək üçün Endoint-lər
- POST /auth/register — Qeydiyyat
- POST /auth/login — Giriş (Token almaq üçün)
- GET /room/get — Bütün otaqları görmək
- GET /room/search?checkIn=2026-11-10&checkOut=2026-11-15 — Tarixə görə boş otaqları axtarmaq
- POST /reservation/create — Rezervasiya yaratmaq (Headers-ə Authorization: Bearer <token> əlavə etməyi unutma)
- GET /reservation/my — Öz rezervasiyalarına baxmaq