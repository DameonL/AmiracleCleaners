class AmiracleNavbar extends HTMLElement {
    constructor() {
        super();
        this.#loadNavbar();
    }

    async #loadNavbar() {
        let navbarHtml = await fetch("../pages/AmiracleNavbar.html");
        this.innerHTML = await navbarHtml.text();
    }
}

export default AmiracleNavbar;