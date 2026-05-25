// ==================== CONFIGURATION ====================
const CONFIG = {
    adminPhone: '01829406375',
    adminPassword: '#password7*098#',
    shopName: 'BeeEye'
};

// ==================== PRODUCTS ====================
let products = [
    { id: 1, name: "Samsung Galaxy A14 স্মার্টফোন", price: 15999, originalPrice: 18999, discount: 16, category: "electronics", emoji: "📱", rating: 4.5, reviews: 234, sold: 1250, isDeal: false, stock: 50 },
    { id: 2, name: "Xiaomi Redmi Note 12 Pro 5G", price: 26999, originalPrice: 32999, discount: 18, category: "electronics", emoji: "📱", rating: 4.7, reviews: 567, sold: 2340, isDeal: true, stock: 30 },
    { id: 3, name: "HP Laptop 15s Intel Core i5", price: 58999, originalPrice: 72000, discount: 18, category: "laptop", emoji: "💻", rating: 4.6, reviews: 189, sold: 890, isDeal: false, stock: 15 },
    { id: 4, name: "Dell Inspiron 15 Intel Core i3", price: 44999, originalPrice: 55000, discount: 18, category: "laptop", emoji: "💻", rating: 4.4, reviews: 145, sold: 567, isDeal: false, stock: 20 },
    { id: 5, name: "Panjabi Premium Quality - সাদা", price: 1299, originalPrice: 1999, discount: 35, category: "clothing", emoji: "👕", rating: 4.3, reviews: 890, sold: 4500, isDeal: true, stock: 100 },
    { id: 6, name: "Casual Shirt - সবুজ", price: 899, originalPrice: 1299, discount: 31, category: "clothing", emoji: "👕", rating: 4.2, reviews: 234, sold: 2100, isDeal: false, stock: 80 },
    { id: 7, name: "Nike Running Shoes - কালো", price: 3499, originalPrice: 4999, discount: 30, category: "shoes", emoji: "👟", rating: 4.8, reviews: 567, sold: 3200, isDeal: true, stock: 40 },
    { id: 8, name: "Bata Formal Shoes - বাদামী", price: 2299, originalPrice: 2999, discount: 23, category: "shoes", emoji: "👞", rating: 4.5, reviews: 345, sold: 1800, isDeal: false, stock: 35 },
    { id: 9, name: "Garnier Bright Complete Serum", price: 650, originalPrice: 850, discount: 24, category: "beauty", emoji: "💄", rating: 4.4, reviews: 678, sold: 5600, isDeal: true, stock: 60 },
    { id: 10, name: "L'Oreal Revitalift Cream", price: 890, originalPrice: 1100, discount: 19, category: "beauty", emoji: "🧴", rating: 4.6, reviews: 456, sold: 3400, isDeal: false, stock: 45 }
];

// ==================== VARIABLES ====================
let cart = [];
let wishlist = [];
let orders = [];
let users = [];
let currentUser = null;
let currentSlide = 0;

const slides = [
    { emoji: "🎉", text: "৫০% ছাড় - সব মোবাইলে!", bg: "linear-gradient(135deg, #ff6b6b, #ee5a24)" },
    { emoji: "🚀", text: "নতুন ল্যাপটপ কালেকশন", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
    { emoji: "💄", text: "বিউটি প্রোডাক্টে ৩০% ছাড়", bg: "linear-gradient(135deg, #11998e, #38ef7d)" }
];

// ==================== LOAD/SAVE DATA ====================
function loadData() {
    if (localStorage.getItem('products')) products = JSON.parse(localStorage.getItem('products'));
    if (localStorage.getItem('orders')) orders = JSON.parse(localStorage.getItem('orders'));
    if (localStorage.getItem('users')) users = JSON.parse(localStorage.getItem('users'));
    if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.getItem('cart'));
    if (localStorage.getItem('wishlist')) wishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (localStorage.getItem('currentUser')) currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    displayProducts(products);
    displaySlides();
    displayDeals();
    updateCounts();
    checkLogin();
});

function updateCounts() {
    document.getElementById('wishlistCount').textContent = wishlist.length;
    document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.quantity, 0);
}

