angular.module('myApp').controller('heroes_listCtrl', ['$scope', 'dataFactory', '$stateParams', function($scope, dataFactory, $stateParams) {
  $scope.heroes = dataFactory.getAll('heroes');
}]);
