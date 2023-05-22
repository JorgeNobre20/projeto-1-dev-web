import { database } from "../Conexao-Banco.js";

class UsuariosClass {
    async cadastrarUsuario(usuario) {
        try {
            const db = await database.connect();
            await db.collection("usuarios").insertOne(usuario);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async buscarUsuarios() {
        try {
            const db = await database.connect();
            const usuariosBuscados = await db.collection("usuarios").find().toArray();
            return usuariosBuscados;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export const UsuariosFuncoes = new UsuariosClass();
