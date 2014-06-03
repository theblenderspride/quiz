var quizAppControllers = angular.module("quizAppControllers", []);

// Login controller
quizAppControllers.controller("LoginCtrl", ['$scope', '$rootScope', '$window',
    '$http', 'loginService',

    function($scope, $rootScope, $window, $http, loginService) {
        // for persiting email and password between routing
        if ($rootScope.loginUser && $rootScope.loginUser.email) {
            $scope.loginEmail = $rootScope.loginUser.email;
        }
        if ($rootScope.loginUser && $rootScope.loginUser.password) {
            $scope.loginPassword = $rootScope.loginUser.password;
        }

        if ($rootScope.registerUser && $rootScope.registerUser.email) {
            $scope.registerEmail = $rootScope.registerUser.email;
        }
        if ($rootScope.registerUser && $rootScope.registerUser.password) {
            $scope.registerPassword = $rootScope.registerUser.password;
        }

        // validates the login form
        function validateLoginForm() {
            var isValid = true;
            $scope.emailError = null;
            $scope.passwordError = null;
            if (!$scope.loginEmail) {
                $scope.emailError = "Please provide an email";
            }
            if (!$scope.loginPassword) {
                $scope.passwordError = "Please provide a password";
            }
            if ($scope.emailError || $scope.passwordError)
                isValid = false;
            return isValid;
        }

        // validates the registration form
        function validateRegisterForm() {
            var isValid = true;
            $scope.emailError = null;
            $scope.passwordError = null;
            if (!$scope.registerEmail) {
                $scope.emailError = "Please provide an email";
            }
            if (!$scope.registerPassword) {
                $scope.passwordError = "Please provide a password";
            }
            if ($scope.emailError || $scope.passwordError)
                isValid = false;
            return isValid;
        }

        // for handling login operation for user
        $scope.login = function() {
            if (validateLoginForm()) {
                var user = {
                    email: $scope.loginEmail,
                    password: $scope.loginPassword
                };

                $rootScope.loginUser = user;
                $scope.loginErrorMessage = "";

                loginService.login(user)
                    .then(function(data) {
                        if (data.status === "true") {
                            loginService.setEmail(data.email)
                            $window.location = "#/quiz";
                        } else {
                            $scope.loginErrorMessage = "Login invalid, please try again";
                        }
                    }, function(error) {
                        $scope.loginErrorMessage = error;
                    });
            }
        };

        // for handling registration of user
        $scope.register = function() {
            if (validateRegisterForm()) {
                var user = {
                    email: $scope.registerEmail,
                    password: $scope.registerPassword
                };

                $rootScope.registerUser = user;

                $scope.registrationSuccessMessage = null;
                $scope.registrationErrorMessage = null;

                loginService.register(user)
                    .then(function(data) {
                        if (data === "true") {
                            $scope.registrationSuccessMessage = "Registration succesfull, please login now";
                        } else {
                            $scope.registrationErrorMessage = "Registration failed, please try again";
                        }
                    }, function(error) {
                        $scope.registrationErrorMessage = error;
                    });
            }
        };

    }
]);


// Quiz controller - handles displaying questions and shows the results at the end of the quiz
quizAppControllers.controller("QuizCtrl", ['$scope', '$window', '$http', 'initializeData', 'loginService',
    function($scope, $window, $http, initializeData, loginService) {

        $scope.questions = initializeData.questions;
        $scope.email = loginService.getEmail();

        var currentIndex = 0;
        $scope.currentQuestion = $scope.questions[0];

        if ($scope.questions.length == 1)
            $scope.next = "Finish";
        else
            $scope.next = "continue";

        $scope.isComplete = false;

        // for handling logout operation
        $scope.logout = function() {
            console.log("from logout: ", loginService.logout());

            loginService.logout()
                .then(function(data) {
                    $window.location = "";
                }, function(error) {
                    alert(error);
                });
        }

        // for handling next question
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
                isCorrectAnswer,
                len = $scope.questions.length;

            for (i = 0; i < len; i++) {
                question = $scope.questions[i];
                if (question.type) {
                    question.selectedAnswers.splice(1, 1);
                    var j, l = question.selectedAnswers.length;
                    for (j = 0; j < l; j++) {
                        if (question.selectedAnswers[j] !== question.correct[j]) {
                            break;
                        }
                    }
                    isCorrectAnswer = (j == l);
                } else {
                    isCorrectAnswer = (question.selectedAnswer == question.correct);
                }

                if (isCorrectAnswer) {
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