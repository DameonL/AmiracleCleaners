class ShoppingCart extends HTMLElement {
    #cartData = [
        { id: "15mmJbyrFtXrUmR014T6", variant: 0, amount: 3 }
    ];

    constructor() {
        super();

        if (document.cookie.includes("shoppingCart=")) {
            this.#cartData = this.#getCartFromCookie();
        } else {
            document.cookie = "shoppingCart=;";
        }
    }

    #getCartFromCookie() {
        let cartData = document.cookie.match(/(?<=(shoppingCart=)).*?(?=;|$)/)[0];
        cartData = atob(cartData);
        return JSON.parse(cartData);
    }

    #cartToCookie() {
        return "shoppingCart=" + btoa(JSON.stringify(this.#cartData));
    }
}

export default ShoppingCart;