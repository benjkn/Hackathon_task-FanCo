var app = angular.module('fanco', ['nvd3','ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('home', {
  		url: '/home',
  		templateUrl: 'templates/home.html'
  	})

    // .state('filter', {
    //   url: '/home/:filter',
    //   templateUrl: function ($stateParams){
    //     console.log($stateParams)
    //     return 'templates/' + $stateParams.filter + '.html';
    //   }
    // })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'authCtrl'
    })

    .state('home.totalSales', {
      url: '/totalSales',
      views: {
        '': {templateUrl: 'templates/totalSales.html'},
        'middleright@home.totalSales': {templateUrl: 'templates/piechart.html'},
        'middleleft@home.totalSales': {templateUrl: 'templates/barchart.html'},
        'bottom@home.totalSales': {templateUrl: 'templates/donutchart.html'}

      }
    })

    .state('home.byProduct', {
      url: '/byProduct',
      templateUrl: 'templates/byProduct.html',
      controller: 'salesCtrl'
    })

    .state('home.byNeighborhood', {
      url: '/byNeighborhood',
      templateUrl: 'templates/byNeighborhood.html',
      controller: 'salesCtrl'
    })

    // .state('piechart', {
    //   url: '/home/totalSales/piechart',
    //   templateUrl: 'templates/piechart.html'
    // })

    // .state('barchart', {
    //   url: '/home/totalSales/barchart',
    //   templateUrl: 'templates/barchart.html'
    // })

    // .state('donutchart', {
    //   url: '/home/totalSales/donutchart',
    //   templateUrl: 'templates/donutchart.html'
    // })

  	.state('forecast', {
  		url: '/forecast',
  		templateUrl: 'templates/forecast.html',
  		controller: 'ForecastCtrl'
  	});

	$urlRouterProvider.otherwise('login');
}]);