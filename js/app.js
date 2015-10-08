;
var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

app.config(function ($routeProvider, localStorageServiceProvider) {
  $routeProvider
      .when('/registration', {
        templateUrl: '/app/partials/registration/registration.html',
        controller: 'registrationCtrl'
      })
      .when('/login', {
        templateUrl: '/app/partials/login/login.html',
        controller: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  localStorageServiceProvider
      .setPrefix('hero')
      .setStorageType('localStorage')
});

app.controller('mainCtrl', ['$scope', 'dataFactory', function ($scope, dataFactory) {
  $scope.loggedIn = !!dataFactory.getAll('current_user');
  $scope.logout = function () {
    dataFactory.setCurrentUser(null);
    $scope.loggedIn = false;
    //$scope.$apply();
  };
}]);
