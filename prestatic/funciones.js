function getURL(){
	return  "/"; 
}



function peticion(accion, funcionrespuesta, opciones){
	var url = getURL();
	var formato = "json";
	var ruta = "ajax";
	var datos = {};
	var metodo = jQuery.get;
	
	if (opciones == undefined){
		opciones = {};
	}
	
	if ("tipo" in opciones){
			if (opciones.tipo == "text"){
				formato = "text";
				ruta = "input";
			}
		
	}
	if ("datos" in opciones){
		datos = opciones.datos;
	}
	
	if ("metodo" in opciones){
		if (opciones.metodo == "post"){
			metodo = jQuery.post;
		}
	}
	
	metodo(url+ruta+"/"+accion, datos, funcionrespuesta, formato);
}

function pedirtoken(funcionrespuesta){
	peticion("token", funcionrespuesta, {tipo:"text"});
}

function pedirnombre(){
    peticion("nombreusuario", function(respuesta){
        if (respuesta.error == errores.ok){
            jQuery(".nombre-usuario").text("Hola, "+respuesta.nombre+" "+respuesta.apellidos)
        }
        
    });
}

jQuery().ready(function(){ 
	pedirnombre()
 
     	
     	//Recogemos el token
     	
    	
    	jQuery("#ico8").click(function(evento){
        	evento.preventDefault();
        	peticion("logout", function(respuesta){
        		if (respuesta.error == errores.ok){
        			window.localStorage.removeItem("usuarioconectado");
        			window.localStorage.removeItem("usuario");
        			window.localStorage.removeItem("password");
        			document.location.href="/"
        		}
        	});
        	
        });
     	
	});