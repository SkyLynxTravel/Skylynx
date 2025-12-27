// skylynx-tracking.js - Tracking for SkyLynx Travel
// Version 2.0 - Compatible with Expedia Integration

const SKYLYNX_TRACKING = {
    VERSION: '2.0',
    DEBUG: true, // غيّر إلى false عند النشر
    
    // إحصائيات
    stats: {
        totalClicks: 0,
        totalBookings: 0,
        totalRevenue: 0,
        lastUpdated: null
    },
    
    // مفاتيح التخزين
    STORAGE_KEYS: {
        CLICKS: 'skylynx_clicks_v2',
        BOOKINGS: 'skylynx_bookings_v2',
        REVENUE: 'skylynx_revenue_v2',
        SETTINGS: 'skylynx_settings'
    },
    
    // الإعدادات
    settings: {
        enableTracking: true,
        enableConsoleLog: true,
        sessionTimeout: 30 * 60 * 1000 // 30 دقيقة
    }
};

// ===========================================
// التهيئة
// ===========================================

function initSkyLynxTracking() {
    try {
        if (!SKYLYNX_TRACKING.settings.enableTracking) {
            log('Tracking is disabled');
            return;
        }
        
        // تحميل الإعدادات
        loadSettings();
        
        // تحميل الإحصائيات
        loadStats();
        
        // بدء جلسة التتبع
        startSession();
        
        // إعداد مستمعي الأحداث
        setupEventListeners();
        
        log('✅ SkyLynx Tracking initialized successfully');
        
    } catch (error) {
        console.error('❌ Failed to initialize tracking:', error);
    }
}

// ===========================================
// التتبع الأساسي
// ===========================================

// تتبع النقر على روابط إكسبيديا
function trackExpediaClick(flightId, flightPrice = 0, flightCurrency = 'CAD') {
    try {
        if (!SKYLYNX_TRACKING.settings.enableTracking) return false;
        
        const clickData = {
            id: generateUniqueId(),
            timestamp: new Date().toISOString(),
            flightId: flightId,
            price: flightPrice,
            currency: flightCurrency,
            type: 'expedia_click',
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
            sessionId: getSessionId(),
            userAgent: navigator.userAgent.substring(0, 100)
        };
        
        // حفظ النقرة
        saveClick(clickData);
        
        // تحديث الإحصائيات
        updateStats('click', flightPrice);
        
        // تسجيل في الكونسول
        log(`📊 Click tracked: ${flightId} - ${flightPrice} ${flightCurrency}`);
        
        // إرسال إلى Google Analytics (إذا كان مضبوطاً)
        sendToAnalytics('click', clickData);
        
        return clickData.id;
        
    } catch (error) {
        console.error('❌ Error tracking click:', error);
        return false;
    }
}

// تتبع الحجوزات
function trackBooking(bookingData) {
    try {
        if (!SKYLYNX_TRACKING.settings.enableTracking) return false;
        
        const booking = {
            id: generateUniqueId(),
            timestamp: new Date().toISOString(),
            ...bookingData,
            type: 'booking',
            status: 'completed',
            sessionId: getSessionId(),
            ip: 'recorded' // سيسجل عند الخادم
        };
        
        // حفظ الحجز
        saveBooking(booking);
        
        // تحديث الإحصائيات
        updateStats('booking', bookingData.price || 0);
        
        // تسجيل في الكونسول
        log(`🎉 Booking tracked: ${bookingData.flightId} - ${bookingData.price || 0} ${bookingData.currency || 'CAD'}`);
        
        // إرسال إلى Google Analytics
        sendToAnalytics('booking', booking);
        
        return booking.id;
        
    } catch (error) {
        console.error('❌ Error tracking booking:', error);
        return false;
    }
}

// تتبع الأخطاء
function trackError(errorData) {
    try {
        const error = {
            id: generateUniqueId(),
            timestamp: new Date().toISOString(),
            ...errorData,
            type: 'error',
            page: window.location.href,
            userAgent: navigator.userAgent
        };
        
        let errors = JSON.parse(localStorage.getItem('skylynx_errors') || '[]');
        errors.push(error);
        localStorage.setItem('skylynx_errors', JSON.stringify(errors.slice(-50))); // حفظ آخر 50 خطأ
        
        log(`⚠️ Error tracked: ${errorData.message}`);
        
    } catch (error) {
        console.error('Failed to track error:', error);
    }
}

