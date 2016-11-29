angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, Current){
  /*var api = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';   //レストランAPIのURL
  var keyId = '16066d25035a3a1853e0a5220e77ab00'; //アクセスキー
  //現在地から求めたいので仮で指定
  var latitude = 35.681298;
  var longitude = 139.766247;

  $scope.callAPI = function() {
    //APIコール用のパラメータ
    var params = {
        keyid : keyId,
        latitude : latitude,
        longitude : longitude,
        range : 3,
        callback : 'JSON_CALLBACK',
        format : 'json'
    };
    //APIをコールする
    $http.jsonp(api, {params : params})
    .success(function(result) {
        $scope.items = result.rest;
    });
  }
  //APIを呼び出す
  $scope.callAPI();
  //$scope.moredata = false;
  $scope.items = [];
  console.log($scope.items);*/
  Current.getCurrent().then(function(items) {
    $scope.items = items;
  })

  /*$scope.loadMoreData = function() {
    console.log('loadMoreData');
    Current.getNewCurrent().then(function(items){
        $scope.items = $scope.items.concat(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    })*/

    /*$scope.items.push({
      id : $scope.items.length,
      name : $scope.items.name,
      category : $scope.items.category,
      budget : $scope.items.budget
    });*/
    /*if($scope.items.length == 100){
      $scope.moredata = true;
    }
  }*/
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  $scope.item = Current.get($stateParams.currentId);
})