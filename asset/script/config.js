define(function( require, exports, module){
	var serverUrl = 'http://192.168.0.102:8080';
	var config = {
		// serverUrl: 'http://192.168.0.102:8080',
		realTimeUrl: serverUrl + '?get=realtime',
		sizDaysUrl: serverUrl + '?get=sizdays'
	}

	module.exports = config;

})