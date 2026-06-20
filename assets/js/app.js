import { state } from './state.js';
import { removerDoCarrinho, renderCarrinho, formatPrice, totalCarrinho } from './cart.js';
import { adicionarAoCarrinho } from './cart.js';
import { renderSearchDropdown, renderHomepage, renderCatalogo, renderProduct, renderItensPedido, renderPagamento, buscarCEP, renderRecommendedProducts } from './pages.js';
import { renderAdminProdutos, renderAdminProdutoCreate, renderAdminProdutoUpdate, submitCriarProduto, submitAtualizarProduto, adicionarMontagemAoCarrinho, atualizarTotalMontagem } from './admin.js';
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
    window.scrollTo(0, 0); // ao trocar de página, se certificade estar no topo dela
    let hash = window.location.hash || "#homepage";

    if (hash === "#admin-produto-update" && !state.currentEditingProductId) hash = "#admin-produtos";
    if (hash === "#admin-produtos" && !state.isAdmin) hash = "#login";

    if (hash.startsWith("#produto?")) {
        const params = new URLSearchParams(hash.replace("#produto?", ""));
        const id = params.get("id");
        if (id) renderProduct(id);
        hash = "#produto";
    }

    if (hash === "#pedido" && !state.currentClient && !state.isAdmin) {
        state._redirectAfterLogin = "#pedido";
        hash = "#login-cliente";
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
        "#homepage": renderHomepage,
        "#catalogo": async () => { await loadProducts(); renderCatalogo(); }, // para recarregar as imagens caso atualize algo
        "#produto": renderRecommendedProducts,
        "#pedido": renderItensPedido,
        "#pagamento": renderPagamento,
        "#admin-produtos": renderAdminProdutos,
        "#admin-produto-create": renderAdminProdutoCreate,
        "#admin-produto-update": renderAdminProdutoUpdate,
    };
    renders[hash]?.();
}

// ---- ENTERING ------------------------------------------------------------------

export function restoreSession() {
    const adminData  = localStorage.getItem("admin");
    const clientData = localStorage.getItem("client");
 
    if (adminData) {
        state.isAdmin = true;
    } else if (clientData) {
        state.currentClient = JSON.parse(clientData);
    }
 
    updateClientUI();
}

function updateClientUI() {
    const isClient = !!state.currentClient;
    const isAdmin  = !!state.isAdmin;
 
    const label = document.getElementById("user-menu-label");
    const loggedout = document.getElementById("dropdown-loggedout");
    const clientPanel = document.getElementById("dropdown-client");
    const adminPanel = document.getElementById("dropdown-admin");
    const adminNavBtn = document.getElementById("admin-nav-btn");
 
    if (isAdmin) {
        if (label) label.textContent = "Admin";
        if (loggedout) loggedout.style.display = "none";
        if (clientPanel) clientPanel.style.display = "none";
        if (adminPanel) adminPanel.style.display = "block";
        if (adminNavBtn) adminNavBtn.style.display = "inline-block";
    } else if (isClient) {
        if (label) label.textContent = state.currentClient.name.split(" ")[0];
        if (loggedout) loggedout.style.display = "none";
        if (clientPanel) clientPanel.style.display = "block";
        if (adminPanel) adminPanel.style.display = "none";
        if (adminNavBtn) adminNavBtn.style.display = "none";
    } else {
        if (label) label.textContent = "Entrar";
        if (loggedout) loggedout.style.display = "block";
        if (clientPanel) clientPanel.style.display = "none";
        if (adminPanel) adminPanel.style.display = "none";
        if (adminNavBtn) adminNavBtn.style.display = "none";
    }
}

