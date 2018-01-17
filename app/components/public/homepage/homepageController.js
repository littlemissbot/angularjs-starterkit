(function (angularApp) {
  angularApp.controller('homepageController', ['$scope', '$state', 'homepageService',
    function ($scope, $state, homepageService) {
      var HC = this;

      HC.init = function() {
        console.log("Do something when page loads.");
      };
  }]);
}(app));
