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
declare function renderCart(): void;
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
//# sourceMappingURL=script.d.ts.map