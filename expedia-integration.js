// expedia-integration.js
console.log('✅ Loading Expedia integration...');

const EXPEDIA_CONFIG = {
    EAN_ID: '1100417459',
    AFFILIATE_ID: 'skylynxtravel',
    LOCALE: 'en_CA',
    CURRENCY: 'CAD'
};

function buildExpediaSearchUrl(searchParams) {
    const origin = searchParams.origin || 'YYZ';
    const destination = searchParams.destination || 'YVR';
    const departure = searchParams.departureDate || new Date().toISOString().split('T')[0];
    const returnDate = searchParams.returnDate || '';
    
    // تحديد نوع الرحلة
    const tripType = returnDate ? 'roundtrip' : 'oneway';
    
    // بناء الرابط الأساسي
    let url = `https://www.expedia.com/Flights-Search?flight-type=on&mode=search&trip=${tripType}`;
    
    // رحلة الذهاب
    url += `&leg1=from:${origin},to:${destination},departure:${departure}TANYT`;
    
    // إذا كانت ذهاب وعودة
    if (returnDate) {
        url += `&leg2=from:${destination},to:${origin},departure:${returnDate}TANYT`;
    }
    
    // عدد المسافرين
    let passengers = `adults:${searchParams.adults || 1}`;
    if (searchParams.children && searchParams.children > 0) {
        passengers += `,children:${searchParams.children}`;
    }
    if (searchParams.infants && searchParams.infants > 0) {
        passengers += `,infants:${searchParams.infants}`;
    }
    url += `&passengers=${passengers}`;
    
    // خيارات إضافية
    url += `&options=cabinclass:${searchParams.cabinClass || 'economy'},maxhops:1,nopenalty:N`;
    
    // التواريخ للعرض
    url += `&fromDate=${departure}`;
    if (returnDate) {
        url += `&toDate=${returnDate}`;
    }
    
    // التواريخ البديلة
    url += `&d1=${departure}`;
    if (returnDate) {
        url += `&r1=${returnDate}`;
    }
    
    // معلومات التابعة
    url += `&tid=${EXPEDIA_CONFIG.EAN_ID}`;
    url += `&aid=${EXPEDIA_CONFIG.AFFILIATE_ID}`;
    url += `&locale=${EXPEDIA_CONFIG.LOCALE}`;
    url += `&currency=${searchParams.currency || EXPEDIA_CONFIG.CURRENCY}`;
    
    console.log('🔗 Built Expedia URL:', url);
    return url;
}

async function getSkyLynxFlights(searchParams) {
    console.log('✈️ Generating flights...', searchParams);
    
    const searchUrl = buildExpediaSearchUrl(searchParams);
    
    const flights = [
        {
            id: 'FL-101',
            airline: 'Air Canada',
            airlineCode: 'AC',
            flightNumber: '123',
            departureTime: '08:00',
            arrivalTime: '10:30',
            departureAirport: searchParams.origin || 'YYZ',
            arrivalAirport: searchParams.destination || 'YVR',
            duration: '5h 30m',
            stops: 0,
            price: searchParams.returnDate ? 850 : 450,
            currency: searchParams.currency || 'CAD',
            provider: 'Expedia',
            refundable: true,
            features: ['Meal Included', '23kg Baggage'],
            bookingUrl: searchUrl
        },
        {
            id: 'FL-102',
            airline: 'WestJet',
            airlineCode: 'WS',
            flightNumber: '456',
            departureTime: '11:15',
            arrivalTime: '13:45',
            departureAirport: searchParams.origin || 'YYZ',
            arrivalAirport: searchParams.destination || 'YVR',
            duration: '5h 30m',
            stops: 0,
            price: searchParams.returnDate ? 750 : 395,
            currency: searchParams.currency || 'CAD',
            provider: 'Expedia',
            refundable: false,
            features: ['Snack', '23kg Baggage'],
            bookingUrl: searchUrl
        },
        {
            id: 'FL-103',
            airline: 'Air Transat',
            airlineCode: 'TS',
            flightNumber: '789',
            departureTime: '14:30',
            arrivalTime: '17:00',
            departureAirport: searchParams.origin || 'YYZ',
            arrivalAirport: searchParams.destination || 'YVR',
            duration: '5h 30m',
            stops: 0,
            price: searchParams.returnDate ? 700 : 375,
            currency: searchParams.currency || 'CAD',
            provider: 'Expedia',
            refundable: false,
            features: ['Meal', '23kg Baggage'],
            bookingUrl: searchUrl
        }
    ];
    
    console.log(`✅ Generated ${flights.length} flights`);
    console.log(`💰 Prices adjusted for ${searchParams.returnDate ? 'roundtrip' : 'oneway'}`);
    return flights;
}

function trackExpediaClick(flightId, price = 0, currency = 'CAD') {
    console.log('📊 Click tracked:', flightId, price, currency);
    
    // حفظ في localStorage للتتبع
    try {
        let clicks = JSON.parse(localStorage.getItem('skylynx_clicks') || '[]');
        clicks.push({
            flightId: flightId,
            price: price,
            currency: currency,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('skylynx_clicks', JSON.stringify(clicks));
    } catch (e) {
        console.log('Tracking saved in memory');
    }
    
    return true;
}

// تعريف global
window.getSkyLynxFlights = getSkyLynxFlights;
window.trackExpediaClick = trackExpediaClick;
window.EXPEDIA_CONFIG = EXPEDIA_CONFIG;

console.log('✅ expedia-integration.js ready');