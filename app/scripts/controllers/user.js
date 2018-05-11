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
  .controller('User', User);

User.$inject = ['Resource'];

function User(Resource){
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