var quizApp = angular.module('quizApp');

// Login service- supports login(), logout() and register() operations and few helpers like setEmail() and getEmail()
// Login Service explicitly uses $q.defer(), to implement promises
quizApp.service('loginService', function($http, $q) {
    // stores the current email of the user
    var email = "";

    this.setEmail = function(emailAddress) {
        this.email = emailAddress;
    };

    this.getEmail = function() {
        return this.email;
    };

    // The actual user login implementaion
    this.login = function(user) {
        var defer = $q.defer();
        $http({
            method: "post",
            url: "server/login.php",
            data: JSON.stringify(user)
        }).success(function(data) {
            defer.resolve(data);
        }).error(function() {
            defer.reject('could not login');
        });

        return defer.promise;
    }

    // The actual user logout implementaion
    this.logout = function() {
        var defer = $q.defer();
        $http({
            method: "post",
            url: "server/logout.php",
        }).success(function(data) {
            defer.resolve(data);
        }).error(function() {
            defer.reject('could not logout');
        });

        return defer.promise;
    };

    // The actual user registration implementaion
    this.register = function(user) {
        var defer = $q.defer();
        $http({
            method: "post",
            url: "server/register.php",
            data: JSON.stringify(user)
        }).success(function(data) {
            defer.resolve(data);
        }).error(function() {
            defer.reject('could not logout');
        });

        return defer.promise;
    };

});

// Quiz Service - supports getQuestions() operation which returns the set of questions with answers
quizApp.service('quizService', function($http, $q) {

    this.getQuestions = function() {
        var defer = $q.defer();

        $http.get('data/quiz.json')
            .success(function(data) {
                defer.resolve(data);
            })
            .error(function() {
                defer.reject('could not find quiz.json');
            });

        return defer.promise;
    }
});