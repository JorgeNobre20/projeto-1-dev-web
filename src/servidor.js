import express from "express";
import { database } from "../src/Conexao-Banco.js";

import mongo from "mongodb";
import path from "path";

const app = express();
const PORTA_SERVIDOR = 3000;
//Conexão com o banco de dados
const db = await database.connect();

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.set("view engine", "ejs");
app.set("views", "./src/visoes");

app.get("/", (request, response) => {
  response.render("home");
});

app.listen(PORTA_SERVIDOR, () => {
  console.log(`Servidor rodando na porta ${PORTA_SERVIDOR}`);
});
































/* Parte dos carros (Crud) */

// Configuração de armazenamento da imagem
import multerIMPORT from "multer";
import { VeiculosFuncoes } from "./database/veiculos.js";
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
app.get("/admin/loja", (request, response) => {
  response.render("admin-loja");
});

//tudo da parte de aluguel
app.get("/admin/aluguel", (request, response) => {
  response.render("admin-aluguel");
});

//tudo da parte de add carro
app.get("/admin/loja/add-carro", (request, response) => {
  response.render("admin-addCarro");
});

app.post(
  "/admin/loja/add-carro",
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
      res.render("/admin-addCarro", { cad: false });
    }
  }
);
