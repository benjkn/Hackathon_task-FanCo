app.controller('MainCtrl', ['$scope','sales', function($scope, sales){

	$scope.pickDate = function (x) {
		if (x === 'Custom') {
			$scope.showmode = true;
		} else {
			$scope.showmode = false;
			sales.getSales().then(function (data) {
				console.log (data.data);
			});
		}
	};


	$scope.getDateDetails = function (x, y) {
		// if ending date is before the starting date
		if (y < x) {
			alert ('check the dates again!')
		} else {
			x = JSON.stringify(x).slice(1, 11)
			y = JSON.stringify(y).slice(1, 11)

			//If the user gives dates out of the limits we set min and max
			if (x < '2015-05-31') {
				var startingDate = '2015-05-31'
			} else {
				var startingDate = x
			}

			if (y > '2016-06-01') {
				var endingDate = '2016-06-01'
			} else {
				var endingDate = y
			}

			console.log('starting date: ' + startingDate);
			console.log('ending date: ' + endingDate);


			//returning empty array =========================================================================
			sales.getSalesByDate(startingDate, endingDate).then(function (data) {
				console.log (data.data);
			});
		}

	}

}]);
