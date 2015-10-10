;
var app = angular.module('myApp', ['LocalStorageModule', 'ui.router']);

app.config(function (/*$routeProvider, */localStorageServiceProvider, $stateProvider, $urlRouterProvider) {
  localStorageServiceProvider
      .setPrefix('hero')
      .setStorageType('localStorage');

  $stateProvider
      /*.state('home', {
        url: '/home',
        views: {
          '': {
            templateUrl: '/app/partials/home/home.html'
          },
          'heroesList@home': {
           templateUrl: '/app/partials/heroes_list/heroes_list.html',
           controller: 'heroes_listCtrl'
          },
          'heroView@home': {
            url: "/home/:heroId",
            templateUrl: '/app/partials/home/partials/hero_view.html',
            controller: 'hero_viewCtrl'
          }
        }
      })*/.state('home', {
        url: "/home",
        templateUrl: '/app/partials/home/home.html'
      })
      .state('heroes', {
        url: "/heroes",
        templateUrl: '/app/partials/heroes_list/heroes_list.html',
        controller: 'heroes_listCtrl'
      })
      /*.state('heroes_list', {
        url: "/heroeslist",
        templateUrl: '/app/partials/heroes_list/heroes_list.html',
        controller: 'heroes_listCtrl'
      })*/
      .state('heroes.heroDetails', {
        url: "/heroDetails/:heroId",
        templateUrl: '/app/partials/home/partials/hero_view.html',
        controller: 'hero_viewCtrl'
      })
      .state('contacts.contactCard', {
        url: '/card/:contactId',
        controller: 'ContactCardController',
        templateUrl: 'partials/ContactCard.html'
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
