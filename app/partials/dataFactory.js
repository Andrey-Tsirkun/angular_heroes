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
    var deferred = $q.defer(),
        b = localStorageService.get('heroes');
    if(b) {
      deferred.resolve(b);
    }
    else {
      deferred.reject();
    }

    return deferred.promise.then(function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          return data[i];
        }
      }
    });
  };

  heroes.setCurrentUser = function (id) {
    localStorageService.set('current_user', id)
  };

  heroes.getCurrentUserObject = function () {
    /*var users = this.getAll('users'),
        currentUser = this.getAll('current_user');

    for (var i = 0; i < users.length; i++) {
      if (users[i].id == currentUser) {
        return users[i];
      }
    }*/


    var deferred = $q.defer(),
        b = localStorageService.get('users');
    //console.warn(c);
    if(b) {
      deferred.resolve(b);
    }
    else {
      deferred.reject();
    }

    return deferred.promise;
  };

  heroes.addUser = function (userName, userPass, userEmail) {
    this.getAll('users').then(function(data) {
      setUser(data, userName, userPass, userEmail);
    }, function () {
      setUser([], userName, userPass, userEmail);
      console.warn('User list is empty.');
    });

    var setUser = function (userArray, userName, userPass, userEmail) {
      var timestamp = new Date().getTime();
      userArray.push({id: timestamp, name: userName, pass: userPass, email: userEmail, votedHeroes: []});
      localStorageService.set('users', userArray);
      heroes.setCurrentUser(timestamp);
      heroes.loggedIn = true;
    };
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
    this.getAll('heroes').then(function(heroesList) {
      addHero(heroesList, heroName, heroUrl);
    }, function () {
      addHero([], heroName, heroUrl);
      console.warn('Heroes list is empty.');
    });

    var addHero = function (heroesArray, heroName, heroUrl) {
      heroes.getAll('current_user').then(function(current_user) {
        heroesArray.push({id: heroesArray.length + 1, aid: current_user, name: heroName, img: heroUrl});
        localStorageService.set('heroes', heroesArray);
      });
    };
  };

  heroes.removeHero = function (id) {
    this.getAll('heroes').then(function(heroesList) {
      console.warn(heroesList);
      removeHero(heroesList, id);
    }, function () {
      console.warn('Empty');
    });

    var removeHero = function (heroesList, id) {
      for (var i = 0; i < heroesList.length; i++) {
        if (heroesList[i].id == id) {
          heroesList.splice(i, 1);
        }
      }
      console.warn(heroesList);
      localStorageService.set('heroes', heroesList);
    };
  };

  heroes.removeItem = function (key) {
    localStorageService.remove(key);
  };

  return heroes;
}]);
