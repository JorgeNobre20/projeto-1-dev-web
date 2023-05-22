import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale/index.js";

export const FormatoData = {
  NUM_DIA_BARRA_NUM_MES_BARRA_ANO: "NUM_DIA_BARRA_NUM_MES_BARRA_ANO",
  NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO: "NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO"
}

Object.freeze(FormatoData);

class ServicoData {
  static formatarData(data, formatoSaida){
    switch (formatoSaida) {
      case FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO:
        return format(data, "dd'/'MM'/'yyyy", { locale: ptBR });
      
      case FormatoData.NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO:
        return format(data, "dd' de 'MMM'. de 'yyyy", { locale: ptBR });
  
      default:
        return data;
    }
  }

  static obterNumeroDiasEntreDatas(dataInicial, dataFinal){
    return differenceInDays(dataFinal, dataInicial);
  }
}

export { ServicoData };