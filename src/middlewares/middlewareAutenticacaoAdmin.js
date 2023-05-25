export function middlewareAutenticacaoAdmin(request, response, next){
  if(request.session.admin){
    next();
  }else{
    response.redirect("/admin");
  }
}