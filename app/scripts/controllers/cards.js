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

CardsController.$inject = ['$scope', 'Resource', 'Utils'];


function CardsController($scope,Resource, Utils) {
    const cc = this;
    const LIMIT_YEARS = 10;
    const token = localStorage.getItem('token');
    

    // variables
    cc.newCardModal = '../views/modal/card-form.html';
    cc.cardConfirmModal = '../views/modal/card-confirm.html';
    cc.cards = [];
    cc.monthSelected = { month: 'A99', label: 'mm' };
    cc.yearSelected = { year: 'A99', label: 'yyyy' };
    cc.cardSelected = { card: 'A99', label: 'Select one' };
    cc.cardTypes = getCardsTypeCombo();
    cc.months = getMonths();
    cc.years = getYears();
    cc.cardData = { account: '', balance: '', type: '', cardMask: '', cvc: '', label: '', expires: '', pin: '', isValid: false };
    cc.auxMessage = '';

    //functions
    cc.saveCard = saveCard;
    cc.getCards = getCards;
    cc.reset = reset;

    //Scopes
    $scope.$watch(
        () => {
            return cc.cardData;
        },
        (newVal, oldVal) => {
            
            if (!document.getElementById('account'))
            return;

        if (Utils.getInputsValidation(['account', 'type', 'balance', 'cardMask','label','pin','cvv','year', 'month'])) 
                newVal.isValid = true;
            else
                newVal.isValid = false;

        },
        true
    );

    getCards();

    

    function getCards() {
        Resource.getCards(token)
            .then(function (res) {
                cc.cards = res.data;
                return cc.cards;
            });
    }

    function saveCard() {

            cc.isValid = true;
            cc.cardData.expires = `${cc.monthSelected.month }${cc.yearSelected.year}`;
            cc.cardData.type = cc.cardSelected.card;

            Resource.createCard(token, cc.cardData)
            .then(function (res) {
                getCards();
                reset();
                cc.auxMessage = '';
            })
            .catch(err=>{
                // open modal
                cc.auxMessage = err.data.message;

            });

    }

    function reset() {
        cc.cardData = { account: '', balance: '', type: '', cardMask: '', cvv: '', label: '', expires: '', pin: '' };
        cc.monthSelected = { month: 'A99', label: 'mm' };
        cc.yearSelected = { year: 'A99', label: 'yyyy' };
        cc.cardSelected = { card: 'A99', label: 'Select one' };
    }

    function getYears(){
        const year = new Date().getFullYear();
        let range = [];
        range.push(cc.yearSelected );
        range.push({ year: String(year).substring(2) , label: year});
        for (let i = 1; i < LIMIT_YEARS; i++) {
            range.push({ year: String(year + i).substring(2) , label: year + i });
        }
        return range;
    }

    function getMonths(){

        const mts = moment.monthsShort();
        let range = [cc.monthSelected];

        for (let i = 0; i< mts.length; i++ ) {
            range.push({ month: i+1 <10 ? `0${i+1}` : String(i+1),  label: mts[i]  });
        }
        return range;
    }

    function getCardsTypeCombo(){
        return [
            cc.cardSelected ,
            {card: 'Credit card', label: 'Credit card'},
            {card: 'Debit card', label: 'Debit card'}
        ];
    }

}
