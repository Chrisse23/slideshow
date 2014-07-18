'use strict';

/**
 * @ngdoc function
 * @name slideshowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slideshowApp
 */
angular.module('slideshowApp')
  .controller('MainCtrl', ['$scope', 'requestsService', '$timeout', function($scope, requestsService, $timeout) {
    
  	var accessToken = window.document.URL.toString().split('=');
  	var i = 0;

  	$scope.showSlideshow = false;
  	$scope.images = [];
  	$scope.search = '';
  	$scope.tracks = [];
  	$scope.trackLimit = 5;
  	$scope.setTrack = '';
  	$scope.trackChoosen = false;
    $scope.noTracks = false;
    $scope.showSearch = true;

    $scope.init = function() {

	    var promise = requestsService.getInfo(accessToken[1]);

	    var successCallback = function(response) {
	    	getRecentPictures(response.data.id);
	    };

	    var errorCallback = function() {
	    	console.log('ERROR');
	    };

	    promise.then(successCallback, errorCallback);
    };

    var getRecentPictures = function(userId) {
    	var promise = requestsService.getRecentPictures(userId, accessToken[1]);

	    var successCallback = function(response) {
	    	$scope.images = response;
	    };

	    var errorCallback = function() {
	    	console.log('ERROR');
	    };

	    promise.then(successCallback, errorCallback);
    };

    $scope.start = function() {
      $scope.showSearch = false;
      $scope.showSlideshow = true;
      var playTrack = document.getElementById('track');
      playTrack.play();

    	if(i < 6) {
	   		$scope.image = $scope.images.data[i].images.standard_resolution.url;

	   		i++;
	   		$timeout($scope.start, 5000);
	   	}
	   	else {
        $scope.showSlideshow = false;
	   		$scope.finished = true;
	   	}
    };

    $scope.getTracks = function() {
      $scope.noTracks = false;

    	var promise = requestsService.getTracks($scope.search);

    	var successCallback = function(response) {
    		$scope.tracks = response.tracks.items;
        if($scope.tracks.length < 1) {
          $scope.noTracks = true;
        }
    	};

    	var errorCallback = function() {
    		console.log('ERROR');
    	};

    	promise.then(successCallback, errorCallback);
    };

    $scope.setTrack = function(track) {
    	$scope.setTrack = track;
    	$scope.trackChoosen = true;
    	jQuery('#start').fadeIn();
    };

    $scope.reset = function() {
      $scope.finished = false;
      $scope.showSearch = true;
      i = 0;
      $scope.tracks = [];
      $scope.search = '';
      $scope.trackChoosen = false;
    };

  }]);
