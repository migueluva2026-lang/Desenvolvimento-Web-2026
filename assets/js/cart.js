import { state } from './state.js';

export function formatPrice(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function adicionarAoCarrinho(product, qty = 1) {
    const existing = state.carrinho.find(i => i.id_product === product.id_product);
    if (existing) {
        existing.quantity += qty;
    } else {
        state.carrinho.push({ ...product, quantity: qty });
    }
    renderCarrinho();
}

export function removerDoCarrinho(id) {
    state.carrinho = state.carrinho.filter(i => i.id_product !== id);
    renderCarrinho();
}

export function totalCarrinho() {
    return state.carrinho.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
}

export function renderCarrinho() {
    const lista = document.getElementById("cart-items-list");
    if (!lista) return;
    lista.innerHTML = "";

    if (!state.carrinho.length) {
        lista.innerHTML = '<p class="cart-empty-msg">Carrinho vazio</p>';
        return;
    }

    state.carrinho.forEach(item => {
        const el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${item.name.substring(0, 22)}… ×${item.quantity}
            </span>
            <span style="margin-left:6px;white-space:nowrap;">
                ${formatPrice(Number(item.price) * item.quantity)}
            </span>
            <button class="cart-item-rm"
                    onclick="window.removerDoCarrinho(${item.id_product})">✕</button>
        `;
        lista.appendChild(el);
    });
}