'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:AddFavoritesCtrl
 * @description
 * # AddFavoritesCtrl
 * Controller of the moneyWeb
 */
angular
  .module('moneyWeb')
  .controller('AddFavoritesController', AddFavoritesController);

AddFavoritesController.$inject = ['Resource'];

function AddFavoritesController(Resource){
    var au = this;
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