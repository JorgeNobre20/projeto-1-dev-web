import { Router } from "express";

import { buscarCarroPorId, buscarUltimosAlugueisPorCarro } from "../casos-de-uso/index.js";
import { repositorioVeiculo } from "../repositorios/index.js";

const rotasCliente = Router();

rotasCliente.get("/loja/conta", (request, response) => {
  if(request.session.usuario){
    let usuarioSession = request.session.usuario;
    response.render("cliente/cliente-conta", { usuario: usuarioSession[0] });
  }else{
    response.redirect("/signin");
  }
})

rotasCliente.post("/loja/conta", (request, response) => { // Atualizar dados conta usuario
  if(request.body.senha){ // Caso a requisição venha para alterar senha
    
  }else{ // Caso a requisição venha para editar os dados do usuário

  }
  response.render("cliente/cliente-conta", { usuario: {} })
})

rotasCliente.get("/loja/conta-editar", (request, response) => {
  if(request.session.usuario){
    let usuarioSession = request.session.usuario;
    response.render("cliente/cliente-editar-conta", { usuario: usuarioSession[0] });
  }else{
    response.redirect("/signin");
  }
})

rotasCliente.get("/loja/conta-senha", (request, response) => {
  if(request.session.usuario){
    response.render("cliente/cliente-senha-conta", {});
  }else{
    response.redirect("/signin");
  }
})

rotasCliente.get("/loja/alugar/:idCarro", (request, response) => {
  if(request.session.usuario){
    const idCarro = request.params.idCarro;
    const carroSelecionado = buscarCarroPorId(idCarro);

    if(!carroSelecionado){
      const mensagem = "Erro ao encontrar carro selecionado para aluguel";
      response.redirect(`/erro?mensagem=${mensagem}`);
    }

    const ultimosAlugueisCarro = buscarUltimosAlugueisPorCarro(idCarro);
  
    response.render("cliente/solicitacao-aluguel", 
      { 
        carroSelecionado, 
        ultimosAlugueis: ultimosAlugueisCarro 
      }
    );
  }else{
    response.redirect("/signin");
  }
});

rotasCliente.get("/loja", async (request, response)=> {
  if(request.session.usuario){
    const ListaDeveiculos = await repositorioVeiculo.pegarVeiculos();
    response.render("cliente/cliente-loja", {veiculos: ListaDeveiculos});
  }else{
    response.redirect("/signin");
  }
});

rotasCliente.get("/loja/aluguel", (request, response)=>{
  if(request.session.usuario){
    response.render("cliente/cliente-aluguel");
  }else{
    response.redirect("/signin");
  }
});


export { rotasCliente };