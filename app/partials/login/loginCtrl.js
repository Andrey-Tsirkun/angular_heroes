angular.module('myApp').controller('loginCtrl', ['$scope', 'dataFactory', '$rootScope', function($scope, dataFactory, $rootScope) {
  dataFactory.getAll('users').then(function(data) {
    $scope.submitLogin = function (val) {
      for(var i = 0; i < data.length; i++) {
        if (data[i].name == val.name && data[i].pass == val.pass) {
          dataFactory.setCurrentUser(data[i].id);
          $scope.userLogin = {};
        }
      }
      $scope.loggedIn = true;
    };
  }, function () {

  });
}]);
