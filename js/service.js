angular.module('myApp.service',[])
.factory('Current', function($http){
  var items = [];
  var item = [];
  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };
  var renderOptions = {
    draggable : true,
    preserveViewport : false
  };
  var directionsDisplay = new google.maps.DirectionsRenderer(renderOptions);
  var directionsService = new google.maps.DirectionsService();
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー

  function success(pos) {
    //現在地取得に使用
    var currentCrd = pos.coords;
    var currentLat = currentCrd.latitude;
    var currentLng = currentCrd.longitude;

    //現在地の緯度と経度を変数currentLatlngに代入する
    var currentLatlng = new google.maps.LatLng(currentLat, currentLng);

    var mapOptions = {
      zoom : 17,
      center: currentLatlng,
      mapTypeId : google.maps.MapTypeId.ROADMAP,
      icon : 'http://waox.main.jp/maps/icon/car2.png',
      draggable : true
    };
    function error(err) {
      console.log(err);
      console.warn(error.code);
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsDisplay.setMap(map);
    //calcRoute(currentLatlng, address);

    /*function calcRoute(currentLatlng, address) {
      var request = {
        origin : currentLatlng,
        destination : address,
        travelMode : google.maps.DirectionsTravelMode.WALKING,
        optimizeWaypoints : false
      };
      directionsService.route(request, function(response, status) {
        if(status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          console.log(response);
        }
      });
    }*/
  }

  function calcRoute(currentLatlng, address) {
      var request = {
        origin : currentLatlng,
        destination : address,
        travelMode : google.maps.DirectionsTravelMode.WALKING,
        optimizeWaypoints : false
      };
      directionsService.route(request, function(response, status) {
        if(status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          console.log(response);
        }
      });
    }

  return {
    getShopCurrent : function(page, latitude, longitude) {
      var currentLatlng = new google.maps.LatLng(latitude, longitude);
      // 現在地情報をcurrentLatlngに代入
      return $http.jsonp(api, {
        params : {
          keyid : keyId,
          latitude : latitude,
          longitude : longitude,
          range : 3,
          offset_page : page,
          callback : 'JSON_CALLBACK',
          format : 'json'
        }
      }).then(function(response) {
        items = response.data;
        return items;
      })
    },
    get : function(currentId) {
      return $http.jsonp(api, {
        params : {
          keyid : keyId,
          id : currentId,
          callback : 'JSON_CALLBACK',
          format : 'json'
        }
      }).then(function(response) {
        item = response.data.rest;
        return item;
      })
    },

    getMap : function(address) {
      navigator.geolocation.getCurrentPosition(success, error, options);
      calcRoute(currentLatlng, address);

      /*function success(pos) {
        //現在地取得に使用
        var currentCrd = pos.coords;
        var currentLat = currentCrd.latitude;
        var currentLng = currentCrd.longitude;

        //現在地の緯度と経度を変数currentLatlngに代入する
        var currentLatlng = new google.maps.LatLng(currentLat, currentLng);

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

        function calcRoute(currentLatlng, address) {
          var request = {
            origin : currentLatlng,
            destination : address,
            travelMode : google.maps.DirectionsTravelMode.WALKING,
            optimizeWaypoints : false
          };
          directionsService.route(request, function(response, status) {
            if(status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              console.log(response);
            }
          });
        }
      }*/
      /*function error(err) {
        console.log(err);
        console.warn(error.code);
      };*/
    }
  };
})
