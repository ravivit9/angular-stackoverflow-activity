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
})

.directive('stackoverflowActivityQuestionAsked', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.questionAsked.tpl.html',
        link: function(scope, controller) {
        }
    };
})

.directive('stackoverflowActivityQuestionAnswered', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.questionAnswered.tpl.html',
        link: function(scope, controller) {
        }
    };
})

.directive('stackoverflowActivityBadge', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.badge.tpl.html',
        link: function(scope, controller) {
        }
    };
})

.directive('stackoverflowActivityRevision', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.revision.tpl.html',
        link: function(scope, controller) {
        }
    };
})

.directive('stackoverflowActivityAnswerAccepted', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.answerAccepted.tpl.html',
        link: function(scope, controller) {
        }
    };
})

.directive('stackoverflowActivityReviewed', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.reviewed.tpl.html',
        link: function(scope, controller) {
        }
    };
})

.directive('stackoverflowActivitySuggested', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/stackoverflow.activity.suggested.tpl.html',
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
    QuestionComment             Complete
    AnswerComment               Complete
    
    ====================== QUESTION ASKED
    <timeline_type> a <post_type>
    @URL<post_id>
    "<detail>"
    QuestionAsked               Complete
    
    =================== QUESTION ANSWERED
    <timeline_type> a question
    @URL<post_id>
    "<detail>"
    QuestionAnswered            Complete
    
    ============================== BADGE
    <timeline_type> for <post_type>
    @URL<post_id>
    "<detail>"
    QuestionBadge               Complete
    AnswerBadge                 Complete
    
    =========================== REVISION
    <timeline_type> for <post_type>
    @URL<title>
    "<detail>"    
    QuestionRevision            Complete
    AnswerRevision              Complete
    
    ==================== ANSWER ACCEPTED
    <timeline_type> <post_type>
    @URL<post_id>
    "<title>"    
    AnswerAccepted              Complete
    
    =========================== REVIEWED
    <timeline_type> <post_type>
    @URL<post_id>
    "<title>"    
    QuestionReviewed            Complete
    AnswerReviewed              Complete
    
    ========================== SUGGESTED
    <timeline_type> edit on <post_type>
    @URL<post_id>
    "<detail>"    
    QuestionSuggested           Complete
    AnswerSuggested             Complete
*/