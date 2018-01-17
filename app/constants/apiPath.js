(function (angularApp) {
  angularApp.factory('APIPATH', ['env', function (env) {
    return {
        fetchData : '/fetch/data',
    };
  }]);
}(app));
