const cartBtn = document.getElementById('cartBtn');
const cartMenu = document.getElementById('cartMenu');
const cartList = document.getElementById('cartList');
const allToCarrtButtons = document.querySelectorAll<HTMLButtonElement>('.btn-ghost');

interface CartItem {
  name: string;
  imgSrc: string;
  price: number;
}

const cartItems: CartItem[] = [];
function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = '';
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${item.imgSrc}" alt="${item.name}" width="40"><span>${item.name}</span><span>$${item.price}.00</span>`;

    cartList.appendChild(li);
  });

  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = cartItems.length.toString();
}

cartBtn?.addEventListener('click', () => {
  cartMenu?.classList.toggle('open');
});

allToCarrtButtons.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const column = target.closest('.column') as HTMLElement;
    if (!column) return;
    const img = column.querySelector('img') as HTMLImageElement;
    const name = column.querySelector('h3')?.textContent || 'Товар';
    const priceEl = column.querySelector('.price') as HTMLElement;
    const price = priceEl.dataset.price || priceEl?.textContent || "0";

    const item: CartItem = {
      name,     
      imgSrc: img.src, 
      price: parseFloat(price)
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
  if (!loginModal) return;
  loginModal.classList.add('open');
}
function closeLoginModal() {
  if (!loginModal) return;
  loginModal.classList.remove('open');

}

loginBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  openLoginModal();
});

loginCloseBtn?.addEventListener('click', closeLoginModal);
loginBackdrop?.addEventListener('click', closeLoginModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLoginModal();
});
