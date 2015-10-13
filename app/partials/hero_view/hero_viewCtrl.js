angular.module('myApp').controller('hero_viewCtrl', ['$scope', 'currentHero', 'currentUser', '$cookies', 'dataFactory', 'viewHeroFactory', function($scope, currentHero, currentUser, $cookies, dataFactory, viewHeroFactory) {
  $scope.currentHero = currentHero;
  $scope.currentUser = currentUser;

  /*var getCookie = function (id) {
    var cnt = 0;
    if ($cookies.get(id)) {
      cnt = $cookies.get(id);
    }
    return cnt;
  };*/

  var getCookie = function(id) {
    return viewHeroFactory.getCookie(id);
  };

  $scope.cnt = function(id) {
    return getCookie(id);
  };

  $scope.vote = function (id, type) {
    viewHeroFactory.vote(id, type);
    /*var current = getCookie(id);
    if (type == 'up') {
      $cookies.put(id, parseInt(current) + 1);
    }
    else {
      $cookies.put(id, parseInt(current) - 1);
    }

    dataFactory.addVotedHeroes(id);*/
  };

  $scope.voted = function (id) {
    //viewHeroFactory.voted(id);
    var currentUser = dataFactory.getCurrentUserObject();
    for(var i = 0; i < currentUser.votedHeroes.length; i++) {
      if (currentUser.votedHeroes[i] == id) {
        return true;
      }
    }
  };

}]);
