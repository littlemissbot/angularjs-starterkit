(function (angularApp) {
  angularApp.factory('userDataService',['$localStorage', '$sessionStorage',
    function($localStorage, $sessionStorage) {
     $localStorage.userData = $localStorage.userData || {};
     $sessionStorage.sessionData = $sessionStorage.sessionData || {};

     var updateLocalData = function(key, value) {
      if(!$localStorage.userData) {
        $localStorage.userData = {};
      }
      $localStorage.userData[key] = value;
    };

    var getLocalData = function(key) {
      if(!!key) {
        return !!$localStorage.userData[key] ? $localStorage.userData[key] : '';
      } else {
        return $localStorage.userData;
      }
    };

    var updateSessionData = function(key, value) {
      if(!$sessionStorage.sessionData) {
        $sessionStorage.sessionData = {};
      }
      $sessionStorage.sessionData[key] = value;
    }

    var getSessionData = function(key) {
      if(key) {
        return !!$sessionStorage.sessionData[key] ? $sessionStorage.sessionData[key] : '';
      } else {
        return $sessionStorage.sessionData;
      }
    };

    var eraseSessionData = function() {
      $sessionStorage.sessionData = {};
    };

    var eraseLocalData = function() {
      $localStorage.userData = {};
    };


    return {
      updateLocalData: updateLocalData,
      getLocalData: getLocalData,
      updateSessionData: updateSessionData,
      getSessionData: getSessionData,
      eraseSessionData: eraseSessionData,
    };
  }]);
}(app));
