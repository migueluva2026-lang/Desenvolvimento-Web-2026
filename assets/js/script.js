// 
// Array de produtos, renderiza paginas dinamicamente, faz validações, controla o carrinho e o fluxo de compra (por enquanto)
// Também dá fetch no backend
//

import productsData from "./db/products.js";

let carrinho = [];
let currentProduct = null;
let orderData = {};

const pages = document.querySelectorAll("main > section");

function trocarPagina() 
{
    let hash = window.location.hash || "#homepage";

    // product route: #produto?id=Produto-001
    if (hash.startsWith("#produto?") || hash.startsWith("#produto?id")) {
        const queryStr = hash.replace("#produto?", "");
        const params   = new URLSearchParams(queryStr);
        const id       = params.get("id");
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

    // inicializa conteúdo específico da página
    if (hash === "#homepage")  renderHomepage();
    if (hash === "#catalogo")  renderCatalogo();
    if (hash === "#pedido")    renderItensCompra();
    if (hash === "#pagamento") renderPagamento();
}

//  Página inicial
function renderHomepage() 
{
    const grid = document.getElementById("featured-products");
    if (!grid) return;
    grid.innerHTML = "";

    productsData.filter(p => p.featured).forEach(product => {
        const card = document.createElement("div");
        card.className = "card-produto";
        card.innerHTML = `
            <img src="${product.images.card}">
            <div class="feat-info">
                <h4>${product.desc.substring(0, 100)}...</h4>
                <p class="preco-original">${product.originalPrice}</p>
                <p class="preco-promocao">${product.price}</p>
                <button class="btn-ver">Ver Produto</button>
            </div>
        `;
        card.querySelector(".btn-ver").addEventListener("click", e => {
            e.stopPropagation();
            window.location.hash = `#produto?id=${product.id}`;
        });
        card.addEventListener("click", () => {
            window.location.hash = `#produto?id=${product.id}`;
        });
        grid.appendChild(card);
    });
}

//  Catálogo
function renderCatalogo() 
{
    const grid = document.getElementById("catalogo-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const list = productsData.sort((a, b) => b.price - a.price);

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "cat-card";
        card.innerHTML = `
            <img src="${product.images.card}">
            <div class="cat-card-info">
                <h3>${product.title}</h3>
                <p class="cat-card-price">${product.price}</p>
                ${!product.stock ? '<p class="cat-card-oos">Fora de estoque</p>' : ''}
            </div>
        `;
        card.addEventListener("click", () => {
            window.location.hash = `#produto?id=${product.id}`;
        });
        
        grid.appendChild(card);
    });
}

