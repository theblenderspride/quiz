var quizAppControllers = angular.module("quizAppControllers", []);


quizAppControllers.controller("LoginCtrl", ['$scope', '$window',
    '$http',
    function($scope, $window, $http) {
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
                $.ajax({
                    method: "POST",
                    url: 'login.php',
                    data: user,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).done(function(data) {
                    if (data === "true") {
                        window.location = "#/quiz";
                    } else {
                        alert("Login invalid");
                    }
                }).fail(function(error) {
                    alet(error);
                });
            }
        };

        $scope.register = function() {
            validateForm();
        };

    }
]);

quizAppControllers.controller("QuizCtrl", ['$scope', '$window',
    function($scope, $window) {
        $scope.questions = [{
            "question": "Which is not an advantage of using a closure?",
            "selectedAnswer": "",
            "choices": [
                "Prevent pollution of global scope",
                "Encapsulation",
                "Private properties and methods",
                "Allow conditional use of ‘strict mode’"
            ],
            "correct": "Allow conditional use of ‘strict mode’"
        }, {
            "question": "To create a columned list of twoline email subjects and dates for a masterdetail view, which are the most semantically correct?",
            "selectedAnswer": "",
            "choices": ["<div>+<span>", "<tr>+<td>", "<ul>+<li>", "<p>+<br>", "none of these", "all of these"],
            "correct": "<div>+<span>"
        }, {
            "question": "To pass an array of strings to a function, you should not use...",
            "selectedAnswer": "",
            "choices": ["fn.apply(this, stringsArray)", "fn.call(this, stringsArray)", "fn.bind(this, stringsArray)"],
            "correct": "fn.bind(this, stringsArray)"
        }, {
            "question": "____ and ____ would be the HTML tags you would use to display a menu item and its description",
            "selectedAnswer": "",
        }, {
            "question": "Given <div id=”outer”><div class=”inner”></div></div>, which of these two is the most performant way to select the inner div?",
            "choices": ['getElementById("outer ").children[0]', 'getElementsByClassName("inner ")[0]'],
            "selectedAnswer": "",
            "correct": 'getElementById("outer ").children[0]'
        }];

        var currentIndex = 0;
        $scope.currentQuestion = $scope.questions[0];
        $scope.next = "continue";
        $scope.isComplete = false;

        $scope.email = checkCookie("email");

        $scope.logout = function() {
            $.ajax({
                method: "POST",
                url: 'logout.php'
            }).done(function(data) {
                $window.location = "";
            }).fail(function(error) {
                alet(error);
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