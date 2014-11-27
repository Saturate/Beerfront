var appControllers = angular.module('appControllers', []);

appControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
  }]);

appControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);




appControllers.controller('Events', ['$scope', 'Events', function($scope, Events) {
  $scope.events = Events.query();
  console.log($scope.events);
}]);