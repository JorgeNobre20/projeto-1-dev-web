import { Router } from "express";

import { buscarCarroPorId, buscarUltimosAlugueisPorCarro } from "../casos-de-uso/index.js";
import { repositorioAluguel, repositorioVeiculo } from "../repositorios/index.js";
import { repositorioUsuario } from "../repositorios/RepositorioUsuario.js";
import { registrarAluguel } from "../casos-de-uso/registrar-aluguel.js";

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

rotasCliente.get("/loja/alugar/:idCarro", async (request, response) => {
  const idCarro = request.params.idCarro;
  const mensagemErro = request.query.mensagemErro;

  const carroSelecionado = await buscarCarroPorId(idCarro);

  if(!carroSelecionado){
    const mensagem = "Erro ao encontrar carro selecionado para aluguel";
    return response.redirect(`/erro?mensagem=${mensagem}`);
  }

  const ultimosAlugueisCarro = buscarUltimosAlugueisPorCarro(idCarro);
  
  response.render("cliente/solicitacao-aluguel", 
    { 
      carroSelecionado, 
      ultimosAlugueis: ultimosAlugueisCarro,
      mensagemErro
    }
  );
});

rotasCliente.post("/solicitar-aluguel/:idCarro", async (request, response) => {
  const idCarro = request.params.idCarro;

  const formaPagamento = request.body.formaPagamento;
  const dataInicialAluguel = request.body.dataInicial;
  const dataFinalAluguel = request.body.dataFinal;

  const carroSelecionado = await buscarCarroPorId(idCarro);

  if(!carroSelecionado){
    const mensagem = "Erro ao encontrar carro selecionado para aluguel";
    response.redirect(`/erro?mensagem=${mensagem}`);
  }

  const aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado = await repositorioAluguel.buscarAlgumCujoIntervaloContemIntervaloECarro(
    dataInicialAluguel,
    dataFinalAluguel,
    idCarro
  );
  
  if(aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado){
    const mensagem = "Já existe um aluguel registrado no intervalo de datas selecionado";
    return response.redirect(`/loja/alugar/${idCarro}?mensagemErro=${mensagem}`);
  }

  try {
    await registrarAluguel({
      idCarro, 
      idCliente: "8e5a4d56-fb4c-47f9-b669-96a6c6c38767",
      formaPagamento,
      dataInicial: dataInicialAluguel,
      dataFinal: dataFinalAluguel,
    });

    response.redirect("/loja");
  } catch (error) {
    response.redirect(`/loja/alugar/${idCarro}?mensagemErro=${error.message}`);
  }
});

rotasCliente.get("/loja", async (request, response)=> {
  const ListaDeveiculos = await repositorioVeiculo.pegarVeiculos();
  response.render("cliente/cliente-loja", {veiculos: ListaDeveiculos});
});

rotasCliente.get("/loja/aluguel", (request, response)=>{
  response.render("cliente/cliente-aluguel");
});


export { rotasCliente };