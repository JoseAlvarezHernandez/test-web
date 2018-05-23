'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:HeaderController
 * @description
 * # MainCtrl
 * Controller of the monsterMonitorApp
 */
angular
    .module('moneyWeb')
    .controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', '$window'];

/**
 * @function HeaderController
 */
function HeaderController($scope, $window) {
    const hc = this;
    //variables
    hc.isLogged = localStorage.getItem('token') == null ? false : localStorage.getItem('token');

    //Scopes
    $scope.$watch(
        () => {
            return localStorage.token;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.isLogged = newVal;
        }
    );

    $scope.$watch(
        () => {
            return localStorage.path;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.path = newVal;
        }
    );
    //functions
    hc.logout = logout;

    function logout() {
        hc.isLogged = false;
        localStorage.clear();
        $window.location.href = '/';
    }
}
