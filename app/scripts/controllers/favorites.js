'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the moneyWeb
 */
angular
  .module('moneyWeb')
  .controller('FavoritesController', FavoritesController);

FavoritesController.$inject = ['Resource'];

function FavoritesController(Resource){

    //variables
    const fc = this;
    fc.favorite = {};
    const token = localStorage.getItem('token');

    //functions
    fc.addFavorites = addFavorites;
    function addFavorites() {
        Resource.addFavorites(token, fc.favorite)
            .then(function(res) {
                fc.message = res.data.message;
                fc.success = true;
                fc.favorite = {};
            })
            .catch(function(error) {
                fc.error = true;
            });
    }
}