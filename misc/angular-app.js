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
    key:'SvC5iN3YJE*W9pAMOE2n1Q(('
  });

  $scope.$on('stackoverflowActivityEvents', function(e,d){
    console.log(d);
    $scope.events = d;
  });
  
  $scope.options = {
    limit:5
  };
}]);