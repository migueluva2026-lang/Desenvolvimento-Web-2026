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

export function renderAdminProdutos() {
    const lista = document.getElementById("admin-produtos-list");
    if (!lista) return;
    lista.innerHTML = "";
    state.productsData.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img
                    src="${product.image_card}"
                    alt="${product.name}"
                    width="60"
                >
            </td>

            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock_quantity}</td>

            <td>

    <button onclick="window.editarProduto(${product.id_product})"> Editar </button>

    <button onclick="window.excluirProduto(${product.id_product})"> Excluir </button>

</td>
        `;

        lista.appendChild(row);
    }
);
}

export function renderAdminProdutoUpdate() {

    const produto = state.productsData.find(p => p.id_product == state.currentEditingProductId);
    if (!produto) return;

    document.getElementById("update-name").value = produto.name ?? "";
    document.getElementById("update-brand").value = produto.brand ?? "";
    document.getElementById("update-category").value = produto.category ?? "";
    document.getElementById("update-price").value = produto.price ?? "";
    document.getElementById("update-desc").value = produto.description ?? "";
    document.getElementById("update-stock").value = produto.stock_quantity ?? "";
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
        const res = await fetch('/DesenWeb2026/api/products/create.php', {
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
            const upRes    = await fetch('/DesenWeb2026/api/products/upload.php', {
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
