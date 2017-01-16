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

	/*var temporary =[];
	$scope.forecastData = [];


	$scope.gettheforecast = function () {
		forecast.getForecast().then(function (hello) {
			temporary = hello.data;
		for (i=0; i<temporary.length; i++) {
			console.log (temporary[i].dt);
			console.log (temporary[i].day);

			obj = {
				date: new Date(temporary[i].dt),
				temp: Math.round((temporary[i].day-273.15)*100)/100
			};
			$scope.forecastData.push(obj);
		}
		});
		console.log($scope.forecastData);
	};
*/

}] );


