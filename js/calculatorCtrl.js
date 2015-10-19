(function(calcApp){
    calcApp.controller('CalcController', ['$scope', function($scope){
        $scope.screen = '0';
        $scope.dec = '.';
        var clearType = null;
        var currentVal = '';
        var newVal = '';
        var operationType = 0;


        $scope.numbers = function(num){
            if($scope.screen === '0' && operationType === 0){
                $scope.screen = '';
                $scope.screen = $scope.screen + '' + num;
            }else if($scope.screen.length < 10){
                $scope.screen = $scope.screen + '' + num;
            }
        };

        $scope.decimal = function(){
            $scope.screen = $scope.screen + '' + $scope.dec;
        };

        $scope.clearScreen = function(type){
            switch(type){
                case 1:
                    $scope.screen = '0';
                    operationType = 0;
                    currentVal = '';
                    break;
                case 2:
                    newVal -= $scope.screen;
                    $scope.screen = '';
                    break;
            }
        };

        $scope.operation = function(opType){
            operationType = opType;
            currentVal = $scope.screen;
            $scope.screen = '';
        };

        var operationTask = function(){
            if(newVal.toString().length > 10){
                newVal = newVal.toString();
                for(var i = 0; i < newVal.length; i++){
                    if(newVal[i] === '.'){
                        newVal = parseFloat(newVal);
                        newVal = newVal.toFixed(10 - i);
                    }
                }
            }
            $scope.screen = '';
            $scope.screen = newVal;
        };

        $scope.equal = function(){
            switch(operationType){
                case 1:
                    newVal = +$scope.screen + +currentVal;
                    operationTask();
                    break;
                case 2:
                    newVal = currentVal - $scope.screen;
                    operationTask();
                    break;
                case 3:
                    newVal = currentVal * $scope.screen;
                    operationTask();
                    break;
                case 4:
                    newVal = currentVal / $scope.screen;
                    operationTask();
                    break;
                case 5:
                    newVal = currentVal % $scope.screen;
                    operationTask();
                    break;
            }
        };
    }]);
}(angular.module('CalculatorApp')));