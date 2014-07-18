'use strict';

/**
 * @ngdoc overview
 * @name slideshowApp
 * @description
 * # slideshowApp
 *
 * Main module of the application.
 */
angular.module('slideshowApp', []).config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
     'self',
     'https://p.scdn.co/mp3-preview/**'
   ]);
});
