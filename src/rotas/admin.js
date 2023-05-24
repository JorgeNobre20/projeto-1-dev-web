import { Router } from "express";

import { repositorioVeiculo } from "../repositorios/index.js";
import { aprovarAluguel, carregarTodosAlugueis, rejeitarAluguel } from "../casos-de-uso/index.js";
import { repositorioAdmin } from "../repositorios/RepositorioAdmin.js";
 
const rotasAdmin = Router();

rotasAdmin.get("/", (request, response) => {
  let message = " "  
  response.render("admin/login", { message })
})

rotasAdmin.post("/", async (request, response) => {
  let email = request.body.email;
  let senha = request.body.senha;

  let admin = await repositorioAdmin.buscarPorEmail(email);

  let message;

  if(admin){
    if(admin.senha == senha){
      return response.redirect("admin/loja")
    }

    message = "Senha incorreta!"

    response.render("admin/login", { message })
  }else{
    message = "Não existe um usuário com o email informado!"

    response.render("admin/login", { message })
  }
})

rotasAdmin.get("/aluguel", async (request, response) => {
  const mensagemErro = request.query.mensagemErro;

  const alugueis = await carregarTodosAlugueis();
  response.render("admin/alugueis", { alugueis, mensagemErro });
});

rotasAdmin.get("/loja", async (request, response) => {
  let veiculos = await repositorioVeiculo.pegarVeiculos();
  response.render("admin/admin-loja", {veiculos});
});

rotasAdmin.get("/loja/add-veiculo", async (request, response) => {
  response.render("admin/admin-addVeiculo");
});

rotasAdmin.post(
  "/loja/add-veiculo",
  async (req, res, next) => {
    let veiculos = await repositorioVeiculo.inserirVeiculo({
      nome: req.body.nome,
      marca: req.body.marca,
      cor: req.body.cor,
      diaria: req.body.diaria,
      foto: req.body.foto,
      status: 1,
    });
    
    if (veiculos) {
      res.redirect("/admin/loja");
    } else {
      res.render("/admin/admin-addVeiculo");
    }
  }
);

rotasAdmin.get("/deletarVeiculo", async (req, res) => {
  let veiculo = await repositorioVeiculo.deletarVeiculo(req.query.excluir);

	if (veiculo) {
		res.redirect("/admin/loja");
	} else {
		res.render("/admin/admin-addVeiculo");
	}
});

rotasAdmin.get("/editVeiculo", async (req, res) => {
	let veiculos = await repositorioVeiculo.pegarVeiculos();
	let id = req.query.id;

  let veiculoEditar = veiculos.filter((veiculo) => veiculo.id == id)[0];

	res.render("admin/admin-editVeiculo", { veiculoEditar, id });
});

rotasAdmin.post("/editVeiculo", async (req, res) => {
  let veiculo = await repositorioVeiculo.updateVeiculo({
    id: req.body.id,
    nome: req.body.nome,
    marca: req.body.marca,
    cor: req.body.cor,
    diaria: req.body.diaria,
    foto: req.body.foto,
  });

	if (veiculo) {
		res.redirect("/admin/loja");
	} else {
		res.render("/admin-addVeiculo");
	}
});

rotasAdmin.get("/aluguel/aprovar/:idAluguel", async (request, response) => {
  const idAluguel = request.params.idAluguel;

  try {
    await aprovarAluguel(idAluguel);
    response.redirect("/admin/aluguel");
  } catch (error) {
    response.redirect(`/admin/aluguel/?mensagemErro=${error.message}`);
  }
});

rotasAdmin.get("/aluguel/rejeitar/:idAluguel", async (request, response) => {
  const idAluguel = request.params.idAluguel;

  try {
    await rejeitarAluguel(idAluguel);
    response.redirect("/admin/aluguel");
  } catch (error) {
    response.redirect(`/admin/aluguel/?mensagemErro=${error.message}`);
  }
});

export { rotasAdmin };