import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js";
import { ServicoGeradorId } from "../servicos/index.js";

class RepositorioVeiculo{
  async pegarVeiculos() {
		let veiculos = await bancoDeDados.obterReferenciaColecao("veiculos").find().toArray();
		return veiculos;
	}

	async buscarPorId(id){
		const veiculo = await bancoDeDados.obterReferenciaColecao("veiculos").findOne({ id });
		return veiculo;
	}

	async deletarVeiculo(id) {
		await bancoDeDados.obterReferenciaColecao("veiculos").deleteOne({ id });
		return true;
	}

	async inserirVeiculo(dados) {
		await bancoDeDados.obterReferenciaColecao("veiculos").insertOne({ 
			...dados,
			id: ServicoGeradorId.gerarId(),
			diaria: Number(dados.diaria)
		}); 
		return true; 
	}
	
	async updateVeiculo(veiculo){
		await bancoDeDados.obterReferenciaColecao("veiculos").updateOne(
			{ id: veiculo.id },
			{ $set: {
				nome: veiculo.nome, 
				marca: veiculo.marca, 
				cor: veiculo.cor, 
				diaria: veiculo.diaria, 
				foto: veiculo.foto
			}
		}); 
		
		return true; 
	}
}

export const repositorioVeiculo = new RepositorioVeiculo();