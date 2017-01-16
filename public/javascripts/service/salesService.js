app.factory('sales', ['$http', function($http) {

  var salesService = {
    weatherHistory: [],
    temporaryArray: [],
    temporaryArray2: [],
    count: 0,

    // init sales collection with new values
    //salesData is an array of 2496 objects. 52 weeks * 6 products * 8 neighborhoods * 2 Channels
  	getSales: function() {
  		return $http.get('/sales');
      // .then(function (sales) {
      //   console.log(sales.data.length);
      // })
  	},


    //finally weatherHistory is an array of 52 objects with the first day of each week in 1433019600000 format and the average temp!
    //this date format is easily comparable and can be turned into a date by new Date(1436648400000)
    getHistory: function() {
      return $http.get('/history').then(function (history) {
        salesService.temporaryArray = history.data;
        for (i=0; i<salesService.temporaryArray.length; i++) {
          if (i%7 === 0 && i>0) {
            var week = 1433019600000+(salesService.weatherHistory.length)*7*86400000;
            var temperature = (Math.round(salesService.count*100/14))/100;
            var obj = {
              temperature: temperature,
              WeekOf: week
            };
            salesService.count = 0;
            salesService.weatherHistory.push(obj);
          }
          salesService.count = salesService.count+parseInt(salesService.temporaryArray[i].maxtempC, 10)+parseInt(salesService.temporaryArray[i].mintempC, 10);
        }
        console.log(salesService.weatherHistory);
        console.log(salesService.weatherHistory.length);
      });
    },

    getAllofThem: function () {
      salesService.getHistory();
      salesService.getSales();
    },

    salesData: []


  };

  return salesService;

}]);