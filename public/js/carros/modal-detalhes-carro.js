const modalImagemCarroElement = document.getElementById("modalImagemCarro");
const modalModeloCarroElement = document.getElementById("modalModeloCarro");
const modalMarcaCarroElement = document.getElementById("modalMarcaCarro");
const modalCorCarroElement = document.getElementById("modalCorCarro");
const modalPrecoDiariaCarroElement = document.getElementById("modalPrecoDiariaCarro");

function preencherModalDetalhesCarro(aluguel){
  modalImagemCarroElement.setAttribute("src", aluguel.carro.urlImagem);
  modalModeloCarroElement.setAttribute("value", aluguel.carro.modelo);
  modalMarcaCarroElement.setAttribute("value", aluguel.carro.marca);
  modalCorCarroElement.setAttribute("value", aluguel.carro.cor);
  modalPrecoDiariaCarroElement.setAttribute("value", aluguel.carro.precoDiaria);
}