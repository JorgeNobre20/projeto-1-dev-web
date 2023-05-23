import { Router } from "express";
import { buscarCarroPorId, buscarUltimosAlugueisPorCarro } from "../casos-de-uso/index.js";
import { repositorioVeiculo } from "../repositorios/index.js";

const rotasCliente = Router();

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
  response.render("/cliente/cliente-loja", {veiculos: ListaDeveiculos});
});

rotasCliente.get("/loja/conta", (request, response)=>{
  response.render("/cliente/cliente-conta");
});

rotasCliente.get("/loja/aluguel", (request, response)=>{
  response.render("/cliente/cliente-aluguel");
});

export { rotasCliente };