angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, $cordovaGeolocation, Current){
  $scope.items = [];
  $scope.item;
  var page = 1;
  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };

  $scope.loadMoreData = function() {
    Current.getShop(page).then(function(items) {
      $scope.items = $scope.items.concat(items.rest);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    page ++;
  };

  $scope.getCurrent = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);

    function success(pos) {
      var crd = pos.coords;
      latitude = crd.latitude;
      longitude = crd.longitude;
      Current.getShopCurrent(latitude, longitude).then(function(items) {
        $scope.items = items.rest;
      });
    };
    function error(err) {
      console.warn(error.code);
    };
  }
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  Current.get($stateParams.currentId).then(function(item) {
    console.log(item);
    $scope.item = item;
  })
})