import { state } from './state.js';
import { formatPrice } from './cart.js';

export function renderAdminProdutos() {
    const lista = document.getElementById("admin-produtos-lista");
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

    document.getElementById("edit-nome").value = produto.name ?? "";
    document.getElementById("edit-preco").value = produto.price ?? "";
    document.getElementById("edit-preco-orig").value = produto.original_price ?? "";
    document.getElementById("edit-estoque").value = produto.stock_quantity ?? "";
    document.getElementById("edit-descricao").value = produto.description ?? "";
}