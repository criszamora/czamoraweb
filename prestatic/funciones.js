function peticion(accion, funcionrespuesta, opciones){
	var url = "/";
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