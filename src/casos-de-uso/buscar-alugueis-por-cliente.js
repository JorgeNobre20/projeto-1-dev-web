import { repositorioAluguel } from "../repositorios/RepositorioAluguel.js";
import { ServicoAluguel } from "../servicos/index.js";

export async function buscarAlugueisPorCliente(idCliente){
  const alugueis = await repositorioAluguel.buscarTodosPorClienteUnindoClienteECarro(idCliente);
  const alugueisFormatados = ServicoAluguel.formatarAlugueisParaVisualizacao(alugueis);
  return alugueisFormatados;
}