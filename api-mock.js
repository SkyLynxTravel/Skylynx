// ملف: api-mock.js
// واجهات برمجة وهمية للاختبار

const MOCK_API = {
    // البحث عن المطارات
    searchAirports: async function(query) {
        const airports = [
            { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada' },
            { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
            { code: 'YUL', name: 'Montréal–Trudeau International', city: 'Montreal', country: 'Canada' },
            { code: 'YYC', name: 'Calgary International', city: 'Calgary', country: 'Canada' },
            { code: 'YOW', name: 'Ottawa Macdonald–Cartier International', city: 'Ottawa', country: 'Canada' },
            { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
            { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
            { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
            { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
            { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
            { code: 'RUH', name: 'King Khalid International', city: 'Riyadh', country: 'Saudi Arabia' },
            { code: 'JED', name: 'King Abdulaziz International', city: 'Jeddah', country: 'Saudi Arabia' }
        ];

        return airports.filter(airport => 
            airport.city.toLowerCase().includes(query.toLowerCase()) ||
            airport.code.toLowerCase().includes(query.toLowerCase()) ||
            airport.name.toLowerCase().includes(query.toLowerCase())
        );
    },

    // البحث عن الرحلات
    searchFlights: async function(searchData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const exchangeRates = {
            'CAD': 1,
            'USD': 0.73,
            'SAR': 2.74,
            'EUR': 0.68,
            'GBP': 0.58
        };
        
        const basePrice = 450;
        const exchangeRate = exchangeRates[searchData.currency] || 1;
        
        const flights = [];
        const airlines = [
            { name: 'Air Canada', code: 'AC', provider: 'Expedia' },
            { name: 'WestJet', code: 'WS', provider: 'Booking.com' },
            { name: 'Air Transat', code: 'TS', provider: 'Expedia' },
            { name: 'Porter Airlines', code: 'PD', provider: 'Booking.com' }
        ];
        
        const times = ['08:00', '11:15', '14:30', '17:45', '21:00'];
        const durations = ['2h 30m', '3h 15m', '4h 00m', '5h 30m', '6h 45m'];
        
        for (let i = 0; i < 8; i++) {
            const airline = airlines[i % airlines.length];
            const stops = Math.random() > 0.7 ? 1 : 0;
            const priceVariation = (Math.random() * 200) - 100;
            
            flights.push({
                id: `${airline.code}${100 + i}`,
                airline: airline.name,
                airlineCode: airline.code,
                flightNumber: `${airline.code} ${1000 + i}`,
                departureTime: times[i % times.length],
                arrivalTime: this.addTime(times[i % times.length], durations[i % durations.length]),
                departureAirport: 'YYZ',
                arrivalAirport: 'YVR',
                duration: durations[i % durations.length],
                stops: stops,
                price: Math.round((basePrice + priceVariation) * exchangeRate),
                currency: searchData.currency,
                provider: airline.provider,
                refundable: Math.random() > 0.3,
                features: ['Meal Included', 'Free WiFi', '23kg Baggage'],
                departureDateTime: `${searchData.departure}T${times[i % times.length]}:00`
            });
        }
        
        flights.sort((a, b) => a.price - b.price);
        return flights;
    },
    
    addTime: function(startTime, duration) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const [durHours, durMinutes] = duration.match(/\d+/g).map(Number);
        
        let newHours = hours + durHours;
        let newMinutes = minutes + durMinutes;
        
        if (newMinutes >= 60) {
            newHours += Math.floor(newMinutes / 60);
            newMinutes = newMinutes % 60;
        }
        
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    },
    
    bookFlight: async function(bookingData) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let reference = 'SKY-';
        for (let i = 0; i < 8; i++) {
            reference += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return {
            success: true,
            bookingReference: reference,
            bookingId: `BK${Date.now()}`,
            message: 'Booking confirmed successfully'
        };
    }
};

if (typeof window !== 'undefined') {
    window.MOCK_API = MOCK_API;
}