class ProductView extends HTMLElement {
    #productId = "";

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
        let currentInstance = this.querySelector("#productViewInstance");
        if (currentInstance) currentInstance.remove();

        let newInstance = document.querySelector("#productView").content.firstElementChild.cloneNode(true);
        newInstance.id = "productViewInstance";
        this.appendChild(newInstance);

        let product = await this.getProductData(this.#productId);
        newInstance.querySelector(`[boundField="name"]`).innerText = product.fields.name.stringValue;
        newInstance.querySelector(`[boundField="description"]`).innerText = product.fields.description.stringValue;
        newInstance.querySelector(`[boundField="image"]`).src = `../img/products/${product.fields.variants.arrayValue.values[0].mapValue.fields.image.stringValue}.jpg`;
    }

    async getProductData() {
        let url = `https://firestore.googleapis.com/v1/projects/amiracle-cleaners/databases/(default)/documents/products/${this.#productId}`;
        let data = await fetch(url);
        data = await data.json();
        return data;
    }
}

export default ProductView;