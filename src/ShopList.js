class ShopList extends HTMLElement {
    #products = null;
    #productSizes = null;

    constructor() {
        super();
        this.loadShopPage();
    }

    async loadProductThumb() {
        let thumbContainer = document.createElement("div");
        let thumbHtml = await fetch("../pages/fragments/productThumb.html");
        thumbContainer.innerHTML = await thumbHtml.text();
        return thumbContainer;
    }

    async loadShopPage() {
        let productThumbTemplate = await this.loadProductThumb();
        this.#products = await this.getProductData();
        console.log(this);
        this.renderProductData(productThumbTemplate);
    }

    renderProductData(productThumbTemplate) {
        for (let product of this.#products) {
            let thumb = productThumbTemplate.cloneNode(true);
            thumb.querySelector(`[boundField="Name"]`).innerText = product.fields.Name.stringValue;
            thumb.querySelector(`[boundField="Image"]`).src = `../img/products/${product.fields.Image.stringValue}.jpg`;
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