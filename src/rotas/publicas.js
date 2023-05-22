import { Router } from "express";

const rotasPublicas = Router();

rotasPublicas.get("/erro", (request, response) => {
  let mensagemErro = request.query.mensagem;

  if(!mensagemErro){
    mensagemErro = "Algo deu errado, tente novamente";
  }

  response.render("erro", { mensagem: mensagemErro });
});

export { rotasPublicas };