'use strict';

/**
 * @ngdoc function
 * @name schedulerUiApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the schedulerUiApp
 */
angular.module('schedulerUiApp')
.controller('SignupCtrl', function ($scope, $state, userService) {

	$scope.tzList = ["IST", "PST"];
    $scope.errorMsg = "";
    $scope.signup = function(signupForm,user){
        if(signupForm.$valid){
            console.log('valid');
            if(user.password == user.confirmPassword){
            	$scope.errorMsg = "";
	        	$scope.pageLoader = true;
	            var data = {
	                userName : user.userName,
	                password : user.password,
	                canSchedule : true,
	                timeZone : user.timeZone
	            };
	            userService.signup(data).then(function(resp){
	                $scope.pageLoader = false;
	                userService.showmdToast('success', resp.message);
	                $state.go('login');
	            },function(err){
	                $scope.pageLoader = false;
	                $scope.errorMsg = err.message;
	            })
            }else{
            	$scope.errorMsg = "passwords not matching";
            }
            
        }else{
            $scope.errorMsg = "please enter valid details";
        }
    };
    
});
