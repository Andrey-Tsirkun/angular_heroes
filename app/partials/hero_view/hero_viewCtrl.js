angular.module('myApp').controller('hero_viewCtrl', ['$scope', 'dataFactory', '$stateParams' , function($scope, dataFactory, $stateParams) {
  $scope.currentHero = dataFactory.getHeroById($stateParams.heroId);
}]);