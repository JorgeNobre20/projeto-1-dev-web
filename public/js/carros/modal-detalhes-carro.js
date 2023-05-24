const modalImagemCarroElement = document.getElementById("modalImagemCarro");
const modalModeloCarroElement = document.getElementById("modalModeloCarro");
const modalMarcaCarroElement = document.getElementById("modalMarcaCarro");
const modalCorCarroElement = document.getElementById("modalCorCarro");
const modalPrecoDiariaCarroElement = document.getElementById("modalPrecoDiariaCarro");

function preencherModalDetalhesCarro(aluguel){
  modalImagemCarroElement.setAttribute("src", aluguel.carro.foto);
  modalModeloCarroElement.setAttribute("value", aluguel.carro.nome);
  modalMarcaCarroElement.setAttribute("value", aluguel.carro.marca);
  modalCorCarroElement.setAttribute("value", aluguel.carro.cor);
  modalPrecoDiariaCarroElement.setAttribute("value", aluguel.carro.diaria);
}