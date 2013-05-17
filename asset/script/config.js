define(function( require, exports, module){
	var serverUrl = 'http://sunny.chenllos.com/w';
	var config = {
		// serverUrl: 'http://192.168.0.102:8080',
		realTimeUrl: serverUrl + '?type=rt',
		sizDaysUrl: serverUrl + '?type=sd'
	}

	module.exports = config;

})