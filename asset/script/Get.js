define( function(require, exports, module){
	var config = require('./config');
	var Show = require('./Show');


	// 这里传输一个时间戳，但是这个时间戳并不精准，它是客户端系统的时间，不是网络时间

	function refrashWeather(){
		// 判断本地天气够不够新，有没有必要发请求
		try{
			var curRealTime = JSON.parse( window.localStorage['realTime'] );
			// curRealTime.gotTime;
		}
		catch( err ){
			getRealTime();
		}

		try{
			var curSixDays = JSON.parse( window.localStorage['realTime'] );
			// if( getSixDays.gotDate )
		}
		catch( err ){
			// getSixDays();
		}
	}

	function getRealTime( cityId ){
		var param = {
			cityid: '101010100',
			senttime: (new Date()).valueOf()
		}
		$.get( config.realTimeUrl, param, function( data, status){
			console.log( data );
			// ajaxHandler( data, status, Show.realTime , failF );
			return false;
		})
	}

	function getSixDays( cityId ){
		var param = {
			cityid: cityId,
			senttime: (new Date()).valueOf()
		}
		$.get( config.sizDaysUrl, param, function( data, status){
			ajaxHandler( data, status, Show.sixDays , failF );
			return false;			
		})
	}

	function ajaxHandler( data, status, sucF, failF ){
		if( status === 'success' ){
			if( data.err_code === '200' ){
				sucF( data );
			}else{
				failF( data );
			}
		}
		else{

		}
	}

	function failF( data ){
		var errMap = {
			'500': '服务端出错，请稍后重试',
			'404': '找不到数据'
		}
		showTip( errMap[ data.err_code ] );
		return false;
	}

	exports.weather = refrashWeather;
	// exports.sixDays = sixDays;
})