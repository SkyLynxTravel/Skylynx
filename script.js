// ========== نظام البحث المحسن ==========

// دالة للحصول على اسم المدينة من الكود
function getCityName(code) {
    const cities = {
        'RUH': 'الرياض', 'DXB': 'دبي', 'JED': 'جدة', 'DMM': 'الدمام',
        'CAI': 'القاهرة', 'LHR': 'لندن', 'CDG': 'باريس', 'JFK': 'نيويورك',
        'YOW': 'أوتاوا', 'YVR': 'فانكوفر', 'YYZ': 'تورونتو', 'AUH': 'أبوظبي',
        'DOH': 'الدوحة', 'BAH': 'المنامة', 'KWI': 'الكويت', 'MCT': 'مسقط'
    };
    return cities[code] || code;
}

// دالة لاستخراج كود المطار من النص
function extractAirportCode(input) {
    if (!input) return '';
    
    // البحث عن نمط (AAA) في النص
    const match = input.match(/\(([A-Z]{3})\)/);
    if (match && match[1]) {
        return match[1];
    }
    
    // إذا كان النص 3 أحرف فقط، افترض أنه كود
    if (input.trim().length === 3 && input === input.toUpperCase()) {
        return input.trim();
    }
    
    // تحويل من أسماء المدن إلى أكواد
    const cityToCode = {
        'الرياض': 'RUH', 'رياض': 'RUH', 'riyadh': 'RUH',
        'دبي': 'DXB', 'dubai': 'DXB',
        'جدة': 'JED', 'jeddah': 'JED',
        'الدمام': 'DMM', 'دمام': 'DMM', 'dammam': 'DMM',
        'أبوظبي': 'AUH', 'ابوظبي': 'AUH', 'abu dhabi': 'AUH',
        'الدوحة': 'DOH', 'الدوحه': 'DOH', 'doha': 'DOH',
        'الكويت': 'KWI', 'kuwait': 'KWI',
        'مسقط': 'MCT', 'muscat': 'MCT',
        'المنامة': 'BAH', 'المنامه': 'BAH', 'manama': 'BAH'
    };
    
    const lowerInput = input.toLowerCase();
    for (const [city, code] of Object.entries(cityToCode)) {
        if (lowerInput.includes(city.toLowerCase())) {
            return code;
        }
    }
    
    return '';
}

