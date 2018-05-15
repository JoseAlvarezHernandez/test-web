angular
  .module('moneyWeb')
  .run(acl);

acl.$inject = ['$rootScope', '$location'];
/**
 * @function acl
 */

function acl($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (localStorage.getItem('token') == null) {
      $location.path('/');
    }
  });
}