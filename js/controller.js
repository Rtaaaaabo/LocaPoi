angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, $timeout, $cordovaGeolocation, Current){
  $scope.items = [];
  $scope.page = 1;
  $scope.currentPage = 1;

  //var positionOptions = {timeout:10000,enableHighAccuracy : false};

  $scope.loadMoreData = function() {
    Current.getCurrent($scope.page).then(function(items) {
        $scope.items = $scope.items.concat(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    $scope.page ++;
  };

  //現在地を求める
  $scope.getLocal = function() {
    Current.getPosition().then(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(lat + "   " + long);
    });
  };
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  $scope.items = Current.get($stateParams.currentId);
})

