const inputPrecoDiaria = document.getElementById("inputPrecoDiaria");
const inputValorTotalAluguel = document.getElementById("inputValorTotalAluguel");

const inputDataInicialAluguel = document.getElementById("inputDataInicialAluguel");
const inputDataFinalAluguel = document.getElementById("inputDataFinalAluguel");

const botaoSolicitacaoAluguel = document.getElementById("botaoSolicitacaoAluguel");
const mensagemErroIntervaloAluguel = document.getElementById("mensagemErroIntervaloAluguel");

window.onload = () => {
  esconderMensagemIntervaloInvalido();
  definirDataPadraoInicialFinalAluguel();
  adicionarOuvidoresEventoMudancaIntervaloDatasAluguel();
  atualizarValorTotalAluguel();
}

function definirDataPadraoInicialFinalAluguel(){
  const dataPadraoInicialFinalAluguel = dateFns.format(new Date(), "YYYY-MM-DD");

  inputDataInicialAluguel.setAttribute("value", dataPadraoInicialFinalAluguel);
  inputDataFinalAluguel.setAttribute("value", dataPadraoInicialFinalAluguel);
}

function adicionarOuvidoresEventoMudancaIntervaloDatasAluguel(){
  adicionarOuvidorEventoMudancaDataInicialAluguel();
  adicionarOuvidorEventoMudancaDataFinalAluguel();
}

function adicionarOuvidorEventoMudancaDataInicialAluguel(){
  inputDataInicialAluguel.addEventListener("change", (event) => {
    aoAlterarIntervaloDatasAluguel();
  });
}

function adicionarOuvidorEventoMudancaDataFinalAluguel(){
  inputDataFinalAluguel.addEventListener("change", (event) => {
    aoAlterarIntervaloDatasAluguel();
  });
}

function aoAlterarIntervaloDatasAluguel(){
  if(intervaloAluguelInvalido()){
    mostrarMensagemIntervaloInvalido();
    desabilitarBotaoSubmit();
  
  }else{
    esconderMensagemIntervaloInvalido();
    atualizarValorTotalAluguel();
    habilitarBotaoSubmit();
  }
}

function intervaloAluguelInvalido(){
  const dataInicialAluguel = inputDataInicialAluguel.value;
  const dataFinalAluguel = inputDataFinalAluguel.value;

  return dateFns.isBefore(dataFinalAluguel, dataInicialAluguel);
}

function mostrarMensagemIntervaloInvalido(){
  mensagemErroIntervaloAluguel.style.display = "block";
}

function esconderMensagemIntervaloInvalido(){
  mensagemErroIntervaloAluguel.style.display = "none";
}

function atualizarValorTotalAluguel(){
  const precoDiariaVeiculo = Number(inputPrecoDiaria.value);
  const totalDiasAluguel = obterTotalDiasAluguel();

  const valorTotalAluguel = totalDiasAluguel * precoDiariaVeiculo;

  inputValorTotalAluguel.setAttribute("value", valorTotalAluguel);
}

function obterTotalDiasAluguel(){
  const dataInicialAluguel = inputDataInicialAluguel.value;
  const dataFinalAluguel = inputDataFinalAluguel.value;

  const totalDiasAluguel = dateFns.differenceInDays(dataFinalAluguel, dataInicialAluguel);
  return totalDiasAluguel + 1;
}

function desabilitarBotaoSubmit(){
  botaoSolicitacaoAluguel.classList.add("disabled");
}

function habilitarBotaoSubmit(){
  botaoSolicitacaoAluguel.classList.remove("disabled");
}