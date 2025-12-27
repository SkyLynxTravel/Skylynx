// نظام السلة
const cart = {
    items: [],
    
    // إضافة فندق للسلة
    addHotel(hotel, checkIn, checkOut, guests) {
        const cartItem = {
            type: 'hotel',
            id: `hotel_${hotel.id}_${Date.now()}`,
            hotel: hotel,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests,
            price: hotel.price,
            addedAt: new Date().toISOString()
        };
        
        this.items.push(cartItem);
        this.saveToLocalStorage();
        this.updateCartUI();
        this.showNotification('تمت إضافة الفندق إلى السلة');
    },
    
    // إزالة من السلة
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToLocalStorage();
        this.updateCartUI();
        this.showNotification('تمت الإزالة من السلة');
    },
    
    // حفظ في localStorage
    saveToLocalStorage() {
        localStorage.setItem('skylynx_cart', JSON.stringify(this.items));
    },
    
    // تحميل من localStorage
    loadFromLocalStorage() {
        const saved = localStorage.getItem('skylynx_cart');
        if (saved) {
            this.items = JSON.parse(saved);
            this.updateCartUI();
        }
    },
    
    // تحديث واجهة السلة
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.length;
        }
        
        this.updateFloatingCart();
    },
    
    // السلة العائمة
    updateFloatingCart() {
        let floatingCart = document.getElementById('floatingCart');
        
        if (!floatingCart) {
            floatingCart = document.createElement('div');
            floatingCart.id = 'floatingCart';
            floatingCart.className = 'floating-cart';
            document.body.appendChild(floatingCart);
        }
        
        if (this.items.length === 0) {
            floatingCart.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>السلة فارغة</p>
                </div>
            `;
            return;
        }
        
        let total = 0;
        let itemsHTML = '';
        
        this.items.forEach(item => {
            total += item.price;
            itemsHTML += `
                <div class="cart-item">
                    <h4>${item.hotel.name}</h4>
                    <p>${item.checkIn} - ${item.checkOut}</p>
                    <span class="price">${item.price} ريال</span>
                </div>
            `;
        });
        
        floatingCart.innerHTML = `
            <div class="cart-header">
                <h3>سلة الحجوزات (${this.items.length})</h3>
            </div>
            <div class="cart-items">
                ${itemsHTML}
            </div>
            <div class="cart-total">
                <span>الإجمالي:</span>
                <span class="total-price">${total} ريال</span>
            </div>
            <button class="btn btn-primary" onclick="window.location.href='checkout.html'">
                اتمام الشراء
            </button>
        `;
    },
    
    // إظهار إشعار
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// تهيئة السلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    cart.loadFromLocalStorage();
});