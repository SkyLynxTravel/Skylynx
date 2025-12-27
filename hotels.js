// بيانات الفنادق
const hotelsData = [
    {
        id: 1,
        name: "فندق الأفق اللامع",
        location: "وسط دبي، بالقرب من برج خليفة",
        rating: 8.5,
        price: 850,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["wifi", "pool", "breakfast", "gym"],
        type: "hotel",
        stars: 5
    },
    {
        id: 2,
        name: "منتجع النخيل الذهبي",
        location: "شاطئ الجميرا، دبي",
        rating: 8.7,
        price: 1200,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["wifi", "pool", "spa", "beach"],
        type: "resort",
        stars: 5
    },
    {
        id: 3,
        name: "شقق برج الإمارات",
        location: "دبي مارينا، دبي",
        rating: 8.2,
        price: 650,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        amenities: ["wifi", "pool", "kitchen", "parking"],
        type: "apartment",
        stars: 4
    }
];

// وظيفة البحث عن الفنادق
function searchHotels() {
    const destination = document.querySelector('input[placeholder*="الوجهة"]').value;
    const checkIn = document.querySelector('input[type="date"]:first-of-type').value;
    const checkOut = document.querySelector('input[type="date"]:last-of-type').value;
    
    if (!destination) {
        alert("يرجى إدخال وجهة البحث");
        return;
    }
    
    // عرض نتائج البحث
    displaySearchResults(hotelsData);
}

// عرض نتائج البحث
function displaySearchResults(hotels) {
    const resultsSection = document.querySelector('.results-section');
    resultsSection.innerHTML = `
        <h2 style="margin-bottom: 20px;">نتائج البحث (${hotels.length} فندق)</h2>
    `;
    
    hotels.forEach(hotel => {
        const hotelCard = createHotelCard(hotel);
        resultsSection.innerHTML += hotelCard;
    });
    
    // إضافة أحداث للأزرار
    document.querySelectorAll('.select-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const hotelId = this.getAttribute('data-hotel-id');
            bookHotel(hotelId);
        });
    });
}

// إنشاء بطاقة فندق
function createHotelCard(hotel) {
    const amenitiesIcons = {
        wifi: '<i class="fas fa-wifi"></i> واي فاي',
        pool: '<i class="fas fa-swimming-pool"></i> مسبح',
        breakfast: '<i class="fas fa-coffee"></i> إفطار',
        gym: '<i class="fas fa-dumbbell"></i> جيم',
        spa: '<i class="fas fa-spa"></i> سبا',
        beach: '<i class="fas fa-umbrella-beach"></i> شاطئ',
        kitchen: '<i class="fas fa-utensils"></i> مطبخ',
        parking: '<i class="fas fa-parking"></i> موقف'
    };
    
    const amenitiesHTML = hotel.amenities
        .map(a => `<span>${amenitiesIcons[a] || a}</span>`)
        .join('');
    
    return `
        <div class="hotel-card">
            <div class="hotel-image">
                <img src="${hotel.image}?w=600&h=400&fit=crop" alt="${hotel.name}">
            </div>
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name} ${'★'.repeat(hotel.stars)}</h3>
                <p class="hotel-location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                <span class="hotel-rating">${hotel.rating} ${hotel.rating >= 8.5 ? 'ممتاز' : 'جيد جداً'}</span>
                
                <div class="hotel-amenities">
                    ${amenitiesHTML}
                </div>
                
                <div class="hotel-price">
                    <div class="price">${hotel.price * 3} ريال</div>
                    <div class="price-info">لـ 3 ليالي، يشمل الضرائب</div>
                    <button class="select-btn" data-hotel-id="${hotel.id}">
                        <i class="fas fa-bed"></i> اختر الغرفة
                    </button>
                </div>
            </div>
        </div>
    `;
}

// حجز الفندق
function bookHotel(hotelId) {
    const hotel = hotelsData.find(h => h.id == hotelId);
    if (!hotel) return;
    
    // عرض تفاصيل الحجز
    const modalHTML = `
        <div class="modal" id="bookingModal">
            <div class="modal-content">
                <h2>حجز ${hotel.name}</h2>
                <p>السعر: ${hotel.price} ريال / ليلة</p>
                <button onclick="confirmBooking(${hotelId})" class="btn-primary">تأكيد الحجز</button>
                <button onclick="closeModal()">إلغاء</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// تأكيد الحجز
function confirmBooking(hotelId) {
    alert(`تم حجز الفندق بنجاح! رقم الحجز: #${Date.now()}`);
    closeModal();
    
    // حفظ في localStorage
    const booking = {
        id: Date.now(),
        hotelId: hotelId,
        date: new Date().toLocaleDateString('ar-SA'),
        status: 'مؤكد'
    };
    
    localStorage.setItem('lastBooking', JSON.stringify(booking));
}

// إغلاق النافذة المنبثقة
function closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.remove();
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // ربط زر البحث
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchHotels);
    }
    
    // عرض الفنادق المميزة عند فتح الصفحة
    displaySearchResults(hotelsData);
});