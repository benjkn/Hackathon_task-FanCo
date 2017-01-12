var app = angular.module('fanco', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('home', {
  		url: '/home',
  		templateUrl: '/templates/home.html',
    	controller: 'MainCtrl'
  	})
  	.state('forecast', {
  		url: '/forecast',
  		templateUrl: '/templates/forecast.html',
  		controller: 'ForecastCtrl'
  		// resolve to get data on load
  		// resolve: {
  		// 	getForcastData: [function () {
  		// 		return getData();
  		// 	}]
  		// }
  	})

	$urlRouterProvider.otherwise('home');
}]);