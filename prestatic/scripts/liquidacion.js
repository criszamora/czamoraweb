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
       trimestre = (fecha.getMonth()-1)/3 +1;
   }
   jQuery(".trimestre").text(trimestre)
   
   peticion("prorrata", function(respuesta){
       if (respuesta.error == errores.sindatos){
           jQuery(".prorrata").show();
           
      }
   }, {datos:{anio:anio}})
});


