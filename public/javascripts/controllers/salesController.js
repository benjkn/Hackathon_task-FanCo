app.controller("salesCtrl", ["$scope","sales", function($scope, sales) {


  $scope.getAl = function () {
   sales.getAllofThem();
  };

}] );