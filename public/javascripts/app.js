var app = angular.module('fanco', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('home', {
  		url: '/home',
  		templateUrl: '/templates/home.html',
      controller: 'MainCtrl'
  	})

  $urlRouterProvider.otherwise('home');
 }]);