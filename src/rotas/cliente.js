import { Router } from "express";

import { 
  buscarAlugueisPorCliente, 
  buscarCarroPorId, 
  buscarUltimosAlugueisPorCarro,
  registrarAluguel,
  carregarTodosCarros
} from "../casos-de-uso/index.js";
import { StatusAluguel,TipoUsuario } from "../enums/index.js";
import { repositorioAluguel, repositorioCliente } from "../repositorios/index.js";

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
  const idCliente = request.session.usuario.id;
  const idCarro = request.params.idCarro;

  const formaPagamento = request.body.formaPagamento;
  const dataInicialAluguel = request.body.dataInicial;
  const dataFinalAluguel = request.body.dataFinal;

  const carroSelecionado = await buscarCarroPorId(idCarro);

  if (!carroSelecionado) {
    const mensagem = "Erro ao encontrar carro selecionado para aluguel";
    response.redirect(`/erro?mensagem=${mensagem}`);
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
  const textoBuscaModeloOuMarca = request.query.textoBuscaModeloOuMarca;

  const ListaDeveiculos = await carregarTodosCarros(textoBuscaModeloOuMarca);
  
  response.render("cliente/cliente-loja", { 
    veiculos: ListaDeveiculos, 
    tipoUsuario: TipoUsuario.CLIENTE,
    textoBuscaModeloOuMarca
  });
});

rotasCliente.get("/loja/aluguel", async (request, response) => {
  const idCliente = request.session.usuario.id;
  const alugueisCliente = await buscarAlugueisPorCliente(idCliente);

  response.render("cliente/cliente-aluguel", { 
    mensagemErro: null,
    alugueis: alugueisCliente,
    tipoUsuario: TipoUsuario.CLIENTE
  });
});

rotasCliente.get("/sair", (request, response) => {
  request.session.usuario = null;
  response.redirect("/");
});

export { rotasCliente };