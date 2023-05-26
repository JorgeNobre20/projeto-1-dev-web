import { StatusAluguel, StatusCarro } from "../enums/index.js";
import { repositorioVeiculo } from "../repositorios/RepositorioVeiculo.js";
import { FormatoData } from "../servicos/ServicoData.js";
import { ServicoData } from "../servicos/index.js";

export async function carregarTodosCarros(textoBuscado = ""){
  const carrosComAlugueis = await repositorioVeiculo.buscarTodosUnindoAlugueis(textoBuscado);

  const carrosComStatus = carrosComAlugueis.map((carroComAlugueis) => {
    const alugueis = carroComAlugueis.alugueis;
    const { carroDisponivelHoje, dataFinalUltimoAluguel } = obterStatusDisponivelHojeComDataUltimoAluguel(alugueis);

    const statusCarro = carroDisponivelHoje ? StatusCarro.DISPONIVEL : StatusCarro.INDISPONIVEL;
    let proximaDataDisponivel = null;  

    if(statusCarro === StatusCarro.INDISPONIVEL){
      proximaDataDisponivel = ServicoData.adicionarDias(dataFinalUltimoAluguel, 1);
      proximaDataDisponivel = ServicoData.formatarData(proximaDataDisponivel, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO);
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
  const dataAtualSemFusoHorario = obterDataAtualSemFusoHorario();

  let dataFinalUltimoAluguel = null;
  let carroDisponivelHoje = true;

  alugueis.forEach((aluguel) => {
    if(aluguel.status === StatusAluguel.REJEITADO){
      return;
    }

    const instanciaDataInicial = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataInicial);
    const instanciaDataFinal = ServicoData.instanciarDataComFusoHorarioBrasileiro(aluguel.dataFinal);

    if(ServicoData.dataEstaEntreDatas(dataAtualSemFusoHorario, instanciaDataInicial, instanciaDataFinal)){
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

function obterDataAtualSemFusoHorario(){
  const dataAtual = new Date();
  const dataAtualSemHorario = ServicoData.formatarData(dataAtual, FormatoData.ANO_HIFEN_NUM_MES_HIFEN_NUM_DIA);
  const dataAtualSemFusoHorario = ServicoData.instanciarDataComFusoHorarioBrasileiro(dataAtualSemHorario);

  return dataAtualSemFusoHorario;
}