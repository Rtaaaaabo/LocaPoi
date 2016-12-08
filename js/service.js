angular.module('myApp.service',[])

.factory('geoDataFactory', function($cordovaGeolocation, $location){
  return {
    currLatLoc : {},
    $setGeoloc : function() {
      $cordovaGeolocation
      .getCurrentPosition({timeout:10000, enableHighAccuracy:false})
      .then(function(position) {
        return currLatLoc = {"lat" : position.coords.latitude, "lon" : position.coords.longitude};
      }, function(err) {
        return {"error" : err}
      });
    }
  }
})



.factory('Current', function($http, $ionicPlatform, $cordovaGeolocation, geoDataFactory){
  var items = [];
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー

  var page = 0;
  var positionOptions = {timeout:10000, enableHighAccuracy:false};
  return {
    getCurrent : function(page) {
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
      }).then(function(response){
        items = response;
        return items.data.rest;
      })
    },

    /*getPosition : function() {
      return $ionicPlatform.ready().then(function() {
         $cordovaGeolocation.getCurrentPosition(positionOptions);
      })
    }*/
  };
})