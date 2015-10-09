angular.module('myApp').directive('heroView', ['dataFactory', function(dataFactory){
  return {
    restrict: 'E',
    scope: {
      person: '='
    },
    templateUrl: 'app/partials/hero_view/hero_view.html',
    link: function($scope, element, attrs) {
      $scope.heroes = dataFactory.getAll('heroes');
    }
  }
}]);
