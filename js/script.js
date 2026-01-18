"use strict";
const cartBtn = document.getElementById('cartBtn');
const cartMenu = document.getElementById('cartMenu');
const cartList = document.getElementById('cartList');
const allToCarrtButtons = document.querySelectorAll('.btn-ghost');
const cartItems = [];
function renderCart() {
    if (!cartList)
        return;
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.imgSrc}" alt="${item.name}" width="40"><span>${item.name}</span>`;
        cartList.appendChild(li);
    });
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
        const price = 0;
        const item = {
            name,
            imgSrc: img.src,
            price
        };
        cartItems.push(item);
        renderCart();
    });
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
//# sourceMappingURL=script.js.map