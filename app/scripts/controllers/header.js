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

HeaderController.$inject = ['Resource', 'Utils', '$scope', '$window', '$compile'];

/**
 * @function HeaderController
 */
function HeaderController(Resource, Utils, $scope, $window, $compile) {
    const hc = this;
    //variables
    hc.isLogged = localStorage.getItem('isLogged') == null ? false : localStorage.getItem('isLogged');
    hc.userId = localStorage.getItem('userId') == null ? 0 : localStorage.getItem('userId');
    hc.name = localStorage.getItem('name') == null ? '' : localStorage.getItem('name');
    hc.email = localStorage.getItem('email') == null ? '' : localStorage.getItem('email');
    hc.currentUser = localStorage.getItem('status') == null ? 0 : localStorage.getItem('status');
    hc.type = localStorage.getItem('type') == null ? 0 : localStorage.getItem('type');
    hc.mode = localStorage.getItem('mode') == null ? false : localStorage.getItem('mode');
    hc.mode = localStorage.getItem('botAssignable') == null ? false : localStorage.getItem('botAssignable');

    hc.change = {
        currentPassword: '',
        oldPassword: '',
    };
    //Se actualiza en tiempo real la informacion del usuario activo 
    let updateUserData = setInterval(function () {
        if (localStorage.getItem('bearer') == 'null' || localStorage.getItem('bearer') == null) {
            clearInterval(updateUserData);
        } else {
            if (localStorage.getItem('userId') == null || localStorage.getItem('userId') == 'null') {
                clearInterval(updateUserData);
            } else {
                Resource.getUserStatus(localStorage.getItem('userId')).then((data) => {
                    if (data.data.error) {
                        clearInterval(updateUserData);
                    } else {
                        localStorage.setItem('status', data.data.status);
                    }
                });
            }
        }
    }, 5000);
    //Scopes
    $scope.$watch(
        () => {
            return localStorage.botAssignable;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.botAssignable = newVal;
        }
    );
    $scope.$watch(
        () => {
            return localStorage.isLogged;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.isLogged = newVal;
        }
    );
    $scope.$watch(
        () => {
            return localStorage.status;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.currentUser = newVal;
        }
    );
    $scope.$watch(
        () => {
            return localStorage.name;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.name = newVal;
        }
    );
    $scope.$watch(
        () => {
            return localStorage.type;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.type = newVal;
        }
    );
    $scope.$watch(
        () => {
            return localStorage.userId;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.userId = newVal;
        }
    );
    $scope.$watch(
        () => {
            return localStorage.email;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.email = newVal;
        }
    );
    //functions
    hc.logout = logout;
    hc.changeStatus = changeStatus;
    hc.getInitials = getInitials;
    hc.changePassword = changePassword;
    hc.sendTo = sendTo;
    hc.changeMode = changeMode;

    function sendTo(path) {
        $window.location.href = `#!/${path}`;
    }

    function changeMode() {
        if (hc.currentUser == '2') {
            let userId = localStorage.getItem('userId');
            changeStatus(userId, 1);
        }
        let status = localStorage.getItem('botAssignable');
        let msg = status == 'true' ? 'Has entrado al modo administrador, todos las funcionalidades han sido activadas' : 'Has entrado al modo agente, las funciones de administrador se han deshabilitado';
        status = status == 'true' ? false : true;
        localStorage.setItem('botAssignable', status);

        //change action botAssignable
        let user = Utils.buildUser();
        user.userId = localStorage.getItem('userId');
        user.name = localStorage.getItem('name');
        user.privileges.actions.botAssignable = status;
        //load homePage
        if (user.privileges.type == '1' || user.privileges.type == 1) {
            user.homePage = '#!/admin';
        } else {
            user.homePage = '#!/user';
        }
        Resource.editUser(user).then((data) => { });
        bootbox.dialog({
            title: 'Confirmación',
            message: msg,
            closeButton: true,
            buttons: {
                'confirm': {
                    label: 'Ok',
                    className: 'btn btn-success'
                },
            },
        });
    }
    /** */
    function getInitials(name) {
        return Utils.getInitials(name);
    }
    function changeStatus(userId, status) {
        localStorage.setItem('status', status);
        hc.currentUser = status;
        Resource.changeStatus(status, userId).then((data) => { });
    }
    function logout() {
        Resource.changeStatus(0, localStorage.getItem('userId'));
        hc.isLogged = false;
        localStorage.clear();
        $window.location.href = '#!/';
    }
    function changePassword() {
        hc.change = {};
        let message = '<div class="form-style">' +
            '<form >' +
            '<div class="form-group">' +
            '<label class="text-label">Contraseña actual</label>' +
            '<input ng-model="hc.change.currentPassword" id="currentPassword" type="password" class="modal-input" name="currentPassword" />' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="text-label">Contraseña nueva</label>' +
            '<input ng-model="hc.change.newPassword" id="newPassword" type="password" class="modal-input" name="newPassword" />' +
            '</div>' +
            '<div id="no-data" class="alert-span"></div>' +
            '<div class="spacer">&nbsp;</div>' +
            '</form>' +
            '</div>';
        let template = angular.element(message);
        let linkFn = $compile(template);
        let html = linkFn($scope);
        let dialog = bootbox.dialog({
            size: 'large',
            title: "Cambiar contraseña",
            closeButton: true,
            message: html,
            buttons: {
                'cancel': {
                    label: 'Cancelar',
                    className: 'btn btn-danger',
                    callback: function () {
                        hc.change = {};
                    }
                },
                'confirm': {
                    label: 'Enviar',
                    className: 'btn btn-success',
                    callback: function () {
                        Utils.validateFormPassword(hc.email, hc.change, dialog);
                        return false;
                    },
                },
            },
        });
    }
}
