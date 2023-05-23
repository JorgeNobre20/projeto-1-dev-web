import { ObjectId } from "mongodb";
import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js";

class RepositorioVeiculo{
  async pegarVeiculos() {
		let veiculos = await bancoDeDados.obterReferenciaColecao("veiculos").find().toArray();
		return veiculos;
	}

	async deletarVeiculo(id) {
		await bancoDeDados.obterReferenciaColecao("veiculos").deleteOne({ _id: new ObjectId(id) });
		return true;
	}

	async inserirVeiculo(dados) {
		await bancoDeDados.obterReferenciaColecao("veiculos").insertOne(dados); 
		return true; 
	}
	
	async updateVeiculo(veiculo){
		await bancoDeDados.obterReferenciaColecao("veiculos").updateOne(
			{ "_id": new ObjectId(veiculo._id) },
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