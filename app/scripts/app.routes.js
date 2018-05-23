angular
    .module('moneyWeb')
    .config(routes);

routes.$inject = ['$routeProvider', '$locationProvider'];
/**
 * @function routes
 */
function routes($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController as vm',
        })
        .when('/user', {
            templateUrl: 'views/userdetails.html',
            controller: 'UserController as uc',
        })
        .when('/favorites', {
            templateUrl: 'views/favorites.html',
            controller: 'FavoritesController as fc',
        })
        .when('/transactions', {
            templateUrl: 'views/transactions.html',
            controller: 'TransactionsController as tc',
        })
        .otherwise({
            templateUrl: 'views/404.html',
        });

    $locationProvider.html5Mode({ enabled: true, requireBase: false });
}
