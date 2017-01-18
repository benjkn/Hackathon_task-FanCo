app.factory('forecast', ['$http', function($http) {


  var forecastService = {

  	getForecast: function() {
  		// console.log('getting here');
  		return $http.get('/forecast');
  	},

  	create: function(phone) {
  		return $http.post('/phones', phone).then(function(data){
  			console.log(data);
  		});
  	},

  	setAlert: function(text) {
  		////============================= twilio =====================================
  		return $http.get('/alert/' + text);

  	}


	  		//get list of registered phones
	  		//get phones from mongo
			// var phones = [{phone:'+972542643440'}, {phone:'+972584219694'}];
			//loop through the list and send sms





//============================= twilio =====================================




  };


  return forecastService;

}]);