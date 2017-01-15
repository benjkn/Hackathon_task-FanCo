app.factory('sales', ['$http', function($http) {

  var salesService = {
  	sales: [],

  	getAll: function() {
  		return $http.get('/sales');
  	}

  }; //end of salesService



  // service.gethistory = function () {
  //   console.log("inside gethistory function");
  //   return $http.get('/data/history.json');
  // };

  return salesService;

}]);