// 'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */

var app = angular.module('angularApp', ['ui.router', 'rzModule', 'ngSanitize', 'angular-jwt']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider', '$qProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider, $qProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $qProvider.errorOnUnhandledRejections(false);

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('public', {
        url: '',
        abstract: true,
        views: {
          '': {
            templateUrl: 'components/public/public.html',
          }
        }
      }).state('public.homepage', {
        url: '/',
        views: {
          '': {
            templateUrl: 'components/public/homepage/homepage.html',
          }
        }
      });
  }
]);
