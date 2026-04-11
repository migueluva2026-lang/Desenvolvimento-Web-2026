// 
// Array de produtos, renderiza paginas dinamicamente, valida algumas coisas 
// 

const productsData = [
    {
        id: "Produto-001",
        title: 'Monitor ASUS TUF 27" Full HD, 240Hz, 0.3ms, Fast IPS - VG279QM5A',
        brand: "ASUS",
        category: "Monitor",
        stock: true,
        price: 1199.99,
        originalPrice: 2272.72,
        featured: true,
        images: {
            card: "img/monitor/monitor-card.webp",
            img1: "img/monitor/monitor-1.webp",
            img2: "img/monitor/monitor-2.webp",
            img3: "img/monitor/monitor-3.webp",
            img4: "img/monitor/monitor-4.webp"
        },
        desc: 'Tecnologia e Precisão: Fast IPS com 1ms de tempo de resposta (0.3ms mínimo) e 240Hz para jogabilidade fluida Design e Ergonomia: 27" FHD com tecnologias Adaptive-Sync, AMD FreeSync Premium e G-SYNC para eliminar screen tearing Conectividade: Não especificada para compatibilidade e recursos com ou sem fio Recursos Especiais: HDR10, ELMB, Shadow Boost e GameVisual para visuais otimizados e customizados'
    },
    {
        id: "Produto-002",
        title: "Placa de Vídeo XFX Swift RX 9070 XT",
        brand: "XFX",
        category: "Placa de Vídeo",
        stock: true,
        price: 4599.99,
        originalPrice: 6211.65,
        featured: true,
        images: {
            card: "img/gpu/gpu-card.webp",
            img1: "img/gpu/gpu-1.webp",
            img2: "img/gpu/gpu-2.webp",
            img3: "img/gpu/gpu-3.webp",
            img4: "img/gpu/gpu-4.webp"
        },
        desc: "Placa de Vídeo XFX Swift RX 9070 XT WHITE TRIPLE FAN GAMING EDITION WITH AMD Radeon, 16GB, GDDR6, HDMI 3xDP, RDNA 4 - RX-97T5WF3W9"
    },
    {
        id: "Produto-003",
        title: "Notebook Acer Nitro 5 Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD",
        brand: "Acer",
        category: "Periféricos",
        stock: true,
        price: 3499.00,
        originalPrice: 4299.00,
        featured: false,
        images: {
            card: "img/notebook/notebook-card.webp",
            img1: "img/notebook/notebook-1.webp",
            img2: "img/notebook/notebook-2.webp",
            img3: "img/notebook/notebook-3.webp",
            img4: "img/notebook/notebook-4.webp"
        },
        desc: "Notebook Gamer Acer Nitro 5, Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD, Tela 144Hz, Windows 11"
    },
    {
        id: "Produto-004",
        title: "Headset HyperX Cloud III Microfone Removível",
        brand: "HyperX",
        category: "Periféricos",
        stock: true,
        price: 349.99,
        originalPrice: 499.99,
        featured: false,
        images: {
            card: "img/headset/headset-card.webp",
            img1: "img/headset/headset-1.webp",
            img2: "img/headset/headset-2.webp",
            img3: "img/headset/headset-3.webp",
            img4: "img/headset/headset-4.webp"
        },
        desc: "Headset Gamer HyperX Cloud III, Áudio DTS Headphone:X, Microfone Removível, Compatível com PC, PS5, Xbox, Mobile"
    },
    {
        id: "Produto-005",
        title: 'Monitor Samsung 27" Curvo Full HD, 165Hz',
        brand: "Samsung",
        category: "Monitor",
        stock: true,
        price: 899.00,
        originalPrice: 1299.00,
        featured: false,
        images: {
            card: "img/monitorsamsung/monitorsamsung-card.avif",
            img1: "img/monitorsamsung/monitorsamsung-1.avif",
            img2: "img/monitorsamsung/monitorsamsung-2.avif",
            img3: "img/monitorsamsung/monitorsamsung-3.avif",
            img4: "img/monitorsamsung/monitorsamsung-4.webp"
        },
        desc: 'Monitor Samsung 27" Curvo, Full HD, 165Hz, 1ms, painel VA, entradas HDMI e DisplayPort, FreeSync Premium'
    },
    {
        id: "Produto-006",
        title: "Teclado Mecânico HyperX Alloy",
        brand: "HyperX",
        category: "Periféricos",
        stock: true,
        price: 279.99,
        originalPrice: 399.99,
        featured: false,
        images: {
            card: "img/teclado/teclado-card.jpg",
            img1: "img/teclado/teclado-1.jpg",
            img2: "img/teclado/teclado-2.jpg",
            img3: "img/teclado/teclado-3.jpg",
            img4: "img/teclado/teclado-4.jpg"
        },
        desc: "Teclado Mecânico HyperX Alloy Origins, Switches HyperX Red Linear, RGB por tecla, Layout ABNT2, Compacto TKL"
    },
    {
        id: "Produto-007",
        title: "SSD Samsung 990 Pro 1TB",
        brand: "Samsung",
        category: "SSD",
        stock: true,
        price: 449.99,
        originalPrice: 599.99,
        featured: false,
        images: {
            card: "img/ssd/ssd-card.jpg",
            img1: "img/ssd/ssd-1.jpg",
            img2: "img/ssd/ssd-2.jpg",
            img3: "img/ssd/ssd-3.jpg",
            img4: "img/ssd/ssd-4.jpg"
        },
        desc: "SSD Samsung 990 Pro 1TB NVMe PCIe 4.0 M.2, Leitura Seq. 7.450MB/s, Gravação Seq. 6.900MB/s, MZ-V9P1T0BW"
    },
    {
        id: "Produto-008",
        title: "Gabinete ASUS ROG Strix Helios",
        brand: "ASUS",
        category: "Gabinete",
        stock: false,
        price: 799.99,
        originalPrice: 1099.99,
        featured: false,
        images: {
            card: "img/gabinete/gabinete-card.webp",
            img1: "img/gabinete/gabinete-1.webp",
            img2: "img/gabinete/gabinete-2.webp",
            img3: "img/gabinete/gabinete-3.webp",
            img4: "img/gabinete/gabinete-4.webp"
        },
        desc: "Gabinete Gamer ASUS ROG Strix Helios, Mid Tower, Vidro Temperado, Aura Sync RGB, Suporte GPU Vertical, GX601"
    },
    {
        id: "Produto-009",
        title: "Memória RAM XFX 32GB DDR5",
        brand: "XFX",
        category: "Memória Ram",
        stock: true,
        price: 389.99,
        originalPrice: 499.99,
        featured: false,
        images: {
            card: "img/ram/ram-card.webp",
            img1: "img/ram/ram-1.webp",
            img2: "img/ram/ram-2.webp",
            img3: "img/ram/ram-3.webp",
            img4: "img/ram/ram-4.webp"
        },
        desc: "Memória RAM XFX 32GB (2x16GB) DDR5, 6000MHz, CL30, RGB Endereçável, XMP 3.0, compatível com Intel e AMD"
    },
    {
        id: "Produto-010",
        title: "Fonte ASUS ROG Thor 850W",
        brand: "ASUS",
        category: "Periféricos",
        stock: true,
        price: 699.99,
        originalPrice: 899.99,
        featured: false,
        images: {
            card: "img/fonte/fonte-card.webp",
            img1: "img/fonte/fonte-card.webp",
            img2: "img/fonte/fonte-card.webp",
            img3: "img/fonte/fonte-card.webp",
            img4: "img/fonte/fonte-card.webp"
        },
        desc: "Fonte ASUS ROG Thor 850W Platinum Modulada, Display OLED Power, Aura Sync RGB, certificação 80 Plus Platinum"
    }
];

