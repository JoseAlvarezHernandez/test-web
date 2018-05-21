'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the testApp
 */
angular
.module('moneyWeb')
    .controller('CardsController', CardsController);

CardsController.$inject = ['Resource', 'Utils'];


function CardsController(Resource, Utils) {
    const cc = this;

    // variables
    cc.newCardModal = '../views/modal/card-form.html'
    cc.cards = [];
    cc.cardTypes = ['Select one', 'Credit card', 'Debit card'];
    cc.cardData = { account: '', balance: '', type: cc.cardTypes[0], cardMask: '', cvc: '', label: '', expires: '', pin: '' };

    //functions
    cc.saveCard = saveCard;
    cc.getCards = getCards;

    getCards();

    function getCards() {
        return Resource.getCards(localStorage.getItem('token'))
            .then(function(res) {
                cc.cards = res.data;
                return cc.cards;
            })
            .catch(function(error) {});
    }

    function saveCard() {

        return Resource.createCard(localStorage.getItem('token'), cc.cardData)
            .then(function(res) {
                getCards();
            });

    }
}