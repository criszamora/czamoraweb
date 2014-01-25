// JavaScript Document

$(document).ready(function(){
	
	//WebApp open in same page.
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

	//Hide Status Bar
	setTimeout(function() { window.scrollTo(0, 1) }, 100);
	
	//Initialize the slider.
	var slider = new Swipe(document.getElementById('slider'));
	
	$('#ico1, #ico2, #ico3, #ico4, #ico5, #ico6, #ico7, #ico8, #ico9').hide();
	$('.hide-navigation').hide();
	
	$('.deploy-navigation').click(function(){
		$('#ico1').delay(100).show(200);
		$('#ico2').delay(200).show(200);
		$('#ico3').delay(300).show(200);
		$('#ico4').delay(400).show(200);
		$('#ico5').delay(500).show(200);
		$('#ico6').delay(600).show(200);
		$('#ico7').delay(700).show(200);
		$('#ico8').delay(800).show(200);
		$('.deploy-navigation').hide();
		$('.hide-navigation').show();
	});
	
	$('.hide-navigation').click(function(){
		$('#ico1').delay(800).hide(200);
		$('#ico2').delay(700).hide(200);
		$('#ico3').delay(600).hide(200);
		$('#ico4').delay(500).hide(200);
		$('#ico5').delay(400).hide(200);
		$('#ico6').delay(300).hide(200);
		$('#ico7').delay(200).hide(200);
		$('#ico8').delay(100).hide(200);
		$('.deploy-navigation').show();
		$('.hide-navigation').hide();
	});

	$('.close-notification').click(function(){$(this).parent().hide(200); return false;});
	$('.close-notification-red').click(function(){$('.red-box').hide(300); return false;});
	$('.close-notification-green').click(function(){$('.green-box').hide(300); return false;});
	$('.close-notification-blue').click(function(){$('.blue-box').hide(300); return false;});
	$('.close-notification-yellow').click(function(){$('.yellow-box').hide(300); return false;});

	$('.checkbox').click(function(){
		$(this).toggleClass('selected-checkbox');
		return false;
	});
	
	$('.checkbox2').click(function(){
		$(this).toggleClass('selected-checkbox2');
		return false;
	});
	
	$('.radiobox').click(function(){
		$(this).toggleClass('selected-radiobox');
		return false;
	});
	
	$('.radiobox2').click(function(){
		$(this).toggleClass('selected-radiobox2');
		return false;
	});

	//var myPhotoSwipe = $("#gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });

});