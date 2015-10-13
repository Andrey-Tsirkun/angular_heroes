app.factory('dataFactory', ['localStorageService', function (localStorageService) {
  var heroes = {},
      user = {};

  heroes.list = [];
  user.list = [];

  heroes.getAll = function (val) {
    return localStorageService.get(val);
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
    var uid = localStorageService.get('current_user');
    if (uid) {
      uid++;
    }
    else {
      uid = 1;
    }
    user.list.push({id: uid, name: userName, pass: userPass, email: userEmail, votedHeroes: []});
    localStorageService.set('users', user.list);
    this.setCurrentUser(uid);
    heroes.loggedIn = true;
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
    console.warn(heroes);
    heroes.list = heroes;
    localStorageService.set('heroes', heroes.list);
  };

  heroes.removeItem = function (key) {
    localStorageService.remove(key);
  };

  return heroes;
}]);
