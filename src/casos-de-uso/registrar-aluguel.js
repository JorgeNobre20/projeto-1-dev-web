import { repositorioAluguel, repositorioCliente } from "../repositorios/index.js";
import { buscarCarroPorId } from "./buscar-carro-por-id.js";

export async function registrarAluguel(dadosEntrada){
  const {
    idCarro, 
    idCliente,
    formaPagamento,
    dataInicial,
    dataFinal,
  } = dadosEntrada;

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