# 🚀 دليل نقل Backend إلى Vercel Serverless

## 📦 الملفات الجديدة:

```
vercel-backend/
├── api/
│   ├── health.js              ← Health check endpoint
│   └── flights/
│       ├── search.js          ← البحث عن رحلات
│       └── offer.js           ← تفاصيل العرض
├── package.json
├── vercel.json                ← إعدادات Vercel
└── .gitignore
```

---

## 🎯 الخطوات:

### الخطوة 1️⃣: دمج الملفات مع مشروعك الحالي

#### الطريقة الأولى: مجلد منفصل (موصى بها)

1. افتح مجلد مشروعك الرئيسي على GitHub
2. أنشئ مجلد `api` في الجذر
3. ضع ملفات `api/` فيه
4. ضع `package.json` و `vercel.json` في الجذر

**البنية النهائية:**
```
skylynxtravel/
├── index.html
├── flight-results.html
├── duffel-api.js
├── api/                    ← جديد
│   ├── health.js
│   └── flights/
│       ├── search.js
│       └── offer.js
├── package.json            ← جديد
└── vercel.json             ← جديد
```

---

### الخطوة 2️⃣: رفع على GitHub

**باستخدام GitHub Desktop:**

1. افتح مشروعك في GitHub Desktop
2. ستظهر الملفات الجديدة في القائمة
3. اكتب في الأسفل: `Add Vercel Serverless Backend`
4. اضغط **Commit to main**
5. اضغط **Push origin**

---

### الخطوة 3️⃣: إضافة Environment Variables في Vercel

1. اذهب إلى: **https://vercel.com/dashboard**

2. اختر مشروع `skylynxtravel`

3. اضغط **Settings** → **Environment Variables**

4. أضف المتغير:

**Variable Name:**
```
DUFFEL_API_TOKEN
```

**Value:**
```
duffel_test_your_actual_token_here
```

5. اختر **Production**, **Preview**, **Development** (اختر الكل ✅)

6. اضغط **Save**

---

### الخطوة 4️⃣: إعادة Deploy

بعد إضافة Environment Variable:

1. اذهب إلى **Deployments**

2. اضغط على آخر deployment

3. اضغط **...** (ثلاث نقاط)

4. اختر **Redeploy**

5. اضغط **Redeploy** مرة أخرى للتأكيد

انتظر 2-3 دقائق... ⏳

---

### الخطوة 5️⃣: اختبار API

بعد انتهاء الـ Deployment، اختبر:

```
https://skylynxtravel.com/api/health
```

**يجب أن ترى:**
```json
{
  "status": "OK",
  "message": "SkyLynx Travel API is running",
  "timestamp": "..."
}
```

✅ **إذا شفت هذا، Backend شغال!**

---

### الخطوة 6️⃣: تحديث duffel-api.js

افتح `duffel-api.js` وغيّر السطر الأول:

**من:**
```javascript
const DUFFEL_API_BASE_URL = 'http://localhost:3000/api';
```

**إلى:**
```javascript
const DUFFEL_API_BASE_URL = 'https://skylynxtravel.com/api';
```

---

### الخطوة 7️⃣: رفع التحديث

**في GitHub Desktop:**

1. سيظهر `duffel-api.js` معدّل
2. اكتب: `Update API URL to Vercel`
3. اضغط **Commit to main**
4. اضغط **Push origin**

Vercel سيـ deploy تلقائياً! ✅

---

## 🎉 تم! كل شيء على Vercel الآن!

**المميزات:**
- ✅ Frontend و Backend في مكان واحد
- ✅ مجاني تماماً
- ✅ سريع جداً
- ✅ HTTPS تلقائي
- ✅ Deploy تلقائي مع كل Push

---

## 🧪 الاختبار النهائي:

1. اذهب إلى: **https://skylynxtravel.com**

2. جرّب البحث:
   - From: YOW
   - To: YYZ
   - Date: بعد 2026-01-16

3. اضغط **Search**

4. يجب أن تظهر النتائج! 🎉

---

## 📱 اختبار الجوال:

1. افتح DevTools (F12)
2. Toggle device toolbar
3. اختر iPhone
4. افتح القائمة (☰)
5. تأكد من اللغة والعملة موجودة

---

## 🔍 Troubleshooting:

### المشكلة: API لا يعمل

**الحل:**
1. تأكد من `DUFFEL_API_TOKEN` في Vercel
2. شوف Logs في Vercel Dashboard
3. تأكد من الـ Routes في `vercel.json`

### المشكلة: CORS Error

**الحل:**
تأكد من Headers في ملفات API:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

---

## 💡 ملاحظات:

1. **Serverless Functions** لها حد زمني (10 ثواني على Free Plan)
2. إذا البحث بطيء، Vercel قد يحتاج Upgrade
3. كل Request منفصل (لا يوجد shared state)

---

## 🎯 الخطوة التالية:

بعد نجاح كل شيء:
- ✅ نظام الدفع (Stripe)
- ✅ صفحة معلومات المسافرين
- ✅ Email Confirmation

---

**جاهز! 🚀**
