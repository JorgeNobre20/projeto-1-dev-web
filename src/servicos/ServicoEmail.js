import nodemailer from "nodemailer";

class ServicoEmail{
  enviadorEmail = null;
  emailProprietario =  "jorge.nobre.infor@gmail.com";
  senhaProprietario = "yejhrghmctypaipl";
  
  constructor(){
    this.configurarEnviadorEmail();
  }

  configurarEnviadorEmail(){
    this.enviadorEmail = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: this.emailProprietario, 
        pass: this.senhaProprietario, 
      },
    });
  }

  async enviarEmail(emailDestinatario){
    try {
      await this.enviadorEmail.sendMail({
        from: `Sistema de Aluguel de Veículos <${this.emailProprietario}>`, // sender address
        to: `${emailDestinatario}`, // list of receivers
        subject: "Cadastro concluído com sucesso", // Subject line
        text: "O seu cadastro foi realizado com sucesso, fique à vontade para usar nossa plataforma!", // plain text body
      });

      console.log(`Email enviado com sucesso para ${emailDestinatario}`)
    } catch (error) {
      console.log("Erro ao enviar email");
      console.log(error);
      console.log("\n");
    }
    
  }
}

const servicoEmail = new ServicoEmail();
export { servicoEmail };