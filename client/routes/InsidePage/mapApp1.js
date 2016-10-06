'use strict';

var mapApp = angular.module('myApp.mapApp', ['ngRoute'])

mapApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/mapApp', {
	templateUrl: '../InsidePage/mapApp.html',
    controller: 'MapCtrl'
    
  });
}])




mapApp.controller('MapCtrl', ['$scope','$window', function($scope, $window) {
   var geolocate; 
	if(!!navigator.geolocation) {
	    
        var map;
    
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.map = map;
	}
       var geo = navigator.geolocation.getCurrentPosition(function(position) {
        
           geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
    	    var image = {
    	    		  url: 'pin1.ico',
    	    		  size: new google.maps.Size(90, 90),
    	    		  origin: new google.maps.Point(0, 0),
    	    		  anchor: new google.maps.Point(17, 34),
    	    		  scaledSize: new google.maps.Size(50, 50)
    	    };
            	
    	    var image2 = {
  	    		  url: 'pin2.ico',
  	    		  size: new google.maps.Size(90, 90),
  	    		  origin: new google.maps.Point(0, 0),
  	    		  anchor: new google.maps.Point(17, 34),
  	    		  scaledSize: new google.maps.Size(50, 50)
  	    };
            var initalPosition = new google.maps.Marker({
                position: geolocate,
                map: map,
                title: 'My Place',
            	draggable: true,
            	icon: image,
                animation: google.maps.Animation.DROP,
                animation: google.maps.Animation.BOUNCE
              });
            initalPosition.addListener('click', toggleBounce);
        
            $scope.initalPosition =  initalPosition;
            console.log($scope.initalPosition)
        function toggleBounce() {
          if (initalPosition.getAnimation() == null) {
        	  initalPosition.setAnimation(google.maps.Animation.BOUNCE);
          } else {
        	  initalPosition.setAnimation(null);
          }
        }
            /*var infowindow = new google.maps.InfoWindow({
                map: map,
                position: geolocate,
                content:
                    '<h1>Location pinned from HTML5 Geolocation!</h1>' +
                    '<h2>Latitude: ' + position.coords.latitude + '</h2>' +
                    '<h2>Longitude: ' + position.coords.longitude + '</h2>'
            });*/
            
            map.setCenter(geolocate);
            var request = {
        		    location: geolocate,
        		    radius: '500',
        		    types: ['store']
        		  };
        	 var service = new google.maps.places.PlacesService(map);
        	 $scope.service = service;
        	 console.log(service)
        	 service.nearbySearch(request, callback);
        	 
        	 function callback(results, status, $scope) {
        		  if (status == google.maps.places.PlacesServiceStatus.OK) {
        		    for (var i = 0; i < results.length; i++) {
        		      var place = results[i];
        		      $scope.data = {
        		    		     model: null,
        		    		     availableOptions: [
        		    		       {id: 'place.name', name: 'place.geometry.location'},
        		    		     ]
        		    		    };
        		      
        		      /*console.log($scope.data.availableOptions[0].location)*/
        		      createMarker(results[i]);
        		    }
        		  }
        	 }
        	 var myMarkers = [];
        	 function createMarker(place) {
        	        var placeLoc = place.geometry.location;
        	       
        	        var marker = new google.maps.Marker({
        	          map: map,
        	          position: placeLoc,
        	          icon: image2,
        	          
        	        });
        	       // marker.addListener('click', toggleBounce); // add dbclick & push to array waypoints & create $scope.data object
        	        myMarkers.push(marker)
        	        $scope.myMarkers = myMarkers;
        	        
        	        
        }
        	 return $scope
      }); 	 
    
	
	
	 var directionsService = new google.maps.DirectionsService();
	$scope.directionsService =  directionsService
console.log(directionsService)
	
	   var directionsDisplay = new google.maps.DirectionsRenderer();
	$scope.directionsDisplay = directionsDisplay
console.log(directionsDisplay) 
	 
	  directionsDisplay.setMap(map);
	
	
	$scope.calcRoute = function(geo, $window) {
	
		var start = geolocate;
		console.log(geolocate)
		console.log($scope.myMarkers);
		for (var i=0; i<$scope.myMarkers.length; i++) {
			google.maps.event.addListener($scope.myMarkers[i], 'dblclick', function (e) {
				  console.log(e);
				  var end = event.latLng;
				  console.log(end);
			}, false)
		 
    }
		var request = {
				origin: start,
				destination: end,
				travelMode: 'WALKING'
				 };
				 directionsService.route(request, function(result, status) {
		    if (status == 'OK') {
		     $scope.a= directionsDisplay.setDirections(result);
		    }
	});	
		
	}       
	      

	
	
	/*
	} else {
        document.getElementById('map').innerHTML = 'No Geolocation Support.';
    }*/
    
}]);
  

	