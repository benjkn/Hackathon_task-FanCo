app.controller('MainCtrl', ['$scope','$http', function($scope, $http){


	function getData() {
		return $http.get('/whatever').then(function(response, err) {
			if (err) {console.log(err)};
			// console.log(response.data.list);

		});
	}
	// getData();

	function getHistory() {
		return $http.get('/history').then(function(response, err) {
			if (err) {console.log(err)};
			console.log(response);

		});
	}

	getHistory();
}]);
