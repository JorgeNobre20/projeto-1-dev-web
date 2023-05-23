import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js"

class RepositorioUsuario{
	async buscarPorEmail(email){
		const colecaoUsuarios = bancoDeDados.obterReferenciaColecao('usuarios');
		const admin = await colecaoUsuarios.findOne({ email: email });

		return admin;
	}
}

export const repositorioUsuario = new RepositorioUsuario();