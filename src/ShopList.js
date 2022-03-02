class ShopList extends HTMLElement {

    constructor() {
        super();
        this.loadShopPage();
    }

    async loadProductThumb() {
        let thumbContainer = document.createElement("div");
        let thumbHtml = await fetch("./pages/fragments/productThumb.html");
        thumbContainer.innerHTML = await thumbHtml.text();
        return thumbContainer;
    }

    async loadShopPage() {
        let productThumbTemplate = await this.loadProductThumb();
        this.renderProductData(await this.getProductData(), productThumbTemplate);
    }

    renderProductData(productData, productThumbTemplate) {
        for (product of productData) {
            let thumb = productThumbTemplate.cloneNode(true);
            thumb.querySelector(`[boundField="Name"]`).innerText = product.Name;
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
    
}


export default ShopList;