angular.module('myApp').controller('loginCtrl', ['$scope', 'dataFactory', function($scope, dataFactory) {
  var users = dataFactory.getAll('users');
  $scope.submitLogin = function (val) {
    for(var i = 0; i < users.length; i++) {
      if (users[i].name == val.name && users[i].pass == val.pass) {
        dataFactory.setCurrentUser(users[i].id);
        $scope.userLogin = {};
      }
    }
    $scope.loggedIn = true;
    //$scope.$apply();
  }
}]);