// ===========================================
// إدارة الجلسات
// ===========================================

function startSession() {
    const sessionId = generateSessionId();
    const sessionData = {
        sessionId: sessionId,
        startTime: new Date().toISOString(),
        pageViews: 1,
        lastActivity: new Date().toISOString()
    };
    
    sessionStorage.setItem('skylynx_session', JSON.stringify(sessionData));
    log(`🔄 Session started: ${sessionId}`);
    
    return sessionId;
}

function getSessionId() {
    const session = sessionStorage.getItem('skylynx_session');
    if (!session) return startSession();
    
    try {
        const sessionData = JSON.parse(session);
        sessionData.lastActivity = new Date().toISOString();
        sessionData.pageViews = (sessionData.pageViews || 0) + 1;
        sessionStorage.setItem('skylynx_session', JSON.stringify(sessionData));
        
        return sessionData.sessionId;
    } catch (error) {
        return startSession();
    }
}

// ===========================================
// التخزين المحلي
// ===========================================

function saveClick(clickData) {
    try {
        let clicks = getClicks();
        clicks.push(clickData);
        
        // حفظ آخر 1000 نقرة فقط
        if (clicks.length > 1000) {
            clicks = clicks.slice(-1000);
        }
        
        localStorage.setItem(SKYLYNX_TRACKING.STORAGE_KEYS.CLICKS, JSON.stringify(clicks));
        
    } catch (error) {
        console.error('❌ Error saving click:', error);
        trackError({ message: 'Failed to save click', error: error.message });
    }
}

