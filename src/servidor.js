import express from "express";

const app = express();
const PORTA_SERVIDOR = 3000;

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