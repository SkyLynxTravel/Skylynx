/**
 * TravelPayouts API Integration
 * للحصول على بيانات طيران حقيقية
 */

class TravelPayoutsIntegration {
    constructor() {
        this.token = 'YOUR_TRAVELPAYOUTS_TOKEN'; // احصل عليه من travelpayouts.com
        this.baseURL = 'https://api.travelpayouts.com/v2';
        this.currency = 'USD';
        this.locale = 'en';
    }

    /**
     * البحث عن رحلات طيران
     */
    async searchFlights(params) {
        try {
            const response = await fetch(
                `${this.baseURL}/prices/latest?` +
                `currency=${this.currency}&` +
                `period_type=year&` +
                `page=1&` +
                `limit=10&` +
                `one_way=false&` +
                `token=${this.token}`
            );
            
            return await response.json();
        } catch (error) {
            console.error('TravelPayouts search error:', error);
            return null;
        }
    }

    /**
     * الحصول على أسعار الفنادق
     */
    async getHotelPrices(location, checkIn, checkOut) {
        try {
            const response = await fetch(
                `${this.baseURL}/prices/hotel?` +
                `location=${location}&` +
                `check_in=${checkIn}&` +
                `check_out=${checkOut}&` +
                `currency=${this.currency}&` +
                `limit=5&` +
                `token=${this.token}`
            );
            
            return await response.json();
        } catch (error) {
            console.error('Hotel prices error:', error);
            return null;
        }
    }

    /**
     * اقتراحات تلقائية للمدن
     */
    async getCitySuggestions(query) {
        try {
            const response = await fetch(
                `https://autocomplete.travelpayouts.com/places2?` +
                `term=${encodeURIComponent(query)}&` +
                `locale=${this.locale}&` +
                `types[]=city`
            );
            
            return await response.json();
        } catch (error) {
            console.error('City suggestions error:', error);
            return [];
        }
    }
    
    /**
     * الحصول على أسعار رحلة محددة
     */
    async getFlightPrice(origin, destination, date) {
        try {
            const response = await fetch(
                `${this.baseURL}/prices/cheap?` +
                `origin=${origin}&` +
                `destination=${destination}&` +
                `depart_date=${date}&` +
                `currency=${this.currency}&` +
                `token=${this.token}`
            );
            
            return await response.json();
        } catch (error) {
            console.error('Flight price error:', error);
            return null;
        }
    }
}

// استخدامه مع المساعد الذكي
if (window.skylynxAI) {
    window.skylynxAI.travelPayouts = new TravelPayoutsIntegration();
}