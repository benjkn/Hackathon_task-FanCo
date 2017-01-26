app.controller("ForecastCtrl", ["$scope", "forecast", function ($scope, forecast) {


	var formatTime = d3.time.format("%c");

	$scope.today = formatTime(new Date());

	forecast.getForecast().then(function (data) {
		var forecastLive = data.data.list;
		$scope.info = [];

		for (var i = 1; i < forecastLive.length; i++) {
			obj = {
				weather: forecastLive[i].weather[0].description,
				date: (new Date(forecastLive[i].dt * 1000) + 10).slice(0, 11),
				temp: Math.round((forecastLive[i].temp.day-273.15)*100)/100
			};
			if (new Date(forecastLive[i].dt * 1000) > new Date()) {
				$scope.info.push(obj);
			}
		}

			// if today there is NO snow, NO rain AND OVER 20 degrees celcius ===> send a message
			if (!($scope.info[0].weather.indexOf('rain') > 0) || ($scope.info[0].weather.indexOf('snow') > 0)  && $scope.info[0].temp >20) {
				//At 8 in the morning UTC (=10 in Israel) send a message
				if (new Date().getUTCHours() === 8 && new Date().getMinutes() === 0 && new Date().getSeconds() === 0) {
					var message = 'Today is a good day!!! :) Go out to sell fans! There will be no rain, no snow and the temperature will be: ' + $scope.info[0].temp
					forecast.setAlert(message);
				}
			}


	});



//=====================SMS ALERTS ================
	//add phone number

	$scope.addPhone = function(name,phone) {

	    forecast.create({
	      name: name,
	      phone: phone
	    });

	    // console.log(name + phone);
	    $scope.name = '';
	    $scope.phone = '';

	};

	//send alerts
	$scope.sendAlerts = function(alerts) {

		forecast.setAlert(alerts);

		$scope.alert = '';

	};


}]);

























