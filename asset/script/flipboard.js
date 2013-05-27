$(document).ready( function(){
	//初始背景图
	var scs = $('section');
	for(var i=0, len = scs.length; i< len; i++){
		scs[i].style.backgroundImage = 'url(./asset/img/weather_'+ (i+1) + '.jpg)';
		// scs[i].style.backgroundImage = 'url(./asset/img/setting.png)';
	}

	// 初始化z-index
	var arts = $('article');
	var floors = 10000;
	for(var i=0, len = arts.length; i< len; i++){
		arts[i].style.zIndex = 10000 - i*20;
		arts[i].className = 'up';
		// arts[i].className = 'down';
		console.log()
	}

	// 现在的架构还需要修改一下
	// 比如 dragend和drag的Yrange应该是不一样的, 向上drag一点就end也应该翻页
	// 而一直drag的话  就应该drag很多才到头
	// 总之,尽量达到flipboard的流畅度和手感
	// 先有多page(翻页的逻辑  需要再增加)  再有动态载入
	// 动态的```有难度啊  数据加载  
	$(document).hammer().on('drag', function( event ){
		event.gesture.preventDefault();
	});

	var YEndRange = 120;
	var YDragRange = 400;
	var sCoord = {};
	var eCoord = {};
	var stID;
	var ele2trans = null;

	$(document).hammer().on('dragstart',function( e ){
		sCoord.x = e.gesture.deltaX;
		sCoord.y = e.gesture.deltaY;
	});


	$(document).hammer().on('drag',function( e ){
		// 获得要操作的对象
		if( ele2trans ===null ){
			getEle2Trans( e );
		}
		changeTrans( e );
	});

	$(document).hammer().on('dragdown',function( e ){
		// console.log( '会不会改变方向呢?');
		// 会的```
	});

	$(document).hammer().on('dragend',function( e ){
		// clearTimeout( stID );
		chkWhileEnd( e );
		// 将ele2trans置为null
		ele2trans = null;
	});



	function changeTrans( e ){
		if( isBackOverDo(e) ){

		}
		else{
			var deltaY = e.gesture.deltaY;
			var deltaX = e.gesture.deltaX;
			if( Math.abs(deltaX) < Math.abs(deltaY) ){
				if( Math.abs(deltaY) <= YDragRange ){
					// var amount = -deltaY/YDragRange*180;
					var amount = Math.abs( deltaY/YDragRange*180 );
					rotateAcDv( amount );
				}
			}
		}
	}

	function chkWhileEnd( e ){
		var deltaY = e.gesture.deltaY;
		var deltaX = e.gesture.deltaX;

		ele2trans.css('webkitTransition', 'all 200ms ease-out');
		if( Math.abs( deltaX/deltaY ) < 1 ){
			if( isBackOverDo(e) ){
				gotoTerminalByClass();
			}
			else{
				if( Math.abs(deltaY) > YEndRange ){
					gotoTerminalByClass();
				}
				else{
					gotoOriginByClass();
				}
			}
		}
	}

	function rotateAcDv( amount ){
		var transV;
		if( ele2trans.hasClass('up') ){
			transV = 'rotateX(' + amount + 'deg)';
		}
		else{
			transV = 'rotateX(' + ( 180-amount ) + 'deg)';
		}
		ele2trans.css('webkitTransform', transV);
		// console.log( ele2trans.css('webkitTransform') );
	}


	function getEle2Trans( e ){
		// 如果没有要操作的对象
		if( e.gesture.direction === 'up'){
			ele2trans = $('article.up').eq(0);
		}
		else if( e.gesture.direction === 'down' ){
			ele2trans = $('article.down').eq(-1);
		}
		// 设置temp--zindex  使之在最前
		ele2trans.attr('data-oldzindex', ele2trans.css('zIndex'));
		ele2trans.css('zIndex','12000');
	}

	/*
	 * 判断是否是"做过分了"
	 * 因为在drag的过程中,也是可以改变方向的
	 * 在这里我们设定article的类名,up代表可以向上的节点   down代表可以向下的节点(当然会发生改变的)
	 * 如果一个用户向下drag,这是我们操作的对象应该是article.down的索引为-1的节点,
	 * 而这个用户手贱的改变了方向,向上了,我们可以通过getEle2Trans和非null获得正确的ele2trans
	 * 而在结束的时候,就要看起点和终点了,如果操作的元素是down,而最终的y坐标却大于始Y坐标 那就说明是isBackOverdo
	 * 
	 */
	function isBackOverDo( e ){
		// console.log( 'ele的类名是:  ' + ele2trans.attr('class') + ';   ' + '而deltaY是:   ' +e.gesture.deltaY );
		// 本来要操作的是要 向上 的ele
		if( ele2trans.hasClass('up') ){
			// 向上的deltaY 应该是负的
			if( e.gesture.deltaY > 0 ){
				// 结果确实正的  说明是改变了方向  而且还超过了
				return true;
			}
		}
		else if( ele2trans.hasClass('down') ){
			if( e.gesture.deltaY < 0 ){
				return true;
			}
		}
	}


	/* 下面的两个函数有点奇葩哈:  回到起点和去到终点,传递的amount是"距离/Ydragrange*180", 而究竟是向上保持0度 还是保持180度,就由 rotateAcDv 封装好了
	 * 同时需要注意的是,在trans的过程中给他付了一个较大的z-index,此时需要改回来
	 * toOrigin  改回原来的
	 * toTerminal 改成变换位置之后不被覆盖的值
	 */ 
	function gotoOriginByClass(){

		var oldzindex = ele2trans.attr('data-oldzindex');
		ele2trans.css('zIndex', oldzindex );
		rotateAcDv(0);
	}

	function gotoTerminalByClass(){
		rotateAcDv(180);
		var oldzindex = ele2trans.attr('data-oldzindex');
		ele2trans.css('zIndex', (10000 - oldzindex).toString() );
		
		// ele2trans.toggleClass('down up');
		if( ele2trans.hasClass('up') ){
			ele2trans.attr('class','down');
		}
		else{
			ele2trans.attr('class','up');
		}
	}

	// 可以通过deltaY获得方向 或者说位移,那么
})