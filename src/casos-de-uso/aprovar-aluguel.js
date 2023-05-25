import { StatusAluguel } from "../enums/index.js";
import { repositorioAluguel } from "../repositorios/RepositorioAluguel.js";
import { repositorioVeiculo } from "../repositorios/RepositorioVeiculo.js";

export async function aprovarAluguel(idAluguel){
  const aluguel = await repositorioAluguel.buscarPorId(idAluguel);

  let arr = [...aluguel.dataFinal];
  arr[9] = (parseInt(arr[9]) + 1).toString();
  let dataFinal = arr.join(""); 

  function transformarData(data) {
    var partes = data.split('-');
    var dia = partes[2];
    var mes = partes[1];
    var ano = partes[0];
    return dia + '-' + mes + '-' + ano;
  }

  await repositorioVeiculo.updateStatusVeiculo(aluguel.idCarro, 0, aluguel.dataInicial, transformarData(dataFinal));

  if(!aluguel){
    throw new Error("Aluguel não encontrado!");
  }
  
  await repositorioAluguel.atualizarStatusAluguel(idAluguel, StatusAluguel.APROVADO);
}