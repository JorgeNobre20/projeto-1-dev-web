import { Router } from "express";

import { repositorioVeiculo } from "../repositorios/index.js";

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

export { rotasPublicas };