/*
 angular-stackoverflow-activity - v0.1.0
 (c) 2013, Daniel Kanze. https://github.com/gigablox
 License: MIT
*/

angular.module('stackoverflow.activity', ['stackoverflow.activity.tpls'])
.factory('StackoverflowActivityService', function($q,$rootScope,$resource) {
    var _stackoverflowActivity = {};
    _stackoverflowActivity.events = function(opts){
        return $resource('http://api.stackexchange.com/2.1/users/:user/timeline', {user: opts.user}, {
            get: {method:'JSONP',params:opts.params}
        });
    }
    return _stackoverflowActivity;
})

.directive('stackoverflowActivity', function() {
    return {
        restrict: 'EA',
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
angular.module('stackoverflow.activity.tpls', ['views/stackoverflow.activity.answerAccepted.tpl.html', 'views/stackoverflow.activity.badge.tpl.html', 'views/stackoverflow.activity.comment.tpl.html', 'views/stackoverflow.activity.questionAnswered.tpl.html', 'views/stackoverflow.activity.questionAsked.tpl.html', 'views/stackoverflow.activity.reviewed.tpl.html', 'views/stackoverflow.activity.revision.tpl.html', 'views/stackoverflow.activity.suggested.tpl.html', 'views/stackoverflow.activity.tpl.html']);

angular.module("views/stackoverflow.activity.answerAccepted.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.answerAccepted.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='accepted'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-checkmark stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.timeline_type}} {{event.post_type}} about {{event.title}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.badge.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.badge.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='badge'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-star stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} for {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.detail}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.comment.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.comment.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='commented'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-bubble stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} on {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.detail}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.questionAnswered.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.questionAnswered.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='answered'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-warning stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} a question</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.timeline_type}} a question about {{event.title}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.questionAsked.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.questionAsked.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='asked'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-question stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} a {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.timeline_type}} a {{event.post_type}} about {{event.title}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.reviewed.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.reviewed.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='reviewed'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-book-alt2 stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.detail?event.detail:event.timeline_type + '&nbsp;a&nbsp;' + event.post_type + '&nbsp;about&nbsp;' + event.title}}\n" +
    "            \n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.revision.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.revision.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='revision'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-pencil stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} for {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.detail}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.suggested.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.suggested.tpl.html",
    "<div class=\"stackoverflow-activity-row-event\" ng-show=\"event.timeline_type=='suggested'\">\n" +
    "    <div class=\"stackoverflow-activity-row-date\">{{event.creation_date | date:'medium'}}</div><br>\n" +
    "    <div class=\"stackoverflow-activity-row-icon-container\">\n" +
    "        <span class=\"icon-lightbulb stackoverflow-activity-row-icon\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-description-container\">\n" +
    "        <span class=\"stackoverflow-activity-description-label\">{{event.timeline_type}} edit for {{event.post_type}}</span>\n" +
    "        <br>\n" +
    "            \n" +
    "        <a href=\"{{event.link}}\" target=\"_blank\">@{{event.title}}</a>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-message-container\">\n" +
    "        <span class=\"stackoverflow-activity-message-lquote\">&#8220;</span>\n" +
    "        <span class=\"stackoverflow-activity-message\">\n" +
    "            {{event.detail}}\n" +
    "        </span>\n" +
    "        <span class=\"stackoverflow-activity-message-rquote\">&#8221;</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/stackoverflow.activity.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/stackoverflow.activity.tpl.html",
    "<div class=\"stackoverflow-activity\">\n" +
    "    <div class=\"stackoverflow-activity-header\">\n" +
    "        <span class=\"icon-stackoverflow stackoverflow-activity-icon\"></span>\n" +
    "        <span class=\"stackoverflow-activity-header-label\">STACKOVERFLOW ACTIVITY</span>\n" +
    "    </div>\n" +
    "    <div class=\"stackoverflow-activity-row\" ng-repeat=\"event in events | limitTo:options.limit\">\n" +
    "        <stackoverflow-activity-comment></stackoverflow-activity-comment>\n" +
    "        <stackoverflow-activity-question-asked></stackoverflow-activity-question-asked>\n" +
    "        <stackoverflow-activity-question-answered></stackoverflow-activity-question-answered>\n" +
    "        <stackoverflow-activity-badge></stackoverflow-activity-badge>\n" +
    "        <stackoverflow-activity-revision></stackoverflow-activity-revision>\n" +
    "        <stackoverflow-activity-answer-accepted></stackoverflow-activity-answer-accepted>\n" +
    "        <stackoverflow-activity-reviewed></stackoverflow-activity-reviewed>\n" +
    "        <stackoverflow-activity-suggested></stackoverflow-activity-suggested>\n" +
    "    </div>\n" +
    "</div>");
}]);
