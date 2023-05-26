import { format, differenceInDays, addHours, isEqual, isBefore, isAfter, addDays  } from "date-fns";
import { ptBR } from "date-fns/locale/index.js";

export const FormatoData = {
  NUM_DIA_BARRA_NUM_MES_BARRA_ANO: "NUM_DIA_BARRA_NUM_MES_BARRA_ANO",
  NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO: "NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO",
  ANO_HIFEN_NUM_MES_HIFEN_NUM_DIA: "ANO_HIFEN_NUM_MES_HIFEN_NUM_DIA"
}

Object.freeze(FormatoData);

class ServicoData {
  static formatarData(data, formatoSaida){
    switch (formatoSaida) {
      case FormatoData.NUM_DIA_BARRA_NUM_MES_BARRA_ANO:
        return format(data, "dd'/'MM'/'yyyy", { locale: ptBR });
      
      case FormatoData.NUM_DIA_ESPACO_DE_ESPACO_MES_ABREVIADO_ESPACO_ANO:
        return format(data, "dd' de 'MMM'. de 'yyyy", { locale: ptBR });
      
      case FormatoData.ANO_HIFEN_NUM_MES_HIFEN_NUM_DIA:
        return format(data, "yyyy'-'MM'-'dd", { locale: ptBR });
      
      default:
        return data;
    }
  }

  static obterNumeroDiasEntreDatas(dataInicial, dataFinal){
    return differenceInDays(dataFinal, dataInicial);
  }

  static instanciarDataComFusoHorarioBrasileiro(data){
    const instanciaData = new Date(data);

    instanciaData.setUTCHours(0);
    instanciaData.setMinutes(0);
    instanciaData.setSeconds(0);

    const dataComFusoHorario = addHours(instanciaData, 3);
    return dataComFusoHorario;
  }

  static dataEstaEntreDatas(data, dataInicial, dataFinal){
    const dataInicialAnteriorOuIgualData = this.dataAnteriorOuIgual(dataInicial, data);
    const dataFinalPosteriorOuIgualData = this.dataPosteriorOuIgual(dataFinal, data);

    return (dataInicialAnteriorOuIgualData && dataFinalPosteriorOuIgualData);
  }

  static dataAnteriorOuIgual(data, dataComparacao){
    return isEqual(data, dataComparacao) || isBefore(data, dataComparacao);
  }

  static dataPosteriorOuIgual(data, dataComparacao){
    return isEqual(data, dataComparacao) || isAfter(data, dataComparacao);
  }

  static dataEPosterior(data, dataComparacao){
    return isAfter(data, dataComparacao);
  } 

  static adicionarDias(data, numeroDias){
    return addDays(data, numeroDias);
  } 
}

export { ServicoData };