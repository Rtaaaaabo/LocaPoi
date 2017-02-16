angular.module('myApp.service',[])
.factory('Current', function($http){
  var items = [];
  var item = [];
  //var api = 'https://api.yelp.com/v3/businesses/search';
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー
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
  };
})
