var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Events', ['$resource',
  function($resource){
    return $resource('tables/event/:eventId', {}, {
      query: {
      	method: 'GET',
      	isArray:true
      }
    });
  }]);