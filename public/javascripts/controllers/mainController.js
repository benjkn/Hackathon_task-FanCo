app.controller('MainCtrl', ['$scope','sales', function($scope, sales){

	$scope.preferences = {};

	// $scope.products = ['RED - SPECIAL EDITION - FanCo. Classic', 'GREEN - FanCo. Classic', 'ORANGE - FanCo. Classic', 'All'];
	// $scope.channels = ['Retail', 'Direct Sales', 'Both'];
	// $scope.neighborhoods = ['Allston', 'Back Bay', 'Charleston', 'Downtown', 'Jamaica Plain', 'North End', 'South End', 'West End', 'All'];

	// var theProds = document.getElementsByClassName('productList');
	// var theChannel = document.getElementsByClassName('channelList');
	// var theNeighborhoods = document.getElementsByClassName('neighList');
	var theDates = document.getElementsByClassName('datesPick');


	$scope.pickDate = function () {
		if (theDates[0].checked) {
			$scope.showmode = true;
		} else if (theDates[1].checked) {
			$scope.showmode = false;
			$scope.preferences.dates = 'All';
			console.log($scope.preferences);
			sales.getSales().then(function (data) {
				console.log (data.data);
			});
		}
	};

	/*$scope.getDateDetails = function (x, y) {

		startingDate = max(x, 31/5/2015)
		endingDate = min(1/6/2016, y)

		console.log(' starting date: ' + startingDate);
		console.log('ending date:' + endingDate);


		sales.getSalesByDate(startingDate, endingDate).then(function (data) {
			console.log (data.data);
		});
	}*/

}]);
