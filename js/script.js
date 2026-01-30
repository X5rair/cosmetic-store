"use strict";
const cartBtn = document.getElementById('cartBtn');
const cartMenu = document.getElementById('cartMenu');
const cartList = document.getElementById('cartList');
const allToCarrtButtons = document.querySelectorAll('.add-to-cart');
const cartItems = [];
function getActiveUsername() {
    return localStorage.getItem('username');
}
function getCartStorageKey() {
    const username = getActiveUsername();
    return username ? `cartItems_${username}` : 'cartItems_guest';
}
;
function setCartItems(items) {
    cartItems.length = 0;
    cartItems.push(...items);
}
function loadCartFromStorage() {
    const raw = localStorage.getItem(getCartStorageKey());
    if (!raw) {
        setCartItems([]);
        return;
    }
    try {
        const items = JSON.parse(raw);
        if (Array.isArray(items))
            setCartItems(items);
    }
    catch {
        setCartItems([]);
    }
}
function saveCartToStorage() {
    localStorage.setItem(getCartStorageKey(), JSON.stringify(cartItems));
}
function renderCart() {
    if (!cartList)
        return;
    saveCartToStorage();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.imgSrc}" alt="${item.name}" width="40"><span>${item.name}</span><span>$${item.price}.00</span>`;
        cartList.appendChild(li);
    });
    const cartTotal = document.getElementById('cart-total');
    if (cartTotal)
        cartTotal.textContent = total.toFixed(2);
    const cartCount = document.getElementById('cartCount');
    if (cartCount)
        cartCount.textContent = cartItems.length.toString();
}
cartBtn?.addEventListener('click', () => {
    cartMenu?.classList.toggle('open');
});
allToCarrtButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const target = e.target;
        const column = target.closest('.column');
        if (!column)
            return;
        const img = column.querySelector('img');
        const name = column.querySelector('h3')?.textContent || 'Товар';
        const priceEl = column.querySelector('.price');
        const price = priceEl.dataset.price || priceEl?.textContent || "0";
        const item = {
            name,
            imgSrc: img.src,
            price: parseFloat(price)
        };
        cartItems.push(item);
        renderCart();
    });
});
const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Checkout is not implemented yet.');
});
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginCloseBtn = document.getElementById('modalCloseBtn');
const loginBackdrop = document.getElementById('loginBackdrop');
function openLoginModal() {
    if (!loginModal)
        return;
    loginModal.classList.add('open');
}
function closeLoginModal() {
    if (!loginModal)
        return;
    loginModal.classList.remove('open');
}
loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
});
loginCloseBtn?.addEventListener('click', closeLoginModal);
loginBackdrop?.addEventListener('click', closeLoginModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
        closeLoginModal();
});
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const userNameLabel = document.getElementById('userNameLabel');
const logOutBtn = document.createElement('button');
logOutBtn.textContent = 'Logout';
logOutBtn.className = 'btn btn-ghost';
logOutBtn.hidden = true;
userNameLabel?.after(logOutBtn);
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = usernameInput?.value.trim();
    if (!name)
        return;
    localStorage.setItem('username', name);
    if (loginBtn)
        loginBtn.hidden = true;
    if (userNameLabel) {
        userNameLabel.textContent = name;
        userNameLabel.hidden = false;
    }
    logOutBtn.hidden = false;
    loadCartFromStorage();
    renderCart();
    closeLoginModal();
});
const savedName = localStorage.getItem('username');
if (savedName) {
    if (loginBtn)
        loginBtn.hidden = true;
    if (userNameLabel) {
        userNameLabel.textContent = savedName;
        userNameLabel.hidden = false;
    }
    logOutBtn.hidden = false;
    loadCartFromStorage();
    renderCart();
}
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    logOutBtn.hidden = true;
    if (loginBtn)
        loginBtn.hidden = false;
    userNameLabel.textContent = '';
    userNameLabel.hidden = true;
    loadCartFromStorage();
    renderCart();
});
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    logOutBtn.hidden = true;
    if (loginBtn)
        loginBtn.hidden = false;
    userNameLabel.textContent = '';
    userNameLabel.hidden = true;
    loadCartFromStorage();
    renderCart();
});
//# sourceMappingURL=script.js.map