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
    refrescaractividades();
    
});



function refrescaractividades(){
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
                            if (confirm("¿Está seguro que quiere eliminar esta actividad?")){
                           peticion("eliminaractividad", function(respuesta){
                               yo.closest("tr").fadeOut("slow", function(){
                                   jQuery(this).remove()
                               })
                               
                           }, {metodo: "post", datos:{
                                   id: yo.attr("id_actividad"),
                                   csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()  
                           }}) 
                   }
                        });
     		}
            });
}

jQuery(function() {



    peticion("grupo", function(respuesta) {
        for (var i = 0; i < respuesta.listagrupos.length; i++) {
            jQuery("#sortable1").append('<li class="ui-state-default"><input type="hidden" name="grupoactividad" value="' + respuesta.listagrupos[i].id + '">' + respuesta.listagrupos[i].nombre + '</li>')

            jQuery("select[name=grupo]").append('<option value="'+respuesta.listagrupos[i].id +'">'+respuesta.listagrupos[i].nombre+"</option>")
        }
        jQuery("select[name=grupo]").append('<option value="-1">Nuevo Grupo</option>')
        jQuery("#sortable1").sortable({
            connectWith: ".connectedSortable",
            receive: function(event, ui) {
                jQuery(".tipoactividades span :hidden[name=grupoactividad][value=" + ui.item.find(":hidden").val() + "]").closest("span").fadeOut(function() {
                    jQuery(this).remove()
                })
            }
        }).disableSelection();
        jQuery("#sortable2").sortable({
            connectWith: ".connectedSortable",
            receive: function(event, ui) {
                peticion("actividades", function(respuesta) {
                    for (var i = 0; i < respuesta.listaactividades.length; i++) {
                        var existe = false;
                        if (jQuery("#tablaactividades tbody tr .eliminar-actividad[id_actividad="+respuesta.listaactividades[i].id+"]").size()>0){
                            continue;
                        }
                        
                        
                        jQuery(".tipoactividades").append('<span><input type="checkbox" name="tipoactividad" value="' + respuesta.listaactividades[i].id + '" class="pendiente-evento"> <input type="hidden" name="grupoactividad" value="' + respuesta.listaactividades[i].grupo + '">' + respuesta.listaactividades[i].actividad + '</span>')
                    }
                    jQuery(".pendiente-evento").click(function(){
                        var yo = jQuery(this)
                        peticion("agregaractividad", function(respuesta){
                            yo.closest("span").fadeOut("slow", function(){
                                jQuery(this).remove()
                            });
                            refrescaractividades();
                            
                        }, {metodo:"post", datos:{
                                id:yo.val(),
                                csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()
                                
                            }       
                        })
                    }).removeClass("pendiente-evento"); //elimina la clase que ya hemos marcado antes

                }, {datos: {grupo: ui.item.find(":hidden").val()}})

            }
        }).disableSelection();

    });

});