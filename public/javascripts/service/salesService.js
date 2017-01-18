app.factory('sales', ['$http', function($http) {

  var salesService = {
    getSales: function() {
      console.log('we are in getSales!');
      return $http.get('/sales');
  	},

    getRawHistory: function(){
      return $http.get('/history');
    },

    getPrice: function () {
      return $http.get('/revenue');
    }


  };

  return salesService;

}]);