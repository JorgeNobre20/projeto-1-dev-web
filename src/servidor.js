import express from "express";
import cookieSession from "cookie-session";

import { bancoDeDados } from "./banco-de-dados/banco-de-dados.js";
import { rotasAdmin, rotasCliente, rotasPublicas } from "./rotas/index.js";
import { middlewareAutenticacaoUsuario, middlewareAutenticacaoAdmin } from "./middlewares/index.js";

const app = express();
const PORTA_SERVIDOR = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  secret: 'c293x8b6234z82n938246bc2938x4zb234',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Template Engine
app.set("view engine", "ejs");
app.set("views", "./src/visoes");

// Rotas
app.use(rotasPublicas);
app.use("/admin", middlewareAutenticacaoAdmin, rotasAdmin);
app.use(middlewareAutenticacaoUsuario, rotasCliente);


bancoDeDados.conectar().then(() => {
  app.listen(PORTA_SERVIDOR, () => {
    console.log(`Servidor rodando na porta ${PORTA_SERVIDOR}`);
  });  

}).catch((error) => {
  console.log("Erro ao iniciar servidor", error);
});
