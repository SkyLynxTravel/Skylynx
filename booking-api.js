// booking-api.js - تكامل مع Booking.com API

class BookingAPI {
    constructor() {
        this.apiKey = 'YOUR_BOOKING_COM_API_KEY'; // استبدل بمفتاح API الحقيقي
        this.baseURL = 'https://booking-com.p.rapidapi.com/v1/hotels';
        this.headers = {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        };
    }

    // البحث عن فنادق
    async searchHotels(params) {
        try {
            const queryParams = new URLSearchParams({
                checkout_date: params.checkOut,
                room_number: params.guests.rooms,
                filter_by_currency: 'SAR',
                dest_id: params.destinationId,
                locale: 'ar',
                checkin_date: params.checkIn,
                adults_number: params.guests.adults,
                units: 'metric',
                children_number: params.guests.children,
                children_ages: params.guests.childrenAges || '',
                order_by: this.getOrderBy(params.sortBy),
                page_number: params.page || '0',
                categories_filter_ids: this.getCategoryFilter(params.filters),
                include_adjacency: 'true'
            });

            const response = await fetch(`${this.baseURL}/search?${queryParams}`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching hotels:', error);
            throw error;
        }
    }

    // الحصول على تفاصيل الفندق
    async getHotelDetails(hotelId, params) {
        try {
            const queryParams = new URLSearchParams({
                hotel_id: hotelId,
                checkout_date: params.checkOut,
                locale: 'ar',
                checkin_date: params.checkIn,
                adults_number: params.guests.adults,
                units: 'metric',
                children_number: params.guests.children,
                children_ages: params.guests.childrenAges || '',
                currency: 'SAR'
            });

            const response = await fetch(`${this.baseURL}/data?${queryParams}`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting hotel details:', error);
            throw error;
        }
    }

    // البحث عن وجهات
    async searchLocations(query) {
        try {
            const response = await fetch(
                `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=ar&name=${encodeURIComponent(query)}`,
                {
                    method: 'GET',
                    headers: this.headers
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching locations:', error);
            throw error;
        }
    }

    // الحصول على مراجعات الفندق
    async getHotelReviews(hotelId) {
        try {
            const response = await fetch(
                `https://booking-com.p.rapidapi.com/v1/hotels/reviews?hotel_id=${hotelId}&locale=ar`,
                {
                    method: 'GET',
                    headers: this.headers
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting hotel reviews:', error);
            throw error;
        }
    }

    // الحصول على صور الفندق
    async getHotelPhotos(hotelId) {
        try {
            const response = await fetch(
                `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=ar`,
                {
                    method: 'GET',
                    headers: this.headers
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting hotel photos:', error);
            throw error;
        }
    }

    // تحويل معايير الترتيب
    getOrderBy(sortBy) {
        const orderMap = {
            'recommended': 'popularity',
            'price_low': 'price',
            'price_high': 'price',
            'rating': 'class',
            'distance': 'distance'
        };
        
        return orderMap[sortBy] || 'popularity';
    }

    // تحويل الفلاتر
    getCategoryFilter(filters) {
        const categories = [];
        
        if (filters.hotelTypes && filters.hotelTypes.length > 0) {
            const typeMap = {
                'hotel': 'class::1',
                'apartment': 'class::2',
                'resort': 'class::3',
                'villa': 'class::4'
            };
            
            filters.hotelTypes.forEach(type => {
                if (typeMap[type]) categories.push(typeMap[type]);
            });
        }
        
        return categories.join(',');
    }

    // معالجة البيانات للعرض
    processHotelData(apiData) {
        return {
            hotels: apiData.result.map(hotel => ({
                id: hotel.hotel_id,
                name: hotel.hotel_name,
                rating: hotel.review_score,
                stars: hotel.class,
                location: hotel.address,
                distance: `${hotel.distance_to_cc} كم`,
                amenities: this.extractAmenities(hotel),
                type: this.getHotelType(hotel),
                pricePerNight: hotel.min_total_price,
                totalPrice: hotel.min_total_price,
                image: hotel.main_photo_url,
                reviews: hotel.review_nr,
                reviewScore: hotel.review_score,
                freeCancellation: hotel.is_free_cancellable,
                breakfastIncluded: hotel.breakfast_review_score > 0
            })),
            pagination: {
                currentPage: apiData.page_info.page_number,
                totalPages: Math.ceil(apiData.page_info.total_count / apiData.page_info.results_per_page),
                totalResults: apiData.page_info.total_count
            }
        };
    }

    extractAmenities(hotel) {
        const amenities = [];
        
        if (hotel.hotel_include_breakfast) amenities.push('breakfast');
        if (hotel.is_no_prepayment_block) amenities.push('free_cancellation');
        if (hotel.distance_to_cc < 1) amenities.push('center_location');
        
        // يمكن إضافة المزيد بناءً على بيانات API
        return amenities;
    }

    getHotelType(hotel) {
        const typeMap = {
            1: 'hotel',
            2: 'apartment',
            3: 'resort',
            4: 'villa'
        };
        
        return typeMap[hotel.class] || 'hotel';
    }
}

// تصدير الـ API للاستخدام
window.BookingAPI = BookingAPI;