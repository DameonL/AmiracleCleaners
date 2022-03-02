let loadNavbar = async () => {
    let navbarTarget = document.createElement("div");
    let navbarHtml = await fetch("./pages/fragments/navbar.html");
    navbarTarget.innerHTML = await navbarHtml.text();
    document.body.firstElementChild.before(navbarTarget);
}

loadNavbar();