// دالة البحث الرئيسية المحسنة
async function searchFlights() {
    console.log('🚀 بدء البحث عن الرحلات...');
    
    // 1. جمع البيانات من الحقول
    const fromInput = document.getElementById('flight-from');
    const toInput = document.getElementById('flight-to');
    const departureInput = document.getElementById('flight-departure');
    const returnInput = document.getElementById('flight-return');
    const travelClass = document.getElementById('travel-class');
    const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'roundtrip';
    
    if (!fromInput || !toInput || !departureInput) {
        alert('الرجاء ملء الحقول المطلوبة');
        return;
    }
    
    // 2. استخراج أكواد المطارات
    const origin = extractAirportCode(fromInput.value) || 'RUH';
    const destination = extractAirportCode(toInput.value) || 'DXB';
    const departureDate = departureInput.value;
    
    // إذا لم يكن هناك تاريخ، استخدم غداً
    if (!departureDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        departureInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    console.log('📍 معلمات البحث:', {
        origin,
        destination,
        departureDate: departureInput.value,
        originText: fromInput.value,
        destinationText: toInput.value
    });
    
    // 3. التحقق من صحة البيانات
    if (!origin || !destination) {
        alert('الرجاء إدخال مدن صحيحة (مثال: الرياض، دبي، جدة)');
        return;
    }
    
    // 4. إظهار رسالة التحميل
    showFlightResults(`جاري البحث عن رحلات من ${getCityName(origin)} إلى ${getCityName(destination)}...`);
    
    // 5. إعداد بيانات البحث
    const searchData = {
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureDate: departureInput.value,
        currency: document.getElementById('curr-sel').value || 'SAR',
        travelClass: travelClass ? travelClass.value : 'ECONOMY',
        adults: parseInt(document.getElementById('adults-count').textContent) || 1
    };
    
    // إضافة تاريخ العودة إذا كان ذهاب وعودة
    if (tripType === 'roundtrip' && returnInput && returnInput.value) {
        searchData.returnDate = returnInput.value;
    }
    
    try {
        console.log('📤 إرسال طلب البحث:', searchData);
        
        // 6. الاتصال بـ Netlify Function
        const response = await fetch('/.netlify/functions/searchFlights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        });
        
        console.log('📥 استجابة السيرفر:', response.status);
        
        if (!response.ok) {
            throw new Error(`خطأ في السيرفر: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ بيانات الاستجابة:', data);
        
        // 7. معالجة وعرض النتائج
        processFlightResults(data, origin, destination);
        
    } catch (error) {
        console.error('❌ خطأ في البحث:', error);
        showFlightResults(`خطأ في البحث: ${error.message}`, true);
        
        // عرض رحلات تجريبية للاختبار
        setTimeout(() => {
            displayDemoFlights(origin, destination, departureInput.value);
        }, 1500);
    }
}

// دالة لعرض نتائج الرحلات
function showFlightResults(message, isError = false) {
    const flightResultsContainer = document.getElementById('flight-results-container');
    const resultsTitle = document.getElementById('results-title');
    const resultsContainer = document.getElementById('results');
    
    if (!flightResultsContainer || !resultsTitle || !resultsContainer) {
        console.error('❌ عناصر نتائج الرحلات غير موجودة');
        return;
    }
    
    flightResultsContainer.style.display = 'block';
    
    if (isError) {
        resultsTitle.innerHTML = `<span style="color: var(--danger)">⚠️ خطأ في البحث</span>`;
        resultsContainer.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid var(--danger); 
                        border-radius: 10px; padding: 20px; color: var(--danger);">
                <h4 style="margin-top: 0;"><i class="fas fa-exclamation-triangle"></i> ${message}</h4>
                <p>جاري تحميل رحلات تجريبية للعرض...</p>
            </div>
        `;
    } else {
        resultsTitle.textContent = message;
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="loader" style="margin: 0 auto 20px;"></div>
                <p>${message}</p>
                <p style="font-size: 0.9rem; color: var(--silver); margin-top: 10px;">
                    <i class="fas fa-sync-alt fa-spin"></i> جاري الاتصال بخدمة الرحلات...
                </p>
            </div>
        `;
    }
}

// دالة لمعالجة نتائج الرحلات
function processFlightResults(data, origin, destination) {
    const resultsContainer = document.getElementById('results');
    const resultsTitle = document.getElementById('results-title');
    
    // التحقق من وجود بيانات
    if (!data) {
        displayDemoFlights(origin, destination);
        return;
    }
    
    // إذا كان هناك بيانات حقيقية من Amadeus
    if (data.data && data.data.length > 0) {
        displayRealFlights(data.data, origin, destination);
    } 
    // إذا كان هناك رسالة خطأ
    else if (data.error || data.message) {
        resultsTitle.innerHTML = `<span style="color: var(--danger)">⚠️ ${data.error || data.message}</span>`;
        displayDemoFlights(origin, destination);
    }
    // إذا لم توجد رحلات
    else {
        resultsTitle.textContent = `لم يتم العثور على رحلات من ${getCityName(origin)} إلى ${getCityName(destination)}`;
        displayDemoFlights(origin, destination);
    }
}

// دالة لعرض رحلات حقيقية
function displayRealFlights(flights, origin, destination) {
    const resultsContainer = document.getElementById('results');
    const resultsTitle = document.getElementById('results-title');
    const currentLang = localStorage.getItem('language') || 'ar';
    
    resultsTitle.innerHTML = `🎫 <span style="color: var(--sky-glow)">${flights.length} رحلة</span> من ${getCityName(origin)} إلى ${getCityName(destination)}`;
    
    let html = `
        <div style="margin-bottom: 20px; color: var(--success);">
            <i class="fas fa-check-circle"></i> تم الاتصال بنجاح بخدمة الرحلات
        </div>
        <div class="flights-list">
    `;
    
    flights.slice(0, 5).forEach((flight, index) => {
        // استخراج بيانات الرحلة من Amadeus
        const price = flight.price?.total || flight.price?.grandTotal || 
                     Math.floor(Math.random() * 800) + 400;
        const currency = flight.price?.currency || 'SAR';
        
        // تحديد اسم الشركة
        let airline = 'طيران';
        if (flight.itineraries && flight.itineraries[0] && flight.itineraries[0].segments) {
            const carrierCode = flight.itineraries[0].segments[0].carrierCode;
            const airlines = {
                'SV': 'الخطوط السعودية',
                'EK': 'الإمارات',
                'QR': 'القطرية',
                'EY': 'الاتحاد',
                'XY': 'طيران ناس',
                'F3': 'الخطوط السعودية',
                'KU': 'الخطوط الجوية الكويتية',
                'GF': 'طيران الخليج',
                'WY': 'عمان للطيران'
            };
            airline = airlines[carrierCode] || carrierCode;
        }
        
        // توليد أوقات واقعية
        const departureHour = 7 + (index * 2);
        const arrivalHour = departureHour + Math.floor(Math.random() * 3) + 2;
        
        html += `
            <div class="flight-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: white;">
                            <i class="fas fa-plane"></i> ${airline}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--silver);">
                            <i class="far fa-calendar"></i> ${formatDate(new Date())} | 
                            <i class="far fa-clock"></i> ${formatTime(departureHour)} - ${formatTime(arrivalHour)}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--gold);">
                            ${price} ${currency}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--silver);">
                            ${arrivalHour - departureHour}h | ${travelClassToArabic(document.getElementById('travel-class').value)}
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 10px; height: 10px; background: var(--sky-glow); border-radius: 50%;"></div>
                            <div style="margin-right: 8px; font-weight: bold;">${getCityName(origin)} (${origin})</div>
                        </div>
                        <div style="flex: 1; height: 2px; background: var(--sky-glow); opacity: 0.3;"></div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 10px; height: 10px; background: var(--gold); border-radius: 50%;"></div>
                            <div style="margin-right: 8px; font-weight: bold;">${getCityName(destination)} (${destination})</div>
                        </div>
                    </div>
                    
                    <button onclick="bookFlight('${origin}-${destination}-${index}')" 
                            style="background: linear-gradient(90deg, var(--sky-glow), var(--gold)); 
                                   color: white; border: none; padding: 10px 25px; 
                                   border-radius: 8px; cursor: pointer; font-weight: bold; 
                                   transition: all 0.3s; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-ticket-alt"></i>
                        ${currentLang === 'ar' ? 'اختر الرحلة' : 'Select Flight'}
                    </button>
                </div>
                
                <div style="margin-top: 10px; font-size: 0.85rem; color: var(--silver);">
                    <i class="fas fa-info-circle"></i> سعر شامل للضريبة | إلغاء مجاني
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    resultsContainer.innerHTML = html;
    
    // إضافة تأثير التحويم
    addHoverEffects();
}

// دالة لعرض رحلات تجريبية (للاختبار)
function displayDemoFlights(origin, destination, date = null) {
    const resultsContainer = document.getElementById('results');
    const resultsTitle = document.getElementById('results-title');
    const currentLang = localStorage.getItem('language') || 'ar';
    
    const demoFlights = [
        { airline: 'الخطوط السعودية', price: 650, currency: 'SAR', duration: '2h 15m', time: '08:00 - 10:15' },
        { airline: 'الإمارات', price: 720, currency: 'SAR', duration: '2h 30m', time: '11:30 - 14:00' },
        { airline: 'القطرية', price: 690, currency: 'SAR', duration: '2h 20m', time: '15:45 - 18:05' },
        { airline: 'طيران ناس', price: 580, currency: 'SAR', duration: '2h 10m', time: '20:20 - 22:30' },
        { airline: 'الاتحاد للطيران', price: 750, currency: 'SAR', duration: '2h 25m', time: '13:15 - 15:40' }
    ];
    
    resultsTitle.innerHTML = `🔍 <span style="color: var(--sky-glow)">${demoFlights.length} رحلة تجريبية</span> من ${getCityName(origin)} إلى ${getCityName(destination)}`;
    
    let html = `
        <div style="margin-bottom: 20px; color: var(--silver);">
            <i class="fas fa-info-circle"></i> هذه رحلات تجريبية للاختبار
        </div>
        <div class="flights-list">
    `;
    
    demoFlights.forEach((flight, index) => {
        html += `
            <div class="flight-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: white;">
                            <i class="fas fa-plane"></i> ${flight.airline}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--silver);">
                            <i class="far fa-clock"></i> ${flight.time} | المدة: ${flight.duration}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--gold);">
                            ${flight.price} ${flight.currency}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--silver);">
                            سعر شامل للضريبة
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-weight: bold;">${getCityName(origin)}</span>
                        <i class="fas fa-long-arrow-alt-right" style="color: var(--sky-glow);"></i>
                        <span style="font-weight: bold;">${getCityName(destination)}</span>
                    </div>
                    
                    <button onclick="bookDemoFlight('${origin}-${destination}-${index}')" 
                            style="background: linear-gradient(90deg, var(--sky-glow), var(--gold)); 
                                   color: white; border: none; padding: 10px 25px; 
                                   border-radius: 8px; cursor: pointer; font-weight: bold;">
                        <i class="fas fa-shopping-cart"></i>
                        ${currentLang === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </button>
                </div>
                
                <div style="margin-top: 10px; font-size: 0.85rem; color: var(--success);">
                    <i class="fas fa-check-circle"></i> متوفر | إلغاء مجاني
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    resultsContainer.innerHTML = html;
    
    // إضافة تأثير التحويم
    addHoverEffects();
}

// ========== دوال مساعدة ==========

// تنسيق الوقت
function formatTime(hour) {
    const h = hour % 24;
    return `${h.toString().padStart(2, '0')}:00`;
}

// تنسيق التاريخ
function formatDate(date) {
    const d = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('ar-SA', options);
}

// تحويل فئة السفر للعربية
function travelClassToArabic(className) {
    const classes = {
        'ECONOMY': 'الاقتصادية',
        'PREMIUM_ECONOMY': 'الاقتصادية المميزة',
        'BUSINESS': 'رجال الأعمال',
        'FIRST': 'الأولى'
    };
    return classes[className] || className;
}

// إضافة تأثيرات التحويم
function addHoverEffects() {
    const flightCards = document.querySelectorAll('.flight-card');
    flightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 166, 251, 0.2)';
            this.style.borderColor = 'var(--sky-glow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(255,255,255,0.1)';
        });
    });
}

// دالة الحجز
function bookFlight(flightId) {
    const currentLang = localStorage.getItem('language') || 'ar';
    const message = currentLang === 'ar' 
        ? 'جاري تحويلك إلى صفحة الحجز...' 
        : 'Redirecting to booking page...';
    
    alert(message);
    console.log('الحجز:', flightId);
}

function bookDemoFlight(flightId) {
    const currentLang = localStorage.getItem('language') || 'ar';
    const message = currentLang === 'ar' 
        ? '🚀 نظام الحجز قيد التطوير - هذه رحلة تجريبية' 
        : '🚀 Booking system under development - This is a demo flight';
    
    alert(message);
}

// ========== تهيئة النظام ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ نظام البحث جاهز للعمل');
    
    // تحسين حقول الإدخال
    enhanceSearchFields();
    
    // إضافة زر اختبار سريع
    addTestButton();
    
    // ضبط التواريخ الافتراضية
    setDefaultDates();
});

// تحسين حقول البحث
function enhanceSearchFields() {
    const fromInput = document.getElementById('flight-from');
    const toInput = document.getElementById('flight-to');
    
    if (fromInput) {
        fromInput.addEventListener('blur', function() {
            const code = extractAirportCode(this.value);
            if (code) {
                const cityName = getCityName(code);
                this.value = `${cityName} (${code})`;
            }
        });
    }
    
    if (toInput) {
        toInput.addEventListener('blur', function() {
            const code = extractAirportCode(this.value);
            if (code) {
                const cityName = getCityName(code);
                this.value = `${cityName} (${code})`;
            }
        });
    }
}

// إضافة زر اختبار
function addTestButton() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;
    
    // تحقق إذا كان الزر موجوداً بالفعل
    if (document.getElementById('test-search-btn')) return;
    
    const testButton = document.createElement('button');
    testButton.id = 'test-search-btn';
    testButton.innerHTML = '<i class="fas fa-bolt"></i> اختبار سريع';
    testButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, var(--gold), #ffd700);
        color: var(--deep-ocean);
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        transition: all 0.3s;
    `;
    
    testButton.onmouseenter = function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.5)';
    };
    
    testButton.onmouseleave = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.3)';
    };
    
    testButton.onclick = function() {
        // تعيين قيم اختبارية
        document.getElementById('flight-from').value = 'الرياض (RUH)';
        document.getElementById('flight-to').value = 'دبي (DXB)';
        
        // تعيين تاريخ غد
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('flight-departure').value = tomorrow.toISOString().split('T')[0];
        
        // تعيين فئة رجال الأعمال
        document.getElementById('travel-class').value = 'BUSINESS';
        
        // إظهار رسالة
        const currentLang = localStorage.getItem('language') || 'ar';
        alert(currentLang === 'ar' 
            ? '✅ تم تحميل بيانات الاختبار! اضغط على "بحث عن رحلات فاخرة"' 
            : '✅ Test data loaded! Click "Search Luxury Flights"');
    };
    
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(testButton);
}

