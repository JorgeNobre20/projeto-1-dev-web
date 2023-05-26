import { repositorioAluguel, repositorioCliente } from "../repositorios/index.js";
import { ServicoData } from "../servicos/index.js";
import { FormatoData } from "../servicos/ServicoData.js";
import { StatusAluguel } from "../enums/index.js";
import { buscarCarroPorId } from "./buscar-carro-por-id.js";

export async function registrarAluguel(dadosEntrada){
  const {
    idCarro, 
    idCliente,
    formaPagamento,
    dataInicial,
    dataFinal,
  } = dadosEntrada;

  
  const aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado = await repositorioAluguel.buscarAlgumCujoIntervaloContemIntervaloECarro(
    dataInicial,
    dataFinal,
    idCarro
  );

  if (aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado && aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado.status !== StatusAluguel.REJEITADO) {
    const dataInicialSelecionada = ServicoData.instanciarDataComFusoHorarioBrasileiro(dataInicial);
    const dataFinalSelecionada = ServicoData.instanciarDataComFusoHorarioBrasileiro(dataFinal);

    const dataInicialSelecionadaFormatada = ServicoData.formatarData(dataInicialSelecionada, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO); 
    const dataFinalSelecionadaFormatada = ServicoData.formatarData(dataFinalSelecionada, FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO); 
    
    const mensagemErro = `Já existe um aluguel registrado que contém o intervalo de ${dataInicialSelecionadaFormatada} a ${dataFinalSelecionadaFormatada}`;
    throw new Error(mensagemErro);
  }

  const carroSelecionado = await buscarCarroPorId(idCarro);
  const cliente = await repositorioCliente.buscarPorId(idCliente);
  
  if(!carroSelecionado){
    throw new Error("Carro não encontrado");
  }

  if(!cliente){
    throw new Error("Cliente não encontrado");
  }

  await repositorioAluguel.salvar({
    idCarro,
    idCliente,
    formaPagamento,
    dataInicial,
    dataFinal
  });
}