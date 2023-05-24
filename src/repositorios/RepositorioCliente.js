import { ObjectId } from "mongodb";
import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js"
import { GeradorId } from "../servicos/index.js";

class RepositorioCliente {
  async cadastrarUsuario(usuario) {
    try {
      await bancoDeDados.obterReferenciaColecao("usuarios").insertOne({
        ...usuario,
        id: GeradorId.gerarId()
      });
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

  async buscarPorId(id) {
    const usuario = await bancoDeDados.obterReferenciaColecao("usuarios").findOne({ id });
    return usuario; 
  }
}

export const repositorioCliente = new RepositorioCliente();