// ==================== SLIDER ====================
function displaySlides() {
    const c = document.getElementById('sliderContainer');
    if (!c) return;
    c.style.background = slides[0].bg;
    c.innerHTML = `<div class="slider-content"><div class="slider-emoji">${slides[0].emoji}</div><h1>${slides[0].text}</h1><button class="slider-btn" onclick="filterCategory('electronics')">এখনই কিনুন</button></div><button class="slider-nav prev" onclick="changeSlide(-1)">❮</button><button class="slider-nav next" onclick="changeSlide(1)">❯</button>`;
}

function changeSlide(d) {
    currentSlide += d;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    const c = document.getElementById('sliderContainer');
    c.style.background = slides[currentSlide].bg;
    c.innerHTML = `<div class="slider-content"><div class="slider-emoji">${slides[currentSlide].emoji}</div><h1>${slides[currentSlide].text}</h1><button class="slider-btn" onclick="filterCategory('electronics')">এখনই কিনুন</button></div><button class="slider-nav prev" onclick="changeSlide(-1)">❮</button><button class="slider-nav next" onclick="changeSlide(1)">❯</button>`;
}

// ==================== DISPLAY PRODUCTS ====================
function displayDeals() {
    const g = document.getElementById('dealGrid');
    if (!g) return;
    g.innerHTML = products.filter(p => p.isDeal).map(p => productCard(p)).join('');
}

function displayProducts(ps) {
    const g = document.getElementById('productGrid');
    if (!g) return;
    g.innerHTML = ps.length ? ps.map(p => productCard(p)).join('') : '<p style="text-align:center;grid-column:1/-1;padding:40px;">কোনো প্রোডাক্ট পাওয়া যায়নি!</p>';
}

function productCard(p) {
    const out = p.stock <= 0;
    return `<div class="product-card"><div class="product-image">${p.emoji}</div>${p.isDeal ? '<div class="product-badge">🔥 ডিল</div>' : ''}<div class="product-info"><div class="product-title">${p.name}</div><div class="product-rating">${'⭐'.repeat(Math.floor(p.rating))} (${p.reviews})</div><div><span class="product-price">৳${p.price}</span><span class="product-original-price">৳${p.originalPrice}</span><span class="product-discount">-${p.discount}%</span></div>${out ? '<div class="stock-badge stock-out">❌ স্টক নেই</div>' : `<div class="stock-badge">${p.stock} স্টকে</div>`}<div class="product-actions"><button class="add-to-cart" onclick="addToCart(${p.id})" ${out ? 'disabled' : ''}>🛒 কার্টে</button><button class="wishlist-btn" onclick="toggleWishlist(${p.id})">❤️</button></div></div></div>`;
}

// ==================== FILTERS ====================
function applyFilters() {
    const cat = document.getElementById('categoryFilter')?.value || 'all';
    const min = parseInt(document.getElementById('minPrice')?.value) || 0;
    const max = parseInt(document.getElementById('maxPrice')?.value) || Infinity;
    const sort = document.getElementById('sortBy')?.value || 'default';
    let f = products.filter(p => (cat === 'all' || p.category === cat) && p.price >= min && p.price <= max);
    if (sort === 'price-low') f.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') f.sort((a, b) => b.price - a.price);
    if (sort === 'rating') f.sort((a, b) => b.rating - a.rating);
    displayProducts(f);
}

function filterCategory(c) { displayProducts(c === 'all' ? products : products.filter(p => p.category === c)); }
function searchProducts() {
    const t = document.getElementById('searchInput')?.value.toLowerCase() || '';
    displayProducts(products.filter(p => p.name.toLowerCase().includes(t)));
}

// ==================== WISHLIST ====================
function toggleWishlist(id) {
    const p = products.find(x => x.id === id);
    const i = wishlist.findIndex(x => x.id === id);
    if (i >= 0) { wishlist.splice(i, 1); alert(p.name + ' উইশলিস্ট থেকে সরানো হয়েছে!'); }
    else { wishlist.push(p); alert(p.name + ' উইশলিস্টে যোগ হয়েছে! ❤️'); }
    updateCounts(); saveData();
}

