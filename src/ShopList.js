class ShopList extends HTMLElement {
    #products = null;
    #productSizes = null;

    constructor() {
        super();
        this.loadShopPage();
    }

    async loadProductThumb() {
        let thumbContainer = document.createElement("div");
        let thumbHtml = await fetch("/AmiracleCleaners/pages/fragments/productThumb.html");
        thumbContainer.innerHTML = await thumbHtml.text();
        return thumbContainer;
    }

    async loadShopPage() {
        let productThumbTemplate = await this.loadProductThumb();
        this.#products = await this.getProductData();
        this.#productSizes = await this.getProductSizesData();
        console.log(this);
        this.renderProductData(productThumbTemplate);
    }

    renderProductData(productThumbTemplate) {
        for (let product of this.#products) {
            let thumb = productThumbTemplate.cloneNode(true);
            thumb.querySelector(`[boundField="Name"]`).innerText = product.Name;
            thumb.querySelector(`[boundField="Image"]`).src = `https://amiracleproducts-c9c9.restdb.io/media/${product.Image}?s=t`;
            this.appendChild(thumb);
        }
    }
    
    async getProductData() {
        let data = await fetch("https://amiracleproducts-c9c9.restdb.io/rest/products", {
            headers: new Headers({
                    'x-apikey': '621ea73934fd621565858acc', 
                    'Content-Type': 'application/x-www-form-urlencoded'
            }),
        });

        return await data.json();
    }
    
    async getProductSizesData() {
        let data = await fetch("https://amiracleproducts-c9c9.restdb.io/rest/product-sizes", {
            headers: new Headers({
                    'x-apikey': '621ea73934fd621565858acc', 
                    'Content-Type': 'application/x-www-form-urlencoded'
            }),
        });

        return await data.json();
    }
    
}


export default ShopList;