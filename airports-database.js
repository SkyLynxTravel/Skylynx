// airports-database.js - قاعدة بيانات المطارات العالمية
const AIRPORTS_DATABASE = {
    // ========== كندا ==========
    'toronto': 'YYZ', 'toronto pearson': 'YYZ', 'yyz': 'YYZ',
    'vancouver': 'YVR', 'yvr': 'YVR',
    'montreal': 'YUL', 'yul': 'YUL',
    'calgary': 'YYC', 'yyc': 'YYC',
    'edmonton': 'YEG', 'yeg': 'YEG',
    'ottawa': 'YOW', 'yow': 'YOW',
    
    // ========== الولايات المتحدة ==========
    'new york': 'JFK', 'jfk': 'JFK', 'new york kennedy': 'JFK',
    'los angeles': 'LAX', 'lax': 'LAX',
    'chicago': 'ORD', 'ord': 'ORD', 'o hare': 'ORD',
    'miami': 'MIA', 'mia': 'MIA',
    'las vegas': 'LAS', 'las': 'LAS',
    'san francisco': 'SFO', 'sfo': 'SFO',
    'seattle': 'SEA', 'sea': 'SEA',
    'boston': 'BOS', 'bos': 'BOS',
    'washington': 'IAD', 'dulles': 'IAD', 'iad': 'IAD',
    'atlanta': 'ATL', 'atl': 'ATL',
    'dallas': 'DFW', 'dfw': 'DFW',
    'houston': 'IAH', 'iah': 'IAH',
    
    // ========== أوروبا ==========
    'london': 'LHR', 'lhr': 'LHR', 'london heathrow': 'LHR',
    'paris': 'CDG', 'cdg': 'CDG', 'paris charles de gaulle': 'CDG',
    'frankfurt': 'FRA', 'fra': 'FRA',
    'amsterdam': 'AMS', 'ams': 'AMS',
    'madrid': 'MAD', 'mad': 'MAD',
    'barcelona': 'BCN', 'bcn': 'BCN',
    'rome': 'FCO', 'fco': 'FCO', 'rome fiumicino': 'FCO',
    'milan': 'MXP', 'mxp': 'MXP',
    'munich': 'MUC', 'muc': 'MUC',
    'zurich': 'ZRH', 'zrh': 'ZRH',
    'istanbul': 'IST', 'ist': 'IST',
    'dublin': 'DUB', 'dub': 'DUB',
    'athens': 'ATH', 'ath': 'ATH',
    'lisbon': 'LIS', 'lis': 'LIS',
    'prague': 'PRG', 'prg': 'PRG',
    'budapest': 'BUD', 'bud': 'BUD',
    'warsaw': 'WAW', 'waw': 'WAW',
    'stockholm': 'ARN', 'arn': 'ARN',
    'copenhagen': 'CPH', 'cph': 'CPH',
    'oslo': 'OSL', 'osl': 'OSL',
    'helsinki': 'HEL', 'hel': 'HEL',
    
    // ========== الشرق الأوسط ==========
    'dubai': 'DXB', 'dxb': 'DXB',
    'abu dhabi': 'AUH', 'auh': 'AUH',
    'doha': 'DOH', 'doh': 'DOH',
    'riyadh': 'RUH', 'ruh': 'RUH',
    'jeddah': 'JED', 'jed': 'JED',
    'kuwait': 'KWI', 'kwi': 'KWI',
    'muscat': 'MCT', 'mct': 'MCT',
    'manama': 'BAH', 'bah': 'BAH',
    'cairo': 'CAI', 'cai': 'CAI',
    'beirut': 'BEY', 'bey': 'BEY',
    'amman': 'AMM', 'amm': 'AMM',
    
    // ========== آسيا ==========
    'tokyo': 'NRT', 'nrt': 'NRT', 'narita': 'NRT',
    'tokyo haneda': 'HND', 'hnd': 'HND',
    'seoul': 'ICN', 'icn': 'ICN', 'incheon': 'ICN',
    'singapore': 'SIN', 'sin': 'SIN', 'changi': 'SIN',
    'hong kong': 'HKG', 'hkg': 'HKG',
    'shanghai': 'PVG', 'pvg': 'PVG',
    'beijing': 'PEK', 'pek': 'PEK',
    'bangkok': 'BKK', 'bkk': 'BKK',
    'kuala lumpur': 'KUL', 'kul': 'KUL',
    'jakarta': 'CGK', 'cgk': 'CGK',
    'manila': 'MNL', 'mnl': 'MNL',
    'delhi': 'DEL', 'del': 'DEL',
    'mumbai': 'BOM', 'bom': 'BOM',
    'bangalore': 'BLR', 'blr': 'BLR',
    'sydney': 'SYD', 'syd': 'SYD',
    'melbourne': 'MEL', 'mel': 'MEL',
    
    // ========== أفريقيا ==========
    'johannesburg': 'JNB', 'jnb': 'JNB',
    'cape town': 'CPT', 'cpt': 'CPT',
    'nairobi': 'NBO', 'nbo': 'NBO',
    'casablanca': 'CMN', 'cmn': 'CMN',
    'accra': 'ACC', 'acc': 'ACC',
    'lagos': 'LOS', 'los': 'LOS'
};

// دالة استخراج رمز المطار
function extractAirportCode(locationString) {
    if (!locationString) return 'YYZ';
    
    // تحويل للنص الصغير وإزالة المسافات الزائدة
    const searchText = locationString.toLowerCase().trim();
    
    // 1. البحث عن رمز مطار مباشر (XXX)
    const codeMatch = searchText.match(/\b([A-Z]{3})\b/);
    if (codeMatch && AIRPORTS_DATABASE[codeMatch[1].toLowerCase()]) {
        return codeMatch[1].toUpperCase();
    }
    
    // 2. البحث عن رمز بين أقواس (XXX)
    const parenMatch = searchText.match(/\(([a-z]{3})\)/);
    if (parenMatch && AIRPORTS_DATABASE[parenMatch[1]]) {
        return parenMatch[1].toUpperCase();
    }
    
    // 3. البحث باسم المدينة
    for (const [city, code] of Object.entries(AIRPORTS_DATABASE)) {
        if (searchText.includes(city)) {
            console.log(`✅ Matched "${searchText}" to ${code} (${city})`);
            return code;
        }
    }
    
    // 4. البحث الجزئي
    for (const [city, code] of Object.entries(AIRPORTS_DATABASE)) {
        const words = searchText.split(' ');
        for (const word of words) {
            if (word.length > 3 && city.includes(word)) {
                console.log(`🔍 Partial match "${word}" in "${searchText}" to ${code}`);
                return code;
            }
        }
    }
    
    // 5. إذا لم يتم العثور، استخدم الافتراضي
    console.log(`⚠️ No match found for "${searchText}", using YYZ as default`);
    return 'YYZ';
}

// جعل الدالة متاحة عالمياً
if (typeof window !== 'undefined') {
    window.AIRPORTS_DATABASE = AIRPORTS_DATABASE;
    window.extractAirportCode = extractAirportCode;
}

console.log('✅ airports-database.js loaded with', Object.keys(AIRPORTS_DATABASE).length, 'airports');