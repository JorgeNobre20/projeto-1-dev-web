const modalNomeClienteElement = document.getElementById("modalNomeCliente");
const modalDataNascimentoClienteElement = document.getElementById("modalDataNascimentoCliente");
const modalGeneroClienteElement = document.getElementById("modalGeneroCliente");
const modalTelefoneClienteElement = document.getElementById("modalTelefoneCliente");
const modalEmailClienteElement = document.getElementById("modalEmailCliente");

function preencherModalDetalhesCliente(aluguel){
  const dataNascimentoFormatada = dateFns.format(aluguel.cliente.dataNascimento, "DD/MM/YYYY");

  modalNomeClienteElement.setAttribute("value", aluguel.cliente.nome);
  modalDataNascimentoClienteElement.setAttribute("value", dataNascimentoFormatada);
  modalGeneroClienteElement.setAttribute("value", aluguel.cliente.genero);
  modalTelefoneClienteElement.setAttribute("value", aluguel.cliente.telefone);
  modalEmailClienteElement.setAttribute("value", aluguel.cliente.email);
}