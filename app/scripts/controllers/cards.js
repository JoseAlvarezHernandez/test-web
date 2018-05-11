'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the testApp
 */
angular.module('moneyWeb')
    .controller('CardsController', CardsController);

CardsController.$inject = ['Resource', 'Utils'];


function CardsController(Resource, Utils) {
    const cc = this;

    // variables
    cc.cards = [];
    cc.cardData = { account: '', balance: '', type: '', cardMask: '', cvc: '', label: '', expires: '', pin: '' };


    //functions
    cc.showNewCardModal = showNewCardModal;

    getCards();

    function getCards() {
        return Resource.getCards(localStorage.getItem('token'))
            .then(function(res) {
                cc.cards = res.data;
                return cc.cards;
            })
            .catch(function(error) {});
    }

    function showNewCardModal() {
        let buttons = {
            cancel: {
                label: 'Cancel',
                className: 'btn-danger',
                callback: function() {
                    console.log('cancelado');

                }
            },
            confirm: {
                label: 'Create account',
                className: 'btn-success',
                callback: function() {
                    console.log('creado');
                }
            }
        };

        Utils.showModal("nuevo",
            `<form class="form-group col-md-12">
              <div class="form-group col-md-6">
                  <input ng-model="cc.cardData.account" type="email" class="form-control" id="account" placeholder="account">
                  <input ng-model="cc.cardData.type" type="password" class="form-control" id="type" placeholder="type">
              </div>
              <div class="form-group col-md-6">
                  <input type="email" class="form-control" id="balance" placeholder="balance">
                  <input type="email" class="form-control" id="cardMask" placeholder="cardMask">
              </div>
              <div class="form-group col-md-6">
                  <input type="email" class="form-control" id="cvc" placeholder="cvc">
                  <input type="email" class="form-control" id="expires" placeholder="expires">
              </div>
              <div class="form-group col-md-6">
                  <input type="email" class="form-control" id="label" placeholder="label">
                  <input type="email" class="form-control" id="pin" placeholder="pin">
              </div>
          </form>`,
            buttons);

    }
}