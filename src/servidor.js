import express from "express";

import { database } from "../src/Conexao-Banco.js";
import path from "path";
import mongo from "mongodb";

const app = express();
const PORTA_SERVIDOR = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Template Engine
app.set("view engine", "ejs");
app.set("views", "./src/visoes");

app.get("/", async (request, response) => {
  let veiculos = await VeiculosFuncoes.pegarVeiculos();
  response.render("home", {veiculos});
});

app.use("/admin", rotasAdmin);

app.listen(PORTA_SERVIDOR, () => {
  console.log(`Servidor rodando na porta ${PORTA_SERVIDOR}`);
});

































/* -------------------- Parte dos carros (Crud) -------------------- */

// Configuração de armazenamento da imagem
import multerIMPORT from "multer";
import { VeiculosFuncoes } from "./database/veiculos.js";
import { rotasAdmin } from "./rotas/admin.js";
const multer = multerIMPORT;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //pasta de destino
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split(".")[1];

    // Cria um código randômico que será o nome do arquivo
    //const novoNomeArquivo = require('crypto')
    //  .randomBytes(64)
    //.toString('hex');

    // Indica o novo nome do arquivo:
    cb(null, `${file.originalname.split(".")[0]}.${extensaoArquivo}`);
  },
});

const upload = multer({ storage });

//tudo da parte de loja
app.get("/admin/loja", async (request, response) => {
  let veiculos = await VeiculosFuncoes.pegarVeiculos();
  response.render("admin-loja", {veiculos});
});

//tudo da parte de aluguel
app.get("/admin/aluguel", (request, response) => {
  response.render("admin-aluguel");
});

//tudo da parte de add/remover/edit carro
app.get("/admin/loja/add-veiculo", async (request, response) => {
  response.render("admin-addVeiculo");
});

app.post(
  "/admin/loja/add-veiculo",
  upload.single("filepond"),
  async (req, res, next) => {
    //console.log(req.file)

    let src = "/images/" + req.file.filename;

    //gerador de hex id
    var mongoObjectId = function () {
      var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase()
      );
    };

    let veiculos = await VeiculosFuncoes.inserirVeiculo({
      _id: mongoObjectId(),
      nome: req.body.nome,
      marca: req.body.marca,
      cor: req.body.cor,
      diaria: req.body.diaria,
      foto: src,
      status: 1,
    });
    if (veiculos) {
      res.redirect("/admin/loja");
    } else {
      res.render("/admin-addVeiculo");
    }
  }
);

app.get("/deletarVeiculo", async (req, res) => {
  let veiculo = await VeiculosFuncoes.deletarVeiculo(req.query.excluir);

	if (veiculo) {
		res.redirect("/admin/loja");
	} else {
		res.render("/admin-addVeiculo");
	}
});

app.get("/editVeiculo", async (req, res) => {
	let veiculos = await VeiculosFuncoes.pegarVeiculos();
	let id = req.query.id;

  let veiculoEditar = veiculos.filter((veiculo) => veiculo._id == id)[0];

	res.render("admin-editVeiculo", { veiculoEditar, id });
});

app.post("/editVeiculo", upload.single("filepond"), async (req, res) => {
	let veiculo;

	if (req.file != undefined) {
		let src = "/images/" + req.file.filename;

		veiculo = await VeiculosFuncoes.updateVeiculo({
			_id: req.body._id,
			nome: req.body.nome,
			marca: req.body.marca,
			cor: req.body.cor,
			diaria: req.body.diaria,
			foto: src,
		});
	} else {
		veiculo = await VeiculosFuncoes.updateVeiculo({
			_id: req.body._id,
			nome: req.body.nome,
			marca: req.body.marca,
			cor: req.body.cor,
			diaria: req.body.diaria,
		});
	}

	if (veiculo) {
		res.redirect("/admin/loja");
	} else {
		res.render("/admin-addVeiculo");
	}
});