'use strict';

/**
 * @ngdoc function
 * @name schedulerUiApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the schedulerUiApp
 */
angular.module('schedulerUiApp')
.controller('UserCtrl', function ($scope, $state, userService) {

    $scope.errorMsg = "";
    $scope.login = function(loginForm,user){
        if(loginForm.$valid){
            console.log('valid');
            $scope.errorMsg = "";
        	$scope.pageLoader = true;
            var data = {
                userName : user.name,
                password : user.password
            };
            userService.login(data).then(function(resp){
                $scope.pageLoader = false;
                localStorage.setItem('user',JSON.stringify(resp));

                $state.go('home');
            },function(err){
                $scope.pageLoader = false;
                $scope.errorMsg = err.message;
            })
        }else{
            $scope.errorMsg = "please enter valid details";
        }
    };
    
});
