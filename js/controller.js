angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, Current){
  $scope.items = Current.all();
  $scope.moredata = false;

  $scope.loadMoreData = function() {
    $scope.items.push({
      id : $scope.items.length,
      title : $scope.items.length,
      distance : $scope.items.length
    });
    if($scope.items.length == 100){
      $scope.moredata = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  $scope.item = Current.get($stateParams.currentId);
})