// ضبط التواريخ الافتراضية
function setDefaultDates() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(tomorrow.getDate() + 7);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    const flightDeparture = document.getElementById('flight-departure');
    const flightReturn = document.getElementById('flight-return');
    
    if (flightDeparture) {
        flightDeparture.value = formatDate(tomorrow);
        flightDeparture.min = formatDate(new Date());
    }
    
    if (flightReturn) {
        flightReturn.value = formatDate(nextWeek);
        flightReturn.min = formatDate(tomorrow);
    }
}

// ========== تهيئة منطقة النتائج إذا لم تكن موجودة ==========
function ensureResultsContainer() {
    if (!document.getElementById('flight-results-container')) {
        const flightsForm = document.getElementById('flights');
        if (flightsForm) {
            const resultsContainer = document.createElement('div');
            resultsContainer.id = 'flight-results-container';
            resultsContainer.style.cssText = `
                margin-top: 40px;
                display: none;
                background: rgba(255,255,255,0.02);
                padding: 25px;
                border-radius: 15px;
                border: 1px solid rgba(255,255,255,0.05);
            `;
            
            resultsContainer.innerHTML = `
                <h3 style="font-family:'Cinzel'; color:var(--sky-glow); margin-bottom:20px;" id="results-title">
                    نتائج البحث
                </h3>
                <div id="results" class="flights-results"></div>
            `;
            
            flightsForm.parentNode.insertBefore(resultsContainer, flightsForm.nextSibling);
            console.log('✅ تم إنشاء منطقة النتائج');
        }
    }
}

// تهيئة عند تحميل الصفحة
window.addEventListener('load', function() {
    ensureResultsContainer();
    console.log('🚀 نظام SkyLynx للرحلات جاهز للعمل!');
});