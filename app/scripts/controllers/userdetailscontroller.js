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

  getUsers();

  function getUsers(){
    return Resource.getUsers(localStorage.getItem('token'))
      .then(function(res) {
        uc.users = res.data;
        return uc.users;
      })
      .catch(function(error){
      });
  }
}
