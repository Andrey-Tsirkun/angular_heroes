angular.module('myApp').controller('add_heroCtrl', ['$scope', 'dataFactory', function($scope, dataFactory) {
  $scope.submitAddForm = function (name, url) {
    dataFactory.addHero(name, url);
    $scope.add = {};
    $scope.add.herourl = '';
  };
  $scope.cancelHeroForm = function() {
    $scope.add = {};
  };
}]);
