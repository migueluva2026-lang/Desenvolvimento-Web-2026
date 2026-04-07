// Script geral do website
// Função: alternar entre seções (page-hidden / page-active)
//

const pages = document.querySelectorAll("main > section");
console.log(pages);

function showPageFromHash() {
    const hash = window.location.hash || "#homepage";
    const targetSection = document.querySelector(hash);

    if (!targetSection) return;

    pages.forEach(page => {
        page.classList.remove("page-active");
        page.classList.add("page-hidden");
    });

    targetSection.classList.remove("page-hidden");
    targetSection.classList.add("page-active");
}

window.addEventListener("load", showPageFromHash);

window.addEventListener("hashchange", showPageFromHash);