app.factory('dataFactory', ['localStorageService', '$q', function (localStorageService, $q) {
  var heroes = {},
      user = {};

  heroes.list = [];
  user.list = [];

  heroes.getAll = function (val) {
    var deferred = $q.defer(),
        b = localStorageService.get(val);
    if(b) {
      deferred.resolve(b);
    }
    else {
      deferred.reject();
    }

    return deferred.promise;
  };

  heroes.getHeroById = function (id) {
    var heroes = this.getAll('heroes');
    for (var i = 0; i < heroes.length; i++) {
      if (heroes[i].id == id) {
        return heroes[i];
      }
    }
  };

  heroes.setCurrentUser = function (id) {
    localStorageService.set('current_user', id)
  };

  heroes.getCurrentUserObject = function () {
    var users = this.getAll('users'),
        currentUser = this.getAll('current_user');

    for (var i = 0; i < users.length; i++) {
      if (users[i].id == currentUser) {
        return users[i];
      }
    }
  };

  heroes.addUser = function (userName, userPass, userEmail) {
    this.getAll('users').then(function(data) {
      user.list = data;
      setUser(data, userName, userPass, userEmail);
    }, function () {
      setUser([], userName, userPass, userEmail);
      console.warn('User list is empty.');
    });

    var setUser = function (userArray, userName, userPass, userEmail) {
      //console.warn(userName, userPass, userEmail);
      var timestamp = new Date().getTime();
      userArray.push({id: timestamp, name: userName, pass: userPass, email: userEmail, votedHeroes: []});
      localStorageService.set('users', userArray);
      heroes.setCurrentUser(timestamp);
      heroes.loggedIn = true;
    };

    /*var timestamp = new Date().getTime();
    user.list.push({id: timestamp, name: userName, pass: userPass, email: userEmail, votedHeroes: []});
    localStorageService.set('users', user.list);
    this.setCurrentUser(timestamp);
    heroes.loggedIn = true;*/
  };

  heroes.addVotedHeroes = function (id) {
    var users = this.getAll('users'),
        currentUser = this.getAll('current_user');
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == currentUser) {
        users[i].votedHeroes.push(id);
      }
    }
    localStorageService.set('users', users);
  };

  heroes.addHero = function (heroName, heroUrl) {
    heroes.list = this.getAll('heroes');
    heroes.list.push({id: heroes.list.length + 1, aid: this.getAll('current_user'), name: heroName, img: heroUrl});
    localStorageService.set('heroes', heroes.list);
  };

  heroes.removeHero = function (id) {
    var heroes = this.getAll('heroes');
    for (var i = 0; i < heroes.length; i++) {
      if (heroes[i].id == id) {
        heroes.splice(i, 1);
      }
    }
    heroes.list = heroes;
    localStorageService.set('heroes', heroes.list);
  };

  heroes.removeItem = function (key) {
    localStorageService.remove(key);
  };

  return heroes;
}]);
