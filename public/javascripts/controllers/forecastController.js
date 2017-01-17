app.controller("ForecastCtrl", ["$scope", "forecast", function($scope, forecast) {

	//needs format
	$scope.today = new Date();

	forecast.getForecast().then(function(data){
		console.log(data);
		var forecastLive = data.data.list;
		$scope.info = [];

		for(var i = 0; i < forecastLive.length; i++) {
			obj = {
				weather: forecastLive[i].weather[0].description,
				date: (new Date(forecastLive[i].dt*1000)+10).slice(0,11),
				temp: Math.round((forecastLive[i].temp.day-273.15)*100)/100
			};
			if (new Date(forecastLive[i].dt*1000) > new Date ()) {
				$scope.info.push(obj);
			}
		}

		for (j=0; j<$scope.info.length; j++) {
			if (($scope.info[j].weather.indexOf('rain') > -1) || ($scope.info[j].weather.indexOf('snow') > -1) || $scope.info[j].temp > 20) {
				// the ones containing 'rain' and 'snow'
				console.log('heeeeeellllllloooooo' + j);
			}
			console.log('on ' + $scope.info[j].date + ' the weather will be f**ing be ' + $scope.info[j].weather);
		}

		console.log ($scope.info);
	});


}] );


