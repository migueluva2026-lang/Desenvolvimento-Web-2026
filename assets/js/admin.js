import { state } from './state.js';
import { formatPrice } from './cart.js';

export function renderAdminProdutos() {
    const lista = document.getElementById("admin-produtos-list");
    if (!lista) return;
    lista.innerHTML = "";

    state.productsData.forEach(product => {
        const row = document.createElement("div");
        row.className = "admin-produto-row";
        row.innerHTML = `
            <span>${product.sku}</span>
            <span>${product.name.substring(0, 30)}…</span>
            <span>${formatPrice(product.price)}</span>
            <span>${product.stock_quantity} un.</span>
            <button onclick="window.editarProduto(${product.id_product})">Editar</button>
        `;
        lista.appendChild(row);
    });
}

export function renderAdminProdutoUpdate() {
    const produto = state.productsData.find(p => p.id_product === state.currentEditingProductId);
    if (!produto) return;

    document.getElementById("update-nome").value = produto.name ?? "";
    document.getElementById("update-preco").value = produto.price ?? "";
    document.getElementById("update-preco-orig").value = produto.original_price ?? "";
    document.getElementById("update-estoque").value = produto.stock_quantity ?? "";
    document.getElementById("update-descricao").value = produto.description ?? "";
}

export function initCreateProductForm() 
{
    const form = document.getElementById("admin-produto-create-form");
    if (!form) return;

    form.addEventListener("submit", async e => {

        e.preventDefault();

        const product = {
            sku: document.getElementById("create-sku").value,
            name: document.getElementById("create-name").value,
            brand: document.getElementById("create-brand").value,
            category: document.getElementById("create-category").value,
            price: Number(document.getElementById("create-price").value),
            original_price: Number(document.getElementById("create-original-price").value) || null,
            stock_quantity: Number(document.getElementById("create-stock").value),
            image_card: document.getElementById("create-image-card").value,
            featured: Number(document.getElementById("create-featured").value),
            active: Number(document.getElementById("create-active").value),
            description: document.getElementById("create-description").value
        };

        try {
            const response = await fetch("/api/products/create.php",
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
                alert("Produto criado com sucesso!");
                form.reset();
            } else {
                alert("Erro ao criar produto.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro na comunicação com o servidor.");
        }
    });
}