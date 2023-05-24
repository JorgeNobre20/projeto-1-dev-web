import { formasPagamento } from "../enums/index.js";
import { repositorioAluguel } from "../repositorios/RepositorioAluguel.js";
import { ServicoData } from "../servicos/index.js";
import { FormatoData } from "../servicos/ServicoData.js";

export async function carregarTodosAlugueis(){
  const alugueis = await repositorioAluguel.buscarTodosUnindoClienteECarro();
  
  const alugueisFormatados = alugueis.map((aluguel) => {
    const instanciaDataInicial = new Date(aluguel.dataInicial);
    const instanciaDataFinal = new Date(aluguel.dataFinal);
    
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