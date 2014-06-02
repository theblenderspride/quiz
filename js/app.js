var quizApp = angular.module('quizApp', [
    'ngRoute',
    'quizAppControllers',
]);

function checkCookie(key) {
    return (document.cookie.match('(^|; )' + key + '=([^;]*)') || 0)[2];
}

quizApp.config([
    '$routeProvider',
    function($routeProvider, loginService) {
        var email = checkCookie("email");

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
                initializeData: function($q, $timeout, loginService, quizService) {
                    if (!loginService.getEmail() && !email) {
                        window.location.href = '#/login';
                    } else {
                        if (email)
                            loginService.setEmail(email);
                        return quizService.getQuestions();
                    }
                }
            }
        }).
        otherwise({
            redirectTo: '/login'
        });
    }
]);