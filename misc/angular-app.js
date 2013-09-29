angular.module('app', [
  'ngRoute',
  'ngResource',
  'app.tpls',
  'ngResource',
  'stackoverflow.activity'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  
  $locationProvider.html5Mode(true);

  $routeProvider.when('/angular-stackoverflow-activity', {
    templateUrl:'views/angular-stackoverflow-activity.tpl.html',
    controller:'AppCtrl'
  });
  
  $routeProvider.otherwise({redirectTo:'/angular-stackoverflow-activity'});
}])


.controller('AppCtrl', ['$scope','StackoverflowActivityService', function($scope,StackoverflowActivityService) {

  StackoverflowActivityService.events({
    user:'gigablox',
    access_token:'ef39c49946b602db1e249feda19bd3514ec8f08c'
  });

  $scope.$on('stackoverflowActivityEvents', function(e,d){
    $scope.events = d;
  });
  
  $scope.options = {
    limit:5
  };
}]);