import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js";
import { StatusAluguel } from "../enums/index.js";
import { GeradorId } from "../servicos/index.js";

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
				{ idCarro }
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
			id: GeradorId.gerarId(),
			idCarro,
			idCliente,
			formaPagamento,
			dataInicial,
			dataFinal,
			status: StatusAluguel.PENDENTE
		});
	}

	async buscarTodosUnindoClienteECarros(){
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
}

export const repositorioAluguel = new RepositorioAluguel();