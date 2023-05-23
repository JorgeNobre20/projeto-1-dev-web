import { Router } from "express";

import { buscarCarroPorId, buscarUltimosAlugueisPorCarro } from "../casos-de-uso/index.js";
import { repositorioVeiculo } from "../repositorios/index.js";
import { repositorioUsuario } from "../repositorios/RepositorioUsuario.js";

const rotasCliente = Router();

rotasCliente.get("/loja/conta", (request, response) => {
  response.render("cliente/cliente-conta", {})
})

rotasCliente.post("/loja/conta", (request, response) => { // Atualizar dados conta usuario
  response.render("cliente/cliente-conta", {})
})

rotasCliente.get("/loja/conta-editar", (request, response) => {
  response.render("cliente/cliente-editar-conta", {})
})

rotasCliente.get("/loja/conta-senha", (request, response) => {
  response.render("cliente/cliente-senha-conta", {})
})

rotasCliente.get("/loja/alugar/:idCarro", (request, response) => {
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
});

rotasCliente.get("/loja", async (request, response)=> {
  const ListaDeveiculos = await repositorioVeiculo.pegarVeiculos();
  response.render("cliente/cliente-loja", {veiculos: ListaDeveiculos});
});

rotasCliente.get("/loja/aluguel", (request, response)=>{
  response.render("cliente/cliente-aluguel");
});


export { rotasCliente };