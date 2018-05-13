'use strict';

/**
 * @ngdoc service
 * @name schedulerUiApp.userService
 * @description
 * # userService
 * Service in the schedulerUiApp.
 */
angular.module('schedulerUiApp')
  .service('userService', function ($q, $http, $mdToast) {

    this.signup = function (user) { 
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/user/signup', 
            data: user
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.login = function (user) { 
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/user/login', 
            data: user
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getSchedules = function () { 
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/schedule'
        })
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(err) {
            deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getSchedulerList = function () { 
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/user/schedule/list'
        })
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(err) {
            deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.createSchedule = function (data) { 
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/schedule',
            data : data
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.deleteSchedules = function (id) { 
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: API_END_POINT+'/schedule/'+id,
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };


    this.showmdToast = function(type, message){
        $mdToast.show(
            $mdToast.simple({
                textContent: message,                       
                hideDelay: 3000,
                position: 'top right',
                toastClass: type  
            })
        );
    };
    
});
