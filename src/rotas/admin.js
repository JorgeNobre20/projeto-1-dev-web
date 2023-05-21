import { Router } from "express";
import { carregarTodosAlugueis } from "../casos-de-uso/index.js";

const rotasAdmin = Router();

rotasAdmin.get("/aluguel", (request, response) => {
  const alugueis = carregarTodosAlugueis();
  response.render("admin/alugueis", { alugueis });
});

export { rotasAdmin };