'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the testApp
 */
angular.module('moneyWeb')
    .controller('CardsCtrl', CardsController);

CardsController.$inject = ['Resource', 'Utils', '$scope'];


function CardsController() {
    const cc = this;

    // variables
    cc.account = 0;
    cc.type = '';
    cc.balance = 0;
    cc.cardMask = 0;
    cc.cvc = 0;
    cc.expires = '';
    cc.label = 'juan carlos';
    cc.pin = 0;

    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}