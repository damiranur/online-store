import { cart } from './types';

export const state: cart = {
    products: [],
    totalPrice: 0,
    totalAmount: 0,
};
export const updateCart = (num: number, tprice: number) => {
    const cart = document.querySelector('.cart__text div') as HTMLElement;
    cart.textContent = String(num);
    const ctotal = document.querySelector('.total-price span') as HTMLElement;
    ctotal.textContent = ` €${tprice}`;
};
