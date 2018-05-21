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

  function sendAddress(){
    //  Utils.getValidateInputs(['streetInput', 'numberInput']);
    Resource.addAddress(token, uc.addressData)
      .then((res) => {
        if(res.statusText == "Created"){
          console.log(res);
          uc.success = true;
        }
      })
      .catch((error) => {
          uc.error = true;
      });
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