import { FormatoData } from "../servicos/ServicoData.js";
import { ServicoData } from "../servicos/index.js";

const alugueis = [
  {
    idCarro: 1,
    dataInicial: "2023-05-23",
    dataFinal: "2023-06-25"
  },
  {
    idCarro: 1,
    dataInicial: "2023-04-23",
    dataFinal: "2023-04-25"
  },
  {
    idCarro: 1,
    dataInicial: "2022-01-01",
    dataFinal: "2022-02-10"
  },
  {
    idCarro: 2,
    dataInicial: "2023-07-01",
    dataFinal: "2023-07-10"
  },
  {
    idCarro: 2,
    dataInicial: "2023-08-01",
    dataFinal: "2023-08-05"
  }
]

export function buscarUltimosAlugueisPorCarro(idCarro){
  const ultimosAlugueisCarro = alugueis.filter((aluguel) => String(aluguel.idCarro) === String(idCarro)) || [];

  const ultimosAlugueisCarroFormatados = ultimosAlugueisCarro.map((aluguel) => {
    const instanciaDataInicial = new Date(aluguel.dataInicial);
    const instanciaDataFinal = new Date(aluguel.dataFinal);

    const dataInicialFormatada = ServicoData.formatarData(instanciaDataInicial, FormatoData.NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO);
    const dataFinalFormatada = ServicoData.formatarData(instanciaDataFinal, FormatoData.NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO);

    return {
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada
    }
  });

  return ultimosAlugueisCarroFormatados;
}