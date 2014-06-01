jQuery().ready(function(){ 
   var fecha = new Date();
   var anio = fecha.getFullYear();
   var trimestre
   if (fecha.getMonth()==0){
       anio = anio-1;
   }
   jQuery(".anio").text(anio)
   if (fecha.getMonth()== 0){
       trimestre = 4;   
   }else{
       trimestre = Math.floor((fecha.getMonth()-1)/3 )+1; 
   }
   //trimestre=1,2,3,4
   jQuery(".trimestre").text(trimestre)
   
   funcionmostrarliquidacion = function(respuesta){
       var etiqueta = '<span style="color:';
       if (respuesta.liquidacion < 0){
           etiqueta+="red";
       }else{
           etiqueta+="green";
       }
       etiqueta+='">'+sprintf("%.2f",respuesta.liquidacion)+"</span>"
       
       jQuery(".liquidacion").html(etiqueta)
       
   }
   
   if (trimestre == 4){

           peticion("cerrar", funcionmostrarliquidacion, {datos:{anio:anio, csrfmiddlewaretoken:jQuery("[name=csrfmiddlewaretoken]").val()},metodo: "post"}) //get:select, post:insert

   }else{
   peticion("obtenerliquidacion", funcionmostrarliquidacion, {datos:{anio:anio, trimestre:trimestre}});
   }
   
});


