import { Router } from "express";

import { repositorioVeiculo } from "../repositorios/index.js";
import { carregarTodosAlugueis } from "../casos-de-uso/index.js";

const rotasAdmin = Router();

rotasAdmin.get("/aluguel", (request, response) => {
  const alugueis = carregarTodosAlugueis();
  response.render("admin/alugueis", { alugueis });
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

  let veiculoEditar = veiculos.filter((veiculo) => veiculo._id == id)[0];

	res.render("admin/admin-editVeiculo", { veiculoEditar, id });
});

rotasAdmin.post("/editVeiculo", async (req, res) => {
  let veiculo = await repositorioVeiculo.updateVeiculo({
    _id: req.body._id,
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

export { rotasAdmin };