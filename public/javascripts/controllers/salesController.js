app.controller("salesCtrl", ["$scope","sales", function($scope, sales) {



// // init sales collection with new values
  // sales.getAll().then(function(response){
  //   $scope.salesData = response.data;
  // });

  $scope.getAl = function () {
   sales.getAllofThem()
  }

}] ); // end of controller






