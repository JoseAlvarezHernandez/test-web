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
    cc.cardTypes = ['Select one', 'Credit card', 'Debit card'];
    cc.cardData = { account: '', balance: '', type: cc.cardTypes[0], cardMask: '', cvv: '', label: '', expires: '', pin: '' };
    cc.errorMessage = '';

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
        console.log("holaaaaaaaa");

        
        let error = false;
        const inputs = getInputs();

        error = animateInput(inputs);

        if (error) {
            cc.error = 'Please fill out all fields';
            setTimeout(() => {
                inputs.map(input => input.input.removeClass('alert-effect'));
            }, 500);
            return false;
        }else{
            Resource.createCard(localStorage.getItem('token'), cc.cardData)
            .then(function (res) {
                getCards();
            })
            .catch(err=>{
                console.log(err);
                
            })
        }
    }

    function reset() {
        cc.cardData = { account: '', balance: '', type: cc.cardTypes[0], cardMask: '', cvv: '', label: '', expires: '', pin: '' };
        cc.submitValue = 'Next';
        cc.errorMessage = '';
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

    function getInputs() {
        const account = $('#account'),
        type = $('#type'),
        balance = $('#balance'),
        cardMask = $('#cardMask'),
        expires = $('#expires'),
        label = $('#label'),
        pin = $('#pin'),
        cvv = $('#cvv');

        let inputs = [
            { input: account, status: Utils.validateFieldEmpty(cc.cardData.account) },
            { input: type, status: Utils.validateFieldEmpty(cc.cardData.type) },
            { input: balance, status: Utils.validateFieldEmpty(cc.cardData.balance) },
            { input: cardMask, status: Utils.validateFieldEmpty(cc.cardData.cardMask) },
            { input: cvv, status: Utils.validateFieldEmpty(cc.cardData.cvv) },
            { input: expires, status: Utils.validateFieldEmpty(cc.cardData.expires) },
            { input: label, status: Utils.validateFieldEmpty(cc.cardData.label) },
            { input: pin, status: Utils.validateFieldEmpty(cc.cardData.pin) }
        ];

        return inputs;
    }
}