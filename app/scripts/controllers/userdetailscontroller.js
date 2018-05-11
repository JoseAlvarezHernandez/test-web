'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:UserdetailscontrollerCtrl
 * @description
 * # UserdetailscontrollerCtrl
 * Controller of the moneyWeb
 */
angular
  .module('moneyWeb')
  .controller('UserDetailsController', UserController);

UserController.$inject = ['Resource'];

function UserController(Resource){
  var uc = this;
      uc.users = [];

  activate();

  function activate() {
    return getUsers()
      .then(function(res){
        console.log('activated');
      });
  }

  function getUsers(){
    return Resource.getUsers(localStorage.getItem('email'))
      .then(function(res) {
        console.log(res);
        uc.users = res.data;
        return uc.users;
      });
  }
}