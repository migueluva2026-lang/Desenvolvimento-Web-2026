export function validarPedido(form) {
    const erros = [];

    const obterValor = (seletor) => form.querySelector(seletor)?.value.trim() ?? "";

    const dados = {
        nome: obterValor("#input-nome"),
        cpf: obterValor("#input-cpf"),
        email: obterValor("#input-email"),
        telefone: obterValor("#input-tel"),
        cep: obterValor("#input-cep").replace(/\D/g, ""),
        rua: obterValor("#input-rua"),
        bairro: obterValor("#input-bairro"),
        numero: obterValor("#input-numero"),
        cidade: obterValor("#input-cidade"),
        uf: obterValor("#input-uf").toUpperCase(),
    };

    if (!dados.nome) {
        erros.push("Nome é obrigatório.");
    }

    const cpfNumerico = dados.cpf.replace(/\D/g, "");

    if (!/^\d{11}$/.test(cpfNumerico)) {
        erros.push("CPF inválido.");
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(dados.email)) {
        erros.push("E-mail inválido.");
    }

    const telefoneNumerico = dados.telefone.replace(/\D/g, "");

    if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
        erros.push("Telefone inválido.");
    }

    // ENDEREÇO

    if (!/^\d{8}$/.test(dados.cep)) {
        erros.push("CEP inválido.");
    }

    if (!dados.rua) {
        erros.push("Rua é obrigatória.");
    }

    if (!dados.bairro) {
        erros.push("Bairro é obrigatório.");
    }

    if (!dados.numero) {
        erros.push("Número é obrigatório.");
    }

    if (!dados.cidade) {
        erros.push("Cidade é obrigatória.");
    }

    if (!/^[A-Z]{2}$/.test(dados.uf)) {
        erros.push("UF inválida.");
    }

    return erros;
}