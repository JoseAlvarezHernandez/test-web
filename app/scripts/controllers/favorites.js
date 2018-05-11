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
    const au = this;
        au.favorite = {};
        au.addFavorites = addFavorites;

    function addFavorites() {
        Resource.addFavorites(au.favorite)
            .then(function(res) {
                au.message = res.data.message;
                au.success = true;
                au.favorite = {};
            })
            .catch(function(error) {
                au.error = true;
            });
    }
}