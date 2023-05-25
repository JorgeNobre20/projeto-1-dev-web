export function middlewareAutenticacao(request, response, next){
  if(request.session.admin){
    return response.redirect("/admin/loja");
  }

  if(request.session.usuario){
    return response.redirect("/loja");
  }
  
  next();
}