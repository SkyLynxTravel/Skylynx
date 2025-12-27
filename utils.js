// ملف: js/utils.js
// أدوات مساعدة للموقع

const Utils = {
    // تنسيق العملة
    formatCurrency: function(amount, currency = 'CAD') {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        return formatter.format(amount);
    },
    
    // تنسيق التاريخ
    formatDate: function(dateString, lang = 'en') {
        const date = new Date(dateString);
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-CA', options);
    },
    
    // تنسيق الوقت
    formatTime: function(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    },
    
    // استخراج كود المطار
    extractAirportCode: function(locationString) {
        const match = locationString.match(/\(([A-Z]{3})\)/);
        return match ? match[1] : locationString;
    },
    
    // تحويل دقائق إلى ساعات ودقائق
    minutesToDuration: function(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    },
    
    // توليد رقم عشوائي
    generateRandomId: function(prefix = '') {
        return prefix + Math.random().toString(36).substr(2, 9).toUpperCase();
    },
    
    // نسخ إلى الحافظة
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    },
    
    // إظهار رسالة
    showMessage: function(message, type = 'info') {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#00a6fb'
        };
        
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
        
        // إضافة الأنيميشن إذا لم تكن موجودة
        if (!document.querySelector('#messageStyles')) {
            const style = document.createElement('style');
            style.id = 'messageStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // تحميل JSON من ملف
    async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error loading JSON:', error);
            return null;
        }
    },
    
    // حفظ في localStorage مع توقيت انتهاء
    setLocalStorageWithExpiry: function(key, value, ttl = 3600000) { // ساعة واحدة افتراضياً
        const item = {
            value: value,
            expiry: Date.now() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    
    // الحصول من localStorage مع التحقق من الصلاحية
    getLocalStorageWithExpiry: function(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }
};

// حفظ في النطاق العام
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}