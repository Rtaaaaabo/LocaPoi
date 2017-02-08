angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, $cordovaGeolocation, Current){
  $scope.items = [];
  $scope.item;
  var page = 0;
  var latitude;
  var longitude;
  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };

  $scope.loadMoreData = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
    page ++;
  };

  $scope.getCurrent = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  function success(pos) {
    var crd = pos.coords;
    latitude = crd.latitude;
    longitude = crd.longitude;
    Current.getShopCurrent(page, latitude, longitude).then(function(items) {
      $scope.noMoreItemAvailable = false;
      $scope.items = $scope.items.concat(items.rest);
      if($scope.items.length == items.total_hit_count) {
        $scope.noMoreItemAvailable = true;
      };
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  function error(err) {
    console.log(err);
    console.warn(error.code);
  };
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  var mapdiv = document.getElementById('map_canvas');
  var renderOptions= {
    draggable : true,
    preserveVirewport : false
  };
  var directionsDisplay = new google.maps.DirectionsRenderer(renderOptions);
  var directionsService = new google.maps.DirectionsService();

  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };

  Current.get($stateParams.currentId).then(function(item) {
    $scope.item = item;
    getMap(item.latitude, item.longitude);
  })

  function getMap(latitude, longitude) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    function success(pos) {
      var currentCrd = pos.coords;
      var currentLat = currentCrd.latitude;
      var currentLng = currentCrd.longitude;
      var currentLatlng = new google.maps.LatLng(currentLat, currentLng);

      var shopLatlng = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        zoom : 17,
        center:currentLatlng,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        icon : 'http://waox.main.jp/maps/icon/car2.png',
        draggable : true
      };
      var map = new google.maps.Map(mapdiv, mapOptions);
      directionsDisplay.setMap(map);

      /*var shopMarker = new google.maps.Marker({
      position : shopLatlng,
      map : map
      });*/
      /*var currentMarker = new google.maps.Marker({
        position : currentLatlng,
        map : map
      });*/

      calcRoute(currentLatlng, shopLatlng);
    }
    function error(err) {
    console.log(err);
    console.warn(error.code);
    };
  }
  function calcRoute(currentLatlng, shopLatlng) {
    var request = {
      origin : currentLatlng,
      destination : shopLatlng,
      travelMode : google.maps.DirectionsTravelMode.WALKING,
      optimizeWaypoints : false
    };
    directionsService.route(request, function(response, status) {
      console.log(response);
      if(status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }
})