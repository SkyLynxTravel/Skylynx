// ملف شريط قبول ملفات تعريف الارتباط - نسخة SkyLynx Travel
(function() {
    'use strict';
    
    // تهيئة SkyLynx Cookie Banner
    function initSkyLynxCookieBanner() {
        // التحقق إذا تم القبول مسبقاً
        if (localStorage.getItem('skylynx_cookies_accepted') === 'true') {
            loadTrackingScripts();
            return;
        }
        
        // إنشاء شريط الكوكيز بنفس تصميم SkyLynx
        const bannerHTML = `
            <div id="skylynxCookieBanner" style="
                position: fixed;
                bottom: 30px;
                left: 30px;
                right: 30px;
                max-width: 450px;
                background: rgba(0, 17, 28, 0.98);
                backdrop-filter: blur(20px);
                padding: 25px;
                border-radius: 15px;
                border: 1px solid rgba(0, 166, 251, 0.3);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
                z-index: 9999;
                font-family: 'Montserrat', sans-serif;
                animation: bannerSlideUp 0.5s ease-out;
                color: white;
                overflow: hidden;
            ">
                <div style="position: relative;">
                    <!-- AI Badge -->
                    <div style="
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        background: linear-gradient(135deg, #9d4edd, #2ec4b6);
                        color: white;
                        padding: 5px 12px;
                        border-radius: 15px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    ">
                        <i class="fas fa-brain" style="font-size: 0.8rem;"></i>
                        <span>AI-Powered</span>
                    </div>
                    
                    <!-- Header -->
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                        <div style="
                            background: rgba(0, 166, 251, 0.2);
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">
                            <i class="fas fa-cookie-bite" style="color: #00a6fb; font-size: 1.2rem;"></i>
                        </div>
                        <h3 style="margin: 0; color: #00a6fb; font-size: 1.1rem; font-weight: 700;">
                            Cookie Preferences
                        </h3>
                    </div>
                    
                    <!-- Message -->
                    <p style="
                        margin: 0 0 20px 0;
                        color: #e0e1dd;
                        font-size: 0.9rem;
                        line-height: 1.5;
                    ">
                        SkyLynx Travel uses cookies to enhance your experience, analyze site traffic, 
                        and deliver personalized content. By continuing to browse, you agree to our use of cookies.
                    </p>
                    
                    <!-- Cookie Types -->
                    <div style="
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 10px;
                        padding: 15px;
                        margin-bottom: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 0.85rem; font-weight: 600; color: #e0e1dd;">
                                Essential Cookies
                            </span>
                            <div style="
                                background: rgba(16, 185, 129, 0.2);
                                color: #10b981;
                                padding: 3px 10px;
                                border-radius: 12px;
                                font-size: 0.75rem;
                                font-weight: 600;
                            ">
                                Always On
                            </div>
                        </div>
                        <p style="margin: 0; font-size: 0.8rem; color: rgba(224, 225, 221, 0.7);">
                            Required for the site to function properly
                        </p>
                    </div>
                    
                    <!-- Buttons -->
                    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <button id="skylynxAcceptAll" style="
                            flex: 1;
                            padding: 12px 20px;
                            background: linear-gradient(135deg, #00a6fb, #0066cc);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                            transition: all 0.3s;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            min-width: 140px;
                        ">
                            <i class="fas fa-check"></i>
                            <span>Accept All</span>
                        </button>
                        
                        <button id="skylynxCustomize" style="
                            flex: 1;
                            padding: 12px 20px;
                            background: rgba(255, 255, 255, 0.05);
                            color: #e0e1dd;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                            transition: all 0.3s;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            min-width: 140px;
                        ">
                            <i class="fas fa-sliders-h"></i>
                            <span>Customize</span>
                        </button>
                        
                        <a href="/cookie-policy.html" style="
                            color: #00a6fb;
                            text-decoration: none;
                            font-size: 0.85rem;
                            padding: 12px 15px;
                            align-self: center;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                        ">
                            <i class="fas fa-info-circle"></i>
                            <span>Learn More</span>
                        </a>
                    </div>
                    
                    <!-- SkyLynx Signature -->
                    <div style="
                        text-align: center;
                        margin-top: 15px;
                        padding-top: 15px;
                        border-top: 1px solid rgba(255, 255, 255, 0.05);
                        font-size: 0.75rem;
                        color: rgba(224, 225, 221, 0.5);
                    ">
                        <i class="fas fa-robot" style="color: #2ec4b6; margin-right: 5px;"></i>
                        SkyLynx AI 3.0 • Privacy First
                    </div>
                </div>
            </div>
        `;
        
        // إضافة الشريط للصفحة
        const div = document.createElement('div');
        div.innerHTML = bannerHTML;
        document.body.appendChild(div.firstElementChild);
        
        // تعريف المتغيرات
        const cookieBanner = document.getElementById('skylynxCookieBanner');
        const acceptAllBtn = document.getElementById('skylynxAcceptAll');
        const customizeBtn = document.getElementById('skylynxCustomize');
        
        // قبول جميع الكوكيز
        acceptAllBtn.addEventListener('click', function() {
            acceptAllCookies();
            hideCookieBanner();
        });
        
        // تخصيص الكوكيز
        customizeBtn.addEventListener('click', function() {
            showCookieSettings();
        });
        
        // إخفاء عند النقر خارج الشريط
        document.addEventListener('click', function(event) {
            if (cookieBanner && !cookieBanner.contains(event.target)) {
                // يمكنك إضافة منطق هنا إذا أردت
            }
        });
        
        // CSS Animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bannerSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            #skylynxCookieBanner button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 166, 251, 0.2);
            }
            
            #skylynxCookieBanner a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }
    
    // نافذة تخصيص الكوكيز
    function showCookieSettings() {
        const settingsHTML = `
            <div id="cookieSettingsModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 8, 16, 0.95);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                animation: modalFadeIn 0.3s ease-out;
            ">
                <div style="
                    background: rgba(0, 17, 28, 0.98);
                    backdrop-filter: blur(30px);
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 1px solid rgba(0, 166, 251, 0.3);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                    position: relative;
                ">
                    <!-- Header -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                        <h3 style="margin: 0; color: #00a6fb; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-sliders-h"></i>
                            <span>Cookie Settings</span>
                        </h3>
                        <button id="closeSettings" style="
                            background: none;
                            border: none;
                            color: #e0e1dd;
                            font-size: 1.2rem;
                            cursor: pointer;
                            padding: 5px;
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s;
                        ">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Essential Cookies -->
                    <div style="
                        background: rgba(16, 185, 129, 0.1);
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 20px;
                        border: 1px solid rgba(16, 185, 129, 0.2);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div>
                                <h4 style="margin: 0; color: #10b981; font-size: 1rem; margin-bottom: 5px;">
                                    Essential Cookies
                                </h4>
                                <p style="margin: 0; font-size: 0.85rem; color: rgba(224, 225, 221, 0.8);">
                                    Required for website functionality
                                </p>
                            </div>
                            <div style="
                                background: rgba(16, 185, 129, 0.2);
                                color: #10b981;
                                padding: 5px 15px;
                                border-radius: 15px;
                                font-size: 0.85rem;
                                font-weight: 600;
                            ">
                                Always Active
                            </div>
                        </div>
                        <p style="font-size: 0.85rem; color: rgba(224, 225, 221, 0.7); margin-top: 10px; line-height: 1.5;">
                            These cookies are necessary for the website to function and cannot be switched off. 
                            They are usually only set in response to actions made by you.
                        </p>
                    </div>
                    
                    <!-- Analytics Cookies -->
                    <div style="
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div>
                                <h4 style="margin: 0; color: #e0e1dd; font-size: 1rem; margin-bottom: 5px;">
                                    Analytics Cookies
                                </h4>
                                <p style="margin: 0; font-size: 0.85rem; color: rgba(224, 225, 221, 0.8);">
                                    Help us improve our website
                                </p>
                            </div>
                            <label style="display: inline-block; position: relative; width: 50px; height: 26px;">
                                <input type="checkbox" id="analyticsToggle" style="display: none;">
                                <span style="
                                    position: absolute;
                                    cursor: pointer;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background-color: rgba(255, 255, 255, 0.1);
                                    transition: .4s;
                                    border-radius: 34px;
                                "></span>
                                <span style="
                                    position: absolute;
                                    content: '';
                                    height: 18px;
                                    width: 18px;
                                    left: 4px;
                                    bottom: 4px;
                                    background-color: white;
                                    transition: .4s;
                                    border-radius: 50%;
                                "></span>
                            </label>
                        </div>
                        <p style="font-size: 0.85rem; color: rgba(224, 225, 221, 0.7); margin-top: 10px; line-height: 1.5;">
                            These cookies allow us to count visits and traffic sources so we can measure and improve site performance.
                        </p>
                    </div>
                    
                    <!-- Marketing Cookies -->
                    <div style="
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 30px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div>
                                <h4 style="margin: 0; color: #e0e1dd; font-size: 1rem; margin-bottom: 5px;">
                                    Marketing Cookies
                                </h4>
                                <p style="margin: 0; font-size: 0.85rem; color: rgba(224, 225, 221, 0.8);">
                                    Personalize your experience
                                </p>
                            </div>
                            <label style="display: inline-block; position: relative; width: 50px; height: 26px;">
                                <input type="checkbox" id="marketingToggle" style="display: none;">
                                <span style="
                                    position: absolute;
                                    cursor: pointer;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background-color: rgba(255, 255, 255, 0.1);
                                    transition: .4s;
                                    border-radius: 34px;
                                "></span>
                                <span style="
                                    position: absolute;
                                    content: '';
                                    height: 18px;
                                    width: 18px;
                                    left: 4px;
                                    bottom: 4px;
                                    background-color: white;
                                    transition: .4s;
                                    border-radius: 50%;
                                "></span>
                            </label>
                        </div>
                        <p style="font-size: 0.85rem; color: rgba(224, 225, 221, 0.7); margin-top: 10px; line-height: 1.5;">
                            These cookies help us show you relevant travel offers and personalize your experience.
                        </p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="saveSettings" style="
                            padding: 12px 25px;
                            background: linear-gradient(135deg, #00a6fb, #0066cc);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                            transition: all 0.3s;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <i class="fas fa-save"></i>
                            <span>Save Preferences</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                #cookieSettingsModal input:checked + span {
                    background-color: #00a6fb;
                }
                
                #cookieSettingsModal input:checked + span:before {
                    transform: translateX(24px);
                }
                
                #cookieSettingsModal button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 166, 251, 0.2);
                }
                
                #closeSettings:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            </style>
        `;
        
        // إضافة النافذة للصفحة
        const settingsDiv = document.createElement('div');
        settingsDiv.innerHTML = settingsHTML;
        document.body.appendChild(settingsDiv.firstElementChild);
        
        // إغلاق النافذة
        document.getElementById('closeSettings').addEventListener('click', function() {
            document.getElementById('cookieSettingsModal').remove();
        });
        
        // حفظ الإعدادات
        document.getElementById('saveSettings').addEventListener('click', function() {
            const analytics = document.getElementById('analyticsToggle').checked;
            const marketing = document.getElementById('marketingToggle').checked;
            
            saveCookiePreferences(analytics, marketing);
            document.getElementById('cookieSettingsModal').remove();
            hideCookieBanner();
        });
        
        // تهيئة التبديلات
        setTimeout(() => {
            const prefs = getCookiePreferences();
            document.getElementById('analyticsToggle').checked = prefs.analytics;
            document.getElementById('marketingToggle').checked = prefs.marketing;
        }, 100);
    }
    
    // قبول جميع الكوكيز
    function acceptAllCookies() {
        localStorage.setItem('skylynx_cookies_accepted', 'true');
        localStorage.setItem('skylynx_cookies_date', new Date().toISOString());
        localStorage.setItem('skylynx_cookies_analytics', 'true');
        localStorage.setItem('skylynx_cookies_marketing', 'true');
        
        loadTrackingScripts();
        
        console.log('✅ SkyLynx: All cookies accepted');
        showAcceptanceMessage();
    }
    
    // حفظ تفضيلات الكوكيز
    function saveCookiePreferences(analytics, marketing) {
        localStorage.setItem('skylynx_cookies_accepted', 'true');
        localStorage.setItem('skylynx_cookies_date', new Date().toISOString());
        localStorage.setItem('skylynx_cookies_analytics', analytics.toString());
        localStorage.setItem('skylynx_cookies_marketing', marketing.toString());
        
        if (analytics || marketing) {
            loadTrackingScripts(analytics, marketing);
        }
        
        console.log(`✅ SkyLynx: Cookies preferences saved - Analytics: ${analytics}, Marketing: ${marketing}`);
        showAcceptanceMessage();
    }
    
    // الحصول على تفضيلات الكوكيز
    function getCookiePreferences() {
        return {
            accepted: localStorage.getItem('skylynx_cookies_accepted') === 'true',
            analytics: localStorage.getItem('skylynx_cookies_analytics') === 'true',
            marketing: localStorage.getItem('skylynx_cookies_marketing') === 'true'
        };
    }
    
    // إخفاء شريط الكوكيز
    function hideCookieBanner() {
        const banner = document.getElementById('skylynxCookieBanner');
        if (banner) {
            banner.style.animation = 'bannerSlideUp 0.5s ease-out reverse';
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 500);
        }
    }
    
    // تحميل سكريبتات التتبع
    function loadTrackingScripts(analytics = true, marketing = true) {
        console.log('📊 SkyLynx: Loading tracking scripts...');
        
        // هنا يمكنك إضافة سكريبتات التتبع الخاصة بك
        
        if (analytics) {
            // Google Analytics
            console.log('   → Loading analytics scripts');
            /*
            const gaScript = document.createElement('script');
            gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
            gaScript.async = true;
            document.head.appendChild(gaScript);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
            */
        }
        
        if (marketing) {
            // Awin Tracking
            console.log('   → Loading marketing scripts');
            /*
            const awinScript = document.createElement('script');
            awinScript.src = 'https://www.dwin1.com/XXXXX.js';
            awinScript.async = true;
            document.head.appendChild(awinScript);
            */
        }
    }
    
    // عرض رسالة القبول
    function showAcceptanceMessage() {
        // يمكنك إضافة رسالة تأكيد هنا إذا أردت
        console.log('🍪 SkyLynx: Cookie preferences saved successfully');
    }
    
    // التحقق من حالة الكوكيز عند تحميل الصفحة
    function checkCookieStatus() {
        const prefs = getCookiePreferences();
        
        if (prefs.accepted) {
            console.log(`🍪 SkyLynx: Cookies accepted - Analytics: ${prefs.analytics}, Marketing: ${prefs.marketing}`);
            loadTrackingScripts(prefs.analytics, prefs.marketing);
            return true;
        }
        
        return false;
    }
    
    // تهيئة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🌐 SkyLynx Cookie System Initializing...');
        
        // التحقق أولاً من حالة القبول
        const alreadyAccepted = checkCookieStatus();
        
        // إذا لم يتم القبول مسبقاً، عرض الشريط
        if (!alreadyAccepted) {
            // تأخير عرض الشريط قليلاً لتحسين تجربة المستخدم
            setTimeout(() => {
                initSkyLynxCookieBanner();
                console.log('🎯 SkyLynx Cookie Banner displayed');
            }, 1500);
        }
    });
    
    // جعل الدوال متاحة عالمياً
    window.SkyLynxCookies = {
        acceptAll: acceptAllCookies,
        showSettings: showCookieSettings,
        getPreferences: getCookiePreferences,
        hideBanner: hideCookieBanner
    };
    
})();