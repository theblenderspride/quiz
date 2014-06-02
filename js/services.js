var quizApp = angular.module('quizApp');


quizApp.service('loginService', function($http, $q) {

    this.login = function(user) {
        var defer = $q.defer();
        $http({
            method: "post",
            url: "login.php",
            data: JSON.stringify(user)
        }).success(function(data) {
            defer.resolve(data);
        }).error(function() {
            defer.reject('could not login');
        });

        return defer.promise;
    }

    this.logout = function() {
        var defer = $q.defer();
        $http({
            method: "post",
            url: "logout.php",
        }).success(function(data) {
            defer.resolve(data);
        }).error(function() {
            defer.reject('could not logout');
        });

        return defer.promise;
    }
});


quizApp.service('quizService', function($http, $q) {

    this.getQuestions = function() {
        var defer = $q.defer();

        $http.get('quiz.json')
            .success(function(data) {
                defer.resolve(data);
            })
            .error(function() {
                defer.reject('could not find quiz.json');
            });

        return defer.promise;
    }
});