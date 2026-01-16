# 🚀 دليل التثبيت الكامل - SkyLynx Travel Backend

## الخطوة 1️⃣: إنشاء المجلد

1. أنشئ مجلد جديد اسمه `backend`
2. ضع فيه جميع الملفات التالية

## الخطوة 2️⃣: الملفات المطلوبة

### ملف 1: package.json
```json
{
  "name": "skylynx-travel-backend",
  "version": "1.0.0",
  "description": "SkyLynx Travel Backend API with Duffel Integration",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["travel", "duffel", "flights", "booking"],
  "author": "SkyLynx Travel",
  "license": "ISC",
  "dependencies": {
    "@duffel/api": "^3.0.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "body-parser": "^1.20.2",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### ملف 2: .env
```
DUFFEL_API_TOKEN=ضع_هنا_التوكن_من_Duffel
PORT=3000
NODE_ENV=development
FRONTEND_URL=https://skylynxtravel.com
```

### ملف 3: .gitignore
```
node_modules/
package-lock.json
.env
logs/
*.log
.DS_Store
```

---

## الخطوة 3️⃣: تثبيت Node.js

### Windows:
1. اذهب إلى: https://nodejs.org/
2. حمّل النسخة LTS (الموصى بها)
3. قم بالتثبيت
4. أعد تشغيل الكمبيوتر

### Mac:
```bash
brew install node
```

### للتحقق:
```bash
node --version
npm --version
```

---

## الخطوة 4️⃣: تثبيت المكتبات

افتح Terminal/CMD في مجلد `backend`:

```bash
cd backend
npm install
```

⏳ **انتظر 2-3 دقائق** حتى يكتمل التثبيت

---

## الخطوة 5️⃣: إعداد Duffel Token

1. اذهب إلى: https://app.duffel.com
2. اذهب إلى Settings → API Keys
3. انسخ الـ **Test Token**
4. افتح ملف `.env`
5. استبدل `ضع_هنا_التوكن_من_Duffel` بالـ Token الحقيقي

**مثال:**
```
DUFFEL_API_TOKEN=duffel_test_abc123xyz456def789ghi012jkl345mno678
```

---

## الخطوة 6️⃣: الاختبار

### اختبار الاتصال:
```bash
node test.js
```

**النتيجة المتوقعة:**
```
✅ SUCCESS! Connection to Duffel is working!
📊 Found X offers
```

### تشغيل الخادم:
```bash
npm start
```

**النتيجة المتوقعة:**
```
🚀 SkyLynx Travel API is running on port 3000
📍 Environment: development
🔗 Health check: http://localhost:3000/api/health
```

---

## الخطوة 7️⃣: اختبار API

افتح المتصفح:
```
http://localhost:3000/api/health
```

يجب أن ترى:
```json
{
  "status": "OK",
  "message": "SkyLynx Travel API is running"
}
```

---

## 🎯 الخطوة التالية

بعد نجاح كل الخطوات السابقة:
✅ Backend يشتغل
✅ Duffel متصل
✅ API جاهز

**الآن:** نربط صفحة البحث في موقعك مع الـ API!

---

## ❓ حل المشاكل

### مشكلة 1: Cannot find module
**الحل:**
```bash
npm install
```

### مشكلة 2: Port already in use
**الحل:** غيّر PORT في `.env`:
```
PORT=3001
```

### مشكلة 3: Invalid token
**الحل:**
- تأكد من نسخ Token كامل
- تأكد أنه يبدأ بـ `duffel_test_`
- لا توجد مسافات قبل أو بعد Token

---

## 📞 جاهز؟

بعد إكمال كل الخطوات، أخبرني:
✅ هل نجح الاختبار؟
✅ هل الخادم يشتغل؟

وننتقل للخطوة التالية! 🚀
