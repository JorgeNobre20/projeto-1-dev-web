import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js"

class RepositorioAdmin{
	async buscarPorEmail(email){
		const colecaoAdmins = bancoDeDados.obterReferenciaColecao('admins');
		const admin = await colecaoAdmins.findOne({ email: email });

		return admin;
	}
}

export const repositorioAdmin = new RepositorioAdmin();