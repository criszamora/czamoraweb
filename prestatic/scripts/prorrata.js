jQuery().ready(function(){ 
   var fecha = new Date();
   var anio = fecha.getFullYear()-1;
   if (fecha.getMonth()==0){
       anio = anio-1;
   }
   jQuery(".anio").text(anio)
   
jQuery("[name=enviar]").click(function(){
    var prorrata = parseInt(jQuery("[name=prorrata]").val())
    if (isNaN (prorrata)){
        alert("Prorrata debe ser un número entero")
        return;
    }
    
    if (prorrata < 0 || prorrata > 100){
        alert("Prorrata entre 0 y 100")
        return;
    }
    
    peticion("registrarprorrata", function(respuesta){
        if (respuesta.error == errores.ok){
            document.location.reload()
        }else{
            alert("Error: "+ respuesta.error)
        }
    },{datos:{prorrata:prorrata, anio:anio, csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()},metodo:"post"})
    
});
});


