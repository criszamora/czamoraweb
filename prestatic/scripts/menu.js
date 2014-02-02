jQuery().ready(function(){
    jQuery(".deploy-navigation").click()
    
    jQuery("#ico6").click(function(evento){
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



