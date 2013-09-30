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
    
    ******** Use single directive and pass middle fragments? ********
    
    -comment icon
    "<timeline_type> made on a <post_type>"
    QuestionComment             Not Done
    AnswerComment               Not Done
    
    -question asked icon
    "<timeline_type> a <post_type>"
    QuestionAsked               Not Done
    
    -question answered icon
    "<timeline_type> a <post_type>"
    QuestionAnswered            Not Done
    
    -badge icon
    "<timeline_type> awarded to <post_type>"
    QuestionBadge               Not Done
    AnswerBadge                 Not Done
    
    -revision icon
    "<timeline_type> a <post_type>"
    QuestionRevision            Not Done
    AnswerRevision              Not Done
    
    -answer accepted icon
    "<timeline_type> a <post_type>"
    AnswerAccepted              Not Done
    
    -reviewed icon
    "<timeline_type> a <post_type>"
    QuestionReviewed            Not Done
    AnswerReviewed              Not Done
    
    -suggested icon
    "<timeline_type> a <post_type>"
    QuestionSuggested           Not Done
    AnswerSuggested             Not Done
*/