import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js";
import { StatusAluguel } from "../enums/index.js";
import { ServicoGeradorId } from "../servicos/index.js";

class RepositorioAluguel{
	async buscarAlgumCujoIntervaloContemIntervaloECarro(dataInicial, dataFinal, idCarro){
		const colecaoAlugueis = bancoDeDados.obterReferenciaColecao("alugueis");
		
		const aluguelQueContemOIntervalo = await colecaoAlugueis.findOne({
			$and: [
				{
					$or: [
						{ 
							$and: [
								{ dataInicial: { $lte: dataInicial }  },
								{ dataFinal: { $gte: dataInicial }  }
							] 
						},
						{ 
							$and: [
								{ dataInicial: { $lte: dataFinal }  },
								{ dataFinal: { $gte: dataFinal }  }
							] 
						},
					]
				},
				{ idCarro },
				{ status: { $ne: StatusAluguel.REJEITADO }  }
			]
		});

		return aluguelQueContemOIntervalo;
	}

	async salvar(dadosEntrada){
		const {
			idCarro,
			idCliente,
			formaPagamento,
			dataInicial,
			dataFinal
		} = dadosEntrada;

		const colecaoAlugueis = bancoDeDados.obterReferenciaColecao("alugueis");
		
		await colecaoAlugueis.insertOne({
			id: ServicoGeradorId.gerarId(),
			idCarro,
			idCliente,
			formaPagamento,
			dataInicial,
			dataFinal,
			status: StatusAluguel.PENDENTE
		});
	}

	async buscarTodosUnindoClienteECarro(){
		const colecaoAlugueis = bancoDeDados.obterReferenciaColecao("alugueis");

		const alugueis = await colecaoAlugueis.aggregate([
			{
				"$lookup": {
					"from": "usuarios",
					"localField": "idCliente",
					"foreignField": "id",
					"as": "cliente"
				}
			},
			{
				"$lookup": {
					"from": "veiculos",
					"localField": "idCarro",
					"foreignField": "id",
					"as": "carro"
				}
			}
		]).toArray();

		return alugueis;
	}

	async buscarTodosPorClienteUnindoClienteECarro(idCliente){
		const colecaoAlugueis = bancoDeDados.obterReferenciaColecao("alugueis");

		const alugueis = await colecaoAlugueis.aggregate([
			{
				"$lookup": {
					"from": "usuarios",
					"localField": "idCliente",
					"foreignField": "id",
					"as": "cliente"
				}
			},
			{
				"$lookup": {
					"from": "veiculos",
					"localField": "idCarro",
					"foreignField": "id",
					"as": "carro"
				}
			},
			{ 
				"$match": { 
					idCliente 
				} 
			}
		]).toArray();

		return alugueis;
	}

	async atualizarStatusAluguel(idAluguel, status){
		const colecaoAlugueis = bancoDeDados.obterReferenciaColecao("alugueis");

		await colecaoAlugueis.updateOne(
			{ id: idAluguel },
			{ 
				$set: {
					status
				} 
			}
		);
	}

	async buscarPorId(id){
		const aluguel = await bancoDeDados.obterReferenciaColecao("alugueis").findOne({ id });
		return aluguel;
	}

	async buscarUltimosAlugueis(idCarro){
		const ultimosAlugueis = await bancoDeDados.obterReferenciaColecao("alugueis")
			.find({ idCarro, status: { $ne: StatusAluguel.REJEITADO } })
			.sort({ _id: -1 })
			.limit(3)
			.toArray();
			
		return ultimosAlugueis;
	}

	async buscarTodosPorCarro(idCarro){
		const alugueisCarro = await bancoDeDados.obterReferenciaColecao("alugueis").find({ 
			idCarro
		}).toArray();

		return alugueisCarro;
	}
}

export const repositorioAluguel = new RepositorioAluguel();