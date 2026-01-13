// Получаем элементы из DOM
var cartBtn = document.getElementById('cartBtn');
var cartMenu = document.getElementById('cartMenu');
var cartList = document.getElementById('cartList');
var addToCartButtons = document.querySelectorAll('.btn-ghost');
// Корзина как массив
var cartItems = [];
// Функция для отображения товаров в корзине
function renderCart() {
    cartList.innerHTML = ''; // очищаем список
    cartItems.forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = "<img src=\"".concat(item.imgSrc, "\" alt=\"").concat(item.name, "\" width=\"40\"><span>").concat(item.name, "</span>");
        cartList.appendChild(li);
    });
    // Обновляем счетчик
    var cartCount = document.getElementById('cartCount');
    cartCount.textContent = cartItems.length.toString();
}
// Открытие/закрытие корзины
cartBtn.addEventListener('click', function () {
    cartMenu.classList.toggle('open');
});
// Добавление товара в корзину
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
