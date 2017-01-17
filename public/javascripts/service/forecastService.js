app.factory('forecast', ['$http', function($http) {

  var forecastService = {

  	getForecast: function() {
  		// console.log('getting here');
  		return $http.get('/forecast');
  	}


  };

  return forecastService;

}]);