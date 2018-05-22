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

TransactionsController.$inject = ['$scope', 'Resource', 'Utils'];

/**
 * @function TransactionsController
 */
function TransactionsController($scope, Resource, Utils) {

    const tc = this;

    //Variables

    tc.selected = { account: 0, label: 'Select one' };
    const token = localStorage.getItem('token');
    tc.size = null;
    tc.transactions = {
        selected: '',
        destAccount: '',
        cvv: '',
        pin: '',
        detail: '',
        isValid: false
    };

    //Scopes
    $scope.$watch(
        () => {
            return tc.transactions;
        },
        (newVal, oldVal) => {
            if (!tc.items)
                return;

            if (Utils.getInputsValidation(['selected', 'desAccount', 'selected', 'cvv']))
                newVal.isValid = true;
            else
                newVal.isValid = false;

        },
        true
    );



    //  Functions
    getAccountUser();
    tc.getAccounts = getAccounts;
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



}