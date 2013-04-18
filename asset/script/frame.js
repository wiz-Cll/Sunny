define(function( require, exports, module){
	var getWeather = require('./Get');
	var Show = require('./Show');

	getWeather.atO( '100010');

	$(document).ready(function(){
		$(document).hammer().on('drag', function( event ){
			event.gesture.preventDefault();
		})

		var $section = $('section');
		var article = $('article').get(0);

		var sCoordinate = {}, eCoordinate = {};

		$section.hammer().on('dragstart', function( event ){
			// event.gesture.preventDefault()
			sCoordinate.x = event.gesture.deltaX;
			sCoordinate.y = event.gesture.deltaY;
		});
		
		// run time, mains what
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

		$section.hammer().on('dragup', function(){
			article.innerHTML += 'drag driection is up';
			$section.hammer().off('dragup');
			$section.hammer().on('dragleft', function(){
				article.innerHTML += 'changed direction to left';
			})
		})
	});
})
	
