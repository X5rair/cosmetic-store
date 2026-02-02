const cartBtn = document.getElementById('cartBtn');
const cartMenu = document.getElementById('cartMenu');
const cartList = document.getElementById('cartList');
const allToCarrtButtons = document.querySelectorAll<HTMLButtonElement>('.add-to-cart');

interface CartItem {
  name: string;
  imgSrc: string;
  price: number;
}

const cartItems: CartItem[] = [];

function getActiveUsername() {
  return localStorage.getItem('username');
}

function getCartStorageKey() {
  const username = getActiveUsername();
  return username ? `cartItems_${username}` : 'cartItems_guest';
};

function setCartItems(items: CartItem[]) {
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
    const items: CartItem[] = JSON.parse(raw);
    if (Array.isArray(items)) setCartItems(items);
  } catch {
    setCartItems([]);
  }
}

function saveCartToStorage() {
  localStorage.setItem(getCartStorageKey(), JSON.stringify(cartItems));
}

function renderCart() {
  if (!cartList) return;
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
  if (cartTotal) cartTotal.textContent = total.toFixed(2);

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

const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
const userNameLabel = document.getElementById('userNameLabel') as HTMLSpanElement;
const logOutBtn = document.createElement('button');
logOutBtn.textContent = 'Logout';
logOutBtn.className = 'btn btn-ghost';
logOutBtn.hidden = true;
userNameLabel?.after(logOutBtn);

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = usernameInput?.value.trim();
  if (!name) return;
  localStorage.setItem('username', name);
  if (loginBtn) loginBtn.hidden = true;
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
if (loginBtn) loginBtn.hidden = true;
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
  if (loginBtn) loginBtn.hidden = false;
  userNameLabel!.textContent = '';
  userNameLabel!.hidden = true;
  loadCartFromStorage();
  renderCart();
});

const faqData = [
    { q: 'Какова продолжительность доставки?', a: 'Доставка обычно занимает 2–5 рабочих дней по городу и 5–10 дней по регионам.' },
    { q: 'Какие способы оплаты вы принимаете?', a: 'Мы принимаем кредитные карты, дебетовые карты, PayPal и наличные при доставке.' },
];

const faqToggle = document.getElementById('faqChatToggle');
const faqClose = document.getElementById('faqChatClose');
const faqPanel = document.getElementById('faqChatPanel');
const faqQuestions = document.getElementById('faqChatQuestions');
const faqAnswer = document.getElementById('faqChatAnswer');

function renderFaqButtons() {
  if (!faqQuestions) return;
  faqQuestions.innerHTML = '';
  faqData.forEach((item) => {
    const btn = document.createElement('button');
    btn.textContent = item.q;
    btn.addEventListener('click', () => { if (faqAnswer) faqAnswer.textContent = item.a; });
    faqQuestions.appendChild(btn);
  });
}

renderFaqButtons();

faqToggle?.addEventListener('click', () => {
  if (faqPanel) { faqPanel.hidden = !faqPanel.hidden; } // скрыл панель 
  if (faqToggle && faqPanel) {faqToggle.setAttribute('aria-expanded', String(!faqPanel.hidden)); } // меняю свойство атрибута aria-expended
});

faqClose?.addEventListener('click', () => {
  if (faqPanel) { faqPanel.hidden = true; }
  if (faqToggle) {faqToggle.setAttribute('aria-expanded', 'false'); } // тоже самое только false xdd
});


type ChatRole = 'user' | 'bot';

type ChatMessage = {
  role: ChatRole;
  text: string;
  time: string;

};

let chatMessages: ChatMessage[] = [];
let isBotTyping = false;

function addMessage(role: ChatRole, text: string) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
  chatMessages.push({role, text, time});
}

function renderMessages() {
  if (!faqAnswer) return;


const typingHtml = isBotTyping  ? `<div class="chat-msg chat-msg--bot"><div class="chat-bubble">Typing...</div></div>`: ''; //при isBotTyping = true будет рисоваться загрузка сообщений (чет намутил мутку тут ваще) 

const messageHtml = chatMessages.map((msg) => {
  return ` <div class="chat-msg chat-msg--${msg.role}">
    <div class="chat-bubble">${msg.text}</div>
    <div class="chat-time">${msg.time}</div>
  </div>`;
}).join(''); //сообщения будут рисоваться пузырьками

faqAnswer!.innerHTML = `<div class="chat-feed">${messageHtml}${typingHtml}</div>`;

const feed = faqAnswer?.querySelector('.chat-feed');
if (feed) feed.scrollTop = feed.scrollHeight;
}

function botReply(answer: string) {
  isBotTyping = true;
  renderMessages();

  setTimeout(() => {
    isBotTyping = false;
    addMessage('bot', answer);
    renderMessages();
  }, 900);
}


faqData.forEach((faq) => {
  const btn = document.createElement('button');
  btn.textContent = faq.q;

btn.addEventListener('click', () => { //обработчик 
  addMessage('user', faq.q); // вопрос пользователя
  renderMessages(); //рендер чи загрузка сообщений
  botReply(faq.a); 
});

faqQuestions?.appendChild(btn);
});

addMessage('bot', 'Здравствуйте! Как я могу помочь вам сегодня?');
renderMessages();


const faqModal = document.getElementById('faqModal');
const faqBackdrop = document.getElementById('faqModalBackdrop');

function openFaqModal() {
  if (!faqModal) return;
  faqModal.hidden = false;
  requestAnimationFrame(() => faqModal.classList.add('open'));
}

function closeFaqModal() {
  if(!faqModal) return;
  faqModal.classList.remove('open');
  setTimeout(() => { faqModal.hidden = true; }, 250);
}

faqToggle?.addEventListener('click', openFaqModal);
faqClose?.addEventListener('click', closeFaqModal);
faqBackdrop?.addEventListener('click', closeFaqModal);