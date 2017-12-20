'use strict';

/**
 * @ngdoc service
 * @name edurekaUiApp.userService
 * @description
 * # userService
 * Service in the edurekaUiApp.
 */
angular.module('edurekaUiApp')
  .service('userService', function ($q, $http) {

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

    this.getInstructors = function () { 
        console.log('getInstructors');
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/get_instructors'
        })
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(err) {
            deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getCourses = function () { 
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/get_courses'
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.addWebinar = function (data) { 
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/add_new_session',
            data : data
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.addWebinar = function (data) { 
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/add_new_session',
            data : data
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.uploadExcel = function (data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/add_webinar_report',
            data : data,
            headers : {
                'Content-Type': undefined,
                // 'Accept' : '*/*'
            },
            // processData: false,
            // contentType: false
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.addCustomEntity = function (data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/add_custom_entity',
            data : data
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getCustomEntities = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/get_custom_entities'
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getSessions = function (data) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/get_sessions'
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getWebinars = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: API_END_POINT+'/get_webinars'
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getAnalysis = function (data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/get_analysis',
            data : data
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };

    this.getEntityAnalysis = function (data,course) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: API_END_POINT+'/get_entity_analysis/'+course,
            data : data
        })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
    };
    
});
