'use strict';

/**
 * @ngdoc function
 * @name edurekaUiApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the edurekaUiApp
 */
angular.module('edurekaUiApp')
.controller('UserCtrl', function ($scope, userService, utilityService) {

    $scope.login = function(loginForm,user){
        if(loginForm.$valid){
        	$scope.pageLoader = true;
            var Data = {
                userName : user.name,
                password : user.password
            };
            userService.adminLogin(data).then(function(resp){
                $scope.pageLoader = false;
                localStorage.setItem('token',resp.token);
                $state.go('adminSettings');
            },function(err){
                $scope.pageLoader = false;
                utilityService.showmdToast('error',err.message);
            })
        }
    };
    
});
