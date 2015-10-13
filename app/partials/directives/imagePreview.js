app.directive('imagePreview', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/partials/add_hero/add_hero_imagePreview.html',
    link: function (scope, elem, attrs) {
      scope.imgSrc = scope.addHero.herourl;
      //scope.$pristine = true;
    }
  }
});
