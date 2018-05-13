'use strict';

/**
 * @ngdoc overview
 * @name schedulerUiApp
 * @description
 * # schedulerUiApp
 *
 * Main module of the application.
 */
angular
  .module('schedulerUiApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'ngMaterialDatePicker'
  ])
  .factory('httpinterceptor', ['$q', '$location','$injector', function($q, $location,$injector) {
        return {
            // responseError: function(response) {
            //     console.log('this --->',response);
            //     if (response.status === 401 || response.data.status === 401 ) {
            //         console.log('401 error');
            //         // $location.path('/');
            //         // localStorage.clear();
                    
            //     }
            //     return $q.reject(response);
            // },
            request: function(config) {
                if (window.localStorage && localStorage.getItem('user')) {
                    var token = JSON.parse(localStorage.getItem('user')).token;
                    config.headers.Authorization = 'Bearer ' + token;
                }
                delete config.headers['content-type'];
                return config;
            },
        };
    }])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('httpinterceptor');
    var resolve = {
        auth: (['$q','$location', function($q,$location) {
            var defer = $q.defer();
            if (localStorage.getItem('user')){
                defer.resolve({
                    user: function() {
                        return JSON.parse(localStorage.getItem('token'));
                    }
                }); 
            } else {
                defer.reject();
            }
            return defer.promise;
        }])
    };
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('login', {
        url: '/',
        controller: 'UserCtrl',
        templateUrl: 'views/login.html'
    })
    .state('signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'views/signup.html'
    })
    .state('home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'views/homepage.html',
        resolve : resolve
    });

    $locationProvider.hashPrefix('');
  })
