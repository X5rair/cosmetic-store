"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartBtn = document.getElementById('cart-btn');
const cartMenu = document.getElementById('cartmenu');
const cartList = document.getElementById('cartlist');
const allToCarrtButtons = document.querySelectorAll('.btn-ghost');
const cartItems = [];
function renderCart() {
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.imgSrc}" alt="${item.name}" width="40"><span>${item.name}</span>`;
        cartList.appendChild(li);
    });
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length.toString();
}
cartBtn.addEventListener('click', () => {
    cartMenu.classList.toggle('open');
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
//# sourceMappingURL=cart.js.map