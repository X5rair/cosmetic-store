const cartBtn = document.getElementById('cart-btn') as HTMLElement;
const cartMenu = document.getElementById('cartmenu') as HTMLElement;
const cartList = document.getElementById('cartlist') as HTMLElement;
const allToCarrtButtons = document.querySelectorAll<HTMLButtonElement>('.btn-ghost');

interface CartItem {
  name: string;
  imgSrc: string;
  price: number;
}

const cartItems: CartItem[] = [];
function renderCart() {
  cartList.innerHTML = '';
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${item.imgSrc}" alt="${item.name}" width="40"><span>${item.name}</span>`;
    cartList.appendChild(li);
  });

  const cartCount = document.getElementById('cart-count') as HTMLElement;
  cartCount.textContent = cartItems.length.toString();
}

cartBtn.addEventListener('click', () => {
  cartMenu.classList.toggle('open');
});

allToCarrtButtons.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const column = target.closest('.column') as HTMLElement;
    if (!column) return;
    const img = column.querySelector('img') as HTMLImageElement;
    const name = column.querySelector('h3')?.textContent || 'Товар';
    const price = 0; 

    const item: CartItem = {
      name,     
      imgSrc: img.src, 
      price      
    };

    cartItems.push(item); 
    renderCart();
  });
});

const loginBtn = document.getElementById('loginbtn');
const loginModal = document.getElementById('loginmodal');
const logicCloseBtn = document.getElementById('modalCloseBtn');
const loginDrop = document.getElementById('modal__backdrop');

function openLoginModal() {
  if (!loginModal) return;
  loginModal.classList.add('open');
}
function closeLoginModal() {
  if (!loginModal)return;
  loginModal.classList.remove('remove')
}