//  PRODUTO 
function loadProduct(id) 
{
    const produtoAtual = productsData.find(x => x.id === id);
    currentProduct = produtoAtual;

    // Imagem principal
    const mainImg = document.getElementById("produto-main-img");
    mainImg.src = produtoAtual.images.img1;

    document.getElementById("produto-title").textContent = produtoAtual.title;
    document.getElementById("produto-desc").textContent  = produtoAtual.desc;

    const stockInfo = document.getElementById("produto-stock-2");
    if (produtoAtual.stock) {
        stockInfo.textContent = "Em Estoque";
        stockInfo.style.color = "#15803d";
    } else {
        stockInfo.textContent = "Fora de Estoque";
        stockInfo.style.color = "#b91c1c";
    }

    // Painel de informações do produto
    document.getElementById("prod-sale").textContent = produtoAtual.price;
    document.getElementById("prod-orig").textContent = produtoAtual.originalPrice;

    // Imagens do produto
    const thumbWrap = document.getElementById("produto-thumbs");
    thumbWrap.innerHTML = "";
    [produtoAtual.images.img1, produtoAtual.images.img2, produtoAtual.images.img3, produtoAtual.images.img4].forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Foto ${i + 1}`;
        
        if (i === 0) img.classList.add("active-thumb");
        img.addEventListener("click", () => {
            mainImg.src = src;
            document.querySelectorAll("#produto-thumbs img").forEach(t => t.classList.remove("active-thumb"));
            img.classList.add("active-thumb");
        });
        thumbWrap.appendChild(img);
    });

    renderCarrinho();
}

//  CARRINHO 
function adicionarAoCarrinho(product, qty = 1) 
{
    const existing = carrinho.find(i => i.id === product.id);
    if (existing) {
        existing.quantity += qty;
    } else {
        carrinho.push({ ...product, quantity: qty });
    }
    renderCarrinho();
}

function removerDoCarrinho(id) 
{
    carrinho = carrinho.filter(i => i.id !== id);
    renderCarrinho();
}

function TotalCarrinho() 
{
    return carrinho.reduce((s, i) => s + i.price * i.quantity, 0);
}

function renderCarrinho() 
{
    const listaCarrinho = document.getElementById("cart-items-list");
    if (!listaCarrinho) return;
    listaCarrinho.innerHTML = "";

    if (!carrinho.length) {
        listaCarrinho.innerHTML = '<p class="cart-empty-msg">Carrinho vazio</p>';
        return;
    }

    carrinho.forEach(item => {
        const el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${item.title.substring(0, 22)}… ×${item.quantity}
            </span>
            <span style="margin-left:6px;white-space:nowrap;">${item.price * item.quantity}</span>
            <button class="cart-item-rm" onclick="removerDoCarrinho('${item.id}')">✕</button>
        `;
        listaCarrinho.appendChild(el);
    });
}

// Detalhes do pedido
function renderItensCompra() 
{
    const listaProdutos  = document.getElementById("pedido-items-resume");
    const total = document.getElementById("pedido-total-val");
    if (!listaProdutos) return;

    listaProdutos.innerHTML = "";

    if (!carrinho.length) {
        listaProdutos.innerHTML = '<p style="font-size:0.8rem; color:#888; text-align:center; padding:10px 0;">Nenhum item no carrinho.</p>';
        if (total) total.textContent = 0;
        return;
    }

    carrinho.forEach(item => {
        const row = document.createElement("div");
        row.className = "resumo-pedido-item";
        row.innerHTML = `
            <span>${item.title.substring(0, 28)}… ×${item.quantity}</span>
            <span>${item.price * item.quantity}</span>
        `;
        listaProdutos.appendChild(row);
    });

    if (total) total.textContent = TotalCarrinho();
}

//  PAGAMENTO
function renderPagamento() 
{
    let t = TotalCarrinho();
    document.getElementById("pag-valor").textContent  = t;
    document.getElementById("pag-codigo").textContent = "#" + Math.random().toString(36).substring(2, 10).toUpperCase(); // Gera um número aleatório
    document.getElementById("pag-data").textContent   = new Date().toLocaleDateString("pt-BR");
    document.getElementById("pag-dest").textContent   = orderData.nome     || "--";
    document.getElementById("pag-local").textContent  = orderData.endereco || "--";
}

//  LISTENERS
function criarListeners() 
{
    document.getElementById("add-cart-btn")?.addEventListener("click", () => {
        adicionarAoCarrinho(currentProduct);
    });

    document.getElementById("comprar-agora-btn")?.addEventListener("click", () => {
        adicionarAoCarrinho(currentProduct);
        window.location.hash = "#pedido";
    });

    document.getElementById("ir-pedido-btn")?.addEventListener("click", () => {
        window.location.hash = "#pedido";
    });

    document.getElementById("pedido-form")?.addEventListener("submit", e => {
        e.preventDefault();
        orderData.nome = e.target.querySelector("input[type=text]").value;
        window.location.hash = "#pagamento";
    });

    document.getElementById("pagamento-form")?.addEventListener("submit", e => {
        e.preventDefault();
        window.location.hash = "#homepage";
    });
}

//  Chama função de hash da página
window.addEventListener("load", () => {
    trocarPagina();
    criarListeners();
});

window.addEventListener("hashchange", trocarPagina);