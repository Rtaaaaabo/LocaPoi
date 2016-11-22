// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myApp', ['ionic'])
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

.controller('DetailCtrl', function($scope, $stateParams, Current){
  $scope.item = Current.get($stateParams.currentId);
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text(null);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('scaffold', {
    abstract : true,
    templateUrl : "templates/scaffold.html"
  })
  .state('current', {
    url : '/current',
    parent : "scaffold",
    templateUrl : "templates/current.html",
    controller : 'CurrentCtrl'
  })
  .state('detail', {
    url : '/current/:currentId',
    parent : 'scaffold',
    templateUrl : "templates/current-detail.html",
    controller : "DetailCtrl"
  })
  $urlRouterProvider.otherwise("/current");
})

.factory('Current', function(){
  var items = [
   {
      id:0,
      title : '古川未鈴',
      distance : 540,
      image : 'img/mirin.png'
    },
    {
      id:1,
      title : '相沢梨紗',
      distance : 350,
      image : 'img/risa.jpg'
    },
    {
      id:2,
      title : '夢眠ねむ',
      distance : 250,
      image : 'img/nemu.jpg'
    },
    {
      id : 3,
      title : '成瀬瑛美',
      distance : 689,
      image : 'img/eimi.jpg'
    },
    {
      id : 4,
      title : '最上もが',
      distance : 567,
      image : 'img/moga.jpg'
    },
    {
      id : 5,
      title : '藤咲彩音',
      distance : 789,
      image : 'img/ayane.jpg'
    }
  ];
  return {
    all : function() {
      return items;
    },
    get : function(currentId) {
      for (var i = 0; i < items.length; i++) {
        if(items[i].id === parseInt(currentId)){
          return items[i];
        }
      }
      return null;
    }
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
