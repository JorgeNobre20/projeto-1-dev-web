import { Router } from "express";

import { repositorioCliente, repositorioAdmin } from "../repositorios/index.js";
import { carregarTodosCarros } from "../casos-de-uso/index.js";
import { middlewareAutenticacao } from "../middlewares/index.js";
import { TipoUsuario } from "../enums/index.js";
import { servicoEmail } from "../servicos/index.js";

const rotasPublicas = Router();

rotasPublicas.get("/", middlewareAutenticacao, async (request, response) => {
  let veiculos = await carregarTodosCarros();
  response.render("home", {veiculos, tipoUsuario: TipoUsuario.ANONIMO });
});

rotasPublicas.get("/erro", (request, response) => {
  let mensagemErro = request.query.mensagem;

  if(!mensagemErro){
    mensagemErro = "Algo deu errado, tente novamente";
  }

  response.render("erro", { mensagem: mensagemErro });
});

rotasPublicas.get("/signin", middlewareAutenticacao, (request, response) => {
  response.render("cliente/cliente-entrar", {erros: []});
});

rotasPublicas.post("/signin", middlewareAutenticacao, async (request, response)=>{
  const usuarioBuscado = {email: request.body.email, senha: request.body.senha};
  const usuariosBd = await repositorioCliente.buscarUsuarios(); 
  const usuarioEmail = usuariosBd.filter(usuario => usuario.email == usuarioBuscado.email);
  const usuarioSenha = usuariosBd.filter(usuario => usuario.senha == usuarioBuscado.senha);

  let erro = [];
  if(usuarioEmail.length > 0 && usuarioSenha.length > 0){
    request.session.usuario = usuarioEmail[0];
    response.redirect("/loja");

  }else{
    erro.push("Email ou senha incorretos");
    response.render("cliente/cliente-entrar", {erros: erro});
  }

}); 

rotasPublicas.get("/signup", middlewareAutenticacao, (request, response) => {
  response.render("cliente/cliente-cadastrar", {erros: []});
});

rotasPublicas.post("/signup", middlewareAutenticacao, async (request, response) => {
  let novoUsuario = {
    nome: request.body.nome,
    dataNascimento: request.body.dataNascimento,
    genero: request.body.genero,
    telefone: request.body.telefone,
    email: request.body.email,
    senha: request.body.senha
  };

  const usuariosBd = await repositorioCliente.buscarUsuarios(); 
  const usuarioExistente = usuariosBd.filter(usuario => usuario.email == novoUsuario.email);

  let erro = []; 
  const confirmarSenha = request.body.confirmarSenha;

  if(usuarioExistente.length > 0){
    erro.push("Email já cadastrado no sistema.");
  }
  if(confirmarSenha != novoUsuario.senha){
    erro.push("Confirmação de senha diferente de senha.");
  }

  if(erro.length > 0){
    response.render("cliente/cliente-cadastrar", {erros: erro});
  }
  else{
    await repositorioCliente.cadastrarUsuario(novoUsuario);
    // await servicoEmail.enviarEmail(novoUsuario.email);
    response.redirect("/signin");
  }

});

rotasPublicas.get("/admin", middlewareAutenticacao, (request, response) => {
  const message = request.query.message || null;
  response.render("admin/login", { message })
});

rotasPublicas.post("/admin", middlewareAutenticacao, async (request, response) => {
  let email = request.body.email;
  let senha = request.body.senha;

  let admin = await repositorioAdmin.buscarPorEmail(email);

  let message;

  if(admin){
    if(admin.senha == senha){
      admin.senha = null;
      request.session.admin = admin;

      return response.redirect("admin/loja")
    }

    message = "Senha incorreta!"
  }else{
    message = "Não existe um usuário com o email informado!"
  }

  response.render("admin/login", { message })
});

export { rotasPublicas };