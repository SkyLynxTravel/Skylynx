/**
 * Mobile Menu Fix - إصلاح القائمة المنسدلة في الجوال
 * يضيف اللغة والعملة في القائمة المنسدلة للجوال
 */

document.addEventListener('DOMContentLoaded', function() {
    // إضافة إعدادات اللغة والعملة للقائمة المنسدلة في الجوال
    function addLanguageCurrencyToMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navRight = document.querySelector('.nav-right');
        
        if (!navMenu || !navRight) return;
        
        // التحقق إذا كنا في وضع الجوال
        if (window.innerWidth <= 768) {
            // إضافة nav-right داخل nav-menu في الجوال
            const mobileSettings = navRight.cloneNode(true);
            mobileSettings.classList.add('mobile-settings');
            mobileSettings.style.display = 'flex';
            mobileSettings.style.width = '100%';
            mobileSettings.style.justifyContent = 'center';
            mobileSettings.style.padding = '15px 0';
            mobileSettings.style.borderTop = '1px solid rgba(255,255,255,0.1)';
            mobileSettings.style.marginTop = '10px';
            
            // إزالة أي نسخة سابقة
            const existingMobileSettings = navMenu.querySelector('.mobile-settings');
            if (existingMobileSettings) {
                existingMobileSettings.remove();
            }
            
            // إضافة في نهاية القائمة
            navMenu.appendChild(mobileSettings);
            
            // إضافة event listeners للأزرار الجديدة
            const langBtns = mobileSettings.querySelectorAll('.lang-btn');
            const currBtns = mobileSettings.querySelectorAll('.curr-btn');
            
            langBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    if (window.switchLanguage) {
                        window.switchLanguage(lang);
                    }
                });
            });
            
            currBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const curr = this.getAttribute('data-currency');
                    if (window.switchCurrency) {
                        window.switchCurrency(curr);
                    }
                });
            });
        }
    }
    
    // تنفيذ عند التحميل
    addLanguageCurrencyToMobileMenu();
    
    // تنفيذ عند تغيير حجم النافذة
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            addLanguageCurrencyToMobileMenu();
        }, 250);
    });
    
    // التأكد من ظهور الإعدادات عند فتح القائمة
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            setTimeout(addLanguageCurrencyToMobileMenu, 100);
        });
    }
});
