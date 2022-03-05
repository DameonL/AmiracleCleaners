class ShopList extends HTMLElement {
    #products = null;
    #productSizes = null;

    constructor() {
        super();

        window.addEventListener("hashchange", this.#hashChanged);
        this.loadShopPage();
        this.#hashChanged();
    }

    #hashChanged = () => {
        let params = new URLSearchParams(window.location.hash.substring(1));
        if (!params.has("product")) {
            this.style.display = "";
        } else {
            this.style.display = "none";
        }
    }

    async loadShopPage() {
        let productThumbTemplate = document.querySelector("#productThumb").content.firstElementChild;
        this.#products = await this.getProductData();
        this.renderProductData(productThumbTemplate);
    }

    renderProductData(productThumbTemplate) {
        for (let product of this.#products) {
            let thumb = productThumbTemplate.cloneNode(true);
            thumb.querySelector(`[boundField="name"]`).innerText = product.fields.name.stringValue;
            thumb.querySelector(`[boundField="image"]`).src = `./img/products/${product.fields.variants.arrayValue.values[0].mapValue.fields.image.stringValue}.jpg`;
            thumb.querySelector(`[boundField="image"]`).addEventListener("click", () => {
                let params = new URLSearchParams(window.location.hash.substring(1));
                let productId = product.name.match(/\w*$/);
                params.append("product", productId);
                window.location.hash = params.toString();
            })
            this.appendChild(thumb);
        }
    }
    
    async getProductData() {
        let data = await fetch("https://firestore.googleapis.com/v1/projects/amiracle-cleaners/databases/(default)/documents/products");
        data = await data.json();
        return data.documents;
    }
    
}


export default ShopList;