angular.module('myApp').directive('heroesList', ['dataFactory', function(dataFactory){
  return {
    restrict: 'E',
    scope: {
      person: '='
    },
    templateUrl: 'app/partials/heroes_list/heroes_list.html',
    link: function($scope, element, attrs) {
      $scope.heroes = dataFactory.getAll('heroes');
    }
  }
}]);
