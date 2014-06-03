// Main module
var quizApp = angular.module('quizApp', [
    'ngRoute',
    'quizAppControllers',
]);

// To check whether 'email' cookie is present( when the session is present at the server we are generating cookie, if the session is closed the cookie is deleted from the server)
function checkCookie(key) {
    return (document.cookie.match('(^|; )' + key + '=([^;]*)') || 0)[2];
}

// configuration
quizApp.config([
    '$routeProvider',
    function($routeProvider) {
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
                // before going to quiz view, we need to fetch the questions and display them accordingly, so 'resolve' object is used
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