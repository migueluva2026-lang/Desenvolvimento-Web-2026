import { state } from './state.js';
import { removerDoCarrinho, renderCarrinho, formatPrice } from './cart.js';
import { adicionarAoCarrinho } from './cart.js';
import { renderSearchDropdown, renderHomepage, renderCatalogo, renderProduct, renderItensCompra, renderPagamento, buscarCEP, renderRecommendedProducts } from './pages.js';
import { renderAdminProdutos, renderAdminProdutoUpdate, adicionarMontagemAoCarrinho, submitCriarProduto, atualizarTotalMontagem } from './admin.js';
import { validarPedido } from "./validation.js";

const pages = document.querySelectorAll("main > section");

// Search bar
const searchInput = document.getElementById("search-input");
const searchDropdown = document.getElementById("search-dropdown");

// Homepage
const modal = document.getElementById("service-modal");

// Admin New product
const categorySelect = document.getElementById('create-category');


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
export function restoreSession() 
{
    const admin = localStorage.getItem("admin");

    if (!admin)
        return false;

    const data = JSON.parse(admin);

    state.isAdmin = true;

    document.getElementById("signup-option").style.display = "none";
    document.getElementById("login-option").style.display = "none";
    document.getElementById("admin-nav-btn").style.display = "inline-block";
    document.getElementById("logout-option").style.display = "inline-block";

    return true;
}

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

        localStorage.setItem("admin", JSON.stringify({
            id_admin: result.id_admin,
            username: result.username
            })
        );

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
    localStorage.removeItem("admin");
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

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            searchDropdown.classList.remove("show");
            return;
        }

        const matches = state.productsData.filter(product => product.name?.toLowerCase().includes(query)).slice(0, 8);

        renderSearchDropdown(matches);
    });

    searchDropdown.addEventListener("click", (e) => {
        const item = e.target.closest(".search-item");

        if (!item?.dataset.id) return;

        const productId = item.dataset.id;

        window.location.hash = `#produto?id=${productId}`;

        searchInput.value = "";
        searchDropdown.classList.remove("show");
    });

    document.addEventListener("click", (e) => {
        if (
            !searchInput.contains(e.target) &&
            !searchDropdown.contains(e.target)
        ) {
            searchDropdown.classList.remove("show");
        }
    });

    ['build-cpu','build-gpu','build-ram','build-storage','build-case','build-monitor'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', atualizarTotalMontagem);
    });


    document.getElementById('build-add-btn')?.addEventListener('click', () => {
        console.log(document.getElementById('build-add-btn'));
        const ok = adicionarMontagemAoCarrinho();
        if (ok) window.location.hash = '#pedido';
    });

    document.getElementById("request-quote")?.addEventListener("click", () => {
        modal.classList.add("active");
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // #region Catalogo
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

    //#endregion

    //#region produto
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
    //#endregion

    //#region pedido
    document.getElementById("input-cep")?.addEventListener("blur", async e => {
        const data = await buscarCEP(e.target.value);
        if (!data) return;

        document.getElementById("input-rua").value = data.logradouro || "";
        document.getElementById("input-cidade").value = data.localidade || "";
        document.getElementById("input-uf").value = data.uf || "";
        document.getElementById("input-bairro").value = data.bairro || "";
        document.getElementById("input-complemento").value = data.complemento || "";
    });

    document.getElementById("pedido-form")?.addEventListener("submit", e => {
        e.preventDefault();
        const erros = validarPedido(e.target);

        if (erros.length) {
            alert(erros.join("\n"));
            return;
        }
        
        state.orderData.nome = e.target.querySelector("input[name=nome]")?.value     ?? "";
        state.orderData.endereco = e.target.querySelector("input[name=endereco]")?.value ?? "";
        window.location.hash = "#pagamento";
    });
    //#endregion

    document.getElementById("pagamento-form")?.addEventListener("submit", e => {
        e.preventDefault();
        state.carrinho = [];
        renderCarrinho();
        window.location.hash = "#homepage";
    });

    //#region admin
    document.getElementById("btn-novo-prod")?.addEventListener("click", () => {
        state.currentEditingProductId = null;
        window.location.hash = "#admin-produto-create";
    });

    document.getElementById("btn-voltar-admin")?.addEventListener("click", () => {
        window.location.hash = "#admin-produtos";
    });

    categorySelect?.addEventListener('change', () => { // caso category select tenha new, mostra (display block), caso não, none
        document.getElementById('new-category-wrapper').style.display = categorySelect.value === '__new__' ? 'block' : 'none';
    });

    document.getElementById('create-images-upload')?.addEventListener('change', e => {
        const count = e.target.files.length;
        document.getElementById('images-count-info').textContent =
            count ? `${count} imagem(ns) selecionada(s).` : 'Nenhuma imagem selecionada.';
    });


    document.getElementById('admin-produto-create-form')?.addEventListener('submit', submitCriarProduto);

    document.getElementById("admin-produto-update-form").addEventListener("submit", async e => {
        e.preventDefault();

        const product = {
            id_product: state.currentEditingProductId,
            name: document.getElementById("update-name").value,
            brand: document.getElementById("update-brand").value,
            category: document.getElementById("update-category").value,
            price: Number(document.getElementById("update-price").value),
            description: document.getElementById("update-desc").value,
            stock_quantity: Number(document.getElementById("update-stock").value)
        };

        try {
            const response = await fetch( "/DesenWeb2026/api/products/update.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                }
            );
            const result = await response.json();

            if (result.success) {
                alert("Produto atualizado com sucesso!");

                const produtoLocal = state.productsData.find(
                    p => p.id_product == state.currentEditingProductId
                );

                if (produtoLocal) {
                    Object.assign(produtoLocal, product);
                }

                window.location.hash = "#admin-produtos";
            } else {
                alert(result.message || "Erro ao atualizar produto.");
            }

        } catch (err) {
            console.error(err);
            alert("Erro na comunicação com o servidor.");
        }
    });

    //#endregion
}

// ---- INIT ----------------------------------------------------------------

window.addEventListener("load", async () => {
    restoreSession();
    
    await loadProducts();
    changePage();
    createListeners();
});

window.addEventListener("hashchange", changePage);

// Globais necessários para handlers inline (onclick, por ex)
window.removerDoCarrinho = removerDoCarrinho;
window.handleLogout = handleLogout;

window.editarProduto = (id) => {
    state.currentEditingProductId = id;
    window.location.hash = "#admin-produto-update";
};

window.excluirProduto = async (id) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
        const response = await fetch("/DesenWeb2026/api/products/delete.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_product: id
                })
            }
        );

        const result = await response.json();
        if (result.success) {
            alert("Produto excluído!");

            state.productsData =state.productsData.filter(p => p.id_product != id);
            renderAdminProdutos();
        } else {
            alert(result.message);
        }

    } catch (err) {
        console.error(err);
        alert("Erro ao excluir produto.");
    }
};