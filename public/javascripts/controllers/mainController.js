app.controller('MainCtrl', ['$scope','$http', function($scope, $http){

	$scope.products = ['Red', 'Green', 'Orange', 'All'];
	$scope.channels = ['Retail', 'Direct Sales', 'Both'];
	$scope.neighborhoods = ['Allston', 'Back Bay', 'Charleston', 'Downtown', 'Jamaica Plain', 'North End', 'South End', 'West End', 'All'];

	$scope.getDetails = function () {
		var selectedProds = document.getElementsByClassName('productList');
		var prodsSelected = '';

		for (i=0; i<$scope.products.length; i++) {
			if (selectedProds[i].checked) {
				prodsSelected += selectedProds[i].value + ", ";
			}
		}

		var selectedChannel = document.getElementsByClassName('channelList');
		var channelSelected = '';

		for (j=0; j<$scope.channels.length; j++) {
			if (selectedChannel[j].checked) {
				channelSelected = selectedChannel[j].value;
			}
		}

		var selectedNeighborhood = document.getElementsByClassName('neighList');
		var neighborhoodSelected = '';

		for (y=0; y<$scope.neighborhoods.length; y++) {
			if (selectedNeighborhood[y].checked) {
				neighborhoodSelected += selectedNeighborhood[y].value + ", ";
			}
		}

		var selectedDates = document.getElementsByClassName('datesPick');
		if (selectedDates[0].checked) {
			var datesSelected = selectedDates[0].value;
		} else {
			var datesSelected = selectedDates[1].value;
		}

		$scope.options = {
			prods: prodsSelected,
			channel: channelSelected,
			neighborhoods: neighborhoodSelected,
			dates: datesSelected
		};

		console.log ('The graphs data will be for: ' +  $scope.options.prods + ' sold through ' + $scope.options.channel + ', in the following neighborhoods: ' + $scope.options.neighborhoods + ' for the following dates: ' + $scope.options.dates);
	};


}]);
