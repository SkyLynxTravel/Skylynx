# 🚀 دليل ربط الموقع مع Duffel API

## ✅ ما تم إنجازه حتى الآن:
- ✅ Backend API يشتغل على المنفذ 3000
- ✅ الاتصال بـ Duffel ناجح
- ✅ JavaScript files جاهزة

---

## 📦 الملفات الجديدة المطلوبة:

### 1. duffel-api.js
يتعامل مع API calls

### 2. flight-search-handler.js  
يربط نموذج البحث مع Backend

### 3. flight-results-handler.js
يعرض النتائج في صفحة flight-results.html

---

## 🔧 خطوات التثبيت:

### الخطوة 1: رفع الملفات الجديدة

ضع الملفات الثلاثة في **نفس المجلد** مع ملفات الموقع:
```
skylynxtravel.com/
├── index.html
├── flight-results.html
├── duffel-api.js         ← جديد
├── flight-search-handler.js   ← جديد
└── flight-results-handler.js  ← جديد
```

---

### الخطوة 2: تعديل index.html

**افتح ملف index.html** وابحث عن السطر:
```html
</body>
```

**قبل** هذا السطر مباشرة، أضف:
```html
<!-- Duffel API Integration -->
<script src="duffel-api.js"></script>
<script src="flight-search-handler.js"></script>
```

**مثال:**
```html
    <!-- Other scripts -->
    <script src="script.js"></script>
    
    <!-- Duffel API Integration -->
    <script src="duffel-api.js"></script>
    <script src="flight-search-handler.js"></script>
</body>
</html>
```

---

### الخطوة 3: تعديل flight-results.html

**افتح ملف flight-results.html** وابحث عن السطر:
```html
</body>
```

**قبل** هذا السطر مباشرة، أضف:
```html
<!-- Duffel API Integration -->
<script src="duffel-api.js"></script>
<script src="flight-results-handler.js"></script>
```

---

### الخطوة 4: تعديل مهم في duffel-api.js

**عند رفع الموقع على الإنترنت**، افتح `duffel-api.js` وغيّر السطر الأول:

**من:**
```javascript
const DUFFEL_API_BASE_URL = 'http://localhost:3000/api';
```

**إلى:**
```javascript
const DUFFEL_API_BASE_URL = 'https://your-backend-domain.com/api';
```

(استبدل `your-backend-domain.com` بالدومين الحقيقي للـ Backend)

---

## 🧪 اختبار محلي:

### 1. تأكد أن Backend شغّال:
```bash
cd backend
npm start
```

يجب أن ترى:
```
🚀 SkyLynx Travel API is running on port 3000
```

### 2. افتح الموقع:
```
http://localhost/index.html
```
أو باستخدام VS Code Live Server

### 3. جرّب البحث:
- املأ نموذج البحث
- اضغط Search
- يجب أن يتم التحويل إلى صفحة النتائج مع عرض الرحلات!

---

## 🌐 رفع على الإنترنت:

### Backend (Node.js):
يجب رفع Backend على سيرفر يدعم Node.js مثل:
- **Heroku** (مجاني)
- **Railway** (مجاني)
- **Render** (مجاني)
- **DigitalOcean** (مدفوع)
- **AWS / Azure** (مدفوع)

### Frontend (HTML/CSS/JS):
يمكن رفعه على:
- **Netlify** (مجاني) ✅
- **Vercel** (مجاني) ✅
- **GitHub Pages**
- أي استضافة عادية

---

## ⚠️ ملاحظات مهمة:

### CORS Issue:
إذا واجهت مشكلة CORS عند الرفع، تأكد من:

1. في `backend/server.js` السطر:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
```

2. في ملف `.env`:
```
FRONTEND_URL=https://skylynxtravel.com
```

### SSL Certificate:
عند الرفع على الإنترنت، استخدم **HTTPS** للـ Backend والـ Frontend!

---

## 🎯 الخطوة التالية:

بعد نجاح الاختبار المحلي:
1. ✅ رفع Backend على Heroku أو Railway
2. ✅ تحديث `DUFFEL_API_BASE_URL` في duffel-api.js
3. ✅ رفع Frontend على Netlify
4. ✅ الموقع يشتغل مباشرة مع Duffel! 🎉

---

## ❓ مشاكل شائعة:

### المشكلة: "Failed to fetch"
**الحل:** تأكد أن Backend شغّال على localhost:3000

### المشكلة: "No flights found"
**الحل:** تأكد من صحة IATA codes (YOW, YYZ, JFK...)

### المشكلة: "Invalid date"
**الحل:** تأكد أن التاريخ في المستقبل (بعد اليوم)

---

**جاهز للاختبار؟** 🚀
