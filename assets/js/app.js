import { state } from './state.js';
import { removerDoCarrinho, renderCarrinho, formatPrice } from './cart.js';
import { adicionarAoCarrinho } from './cart.js';
import { renderHomepage, renderCatalogo, renderProduct, renderItensCompra, renderPagamento, buscarCEP, renderRecommendedProducts } from './pages.js';
import { renderAdminProdutos, renderAdminProdutoUpdate } from './admin.js';

const pages = document.querySelectorAll("main > section");

// ---- ROTEADOR ----------------------------------------------------------------

function changePage() {
    let hash = window.location.hash || "#homepage";

    if (hash === "#admin-produto-update" && !state.currentEditingProductId) hash = "#admin-produtos";
    if (hash === "#admin-produtos" && !state.isAdmin) hash = "#login";

    if (hash.startsWith("#produto?")) {
        const params = new URLSearchParams(hash.replace("#produto?", ""));
        const id = params.get("id");
        if (id) renderProduct(id);
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
        "#produto":              renderRecommendedProducts,
        "#pedido":               renderItensCompra,
        "#pagamento":            renderPagamento,
        "#admin-produtos":       renderAdminProdutos,
        "#admin-produto-update": renderAdminProdutoUpdate,
    };
    renders[hash]?.();
}

// ---- AUTH ------------------------------------------------------------------

export async function handleLogin( username, password) 
{
    try {
        const response = await fetch("/DesenWeb2026/api/auth/login.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );
        const result = await response.json();
        if (!result.success)
        {
            alert("Usuário ou senha inválidos!");
            return;
        }

        state.isAdmin = true;

        document.getElementById("signup-option").style.display = "none";
        document.getElementById("login-option").style.display = "none";
        document.getElementById("admin-nav-btn").style.display = "inline-block";
        document.getElementById("logout-option").style.display = "inline-block";
        window.location.hash = "#admin-produtos";
    } catch (error) {
        console.error(error);
        alert("Erro ao efetuar login.");
    }
}

function handleLogout() 
{
    state.isAdmin = false;
    document.getElementById("signup-option").style.display = "inline-block";
    document.getElementById("login-option").style.display = "inline-block";
    document.getElementById("admin-nav-btn").style.display = "none";
    document.getElementById("logout-option").style.display = "none";
    window.location.hash = "#homepage";
}

// ---- API --------------------------------------------------------------------

async function loadProducts() 
{
    const response = await fetch("/DesenWeb2026/api/products/list.php");
    state.productsData = await response.json();
}

// ---- LISTENERS ---------------------------------------------------------------

function createListeners() 
{
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

    document.getElementById("input-cep")?.addEventListener("blur", async e => {
        const data = await buscarCEP(e.target.value);
        if (!data) return;

        document.getElementById("input-rua").value = data.logradouro || "";
        document.getElementById("input-cidade").value = data.localidade || "";
        document.getElementById("input-uf").value = data.uf || "";
        document.getElementById("input-bairro").value = data.bairro || "";
        document.getElementById("input-complemento").value = data.complemento || "";
    });

    document.getElementById("pagamento-form")?.addEventListener("submit", e => {
        e.preventDefault();
        state.carrinho = [];
        renderCarrinho();
        window.location.hash = "#homepage";
    });

    document.getElementById("login-option")?.addEventListener("click",  () => { window.location.hash = "#login"; });
    document.getElementById("signup-option")?.addEventListener("click", () => { window.location.hash = "#sign-up"; });

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

    document.getElementById("btn-novo-prod")?.addEventListener("click", () => {
        state.currentEditingProductId = null;
        window.location.hash = "#admin-produto-create";
    });

    document.getElementById("btn-voltar-admin")?.addEventListener("click", () => {
        window.location.hash = "#admin-produtos";
    });

    document.querySelectorAll(".brand-filter").forEach(checkbox =>
        checkbox.addEventListener("change", renderCatalogo)
    );

    document.querySelectorAll(".cat-filter").forEach(checkbox =>
        checkbox.addEventListener("change", renderCatalogo)
    );

    document.getElementById("price-range")?.addEventListener("input", e => {
        document.getElementById("price-value").textContent = `Até ${formatPrice(e.target.value)}`;
        renderCatalogo();
    });

    document.getElementById("sort-select")?.addEventListener("change", renderCatalogo);
}

// ---- INIT ----------------------------------------------------------------

window.addEventListener("load", async () => {
    await loadProducts();
    changePage();
    createListeners();
});

window.addEventListener("hashchange", changePage);

// Globais necessários para handlers inline (onclick, por ex)
window.removerDoCarrinho = removerDoCarrinho;
window.handleLogout      = handleLogout;
window.editarProduto     = (id) => {
    state.currentEditingProductId = id;
    window.location.hash = "#admin-produto-update";
};