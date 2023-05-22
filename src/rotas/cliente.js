import { Router } from "express";
import { buscarCarroPorId, buscarUltimosAlugueisPorCarro } from "../casos-de-uso/index.js";

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

export { rotasCliente };