import { ServicoData } from "../servicos/index.js";
import { FormatoData } from "../servicos/ServicoData.js";

const cliente1 = {
  nome: "Antonio Jorge"
}

const cliente2 = {
  nome: "Maria Ângela"
}

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

const aluguel1 = {
  id: "6467f8f7c9ac28fa4677a184",
  dataInicial: "2023-05-23",
  dataFinal: "2023-05-30",
  carro: carro1,
  cliente: cliente1,
  status: "PENDENTE"
};

const aluguel2 = {
  id: "1456f85673f123123213c123",
  dataInicial: "2023-04-01",
  dataFinal: "2023-05-30",
  carro: carro2,
  cliente: cliente1,
  status: "CONFIRMADO"
};

const aluguel3 = {
  id: "9832a85673l123123213c763",
  dataInicial: "2023-01-01",
  dataFinal: "2023-02-15",
  carro: carro3,
  cliente: cliente2,
  status: "REJEITADO"
};

const alugueis = [aluguel1, aluguel2, aluguel3];

export function carregarTodosAlugueis(){
  const alugueisFormatados = alugueis.map((aluguel) => {
    const instanciaDataInicial = new Date(aluguel.dataInicial);
    const instanciaDataFinal = new Date(aluguel.dataFinal);
    
    const numeroDiasAluguel = ServicoData.obterNumeroDiasEntreDatas(instanciaDataInicial, instanciaDataFinal);

    return {
      ...aluguel,
      dataInicial: ServicoData.formatarData(instanciaDataInicial, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO),
      dataFinal: ServicoData.formatarData(instanciaDataFinal, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO),
      numeroDiasAluguel
    }
  });

  return alugueisFormatados;
}