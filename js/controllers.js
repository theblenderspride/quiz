var quizAppControllers = angular.module("quizAppControllers", []);


quizAppControllers.controller("LoginCtrl", ['$scope', '$window',
    '$http', 'loginService',

    function($scope, $window, $http, loginService) {
        function validateForm() {
            var isValid = true;
            $scope.emailError = null;
            $scope.passwordError = null;
            if (!$scope.email) {
                $scope.emailError = "Please provide an email";
            }
            if (!$scope.password) {
                $scope.passwordError = "Please provide a password";
            }
            if ($scope.emailError || $scope.passwordError)
                isValid = false;
            return isValid;
        }

        $scope.login = function() {
            if (validateForm()) {
                var user = {
                    email: $scope.email,
                    password: $scope.password
                };

                loginService.login(user)
                    .then(function(data) {
                        if (data.status === "true") {
                            loginService.setEmail(data.email)
                            window.location = "#/quiz";
                        } else {
                            alert("Login invalid");
                        }
                    }, function(error) {
                        alert(error);
                    });
            }
        };

        $scope.register = function() {
            validateForm();
        };

    }
]);

quizAppControllers.controller("QuizCtrl", ['$scope', '$window', '$http', 'initializeData', 'loginService',
    function($scope, $window, $http, initializeData, loginService) {

        $scope.questions = initializeData.questions;
        $scope.email = loginService.getEmail();

        var currentIndex = 0;
        $scope.currentQuestion = $scope.questions[0];
        $scope.next = "continue";
        $scope.isComplete = false;

        $scope.logout = function() {
            console.log("from logout: ", loginService.logout());

            loginService.logout()
                .then(function(data) {
                    $window.location = "";
                }, function(error) {
                    alert(error);
                });
        }

        $scope.forward = function() {
            if ($scope.next == "Finish") {
                generateAnswersUI();
            } else if (currentIndex != $scope.questions.length - 1) {
                currentIndex++;
                $scope.currentQuestion = $scope.questions[currentIndex];
                if (currentIndex >= $scope.questions.length - 1) {
                    $scope.next = "Finish";
                }
            }
        };

        function generateAnswersUI() {
            $scope.isComplete = true;
            var i,
                correctAnswers = 0,
                question,
                len = $scope.questions.length;

            for (i = 0; i < len; i++) {
                question = $scope.questions[i];
                if (question.selectedAnswer == question.correct) {
                    correctAnswers++;
                    question.isCorrectAnswer = true;
                    question.answerClass = "correct";
                    question.answerMessage = "Correct!"
                } else {
                    question.isCorrectAnswer = false;
                    question.answerClass = "incorrect";
                    question.answerMessage = "You answered incorrect";
                    question.correcAnswerMessage = "Correct answer";
                }
            }
            $scope.percentage = Math.round((correctAnswers / len) * 100) + "%";
        }
    }
]);