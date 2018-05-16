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

TransactionsController.$inject = ['Resource'];

/**
 * @function TransactionsController
 */
function TransactionsController(Resource) {

    const tc = this;

    tc.items = [{ account: 0, label: 'Select one' }, ...data];
    tc.selected = { account: 0, label: 'Select one' };
    //Variables
    tc.class = 'table-success';
    const token = localStorage.getItem('token');
    tc.size = null;

    //  Functions
    getAccountUser();
    tc.getAccounts = getAccounts;

    function getAccountUser() {

        tc.reqData = [];

        const req = Resource.getAccountUser(token)
            .then(function (result) {

                tc.reqData = result.data;
                tc.size = tc.reqData.length;

            });


    }

    function getAccounts() {

        console.log("hi");

        tc.reqAccounts = [];

        const req = Resource.getUsers(token)
            .then(function(result) {

                tc.reqAccounts = result.data;
                console.log(tc.reqAccounts);

            });

    }

}