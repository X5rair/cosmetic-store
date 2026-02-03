"use strict";
const supabaseClient = supabase.createClient('https://hmygaehllnoxfupnqirf.supabase.co', 'sb_publishable_kYTEQRFERxlIwxh4g-e6EQ_TQdqiCD7');
const supabaseUrl = 'https://hmygaehllnoxfupnqirf.supabase.co';
const supabaseAnonKey = 'sb_publishable_kYTEQRFERxlIwxh4g-e6EQ_TQdqiCD7';
async function testSupabaseConnection() {
    const { data, error } = await supabaseClient.from('products').select('*').limit(1);
    if (error) {
        console.error('Supabase connection failed:', error.message);
        return;
    }
    console.log('Supabase connected successfully. Sample row:', data);
}
void testSupabaseConnection();
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
    if (!faqQuestions)
        return;
    faqQuestions.innerHTML = '';
    faqData.forEach((item) => {
        const btn = document.createElement('button');
        btn.textContent = item.q;
        btn.addEventListener('click', () => { if (faqAnswer)
            faqAnswer.textContent = item.a; });
        faqQuestions.appendChild(btn);
    });
}
renderFaqButtons();
faqToggle?.addEventListener('click', () => {
    if (faqPanel) {
        faqPanel.hidden = !faqPanel.hidden;
    } // скрыл панель 
    if (faqToggle && faqPanel) {
        faqToggle.setAttribute('aria-expanded', String(!faqPanel.hidden));
    } // меняю свойство атрибута aria-expended
});
faqClose?.addEventListener('click', () => {
    if (faqPanel) {
        faqPanel.hidden = true;
    }
    if (faqToggle) {
        faqToggle.setAttribute('aria-expanded', 'false');
    } // тоже самое только false xdd
});
let chatMessages = [];
let isBotTyping = false;
function addMessage(role, text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatMessages.push({ role, text, time });
}
function renderMessages() {
    if (!faqAnswer)
        return;
    const typingHtml = isBotTyping ? `<div class="chat-msg chat-msg--bot"><div class="chat-bubble">Typing...</div></div>` : ''; //при isBotTyping = true будет рисоваться загрузка сообщений (чет намутил мутку тут ваще) 
    const messageHtml = chatMessages.map((msg) => {
        return ` <div class="chat-msg chat-msg--${msg.role}">
    <div class="chat-bubble">${msg.text}</div>
    <div class="chat-time">${msg.time}</div>
  </div>`;
    }).join(''); //сообщения будут рисоваться пузырьками
    faqAnswer.innerHTML = `<div class="chat-feed">${messageHtml}${typingHtml}</div>`;
    const feed = faqAnswer?.querySelector('.chat-feed');
    if (feed)
        feed.scrollTop = feed.scrollHeight;
}
function botReply(answer) {
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
    btn.addEventListener('click', () => {
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
    if (!faqModal)
        return;
    faqModal.hidden = false;
    requestAnimationFrame(() => faqModal.classList.add('open'));
}
function closeFaqModal() {
    if (!faqModal)
        return;
    faqModal.classList.remove('open');
    setTimeout(() => { faqModal.hidden = true; }, 250);
}
faqToggle?.addEventListener('click', openFaqModal);
faqClose?.addEventListener('click', closeFaqModal);
faqBackdrop?.addEventListener('click', closeFaqModal);
//бд supabase (юзал софт для подключения базы данных)
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value || '';
    if (!email || !password) {
        alert('Please enter email and password.');
        return;
    }
    let { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
        const signUp = await supabaseClient.auth.signUp({ email, password });
        data = signUp.data;
        error = signUp.error;
    }
    if (error) {
        alert(error.message);
        return;
    }
    const userEmail = data.user?.email || email;
    if (loginBtn)
        loginBtn.hidden = true;
    if (userNameLabel) {
        userNameLabel.textContent = userEmail;
        userNameLabel.hidden = false;
    }
    logOutBtn.hidden = false;
    closeLoginModal();
}, true);
logOutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    await supabaseClient.auth.signOut();
    logOutBtn.hidden = true;
    if (loginBtn)
        loginBtn.hidden = false;
    if (userNameLabel) {
        userNameLabel.textContent = '';
        userNameLabel.hidden = true;
    }
}, true);
(async () => {
    let user = null;
    if (typeof supabaseClient.auth.getUser === 'function') {
        const { data } = await supabaseClient.auth.getUser();
        user = data?.user ?? null;
    }
    else if (typeof supabaseClient.auth.getSession === 'function') {
        const { data } = await supabaseClient.auth.getSession();
        user = data?.session?.user ?? null;
    }
    else if (typeof supabaseClient.auth.user === 'function') {
        user = supabaseClient.auth.user();
    }
    const userEmail = user?.email;
    if (!userEmail)
        return;
    if (loginBtn)
        loginBtn.hidden = true;
    if (userNameLabel) {
        userNameLabel.textContent = userEmail;
        userNameLabel.hidden = false;
    }
    logOutBtn.hidden = false;
})();
//бд supabase
async function fillExistingCardsFromSupabase() {
    const { data, error } = await supabaseClient
        .from('products')
        .select('name, price, image_url')
        .order('id', { ascending: true })
        .limit(2);
    if (error) {
        console.error('Products load error:', error.message);
        return;
    }
    if (!data || data.length === 0)
        return;
    const cards = document.querySelectorAll('section.two-columns#products .column');
    data.forEach((p, i) => {
        const card = cards[i];
        if (!card)
            return;
        const title = card.querySelector('h3');
        const price = card.querySelector('.price');
        const img = card.querySelector('img');
        if (title && p.name)
            title.textContent = p.name;
        if (price && p.price !== undefined) {
            price.dataset.price = String(p.price);
            price.textContent = `$${Number(p.price).toFixed(2)}`;
        }
        if (img && p.image_url)
            img.src = p.image_url;
    });
}
void fillExistingCardsFromSupabase();
//# sourceMappingURL=script.js.map