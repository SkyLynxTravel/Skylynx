// server.js - خادم Node.js

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/hotels/search', async (req, res) => {
    try {
        const { destination, checkIn, checkOut, guests, sortBy, page = 1 } = req.query;
        
        // هنا يتم الاتصال بـ Booking.com API أو قاعدة البيانات
        const mockHotels = [
            {
                id: 1,
                name: "فندق الأفق اللامع",
                rating: 4.5,
                stars: 5,
                location: "وسط دبي",
                pricePerNight: 850,
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
            }
        ];
        
        res.json({
            success: true,
            data: mockHotels,
            pagination: {
                page: parseInt(page),
                totalPages: 5,
                totalResults: 50
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطأ في الخادم'
        });
    }
});

app.get('/api/hotels/:id', async (req, res) => {
    try {
        const hotelId = req.params.id;
        
        // جلب بيانات الفندق من قاعدة البيانات أو API
        const hotelDetails = {
            id: hotelId,
            name: "فندق الأفق اللامع",
            description: "فندق فاخر في قلب دبي",
            amenities: ["واي فاي مجاني", "مسبح", "إفطار"],
            rooms: [
                { id: 1, name: "غرفة ديلوكس", price: 850 },
                { id: 2, name: "سويت", price: 1200 }
            ]
        };
        
        res.json({
            success: true,
            data: hotelDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطأ في الخادم'
        });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const bookingData = req.body;
        
        // هنا يتم حفظ الحجز في قاعدة البيانات
        const bookingId = 'BK' + Date.now();
        
        res.json({
            success: true,
            bookingId: bookingId,
            message: 'تم الحجز بنجاح'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطأ في الحجز'
        });
    }
});

// Serve HTML files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});