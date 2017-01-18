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

  	sendAlert: function() {
  		return $http.get('/alert');
  	}


  };

  return forecastService;

}]);