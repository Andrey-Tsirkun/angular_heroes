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
            dataFactory.getAll('current_user').then(function (data) {
              return data;
            });
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
        controller: 'add_heroCtrl',
        resolve: {
          authenticate: authenticate
        }
      })
      .state('redirect', {
        url: "/redirect",
        templateUrl: '/app/partials/redirect/redirect.html'
      });

  function authenticate(dataFactory, $location) {
    dataFactory.getAll('current_user').then(function () {
      console.warn('You are logged in!');
    }, function () {
      $location.path('redirect');
    });
  }

  $urlRouterProvider.otherwise('/home');
});

app.controller('mainCtrl', ['$scope', 'dataFactory', '$rootScope', function ($scope, dataFactory, $rootScope) {
  $scope.logout = function () {
    dataFactory.setCurrentUser(null);
    $scope.loggedIn = false;
  };
}]);

app.run(function ($rootScope, dataFactory) {
  dataFactory.getAll('current_user').then(function () {
    $rootScope.loggedIn = true;
  }, function () {
    $rootScope.loggedIn = false;
  });
});
