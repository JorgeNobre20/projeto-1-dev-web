import { format, differenceInDays } from "date-fns";

export const FormatoData = {
  NUM_DIA_BARRA_NUM_MES_BARRA_ANO: "NUM_DIA_BARRA_NUM_MES_BARRA_ANO"
}

Object.freeze(FormatoData);

class ServicoData {
  static formatarData(data, formatoSaida){
    switch (formatoSaida) {
      case FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO:
        return format(data, "dd'/'MM'/'yyyy");
    
      default:
        return data;
    }
  }

  static obterNumeroDiasEntreDatas(dataInicial, dataFinal){
    return differenceInDays(dataFinal, dataInicial);
  }
}

export { ServicoData };