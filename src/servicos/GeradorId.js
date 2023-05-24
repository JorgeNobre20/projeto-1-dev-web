import { v4 as gerarUuidV4 } from "uuid";

export class GeradorId{
  static gerarId(){
    return gerarUuidV4();
  }
}