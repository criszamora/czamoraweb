function Init() {
    	// Ahora es seguro utilizar la API PhoneGap
    	jQuery("input[name=registrarse]").click(function(){
    	document.location.href="registro";    	
    	});
    	
    	jQuery("input[name=enviar]").click(function(){
    		
    		peticion('login', function(respuesta){
    		if (respuesta.error==0){
    			document.location.reload();
    		}else{
    			alert("login error");
    		}
    		},{datos:jQuery('#formulario').serialize(), metodo:"post"});
    	});
    
    	
    
    
	}
        
        
        jQuery(document).ready(Init);
	

