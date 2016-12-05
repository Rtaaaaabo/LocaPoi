angular.module('myApp.controller', [])

//★★★★★★★★★CurrentCtrl★★★★★★★★★★★★
.controller('CurrentCtrl', function($scope, $timeout, Current){
  $scope.items = [];
  $scope.newItems = [];
  $scope.page = 1;
  $scope.currentPage = 1;

  /*Current.getCurrent().then(function(items) {
    $scope.items = items;
  })*/

  $scope.loadMoreData = function() {
    Current.getCurrent($scope.page).then(function(items) {
        $scope.items = $scope.items.concat(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    $scope.page ++;
    console.log($scope.items);
  }
})

//★★★★★★★★★DetailCtrl★★★★★★★★★★★★
.controller('DetailCtrl', function($scope, $stateParams, Current){
  $scope.items = Current.get($stateParams.currentId);
})

