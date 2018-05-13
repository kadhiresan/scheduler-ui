'use strict';

/**
 * @ngdoc function
 * @name schedulerUiApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the schedulerUiApp
 */
angular.module('schedulerUiApp')
.controller('HomeCtrl', function ($scope, $state, userService) {

	$scope.showSchedules = true;
	$scope.bookSchedules = false;

    // Role of user from login
	$scope.schedulerRole = JSON.parse(localStorage.getItem('user')).canSchedule;

	$scope.signOut = function(){
		localStorage.clear();
		$state.go('login');
	}

	$scope.minDate = new Date();
	
    // get list of schedules for current user
	$scope.getSchedules = function(){
  		userService.getSchedules().then(function(resp){
            $scope.pageLoader = false;
            $scope.schedulesList = resp;
            angular.forEach($scope.schedulesList,function(schedules){
                // timezone can be dynamic in future
                if(JSON.parse(localStorage.getItem('user')).timeZone == "PST"){
                    schedules.displayDate = moment(schedules.scheduleDate).tz("America/Los_Angeles").format("DD-MMM-YY hh:mm A");   
                }else{
                    schedules.displayDate = moment(schedules.scheduleDate).format("DD-MMM-YY hh:mm A");   
                }
            })
        },function(err){
            $scope.pageLoader = false;
            
        })
  	};

    // Get the list of users who is available for scheduling to show in dropdown
  	$scope.getSchedulerList = function(){
  		userService.getSchedulerList().then(function(resp){
            $scope.pageLoader = false;
            $scope.schedulerList = resp;
        },function(err){
            $scope.pageLoader = false;
            $scope.errorMsg = err.message;
        })
  	};

    // create a schedule (book appointement)
    $scope.scheduler = {};
  	$scope.createSchedule = function(scheduleData){
  		$scope.pageLoader = true;
  		$scope.errorMsg = "";
  		console.log('scheduleData',scheduleData);
  		userService.createSchedule(scheduleData).then(function(resp){
            $scope.pageLoader = false;
            $scope.scheduler = {};
            userService.showmdToast('success', resp.message);
        },function(err){
            $scope.pageLoader = false;
            userService.showmdToast('error',err.message);
        })
  	}

    $scope.deleteSchedules = function(id){
        $scope.pageLoader = true;
        $scope.errorMsg = "";
        userService.deleteSchedules(id).then(function(resp){
             userService.showmdToast('success', resp.message);
             // $scope.pageLoader = false;
             $scope.getSchedules();
        },function(err){
            $scope.pageLoader = false;
            userService.showmdToast('error',err.message);
        })

    }

  	
});
