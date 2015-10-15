angular.module('myApp').controller('heroes_listCtrl', function($scope, heroes, currentUser, dataFactory) {
  $scope.heroes = heroes;
  $scope.currentUser = currentUser;
  $scope.removeHero = function(id) {
    dataFactory.removeHero(id);
    $scope.heroes = dataFactory.getAll('heroes');
  };
});
