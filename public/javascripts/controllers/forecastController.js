app.controller("ForecastCtrl", ["$scope", "forecast", function($scope, forecast) {

	$scope.info = [];


	forecast.getForecast().then(function(data){
		console.log(data);
		var forecastLive = data.data.list;

		for(var i = 0; i < forecastLive.length; i++) {

			obj = {
				weather: forecastLive[i].weather[0].description,
				date: (new Date(forecastLive[i].dt*1000)+10).slice(0,11)
			};
			$scope.info.push(obj);

			console.log('on ' + (new Date(forecastLive[i].dt*1000)) + ' the weather will be f**ing be ' + forecastLive[i].weather[0].description);

		}


	});


}] );


