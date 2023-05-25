import { Router } from "express";

import { 
  buscarAlugueisPorCliente, 
  buscarCarroPorId, 
  buscarUltimosAlugueisPorCarro,
  registrarAluguel
} from "../casos-de-uso/index.js";
import { StatusAluguel } from "../enums/StatusAluguel.js";
import { repositorioAluguel, repositorioVeiculo, repositorioCliente } from "../repositorios/index.js";

const rotasCliente = Router();

rotasCliente.get("/loja/conta", (request, response) => {
  let usuario = request.session.usuario;
  let message = " ";
  response.render("cliente/cliente-conta", { usuario, message, erro: 0 });
})

rotasCliente.post("/loja/conta", async (request, response) => { // Atualizar dados conta usuario
  let usuario = request.body;
  usuario.id = request.session.usuario.id;
  let message;
  let erro;

  if(usuario.senhaNova){
    if(usuario.senha == request.session.usuario.senha){
      repositorioCliente.atualizarSenhaUsuario(usuario);
      message = "Senha alterada com sucesso!";
    }else{
      message = "Senha não alterada, pois a senha atual está incorreta!";
      erro = 1;

      usuario = request.session.usuario;

      return response.render("cliente/cliente-conta", { usuario, message, erro });
    }
  }else{
    repositorioCliente.atualizarDadosUsuario(usuario);
    message = "Dados da conta alterados com sucesso!";
  }

  usuario = await repositorioCliente.buscarPorId(request.session.usuario.id);
  request.session.usuario = usuario;

  erro = 0;

  response.render("cliente/cliente-conta", { usuario, message, erro });
})

rotasCliente.get("/loja/conta-editar", (request, response) => {
  let usuario = request.session.usuario;
  response.render("cliente/cliente-editar-conta", { usuario });
});

rotasCliente.get("/loja/conta-senha", (request, response) => {

  response.render("cliente/cliente-senha-conta", {});

})

rotasCliente.get("/loja/alugar/:idCarro", async (request, response) => {
  const idCarro = request.params.idCarro;
  const mensagemErro = request.query.mensagemErro;

  const carroSelecionado = await buscarCarroPorId(idCarro);

  if (!carroSelecionado) {
    const mensagem = "Erro ao encontrar carro selecionado para aluguel";
    return response.redirect(`/erro?mensagem=${mensagem}`);
  }

  const ultimosAlugueisCarro = await buscarUltimosAlugueisPorCarro(idCarro);

  response.render("cliente/solicitacao-aluguel",
    {
      carroSelecionado,
      ultimosAlugueis: ultimosAlugueisCarro,
      mensagemErro
    }
  );
});

rotasCliente.post("/solicitar-aluguel/:idCarro", async (request, response) => {
  const idCliente = request.session.usuario[0].id;
  const idCarro = request.params.idCarro;

  const formaPagamento = request.body.formaPagamento;
  const dataInicialAluguel = request.body.dataInicial;
  const dataFinalAluguel = request.body.dataFinal;

  const carroSelecionado = await buscarCarroPorId(idCarro);

  if (!carroSelecionado) {
    const mensagem = "Erro ao encontrar carro selecionado para aluguel";
    response.redirect(`/erro?mensagem=${mensagem}`);
  }

  const aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado = await repositorioAluguel.buscarAlgumCujoIntervaloContemIntervaloECarro(
    dataInicialAluguel,
    dataFinalAluguel,
    idCarro
  );

  if (aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado && aluguelExistenteCujoIntervaloContemIntervaloECarroSelecionado.status !== StatusAluguel.REJEITADO) {
    const mensagem = "Já existe um aluguel registrado no intervalo de datas selecionado";
    return response.redirect(`/loja/alugar/${idCarro}?mensagemErro=${mensagem}`);
  }

  try {
    await registrarAluguel({
      idCarro,
      idCliente,
      formaPagamento,
      dataInicial: dataInicialAluguel,
      dataFinal: dataFinalAluguel,
    });

    response.redirect("/loja");
  } catch (error) {
    response.redirect(`/loja/alugar/${idCarro}?mensagemErro=${error.message}`);
  }
});

rotasCliente.get("/loja", async (request, response) => {
  const ListaDeveiculos = await repositorioVeiculo.pegarVeiculos();
  response.render("cliente/cliente-loja", { veiculos: ListaDeveiculos });
});

rotasCliente.get("/loja/aluguel", async (request, response) => {
  const idCliente = request.session.usuario.id;
  const alugueisCliente = await buscarAlugueisPorCliente(idCliente);

  response.render("cliente/cliente-aluguel", { 
    mensagemErro: null,
    alugueis: alugueisCliente
  });
});

rotasCliente.get("/sair", (request, response) => {
  request.session.usuario = null;
  response.redirect("/");
});

export { rotasCliente };