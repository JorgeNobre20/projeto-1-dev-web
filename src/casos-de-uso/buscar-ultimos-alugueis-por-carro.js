import { repositorioAluguel } from "../repositorios/index.js";
import { FormatoData } from "../servicos/ServicoData.js";
import { ServicoData } from "../servicos/index.js";

export async function buscarUltimosAlugueisPorCarro(idCarro){
  const ultimosAlugueisCarro = await repositorioAluguel.buscarUltimosAlugueis(idCarro);

  const ultimosAlugueisCarroFormatados = ultimosAlugueisCarro.map((aluguel) => {
    const instanciaDataInicial = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataInicial);
    const instanciaDataFinal = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataFinal);

    const dataInicialFormatada = ServicoData.formatarData(instanciaDataInicial, FormatoData.NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO);
    const dataFinalFormatada = ServicoData.formatarData(instanciaDataFinal, FormatoData.NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO);

    return {
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada
    }
  });

  return ultimosAlugueisCarroFormatados;
}