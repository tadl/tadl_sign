'use strict';

angular.module('tadlSignApp')
  .controller('MainCtrl', function ($scope, $timeout, $http) {
    $scope.current_date_time =  new Date();

    var moving_time = function(){
    	$scope.current_date_time =  new Date();
    	$timeout(moving_time, 1000)
    }



    $scope.only_current = function(event){
    	var parsed_end = Date.parse(event.end_time_raw)
    	if (parsed_end > $scope.current_date_time){
    		return true
    	}
    };

    $scope.event_color = function(event){
    	var parsed_end = Date.parse(event.end_time_raw)
    	var parsed_start = Date.parse(event.start_time_raw)
    	if (parsed_end > $scope.current_date_time && parsed_start < $scope.current_date_time){
    		return {color: 'green'}
    	}
    }
    

    $http.get('http://railsbox-1-40317.use1.nitrousbox.com/events/all?days_from_now=4').success(
    	function(data) {
      $scope.events = data.events;
    });

    $timeout(moving_time, 1000)

  });
