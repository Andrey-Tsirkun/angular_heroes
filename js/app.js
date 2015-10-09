;
var app = angular.module('myApp', ['LocalStorageModule', 'ui.router']);

app.config(function (/*$routeProvider, */localStorageServiceProvider, $stateProvider, $urlRouterProvider) {
  localStorageServiceProvider
      .setPrefix('hero')
      .setStorageType('localStorage');

  $stateProvider
      .state('home', {
        url: '/home',
        views: {
          '': {
            templateUrl: '/app/partials/home/home.html'
          }/*,
          'heroView@home': {
            templateUrl: '/app/partials/home/partials/hero_view.html'
          }
          'newsFeed@home': {
            template: '666'
          }*/
        }
      })
      .state('home.heroDetails', {
        url: "/home/:heroId",
        templateUrl: '/app/partials/home/partials/hero_view.html',
        directive: 'hero_viewDirective'
      })
      .state('/registration', {
        url: '/registration',
        templateUrl: '/app/partials/registration/registration.html',
        controller: 'registrationCtrl'
      })
      .state('/login', {
        url: '/login',
        templateUrl: '/app/partials/login/login.html',
        controller: 'loginCtrl'
      })
      .state('/add_hero', {
        url: '/add_hero',
        templateUrl: '/app/partials/add_hero/add_hero.html',
        controller: 'add_heroCtrl'
      });

      $urlRouterProvider.otherwise('/home'); // Need to refactor
});

app.controller('mainCtrl', ['$scope', 'dataFactory', function ($scope, dataFactory) {
  $scope.loggedIn = !!dataFactory.getAll('current_user');
  $scope.logout = function () {
    dataFactory.setCurrentUser(null);
    $scope.loggedIn = false;
    //$scope.$apply();
  };
}]);
