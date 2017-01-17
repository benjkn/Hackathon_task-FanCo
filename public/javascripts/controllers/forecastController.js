app.controller("ForecastCtrl", ["$scope", "forecast", function($scope, forecast) {

	//needs format
	$scope.today = new Date()

	forecast.getForecast().then(function(data){
		console.log(data);
		var forecastLive = data.data.list;
		$scope.info = [];

		for(var i = 0; i < forecastLive.length; i++) {
			obj = {
				weather: forecastLive[i].weather[0].description,
				date: (new Date(forecastLive[i].dt*1000)+10).slice(0,11)
			};
			if (new Date(forecastLive[i].dt*1000) > new Date ()) {
				$scope.info.push(obj);
			}
		}

		for (j=0; j<$scope.info.length; j++) {
			if (($scope.info[j].weather.indexOf('rain') > 0) || ($scope.info[j].weather.indexOf('snow') > 0)) {
				// the ones containing 'rain' and 'snow'
				console.log('heeeeeellllllloooooo' + i);
			}
			console.log('on ' + $scope.info[j].date + ' the weather will be f**ing be ' + $scope.info[j].weather);
		}

		console.log ($scope.info);
	});


}] );


