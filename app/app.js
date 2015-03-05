/**
 * Created by Sohan on 04.03.2015.
 */

var app = angular.module('app', []);

app.controller("MTController", function($scope, $timeout) {

    $scope.additionTask = false;
    $scope.subtractionTask = false;
    $scope.multiplicationTask = false;
    $scope.divisionTask = false;

    $scope.selectedTasksArray = [];

    $scope.panelMessage = "";

    $scope.taskAnswer = undefined;
    $scope.taskString = undefined;

    $scope.answersStatistic = {
        correctly : 0,
        incorrect : 0
    };

    $scope.changeTask = function(taskName){
        if(taskName == 0){
            if($scope.additionTask){
                $scope.additionTask = false;
                removeTask(0);
            } else {
                $scope.additionTask = true;
                $scope.selectedTasksArray.push(0);
            }
        } else if(taskName == 1){
            if($scope.subtractionTask){
                $scope.subtractionTask = false;
                removeTask(1);
            } else {
                $scope.subtractionTask = true;
                $scope.selectedTasksArray.push(1);
            }
        } else if(taskName == 2){
            if($scope.multiplicationTask){
                $scope.multiplicationTask = false;
                removeTask(2);
            } else {
                $scope.multiplicationTask = true;
                $scope.selectedTasksArray.push(2);
            }
        } else if(taskName == 3){
            if($scope.divisionTask){
                $scope.divisionTask = false;
                removeTask(3);
            } else {
                $scope.divisionTask = true;
                $scope.selectedTasksArray.push(3);
            }
        } else {
            console.log("Error: undefined task");
            return;
        }
        if($scope.selectedTasksArray.length == 0){
            //
        } else if($scope.selectedTasksArray.length == 1){
            $scope.generateTask();
        }
    }

    function removeTask(task){
        var index = getTaskIndex(task);
        if(index >= 0){
            $scope.selectedTasksArray.splice(index, 1);
        }
    }

    function getTaskIndex(task){
        for(var i = 0; i < $scope.selectedTasksArray.length; i++){
            if($scope.selectedTasksArray[i] == task){
                return i;
            }
        }
        return -1;
    }

    $scope.checkAnswer = function(answer){
        if(answer == ''){
            $("#messagePanel").css('color', "black");
            $scope.panelMessage = "Введите число в поле для ответа";
        } else if(isNaturalNumber(answer)){
            if(answer == $scope.taskAnswer){
                $("#messagePanel").css('color', "green");
                $scope.panelMessage = "Правильно!";
                $scope.taskString = $scope.taskString.replace('?', '') + " " + answer;
                $scope.answersStatistic.correctly++;
            } else {
                $("#messagePanel").css('color', "red");
                $scope.panelMessage = "Неверно!";
                $scope.taskString = $scope.taskString.replace('?', '') + " " + answer;
                $scope.answersStatistic.incorrect++;
            }
            var sum = $scope.answersStatistic.correctly + $scope.answersStatistic.incorrect;
            var str = $scope.answersStatistic.correctly / sum * 100 + "%";
            $("#answersStatistic").css('width', str);
            $timeout( $scope.generateTask , 1500);
        } else {
            $("#messagePanel").css('color', "black");
            $scope.panelMessage = "Число должно быть натуральным";
        }
    }

    $scope.generateTask  = function(){

        $scope.taskAnswer = 0;
        $scope.taskString = "";
        $scope.panelMessage = "";

        switch($scope.selectedTasksArray[generateRandomNumber(0, $scope.selectedTasksArray.length)]){
            case 0 : generateAdditionTask();
                break;
            case 1 : generateSubtractionTask();
                break;
            case 2 : generateMultiplicationTask();
                break;
            case 3 : generateDivisionTask();
                break;
        }
    }


    function generateAdditionTask(){
        var num1 = generateRandomNumber(1, 99);
        var num2 = generateRandomNumber(1, 100 - num1);
        $scope.taskString = num1 + " + " + num2 + " = ?";
        $scope.taskAnswer = num1 + num2;
    }

    function generateSubtractionTask(){
        var num1 = generateRandomNumber(1, 99);
        var num2 = generateRandomNumber(1, num1);
        $scope.taskString = num1 + " - " + num2 + " = ?";
        $scope.taskAnswer = num1 - num2;
    }

    function generateMultiplicationTask(){
        var num1 = generateRandomNumber(1, 10);
        var num2 = generateRandomNumber(1, 10);
        $scope.taskString = num1 + " * " + num2 + " = ?";
        $scope.taskAnswer = num1 * num2;
    }

    function generateDivisionTask(){
        var naturalResults = [];
        var num1 = generateRandomNumber(1, 100);
        for(var i = 0; i < num1; i++){
            if(isNaturalNumber(num1 / i)){
                naturalResults.push(i);
            }
        }
        var index = generateRandomNumber(0, naturalResults.length);

        $scope.taskString = num1 + " : " + naturalResults[index] + " = ?";

        $scope.taskAnswer = num1 / naturalResults[index];
        console.log($scope.taskString + "\nAnsswer: " + $scope.taskAnswer);
    }

    function generateRandomNumber(start, end){
        return Math.floor((Math.random() * end) + start);
    }

    function isNaturalNumber(number) {
        number = number.toString();
        var n1 = Math.abs(number),
            n2 = parseInt(number, 10);
        return !isNaN(n1) && n2 === n1 && n1.toString() === number;
    }

});