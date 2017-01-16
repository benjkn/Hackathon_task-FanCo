app.controller("ForecastCtrl", ["$scope", "forecast", function($scope, forecast) {

	var temporary =[];
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

}] );


