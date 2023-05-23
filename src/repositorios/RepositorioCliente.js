import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js"

class RepositorioCliente {
  async cadastrarUsuario(usuario) {
    try {
      await bancoDeDados.obterReferenciaColecao("usuarios").insertOne(usuario);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async buscarUsuarios() {
    try {
      const usuariosBuscados = await bancoDeDados.obterReferenciaColecao("usuarios").find().toArray();
      return usuariosBuscados;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export const repositorioCliente = new RepositorioCliente();