export async function handleLogin(credentials) {
    try {
        const res = await fetch("./api/auth/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        const result = await res.json();
        if (!result.success) {
            alert(result.message ?? "Credenciais inválidas.");
            return;
        }
 
        if (result.role === "admin") {
            localStorage.setItem("admin", JSON.stringify({ id_admin: result.id_admin, username: result.username,}));
            state.isAdmin = true;
            updateClientUI();
            closeDropdown();
            window.location.hash = "#admin-produtos";
 
        } else if (result.role === "client") {
            localStorage.setItem("client", JSON.stringify(result));
            state.currentClient = result;
            updateClientUI();
            closeDropdown();
            window.location.hash = state._redirectAfterLogin ?? "#homepage";
            delete state._redirectAfterLogin;
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao efetuar login.");
    }
}

function handleLogout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("client");
    state.isAdmin = false;
    state.currentClient = null;
    updateClientUI();
    window.location.hash = "#homepage";
}


// ---- API --------------------------------------------------------------------

async function loadProducts() 
{
    const response = await fetch("./api/products/list.php");
    state.productsData = await response.json();
}

// ---- Coisas repetitivas ------------------------------------------------------

function openDropdown() 
{ 
    document.getElementById("user-dropdown")?.classList.add("open"); 
}
function closeDropdown() 
{ 
    document.getElementById("user-dropdown")?.classList.remove("open"); 
}

// ---- LISTENERS ---------------------------------------------------------------

function initDropdownListeners() {
    const container = document.getElementById("user-menu-container");
    const trigger = document.getElementById("user-menu-trigger");
    const dropdown  = document.getElementById("user-dropdown");
 
    if (!container || !trigger || !dropdown) return;
 
    trigger.addEventListener("click", e => { // toggle do trigger 
        e.stopPropagation();
        dropdown.classList.toggle("open");
    });
 
    container.addEventListener("mouseenter", openDropdown);
    container.addEventListener("mouseleave", closeDropdown);
 
    document.addEventListener("click", e => { // caso clique fora
        if (!container.contains(e.target)) closeDropdown();
    });
    
 
    // Botões do dropdown 
    document.getElementById("login-cliente-option")?.addEventListener("click", () => { 
        closeDropdown();
        window.location.hash = "#login-cliente";
    });
    document.getElementById("signup-option")?.addEventListener("click", () => {
        closeDropdown();
        window.location.hash = "#sign-up";
    });

    // login admin
    document.getElementById("login-option")?.addEventListener("click", () => {
        closeDropdown();
        window.location.hash = "#login";
    });
 
    // Cliente logado
    document.getElementById("pedidos-option")?.addEventListener("click", () => {
        closeDropdown();
        window.location.hash = "#meus-pedidos"; // página futura
    });
    document.getElementById("enderecos-option")?.addEventListener("click", () => {
        closeDropdown();
        window.location.hash = "#meus-enderecos"; // página futura
    });
    document.getElementById("logout-cliente-option")?.addEventListener("click", () => {
        closeDropdown();
        handleLogout();
    });
 
    // Admin logado
    document.getElementById("logout-option")?.addEventListener("click", () => {
        closeDropdown();
        handleLogout();
    });
}

function createListeners() 
{
    initDropdownListeners();

    // #region Entrar / SignUp
    document.getElementById("signup-form")?.addEventListener("submit", async e => {
        e.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const number = document.getElementById("signup-number").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirm  = document.getElementById("signup-confirm").value;

        if (password !== confirm) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const res = await fetch(`./api/client/create.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, number, password }),
            });
            const result = await res.json();

            if (!result.success) {
                const msg = result.errors?.join("\n") ?? result.message ?? "Erro ao cadastrar.";
                alert(msg);
                return;
            }

            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            window.location.hash = "#login";

        } catch (err) {
            console.error(err);
            alert("Erro na comunicação com o servidor.");
        }
    });

    // Login Cliente
    document.getElementById("login-cliente-form")?.addEventListener("submit", e => {
        e.preventDefault();

        handleLogin({email: document.getElementById("login-cliente-email").value.trim(), password: document.getElementById("login-cliente-pass").value,});
    });
 
    // Login admin
    document.getElementById("login-form")?.addEventListener("submit", e => {
        e.preventDefault();
        handleLogin({ username: document.getElementById("login-user").value.trim(), password: document.getElementById("login-pass").value,
        });
    });
    //#endregion

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

    document.getElementById("pedido-form")?.addEventListener("submit", async e => {
        e.preventDefault();

        const erros = validarPedido(e.target);
        if (erros.length) { alert(erros.join("\n")); return; }

        const nome = document.getElementById("input-nome").value;
        const email = document.getElementById("input-email").value;
        const telefone = document.getElementById("input-tel").value;
        const rua = document.getElementById("input-rua").value;
        const numero = document.getElementById("input-numero").value;
        const bairro = document.getElementById("input-bairro").value;
        const cidade = document.getElementById("input-cidade").value;
        const uf = document.getElementById("input-uf").value;
        const complemento = document.getElementById("input-complemento").value;
        const endereco = `${rua}, ${numero}${complemento ? ` (${complemento})` : ""} - ${bairro}, ${cidade}/${uf}`;

        state.orderData.nome = nome;
        state.orderData.email = email;
        state.orderData.telefone = telefone;
        state.orderData.endereco = endereco;

        const payload = {
            client: { name: nome, email, number: telefone, address: endereco },
            amount: totalCarrinho(),
            items: state.carrinho.map(item => ({
                id_product: item.id_product,
                quantity:   item.quantity,
                unit_price: Number(item.price), // garante número, não string
            })),
        };

        try {
            const res = await fetch(`./api/orders/create.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();

            if (!result.success) {
                alert("Erro ao registrar pedido: " + (result.message ?? ""));
                return;
            }

            state.orderData.id_order = result.id_order;

        } catch (err) {
            console.error(err);
            alert("Erro ao comunicar com o servidor.");
            return;
        }

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
        document.getElementById('images-count-info').textContent = count ? `${count} imagem(ns) selecionada(s).` : 'Nenhuma imagem selecionada.';
    });

    document.getElementById('admin-produto-create-form')?.addEventListener('submit', submitCriarProduto);

    document.getElementById("admin-produto-update-form")?.addEventListener("submit", submitAtualizarProduto);

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
        const response = await fetch("./api/products/delete.php",
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