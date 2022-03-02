let loadNavbar = async () => {
    let navbarTarget = document.createElement("div");
    let navbarHtml = await fetch("/AmiracleCleaners/pages/fragments/navbar.html");
    navbarTarget.innerHTML = await navbarHtml.text();
    document.body.firstElementChild.before(navbarTarget);
}

loadNavbar();