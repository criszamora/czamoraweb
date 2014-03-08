jQuery().ready(function(){
    jQuery("[name=cambiar]").click(function(){
       if (jQuery("[name=name]").val() == ""){
           alert("El campo Nombre no puede estar vacío")
           return;
       }
       if (jQuery("[name=apellidos]").val() == ""){
           alert("El campo Apellidos no puede estar vacío")
           return;
       }
       
       
       peticion("cambiarnombre", function(respuesta){
           if (respuesta.error == errores.ok){
               alert("Datos cambiados")
           }else{
               alert("Error al cambiar los datos")
           }
       }, {metodo:"post", datos:{
               name:jQuery("[name=name]").val(), 
               apellidos:jQuery("[name=apellidos]").val(),
               csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()
           }
       });
    });
    
    jQuery("[name=cambiarpass]").click(function(){
        var contr1 = jQuery("[name=pass]").val();
        var contr2 = jQuery("[name=passconfirm]").val();
        if (contr1 != contr2) {
            alert("Contraseñas no coinciden");
            jQuery("[name=passconfirm]").val("");
            jQuery("[name=pass]").val("").focus();
            return;
        }

        var patronpass = /^(\w|\d){4,20}$/
        if (contr1.match(patronpass) == null) {
            alert("Mínimo 4 caracteres");
            jQuery("[name=passconfirm]").val("");
            jQuery("[name=pass]").val("").focus();
            return;
        }
        
        peticion("cambiarpass", function(respuesta){
            if (respuesta.error == errores.ok){
                alert("Datos cambiados")
            }else{
                alert("Los datos no se han podido cambiar")
            }           
        }, {metodo:"post", datos:{
              pass:jQuery("[name=pass]").val(),
              csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()  
        }});
        
    });
    
    peticion("actividadusuario",function(respuesta){
     		if(respuesta.error == errores.ok){
                    jQuery("#tablaactividades tbody").empty()
     			for (var i = 0; i < respuesta.actividades.length; i++){
                            var actividad = respuesta.actividades[i];
                            var input = "<tr><td>"+actividad.nombre+"</td><td>"+actividad.iva+'</td><td><span class="eliminar-actividad" id_actividad="'+actividad.id+'"> X </span></td></tr>'
                                    
                        
                            jQuery("#tablaactividades tbody").append(input);
     			}
                        jQuery(".eliminar-actividad").click(function(){
                            var yo = jQuery(this);
                           peticion("eliminaractividad", function(respuesta){
                               yo.closest("tr").fadeOut("slow", function(){
                                   jQuery(this).remove()
                               })
                               
                           }, {metodo: "post", datos:{
                                   id: yo.attr("id_actividad"),
                                   csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()  
                           }}) 
                        });
     		}
            });
});
