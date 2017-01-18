app.controller('MainCtrl', ['$scope','sales', function($scope, sales){

	$scope.preferences = {};

	// $scope.products = ['RED - SPECIAL EDITION - FanCo. Classic', 'GREEN - FanCo. Classic', 'ORANGE - FanCo. Classic', 'All'];
	// $scope.channels = ['Retail', 'Direct Sales', 'Both'];
	// $scope.neighborhoods = ['Allston', 'Back Bay', 'Charleston', 'Downtown', 'Jamaica Plain', 'North End', 'South End', 'West End', 'All'];

	// var theProds = document.getElementsByClassName('productList');
	// var theChannel = document.getElementsByClassName('channelList');
	// var theNeighborhoods = document.getElementsByClassName('neighList');
	var theDates = document.getElementsByClassName('datesPick');

/*	$scope.pickProducts = function (prod) {
		var prodcounter = 0;
		var productSelected = [];
		for (i=0; i<theProds.length-1; i++) {
			if (theProds[i].checked) {
				prodcounter += 1
				productSelected.push($scope.products[i])
			}
		}

		if (prod.$index === 3) {
			var productSelected = [];
			if (theProds[3].checked) {
				for (i=0; i<theProds.length-1; i++) {
					theProds[i].checked = theProds[3].checked
					productSelected.push($scope.products[i])
				}
			} else {
				for (i=0; i<theProds.length-1; i++) {
					theProds[i].checked = theProds[3].checked
				}
			}
		} else if (prodcounter === 3) {
			theProds[3].checked = true
		} else {
			theProds[3].checked = false
		}
		// RESULT:
		$scope.preferences.prods = productSelected;
		console.log($scope.preferences);
		sales.getSales($scope.preferences).then(function (data) {
			console.log (data.data);
		});
	};

	$scope.pickChannel = function () {
		for (j=0; j<$scope.channels.length; j++) {
			if (theChannel[j].checked) {
				var channelSelected = theChannel[j].value;
			}
		}
		// RESULT:
		$scope.preferences.channel = channelSelected;
		console.log($scope.preferences);
		sales.getSales($scope.preferences).then(function (data) {
			console.log (data.data);
		});
	};

	$scope.pickNeighborhoods = function (neigh) {
		var neighcounter = 0;
		var neighborhoodSelected = [];

		for (y=0; y<theNeighborhoods.length-1; y++) {
			if (theNeighborhoods[y].checked) {
				neighcounter +=1
				neighborhoodSelected.push($scope.neighborhoods[y])
			}
		}

		if (neigh.$index === 8) {
			neighborhoodSelected = []
			if (theNeighborhoods[8].checked) {
				for (y=0; y<theNeighborhoods.length-1; y++) {
					theNeighborhoods[y].checked = theNeighborhoods[8].checked
					neighborhoodSelected.push($scope.neighborhoods[y]);
				}
			} else {
				for (y=0; y<theNeighborhoods.length-1; y++) {
					theNeighborhoods[y].checked = theNeighborhoods[8].checked
				}
			}
		} else if (neighcounter === 8) {
			theNeighborhoods[8].checked = true;
		} else {
			theNeighborhoods[8].checked = false;
		}
		// RESULT:
		$scope.preferences.neighborhoods = neighborhoodSelected;
		console.log($scope.preferences);
		sales.getSales($scope.preferences).then(function (data) {
			console.log (data.data);
		});
	};*/

	$scope.pickDate = function () {
		if (theDates[0].checked) {
			$scope.showmode = true;
		} else if (theDates[1].checked) {
			$scope.showmode = false;
			$scope.preferences.dates = 'All';
			console.log($scope.preferences);
			sales.getSales($scope.preferences).then(function (data) {
				console.log (data.data);
			});
		}
	};

	$scope.getDateDetails = function (x, y) {

		startingDate = max(x, 31/5/2015)
		endingDate = min(1/6/2016, y)






				//i stoppped here






		$scope.preferences.dates = theDates[1].value;
		console.log($scope.preferences);
		sales.getSales($scope.preferences).then(function (data) {
			console.log (data.data);
		});
	}

}]);
