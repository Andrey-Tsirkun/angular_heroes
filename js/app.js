;var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
      .when('/ololo',{
        templateUrl:'templates/test.html',
        controller:'mainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});

app.controller('mainCtrl',[function () {

}]);
