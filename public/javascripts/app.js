var app = angular.module('fanco', ['nvd3','ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('home', {
  		url: '/home',
  		templateUrl: 'templates/home.html',
    	controller: 'MainCtrl'
  	})
    // .state('filter', {
    //   url: '/home/:filter',
    //   templateUrl: function ($stateParams){
    //     console.log($stateParams)
    //     return $stateParams.filter + '.html';
    //   }
    // })
    // .state('login', {
    //   url: '/login',
    //   templateUrl: 'templates/login.html',
    //   controller: 'authCtrl'
    // })
    .state('home.totalSales', {
      url: '/totalSales',
      templateUrl: 'templates/totalSales.html',
      controller: 'salesCtrl'
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
  	.state('forecast', {
  		url: '/forecast',
  		templateUrl: 'templates/forecast.html',
  		controller: 'ForecastCtrl'
  	});

	$urlRouterProvider.otherwise('home/totalSales');
}]);