let carrinho = [];
let currentProduct = null;
let orderData = {};

const pages = document.querySelectorAll("main > section");

function trocarPagina() {
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

function renderHomepage() {
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

function renderCatalogo() {
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

function loadProduct(id) {
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
    document.getElementById("prod-sale").textContent       = produtoAtual.price;
    document.getElementById("prod-orig").textContent       = produtoAtual.originalPrice;

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

function adicionarAoCarrinho(product, qty = 1) {
    const existing = carrinho.find(i => i.id === product.id);
    if (existing) {
        existing.quantity += qty;
    } else {
        carrinho.push({ ...product, quantity: qty });
    }
    renderCarrinho();
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    renderCarrinho();
}

function TotalCarrinho() {
    return carrinho.reduce((s, i) => s + i.price * i.quantity, 0);
}

function renderCarrinho() {
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

function renderItensCompra() {
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

function renderPagamento() {
    let t = TotalCarrinho();
    document.getElementById("pag-valor").textContent  = t;
    document.getElementById("pag-codigo").textContent = "#" + Math.random().toString(36).substring(2, 10).toUpperCase(); // Gera um número aleatório
    document.getElementById("pag-data").textContent   = new Date().toLocaleDateString("pt-BR");
    document.getElementById("pag-dest").textContent   = orderData.nome     || "--";
    document.getElementById("pag-local").textContent  = orderData.endereco || "--";
}

//  LISTENERS
function criarListeners() {

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