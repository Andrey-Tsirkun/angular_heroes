angular.module('myApp').controller('registrationCtrl', ['$scope', 'dataFactory', function ($scope, dataFactory) {
  $scope.submitRegister = function (userData) {
    dataFactory.addUser(userData.name, userData.pass, userData.email);
    $scope.user = {};
  };
}]);
