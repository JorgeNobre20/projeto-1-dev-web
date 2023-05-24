import { Router } from "express";

import { repositorioCliente, repositorioVeiculo } from "../repositorios/index.js";

const rotasPublicas = Router();

rotasPublicas.get("/", async (request, response) => {
  let veiculos = await repositorioVeiculo.pegarVeiculos();
  response.render("home", {veiculos});
});

rotasPublicas.get("/erro", (request, response) => {
  let mensagemErro = request.query.mensagem;

  if(!mensagemErro){
    mensagemErro = "Algo deu errado, tente novamente";
  }

  response.render("erro", { mensagem: mensagemErro });
});

rotasPublicas.get("/signin", (request, response) => {
  response.render("cliente/cliente-entrar", {erros: []});
});

rotasPublicas.post("/signin", async (request, response)=>{
  const usuarioBuscado = {email: request.body.email, senha: request.body.senha};
  const usuariosBd = await repositorioCliente.buscarUsuarios(); 
  const usuarioEmail = usuariosBd.filter(usuario => usuario.email == usuarioBuscado.email);
  const usuarioSenha = usuariosBd.filter(usuario => usuario.senha == usuarioBuscado.senha);

  let erro = [];
  if(usuarioEmail.length > 0 && usuarioSenha.length > 0){
    usuarioEmail.senha = null;
    request.session.usuario = usuarioEmail;
    response.redirect("/loja");

  }else{
    erro.push("Email ou senha incorretos");
    response.render("cliente/cliente-entrar", {erros: erro});
  }

});

rotasPublicas.get("/signup", (request, response) => {
  response.render("cliente/cliente-cadastrar", {erros: []});
});

rotasPublicas.post("/signup", async (request, response) => {
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
    response.redirect("/signin");
  }

});

export { rotasPublicas };