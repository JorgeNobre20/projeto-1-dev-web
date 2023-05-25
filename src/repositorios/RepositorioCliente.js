import { bancoDeDados } from "../banco-de-dados/banco-de-dados.js"
import { ServicoGeradorId } from "../servicos/index.js";

class RepositorioCliente {
  async cadastrarUsuario(usuario) {
    try {
      await bancoDeDados.obterReferenciaColecao("usuarios").insertOne({
        ...usuario,
        id: ServicoGeradorId.gerarId()
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

  async atualizarDadosUsuario(usuario){
    await bancoDeDados.obterReferenciaColecao("usuarios").updateOne(
    { id: usuario.id },
    { $set: {
        nome: usuario.nome, 
        dataNascimento: usuario.dataNascimento, 
        genero: usuario.genero, 
        telefone: usuario.telefone, 
        email: usuario.email
      }
    });

    return true; 
  }

  async atualizarSenhaUsuario(usuario){
    await bancoDeDados.obterReferenciaColecao("usuarios").updateOne(
    { id: usuario.id },
    { $set: {
        senha: usuario.senhaNova
      }
    }); 

    return true;
  }
}

export const repositorioCliente = new RepositorioCliente();