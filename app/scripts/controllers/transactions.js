'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:TransactionsController
 * @description
 * # TransactionsController
 * Controller of the monsterMonitorApp
 */
angular
    .module('moneyWeb')
    .controller('TransactionsController', TransactionsController);

LoginController.$inject = ['Resource'];

/**
 * @function TransactionsController
 */
function TransactionsController(Resource) {

    const tc = this;

    //Variables
    tc.class = 'table-success';
    const token = localStorage.getItem('token');

    //  Functions
    tc.getAccountUser = getAccountUser;

    function getAccountUser() {

        tc.reqData = [];

        const req = Resource.getAccountUser(token)
            .then(function(result) {

                tc.reqData = result.data;

            });


    }

    function getClass(status) {

        console.log(status);

        tc.reqData.forEach(
            function addclass(value) {

                console.log(value);

            }
        )

    }

}