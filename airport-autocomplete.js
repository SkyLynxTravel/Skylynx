/**
 * SkyLynx Travel - Airport & City Autocomplete
 * Using TravelPayouts Autocomplete API
 * API Token: 70cb654f5b2bb095d3d62cd188d86360
 */

(function() {
    'use strict';
    
    const API_TOKEN = '70cb654f5b2bb095d3d62cd188d86360';
    const AUTOCOMPLETE_URL = 'https://autocomplete.travelpayouts.com/places2';
    
    // Cache للبيانات لتحسين الأداء
    const searchCache = new Map();
    const CACHE_DURATION = 3600000; // ساعة واحدة
    
    // Debounce function لتقليل عدد الطلبات
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * البحث عن المطارات والمدن من TravelPayouts API
     */
    async function searchPlaces(term, locale = 'en') {
        if (!term || term.length < 2) return [];
        
        // التحقق من الـ cache
        const cacheKey = `${term}-${locale}`;
        const cached = searchCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
            return cached.data;
        }
        
        try {
            const url = `${AUTOCOMPLETE_URL}?term=${encodeURIComponent(term)}&locale=${locale}&types[]=city&types[]=airport`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // تحويل البيانات للصيغة المطلوبة
            const places = Array.isArray(data) ? data : [];
            const formattedPlaces = places.slice(0, 10).map(place => ({
                code: place.code || place.iata || '',
                name: place.name || '',
                city: place.city_name || place.name || '',
                country: place.country_name || '',
                countryCode: place.country_code || '',
                type: place.type || 'city',
                coordinates: place.coordinates || null
            }));
            
            // حفظ في الـ cache
            searchCache.set(cacheKey, {
                data: formattedPlaces,
                timestamp: Date.now()
            });
            
            return formattedPlaces;
            
        } catch (error) {
            console.error('Error fetching places:', error);
            return [];
        }
    }
    
    /**
     * إنشاء قائمة الاقتراحات
     */
    function createSuggestionsList(inputElement) {
        const existingList = inputElement.parentElement.querySelector('.autocomplete-suggestions');
        if (existingList) {
            return existingList;
        }
        
        const list = document.createElement('div');
        list.className = 'autocomplete-suggestions';
        list.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 17, 28, 0.98);
            border: 1px solid rgba(0, 166, 251, 0.3);
            border-top: none;
            border-radius: 0 0 10px 10px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0, 166, 251, 0.2);
            backdrop-filter: blur(10px);
            display: none;
        `;
        
        inputElement.parentElement.appendChild(list);
        return list;
    }
    
    /**
     * عرض الاقتراحات
     */
    function displaySuggestions(inputElement, places, locale = 'en') {
        const list = createSuggestionsList(inputElement);
        
        if (!places || places.length === 0) {
            list.style.display = 'none';
            return;
        }
        
        list.innerHTML = places.map((place, index) => {
            const icon = place.type === 'airport' ? '✈️' : '🏙️';
            const locationText = place.city && place.city !== place.name 
                ? `${place.city}, ${place.country}` 
                : place.country;
            
            return `
                <div class="autocomplete-item" data-index="${index}" data-code="${place.code}" data-name="${place.name}" style="
                    padding: 12px 15px;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <span style="font-size: 1.2rem;">${icon}</span>
                    <div style="flex: 1;">
                        <div style="color: #00a6fb; font-weight: 600; font-size: 0.95rem;">
                            ${place.name} ${place.code ? `(${place.code})` : ''}
                        </div>
                        <div style="color: #e0e1dd; font-size: 0.85rem; opacity: 0.8;">
                            ${locationText}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        list.style.display = 'block';
        
        // إضافة مستمعي الأحداث للاقتراحات
        list.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(0, 166, 251, 0.1)';
                this.style.borderLeft = '3px solid #00a6fb';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.borderLeft = 'none';
            });
            
            item.addEventListener('click', function() {
                const code = this.dataset.code;
                const name = this.dataset.name;
                inputElement.value = `${name} (${code})`;
                inputElement.dataset.iataCode = code;
                list.style.display = 'none';
            });
        });
    }
    
    /**
     * إخفاء الاقتراحات عند النقر خارجها
     */
    function hideOnClickOutside(inputElement) {
        document.addEventListener('click', function(event) {
            const list = inputElement.parentElement.querySelector('.autocomplete-suggestions');
            if (list && !inputElement.contains(event.target) && !list.contains(event.target)) {
                list.style.display = 'none';
            }
        });
    }
    
    /**
     * تفعيل Autocomplete على حقل إدخال
     */
    function initAutocomplete(inputElement) {
        if (!inputElement) return;
        
        // تحديد اللغة
        const htmlLang = document.documentElement.getAttribute('lang') || 'en';
        const locale = htmlLang === 'ar' ? 'ar' : 'en';
        
        // إنشاء قائمة الاقتراحات
        const list = createSuggestionsList(inputElement);
        
        // مستمع الإدخال مع debounce
        const handleInput = debounce(async function(e) {
            const value = e.target.value.trim();
            
            if (value.length < 2) {
                list.style.display = 'none';
                return;
            }
            
            const places = await searchPlaces(value, locale);
            displaySuggestions(inputElement, places, locale);
        }, 300);
        
        inputElement.addEventListener('input', handleInput);
        
        // مستمع التركيز
        inputElement.addEventListener('focus', function() {
            const value = this.value.trim();
            if (value.length >= 2 && list.querySelectorAll('.autocomplete-item').length > 0) {
                list.style.display = 'block';
            }
        });
        
        // إخفاء عند الضغط على Escape
        inputElement.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                list.style.display = 'none';
            }
        });
        
        hideOnClickOutside(inputElement);
    }
    
    /**
     * تهيئة جميع حقول المطارات
     */
    function initAllAirportFields() {
        // حقول الرحلات
        const flightFrom = document.getElementById('flight-from');
        const flightTo = document.getElementById('flight-to');
        
        if (flightFrom) initAutocomplete(flightFrom);
        if (flightTo) initAutocomplete(flightTo);
        
        // يمكن إضافة المزيد من الحقول هنا إذا لزم الأمر
        console.log('✅ SkyLynx Airport Autocomplete initialized');
    }
    
    // تشغيل عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllAirportFields);
    } else {
        initAllAirportFields();
    }
    
    // تصدير للاستخدام العام إذا لزم الأمر
    window.SkyLynxAutocomplete = {
        search: searchPlaces,
        init: initAutocomplete
    };
    
})();
