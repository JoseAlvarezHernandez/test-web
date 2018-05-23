'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the moneyWeb
 */
angular
  .module('moneyWeb')
  .controller('UserController', UserController);

  UserController.$inject = ['Resource', 'Utils'];

function UserController(Resource, Utils){
  const uc = this;
  // variables
  uc.addressData = {
    street: '',
    number: 0,
    city: '',
    state: '',
    zipcode: 0,
    country: '',
  };
  const token = localStorage.getItem('token');

  getUsers();
  getAddress();

  function getUsers(){
    return Resource.getUsers(token)
      .then((res) => {
        uc.users = res.data;
        return uc.users;
      })
      .catch((error) => {
      });
  }

  uc.sendAddress = sendAddress;
  uc.getAddress = getAddress;

  function sendAddress(){
    let inputs = ['streetInput', 'numberInput', 'cityInput', 'stateInput', 'zipcodeInput', 'countryInput'];
    const valid = Utils.getInputsValidation(inputs);

    if (!valid) {
      uc.error = 'Please fill out all fields';
    } else {
      Resource.addAddress(token, uc.addressData)
        .then((res) => {
          if(res.statusText == "Created"){
            uc.success = true;
          }
        })
        .catch((error) => {
            uc.error = true;
        });
    }
  }

  function getAddress(){
    return Resource.getUsers(token)
      .then((res) => {
          uc.addressData = res.data.address[res.data.address.length-1];
      })
      .catch((error) => {
      });
  }
}