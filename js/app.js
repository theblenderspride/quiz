var quizApp = angular.module('quizApp', [
    'ngRoute',
    'quizAppControllers'
]);

function checkCookie(key) {
    return (document.cookie.match('(^|; )' + key + '=([^;]*)') || 0)[2];
}

quizApp.config([
    '$routeProvider',
    function($routeProvider) {
        var email = checkCookie("email");
        if (!email) {
            window.location.href = '#/login';
        }

        $routeProvider.
        when('/login', {
            templateUrl: "partials/login.html",
            controller: 'LoginCtrl'
        }).
        when('/register', {
            templateUrl: "partials/register.html",
            controller: 'LoginCtrl'
        }).
        when('/quiz', {
            templateUrl: "partials/quiz.html",
            controller: 'QuizCtrl',
            resolve: {
                initializeData: function($q, $timeout, quizService) {
                    return quizService.getQuestions();
                }
            }
        }).
        otherwise({
            redirectTo: '/login'
        });
    }

]);