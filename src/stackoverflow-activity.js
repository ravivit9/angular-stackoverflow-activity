angular.module('stackoverflow.activity', ['ngResource','stackoverflow.activity.tpls'])
.factory('StackoverflowActivityService', function($q,$rootScope,$resource) {
    var _stackoverflowActivity = {};
    _stackoverflowActivity.events = function(opts){
        return $resource('http://api.stackexchange.com/2.1/users/:user/timeline', {user: opts.user}, {
            search: {method:'JSONP',params:opts.params}
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
})

.directive('stackoverflowActivityComment', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.comment.tpl.html',
        link: function(scope, controller) {
        }
    };
});

/*
    -post_type: question, answer
    -timeline_type: commented, asked, answered, badge, revision, accepted, reviewed, suggested
    
    ============================ COMMENT
    <timeline_type> on <post_type>
    @URL<comment_id>
    "<detail>"
    QuestionComment             Not Done
    AnswerComment               Not Done
    
    ====================== QUESTION ASKED
    <timeline_type> a <post_type>
    @URL<post_id>
    "<detail>"
    QuestionAsked               Not Done
    
    =================== QUESTION ANSWERED
    <timeline_type> a question
    @URL<post_id>
    "<detail>"
    QuestionAnswered            Not Done
    
    ============================== BADGE
    <timeline_type> for <post_type>
    @URL<post_id>
    "<detail>"
    QuestionBadge               Not Done
    AnswerBadge                 Not Done
    
    =========================== REVISION
    <timeline_type> for <post_type>
    @URL<title>
    "<detail>"    
    QuestionRevision            Not Done
    AnswerRevision              Not Done
    
    ==================== ANSWER ACCEPTED
    <timeline_type> <post_type>
    @URL<post_id>
    "<title>"    
    AnswerAccepted              Not Done
    
    =========================== REVIEWED
    <timeline_type> <post_type>
    @URL<post_id>
    "<title>"    
    QuestionReviewed            Not Done
    AnswerReviewed              Not Done
    
    ========================== SUGGESTED
    <timeline_type> edit on <post_type>
    @URL<post_id>
    "<detail>"    
    QuestionSuggested           Not Done
    AnswerSuggested             Not Done
*/