app.factory('sales', ['$http', function($http) {

  var salesService = {
    mode: 'Sales',

    // init sales collection with new values
    //we get back an array of 2496 objects. 52 weeks * 3 products * 8 neighborhoods * 2 Channels
    getSales: function(prefs) {

      //every variable is true WHEN there IS the attribute (default is no attribute and means -->ALL) && that attribue is NOT ALL ===> then it is custom
      //if a true then CUSTOM PRODUCTS
      var a = (prefs.prods && prefs.prods.length !== 3);
      //if b true then CUSTOM NEIGHBORHOODS
      var b = (prefs.neighborhoods && prefs.neighborhoods.length !== 8);
      //if c true then CUSTOM CHANNELS
      var c = (prefs.channel && prefs.channel !== "Both");
      //if d true then CUSTOM DATES
      var d = (prefs.dates && prefs.dates !== "All");


      if (!(a || b || c || d)) {
      //(0 custom, 4 'all')
      // console.log('we are in situation ALL is ALL!');

      return $http.get('/sales');

      } else if (a && b && c && d) {
      //(4 custom, 0 'all')
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.neighborhoods + ',' + prefs.channel + ',' + prefs.dates + ',' + pref.prods.length + ',' + prefs.neighborhoods.length + ',' + 1);

      } else if (a && c && d) {
      //(3 custom, 1 'all') - Customized: Products AND Channels AND Dates ------- ALL: Neighborhoods
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.channel + ',' + prefs.dates + ',' + prefs.prods.length + ',' + 2);

      } else if (b && c && d) {
      //(3 custom, 1 'all') - Customized: Neighborhoods AND Channels AND Dates ------- ALL: Products
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.neighborhoods + ',' + prefs.channel + ',' + prefs.dates + ',' + prefs.neighborhoods.length + ',' + 3);

      } else if (a && b && d) {
      //(3 custom, 1 'all') - Customized: Products AND Neighborhoods AND Dates ------- ALL: Channels
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.neighborhoods + ',' + prefs.dates  + ',' + prefs.prods.length + ',' + prefs.neighborhoods.length + ',' + 4);

      } else if (a && b && c) {
      //(3 custom, 1 'all') - Customized: Products AND Neighborhoods AND Channels ------- ALL: Dates
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.neighborhoods + ',' + prefs.channel  + ',' + prefs.prods.length + ',' + prefs.neighborhoods.length + ',' + 5);

      } else if (a && b) {
      //(2 custom, 2 'all') - Customized: Products AND Neighborhoods ------- ALL: Dates, Channels
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.neighborhoods  + ',' + prefs.prods.length + ',' + prefs.neighborhoods.length + ',' + 6);

      } else if (a && c) {
      //(2 custom, 2 'all') - Customized: Products AND Channels ------- ALL: Neighborhoods AND Dates
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.channel + ',' + prefs.prods.length + ',' + 7);

      } else if (a && d) {
      //(2 custom, 2 'all') - Customized: Products AND Dates ------- ALL: Neighborhoods AND Channels
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.dates  + ',' + prefs.prods.length + ',' + 8);

      } else if (b && c) {
      //(2 custom, 2 'all') - Customized: Neighborhoods AND Channels ------- ALL: Products AND Dates
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);


      return $http.get('/sales/' + prefs.neighborhoods + ',' + prefs.channel + ',' + prefs.neighborhoods.length + ',' + 9);

      } else if (b && d) {
      //(2 custom, 2 'all') - Customized: Neighborhoods AND Dates ------- ALL: Products AND Channels
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.neighborhoods + ',' + prefs.dates  + ',' + prefs.neighborhoods.length + ',' + 10);

      } else if (c && d) {
      //(2 custom, 2 'all') - Customized: Channels AND Dates ------- ALL: Neighborhoods AND Products
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.channel + ',' + prefs.dates + ',' + 11);

      } else if (a) {
      //(1 custom, 3 'all') - Customized: Products ------- ALL: Neighborhoods AND  Channels AND Dates
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.prods + ',' + prefs.prods.length + ',' + 12);

      } else if (b) {
      //(1 custom, 3 'all') - Customized: Neighborhoods ------- ALL: Products AND Channels AND Dates
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.neighborhoods + ',' + prefs.neighborhoods.length + ',' + 13);

      } else if (c) {
      //(1 custom, 3 'all') - Customized: Channels ------- ALL: Neighborhoods AND Products AND Dates
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.channel + ',' + 14);

      } else if (d) {
      //(1 custom, 3 'all') - Customized: Dates ------- ALL: Neighborhoods AND Products AND Channels
      // console.log('we are inside a specific situation:');
      // console.log('a is: ' + a + ', b is: ' + b + ', c is: ' + c + ' and d is: ' + d);

      return $http.get('/sales/' + prefs.dates + ',' + 15);

      } else {
      //(0 custom, 4 'all') - Covered it 1st
        console.log ('I should NEVER get in here! :)');
      }

  	},


    getRawHistory: function(){
      return $http.get('/history');
    },

    getPrice: function () {
      return $http.get('/revenue');
    },

    revenueSales: function (x) {
      if (x === 'Sales') {
        salesService.mode = 'Sales';
      } else {
        salesService.mode = 'Revenue';
      }
    }


  };

  return salesService;

}]);