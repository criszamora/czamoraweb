jQuery().ready(function(){
    jQuery("select[name=gastosingresos]").change(function(){
        if (jQuery(this).val()=="0"){
            jQuery("label[for=gasto]").text("Gasto"); 
            jQuery("label[for=recargoequivalencia]").text("Adquisición intracomunitaria")
            jQuery("#casillaextra").attr("name","adquisicionintracomunitaria")
            jQuery("#formulario").attr("action", "gasto");
            jQuery("#tipoactividad").empty();
            //Descargamos las actividades
            peticion("actividades",function(respuesta){
     		if(respuesta.error == errores.ok){
     			for (var i = 0; i < respuesta.listaactividades.length; i++){
                            if (respuesta.listaactividades[i].id==-1){
                                continue;
                            }
     				var input = "<span class=\"checkbox_tipoactividad\"><input value=\""+respuesta.listaactividades[i].id+"\" name=\"tipoactividad\" type=\"radio\" >"+respuesta.listaactividades[i].actividad;
     				jQuery("div#tipoactividad").append(input);
     			}
     		}
     	});
        }else{
             jQuery("label[for=gasto]").text("Ingreso");
             jQuery("label[for=recargoequivalencia]").text("Recargo de equivalencia")
             jQuery("#casillaextra").attr("name","recargoequivalencia")
             jQuery("#formulario").attr("action", "ingreso")
        }
    }).change();
    
    //TODO validar todos los campos anteriores 
    jQuery("#contactSubmitBtn").click(function(){
        var action = jQuery("#formulario").attr("action")
        peticion(action,function(respuesta){
            if (respuesta.error == errores.ok){
                alert("operacion realizada")
            }else
                alert("error"+respuesta.error)
        }, {metodo:"post", datos:jQuery("#formulario").serialize()});
    });
    
    
    
});


