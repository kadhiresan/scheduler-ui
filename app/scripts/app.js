'use strict';

/**
 * @ngdoc overview
 * @name edurekaUiApp
 * @description
 * # edurekaUiApp
 *
 * Main module of the application.
 */
angular
  .module('edurekaUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial'
  ])
  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl',
  //       controllerAs: 'main'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl',
  //       controllerAs: 'about'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
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
                // if (window.localStorage && localStorage.getItem('token')) {
                //     var token = localStorage.getItem('token');
                //     config.headers.Authorization = 'Bearer ' + token;
                // }
                delete config.headers['content-type'];
                return config;
            },
        };
    }])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('httpinterceptor');
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('login', {
        url: '/',
        controller: 'UserCtrl',
        templateUrl: 'views/login.html'
    })
    .state('home', {
        abstract : true,
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'views/homepage.html'
    })
    .state('home.analysis', {
        url: '/analysis',
        controller: 'HomeCtrl',
        templateUrl: 'views/stats.html'
    })
    .state('home.entityAnalysis', {
        url: '/entityAnalysis',
        controller: 'HomeCtrl',
        templateUrl: 'views/entity-analysis.html'
    })
    .state('home.uploadForm', {
        url: '/upload',
        controller: 'HomeCtrl',
        templateUrl: 'views/upload-form.html'
    })
    .state('home.customEntities', {
        url: '/custom-entities',
        controller: 'HomeCtrl',
        templateUrl: 'views/custom-entities.html'
    });

    $locationProvider.hashPrefix('');
  })
