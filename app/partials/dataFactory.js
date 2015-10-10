
app.factory('dataFactory', ['localStorageService', '$location', function (localStorageService, $location) {
  var heroes = {},
      user = {};

  heroes.list = [];
  user.list = [];

  heroes.getAll = function (val) {
    return localStorageService.get(val);
  };

  heroes.getHeroById = function(id) {
    var heroes = this.getAll('heroes');
    for(var i = 0; i < heroes.length; i++) {
      if (heroes[i].id == id) {
        return heroes[i];
      }
    }
  };

  heroes.setCurrentUser = function (id) {
    localStorageService.set('current_user', id)
  };

  heroes.addUser = function (userName, userPass, userEmail) {
    var uid = localStorageService.get('current_user');
    if (uid) {
      uid++;
    }
    else {
      uid = 1;
    }
    user.list.push({id: uid, name: userName, pass: userPass, email: userEmail});
    localStorageService.set('users', user.list);
    this.setCurrentUser(uid);
    //$location.path("/");
    heroes.loggedIn = true;
  };

  heroes.addHero = function (heroName, heroUrl) {
    heroes.list.push({id: heroes.list.length + 1,aid: this.getAll('current_user'), name: heroName, img: heroUrl});
    localStorageService.set('heroes', heroes.list);
  };

  heroes.removeItem = function (key) {
    localStorageService.remove(key);
  };

  return heroes;
}]);
