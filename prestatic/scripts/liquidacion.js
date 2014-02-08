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
   
   peticion("obtenerliquidacion", function(respuesta){
       jQuery(".liquidacion").text(sprintf("%.2f",respuesta.liquidacion))
       
   }, {datos:{anio:anio, trimestre:trimestre}})
   
   
});


