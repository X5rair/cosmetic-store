declare const cartBtn: HTMLElement | null;
declare const cartMenu: HTMLElement | null;
declare const cartList: HTMLElement | null;
declare const allToCarrtButtons: NodeListOf<HTMLButtonElement>;
interface CartItem {
    name: string;
    imgSrc: string;
    price: number;
}
declare const cartItems: CartItem[];
declare function getActiveUsername(): string | null;
declare function getCartStorageKey(): string;
declare function setCartItems(items: CartItem[]): void;
declare function loadCartFromStorage(): void;
declare function saveCartToStorage(): void;
declare function renderCart(): void;
declare const checkoutBtn: HTMLElement | null;
declare const loginBtn: HTMLElement | null;
declare const loginModal: HTMLElement | null;
declare const loginCloseBtn: HTMLElement | null;
declare const loginBackdrop: HTMLElement | null;
declare function openLoginModal(): void;
declare function closeLoginModal(): void;
declare const loginForm: HTMLFormElement;
declare const usernameInput: HTMLInputElement;
declare const userNameLabel: HTMLSpanElement;
declare const logOutBtn: HTMLButtonElement;
declare const savedName: string | null;
declare const faqData: {
    q: string;
    a: string;
}[];
declare const faqToggle: HTMLElement | null;
declare const faqClose: HTMLElement | null;
declare const faqPanel: HTMLElement | null;
//# sourceMappingURL=script.d.ts.map