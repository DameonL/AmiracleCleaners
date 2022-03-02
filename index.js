let loadNavbar = async () => {
    let navbarTarget = document.querySelector("#navbarRender");
    let navbarHtml = await fetch("./pages/fragments/navbar.html");
    navbarTarget.innerHTML = await navbarHtml.text();
}


let testGetData = async () => {
    let data = await fetch("https://amiracleproducts-c9c9.restdb.io/rest/products", {
        headers: new Headers({
                'x-apikey': '621ea73934fd621565858acc', 
                'Content-Type': 'application/x-www-form-urlencoded'
        }),
    });
    let parsedData = await data.json();
}

loadNavbar();