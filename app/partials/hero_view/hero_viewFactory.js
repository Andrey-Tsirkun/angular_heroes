app.factory('viewHeroFactory',
    ['localStorageService',
      '$cookies',
      '$cookies',
      'dataFactory',
      function (localStorageService, $cookies, dataFactory) {
        var viewHero = {};

        viewHero.getCookie = function (id) {
          var cnt = 0;
          if ($cookies.get(id)) {
            cnt = $cookies.get(id);
          }
          return cnt;
        };

        viewHero.voted = function (id) {
          var currentUser = dataFactory.getCurrentUserObject;
          for (var i = 0; i < currentUser.votedHeroes.length; i++) {
            console.warn(currentUser);
            if (currentUser.votedHeroes[i] == id) {
              return true;
            }
          }
        };

        viewHero.vote = function (id, type) {
          var current = this.getCookie(id);
          if (type == 'up') {
            $cookies.put(id, parseInt(current) + 1);
          }
          else {
            $cookies.put(id, parseInt(current) - 1);
          }

          dataFactory.addVotedHeroes(id);
        };

        /*viewHero.voted = function (id) {
          var currentUser = dataFactory.getCurrentUserObject;
          for(var i = 0; i < currentUser.votedHeroes.length; i++) {
            console.warn(currentUser);
            if (currentUser.votedHeroes[i] == id) {
              return true;
            }
          }
        };*/

        return viewHero;
      }]);
