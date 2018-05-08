angular
  .module('moneyWeb')
  .config(routes);

/**
 * @function routes
 */
function routes($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController as vm',
    })
    .otherwise({
      redirectTo: '/',
    });
}
