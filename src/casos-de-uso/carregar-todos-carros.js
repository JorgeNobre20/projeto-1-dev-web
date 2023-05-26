import { StatusCarro } from "../enums/index.js";
import { repositorioVeiculo } from "../repositorios/RepositorioVeiculo.js";
import { FormatoData } from "../servicos/ServicoData.js";
import { ServicoData } from "../servicos/index.js";

export async function carregarTodosCarros(){
  const carrosComAlugueis = await repositorioVeiculo.buscarTodosUnindoAlugueis();

  const carrosComStatus = carrosComAlugueis.map((carroComAlugueis) => {
    const alugueis = carroComAlugueis.alugueis;
    const { carroDisponivelHoje, dataFinalUltimoAluguel } = obterStatusDisponivelHojeComDataUltimoAluguel(alugueis);

    const statusCarro = carroDisponivelHoje ? StatusCarro.DISPONIVEL : StatusCarro.INDISPONIVEL;
    let proximaDataDisponivel = null;  

    if(statusCarro === StatusCarro.INDISPONIVEL){
      proximaDataDisponivel = ServicoData.formatarData(dataFinalUltimoAluguel, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO); 
    }

    delete carroComAlugueis.alugueis;

    return {
      ...carroComAlugueis,
      status: statusCarro,
      proximaDataDisponivel
    }
  });

  return carrosComStatus;
}

function obterStatusDisponivelHojeComDataUltimoAluguel(alugueis){
  const dataAtual = new Date();

  let dataFinalUltimoAluguel = null;
  let carroDisponivelHoje = true;

  alugueis.forEach((aluguel) => {
    const instanciaDataInicial = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataInicial);
    const instanciaDataFinal = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataFinal);

    if(ServicoData.dataEstaEntreDatas(dataAtual, instanciaDataInicial, instanciaDataFinal)){
      carroDisponivelHoje = false;
    }

    if(!dataFinalUltimoAluguel){
      dataFinalUltimoAluguel = instanciaDataFinal;

    }else if(ServicoData.dataEPosterior(instanciaDataFinal, dataFinalUltimoAluguel)){
      dataFinalUltimoAluguel = instanciaDataFinal;
    }   
  });

  return { dataFinalUltimoAluguel, carroDisponivelHoje };
}