import { state } from './state.js';
import { adicionarAoCarrinho, renderCarrinho, totalCarrinho, formatPrice } from './cart.js';

export function renderSearchDropdown(products)
{
    const searchDropdown = document.getElementById("search-dropdown");

    if (!products.length) {
        searchDropdown.innerHTML = `
            <div class="search-item">
                Nenhum produto encontrado
            </div>
        `;
        searchDropdown.classList.add("show");
        return;
    }

    searchDropdown.innerHTML = products.map(product => `
        <div class="search-item" data-id="${product.id_product}">
            <div class="search-item-name">${product.name}</div>
            <div class="search-item-price">
                ${formatPrice(product.price)}
            </div>
        </div>
    `).join("");

    searchDropdown.classList.add("show");
}

export function renderHomepage() 
{
    const grid = document.getElementById("featured-products");
    if (!grid) return;
    grid.innerHTML = "";
    let featuredNumber = 0;
    state.productsData
        .filter(p => Number(p.featured) === 1) // Filtra apenas pros filtered funcionarem
        .forEach(product => {
            if (featuredNumber >= 2) return;
            featuredNumber += 1;

            // Aqui tem a possibilidade de filtrar o featured por nome
            const card = document.createElement("div");
            card.className = "card-featured";
            card.innerHTML = `
                <img src="${product.image_card}" alt="${product.name}">
                <div class="feat-info">
                    <h4>${product.name}</h4>
                    <p class="preco-original">${formatPrice(product.original_price)}</p>
                    <p class="preco-promocao">${formatPrice(product.price)}</p>
                </div>
            `;
            const goTo = () => { window.location.hash = `#produto?id=${product.id_product}`; };
            card.addEventListener("click", goTo);
            grid.appendChild(card);
        });

    renderBuildPCDropdowns();
}

function renderBuildPCDropdowns() 
{
    preencherDropdown("build-cpu", "Processador");
    preencherDropdown("build-gpu", "Placa de Vídeo");
    preencherDropdown("build-ram", "Memória Ram");
    preencherDropdown("build-storage", "SSD");
    preencherDropdown("build-case", "Gabinete");
    preencherDropdown("build-monitor", "Monitor");
}

function preencherDropdown(id, categoria) 
{
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Selecione</option>`;

    state.productsData.filter(p => p.category === categoria && Number(p.stock_quantity) > 0).forEach(produto => {
            select.innerHTML += `
                <option value="${produto.id_product}">
                    ${produto.name}
                </option>
            `;
        });

}

export function renderCatalogo() 
{
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
    const maxPrice = Number(document.getElementById("price-range")?.value || 50000);

    // Aplica filtro de marcas
    if (selectedBrands.length > 0) {
        products = products.filter(product =>
            selectedBrands.includes(product.brand)
        );
    }

    // Aplica filtro de categorias
    if (selectedCategories.length > 0) {
        products = products.filter(product =>
            selectedCategories.includes(product.category)
        );
    }

    // Aplica filtro de preço
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
    state.currentProduct = produto; // Importante para o renderRecommendedProducts

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

export function renderRecommendedProducts() {
    const currentProduct = state.currentProduct;
    if (!currentProduct) return;

    const grid = document.getElementById("recommended-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const products = state.productsData.filter(p =>
        p.category === currentProduct.category &&
        p.id_product !== currentProduct.id_product
    );

    if (!products.length) {
        grid.innerHTML = '<p class="cat-card-oos">Nenhum produto relacionado encontrado.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "cat-card";
        card.innerHTML = `
            <img src="${product.image_card}" alt="${product.name}">
            <div class="cat-card-info">
                <h3>${product.name}</h3>
                <p class="cat-card-price">${formatPrice(product.price)}</p>
                ${Number(product.stock_quantity) === 0 ? '<p class="cat-card-oos">Fora de estoque</p>' : ''}
            </div>
        `;
        card.addEventListener("click", () => {
            window.location.hash = `#produto?id=${product.id_product}`;
        });
        grid.appendChild(card);
    });
}

export async function buscarCEP(cep)
{
    if (cep.length !== 8) return null;

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
        const data = await res.json();
        if (data.erro) return null;
        return data;
    } catch(e) {

    }
}


export function renderItensCompra() {
    if (typeof syncMontagem === 'function') syncMontagem(); // garante que montagem está em sync caso venha de "comprar agora"
 
    const lista = document.getElementById("pedido-items-resume");
    const total = document.getElementById("pedido-total-val");
    if (!lista) return;
    lista.innerHTML = "";
 
    // ---------- Montagem ----------
    if (state.montagem.length) {
        lista.innerHTML += `<h4 style="margin-bottom:8px;"> Montagem Personalizada </h4>`;
 
        let totalMontagem = 0;
 
        state.montagem.forEach(id => {
            const produto = state.productsData.find(p => p.id_product == id);
            if (!produto) return;
 
            totalMontagem += Number(produto.price);
 
            lista.innerHTML += `
                <div class="resumo-pedido-item">
                    <span>${produto.category} — ${produto.name.substring(0, 30)}</span>
                    <span>${formatPrice(produto.price)}</span>
                </div>
            `;
        });
 
        lista.innerHTML += `
            <div class="resumo-pedido-item" style="font-weight:600; border-top:1px solid #ddd; margin-top:6px; padding-top:6px;">
                <span>Subtotal montagem</span>
                <span>${formatPrice(totalMontagem)}</span>
            </div>
            <hr>
        `;
    }
 
    // ---------- Carrinho ----------
    if (!state.carrinho.length && !state.montagem.length) {
        lista.innerHTML += `
            <p style="font-size:.8rem;color:#888;text-align:center;padding:10px 0;">
                Nenhum produto no carrinho.
            </p>
        `;
        if (total) total.textContent = formatPrice(0);
        return;
    }
 
    state.carrinho.forEach(item => {
        const row = document.createElement("div");
        row.className = "resumo-pedido-item";
        row.innerHTML = `
            <span>${item.name.substring(0, 28)}… ×${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        `;
        lista.appendChild(row);
    });
 
    // Total geral = carrinho + montagem
    const totalMontagem = state.montagem.reduce((sum, id) => {
        const p = state.productsData.find(x => x.id_product == id);
        return sum + (p ? Number(p.price) : 0);
    }, 0);
 
    if (total) total.textContent = formatPrice(totalCarrinho() + totalMontagem);
}


export function renderPagamento() 
{
    document.getElementById("pag-valor").textContent  = formatPrice(totalCarrinho());
    document.getElementById("pag-codigo").textContent = "#" + Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById("pag-data").textContent   = new Date().toLocaleDateString("pt-BR");
    document.getElementById("pag-dest").textContent   = state.orderData.nome     || "--";
    document.getElementById("pag-local").textContent  = state.orderData.endereco || "--";
}