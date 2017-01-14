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
      $scope.items = $scope.items.concat(items.rest);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  function error(err) {
    console.warn(error.code);
  };
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  Current.get($stateParams.currentId).then(function(item) {
    console.log(item);
    $scope.item = item;
  })
})