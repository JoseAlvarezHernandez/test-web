'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the testApp
 */

const secret = () => {
    return value => {
        let cad = String(value);
        let aux = "";

        if (cad) {
            for(let i =0 ;i < cad.length; i++){
                if (i<cad.length-3) {
                    aux +="*";
                }else{
                    aux += cad[i];
                }
            }
            return aux;
        }else{
            return value;
        }
    };
  };

angular
    .module('moneyWeb')
    .controller('CardsController', CardsController)
    .filter('secret', secret);

CardsController.$inject = ['Resource', 'Utils'];


function CardsController(Resource, Utils) {
    const cc = this;

    // variables
    cc.newCardModal = '../views/modal/card-form.html';
    cc.cards = [];
    cc.monthSelected = { month: 'A99', label: 'mm' };
    cc.yearSelected = { year: 'A99', label: 'yyyy' };
    cc.cardSelected = { card: 'A99', label: 'Select one' };
    cc.cardTypes = getCardsCombo();
    cc.months = getMonths();
    cc.years = getYears();
    cc.cardData = { account: '', balance: '', type: '', cardMask: '', cvc: '', label: '', expires: '', pin: '' };
    cc.auxMessage = '';

    //functions
    cc.saveCard = saveCard;
    cc.getCards = getCards;
    cc.reset = reset;

    getCards();


    function getCards() {
        Resource.getCards(localStorage.getItem('token'))
            .then(function (res) {
                cc.cards = res.data;
                return cc.cards;
            })
            .catch(function (error) { });
    }

    function saveCard() {

        if (Utils.getInputsValidation(['account', 'type', 'balance', 'cardMask','label','pin','cvv','year', 'month'])) {
            cc.cardData.expires = `${cc.monthSelected.month }${cc.yearSelected.year}`;
            cc.cardData.type = cc.cardSelected.card;

            Resource.createCard(localStorage.getItem('token'), cc.cardData)
            .then(function (res) {
                getCards();
                reset();
                cc.auxMessage = '';
            })
            .catch(err=>{
                cc.auxMessage = err.data.message;

            });
        }else{
            cc.auxMessage = 'Please fill out all fields';

            setTimeout(() => {
                inputs.map(input => input.input.removeClass('alert-effect'));
            }, 500);
        }

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
        for (let i = 1; i < 7; i++) {
            range.push({ year: String(year + i).substring(2) , label: year + i });
        }
        return range;
    }

    function getMonths(){
        return [
            cc.monthSelected,
            { month: '01', label: '01' },
            { month: '02', label: '02' },
            { month: '03', label: '03' },
            { month: '04', label: '04' },
            { month: '05', label: '05' },
            { month: '06', label: '06' },
            { month: '07', label: '07' },
            { month: '08', label: '08' },
            { month: '09', label: '09' },
            { month: '10', label: '10' },
            { month: '11', label: '11' },
            { month: '12', label: '12' }
        ];
    }

    function getCardsCombo(){
        return [
            cc.cardSelected ,
            {card: 'Credit card', label: 'Credit card'},
            {card: 'Debit card', label: 'Debit card'}
        ];
    }
}
