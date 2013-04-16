var userAgent = navigator.userAgent;
userAgent ={
}

function isiDevice( userAgent ){
	var ua = userAgent.toLowerCase();
	if( ua.indexOf('iphone') || ua.indexOf('ipad') )
	return os;
}

function checkBrowser(){
	
}

$(document).ready(function(){
	var $section = $('section');
	var article = $('article').get(0);

	var sCoordinate = {}, eCoordinate = {};

	$section.hammer().on('dragstart', function( event ){
		event.gesture.preventDefault()
		sCoordinate.x = event.gesture.deltaX;
		sCoordinate.y = event.gesture.deltaY;
	});
	
	$section.hammer().on('dragend', function( event ){
		eCoordinate.x = event.gesture.deltaX;
		eCoordinate.y = event.gesture.deltaY;
		if(eCoordinate.x - sCoordinate.x > 30){
			$section.addClass('activeAside');
			return false;
		}

		if( eCoordinate.x - sCoordinate.x < 0 ){
			$section.removeClass('activeAside');
			return false;
		}
	});

	$section.hammer().on('tap', function(event){
		 if( $section.hasClass('activeAside') ){
		 	$section.removeClass('activeAside');
		 	return false;
		 }
	})

	$.get()
	
});

window.onload = function(){

}

