// airports-db.js
// قاعدة بيانات المطارات العالمية - TravelPayouts Integration

class AirportsDatabase {
    constructor() {
        this.airports = [];
        this.cities = [];
        this.initialized = false;
        this.cache = new Map();
        this.cacheDuration = 24 * 60 * 60 * 1000; // 24 ساعة
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // محاولة تحميل من التخزين المحلي أولاً
            const cached = this.loadFromLocalStorage();
            if (cached && cached.airports && cached.timestamp) {
                const age = Date.now() - cached.timestamp;
                if (age < this.cacheDuration) {
                    this.airports = cached.airports;
                    this.cities = cached.cities;
                    this.initialized = true;
                    console.log('Airports database loaded from cache');
                    return;
                }
            }
            
            // إذا لم توجد بيانات مخزنة أو انتهت صلاحيتها، جلب جديدة
            await this.fetchFromTravelPayouts();
            this.saveToLocalStorage();
            this.initialized = true;
            console.log('Airports database initialized');
            
        } catch (error) {
            console.error('Failed to initialize airports database:', error);
            // استخدام بيانات احتياطية
            this.loadBackupData();
            this.initialized = true;
        }
    }

    async fetchFromTravelPayouts() {
        const locales = ['en', 'ar'];
        const allAirports = [];
        
        for (const locale of locales) {
            try {
                const response = await fetch(
                    `https://api.travelpayouts.com/data/en/airports.json?locale=${locale}`
                );
                
                if (!response.ok) continue;
                
                const data = await response.json();
                const processed = this.processAirportsData(data, locale);
                allAirports.push(...processed);
                
            } catch (error) {
                console.error(`Failed to fetch data for locale ${locale}:`, error);
            }
        }
        
        // دمج البيانات وتنظيفها
        this.airports = this.mergeAndCleanAirports(allAirports);
        this.cities = this.extractCities(this.airports);
    }

    processAirportsData(data, locale) {
        return data.map(airport => ({
            code: airport.code || airport.iata,
            name: airport.name,
            city: airport.city,
            country: airport.country,
            country_code: airport.country_code,
            timezone: airport.timezone,
            coordinates: {
                lat: airport.coordinates?.lat || airport.lat,
                lon: airport.coordinates?.lon || airport.lon
            },
            type: 'airport',
            locale: locale,
            priority: this.calculatePriority(airport),
            name_translations: airport.name_translations || {},
            city_translations: airport.city_translations || {}
        })).filter(airport => 
            airport.code && 
            airport.city && 
            airport.country &&
            airport.code.length === 3
        );
    }

    mergeAndCleanAirports(airports) {
        const merged = new Map();
        
        airports.forEach(airport => {
            const key = airport.code;
            
            if (!merged.has(key)) {
                merged.set(key, {
                    ...airport,
                    names: {},
                    cities: {}
                });
            }
            
            const existing = merged.get(key);
            existing.names[airport.locale] = airport.name;
            existing.cities[airport.locale] = airport.city;
            
            // الحفاظ على أعلى أولوية
            if (airport.priority > existing.priority) {
                existing.priority = airport.priority;
            }
        });
        
        return Array.from(merged.values());
    }

    extractCities(airports) {
        const cityMap = new Map();
        
        airports.forEach(airport => {
            const cityKey = `${airport.city}_${airport.country_code}`.toLowerCase();
            
            if (!cityMap.has(cityKey)) {
                cityMap.set(cityKey, {
                    code: airport.city.slice(0, 3).toUpperCase(),
                    name: airport.city,
                    country: airport.country,
                    country_code: airport.country_code,
                    airports: [],
                    names: {},
                    cities: {}
                });
            }
            
            const city = cityMap.get(cityKey);
            city.airports.push(airport.code);
            
            // تجميع الترجمات
            Object.entries(airport.names).forEach(([locale, name]) => {
                city.names[locale] = name;
            });
            
            Object.entries(airport.cities).forEach(([locale, cityName]) => {
                city.cities[locale] = cityName;
            });
        });
        
        return Array.from(cityMap.values());
    }

    calculatePriority(airport) {
        let priority = 0;
        
        // مطارات رئيسية
        const majorAirports = ['DXB', 'LHR', 'JFK', 'CDG', 'HKG', 'SIN', 'FRA', 'AMS', 'IST'];
        if (majorAirports.includes(airport.code)) priority += 100;
        
        // مطارات عاصمة
        const capitalAirports = [
            'CAI', 'RUH', 'JED', 'DOH', 'AUH', 'MCT', 'KWI', 'BAH', 'BEY', 
            'AMM', 'DAM', 'ALG', 'TUN', 'RBA', 'CMN', 'TUN'
        ];
        if (capitalAirports.includes(airport.code)) priority += 50;
        
        // حجم المدينة
        if (airport.city === 'Dubai' || airport.city === 'دبي') priority += 30;
        if (airport.city === 'Riyadh' || airport.city === 'الرياض') priority += 30;
        if (airport.city === 'Jeddah' || airport.city === 'جدة') priority += 20;
        
        return priority;
    }

    search(query, locale = 'en', type = 'both', limit = 10) {
        if (!this.initialized) return [];
        
        query = query.toLowerCase().trim();
        if (query.length < 2) return [];
        
        // التحقق من التخزين المؤقت
        const cacheKey = `${query}_${locale}_${type}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        let results = [];
        
        if (type === 'airports' || type === 'both') {
            const airportResults = this.searchAirports(query, locale);
            results.push(...airportResults);
        }
        
        if (type === 'cities' || type === 'both') {
            const cityResults = this.searchCities(query, locale);
            results.push(...cityResults);
        }
        
        // فرز النتائج حسب الأولوية
        results.sort((a, b) => b.priority - a.priority);
        
        // إزالة التكرارات
        results = this.removeDuplicates(results);
        
        // تحديد الحد الأقصى للنتائج
        results = results.slice(0, limit);
        
        // التخزين المؤقت
        this.cache.set(cacheKey, results);
        
        return results;
    }

    searchAirports(query, locale) {
        return this.airports.filter(airport => {
            // البحث بالرمز
            if (airport.code.toLowerCase().includes(query)) return true;
            
            // البحث بالاسم (باللغة المطلوبة)
            const name = airport.names[locale] || airport.name || '';
            if (name.toLowerCase().includes(query)) return true;
            
            // البحث بالمدينة (باللغة المطلوبة)
            const city = airport.cities[locale] || airport.city || '';
            if (city.toLowerCase().includes(query)) return true;
            
            // البحث بالبلد
            if (airport.country.toLowerCase().includes(query)) return true;
            
            return false;
        }).map(airport => ({
            type: 'airport',
            code: airport.code,
            name: airport.names[locale] || airport.name,
            city: airport.cities[locale] || airport.city,
            country: airport.country,
            country_code: airport.country_code,
            priority: airport.priority,
            displayText: `${airport.cities[locale] || airport.city} (${airport.code}) - ${airport.country}`,
            fullDisplay: `${airport.cities[locale] || airport.city} - ${airport.names[locale] || airport.name} (${airport.code})`
        }));
    }

    searchCities(query, locale) {
        return this.cities.filter(city => {
            // البحث باسم المدينة
            const cityName = city.cities[locale] || city.name || '';
            if (cityName.toLowerCase().includes(query)) return true;
            
            // البحث بالبلد
            if (city.country.toLowerCase().includes(query)) return true;
            
            // البحث بأكواد المطارات في المدينة
            return city.airports.some(code => 
                code.toLowerCase().includes(query)
            );
        }).map(city => ({
            type: 'city',
            code: city.code,
            name: city.cities[locale] || city.name,
            country: city.country,
            country_code: city.country_code,
            airports: city.airports,
            priority: this.calculateCityPriority(city),
            displayText: `${city.cities[locale] || city.name}, ${city.country}`,
            fullDisplay: `${city.cities[locale] || city.name}, ${city.country} - ${city.airports.join(', ')}`
        }));
    }

    calculateCityPriority(city) {
        let priority = 0;
        
        // مدن رئيسية
        const majorCities = ['Dubai', 'دبي', 'Riyadh', 'الرياض', 'Jeddah', 'جدة', 
                            'Doha', 'الدوحة', 'Abu Dhabi', 'أبو ظبي'];
        
        const cityName = city.name.toLowerCase();
        if (majorCities.some(mc => mc.toLowerCase() === cityName)) {
            priority += 100;
        }
        
        // عواصم
        const capitalCities = ['Cairo', 'القاهرة', 'Riyadh', 'الرياض', 'Doha', 'الدوحة',
                              'Abu Dhabi', 'أبو ظبي', 'Kuwait', 'الكويت', 'Manama', 'المنامة'];
        
        if (capitalCities.some(cc => cc.toLowerCase() === cityName)) {
            priority += 80;
        }
        
        // عدد المطارات في المدينة
        priority += city.airports.length * 10;
        
        return priority;
    }

    removeDuplicates(results) {
        const seen = new Set();
        return results.filter(item => {
            const key = `${item.type}_${item.code}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    saveToLocalStorage() {
        try {
            const data = {
                airports: this.airports,
                cities: this.cities,
                timestamp: Date.now()
            };
            localStorage.setItem('skylynx_airports_db', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('skylynx_airports_db');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return null;
        }
    }

    loadBackupData() {
        // بيانات احتياطية للمطارات الرئيسية
        this.airports = [
            {
                code: 'DXB',
                name: 'Dubai International Airport',
                city: 'Dubai',
                country: 'United Arab Emirates',
                country_code: 'AE',
                names: { en: 'Dubai International Airport', ar: 'مطار دبي الدولي' },
                cities: { en: 'Dubai', ar: 'دبي' },
                priority: 150
            },
            {
                code: 'JED',
                name: 'King Abdulaziz International Airport',
                city: 'Jeddah',
                country: 'Saudi Arabia',
                country_code: 'SA',
                names: { en: 'King Abdulaziz International Airport', ar: 'مطار الملك عبدالعزيز الدولي' },
                cities: { en: 'Jeddah', ar: 'جدة' },
                priority: 140
            },
            {
                code: 'RUH',
                name: 'King Khalid International Airport',
                city: 'Riyadh',
                country: 'Saudi Arabia',
                country_code: 'SA',
                names: { en: 'King Khalid International Airport', ar: 'مطار الملك خالد الدولي' },
                cities: { en: 'Riyadh', ar: 'الرياض' },
                priority: 140
            }
        ];
        
        this.cities = [
            {
                code: 'DXB',
                name: 'Dubai',
                country: 'United Arab Emirates',
                country_code: 'AE',
                airports: ['DXB', 'DWC'],
                names: { en: 'Dubai', ar: 'دبي' },
                cities: { en: 'Dubai', ar: 'دبي' }
            }
        ];
    }

    clearCache() {
        this.cache.clear();
        localStorage.removeItem('skylynx_airports_db');
        this.initialized = false;
    }
}

// إنشاء نسخة عامة
const airportsDB = new AirportsDatabase();

// التصدير للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { airportsDB };
}