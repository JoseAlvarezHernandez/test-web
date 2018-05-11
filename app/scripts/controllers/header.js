'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:HeaderController
 * @description
 * # MainCtrl
 * Controller of the monsterMonitorApp
 */
angular
    .module('moneyWeb')
    .controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', '$window'];

/**
 * @function HeaderController
 */
function HeaderController($scope, $window) {
    const hc = this;
    //variables
    hc.isLogged = localStorage.getItem('token') == null ? false : localStorage.getItem('token');

    //Scopes
    $scope.$watch(
        () => {
            return localStorage.token;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.isLogged = newVal;
        }
    );
    //functions
    hc.logout = logout;

    function sendTo(path) {
        $window.location.href = `#!/${path}`;
    }

    function logout() {
        hc.isLogged = false;
        localStorage.clear();
        $window.location.href = '#!/';
    }
}
