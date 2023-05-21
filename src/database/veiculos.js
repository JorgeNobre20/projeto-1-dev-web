import { database } from "../Conexao-Banco.js";

class VeiculosClasse{
    //Função para pegar todos os veiculos no banco de dados.
	async pegarVeiculos() {
		let db = await database.connect();
		let veiculosCollection = await db
			.collection("veiculos")
			.find()
			.toArray();
		return veiculosCollection;
	}

    //Função para deletar um veiculo pasando o id dele, caso tenha feito com sucesso, retornar truem se não retorna false;
	async deletarVeiculo(id) {
		let db = await database.connect();
		let veiculosCollection = await db.collection("veiculos").deleteOne({_id:id});
		return true;
	}

	//recebe como parametro os dados do veiculo
	async inserirVeiculo(dados) {
		let db = await database.connect(); // Conecta-se com o banco
		let insertUser = await db.collection("veiculos").insertOne(dados); // Insere um dado em uma colecao
		return true; //retorna verdade caso tudo tenha funcionado certo
	}
	
    //Função para fazer update no veiculo, pasando o veiculo como parametro 
	async updateVeiculo(veiculo){
		let db = await database.connect(); // Conecta-se com o banco
		let updateVeiculo = await db.collection("veiculos").updateOne(
			{_id:veiculo._id},//CRITÉRIO DE UPDATE
			{$set:{nome:veiculo.nome, marca:veiculo.marca, cor:veiculo.cor, diaria:veiculo.diaria, foto:veiculo.foto}}); 
		return true; 
	}
}

export const VeiculosFuncoes = new VeiculosClasse();
