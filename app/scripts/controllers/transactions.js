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

    //Variables

    tc.selected = { account: 0, label: 'Select one' };
    const token = localStorage.getItem('token');
    tc.size = null;

    //  Functions
    getAccountUser();
    tc.getAccounts = getAccounts;
    tc.miFuncion = miFuncion;
    tc.getAccountUser = getAccountUser;

    function getAccountUser() {

        tc.reqData = [];

        const req = Resource.getAccountUser(token)
            .then(function(result) {

                tc.reqData = result.data;
                tc.size = tc.reqData.length;

            });


    }

    function getAccounts() {

        tc.items = [];

        const req = Resource.getUsers(token)
            .then(function(result) {

                tc.reqAccounts = result.data.accounts;
                tc.items = [{ account: 0, label: 'Select one' }, ...tc.reqAccounts];

            });

    }

    function miFuncion() {
        let username = $('#username'),
            password = $('#password'),
            name = $('#name'),
            phone = $('#phone'),
            inputs = [
                { input: username, status: (Utils.validateFieldEmpty(vm.loginData.username) && Utils.validateEmail(vm.loginData.username)) }
            ];
    }

    function animateInput(inputs) {
        let status = false;
        inputs.forEach((val) => {
            if (!val.status) {
                status = true;
                val.input.addClass('alert-input alert-effect');
            } else {
                val.input.removeClass('alert-input');
            }
        }, this);
        return status;
    }

}