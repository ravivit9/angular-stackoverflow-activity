angular.module('stackoverflow.activity', ['stackoverflow.activity.tpls'])

.factory('StackoverflowActivityService', function($q,$rootScope,$resource) {

    var _stackoverflowActivity = {};

    var events = function(opts){
        return $resource('https://api.github.com/users/:user/events', {user: opts.user}, {search: {method:'JSONP',params:{callback: 'JSON_CALLBACK',access_token:opts.access_token}}});
    }
        
    _stackoverflowActivity.events = function(opts){
        events(opts).search().$promise.then(
        function(events){
            $rootScope.$broadcast('stackoverflowActivityEvents', events.data);
        });
    }

    return _stackoverflowActivity;
  })

.directive('stackoverflowActivity', function() {
    return {
        restrict: 'E',
        replace: true,
        scope:{
          events: '=',
          options: '=',
        },
        templateUrl: 'views/stackoverflow.activity.tpl.html',
        link: function(scope, controller) {
        }
    };
});