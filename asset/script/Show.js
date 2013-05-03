define( function(require, exports, module){
	function showRealTime(){
		var info;
		// 实现多态  有参数  说明是刚在线获取的
		if( arguments[0] ){
			info = arguments[0];
		}
		// 没有参数，说明需要从本地存储中读取
		else{
			try{
				info = window.localStorage.realTime;
			}
			catch(err){
				console.log('读取本地存储的实时天气信息出现错误:' + err);
				// 不允许出现循环依赖  所以在show的时候如果出现问题就直接trigger 刷新
				$('#refrash').trigger('tap');
			}
		}

	}

	function showSixDays(){
		var info;
		// 实现多态  有参数  说明是刚在线获取的
		if( arguments[0] ){
			info = arguments[0];
		}
		// 没有参数，说明需要从本地存储中读取
		else{
			try{
				info = window.localStorage.sixDays;
			}
			catch(err){
				console.log('读取本地存储的六天天气信息出现错误:' + err);
				// 不允许出现循环依赖  所以在show的时候如果出现问题就直接trigger 刷新
				$('#refrash').trigger('tap');
			}
		}
	}


	exports.realTime = showRealTime;
	exports.sixDays = showSixDays;
})