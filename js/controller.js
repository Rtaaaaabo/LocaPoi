angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, $timeout, $cordovaGeolocation, Current){
  $scope.items = [];
  $scope.page = 1;

  $scope.loadMoreData = function() {
    Current.getShop($scope.page).then(function(items) {
        $scope.items = $scope.items.concat(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    $scope.page ++;

  };
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  $scope.items = Current.get($stateParams.currentId);
})