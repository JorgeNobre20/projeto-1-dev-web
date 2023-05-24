import { v4 as gerarUuidV4 } from "uuid";

export class ServicoGeradorId{
  static gerarId(){
    return gerarUuidV4();
  }
}