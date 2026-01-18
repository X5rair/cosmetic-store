var cartBtn = document.getElementById('cartBtn');
var cartMenu = document.getElementById('cartMenu');
var cartList = document.getElementById('cartList');
var addToCartButtons = document.querySelectorAll('.btn-ghost');
var cartItems = [];
function renderCart() {
    cartList.innerHTML = '';
    cartItems.forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = "<img src=\"".concat(item.imgSrc, "\" alt=\"").concat(item.name, "\" width=\"40\"><span>").concat(item.name, "</span>");
        cartList.appendChild(li);
    });
    var cartCount = document.getElementById('cartCount');
    cartCount.textContent = cartItems.length.toString();
}
cartBtn.addEventListener('click', function () {
    cartMenu.classList.toggle('open');
});
addToCartButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        var _a;
        var column = e.target.closest('.column');
        if (!column)
            return;
        var img = column.querySelector('img');
        var name = ((_a = column.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) || 'Товар';
        var item = {
            name: name,
            imgSrc: img.src
        };
        cartItems.push(item);
        renderCart();
    });
});
 

