'use strict';

angular.module('tadlSignApp')
  .controller('MainCtrl', function ($scope, $timeout, $http) {
    $scope.current_date_time =  new Date();

    var moving_time = function(){
    	$scope.current_date_time =  new Date();
    	$timeout(moving_time, 1000)
    }

    var faqs_hash = [
        ['Get Your Library Card',[[360,763]]],
        ['Pick Up Holds',[[400, 705]]],
        ['Return Items',[[541,791]]],
        ['Public Computers',[[518,377],[246,793]]],
        ['Movie and Music Collection',[[100,500]]],
        ['Story Room',[[200,400]]],
        ['Audio Book Collection',[[300,100]]]
    ];

    var pointer_image = new Image();
    pointer_image.src = '../assets/images/point.png';
    pointer_image.onload = function() {
        init();
    }

    var display_faq = function(position){
        var i = faqs_hash.length
        if(position < i){
            $scope.displayed_faq = faqs_hash[position][0]
            // draw_points(faqs_hash[position][1])
            position ++
        }else{
            $scope.displayed_faq = faqs_hash[0][0]
            // draw_points(faqs_hash[0][1])
            position = 1
        }
        $timeout(function() {display_faq(position)}, 8000);
    }

    var draw_points = function(locations){
        var canvas = document.getElementById('map_canvas'),
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        locations.forEach( function(entry){
            context.drawImage(pointer_image, entry[0], entry[1], 65, 100);
        });
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
    
    var fetch_events = function(){
    	$http.get('http://railsbox-1-40317.use1.nitrousbox.com/events/list?days_to_show=4').success(
    	function(data) {
      		$scope.events = data.events;
            $timeout(fetch_events, 300000)
    	});
    }
    


    $timeout(moving_time, 1000)
    fetch_events()
    $timeout(display_faq, 1000)

  });
