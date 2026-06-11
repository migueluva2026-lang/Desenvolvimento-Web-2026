import { state } from './state.js';
import { removerDoCarrinho, renderCarrinho } from './cart.js';
import { adicionarAoCarrinho } from './cart.js';
import { renderHomepage, renderCatalogo, loadProduct, renderItensCompra, renderPagamento } from './pages.js';
import { renderAdminProdutos, renderAdminProdutoUpdate } from './admin.js';

const pages = document.querySelectorAll("main > section");

// ---- ROTEADOR ----------------------------------------------------------------

function trocarPagina() {
    let hash = window.location.hash || "#homepage";

    if (hash === "#admin-produto-update" && !state.currentEditingProductId) hash = "#admin-produtos";
    if (hash === "#admin-produtos" && !state.isAdmin) hash = "#login";

    if (hash.startsWith("#produto?")) {
        const params = new URLSearchParams(hash.replace("#produto?", ""));
        const id = params.get("id");
        if (id) loadProduct(id);
        hash = "#produto";
    }

    const target = document.querySelector(hash);
    if (!target) return;

    pages.forEach(p => {
        p.classList.remove("page-active");
        p.classList.add("page-hidden");
    });
    target.classList.remove("page-hidden");
    target.classList.add("page-active");

    const renders = {
        "#homepage":             renderHomepage,
        "#catalogo":             renderCatalogo,
        "#pedido":               renderItensCompra,
        "#pagamento":            renderPagamento,
        "#admin-produtos":       renderAdminProdutos,
        "#admin-produto-update": renderAdminProdutoUpdate,
    };
    renders[hash]?.();
}

// ---- AUTH ------------------------------------------------------------------

function handleLogin(username, password) {
    if (username === "admin" && password === "admin") {
        state.isAdmin = true;
        document.getElementById("admin-nav-btn").style.display  = "inline-block";
        document.getElementById("logout-option").style.display  = "inline-block";
        window.location.hash = "#admin-produtos";
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

function handleLogout() {
    state.isAdmin = false;
    document.getElementById("admin-nav-btn").style.display = "none";
    window.location.hash = "#homepage";
}

// ---- API --------------------------------------------------------------------

async function loadProducts() {
    const response = await fetch("/api/products.php");
    state.productsData = await response.json();
}

// ---- LISTENERS ---------------------------------------------------------------

function criarListeners() {
    document.getElementById("add-cart-btn")?.addEventListener("click", () => {
        if (state.currentProduct) adicionarAoCarrinho(state.currentProduct);
    });

    document.getElementById("comprar-agora-btn")?.addEventListener("click", () => {
        if (state.currentProduct) adicionarAoCarrinho(state.currentProduct);
        window.location.hash = "#pedido";
    });

    document.getElementById("ir-pedido-btn")?.addEventListener("click", () => {
        window.location.hash = "#pedido";
    });

    document.getElementById("pedido-form")?.addEventListener("submit", e => {
        e.preventDefault();
        state.orderData.nome     = e.target.querySelector("input[name=nome]")?.value     ?? "";
        state.orderData.endereco = e.target.querySelector("input[name=endereco]")?.value ?? "";
        window.location.hash = "#pagamento";
    });

    document.getElementById("pagamento-form")?.addEventListener("submit", e => {
        e.preventDefault();
        state.carrinho = [];
        renderCarrinho();
        window.location.hash = "#homepage";
    });

    document.getElementById("login-option")?.addEventListener("click",  () => { window.location.hash = "#login"; });
    document.getElementById("signup-option")?.addEventListener("click", () => { window.location.hash = "#login"; });

    document.getElementById("login-form")?.addEventListener("submit", e => {
        e.preventDefault();
        handleLogin(
            document.getElementById("login-user").value,
            document.getElementById("login-pass").value
        );
    });

    document.getElementById("logout-option")?.addEventListener("click", e => {
        e.preventDefault();
        handleLogout();
    });

    document.getElementById("btn-voltar-admin")?.addEventListener("click", () => {
        window.location.hash = "#admin-produtos";
    });
}

// ---- INIT ----------------------------------------------------------------

window.addEventListener("load", async () => {
    await loadProducts();
    trocarPagina();
    criarListeners();
});

window.addEventListener("hashchange", trocarPagina);

// Globais necessários para handlers inline (onclick, por ex)
window.removerDoCarrinho = removerDoCarrinho;
window.handleLogout      = handleLogout;
window.editarProduto     = (id) => {
    state.currentEditingProductId = id;
    window.location.hash = "#admin-produto-update";
};