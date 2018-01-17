(function (angularApp) {
  angularApp.factory('env', ['$location', function($location) {
    return {
      environment: 'development',
      host: $location.protocol() + "://" + $location.host(),
      port: 80,
      apiHost: $location.protocol() + "://" + $location.host(),
      apiPort: 5001
    }
  }]);
}(app));
