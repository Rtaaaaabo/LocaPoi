angular.module('myApp.router', [])

//戻るボタン文字の消去
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text(null);
})

//画面遷移
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