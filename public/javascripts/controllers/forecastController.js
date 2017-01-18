app.controller("ForecastCtrl", ["$scope", "forecast", function ($scope, forecast) {

// forecast.sendAlert();
	//needs format
	var formatTime = d3.time.format("%c");

	$scope.today = formatTime(new Date());

	forecast.getForecast().then(function (data) {
		console.log(data);
		var forecastLive = data.data.list;
		$scope.info = [];

		for (var i = 1; i < forecastLive.length; i++) {
			obj = {
				weather: forecastLive[i].weather[0].description,
				date: (new Date(forecastLive[i].dt * 1000) + 10).slice(0, 11)
			};
			if (new Date(forecastLive[i].dt * 1000) > new Date()) {
				$scope.info.push(obj);
			}
		}

		for (j = 0; j < $scope.info.length; j++) {
			if (($scope.info[j].weather.indexOf('rain') > 0) || ($scope.info[j].weather.indexOf('snow') > 0)) {
				// the ones containing 'rain' and 'snow'
				// console.log('heeeeeellllllloooooo' + i);
			}
			// console.log('on ' + $scope.info[j].date + ' the weather will be f**ing be ' + $scope.info[j].weather);
		}

		//send sms alert
		// forecast.sendAlert();
		// console.log($scope.info);
	});



//=====================SMS ALERTS ================
	//add phone number

	$scope.addPhone = function(name,phone) {

	    forecast.create({
	      name: name,
	      phone: phone
	    });

	    console.log(name + phone);
	    $scope.name = '';
	    $scope.phone = '';

	};

//=====================SMS ALERTS ================

	$scope.sendAlerts = function(alerts) {

		forecast.setAlert(alerts);

		$scope.alert = '';

	};


}]);

























