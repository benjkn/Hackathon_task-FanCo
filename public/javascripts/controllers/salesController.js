app.controller("salesCtrl", ["$scope","sales", function($scope, sales) {

	var selectedStyle = 'border: 2px solid grey; font-weight: bold';
  var notSelectedStyle = 'border: 0.5px solid grey; font-weight: normal';
  $scope.sstyle = selectedStyle;
  $scope.rstyle = notSelectedStyle;

	$scope.revenueSales = function(x) {
		if (x === 'Sales') {
      $scope.sstyle = selectedStyle
      $scope.rstyle = notSelectedStyle
    } else {
      $scope.sstyle = notSelectedStyle
      $scope.rstyle = selectedStyle
      }
		sales.revenueSales(x);
	}

}]);