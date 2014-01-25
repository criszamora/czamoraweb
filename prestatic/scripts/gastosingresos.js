jQuery().ready(function(){
    jQuery("select[name=gastosingresos]").change(function(){
        jQuery("#tipoactividad").empty();
        if (jQuery(this).val()=="0"){
            jQuery("label[for=gasto]").text("Gasto"); 
            jQuery("label[for=recargoequivalencia]").text("Adquisición intracomunitaria")
            jQuery("#casillaextra").attr("name","adquisicionintracomunitaria")
            jQuery("#formulario").attr("action", "gasto");
            
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
             peticion("actividadusuario",function(respuesta){
     		if(respuesta.error == errores.ok){
     			for (var i = 0; i < respuesta.actividades.length; i++){
                            var input = "<span class=\"checkbox_tipoactividad\"><input value=\""+respuesta.actividades[i].id+"\" name=\"tipoactividad\" type=\"radio\" >"+respuesta.actividades[i].nombre;
                            jQuery("div#tipoactividad").append(input);
     			}
     		}
            });
        }
    }).change();
    
    //TODO validar todos los campos anteriores 
    jQuery("#contactSubmitBtn").click(function(){
        var action = jQuery("#formulario").attr("action")
        var  valor = parseFloat(jQuery("input[name=valor]").val())
        if (isNaN(valor)){
            alert("Introduzca un valor númerico")
            jQuery("input[name=valor]").focus()
            return;
        }
        if (jQuery(":radio[name=tipoactividad]:checked").size()==0){
            alert("Obligatorio elegir un tipo de actividad")
            return;
        }
        if (jQuery("input[name=fecha]").val().match(/^\d\d\/\d\d\/\d\d\d\d$/)== null){
            alert("Fecha dd/mm/aaaa")
            return;
        }
        peticion(action,function(respuesta){
            if (respuesta.error == errores.ok){
                alert("operacion realizada");
                jQuery("#formulario input[type=text],#formulario input[type=date],#formulario input[type=number]").val("");
                jQuery(":radio[name=tipoactividad]:checked").attr("checked",false);
                
            }else
                alert("error"+respuesta.error)
        }, {metodo:"post", datos:jQuery("#formulario").serialize()});
    });
    
    
    
});


