app.controller('ForecastCtrl', ['$scope','$http', function($scope, $http){

//forecastArray contains 15 OBJECTS with date and temp!!!!!!!!!
$scope.getData = function () {
	return $http.get('/forecast').then(function(response, err) {
		if (err) {console.log(err);}
		var temporary = response.data.list
		console.log (temporary)
		$scope.forecastArray = []
		for (i=1; i<temporary.length; i++) {
			day = ((new Date(temporary[i].dt*1000))+1).slice(4, 10)
			var obj = {
				date: day,
				temp: Math.floor((temporary[i].temp.day-273.15)*100)/100
			}
			$scope.forecastArray.push(obj);
		};
	});
}

$scope.getData()

}])