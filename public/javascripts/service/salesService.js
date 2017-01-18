app.factory('sales', ['$http', function($http) {

  var salesService = {
    // init sales collection with new values
    //we get back an array of 2496 objects. 52 weeks * 3 products * 8 neighborhoods * 2 Channels
    getSales: function(prefs) {

      //every variable is true WHEN there IS the attribute (default is no attribute and means -->ALL) && that attribue is NOT ALL ===> then it is custom
      //if a true then CUSTOM PRODUCTS
      var a = false // (prefs.prods && prefs.prods.length !== 3);
      //if b true then CUSTOM NEIGHBORHOODS
      var b = false // (prefs.neighborhoods && prefs.neighborhoods.length !== 8);
      //if c true then CUSTOM CHANNELS
      var c = false // (prefs.channel && prefs.channel !== "Both");
      //if d true then CUSTOM DATES
      var d = false // (prefs.dates && prefs.dates !== "All");

      var prodString ='';
      var neighborhoodsString = '';

      if (a) {
      // make the array --- > string separated by +
        for (i = 0; i<prefs.prods.length-1; i++) {
          prodString += prefs.prods[i] + '+'
        }
        prodString += prefs.prods[length-1];
        console.log (prodString);
      };

      if (b) {
      // make the array --- > string separated by +
        for (j = 0; j<prefs.neighborhoods.length-1; j++) {
          neighborhoodsString += prefs.neighborhoods[j] + '+'
        }
        neighborhoodsString += prefs.neighborhoods[length-1];
        console.log (neighborhoodsString);
      }


      if (!(a || b || c || d)) {
      //(0 custom, 4 'all')
      // console.log('we are in situation ALL is ALL!');
      return $http.get('/sales');

      } else if (a && b && c && d) {
      //(4 custom, 0 'all')
      return $http.get('/sales/' + prodString + '+' + neighborhoodsString + '+' + prefs.channel + '+' + prefs.dates + '+' + pref.prods.length + '+' + prefs.neighborhoods.length + '+' + 1);

      } else if (a && c && d) {
      //(3 custom, 1 'all') - Customized: Products AND Channels AND Dates ------- ALL: Neighborhoods
      return $http.get('/sales/' + prodString + '+' + prefs.channel + '+' + prefs.dates + '+' + prefs.prods.length + '+' + 2);

      } else if (b && c && d) {
      //(3 custom, 1 'all') - Customized: Neighborhoods AND Channels AND Dates ------- ALL: Products
      return $http.get('/sales/' + neighborhoodsString + '+' + prefs.channel + '+' + prefs.dates + '+' + prefs.neighborhoods.length + '+' + 3);

      } else if (a && b && d) {
      //(3 custom, 1 'all') - Customized: Products AND Neighborhoods AND Dates ------- ALL: Channels
      return $http.get('/sales/' + prodString + '+' + neighborhoodsString + '+' + prefs.dates  + '+' + prefs.prods.length + '+' + prefs.neighborhoods.length + '+' + 4);

      } else if (a && b && c) {
      //(3 custom, 1 'all') - Customized: Products AND Neighborhoods AND Channels ------- ALL: Dates
      return $http.get('/sales/' + prodString + '+' + neighborhoodsString + '+' + prefs.channel  + '+' + prefs.prods.length + '+' + prefs.neighborhoods.length + '+' + 5);

      } else if (a && b) {
      //(2 custom, 2 'all') - Customized: Products AND Neighborhoods ------- ALL: Dates, Channels
      return $http.get('/sales/' + prodString + '+' + neighborhoodsString  + '+' + prefs.prods.length + '+' + prefs.neighborhoods.length + '+' + 6);

      } else if (a && c) {
      //(2 custom, 2 'all') - Customized: Products AND Channels ------- ALL: Neighborhoods AND Dates
      return $http.get('/sales/' + prodString + '+' + prefs.channel + '+' + prefs.prods.length + '+' + 7);

      } else if (a && d) {
      //(2 custom, 2 'all') - Customized: Products AND Dates ------- ALL: Neighborhoods AND Channels
      return $http.get('/sales/' + prodString + '+' + prefs.dates  + '+' + prefs.prods.length + '+' + 8);

      } else if (b && c) {
      //(2 custom, 2 'all') - Customized: Neighborhoods AND Channels ------- ALL: Products AND Dates
      return $http.get('/sales/' + neighborhoodsString + '+' + prefs.channel + '+' + prefs.neighborhoods.length + '+' + 9);

      } else if (b && d) {
      //(2 custom, 2 'all') - Customized: Neighborhoods AND Dates ------- ALL: Products AND Channels
      return $http.get('/sales/' + neighborhoodsString + '+' + prefs.dates  + '+' + prefs.neighborhoods.length + '+' + 10);

      } else if (c && d) {
      //(2 custom, 2 'all') - Customized: Channels AND Dates ------- ALL: Neighborhoods AND Products
      return $http.get('/sales/' + prefs.channel + '+' + prefs.dates + '+' + 11);

      } else if (a) {
      //(1 custom, 3 'all') - Customized: Products ------- ALL: Neighborhoods AND  Channels AND Dates
      return $http.get('/sales/' + prodString + '+' + prefs.prods.length + '+' + 12);

      } else if (b) {
      //(1 custom, 3 'all') - Customized: Neighborhoods ------- ALL: Products AND Channels AND Dates
      return $http.get('/sales/' + neighborhoodsString + '+' + prefs.neighborhoods.length + '+' + 13);

      } else if (c) {
      //(1 custom, 3 'all') - Customized: Channels ------- ALL: Neighborhoods AND Products AND Dates
      return $http.get('/sales/' + prefs.channel + '+' + 14);

      } else if (d) {
      //(1 custom, 3 'all') - Customized: Dates ------- ALL: Neighborhoods AND Products AND Channels
      return $http.get('/sales/' + prefs.dates + '+' + 15);

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

    }


  };

  return salesService;

}]);