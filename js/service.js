angular.module('myApp.service',[])

.factory('Current', function($http){
  var items = [];
  var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー
  //現在地から求めたいので仮で指定
  var latitude = 35.681298;
  var longitude = 139.766247;
  var params = {
    keyid : keyId,
    latitude : latitude,
    longitude : longitude,
    range : 3,
    callback : 'JSON_CALLBACK',
    format : 'json'
  };

  return {
    getCurrent : function() {
      return $http.jsonp(api, {params : params}).then(function(response){
        items = response.data.rest;
        console.log(items);
        return items;
      })

    },
    /*getNewCurrent : function() {
      return $http.jsonp(api, {params : params})
      .sucess(function(result) {
        items = result.rest;
      });
    }*/
  }
})
