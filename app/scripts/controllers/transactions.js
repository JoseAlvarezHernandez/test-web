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

    getAccountUser();

    function getAccountUser() {

        tc.reqData = [];

        const req = Resource.getAccountUser(localStorage.getItem('token')).then(function(result) {
            tc.reqData = result.data;
            console.log(tc.reqData);

            if (tc.reqData.status === 'rejected') {

                tc.class = 'table-danger';

            }

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