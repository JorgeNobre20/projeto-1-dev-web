import { MongoClient } from "mongodb";

const url = "mongodb://root:rootpwd@localhost:27017";

const client = new MongoClient(url);
const dbName = "projeto-web";

class BancoDeDados {
	db = null;

	async conectar() {
		try {
			await client.connect();
			this.db = client.db(dbName);
			console.log("Mongodb Conectado");
		} catch (e) {
			throw e;
		}
	}

	obterReferenciaColecao(nomeColecao){
		const colecao = this.db.collection(nomeColecao);
		return colecao;
	}
}

export const bancoDeDados = new BancoDeDados();