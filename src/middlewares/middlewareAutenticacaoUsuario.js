export function middlewareAutenticacaoUsuario(request, response, next){
  if(request.session.usuario){
    next();
  }else{
    response.redirect("/signin");
  }
}