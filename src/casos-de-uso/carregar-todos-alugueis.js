import { repositorioAluguel } from "../repositorios/RepositorioAluguel.js";
import { ServicoAluguel } from "../servicos/index.js";

export async function carregarTodosAlugueis(){
  const alugueis = await repositorioAluguel.buscarTodosUnindoClienteECarro();
  const alugueisFormatados = ServicoAluguel.formatarAlugueisParaVisualizacao(alugueis);  
  return alugueisFormatados;
}