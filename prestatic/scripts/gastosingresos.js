jQuery().ready(function(){
    jQuery("select[name=gastosingresos]").change(function(){
        jQuery("#regionQR").hide()
        jQuery("#tabla_actividad").empty();
        if (jQuery(this).val()=="0"){
            jQuery("label[for=gasto]").text("Gasto"); 
            jQuery("label[for=recargoequivalencia]").text("Adquisición intracomunitaria")
            jQuery("#casillaextra").attr("name","adquisicionintracomunitaria")
            jQuery("#formulario").attr("action", "gasto");
            
            //Descargamos las actividades
            peticion("actividades",function(respuesta){
     		if(respuesta.error == errores.ok){
                    var input="";
                    var column=0;
     			for (var i = 0; i < respuesta.listaactividades.length; i++){
                            if (respuesta.listaactividades[i].id==-1){
                                continue;
                            }
     				
                                if (column%3==0){
                                    input+="<tr>";
                                }
                                     input += "<td><span class=\"checkbox_tipoactividad\"><input value=\""+respuesta.listaactividades[i].id+"\" name=\"tipoactividad\" type=\"radio\" >"+respuesta.listaactividades[i].actividad+"<td>";
     				if (column%3==2){
                                    input+="</tr>"
                                }
                                column++;
                        
     			}
                        if (column%3 != 0){
                            input+="</tr>"
                        }
                        jQuery("#tabla_actividad").append(input);
                        
     		}
            });
        }else{
             jQuery("label[for=gasto]").text("Ingreso");
             jQuery("label[for=recargoequivalencia]").text("Recargo de equivalencia")
             jQuery("#casillaextra").attr("name","recargoequivalencia")
             jQuery("#formulario").attr("action", "ingreso")
             peticion("actividadusuario",function(respuesta){
                 var input="";
                    var column=0;
     		if(respuesta.error == errores.ok){
     			for (var i = 0; i < respuesta.actividades.length; i++){
                            if (column%3==0){
                                    input+="<tr>";
                                }
                            input += "<td><span class=\"checkbox_tipoactividad\"><input value=\""+respuesta.actividades[i].id+"\" name=\"tipoactividad\" type=\"radio\" >"+respuesta.actividades[i].nombre+"</td>";
                            if (column%3==2){
                                    input+="</tr>"
                                }
                                column++;
     			}
                         if (column%3 != 0){
                            input+="</tr>"
                        }
                        jQuery("#tabla_actividad").append(input);
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
                if (jQuery("select[name=gastosingresos]").val()=="1"){
                     var concepto = jQuery("#formulario input[type=text][name=concepto]").val()
                    var importe = jQuery("#formulario input[type=number][name=valor]").val()
                    var fecha = jQuery("#formulario input[type=date][name=fecha]").val()
                    var actividad = jQuery(":radio[name=tipoactividad]:checked").val()
                    jQuery("#imagenQR").attr("src",getURL()+"qr?texto="+concepto+";"+importe+";"+fecha+";"+actividad+";0")
                    jQuery("#regionQR").show()
                }else{
                    jQuery("#regionQR").hide()
                }
                jQuery("#formulario input[type=text],#formulario input[type=date],#formulario input[type=number]").val("");
                jQuery(":radio[name=tipoactividad]:checked").attr("checked",false);
                jQuery(":checkbox[name=recargoequivalencia],:checkbox[name=adquisicionintracomunitaria]").attr("checked",false);
                
            }else
                alert("error"+respuesta.error)
        }, {metodo:"post", datos:jQuery("#formulario").serialize()});
    });
    
    jQuery("[name=descargar]").click(function(){
        var url=jQuery("#imagenQR").attr("src")+"&descargar=1"
        document.location.href = url
    });
    
    
    
});