function showWishlist() { document.getElementById('wishlistModal').style.display = 'block'; displayWishlistItems(); }
function closeWishlist() { document.getElementById('wishlistModal').style.display = 'none'; }
function displayWishlistItems() {
    const c = document.getElementById('wishlistItems');
    if (!c) return;
    c.innerHTML = wishlist.length ? wishlist.map((i, idx) => `<div class="cart-item"><div class="cart-item-info"><div class="cart-item-title">${i.emoji} ${i.name}</div><div class="cart-item-price">৳${i.price}</div></div><div><button class="add-to-cart" onclick="addToCart(${i.id})" style="margin-right:10px;">🛒</button><button class="cart-item-remove" onclick="wishlist.splice(${idx},1);updateCounts();displayWishlistItems();saveData();">✕</button></div></div>`).join('') : '<p style="text-align:center;padding:40px;">উইশলিস্ট খালি! ❤️</p>';
}

// ==================== CART ====================
function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p || p.stock <= 0) return alert('স্টকে নেই!');
    const e = cart.find(x => x.id === id);
    if (e) { if (e.quantity < p.stock) e.quantity++; else return alert('পর্যাপক স্টক নেই!'); }
    else cart.push({ ...p, quantity: 1 });
    updateCounts(); saveData(); alert(p.name + ' কার্টে যোগ হয়েছে! 🛒');
}

function showCart() { document.getElementById('cartModal').style.display = 'block'; displayCartItems(); }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

function displayCartItems() {
    const c = document.getElementById('cartItems');
    const t = document.getElementById('totalPrice');
    if (!c || !t) return;
    if (!cart.length) { c.innerHTML = '<p style="text-align:center;padding:40px;">কার্ট খালি! 🛒</p>'; t.textContent = '0'; return; }
    let total = 0, html = '';
    cart.forEach((i, idx) => { const it = i.price * i.quantity; total += it; html += `<div class="cart-item"><div class="cart-item-info"><div class="cart-item-title">${i.emoji} ${i.name}</div><div class="cart-item-price">৳${i.price} × ${i.quantity} = ৳${it}</div></div><button class="cart-item-remove" onclick="removeFromCart(${idx})">✕</button></div>`; });
    c.innerHTML = html; t.textContent = total;
}

function removeFromCart(idx) { cart.splice(idx, 1); updateCounts(); displayCartItems(); saveData(); }

// ==================== CHECKOUT ====================
function showCheckout() {
    if (!cart.length) return alert('কার্ট খালি!');
    closeCart();
    document.getElementById('checkoutModal').style.display = 'block';
}
function closeCheckout() { document.getElementById('checkoutModal').style.display = 'none'; }

