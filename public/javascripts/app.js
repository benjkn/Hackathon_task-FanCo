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
        'middleright@home.totalSales': {templateUrl: 'templates/donutchart.html'},
        'middleleft@home.totalSales': {templateUrl: 'templates/piechart.html'},
        'bottom@home.totalSales': {templateUrl: 'templates/barchart.html'}
      }
    })

    .state('home.byProduct', {
      url: '/byProduct',
      views: {
        '': {templateUrl: 'templates/byProduct.html'},
        'middleright@home.byProduct': {templateUrl: 'templates/donutchart.html'},
        'middleleft@home.byProduct': {templateUrl: 'templates/piechart.html'},
        'top@home.byProduct': {templateUrl: 'templates/barchart.html'}
      }
    })

    .state('home.byChannel', {
      url: '/byChannel',
      views: {
        '': {templateUrl: 'templates/byChannel.html'},
        'middleright@home.byChannel': {templateUrl: 'templates/donutchart.html'},
        'middleleft@home.byChannel': {templateUrl: 'templates/piechart.html'},
        'top@home.byChannel': {templateUrl: 'templates/barchart.html'}
      }
    })

    .state('home.byNeighborhood', {
      url: '/byNeighborhood',
      views: {
        '': {templateUrl: 'templates/byNeighborhood.html'},
        'middleright@home.byNeighborhood': {templateUrl: 'templates/donutchart.html'},
        'middleleft@home.byNeighborhood': {templateUrl: 'templates/barchart.html'},
        'top@home.byNeighborhood': {templateUrl: 'templates/piechart.html'}
      }
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

  	.state('home.forecast', {
  		url: '/forecast',
  		templateUrl: 'templates/forecast.html',
  		controller: 'ForecastCtrl'
  	});

	$urlRouterProvider.otherwise('login');
}]);