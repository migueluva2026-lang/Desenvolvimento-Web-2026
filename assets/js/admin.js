import { state } from './state.js';
import { formatPrice, adicionarAoCarrinho } from './cart.js';

const BUILD_DROPDOWNS = [
    'build-cpu',
    'build-gpu',
    'build-ram',
    'build-storage',
    'build-case',
    'build-monitor',
];

export function renderAdminProdutos() 
{
    const lista = document.getElementById("admin-produtos-list");
    if (!lista) return;
    lista.innerHTML = "";

    state.productsData.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${product.image_card}?t=${Date.now()}" alt="${product.name}" width="60">
            </td>

            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock_quantity}</td>
            <td>
                <button onclick="window.editarProduto(${product.id_product})"> Editar </button>
                <button onclick="window.excluirProduto(${product.id_product})"> Excluir </button>
            </td>`;
        lista.appendChild(row);
    });
}

export function renderAdminProdutoCreate()
{
    const inputC = document.getElementById("create-card-upload");
    const inputG = document.getElementById("create-images-upload");

    if (inputC) inputC.value = "";
    if (inputG) inputG.value = "";

    document.getElementById("images-count-info").textContent = "Nenhuma imagem selecionada.";
}

export function renderAdminProdutoUpdate() 
{   
    const inputC = document.getElementById("update-card-upload");
    const inputG = document.getElementById("update-gallery-upload");
    if (inputC) inputC.value = "";
    if (inputG) inputG.value = "";
    document.getElementById("update-images-count-info").textContent = "Nenhuma imagem selecionada.";

    
    const produto = state.productsData.find(p => p.id_product == state.currentEditingProductId);
    if (!produto) return;
 
    document.getElementById("update-name").value = produto.name ?? "";
    document.getElementById("update-brand").value = produto.brand ?? "";
    document.getElementById("update-category").value  = produto.category ?? "";
    document.getElementById("update-price").value = produto.price ?? "";
    document.getElementById("update-original-price").value = produto.original_price ?? "";
    document.getElementById("update-stock").value  = produto.stock_quantity ?? "";
    document.getElementById("update-desc").value  = produto.description ?? "";
    document.getElementById("update-featured").value = produto.featured ?? "0";
    document.getElementById("update-active").value = produto.active ?? "1";
 
    const cardPreview = document.getElementById("update-card-preview");
    if (cardPreview) {
        cardPreview.src = produto.image_card ? produto.image_card + "?t=" + Date.now() : "";
        cardPreview.style.display = produto.image_card ? "block" : "none";
    }

    renderUpdateGallery(produto);
 
    // Contador de imagens selecionadas
    document.getElementById("update-gallery-upload")?.addEventListener("change", e => {
            const count = e.target.files.length;
            document.getElementById("update-images-count-info").textContent = count ? `${count} imagem(ns) selecionada(s).` : "Nenhuma imagem selecionada.";
        });
}


function renderUpdateGallery(produto) {
    const wrap = document.getElementById("update-gallery-preview");
    if (!wrap) return;
    wrap.innerHTML = "";
 
    (produto.images ?? []).forEach(img => {
        const item = document.createElement("div");
        item.className = "img-preview-item";
        item.dataset.idImage = img.id_image;
        item.innerHTML = `
            <img src="${img.image_path}?t=${Date.now()}" width="80">
            <button type="button" class="img-remove-btn" title="Excluir imagem">✕</button>
        `;
 
        item.querySelector(".img-remove-btn").addEventListener("click", async () => {
            if (!confirm("Excluir esta imagem?")) return;
 
            try {
                const res = await fetch(`./api/products/delete-image.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_image: img.id_image }),
                });
                const result = await res.json();
 
                if (result.success) {
                    const local = state.productsData.find(p => p.id_product == state.currentEditingProductId);
                    if (local) {
                        local.images = local.images.filter(i => i.id_image !== img.id_image);
                    }
                    item.remove();  // remove o elemento da tela sem re-renderizar tudo
                } else {
                    alert("Erro ao excluir imagem: " + (result.message ?? ""));
                }
            } catch (err) {
                console.error(err);
                alert("Erro na comunicação com o servidor.");
            }
        });
 
        wrap.appendChild(item);
    });
}


