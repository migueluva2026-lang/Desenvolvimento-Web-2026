import { state } from './state.js';
import { formatPrice } from './cart.js';

const imagesUpload = document.getElementById('create-images-upload');

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

    <button onclick="window.editarProduto(${product.id_product})">
        Editar
    </button>

    <button onclick="window.excluirProduto(${product.id_product})">
        Excluir
    </button>

</td>
        `;

        lista.appendChild(row);
    }
);
}

export function renderAdminProdutoUpdate() {

    const produto = state.productsData.find(
        p => p.id_product == state.currentEditingProductId
    );
    if (!produto) return;

    document.getElementById("update-name").value = produto.name ?? "";
    document.getElementById("update-brand").value = produto.brand ?? "";
    document.getElementById("update-category").value = produto.category ?? "";
    document.getElementById("update-price").value = produto.price ?? "";
    document.getElementById("update-desc").value = produto.description ?? "";
    document.getElementById("update-stock").value = produto.stock_quantity ?? "";
}

export function generateImagePaths() 
{
    const folder = document.getElementById('create-sku').value.trim().toLowerCase();
    const files = imagesUpload.files;
    return {
        image_card: `assets/img/${folder}/image-card.webp`,

        images: Array.from(files, (_, i) => ({
            image_path: `assets/img/${folder}/image-${i + 1}.webp`,
            sort_order: i + 1
        }))
    };
}