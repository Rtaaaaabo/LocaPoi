angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, $cordovaGeolocation, Current){
  $scope.items = [];
  $scope.item;
  var page = 1;

  $scope.loadMoreData = function() {
    Current.getShop(page).then(function(items) {
      $scope.items = $scope.items.concat(items.rest);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    page ++;
  };
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  Current.get($stateParams.currentId).then(function(item) {
    console.log(item);
    $scope.item = item;
  })
  //$scope.item = Current.get($stateParams.currentId);
})