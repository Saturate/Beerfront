console.log('No logic yet!');

var app = angular.module('beerApp', [
	'ngRoute',
	'appControllers'
	]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'templates/test.html'
      }).
      when('/create', {
        templateUrl: 'templates/create.html'
      }).
      when('/agree', {
        templateUrl: 'templates/agree.html'
      }).
      when('/main', {
        templateUrl: 'templates/main.html'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);