export async function submitCriarProduto(e) {
    e.preventDefault();
 
    const categorySelect  = document.getElementById('create-category');
    const cardInput       = document.getElementById('create-card-upload');    // input do card
    const galleryInput    = document.getElementById('create-images-upload');  // input da galeria
    const sku             = document.getElementById('create-sku').value.trim();
 
    const product = {
        sku,
        name: document.getElementById('create-name').value.trim(),
        brand: document.getElementById('create-brand').value.trim(),
        category:categorySelect.value === '__new__' ? document.getElementById('create-new-category').value.trim() : categorySelect.value,
        description: document.getElementById('create-description').value.trim(),
        price: Number(document.getElementById('create-price').value),
        original_price: Number(document.getElementById('create-original-price').value) || null,
        stock_quantity: Number(document.getElementById('create-stock').value),
        featured: Number(document.getElementById('create-featured').value),
        active: Number(document.getElementById('create-active').value),
    };
 
    // Cria o produto no banco
    let id_product;
    try {
        const res = await fetch('./api/products/create.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        const result = await res.json();
 
        if (!result.success) {
            alert('Erro ao criar produto: ' + (result.message ?? ''));
            return;
        }
        id_product = result.id_product;
    } catch (err) {
        console.error(err);
        alert('Erro na comunicação com o servidor.');
        return;
    }
 
    // Envia as imagens físicas para upload.php 
    const cardFile = cardInput?.files[0];
    const galleryFiles = galleryInput?.files;
    const temArquivos = cardFile || (galleryFiles && galleryFiles.length > 0);
 
    if (temArquivos) {
        const formData = new FormData();
        formData.append('sku', sku);
        formData.append('id_product', id_product);
 
        if (cardFile) {
            formData.append('card', cardFile); // card
        }
        Array.from(galleryFiles ?? []).forEach(file => {
            formData.append('gallery[]', file);// image-1, 2, 3
        });
 
        try {
            const upRes    = await fetch('./api/products/upload.php', {
                method: 'POST',
                body:formData,
            });
            const upResult = await upRes.json();
 
            if (!upResult.success) {
                console.warn('Erros no upload:', upResult.errors);
                alert('Produto criado, mas houve erros no upload de imagens:\n' + upResult.errors.join('\n'));
            }
        } catch (err) {
            console.error(err);
            alert('Produto criado, mas o upload falhou. Adicione as imagens manualmente via FTP.');
        }
    }
 
    alert('Produto criado com sucesso!');
    e.target.reset();
    document.getElementById('images-count-info').textContent = 'Nenhuma imagem selecionada.';
}
 
export async function submitAtualizarProduto(e) 
{
    e.preventDefault();
 
    const id = state.currentEditingProductId;
    const sku = state.productsData.find(p => p.id_product == id)?.sku ?? "";
 
    const product = {
        id_product: id,
        name: document.getElementById("update-name").value,
        brand: document.getElementById("update-brand").value,
        category: document.getElementById("update-category").value,
        price: Number(document.getElementById("update-price").value),
        original_price: Number(document.getElementById("update-original-price").value) || null,
        description: document.getElementById("update-desc").value,
        stock_quantity: Number(document.getElementById("update-stock").value),
        featured: Number(document.getElementById("update-featured").value),
        active: Number(document.getElementById("update-active").value),
    };
 
    try {
        const res = await fetch(`./api/products/update.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        const result = await res.json();
 
        if (!result.success) {
            alert(result.message || "Erro ao atualizar produto.");
            return;
        }
 
        // Atualiza o state local
        const local = state.productsData.find(p => p.id_product == id);
        if (local) Object.assign(local, product);
 
    } catch (err) {
        console.error(err);
        alert("Erro na comunicação com o servidor.");
        return;
    }
 
    // Envia novas imagens se selecionou alguma
    const cardInput = document.getElementById("update-card-upload");
    const galleryInput = document.getElementById("update-gallery-upload");
    const cardFile = cardInput?.files[0];
    const galleryFiles = galleryInput?.files;
    const temArquivos = cardFile || (galleryFiles && galleryFiles.length > 0);
 
    if (temArquivos) {
        const formData = new FormData();
        formData.append("sku", sku);
        formData.append("id_product", id);
 
        if (cardFile) formData.append("card", cardFile);
        Array.from(galleryFiles ?? []).forEach(f => formData.append("gallery[]", f));
 
        try {
            const upRes = await fetch(`./api/products/upload.php`, {
                method: "POST",
                body: formData,
            });
            const upResult = await upRes.json();
 
            if (!upResult.success) {
                alert("Dados salvos, mas houve erros no upload:\n" + upResult.errors.join("\n"));
            }
        } catch (err) {
            console.error(err);
            alert("Dados salvos, mas o upload de imagens falhou.");
        }
    }
 
    alert("Produto atualizado com sucesso!");
    window.location.hash = "#admin-produtos";
}
 
export function adicionarMontagemAoCarrinho() {
    const produtosSelecionados = BUILD_DROPDOWNS
        .map(dropdownId => {
            const el = document.getElementById(dropdownId);
            return el?.value ? Number(el.value) : null;
        })
        .filter(Boolean); // remove os não selecionados
 
    if (!produtosSelecionados.length) {
        alert('Selecione ao menos um componente.');
        return false;
    }
 
    produtosSelecionados.forEach(id => {
        const produto = state.productsData.find(p => Number(p.id_product) === Number(id)); //fix: passa isso aqui pra Number 
        if (produto) adicionarAoCarrinho(produto);
    });
 
    return true;
}

export function atualizarTotalMontagem() {
    const total = BUILD_DROPDOWNS.reduce((sum, dropdownId) => {
        const el = document.getElementById(dropdownId);
        if (!el?.value) return sum;
        const produto = state.productsData.find(p => p.id_product == el.value);
        return sum + (produto ? Number(produto.price) : 0);
    }, 0);
 
    const el = document.getElementById('build-total');
    if (el) el.textContent = formatPrice(total);
}
