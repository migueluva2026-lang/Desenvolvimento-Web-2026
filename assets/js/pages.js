import { state } from './state.js';
import { adicionarAoCarrinho, renderCarrinho, totalCarrinho, formatPrice } from './cart.js';

export function renderHomepage() {
    const grid = document.getElementById("featured-products");
    if (!grid) return;
    grid.innerHTML = "";

    state.productsData
        .filter(p => Number(p.featured) === 1) // Filtra apenas pros filtered funcionarem
        .forEach(product => {
            const card = document.createElement("div");
            card.className = "card-featured";
            card.innerHTML = `
                <img src="${product.image_card}" alt="${product.name}">
                <div class="feat-info">
                    <h4>${product.description.substring(0, 100)}…</h4>
                    <p class="preco-original">${formatPrice(product.original_price)}</p>
                    <p class="preco-promocao">${formatPrice(product.price)}</p>
                    <button class="btn-ver">Ver Produto</button>
                </div>
            `;
            const goTo = () => { window.location.hash = `#produto?id=${product.id_product}`; };
            card.querySelector(".btn-ver").addEventListener("click", e => { e.stopPropagation(); goTo(); });
            card.addEventListener("click", goTo);
            grid.appendChild(card);
        });
}

export function renderCatalogo() {
    const grid = document.getElementById("catalogo-grid");
    if (!grid) return;

    grid.innerHTML = "";

    let products = [...state.productsData];

    // Marcas selecionadas
    const selectedBrands = [
        ...document.querySelectorAll(".brand-filter:checked")
    ].map(checkbox => checkbox.value);

    // Categorias selecionadas
    const selectedCategories = [
        ...document.querySelectorAll(".cat-filter:checked")
    ].map(checkbox => checkbox.value);

    // Preço máximo
    const maxPrice = Number(document.getElementById("price-range")?.value || 10000);

    // Filtro de marcas
    if (selectedBrands.length > 0) {
        products = products.filter(product =>
            selectedBrands.includes(product.brand)
        );
    }

    // Filtro de categorias
    if (selectedCategories.length > 0) {
        products = products.filter(product =>
            selectedCategories.includes(product.category)
        );
    }

    // Filtro de preço
    products = products.filter(product => Number(product.price) <= maxPrice);

    // Ordenação
    const sortValue = document.getElementById("sort-select")?.value || "most-expensive";

    switch (sortValue) {
        case "cheapest":
            products.sort((a, b) => a.price - b.price);
            break;

        case "name-az":
            products.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "most-expensive":
        default:
            products.sort((a, b) => b.price - a.price);
            break;
    }

    // Renderização
    products.forEach(product => {
        const card = document.createElement("div");

        card.className = "cat-card";

        card.innerHTML = `
            <img src="${product.image_card}" alt="${product.name}">
            <div class="cat-card-info">
                <h3>${product.name}</h3>
                <p class="cat-card-price">${formatPrice(product.price)}</p>
                ${
                    Number(product.stock_quantity) === 0
                        ? '<p class="cat-card-oos">Fora de estoque</p>'
                        : ''
                }
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.hash =
                `#produto?id=${product.id_product}`;
        });

        grid.appendChild(card);
    });
}

export function renderProduct(id) 
{
    // == intencional: id da URL é string, id_product do banco é número
    const produto = state.productsData.find(x => x.id_product == id);
    if (!produto) return;
    state.currentProduct = produto;

    const mainImg = document.getElementById("produto-main-img");
    const primeiraImagem = produto.images?.[0]?.image_path ?? produto.image_card;
    if (mainImg) mainImg.src = primeiraImagem;

    document.getElementById("produto-title").textContent = produto.name;
    document.getElementById("produto-desc").textContent = produto.description;
    document.getElementById("prod-sale").textContent = formatPrice(produto.price);
    document.getElementById("prod-orig").textContent = formatPrice(produto.original_price);

    const stockInfo = document.getElementById("produto-stock-2");
    if (stockInfo) {
        stockInfo.textContent = produto.stock_quantity > 0 ? "Em Estoque" : "Fora de Estoque";
        stockInfo.style.color = produto.stock_quantity > 0 ? "#15803d"   : "#b91c1c";
    }

    const thumbWrap = document.getElementById("produto-thumbs");
    if (thumbWrap) {
        thumbWrap.innerHTML = "";
        (produto.images ?? []).forEach((imgObj, i) => {
            const img = document.createElement("img");
            img.src = imgObj.image_path;
            img.alt = `Foto ${i + 1}`;
            if (i === 0) img.classList.add("active-thumb");
            img.addEventListener("click", () => {
                if (mainImg) mainImg.src = imgObj.image_path;
                thumbWrap.querySelectorAll("img").forEach(t => t.classList.remove("active-thumb"));
                img.classList.add("active-thumb");
            });
            thumbWrap.appendChild(img);
        });
    }

    renderCarrinho();
}

export function renderItensCompra() 
{
    const lista = document.getElementById("pedido-items-resume");
    const total = document.getElementById("pedido-total-val");
    if (!lista) return;
    lista.innerHTML = "";

    if (!state.carrinho.length) {
        lista.innerHTML = '<p style="font-size:0.8rem;color:#888;text-align:center;padding:10px 0;">Nenhum item no carrinho.</p>';
        if (total) total.textContent = formatPrice(0);
        return;
    }

    state.carrinho.forEach(item => {
        const row = document.createElement("div");
        row.className = "resumo-pedido-item";
        row.innerHTML = `
            <span>${item.name.substring(0, 28)}… ×${item.quantity}</span>
            <span>${formatPrice(Number(item.price) * item.quantity)}</span>
        `;
        lista.appendChild(row);
    });

    if (total) total.textContent = formatPrice(totalCarrinho());
}

export function renderPagamento() 
{
    document.getElementById("pag-valor").textContent  = formatPrice(totalCarrinho());
    document.getElementById("pag-codigo").textContent = "#" + Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById("pag-data").textContent   = new Date().toLocaleDateString("pt-BR");
    document.getElementById("pag-dest").textContent   = state.orderData.nome     || "--";
    document.getElementById("pag-local").textContent  = state.orderData.endereco || "--";
}