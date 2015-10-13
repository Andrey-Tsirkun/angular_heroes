;var app = angular.module('myApp', ['LocalStorageModule', 'ui.router', 'ngCookies']);

app.config(function (/*$routeProvider, */localStorageServiceProvider, $stateProvider, $urlRouterProvider) {
  localStorageServiceProvider
      .setPrefix('hero')
      .setStorageType('localStorage');

  $stateProvider.state('home', {
    url: "/home",
    templateUrl: '/app/partials/home/home.html'
  })
      .state('heroes', {
        url: "/heroes",
        templateUrl: '/app/partials/heroes_list/heroes_list.html',
        controller: 'heroes_listCtrl',
        resolve: {
          heroes: function (dataFactory) {
            return dataFactory.getAll('heroes');
          },
          currentUser: function (dataFactory) {
            return dataFactory.getAll('current_user');
          }
        }
      })
      .state('heroes.heroDetails', {
        url: "/heroDetails/:heroId",
        templateUrl: '/app/partials/home/partials/hero_view.html',
        controller: 'hero_viewCtrl',
        resolve: {
          currentHero: function (dataFactory, $stateParams) {
            return dataFactory.getHeroById($stateParams.heroId);
          },
          currentUser: function (dataFactory) {
            return dataFactory.getAll('current_user');
          }
        }
      })
      .state('contacts.contactCard', {
        url: '/card/:contactId',
        controller: 'ContactCardController',
        templateUrl: 'partials/ContactCard.html'
      })
      .state('registration', {
        url: '/registration',
        templateUrl: '/app/partials/registration/registration.html',
        controller: 'registrationCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/app/partials/login/login.html',
        controller: 'loginCtrl'
      })
      .state('add_hero', {
        url: '/add_hero',
        templateUrl: '/app/partials/add_hero/add_hero.html',
        controller: 'add_heroCtrl'
        /*resolve: {
          security: ['$q', 'dataFactory', function($q, dataFactory){
            if(dataFactory.getAll('current_user')){
              console.warn(dataFactory.getAll('current_user'));
              return $q.reject("Not Authorized");
            }
          }]
        }*/
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