function processOrder(e) {
    e.preventDefault();
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const transactionId = document.getElementById('transactionId').value || 'N/A';
    
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const order = { id: Date.now(), name, phone, address, payment, transactionId, items: [...cart], total, date: new Date().toLocaleString(), status: 'pending' };
    
    orders.push(order);
    cart.forEach(ci => { const p = products.find(x => x.id === ci.id); if (p) p.stock -= ci.quantity; });
    
    cart = [];
    updateCounts(); saveData();
    
    // WhatsApp Message
    let msg = `🐝 নতুন অর্ডার - BeeEye!\n\n👤 গ্রাহক: ${name}\n📱 ফোন: ${phone}\n📍 ঠিকানা: ${address}\n💰 পেমেন্ট: ${payment.toUpperCase()}\n${transactionId !== 'N/A' ? `🔢 ট্রানজেকশন: ${transactionId}` : ''}\n\n🛒 পণ্য:\n`;
    order.items.forEach(i => msg += `- ${i.emoji} ${i.name}: ৳${i.price} × ${i.quantity}\n`);
    msg += `\n📦 টোটাল: ৳${total}`;
    
    window.open(`https://wa.me/${CONFIG.adminPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    
    document.getElementById('orderDetails').innerHTML = `<p>অর্ডার আইডি: ${order.id}</p><p>মোট: ৳${total}</p><p>ধন্যবাদ!</p>`;
    closeCheckout();
    document.getElementById('orderSuccessModal').style.display = 'block';
}
function closeOrderSuccess() { document.getElementById('orderSuccessModal').style.display = 'none'; }

// ==================== LOGIN ====================
function showLoginModal() { document.getElementById('loginModal').style.display = 'block'; }
function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginTabBtn').classList.add('active');
    document.getElementById('registerTabBtn').classList.remove('active');
}
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginTabBtn').classList.remove('activefunction showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginTabBtn').classList.remove('active');
    document.getElementById('registerTabBtn').classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const phone = document.getElementById('loginPhone').value;
    const pass = document.getElementById('loginPassword').value;
    const u = users.find(x => x.phone === phone && x.password === pass);
    if (u) { currentUser = u; saveData(); checkLogin(); closeLogin(); alert('লগইন সফল! 🎉'); }
    else alert('ভুল ফোন বা পাসওয়ার্ড!');
}

function handleRegister(e) {
    e.preventDefault();
    const user = {
        name: document.getElementById('regName').value,
        phone: document.getElementById('regPhone').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        address: document.getElementById('regAddress').value
    };
    if (users.find(x => x.phone === user.phone)) return alert('এই ফোন আগে রেজিস্টার্ড!');
    users.push(user);
    currentUser = user;
    saveData(); checkLogin(); closeLogin();
    alert('রেজিস্ট্রেশন সফল! 🎉');
}

function checkLogin() {
    if (currentUser) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userBtn').style.display = 'inline-block';
        document.getElementById('userName').textContent = currentUser.name;
    } else {
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('userBtn').style.display = 'none';
    }
}

function showUserMenu() {
    if (confirm('লগআউট করবেন?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        checkLogin();
    }
}

function handleNewsletter(e) {
    e.preventDefault();
    alert('📧 ধন্যবাদ! আপনি নিউজলেটারে সাইন আপ হয়েছেন।');
}

// ==================== ADMIN ====================
function showAdminLogin() { document.getElementById('adminLoginModal').style.display = 'block'; }
function closeAdminLogin() { document.getElementById('adminLoginModal').style.display = 'none'; }

function handleAdminLogin(e) {
    e.preventDefault();
    const pass = document.getElementById('adminPassword').value;
    if (pass === CONFIG.adminPassword) {
        closeAdminLogin();
        document.getElementById('adminPanelModal').style.display = 'block';
        showAdminProducts();
        showAdminOrders();
    } else {
        alert('ভুল পাসওয়ার্ড!');
    }
}

function closeAdminPanel() { document.getElementById('adminPanelModal').style.display = 'none'; }

function showAdminTab(tab) {
    document.getElementById('adminProductsTab').style.display = tab === 'products' ? 'block' : 'none';
    document.getElementById('adminOrdersTab').style.display = tab === 'orders' ? 'block' : 'none';
    document.getElementById('adminAddTab').style.display = tab === 'add' ? 'block' : 'none';
}

function showAdminProducts() {
    const t = document.getElementById('adminProductsList');
    if (!t) return;
    t.innerHTML = products.map(p => `<tr><td>${p.emoji} ${p.name}</td><td>৳${p.price}</td><td>${p.stock}</td><td><button onclick="editStock(${p.id})">✏️</button> <button onclick="deleteProduct(${p.id})">🗑️</button></td></tr>`).join('');
}

function showAdminOrders() {
    const t = document.getElementById('adminOrdersList');
    if (!t) return;
    t.innerHTML = orders.length ? orders.map(o => `<tr><td>${o.id}</td><td>${o.name}</td><td>${o.phone}</td><td>৳${o.total}</td><td>${o.payment.toUpperCase()}</td></tr>`).join('') : '<tr><td colspan="5">কোনো অর্ডার নেই</td></tr>';
}

function editStock(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const newStock = prompt('নতুন স্টক:', p.stock);
    if (newStock && !isNaN(newStock)) {
        p.stock = parseInt(newStock);
        saveData();
        displayProducts(products);
        displayDeals();
        showAdminProducts();
    }
}

function deleteProduct(id) {
    if (confirm('প্রোডাক্ট মুছবেন?')) {
        products = products.filter(x => x.id !== id);
        saveData();
        displayProducts(products);
        displayDeals();
        showAdminProducts();
    }
}

function addNewProduct(e) {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('newProductName').value,
        price: parseInt(document.getElementById('newProductPrice').value),
        originalPrice: parseInt(document.getElementById('newProductPrice').value),
        discount: 0,
        stock: parseInt(document.getElementById('newProductStock').value),
        category: document.getElementById('newProductCategory').value,
        emoji: document.getElementById('newProductEmoji').value,
        rating: 4.0,
        reviews: 0,
        sold: 0,
        isDeal: false
    };
    products.push(newProduct);
    saveData();
    displayProducts(products);
    displayDeals();
    showAdminProducts();
    alert('প্রোডাক্ট যোগ হয়েছে!');
}

// ==================== MODAL CLOSE ====================
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) e.target.style.display = 'none';
}
