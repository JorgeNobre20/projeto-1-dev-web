import { MongoClient } from "mongodb";

const url = "mongodb://admin:password@localhost:27017";

const client = new MongoClient(url);
const dbName = "Projeto-1-web-banco-de-dados";

class Database {
	async connect() {
		try {
			await client.connect();
			const db = client.db(dbName);
			console.log("Mongodb Conectado");
			return db;
		} catch (e) {
			console.log(e);
		}
	}
}
export const database = new Database();