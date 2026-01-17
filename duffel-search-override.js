/**
 * Duffel Search Override
 * يحل محل handleSearch الأصلي ليستخدم Duffel API بدلاً من TravelPayouts
 */

// Override the original handleSearch function
window.handleSearch = async function(type) {
    if (type !== 'flights') {
        // للأنواع الأخرى، استخدم الطريقة الأصلية (TravelPayouts)
        handleSearchOriginal(type);
        return;
    }
    
    // للرحلات، استخدم Duffel API
    const currentLang = localStorage.getItem('siteLang') || 'en';
    
    try {
        // جمع البيانات من النموذج
        const origin = document.getElementById('flight-from')?.value.trim();
        const destination = document.getElementById('flight-to')?.value.trim();
        const departureDate = document.getElementById('flight-departure')?.value;
        const returnDate = document.getElementById('flight-return')?.value;
        const tripType = document.querySelector('input[name="tripType"]:checked')?.value;
        const adults = parseInt(document.getElementById('adult-count')?.textContent) || 1;
        const children = parseInt(document.getElementById('children-count')?.textContent) || 0;
        const infants = parseInt(document.getElementById('infants-count')?.textContent) || 0;
        const travelClass = document.getElementById('travel-class')?.value.toLowerCase();

        // التحقق من البيانات المطلوبة
        if (!origin || !destination || !departureDate) {
            alert(currentLang === 'ar' 
                ? '⚠️ يرجى ملء جميع الحقول المطلوبة' 
                : '⚠️ Please fill in all required fields');
            return;
        }

        // استخراج كود IATA
        const originCode = extractIATACode(origin);
        const destinationCode = extractIATACode(destination);

        if (!originCode || !destinationCode) {
            alert(currentLang === 'ar' 
                ? '⚠️ يرجى اختيار مطار صالح من القائمة' 
                : '⚠️ Please select a valid airport from the list');
            return;
        }

        // إظهار حالة التحميل
        showLoadingOverlay(currentLang === 'ar' ? 'جاري البحث عن أفضل الرحلات...' : 'Searching for best flights...');

        // إعداد معاملات البحث
        const searchParams = {
            origin: originCode,
            destination: destinationCode,
            departureDate: departureDate,
            returnDate: tripType === 'roundtrip' ? returnDate : null,
            adults: adults,
            children: children,
            infants: infants,
            cabinClass: travelClass || 'economy'
        };

        console.log('🔍 Searching with Duffel API:', searchParams);

        // استدعاء API (من ملف duffel-api.js)
        if (typeof searchFlights === 'function') {
            const result = await searchFlights(searchParams);

            if (result.success && result.offers && result.offers.length > 0) {
                // حفظ النتائج في sessionStorage
                sessionStorage.setItem('flightSearchResults', JSON.stringify(result));
                sessionStorage.setItem('flightSearchParams', JSON.stringify(searchParams));
                
                // إخفاء التحميل
                hideLoadingOverlay();
                
                // التوجيه إلى صفحة النتائج
                window.location.href = '/flight-results.html';
            } else {
                hideLoadingOverlay();
                alert(currentLang === 'ar' 
                    ? '❌ لم يتم العثور على رحلات. يرجى المحاولة بتواريخ أو وجهات مختلفة.' 
                    : '❌ No flights found. Please try different dates or destinations.');
            }
        } else {
            console.error('searchFlights function not found. Make sure duffel-api.js is loaded.');
            hideLoadingOverlay();
            alert('Error: Flight search system not loaded properly.');
        }
    } catch (error) {
        console.error('Search error:', error);
        hideLoadingOverlay();
        
        let errorMessage = currentLang === 'ar' 
            ? '❌ خطأ في البحث. يرجى المحاولة مرة أخرى.' 
            : '❌ Error searching flights. Please try again.';
        
        // إضافة تلميح إذا كانت المشكلة في Backend
        if (error.message && error.message.includes('fetch')) {
            errorMessage += currentLang === 'ar'
                ? '\n\n💡 تأكد من تشغيل Backend Server.'
                : '\n\n💡 Make sure the Backend Server is running.';
        }
        
        alert(errorMessage);
    }
};

// حفظ النسخة الأصلية من handleSearch للأنواع الأخرى
window.handleSearchOriginal = function(type) {
    const forms = {
        'flights': 'https://travel.skylynxtravel.com/search',
        'private': 'https://travel.skylynxtravel.com/search',
        'hotels': 'https://search.hotellook.com',
        'cars': 'https://search.hotellook.com'
    };
    
    const currentLang = localStorage.getItem('siteLang') || 'en';
    
    showLoadingOverlay(
        currentLang === 'ar' ? 'جاري التحضير...' : 'Preparing your search...'
    );
    
    setTimeout(() => {
        const form = document.getElementById(`${type}-form`);
        if (form && forms[type]) {
            form.action = forms[type];
            form.target = '_blank';
            form.submit();
        }
        hideLoadingOverlay();
    }, 1000);
};

// Helper function
function extractIATACode(input) {
    if (!input) return '';
    
    // استخراج الكود من داخل الأقواس مثل "Ottawa (YOW)" أو "Toronto [YYZ]"
    const matchParentheses = input.match(/\(([A-Z]{3})\)|\[([A-Z]{3})\]/);
    if (matchParentheses) {
        return matchParentheses[1] || matchParentheses[2];
    }
    
    // إذا الإدخال مجرد 3 أحرف كبيرة
    if (/^[A-Z]{3}$/i.test(input)) {
        return input.toUpperCase();
    }
    
    // محاولة أخيرة: استخراج أي 3 أحرف كبيرة متتالية
    const matchThreeLetters = input.match(/[A-Z]{3}/);
    if (matchThreeLetters) {
        return matchThreeLetters[0];
    }
    
    return '';
}
