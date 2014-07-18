'use strict';

/**
 * @ngdoc service
 * @name slideshowApp.requestsService
 * @description
 * # requestsService
 * Factory in the slideshowApp.
 */
angular.module('slideshowApp')
  .factory('requestsService', ['$q', '$http', function($q, $http) {
    return {
      getInfo: function(accessToken) {
        var deferred = $q.defer();

        $http.jsonp('https://api.instagram.com/v1/users/self?access_token='+accessToken+'&callback=JSON_CALLBACK').success(function(response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      getRecentPictures: function(userId, accessToken) {
        var deferred = $q.defer();

        $http.jsonp('https://api.instagram.com/v1/users/'+userId+'/media/recent/?access_token='+accessToken+'&count=6&callback=JSON_CALLBACK').success(function(response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      getTracks: function(query) {
        var deferred = $q.defer();

        $http.get('https://api.spotify.com/v1/search?q='+query+'&type=track').success(function(response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      }
    };
  }]);
