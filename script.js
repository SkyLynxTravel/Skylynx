// ========== دالة البحث الرئيسية (متصلة بـ Netlify Function) ==========
async function searchFlights() {
    // 1. جمع البيانات من الحقول الحقيقية في موقعك
    const fromInput = document.getElementById('flight-from');
    const toInput = document.getElementById('flight-to');
    const departureInput = document.getElementById('flight-departure');
    const returnInput = document.getElementById('flight-return');
    const travelClass = document.getElementById('travel-class');
    const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'roundtrip';
    
    // التحقق من وجود الحقول
    if (!fromInput || !toInput || !departureInput) {
        alert('Please fill required fields');
        return;
    }
    
    const origin = fromInput.value.match(/\(([A-Z]{3})\)/)?.[1] || fromInput.value.split(' ').pop();
    const destination = toInput.value.match(/\(([A-Z]{3})\)/)?.[1] || toInput.value.split(' ').pop();
    const departureDate = departureInput.value;
    const returnDate = tripType === 'roundtrip' && returnInput ? returnInput.value : null;
    
    console.log('Flight search parameters:', {
        origin, destination, departureDate, returnDate
    });
    
    // 2. التحقق من صحة البيانات
    if (!origin || !destination || !departureDate) {
        alert('Please fill all required fields');
        return;
    }
    
    if (origin.length !== 3 || destination.length !== 3) {
        alert('Please use airport codes (e.g., YOW, DXB, RUH)');
        return;
    }
    
    // 3. إظهار رسالة التحميل
    const resultsContainer = document.getElementById('results');
    const resultsTitle = document.getElementById('results-title');
    const flightResultsContainer = document.getElementById('flight-results-container');
    
    flightResultsContainer.style.display = 'block';
    resultsTitle.textContent = 'Searching for flights...';
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loader" style="margin: 0 auto 20px;"></div>
            <p>Searching for the best flights from ${origin} to ${destination}...</p>
        </div>
    `;
    
    // 4. إعداد بيانات البحث
    const searchData = {
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureDate: departureDate,
        currency: document.getElementById('curr-sel').value || 'CAD',
        travelClass: travelClass ? travelClass.value : 'ECONOMY'
    };
    
    if (returnDate && tripType === 'roundtrip') {
        searchData.returnDate = returnDate;
    }
    
    try {
        // 5. الاتصال بـ Netlify Function
        console.log('Calling Netlify Function with:', searchData);
        
        const response = await fetch('/.netlify/functions/searchFlights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        });
        
        console.log('Response status:', response.status);
        
        // 6. معالجة النتائج
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        // 7. عرض النتائج
        displayFlights(data);
        
    } catch (error) {
        console.error('Error fetching flights:', error);
        resultsTitle.textContent = 'Search Error';
        resultsContainer.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid var(--danger); 
                        border-radius: 10px; padding: 20px; color: var(--danger);">
                <h4 style="margin-top: 0;"><i class="fas fa-exclamation-triangle"></i> Connection Error</h4>
                <p>Unable to fetch flight data. Please try again.</p>
                <p style="font-size: 0.9rem; opacity: 0.8;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// ========== دالة عرض الرحلات ==========
function displayFlights(flights) {
    const resultsContainer = document.getElementById('results');
    const resultsTitle = document.getElementById('results-title');
    const currentLang = localStorage.getItem('language') || 'en';
    
    if (!flights || (Array.isArray(flights) && flights.length === 0) || 
        (flights.data && flights.data.length === 0)) {
        resultsTitle.textContent = currentLang === 'ar' ? 'لا توجد رحلات' : 'No Flights Found';
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--silver);">
                <i class="fas fa-plane-slash" style="font-size: 3rem; opacity: 0.5; margin-bottom: 20px;"></i>
                <h4>${currentLang === 'ar' ? 'لم يتم العثور على رحلات' : 'No flights found'}</h4>
                <p>${currentLang === 'ar' ? 'جرب تواريخ أو وجهات أخرى' : 'Try different dates or destinations'}</p>
            </div>
        `;
        return;
    }
    
    // تحديث عنوان النتائج
    const from = document.getElementById('flight-from').value;
    const to = document.getElementById('flight-to').value;
    resultsTitle.textContent = `${currentLang === 'ar' ? 'نتائج البحث عن رحلات من' : 'Flights from'} ${from} ${currentLang === 'ar' ? 'إلى' : 'to'} ${to}`;
    
    // تحضير قائمة الرحلات
    const flightsArray = flights.data || flights;
    
    let html = `
        <div style="margin-bottom: 20px; color: var(--silver);">
            <i class="fas fa-info-circle"></i> 
            ${currentLang === 'ar' ? 
                `عرض ${flightsArray.length} رحلة` : 
                `Showing ${flightsArray.length} flights`}
        </div>
        <div class="flights-list">
    `;
    
    flightsArray.forEach((flight, index) => {
        // استخراج بيانات الرحلة (اعتماداً على هيكل بيانات Amadeus)
        const price = flight.price?.total || flight.price || 'N/A';
        const currency = flight.price?.currency || flights.currency || document.getElementById('curr-sel').value || 'CAD';
        
        const airline = flight.itineraries?.[0]?.segments?.[0]?.carrierCode || 
                       flight.airline || 'Airline';
        
        const departureTime = flight.itineraries?.[0]?.segments?.[0]?.departure?.at || 
                            flight.departureTime || '';
        const arrivalTime = flight.itineraries?.[0]?.segments?.[flight.itineraries[0]?.segments?.length - 1]?.arrival?.at || 
                          flight.arrivalTime || '';
        
        const duration = flight.itineraries?.[0]?.duration?.replace('PT', '') || 
                        flight.duration || '';
        
        // تنسيق الوقت
        const formatTime = (timeStr) => {
            if (!timeStr) return '';
            const date = new Date(timeStr);
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        };
        
        const formatDate = (timeStr) => {
            if (!timeStr) return '';
            const date = new Date(timeStr);
            return date.toLocaleDateString();
        };
        
        html += `
            <div class="flight-card" style="background: rgba(255,255,255,0.03); 
                    border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); 
                    padding: 20px; margin-bottom: 15px; transition: all 0.3s;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: white;">
                            ${airline}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--silver);">
                            ${formatDate(departureTime)} • ${formatTime(departureTime)} - ${formatTime(arrivalTime)}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--gold);">
                            ${price} ${currency}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--silver);">
                            ${duration} ${currentLang === 'ar' ? 'المدة' : 'duration'}
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 8px; height: 8px; background: var(--sky-glow); border-radius: 50%;"></div>
                            <div style="margin-left: 8px; font-weight: bold;">${document.getElementById('flight-from').value.split('(')[0]?.trim()}</div>
                        </div>
                        <div style="flex: 1; height: 2px; background: var(--sky-glow); opacity: 0.5;"></div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 8px; height: 8px; background: var(--gold); border-radius: 50%;"></div>
                            <div style="margin-left: 8px; font-weight: bold;">${document.getElementById('flight-to').value.split('(')[0]?.trim()}</div>
                        </div>
                    </div>
                    
                    <button onclick="bookFlight(${index})" 
                            style="background: var(--sky-glow); color: white; border: none; 
                                   padding: 10px 20px; border-radius: 8px; cursor: pointer; 
                                   font-weight: bold; transition: all 0.3s;">
                        <i class="fas fa-ticket-alt"></i>
                        ${currentLang === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </button>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    resultsContainer.innerHTML = html;
    
    // إضافة أنماط للبطاقات عند التحويم
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

// ========== دالة الحجز ==========
function bookFlight(flightIndex) {
    const from = document.getElementById('flight-from').value;
    const to = document.getElementById('flight-to').value;
    const currentLang = localStorage.getItem('language') || 'en';
    
    alert(currentLang === 'ar' ? 
        `جارٍ تحويلك إلى صفحة حجز الرحلة من ${from} إلى ${to}` :
        `Redirecting to booking page for flight from ${from} to ${to}`);
    
    // هنا يمكنك إضافة منطق التوجيه إلى صفحة الحجز
    // window.location.href = `booking.html?flight=${flightIndex}`;
}

// ========== دالة لتحويل أسماء المدن إلى أكواد المطارات ==========
function getAirportCode(cityName) {
    const airportCodes = {
        // كندا
        'Ottawa': 'YOW',
        'Toronto': 'YYZ',
        'Vancouver': 'YVR',
        'Montreal': 'YUL',
        'Calgary': 'YYC',
        
        // الإمارات
        'Dubai': 'DXB',
        'Abu Dhabi': 'AUH',
        
        // السعودية
        'Riyadh': 'RUH',
        'Jeddah': 'JED',
        'Dammam': 'DMM',
        
        // دول أخرى
        'London': 'LHR',
        'New York': 'JFK',
        'Paris': 'CDG',
        'Tokyo': 'NRT',
        'Singapore': 'SIN',
        'Sydney': 'SYD'
    };
    
    // البحث عن المدينة في النص
    for (const [city, code] of Object.entries(airportCodes)) {
        if (cityName.includes(city)) {
            return code;
        }
    }
    
    // إذا لم تُعثر، تُرجع آخر 3 أحرف (على افتراض أنها كود)
    return cityName.slice(-3).toUpperCase();
}

// ========== دالة لتحسين تجربة المستخدم ==========
function enhanceFlightSearch() {
    // تحسين حقل "من" لاقتراح أكواد المطارات
    const fromInput = document.getElementById('flight-from');
    const toInput = document.getElementById('flight-to');
    
    if (fromInput) {
        fromInput.addEventListener('blur', function() {
            const code = getAirportCode(this.value);
            if (code && code.length === 3 && !this.value.includes(`(${code})`)) {
                const cityName = this.value.split('(')[0].trim();
                this.value = `${cityName} (${code})`;
            }
        });
    }
    
    if (toInput) {
        toInput.addEventListener('blur', function() {
            const code = getAirportCode(this.value);
            if (code && code.length === 3 && !this.value.includes(`(${code})`)) {
                const cityName = this.value.split('(')[0].trim();
                this.value = `${cityName} (${code})`;
            }
        });
    }
    
    // إضافة زر اختبار سريع
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        const testButton = document.createElement('button');
        testButton.innerHTML = '<i class="fas fa-bolt"></i> Test Flight Search';
        testButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--gold);
            color: var(--deep-ocean);
            border: none;
            padding: 8px 15px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        
        testButton.onclick = function() {
            document.getElementById('flight-from').value = 'Riyadh (RUH)';
            document.getElementById('flight-to').value = 'Dubai (DXB)';
            document.getElementById('flight-departure').value = 
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            alert('Test data loaded! Click "Search Luxury Flights" to test');
        };
        
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(testButton);
    }
}

// ========== تهيئة النظام عند تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Flight search system initialized');
    
    // تحسين تجربة البحث
    enhanceFlightSearch();
    
    // ربط زر البحث بالدالة الجديدة (إذا كان موجوداً في الصفحة)
    const searchBtn = document.getElementById('b-fl');
    if (searchBtn) {
        const originalOnClick = searchBtn.getAttribute('onclick');
        if (originalOnClick && originalOnClick.includes('searchFlights()')) {
            // الدالة مربوطة بالفعل
            console.log('Search button already connected');
        } else {
            searchBtn.setAttribute('onclick', 'searchFlights()');
            console.log('Search button connected to new function');
        }
    }
    
    // إضافة منطقة النتائج إذا لم تكن موجودة
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
                    Flight Results
                </h3>
                <div id="results" class="flights-results"></div>
            `;
            
            flightsForm.parentNode.insertBefore(resultsContainer, flightsForm.nextSibling);
            console.log('Results container added');
        }
    }
});