function saveBooking(bookingData) {
    try {
        let bookings = getBookings();
        bookings.push(bookingData);
        
        // حفظ آخر 500 حجز فقط
        if (bookings.length > 500) {
            bookings = bookings.slice(-500);
        }
        
        localStorage.setItem(SKYLYNX_TRACKING.STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
        
        // تحديث الإيرادات
        updateRevenue(bookingData.price || 0);
        
    } catch (error) {
        console.error('❌ Error saving booking:', error);
        trackError({ message: 'Failed to save booking', error: error.message });
    }
}

function getClicks() {
    try {
        const data = localStorage.getItem(SKYLYNX_TRACKING.STORAGE_KEYS.CLICKS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
}

function getBookings() {
    try {
        const data = localStorage.getItem(SKYLYNX_TRACKING.STORAGE_KEYS.BOOKINGS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
}

function updateRevenue(amount) {
    try {
        let revenue = parseFloat(localStorage.getItem(SKYLYNX_TRACKING.STORAGE_KEYS.REVENUE) || '0');
        revenue += amount;
        localStorage.setItem(SKYLYNX_TRACKING.STORAGE_KEYS.REVENUE, revenue.toFixed(2));
        
        // تحديث الإحصائيات
        SKYLYNX_TRACKING.stats.totalRevenue = revenue;
        SKYLYNX_TRACKING.stats.lastUpdated = new Date().toISOString();
        
    } catch (error) {
        console.error('❌ Error updating revenue:', error);
    }
}

// ===========================================
// الإحصائيات
// ===========================================

function loadStats() {
    try {
        const clicks = getClicks();
        const bookings = getBookings();
        const revenue = parseFloat(localStorage.getItem(SKYLYNX_TRACKING.STORAGE_KEYS.REVENUE) || '0');
        
        SKYLYNX_TRACKING.stats = {
            totalClicks: clicks.length,
            totalBookings: bookings.length,
            totalRevenue: revenue,
            lastUpdated: new Date().toISOString()
        };
        
        log(`📈 Stats loaded: ${clicks.length} clicks, ${bookings.length} bookings, ${revenue.toFixed(2)} CAD`);
        
    } catch (error) {
        console.error('❌ Error loading stats:', error);
    }
}

function updateStats(type, value = 0) {
    try {
        switch (type) {
            case 'click':
                SKYLYNX_TRACKING.stats.totalClicks++;
                break;
            case 'booking':
                SKYLYNX_TRACKING.stats.totalBookings++;
                SKYLYNX_TRACKING.stats.totalRevenue += value;
                break;
        }
        
        SKYLYNX_TRACKING.stats.lastUpdated = new Date().toISOString();
        
    } catch (error) {
        console.error('❌ Error updating stats:', error);
    }
}

function getStats() {
    return { ...SKYLYNX_TRACKING.stats };
}

function displayStats(elementId = 'trackingStats') {
    try {
        const stats = getStats();
        const element = document.getElementById(elementId);
        
        if (element) {
            element.innerHTML = `
                <div class="stats-container">
                    <div class="stat-item">
                        <span class="stat-label">Clicks:</span>
                        <span class="stat-value">${stats.totalClicks}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Bookings:</span>
                        <span class="stat-value">${stats.totalBookings}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Revenue:</span>
                        <span class="stat-value">${stats.totalRevenue.toFixed(2)} CAD</span>
                    </div>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('❌ Error displaying stats:', error);
    }
}

// ===========================================
// الإعدادات
// ===========================================

function loadSettings() {
    try {
        const savedSettings = localStorage.getItem(SKYLYNX_TRACKING.STORAGE_KEYS.SETTINGS);
        if (savedSettings) {
            SKYLYNX_TRACKING.settings = { ...SKYLYNX_TRACKING.settings, ...JSON.parse(savedSettings) };
        }
    } catch (error) {
        console.error('❌ Error loading settings:', error);
    }
}

function saveSettings() {
    try {
        localStorage.setItem(SKYLYNX_TRACKING.STORAGE_KEYS.SETTINGS, JSON.stringify(SKYLYNX_TRACKING.settings));
    } catch (error) {
        console.error('❌ Error saving settings:', error);
    }
}

function toggleTracking(enable) {
    SKYLYNX_TRACKING.settings.enableTracking = enable;
    saveSettings();
    log(`Tracking ${enable ? 'enabled' : 'disabled'}`);
}

// ===========================================
// التحليلات الخارجية
// ===========================================

function sendToAnalytics(eventType, data) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        try {
            gtag('event', eventType, {
                'event_category': 'skylynx_travel',
                'event_label': data.flightId || 'unknown',
                'value': data.price || 0,
                'currency': data.currency || 'CAD'
            });
        } catch (error) {
            console.error('❌ GA error:', error);
        }
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        try {
            fbq('track', eventType, {
                value: data.price || 0,
                currency: data.currency || 'CAD',
                content_name: data.flightId || 'unknown'
            });
        } catch (error) {
            console.error('❌ FB Pixel error:', error);
        }
    }
}

// ===========================================
// أدوات مساعدة
// ===========================================

function generateUniqueId() {
    return 'skylynx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

function log(message) {
    if (SKYLYNX_TRACKING.DEBUG && SKYLYNX_TRACKING.settings.enableConsoleLog) {
        console.log(`[SkyLynx] ${message}`);
    }
}

function setupEventListeners() {
    // تتبع تغيير الصفحة
    window.addEventListener('beforeunload', function() {
        log('Page unload detected');
    });
    
    // تتبع الأخطاء
    window.addEventListener('error', function(event) {
        trackError({
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });
    
    // تتبع Promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        trackError({
            message: 'Unhandled Promise Rejection',
            reason: event.reason?.message || event.reason
        });
    });
}

// ===========================================
// التصدير والتهيئة التلقائية
// ===========================================

// جعل الوظائف متاحة globally
if (typeof window !== 'undefined') {
    window.SKYLYNX_TRACKING = SKYLYNX_TRACKING;
    window.initSkyLynxTracking = initSkyLynxTracking;
    window.trackExpediaClick = trackExpediaClick;
    window.trackBooking = trackBooking;
    window.trackError = trackError;
    window.getStats = getStats;
    window.displayStats = displayStats;
    window.toggleTracking = toggleTracking;
}

// التهيئة التلقائية عند تحميل الصفحة
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkyLynxTracking);
    } else {
        initSkyLynxTracking();
    }
}

// تصدير لـ Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSkyLynxTracking,
        trackExpediaClick,
        trackBooking,
        trackError,
        getStats,
        displayStats,
        toggleTracking,
        SKYLYNX_TRACKING
    };
}

log('✅ skylynx-tracking.js loaded successfully');