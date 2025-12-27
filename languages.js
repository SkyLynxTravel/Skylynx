// ملف: js/languages.js
// إدارة اللغات في الموقع

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {
            en: {
                // العامة
                loading: "Loading...",
                error: "An error occurred",
                success: "Success",
                warning: "Warning",
                
                // الأزرار
                save: "Save",
                cancel: "Cancel",
                delete: "Delete",
                edit: "Edit",
                confirm: "Confirm",
                back: "Back",
                next: "Next",
                search: "Search",
                book: "Book Now",
                details: "Details",
                
                // التصنيفات
                flights: "Flights",
                hotels: "Hotels",
                cars: "Cars",
                packages: "Packages",
                
                // رسائل
                noResults: "No results found",
                tryAgain: "Please try again",
                requiredField: "This field is required",
                invalidEmail: "Invalid email address",
                
                // التواريخ
                today: "Today",
                tomorrow: "Tomorrow",
                yesterday: "Yesterday",
                thisWeek: "This Week",
                nextWeek: "Next Week",
                thisMonth: "This Month",
                nextMonth: "Next Month"
            },
            ar: {
                // العامة
                loading: "جاري التحميل...",
                error: "حدث خطأ",
                success: "نجاح",
                warning: "تحذير",
                
                // الأزرار
                save: "حفظ",
                cancel: "إلغاء",
                delete: "حذف",
                edit: "تعديل",
                confirm: "تأكيد",
                back: "رجوع",
                next: "التالي",
                search: "بحث",
                book: "احجز الآن",
                details: "التفاصيل",
                
                // التصنيفات
                flights: "الرحلات",
                hotels: "الفنادق",
                cars: "السيارات",
                packages: "الباقات",
                
                // رسائل
                noResults: "لا توجد نتائج",
                tryAgain: "يرجى المحاولة مرة أخرى",
                requiredField: "هذا الحقل مطلوب",
                invalidEmail: "البريد الإلكتروني غير صحيح",
                
                // التواريخ
                today: "اليوم",
                tomorrow: "غداً",
                yesterday: "أمس",
                thisWeek: "هذا الأسبوع",
                nextWeek: "الأسبوع القادم",
                thisMonth: "هذا الشهر",
                nextMonth: "الشهر القادم"
            }
        };
    }
    
    // تغيير اللغة
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            this.applyTranslations();
            return true;
        }
        return false;
    }
    
    // الحصول على الترجمة
    get(key, params = {}) {
        let translation = this.translations[this.currentLang][key] || 
                         this.translations.en[key] || 
                         key;
        
        // استبدال المعاملات
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    }
    
    // تطبيق الترجمات على الصفحة
    applyTranslations() {
        // تحديث لغة HTML
        document.documentElement.setAttribute('lang', this.currentLang);
        document.documentElement.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        
        // تحديث العناصر التي تحتوي على data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (key) {
                element.textContent = this.get(key);
            }
        });
        
        // تحديث عناصر الـplaceholder
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (key) {
                element.placeholder = this.get(key);
            }
        });
        
        // تحديث عناصر الـtitle
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            if (key) {
                element.title = this.get(key);
            }
        });
        
        // إرسال حدث تغيير اللغة
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        }));
    }
    
    // تهيئة المدير
    init() {
        this.applyTranslations();
        
        // استماع لتغيير اللغة
        const langSelect = document.getElementById('lang-sel');
        if (langSelect) {
            langSelect.value = this.currentLang;
            langSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }
    
    // إضافة ترجمات جديدة
    addTranslations(lang, translations) {
        if (!this.translations[lang]) {
            this.translations[lang] = {};
        }
        Object.assign(this.translations[lang], translations);
    }
}

// إنشاء نسخة من مدير اللغات
const languageManager = new LanguageManager();

// حفظ في النطاق العام
if (typeof window !== 'undefined') {
    window.languageManager = languageManager;
    window.LanguageManager = LanguageManager;
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    languageManager.init();
});