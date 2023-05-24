import { repositorioVeiculo } from "../repositorios/RepositorioVeiculo.js";

export async function buscarCarroPorId(idCarro){
  const carroSelecionado = await repositorioVeiculo.buscarPorId(idCarro);
  
  if(!carroSelecionado){
    return null;
  }
  
  carroSelecionado.modelo = carroSelecionado.nome;
  carroSelecionado.urlImagem = carroSelecionado.foto;
  carroSelecionado.precoDiaria = Number(carroSelecionado.diaria);

  return carroSelecionado;
}