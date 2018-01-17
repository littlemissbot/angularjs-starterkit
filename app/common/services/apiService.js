(function (angularApp) {
  angularApp.factory('apiService', ['$q', '$http', 'env', 'userDataService', '$state',
    function ($q, $http, env, userDataService, $state) {

      var URL = env.apiHost + ':' + env.apiPort;
      console.log('API pointing to:' + URL);

      var getAuthHeaders = function () {
        var headerObj = {};
        headerObj['Content-Type'] = 'application/json';
        if (userDataService.getSessionData('token')) {
          headerObj['token'] = userDataService.getSessionData('token');
        }
        return headerObj;
      };

      /*function to post to API*/
      var post = function (url, postData) {
        var deferred = $q.defer();
        $http.post(URL + url, postData, {
          headers: getAuthHeaders()
        }).then(function (responseData) {
          deferred.resolve(responseData.data);
        }, function (err) {
          if (err.status == '500') {
            console.log("ERROR : " + err.status + " " + err.statusText);
            $state.go('public.homepage');
          } else {
            deferred.reject(err.data);
          }
        });

        return deferred.promise;
      };

      /*function to get from API*/
      var get = function (url, loader) {
        var deferred = $q.defer();

        $http.get(URL + url, {
          headers: getAuthHeaders()
        }).then(function (responseData) {
          deferred.resolve(responseData.data);
        }, function (err) {
          if (err.status == '500') {
            console.log("ERROR : " + err.status + " " + err.statusText);
            $state.go('public.homepage');
          } else {
            deferred.reject(err.data);
          }
        });

        return deferred.promise;
      };

      return {
        get: get,
        post: post
      };

    }
  ]);
}(app));
