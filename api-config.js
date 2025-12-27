// ملف: js/api-config.js
// الملف الرئيسي الذي يختار بين API وهمي وحقيقي

class TravelAPI {
    constructor() {
        // التحكم في نوع الـAPI
        this.mode = localStorage.getItem('api_mode') || 'MOCK'; // MOCK أو REAL
        
        // تهيئة الـAPIs
        this.mockAPI = window.MOCK_API || null;
        this.realAPI = window.realTravelAPI || null;
        
        // إحصائيات الاستخدام
        this.stats = {
            requests: 0,
            mockRequests: 0,
            realRequests: 0,
            errors: 0
        };
    }
    
    // تغيير وضع الـAPI
    setMode(mode) {
        this.mode = mode;
        localStorage.setItem('api_mode', mode);
        console.log(`API Mode changed to: ${mode}`);
    }
    
    // الحصول على الوضع الحالي
    getMode() {
        return this.mode;
    }
    
    // ========== الرحلات ==========
    async searchFlights(searchData) {
        this.stats.requests++;
        
        try {
            if (this.mode === 'REAL' && this.realAPI) {
                this.stats.realRequests++;
                console.log('Using REAL API for flights');
                return await this.realAPI.searchFlights(searchData);
            } else {
                this.stats.mockRequests++;
                console.log('Using MOCK API for flights');
                return await this.mockAPI.searchFlights(searchData);
            }
        } catch (error) {
            this.stats.errors++;
            console.error('Error in searchFlights:', error);
            
            // Fallback إلى الوهمي
            return await this.mockAPI.searchFlights(searchData);
        }
    }
    
    // ========== الفنادق ==========
    async searchHotels(searchData) {
        this.stats.requests++;
        
        try {
            if (this.mode === 'REAL' && this.realAPI) {
                this.stats.realRequests++;
                return await this.realAPI.searchHotels(searchData);
            } else {
                this.stats.mockRequests++;
                // إذا لم يكن هناك API وهمي للفنادق، استخدم بيانات وهمية
                return this.getMockHotels(searchData);
            }
        } catch (error) {
            this.stats.errors++;
            console.error('Error in searchHotels:', error);
            return this.getMockHotels(searchData);
        }
    }
    
    // ========== السيارات ==========
    async searchCars(searchData) {
        this.stats.requests++;
        
        try {
            if (this.mode === 'REAL' && this.realAPI) {
                this.stats.realRequests++;
                return await this.realAPI.searchCars(searchData);
            } else {
                this.stats.mockRequests++;
                return this.getMockCars(searchData);
            }
        } catch (error) {
            this.stats.errors++;
            console.error('Error in searchCars:', error);
            return this.getMockCars(searchData);
        }
    }
    
    // ========== الحجز ==========
    async bookFlight(bookingData) {
        this.stats.requests++;
        
        try {
            if (this.mode === 'REAL' && this.realAPI) {
                this.stats.realRequests++;
                // في الإنتاج، استخدم API حقيقي
                return await this.mockAPI.bookFlight(bookingData);
            } else {
                this.stats.mockRequests++;
                return await this.mockAPI.bookFlight(bookingData);
            }
        } catch (error) {
            this.stats.errors++;
            console.error('Error in bookFlight:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // ========== الدفع ==========
    async processPayment(paymentData) {
        try {
            if (this.mode === 'REAL' && this.realAPI) {
                return await this.realAPI.processPayment(paymentData);
            } else {
                // محاكاة الدفع الوهمي
                return await this.mockPayment(paymentData);
            }
        } catch (error) {
            console.error('Payment Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // محاكاة الدفع الوهمي
    async mockPayment(paymentData) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
            success: Math.random() > 0.1, // 90% نجاح
            paymentId: `MOCK_${Date.now()}`,
            clientSecret: null,
            message: 'Mock payment processed successfully'
        };
    }
    
    // ========== أدوات مساعدة ==========
    getMockHotels(searchData) {
        return [
            {
                id: 'H001',
                name: 'Mock Hotel Toronto',
                location: 'Toronto, Canada',
                stars: 4,
                price: 299,
                currency: searchData.currency || 'CAD',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                amenities: ['WiFi', 'Pool', 'Gym']
            }
        ];
    }
    
    getMockCars(searchData) {
        return [
            {
                id: 'C001',
                name: 'Mock Car - Sedan',
                category: 'Economy',
                price: 89,
                currency: searchData.currency || 'CAD',
                image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
                features: ['Automatic', 'AC', '4 Seats']
            }
        ];
    }
    
    // الحصول على الإحصائيات
    getStats() {
        return {
            ...this.stats,
            mockPercentage: this.stats.requests > 0 ? 
                Math.round((this.stats.mockRequests / this.stats.requests) * 100) : 0,
            realPercentage: this.stats.requests > 0 ? 
                Math.round((this.stats.realRequests / this.stats.requests) * 100) : 0
        };
    }
    
    // تنظيف الإحصائيات
    resetStats() {
        this.stats = {
            requests: 0,
            mockRequests: 0,
            realRequests: 0,
            errors: 0
        };
    }
}

// إنشاء نسخة من الـAPI
const travelAPI = new TravelAPI();

// حفظ في النطاق العام
if (typeof window !== 'undefined') {
    window.travelAPI = travelAPI;
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('TravelAPI initialized in', travelAPI.getMode(), 'mode');
    
    // إضافة زر تحكم للوضع في صفحة الإدارة
    if (document.getElementById('apiModeToggle')) {
        document.getElementById('apiModeToggle').addEventListener('change', function(e) {
            travelAPI.setMode(e.target.checked ? 'REAL' : 'MOCK');
            alert(`API mode changed to: ${travelAPI.getMode()}`);
        });
    }
});