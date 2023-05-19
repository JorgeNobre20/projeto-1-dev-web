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

    //------------------

    //Função para deletar um veiculo pasando o id dele, caso tenha feito com sucesso, retornar truem se não retorna false;
	async deletarVeiculo(id) {
		let db = await database.connect();
		let veiculosCollection = await db.collection("veiculo").deleteOne({_id:id});
		return true;
	}

    //------------------
	

    //------------------

    //Função para fazer update no veiculo, pasando o veiculo como parametro 
	async updateVeiculo(veiculo){
		let db = await database.connect(); // Conecta-se com o banco
		
		if(veiculo.foto != undefined){
			let updateVeiculo = await db.collection("veiculo").updateOne(
				{_id:veiculo._id},//CRITÉRIO DE UPDATE
				{$set:{nome:veiculo.nome, marca:veiculo.marca, cor:veiculo.cor, diaria:veiculo.diaria, foto:veiculo.foto}}); 
			
		}else{
			
			let updateVeiculo = await db.collection("veiculo").updateOne(
				{_id:veiculo._id},//CRITÉRIO DE UPDATE
				{$set:{nome:veiculo.nome, marca:veiculo.marca, cor:veiculo.cor, diaria:veiculo.diaria}}); 
		}
		
		return true; 
	}

    //------------------

    //recebe como parametro os dados do veiculo
	async inserirVeiculo(dados) {
		
		console.log(dados)
		
		let db = await database.connect(); // Conecta-se com o banco
		let insertUser = await db.collection("veiculos").insertOne(dados); // Insere um dado em uma colecao
		return true; //retorna verdade caso tudo tenha funcionado certo
	}



	/* async setAluguel(dados) { 
		let db = await database.connect(); // Conecta-se com o banco
		let insertUser = await db.collection("locacao").insertOne(dados) // Insere um dado em uma colecao
		return true; //retorna verdade caso tudo tenha funcionado certo
	}

	//pega os alugueis
	async getAlugueis() {
		let db = await database.connect();
		let locacaoCollection = await db
			.collection("locacao")
			.find()
			.toArray();
		return locacaoCollection;
	} */
}

export const VeiculosFuncoes = new VeiculosClasse();
