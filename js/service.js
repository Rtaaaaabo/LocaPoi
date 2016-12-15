angular.module('myApp.service',[])
.factory('Current', function($http){
  var items = [];
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー
  var page = 0;
  //var currentOptions = {timeout:3000, enableHighAccuracy:false};
  var latitude = 35.856999;
  var longitude = 139.648849;

  return {
    getShop : function(page) {
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
  };
})

    /*getCurrent : function() {
      return $ionicPlatform.ready().then(function() {
         $cordovaGeolocation.getCurrentPosition(positionOptions);
      })
    }*/
