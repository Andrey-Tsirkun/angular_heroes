;app.factory('viewHeroFactory',
    ['localStorageService',
      '$cookies',
      'dataFactory',
      function (localStorageService, $cookies, dataFactory) {
        var viewHero = {},
            users = [],
            current_user = '';

        viewHero.getCookie = function (id) {
          var cnt = 0;
          if ($cookies.get(id)) {
            cnt = $cookies.get(id);
          }
          return cnt;
        };

        dataFactory.getAll('users').then(function (users) {
          dataFactory.getAll('current_user').then(function (current_user) {
            viewHero.voted = function (id) {
              var status = false;
              for (var i = 0; i < users.length; i++) {
                if (users[i].id == current_user) {
                  for (var c = 0; c < users[i].votedHeroes.length; c++) {
                    if (users[i].votedHeroes[c] == id) {
                      status = true;
                    }
                  }
                }
              }
              return status;
            };
          });
        });

        viewHero.vote = function (id, type) {
          var voted = this.voted(id);
          if (!voted) {
            var current = this.getCookie(id);
            if (type == 'up') {
              $cookies.put(id, parseInt(current) + 1);
            }
            else {
              $cookies.put(id, parseInt(current) - 1);
            }
            dataFactory.addVotedHeroes(id);
          }
        };

        return viewHero;
      }]);
