angular.module('stackoverflow.activity', ['stackoverflow.activity.tpls'])

.factory('StackoverflowActivityService', function($q,$rootScope,$resource) {

    var _stackoverflowActivity = {};

    var events = function(opts){
        return $resource('http://api.stackexchange.com/2.1/users/:user/timeline', {user: opts.user}, {search: {method:'JSONP',params:{key:opts.key,site:'stackoverflow',callback: 'JSON_CALLBACK'}}});
    }
        
    _stackoverflowActivity.events = function(opts){
        events(opts).search().$promise.then(
        function(events){
            $rootScope.$broadcast('stackoverflowActivityEvents', events.items);
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

/*
    -post_type: question, answer
    -timeline_type: commented, asked, answered, badge, revision, accepted, reviewed, suggested
    -0/13 Completed
    
    QuestionComment     Not Done
    AnswerComment       Not Done
    QuestionAsked       Not Done
    QuestionAnswered    Not Done
    QuestionBadge       Not Done
    AnswerBadge         Not Done
    QuestionRevision    Not Done
    AnswerRevision      Not Done
    AnswerAccepted      Not Done
    QuestionReviewed    Not Done
    AnswerReviewed      Not Done
    QuestionSuggested   Not Done
    AnswerSuggested     Not Done
*/