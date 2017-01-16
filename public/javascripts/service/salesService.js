app.factory('sales', ['$http', function($http) {


  var salesService = {
    weatherHistory: [],
    temporaryArray: [],
    count: 0,

    // init sales collection with new values
    //we get back an array of 2496 objects. 52 weeks * 3 products * 8 neighborhoods * 2 Channels
    getSales: function(prefs) {

      //every variable is true WHEN there IS the attribute (default is no attribute and means -->ALL) && that attribue is NOT ALL ===> then it is custom
      //if a true then CUSTOM PRODUCTS
      var a = (prefs.prods.length && prefs.prods.length !== 3);
      //if b true then CUSTOM NEIGHBORHOODS
      var b = (prefs.neighborhoods.length && prefs.neighborhoods.length !== 8);
      //if c true then CUSTOM CHANNELS
      var c = (prefs.channel && prefs.channel !== "Both");
      //if d true then CUSTOM DATES
      var d = (prefs.dates && prefs.dates !== "All");


      // db.products.find({$or: [{Channel: "Direct Sales"}, {Channel: "Retail"}]}).count() <--- 6

      if (!(a || b || c || d)) {
      //(0 custom, 4 'all')
        return $http.get('/sales');
      } else if (a && b && c && d) {
      //(4 custom, 0 'all')

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a && c && d) {
      //(3 custom, 1 'all') - Customized: Products AND Channels AND Dates ------- ALL: Neighborhoods

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (b && c && d) {
      //(3 custom, 1 'all') - Customized: Neighborhoods AND Channels AND Dates ------- ALL: Products

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a && b && d) {
      //(3 custom, 1 'all') - Customized: Products AND Neighborhoods AND Dates ------- ALL: Channels

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a && b && c) {
      //(3 custom, 1 'all') - Customized: Products AND Neighborhoods AND Channels ------- ALL: Dates

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a && b) {
      //(2 custom, 2 'all') - Customized: Products AND Neighborhoods ------- ALL: Dates, Channels

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a && c) {
      //(2 custom, 2 'all') - Customized: Products AND Channels ------- ALL: Neighborhoods AND Dates

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a && d) {
      //(2 custom, 2 'all') - Customized: Products AND Dates ------- ALL: Neighborhoods AND Channels

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (b && c) {
      //(2 custom, 2 'all') - Customized: Neighborhoods AND Channels ------- ALL: Products AND Dates

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (b && d) {
      //(2 custom, 2 'all') - Customized: Neighborhoods AND Dates ------- ALL: Products AND Channels

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (c && d) {
      //(2 custom, 2 'all') - Customized: Channels AND Dates ------- ALL: Neighborhoods AND Products

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (a) {
      //(1 custom, 3 'all') - Customized: Products ------- ALL: Neighborhoods AND  Channels AND Dates

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (b) {
      //(1 custom, 3 'all') - Customized: Neighborhoods ------- ALL: Products AND Channels AND Dates

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (c) {
      //(1 custom, 3 'all') - Customized: Channels ------- ALL: Neighborhoods AND Products AND Dates

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else if (d) {
      //(1 custom, 3 'all') - Customized: Dates ------- ALL: Neighborhoods AND Products AND Channels

        //Add the special params I am sending
        return $http.get('/sales' + );

      } else {
      //(0 custom, 4 'all') - Covered it 1st
        console.log ('I should NEVER get in here! :)')
      }
  	},


    //finally weatherHistory is an array of 52 objects with the first day of each week in 1433019600000 format and the average temp!
    //this date format is easily comparable and can be turned into a date by new Date(1436648400000)

    getRawHistory: function(){
      return $http.get('/history');
    },

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
        // console.log(salesService.weatherHistory);
        // console.log(salesService.weatherHistory.length);
      });
    }


  };

  return salesService;

}]);