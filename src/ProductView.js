class ProductView extends HTMLElement {
    #productId = "";
    #product = null;
    #selectedVariantIndex = 0;
    get #selectedVariant() {
        return this.#product.fields.variants.arrayValue.values[this.#selectedVariantIndex];
    }

    constructor() {
        super();
        window.addEventListener("hashchange", this.#hashChanged);
        this.#hashChanged();
    }

    #hashChanged = () => {
        let params = new URLSearchParams(window.location.hash.substring(1));
        if (params.has("product")) {
            this.#productId = params.get("product");
            this.render();
            this.style.display = "";
        } else {
            this.style.display = "none";
        }
    }

    async render() {
        let pageHtml = await fetch("../pages/ProductView.html");
        this.innerHTML = await pageHtml.text();
        let product = await this.getProductData(this.#productId);

        let addToCartFunction = () => {
            let cart = document.querySelector("shopping-cart");
            cart.addToCart({ productId: this.#productId, variant: this.#selectedVariantIndex, purchaseQuantity: 1 });
        }

        let variantChanged = () => {
            this.querySelector(`[boundField="image"]`).src = `../img/products/${this.#selectedVariant.mapValue.fields.image.stringValue}.jpg`;
            let price = this.#selectedVariant.mapValue.fields.price;
            if (price.doubleValue) price = price.doubleValue;
            else if (price.integerValue) price = price.integerValue;
            price = Number(price);
            this.querySelector(`[boundField="price"]`).innerText = price.toLocaleString("en-us", {style: 'currency',currency: 'USD', minimumFractionDigits: 2});
        }

        this.#product = product;
        this.querySelector(`[boundField="name"]`).innerText = product.fields.name.stringValue;
        this.querySelector(`[boundField="description"]`).innerText = product.fields.description.stringValue;
        this.querySelector(`.addToCartButton`).addEventListener("click", addToCartFunction);
        this.querySelector(`.addToCartButton`).addEventListener("click", addToCartFunction);
        let variantsDropdown = this.querySelector(`#variantsSelector`);
        for (let variant of product.fields.variants.arrayValue.values) {
            let option = document.createElement("option");
            option.innerText = variant.mapValue.fields.name.stringValue;
            variantsDropdown.appendChild(option);
        }
        
        variantsDropdown.selectedIndex = this.#selectedVariantIndex;
        variantsDropdown.addEventListener("change", () => {
            this.#selectedVariantIndex = variantsDropdown.selectedIndex;
            variantChanged();
        });

        variantChanged();
    }

    async getProductData() {
        let url = `https://firestore.googleapis.com/v1/projects/amiracle-cleaners/databases/(default)/documents/products/${this.#productId}`;
        let data = await fetch(url);
        data = await data.json();
        return data;
    }
}

export default ProductView;