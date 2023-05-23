import express from "express";

import { rotasAdmin, rotasCliente, rotasPublicas } from "./rotas/index.js";
import { bancoDeDados } from "./banco-de-dados/banco-de-dados.js";

const app = express();
const PORTA_SERVIDOR = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Template Engine
app.set("view engine", "ejs");
app.set("views", "./src/visoes");

// Rotas
app.use(rotasPublicas);
app.use(rotasCliente);
app.use("/admin", rotasAdmin);

bancoDeDados.conectar().then(() => {
  app.listen(PORTA_SERVIDOR, () => {
    console.log(`Servidor rodando na porta ${PORTA_SERVIDOR}`);
  });  

}).catch((error) => {
  console.log("Erro ao iniciar servidor", error);
});
