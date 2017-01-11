angular.module('myApp.service',[])
.factory('Current', function($http){
  var items = [];
  var item = [];
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー
  //var latitude = 35.856999;
  //var longitude = 139.648849;
  var page = 1;

  return {
    getShop : function(page) {
      return $http.jsonp(api, {
        params : {
          keyid : keyId,
          latitude : 35.856999,
          longitude : 139.648849,
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

    getShopCurrent : function(latitude, longitude) {
      return $http.jsonp(api, {
        params : {
          keyid : keyId,
          latitude : latitude,
          longitude : longitude,
          range : 3,
          offset_page : 1,
          callback : 'JSON_CALLBACK',
          format : 'json'
        }
      }).then(function(response) {
        items = response.data;
        console.log(items);
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

    getCurrent : function(latitude, longitude) {

    }
  };
})
