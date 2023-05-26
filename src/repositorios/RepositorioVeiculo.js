import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js";
import { ServicoGeradorId } from "../servicos/index.js";

class RepositorioVeiculo{
  async pegarVeiculos() {
		let veiculos = await bancoDeDados.obterReferenciaColecao("veiculos").find().toArray();
		return veiculos;
	}

	async buscarTodosUnindoAlugueis(textoBuscado = ""){
		const veiculos = await bancoDeDados.obterReferenciaColecao("veiculos").aggregate([
			{
			 "$lookup":  {
					"from": "alugueis",
					"localField": "id",
					"foreignField": "idCarro",
					"as": "alugueis"
				}
			},
			{
				$match: { 
					$or: [
						{ nome : { "$regex" : textoBuscado, "$options" : "i" } },
						{ marca: { "$regex" : textoBuscado, "$options" : "i" } }
					]		
				}
			}
		]).toArray();

		return veiculos;
	}

	async buscarPorId(id){
		const veiculo = await bancoDeDados.obterReferenciaColecao("veiculos").findOne({ id });
		return veiculo;
	}

	async deletarVeiculo(id) {
		let veiculo = await bancoDeDados.obterReferenciaColecao("veiculos").findOne({ id });

		if(veiculo.status == 0){
			return false;
		}else{
			await bancoDeDados.obterReferenciaColecao("veiculos").deleteOne({ id });
			return true;
		}		
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

	async updateStatusVeiculo(id, status, dataInicial, dataFim){	
		await bancoDeDados.obterReferenciaColecao("veiculos").updateOne(
			{ id: id },
			{ $set: {
				status: status,
				AluguelDataInicial : dataInicial,
				AluguelDataFim : dataFim
			}
		}); 
		
		return true;
	}
}

export const repositorioVeiculo = new RepositorioVeiculo();