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
    user:'1113921',
    params:{
      key:'SvC5iN3YJE*W9pAMOE2n1Q((',
      site:'stackoverflow',
      filter:'unsafe',
      callback: 'JSON_CALLBACK'
    }
  }).search().$promise.then(function(events){
    $scope.events = events.items;
  });

  $scope.options = {
    limit:5
  };
}]);