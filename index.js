import ShopList from "../src/ShopList.js";
import ProductView from "../src/ProductView.js";
let pageRenderer = document.querySelector("#pageRenderer");

customElements.define('shop-list', ShopList);
customElements.define('product-view', ProductView);

window.addEventListener("hashchange", hashChanged);
let pageIds = {
    "" : "pages/index.html",
    "shop" : "pages/shop.html"
}

function hashChanged() {
    let params = new URLSearchParams(window.location.hash.substring(1));
    let pageId = "";
    if (params.has("page")) {
        pageId = params.get("page");
    }
    loadPage(pageId);
}

let loadPage = async (pageId = "") => {
    let url = pageIds[pageId];
    let navbarTarget = document.createElement("div");
    let pageHtml = await fetch(url);
    pageRenderer.innerHTML = await pageHtml.text();
}

hashChanged();