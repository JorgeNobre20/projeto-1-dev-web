import { ServicoData, FormatoData } from "./ServicoData.js";
import { formasPagamento } from "../enums/index.js";

export class ServicoAluguel{
  static formatarAlugueisParaVisualizacao(alugueis){
    const alugueisFormatados = alugueis.map((aluguel) => {
      const instanciaDataInicial = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataInicial);
      const instanciaDataFinal = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataFinal);
      
      const numeroDiasAluguel = ServicoData.obterNumeroDiasEntreDatas(instanciaDataInicial, instanciaDataFinal);
  
      aluguel.carro = aluguel.carro[0];
      aluguel.cliente = aluguel.cliente[0];
  
      const formaPagamento = formasPagamento.find((formaPagamento) => formaPagamento.valor === aluguel.formaPagamento);
      aluguel.formaPagamento = formaPagamento.descricao;
  
      return {
        ...aluguel,
        dataInicial: ServicoData.formatarData(instanciaDataInicial, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO),
        dataFinal: ServicoData.formatarData(instanciaDataFinal, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO),
        numeroDiasAluguel: numeroDiasAluguel + 1,
      }
    });
    
    return alugueisFormatados;
  }
}