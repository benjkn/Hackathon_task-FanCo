var app = angular.module('fanco', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('home', {
  		url: '/home',
  		templateUrl: '/templates/home.html',
    	controller: 'salesCtrl'
  	})
  	.state('forecast', {
  		url: '/forecast',
  		templateUrl: '/templates/forecast.html',
  		controller: 'ForecastCtrl'
  	})

	$urlRouterProvider.otherwise('home');
}]);