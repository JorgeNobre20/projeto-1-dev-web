const carro1 = {
  id: 1,
  modelo: "Mitsubishi Lancer Evolution",
  marca: "Mitsubishi",
  cor: "Vermelho",
  precoDiaria: 150,
  urlImagem: "https://cdn.motor1.com/images/mgl/2gJ94/s1/mitsubishi-lancer-evo-rendering.jpg"
}

const carro2 = {
  id: 2,
  modelo: "Honda Civic",
  marca: "Honda",
  cor: "Preto",
  precoDiaria: 200,
  urlImagem: "https://quatrorodas.abril.com.br/wp-content/uploads/2022/04/honda-civic-seda-e1650568274124.jpg?quality=70&strip=info&w=1280&h=720&crop=1"
}

const carro3 = {
  id: 3,
  modelo: "Toytota Corolla",
  marca: "Toytota",
  cor: "Branco",
  precoDiaria: 100,
  urlImagem: "https://www.luxurymotorsport.com.br/wp-content/uploads/2022/05/COROLLA-2022-XEI-BRANCO-P%C3%89ROLA-01.jpg"
}

const carros = [carro1, carro2, carro3];

export function buscarCarroPorId(idCarro){
  const carroSelecionado = carros.find((carro) => String(carro.id) === String(idCarro));
  return carroSelecionado;
}