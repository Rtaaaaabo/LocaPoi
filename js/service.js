angular.module('myApp.service',[])
.factory('Current', function($http){
  var items = [];
  var item = [];
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー
  var latitude = 35.856999;
  var longitude = 139.648849;
  var page = 1;
  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };

  function success(pos) {
    var crd = pos.coords;
    latitude = crd.latitude;
    longitude = crd.longitude;
  };
  function error(err) {
    console.warn(error.code);
  };

  return {
    getShop : function(page) {
      navigator.geolocation.getCurrentPosition(success, error, options);
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
    }
  };
})
