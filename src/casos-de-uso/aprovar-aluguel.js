import { StatusAluguel } from "../enums/index.js";
import { repositorioAluguel } from "../repositorios/RepositorioAluguel.js";

export async function aprovarAluguel(idAluguel){
  const aluguel = await repositorioAluguel.buscarPorId(idAluguel);
  
  if(!aluguel){
    throw new Error("Aluguel não encontrado!");
  }
  
  await repositorioAluguel.atualizarStatusAluguel(idAluguel, StatusAluguel.APROVADO);
}