
jQuery().ready(function() {



    // Ahora es seguro utilizar la API PhoneGap

    jQuery("input[name=registrar]").click(function() {
        var obligatorio = false;
        jQuery(".obligatorio").each(function() {
            if (jQuery(this).val() == "") {
                obligatorio = true;
            }
        }) //bucle de jQuery que va a iterar sobre cada elemento
        if (obligatorio) {
            alert("Todos los campos son obligatorios");
            return;
        }
        if (jQuery(":checkbox:checked[name=tipoactividad]").size() == 0) {
            alert("Hay que seleccionar al menos un tipo de actividad");
            return;
        }
        
        if (jQuery("[name=tipoactividad][value=-1]").attr("checked")){
            if (jQuery("[name=nuevaactividad]").val() == ""){
                alert("Hay que introducir una nueva actividad");
                return;
            }
            if (jQuery("select[name=grupo]").val() == "-1"){
                if (jQuery("[name=nuevogrupo]").val() == ""){
                    alert("Tiene que seleccionar un grupo");
                    return;
                }
            }
        }
        
        
        var patroncorreo = /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/
        var email = jQuery("[name=email]").val();
        if (email.match(patroncorreo) == null) {
            alert("Email no válido");
            jQuery("[name=email]").focus();
            return;
        }


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


        peticion("registrarse",
                function(respuesta) {
                    if (respuesta.error == errores.ok) {
                        alert("Usuario registrado con éxito");
                        document.location.href = "/";
                    } else if (respuesta.error == errores.datosduplicados) {
                        alert("Email ya existente");
                    } else {
                        alert("Error: " + respuesta.error);
                    }
                }, {datos: jQuery("#formulario").serialize(), metodo: "post"});

    });





//Mostramos u ocultamos la nueva actividad
            jQuery("[name=tipoactividad][value=-1]").click(function() {

                if (jQuery(this).is(":checked")) {

                    jQuery(".otra_actividad").show();
                } else {
                    jQuery(".otra_actividad").hide();
                }
            });
    //Recogemos el token

    pedirtoken(function(respuesta) {
        jQuery('#formulario').append(respuesta);
    });
    
    
    jQuery("select[name=grupo]").change(function(){
        if (jQuery(this).val()=="-1") {

                    jQuery("input[name=nuevogrupo]").show();
                } else {
                    jQuery("input[name=nuevogrupo]").hide();
                }
    });

});

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
                        jQuery(".tipoactividades").append('<span><input type="checkbox" name="tipoactividad" value="' + respuesta.listaactividades[i].id + '"> <input type="hidden" name="grupoactividad" value="' + respuesta.listaactividades[i].grupo + '">' + respuesta.listaactividades[i].actividad + '</span>')
                    }

                }, {datos: {grupo: ui.item.find(":hidden").val()}})

            }
        }).disableSelection();

    });

});