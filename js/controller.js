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
  var renderOptions = {
    draggable : true,
    suppressMarkers : true,
    optimizeWaypoints : true,
    preserveViewport : false,
  };
  var directionsDisplay = new google.maps.DirectionsRenderer(renderOptions);
  var directionsService = new google.maps.DirectionsService();

  var infoWnd = new google.maps.InfoWindow();

  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };
  Current.get($stateParams.currentId).then(function(item) {
    $scope.item = item;
    getMap(item.address, item.url_mobile);
  })

  function getMap(address, url_mobile) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    function success(pos) {
      //住所から座標を取得する
      var geocoder = new google.maps.Geocoder();

      //現在地取得に使用
      var currentCrd = pos.coords;
      var currentLat = currentCrd.latitude;
      var currentLng = currentCrd.longitude;

      //現在地の緯度と経度を変数currentLatlngに代入する
      var currentLatlng = new google.maps.LatLng(currentLat, currentLng);
      //Mapのオプション
      var mapOptions = {
        zoom : 17,
        center: currentLatlng,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        icon : 'http://waox.main.jp/maps/icon/car2.png',
        draggable : true
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      directionsDisplay.setMap(map);
      calcRoute(currentLatlng, address);

      //Markerの設置
      var currentMarker = new google.maps.Marker({
        position : currentLatlng,
        map : map
      })
      //住所から緯度と経度を出す
      //Geocoder.geocode()
      geocoder.geocode(
      {
        'address' : address
      },function(results,status){
        //geocodeが成功した場合
        if(status == google.maps.GeocoderStatus.OK) {
          //google.maps.Map()コンストラクタに定義されているsetCenter()メソッドで
          //変換した緯度・経度情報を地図の中心に表示
          var shopMarker = new google.maps.Marker({
            position : results[0].geometry.location,
            animation: google.maps.Animation.DROP,
            map : map
          });
          google.maps.event.addListener(shopMarker, "click", infoWindowOpen);

          function infoWindowOpen() {
            infoWnd.setContent("ClickTest!");
            infoWnd.open(map, shopMarker);
          }
        }else{
          console.log('Geocode was not successful for the following reason:' + status);
        }
      });
    }
    function error(err) {
    console.log(err);
    console.warn(error.code);
    };
  }

  function calcRoute(currentLatlng, address) {
    var request = {
      origin : currentLatlng,
      destination : address,
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