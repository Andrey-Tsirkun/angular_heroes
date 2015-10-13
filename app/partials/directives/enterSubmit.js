app.directive('enterSubmit', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind('keydown', function (event) {
        var code = event.keyCode || event.which;
        if (code === 13 && scope.addHero.$valid) {
          event.preventDefault();
          scope.$apply(function(){
            scope.$eval(attrs.enterSubmit, {'event': event});
          });
        }
      });
    }
  }
});
