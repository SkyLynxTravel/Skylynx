# 🚀 دليل التثبيت السريع - SkyLynx Travel + Duffel

## 📦 ما في الملف المضغوط:

### ملفات Frontend:
1. **index.html** - الصفحة الرئيسية (محدثة)
2. **flight-results.html** - صفحة النتائج (متجاوبة مع الجوال)
3. **duffel-api.js** - للتواصل مع Backend
4. **duffel-search-override.js** - يستبدل نظام البحث القديم
5. **mobile-menu-fix.js** - يصلح القائمة في الجوال
6. **flight-results-handler.js** - يعرض نتائج الرحلات
7. **README.md** - دليل شامل

---

## ✅ التحديثات المنجزة:

### 1. القائمة في الجوال:
- ✅ تظهر اللغة (EN/AR)
- ✅ تظهر العملة (USD/CAD/etc.)
- ✅ جميع الأزرار تعمل

### 2. نموذج البحث:
- ✅ يستخدم Duffel API للرحلات
- ✅ يحتفظ بـ TravelPayouts للخدمات الأخرى
- ✅ رسائل خطأ بالعربية والإنجليزية

### 3. صفحة النتائج:
- ✅ تصميم احترافي
- ✅ متجاوبة 100% مع الجوال
- ✅ معلومات واضحة عن الرحلات

---

## 🔧 التثبيت:

### الخطوة 1: فك الضغط
فك ضغط `skylynx-duffel-integrated.zip`

### الخطوة 2: رفع الملفات
ارفع جميع الملفات إلى GitHub:

```bash
git add .
git commit -m "Add Duffel integration + mobile fixes"
git push
```

Vercel سيـ deploy تلقائياً!

### الخطوة 3: Backend
لديك خياران:

#### الخيار A: Railway (أسهل - مجاني)
1. اذهب إلى https://railway.app
2. New Project → Deploy from GitHub
3. اختر مجلد `backend`
4. أضف Environment Variables:
   ```
   DUFFEL_API_TOKEN=duffel_test_your_token
   PORT=3000
   FRONTEND_URL=https://skylynxtravel.com
   ```
5. انسخ الرابط: `https://your-app.up.railway.app`

#### الخيار B: Vercel Serverless (متقدم)
يحتاج إعادة هيكلة - سأساعدك إذا أردت

### الخطوة 4: تحديث الرابط
افتح `duffel-api.js` وغيّر السطر الأول:

```javascript
const DUFFEL_API_BASE_URL = 'https://your-app.up.railway.app/api';
```

ثم:
```bash
git add duffel-api.js
git commit -m "Update API URL"
git push
```

---

## 🧪 الاختبار:

### محلياً:
1. شغّل Backend:
```bash
cd backend
npm start
```

2. افتح `index.html` في المتصفح

3. جرّب البحث:
   - From: YOW
   - To: YYZ
   - Date: أي تاريخ بعد 2026-01-16

### على الجوال:
1. افتح DevTools (F12)
2. اضغط أيقونة الجوال
3. افتح القائمة (☰)
4. تأكد من وجود اللغة والعملة

---

## 💡 ملاحظات:

1. **Backend لازم يكون شغال** عشان البحث يشتغل
2. **استخدم HTTPS** للـ Backend والـ Frontend
3. **Test Mode** في البداية
4. **لا تشارك** Duffel Token مع أحد

---

## 📱 اختبار الجوال الشامل:

- [ ] القائمة المنسدلة تفتح
- [ ] خيار اللغة موجود
- [ ] خيار العملة موجود
- [ ] نموذج البحث يعمل
- [ ] صفحة النتائج تظهر بشكل صحيح
- [ ] الأزرار تعمل

---

## ❓ مشاكل؟

**"Failed to fetch"**
→ Backend مو شغال

**"No flights found"**
→ تأكد من التاريخ والـ IATA codes

**"القائمة ما تظهر اللغة"**
→ تأكد من تحميل `mobile-menu-fix.js`

---

## 🎯 الخطوة التالية:

بعد نجاح الاختبار:
1. رفع Backend على Railway
2. تحديث رابط API
3. الموقع يشتغل مباشرة! 🎉

---

**محتاج مساعدة؟ أنا هنا! 🚀**
