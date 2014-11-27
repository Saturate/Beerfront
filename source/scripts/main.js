console.log('No logic yet!');

var app = angular.module('beerApp', [
	'ngRoute',
	'appControllers',
	'appServices'
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
      when('/events', {
        templateUrl: 'templates/events.html',
        controller: 'EventsList'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);


app.config(['$httpProvider', function($httpProvider) { // coniguring the httpProvider
    $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'WuZzWkRiJBxrryvblJJmrTXorjXrse98'; // add the application key
    $httpProvider.defaults.headers.common['Content-Type'] = 'Application/json';
}]);