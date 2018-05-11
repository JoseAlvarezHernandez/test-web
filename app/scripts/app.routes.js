angular
  .module('moneyWeb')
  .config(routes);

routes.$inject = ['$routeProvider', '$locationProvider'];
/**
 * @function routes
 */
function routes($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController as vm',
    })
    .when('/user', {
      templateUrl: 'views/userdetails.html',
      controller: 'UserDetailsController as uc',
    })
    .when('/favorites', {
      templateUrl: 'views/favorites.html',
      controller: 'FavoritesController as fc',
    })
    .when('/cards', {
      templateUrl: 'views/cards.html',
      controller: 'CardsController as cc',
    })
    .otherwise({
      redirectTo: '/',
    });
}
