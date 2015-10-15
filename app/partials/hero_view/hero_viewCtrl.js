angular.module('myApp').controller('hero_viewCtrl', ['$scope', 'currentHero', 'currentUser', '$cookies', 'dataFactory', 'viewHeroFactory', function ($scope, currentHero, currentUser, $cookies, dataFactory, viewHeroFactory) {
  $scope.currentHero = currentHero;
  $scope.currentUser = currentUser;

  var getCookie = function (id) {
    return viewHeroFactory.getCookie(id);
  };

  $scope.cnt = function (id) {
    return getCookie(id);
  };

  $scope.vote = function (id, type) {
    viewHeroFactory.vote(id, type);
  };

  $scope.voted = function (id) {
    return viewHeroFactory.voted(id);
  };
}]);
