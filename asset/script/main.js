define(function( require, exports, module){
	var Get = require('./Get');
	// var Show = require('./Show');



	$(document).ready( function(){
		// 主要的触摸事件的绑定
		uiInit();
		// 用户操作事件的绑定
		bindUserOp();
		// $('body').html( JSON.stringify( document.body) );
		$('section').css('height', $(document).height()+'px' );
		// alert( $(document).height() );

		$('body').show();
		// alert( $('#lb').off)

	});




	function uiInit(){
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
	}

	function bindUserOp(){
		var htSection = Hammer( $('section') );

		htSection.on('tap', function(e){


			var $target = $(e.target);

			if( $target.hasClass('disable') ){
				// do nothing
			}
			else{
				btnMoves( $target );
			}
			e.gesture.stopPropagation();

			function btnMoves( tar ){
				if( tar.hasClass('btn') ){
					switch( tar.attr('id') ){
						case 'refrash':
							// alert('gonna get new weather info...');
							var oldVal = tar.css('opacity');
							tar.css('opacity','1');
							setTimeout(function(){ tar.css('opacity', oldVal ); }, 100);
							
							Get.weather();
							break;
						default:
							alert('you taped a btn, but i don\'t know what you want me do');
							break;
					}
				}
				
				return false;
			}
		})
	}
})
	
