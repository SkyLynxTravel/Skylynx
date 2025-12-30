/**
 * SkyLynx Travel - Advanced Tracking System
 * Compatible with Awin, Travelpayouts, and Google Analytics
 * AI-Powered Tracking & Analytics
 */

// ========== CONFIGURATION ==========
const SkyLynxTracking = {
    // إعدادات التتبع
    config: {
        awinAdvertiserId: 'YOUR_AWIN_ADVERTISER_ID', // سيتم استبدالها عند التسجيل في Awin
        travelpayoutsMarker: 'YOUR_TRAVELPAYOUTS_MARKER', // سيتم استبدالها عند التسجيل في Travelpayouts
        googleAnalyticsId: 'G-XXXXXXXXXX', // سيتم استبدالها عند إعداد Google Analytics
        
        // الإعدادات الافتراضية
        autoTrackOutboundLinks: true,
        trackPageViews: true,
        trackUserEngagement: true,
        trackAffiliateClicks: true,
        
        // إعدادات الخصوصية
        respectDoNotTrack: true,
        anonymizeIP: true,
        cookieDuration: 90, // أيام
    },
    
    // حالة التتبع
    state: {
        cookiesAccepted: false,
        trackingEnabled: false,
        userConsent: {
            essential: true,
            analytics: false,
            marketing: false
        },
        userSession: {
            sessionId: null,
            userId: null,
            pageViews: 0,
            firstVisit: null,
            lastVisit: null
        }
    },
    
    // ========== INITIALIZATION ==========
    init: function() {
        console.log('🚀 SkyLynx Tracking System Initializing...');
        
        // التحقق من موافقة الكوكيز
        this.checkCookieConsent();
        
        // إذا كانت الموافقة غير كافية، لا نقوم بالتتبع
        if (!this.state.cookiesAccepted) {
            console.log('⚠️ Tracking paused: Cookie consent required');
            return;
        }
        
        // تهيئة جلسة المستخدم
        this.initUserSession();
        
        // تهيئة أنظمة التتبع
        this.initTrackingSystems();
        
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
        
        // تتبع مشاهدة الصفحة الأولى
        if (this.config.trackPageViews && this.state.userConsent.analytics) {
            this.trackPageView();
        }
        
        console.log('✅ SkyLynx Tracking System Ready');
        console.log('📊 Tracking Status:', {
            analytics: this.state.userConsent.analytics,
            marketing: this.state.userConsent.marketing,
            session: this.state.userSession.sessionId
        });
    },
    
    // ========== COOKIE CONSENT CHECK ==========
    checkCookieConsent: function() {
        const consent = localStorage.getItem('skylynx_cookies_accepted');
        const analytics = localStorage.getItem('skylynx_cookies_analytics');
        const marketing = localStorage.getItem('skylynx_cookies_marketing');
        
        this.state.cookiesAccepted = consent === 'true';
        this.state.userConsent.analytics = analytics === 'true';
        this.state.userConsent.marketing = marketing === 'true';
        
        // الكوكيز الأساسية دائماً مفعلة
        this.state.userConsent.essential = true;
        
        // إذا كان التتبع التسويقي مفعلاً، فعّل التحليلات أيضاً
        if (this.state.userConsent.marketing) {
            this.state.userConsent.analytics = true;
        }
        
        this.state.trackingEnabled = this.state.userConsent.analytics || this.state.userConsent.marketing;
    },
    
    // ========== USER SESSION MANAGEMENT ==========
    initUserSession: function() {
        // إنشاء/استرجاع معرف الجلسة
        let sessionId = localStorage.getItem('skylynx_session_id');
        if (!sessionId) {
            sessionId = this.generateSessionId();
            localStorage.setItem('skylynx_session_id', sessionId);
            localStorage.setItem('skylynx_first_visit', new Date().toISOString());
        }
        
        // إنشاء/استرجاع معرف المستخدم
        let userId = localStorage.getItem('skylynx_user_id');
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('skylynx_user_id', userId);
        }
        
        // تحديث آخر زيارة
        localStorage.setItem('skylynx_last_visit', new Date().toISOString());
        
        // تحديث حالة الجلسة
        this.state.userSession = {
            sessionId: sessionId,
            userId: userId,
            pageViews: parseInt(localStorage.getItem('skylynx_page_views') || '0'),
            firstVisit: localStorage.getItem('skylynx_first_visit'),
            lastVisit: localStorage.getItem('skylynx_last_visit')
        };
    },
    
    generateSessionId: function() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    },
    
    generateUserId: function() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    },
    
    // ========== TRACKING SYSTEMS INITIALIZATION ==========
    initTrackingSystems: function() {
        // تحميل أنظمة التتبع حسب الموافقة
        if (this.state.userConsent.analytics) {
            this.loadAnalyticsTracking();
        }
        
        if (this.state.userConsent.marketing) {
            this.loadMarketingTracking();
        }
        
        // تحميل التتبع الأساسي (دائماً)
        this.loadEssentialTracking();
    },
    
    loadAnalyticsTracking: function() {
        console.log('📈 Loading analytics tracking...');
        
        // Google Analytics
        if (this.config.googleAnalyticsId && this.config.googleAnalyticsId !== 'G-XXXXXXXXXX') {
            this.loadGoogleAnalytics();
        }
        
        // يمكن إضافة أنظمة تحليلات أخرى هنا
    },
    
    loadMarketingTracking: function() {
        console.log('🎯 Loading marketing tracking...');
        
        // Awin Tracking
        if (this.config.awinAdvertiserId && this.config.awinAdvertiserId !== 'YOUR_AWIN_ADVERTISER_ID') {
            this.loadAwinTracking();
        }
        
        // Travelpayouts Tracking
        if (this.config.travelpayoutsMarker && this.config.travelpayoutsMarker !== 'YOUR_TRAVELPAYOUTS_MARKER') {
            this.loadTravelpayoutsTracking();
        }
    },
    
    loadEssentialTracking: function() {
        console.log('🔧 Loading essential tracking...');
        
        // يمكن إضافة تتبع أساسي هنا إذا لزم الأمر
    },
    
    // ========== GOOGLE ANALYTICS ==========
    loadGoogleAnalytics: function() {
        if (typeof gtag === 'undefined') {
            // تحميل gtag.js
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
            script.async = true;
            document.head.appendChild(script);
            
            // تهيئة dataLayer
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // إعدادات الخصوصية
            gtag('config', this.config.googleAnalyticsId, {
                'anonymize_ip': this.config.anonymizeIP,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false,
                'restricted_data_processing': this.config.respectDoNotTrack,
                'client_storage': 'none',
                'custom_map': {
                    'dimension1': 'user_id',
                    'dimension2': 'session_id'
                }
            });
            
            // إرسال بيانات المستخدم
            gtag('set', 'user_properties', {
                'user_id': this.state.userSession.userId,
                'session_id': this.state.userSession.sessionId
            });
            
            console.log('✅ Google Analytics loaded');
        }
    },
    
    // ========== AWIN TRACKING ==========
    loadAwinTracking: function() {
        // تحميل سكريبت Awin
        const awinScript = document.createElement('script');
        awinScript.src = `https://www.dwin1.com/${this.config.awinAdvertiserId}.js`;
        awinScript.async = true;
        awinScript.defer = true;
        document.head.appendChild(awinScript);
        
        console.log('✅ Awin tracking loaded');
        
        // معالجة الروابط التابعة لـ Awin
        this.processAwinLinks();
    },
    
    processAwinLinks: function() {
        // البحث عن روابط Awin وإضافة معلمات التتبع
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // التحقق إذا كان الرابط من شركاء Awin
            const awinDomains = [
                'booking.com',
                'expedia.com',
                'hotels.com',
                'agoda.com',
                'vrbo.com'
            ];
            
            const isAwinPartner = awinDomains.some(domain => href.includes(domain));
            
            if (isAwinPartner && !href.includes('awinaffiliate')) {
                e.preventDefault();
                
                // إضافة معلمات التتبع
                const separator = href.includes('?') ? '&' : '?';
                const trackedUrl = `${href}${separator}awinaffiliate=${this.config.awinAdvertiserId}&clickref=skylynx&clickref2=web`;
                
                // تسجيل النقر
                this.trackAffiliateClick('awin', link.textContent || link.getAttribute('title') || 'Awin Link');
                
                // الانتقال للرابط بعد التسجيل
                setTimeout(() => {
                    window.open(trackedUrl, '_blank');
                }, 100);
            }
        });
    },
    
    // ========== TRAVELPAYOUTS TRACKING ==========
    loadTravelpayoutsTracking: function() {
        console.log('✅ Travelpayouts tracking loaded');
        
        // معالجة روابط Travelpayouts
        this.processTravelpayoutsLinks();
    },
    
    processTravelpayoutsLinks: function() {
        // تحديث الروابط التابعة لـ Travelpayouts
        const travelpayoutsDomains = [
            'kiwi.com',
            'aviasales.com',
            'hotellook.com',
            'jetradar.com',
            'omio.com'
        ];
        
        // البحث عن الروابط وإضافة marker
        setInterval(() => {
            document.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href');
                if (!href) return;
                
                travelpayoutsDomains.forEach(domain => {
                    if (href.includes(domain) && !href.includes('marker=')) {
                        const separator = href.includes('?') ? '&' : '?';
                        const trackedUrl = `${href}${separator}marker=${this.config.travelpayoutsMarker}&utm_source=skylynx&utm_medium=affiliate`;
                        link.setAttribute('href', trackedUrl);
                        
                        // إضافة مستمع للنقر
                        if (!link.hasAttribute('data-tp-tracked')) {
                            link.setAttribute('data-tp-tracked', 'true');
                            link.addEventListener('click', () => {
                                this.trackAffiliateClick('travelpayouts', link.textContent || domain);
                            });
                        }
                    }
                });
            });
        }, 2000);
    },
    
    // ========== EVENT TRACKING ==========
    setupEventListeners: function() {
        // تتبع النقر على الروابط الخارجية
        if (this.config.autoTrackOutboundLinks) {
            this.trackOutboundLinks();
        }
        
        // تتبع تفاعل المستخدم
        if (this.config.trackUserEngagement) {
            this.trackUserEngagement();
        }
        
        // تتبع النقر على الروابط التابعة
        if (this.config.trackAffiliateClicks) {
            this.trackAffiliateClicks();
        }
    },
    
    trackOutboundLinks: function() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // التحقق إذا كان رابط خارجي
            const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
            
            if (isExternal && this.state.userConsent.analytics) {
                this.trackEvent('outbound_click', {
                    url: href,
                    text: link.textContent.substring(0, 100),
                    domain: new URL(href).hostname
                });
            }
        });
    },
    
    trackUserEngagement: function() {
        // تتبع الوقت على الصفحة
        let pageStartTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            if (this.state.userConsent.analytics) {
                const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
                if (timeSpent > 2) { // تجاهل الزيارات السريعة جداً
                    this.trackEvent('page_engagement', {
                        time_spent_seconds: timeSpent,
                        page_url: window.location.pathname
                    });
                }
            }
        });
        
        // تتبع التمرير
        let scrollTracked = false;
        window.addEventListener('scroll', () => {
            if (!scrollTracked && this.state.userConsent.analytics) {
                const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > 50) {
                    this.trackEvent('scroll_depth', {
                        scroll_percent: scrollPercent,
                        page_url: window.location.pathname
                    });
                    scrollTracked = true;
                }
            }
        });
    },
    
    trackAffiliateClicks: function() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // التحقق إذا كان رابط تابع
            const isAffiliate = href.includes('awinaffiliate=') || 
                               href.includes('marker=') || 
                               href.includes('ref=') ||
                               link.classList.contains('affiliate-link');
            
            if (isAffiliate && this.state.userConsent.marketing) {
                // تحديد نوع الشريك
                let partner = 'unknown';
                if (href.includes('awinaffiliate=')) partner = 'awin';
                if (href.includes('marker=')) partner = 'travelpayouts';
                if (href.includes('booking.com')) partner = 'booking.com';
                if (href.includes('expedia.com')) partner = 'expedia';
                
                this.trackAffiliateClick(partner, link.textContent.substring(0, 100));
            }
        });
    },
    
    // ========== TRACKING FUNCTIONS ==========
    trackPageView: function() {
        // تحديث عداد مشاهدات الصفحة
        const pageViews = this.state.userSession.pageViews + 1;
        this.state.userSession.pageViews = pageViews;
        localStorage.setItem('skylynx_page_views', pageViews.toString());
        
        // تتبع Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
                user_id: this.state.userSession.userId,
                session_id: this.state.userSession.sessionId
            });
        }
        
        console.log(`📄 Page view tracked: ${window.location.pathname} (View #${pageViews})`);
    },
    
    trackEvent: function(eventName, eventParams = {}) {
        if (!this.state.trackingEnabled) return;
        
        // إضافة بيانات الجلسة
        const fullParams = {
            ...eventParams,
            user_id: this.state.userSession.userId,
            session_id: this.state.userSession.sessionId,
            timestamp: new Date().toISOString()
        };
        
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, fullParams);
        }
        
        // تسجيل في الكونسول (للتحقق)
        console.log(`📊 Event tracked: ${eventName}`, fullParams);
        
        // حفظ في localStorage للتحليل لاحقاً
        this.saveEventToStorage(eventName, fullParams);
    },
    
    trackAffiliateClick: function(partner, linkText) {
        if (!this.state.userConsent.marketing) return;
        
        const eventData = {
            partner: partner,
            link_text: linkText,
            page_url: window.location.pathname,
            timestamp: new Date().toISOString(),
            user_id: this.state.userSession.userId
        };
        
        // تتبع في Google Analytics
        this.trackEvent('affiliate_click', eventData);
        
        // تسجيل خاص للشركاء
        console.log(`🛒 Affiliate click tracked: ${partner} - "${linkText}"`);
        
        // حفظ في localStorage للعمولات
        this.saveAffiliateClick(eventData);
    },
    
    // ========== DATA STORAGE ==========
    saveEventToStorage: function(eventName, eventData) {
        try {
            const storageKey = 'skylynx_events';
            let events = JSON.parse(localStorage.getItem(storageKey) || '[]');
            
            // الاحتفاظ فقط بـ 100 حدث آخر
            events.push({ event: eventName, data: eventData, timestamp: new Date().toISOString() });
            if (events.length > 100) {
                events = events.slice(-100);
            }
            
            localStorage.setItem(storageKey, JSON.stringify(events));
        } catch (e) {
            console.error('Error saving event to storage:', e);
        }
    },
    
    saveAffiliateClick: function(clickData) {
        try {
            const storageKey = 'skylynx_affiliate_clicks';
            let clicks = JSON.parse(localStorage.getItem(storageKey) || '[]');
            
            clicks.push(clickData);
            if (clicks.length > 50) {
                clicks = clicks.slice(-50);
            }
            
            localStorage.setItem(storageKey, JSON.stringify(clicks));
        } catch (e) {
            console.error('Error saving affiliate click:', e);
        }
    },
    
    // ========== UTILITY FUNCTIONS ==========
    updateConfig: function(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('🔄 Tracking config updated:', newConfig);
    },
    
    getTrackingData: function() {
        return {
            config: this.config,
            state: this.state,
            userSession: this.state.userSession
        };
    },
    
    resetTracking: function() {
        // إزالة بيانات التتبع من localStorage
        const keysToRemove = [
            'skylynx_session_id',
            'skylynx_user_id',
            'skylynx_page_views',
            'skylynx_first_visit',
            'skylynx_last_visit',
            'skylynx_events',
            'skylynx_affiliate_clicks'
        ];
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // إعادة تعيين الحالة
        this.state.userSession = {
            sessionId: null,
            userId: null,
            pageViews: 0,
            firstVisit: null,
            lastVisit: null
        };
        
        console.log('🔄 Tracking data reset');
    },
    
    // ========== GDPR/PRIVACY COMPLIANCE ==========
    exportUserData: function() {
        // تصدير جميع بيانات المستخدم
        const userData = {
            userId: this.state.userSession.userId,
            firstVisit: this.state.userSession.firstVisit,
            lastVisit: this.state.userSession.lastVisit,
            pageViews: this.state.userSession.pageViews,
            events: JSON.parse(localStorage.getItem('skylynx_events') || '[]'),
            affiliateClicks: JSON.parse(localStorage.getItem('skylynx_affiliate_clicks') || '[]'),
            cookieConsent: {
                essential: this.state.userConsent.essential,
                analytics: this.state.userConsent.analytics,
                marketing: this.state.userConsent.marketing
            }
        };
        
        return userData;
    },
    
    deleteUserData: function() {
        // حذف جميع بيانات المستخدم
        this.resetTracking();
        
        // إزالة موافقة الكوكيز أيضاً
        localStorage.removeItem('skylynx_cookies_accepted');
        localStorage.removeItem('skylynx_cookies_analytics');
        localStorage.removeItem('skylynx_cookies_marketing');
        localStorage.removeItem('skylynx_cookies_date');
        
        // إعادة تعيين الحالة
        this.state.cookiesAccepted = false;
        this.state.trackingEnabled = false;
        this.state.userConsent = {
            essential: true,
            analytics: false,
            marketing: false
        };
        
        console.log('🗑️ All user data deleted');
        return true;
    }
};

// ========== AUTO-INITIALIZATION ==========
// تهيئة التتبع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // الانتظار قليلاً لتحميل باقي الصفحة
    setTimeout(() => {
        SkyLynxTracking.init();
    }, 1000);
});

// ========== GLOBAL ACCESS ==========
// جعل النظام متاحاً عالمياً
window.SkyLynxTracking = SkyLynxTracking;

console.log('🌐 SkyLynx Tracking System Loaded');