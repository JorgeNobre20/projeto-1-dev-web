const senhaNova = document.getElementById("senhaNova");
const confirmacaoSenhaNova = document.getElementById("confirmacaoSenhaNova");
const botaoConclusao = document.getElementById("botaoConclusao");
const mensagemErro = document.getElementById("mensagemErroSenha");

window.onload = () => {
	pegaValoresDeSenha();
	pegaValoresDeConfirmacaoSenha();
}

function pegaValoresDeSenha(){
	senhaNova.addEventListener("change", (event) => {
		verificarSenhaEConfirmacaoSenha();
	})
}

function pegaValoresDeConfirmacaoSenha(){
	confirmacaoSenhaNova.addEventListener("change", (event) => {
		verificarSenhaEConfirmacaoSenha();
	})
}

function verificarSenhaEConfirmacaoSenha(){
	if(senhaNova.value == confirmacaoSenhaNova.value){
		habilitarBotao();
		esconderMensagemErro();
	}else{
		desabilitarBotao();
		mostrarMensagemErro();
	}
}

function habilitarBotao(){
	botaoConclusao.classList.remove("disabled");
}

function desabilitarBotao(){
  botaoConclusao.classList.add("disabled");
}

function esconderMensagemErro(){
	mensagemErro.style.display = "none";
}

function mostrarMensagemErro(){
	mensagemErro.style.display = "block";
}