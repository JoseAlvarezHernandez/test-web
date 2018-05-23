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

FavoritesController.$inject = ['Resource', '$scope', 'Utils'];

function FavoritesController(Resource, $scope, Utils) {

    //variables
    const fc = this;
    fc.favorites = null;
    fc.token = localStorage.getItem('token');

    getFavorites();

    //watcher
    $scope.$watch(
        () => {
            return fc.favorite;
        },
        (newVal, oldVal) => {
            if (oldVal === undefined)
                return;

            if (Utils.getInputsValidation(['account', 'alias', 'email', 'max_amount', 'bank', 'name']))
                newVal.isValid = true;
            else
                newVal.isValid = false;

        },
        true
    );
    //functions
    fc.addFavorite = addFavorite;

    async function getFavorites() {
        loader();
        let result = [];
        try {
            result = await Resource.getFavorites(fc.token);
            $scope.$apply(() => fc.favorites = result.data);
            closeLoader();
        } catch (error) {
            fc.favorites = error;
        }
    }


    async function addFavorite() {
        loader();
        try {
            const fav = await Resource.addFavorites(fc.token, fc.favorite);
            bootbox.alert({ message: fav.data.message, size: 'small' });
            fc.favorite = {};
            getFavorites();
        } catch (error) {
            bootbox.alert({ message: error.data.message, size: 'small' });
            closeLoader();
        }
    }
}