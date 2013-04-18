define( function(require, exports, module){
	var config = require('./config');

	// 这里传输一个时间戳，但是这个时间戳并不精准，它是客户端系统的时间，不是网络时间

	function atO( cityId ){
		var param = {
			cityId: cityId,
			senttime: (new Date()).valueOf()
		}
		$.get( config.serverUrl + '/atO', param, function( data, status){
			return data;
		})
	}

	function sixDays( cityId ){
		var param = {
			cityId: cityId,
			senttime: (new Date()).valueOf()
		}
		$.get( config.serverUrl + '/sizDays', param, function( data, status){
			return data;
		})
	}

	exports.atO = atO;
	exports.sixDays = sixDays;
})