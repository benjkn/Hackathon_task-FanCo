app.factory('forecast', ['$http', function($http) {

  var forecastService = {

  	getForecast: function() {
  		return $http.get('/forecast');
  	}


  }; //end of salesService


  return forecastService;

}]);