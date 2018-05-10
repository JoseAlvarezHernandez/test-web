'use strict';

/**
 * @ngdoc overview
 * @name moneyWeb
 * @description
 * # moneyWeb
 *
 * Main module of the application.
 */
angular
  .module('moneyWeb', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push(httpInterceptor);
  }])
  /* 
  .config(['$locationProvider', ($locationProvider) => {
    $locationProvider.hashPrefix('');
  }])
  */