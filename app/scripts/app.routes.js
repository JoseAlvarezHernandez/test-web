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
      templateUrl: 'views/user.html',
      controller: 'UserDetailController as uc',
    })
    .otherwise({
      redirectTo: '/',
    });
  /*
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
*/
}
