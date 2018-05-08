'use strict';

angular
    .module('moneyWeb')
    .factory('Utils', Utils);

Utils.$inject = ['$window'];

function Utils($window) {
    let isTokenExpired = false;
    return {
        orderBy: orderBy,
        validateEmail: validateEmail,
        validateFieldEmpty: validateFieldEmpty,
        getInitials: getInitials,
        getActions: getActions,
        buildUser: buildUser,
        modalLogin: modalLogin,
        handlerTokenExpired: handlerTokenExpired,
        compareObjects: compareObjects,
        tokenExpired: tokenExpired,
        getTokenExpired: getTokenExpired,
    };
    function getTokenExpired() {
        return isTokenExpired;
    }
    function tokenExpired(status) {
        isTokenExpired = status;
    }

    function compareObjects(objectOne, objectTwo) {
        return angular.toJson(objectOne) === angular.toJson(objectTwo);
    }

    function handlerTokenExpired(config) {
        let eventDate = config.responseTimestamp;
        eventDate = new Date(eventDate);
        modalLogin(eventDate);
    }

    /** */
    function modalLogin(eventDate) {
        let message = '<div class="form-style">' +
            '<form id="renewLogin">' +
            '<div class="form-group>' +
            '<label for="inputPassword" class="text-label">Usuario </label>' +
            '<input id="username" type="email" name="username" class="modal-input">' +
            '<label for="inputPassword" class="text-label">Contraseña </label>' +
            '<input id="password" type="password" name="password" class="modal-input">' +
            '</div>' +
            '<div class="spacer">&nbsp;</div>' +
            '<div id="no-data" class="alert-span"></div>' +
            '<div class="spacer">&nbsp;</div>' +
            '</form>' +
            '</div>';
        let dialog = bootbox.dialog({
            size: 'medium',
            title: "¡La sesión ha expirado! Introduzca los datos de acceso:",
            closeButton: false,
            message: message,
            buttons: {
                'cancel': {
                    label: 'Cancelar',
                    className: 'btn btn-danger',
                    callback: function () {
                        bootbox.hideAll();
                        dialog.modal('hide');
                        var passwordWrong = bootbox.dialog({
                            message: '<p class="text-center">Inicie sesión de nuevo.</p>',
                            closeButton: true
                        });
                        let eventDateUserId = localStorage.getItem('userId');
                        let type = localStorage.getItem('type');
                        logout();
                        localStorage.setItem('temporalType', type);
                        localStorage.setItem('eventDateUserId', eventDateUserId);
                        localStorage.setItem('eventDate', eventDate);
                    }
                },
                'confirm': {
                    label: 'Enviar',
                    className: 'btn btn-success modal-login',
                    callback: function () {
                        return executeRenewLogin();
                    },
                },
            },
        });
    }
    /** */
    function buildUser() {
        let actions = getActions();
        let user =
            {
                name: localStorage.getItem('name'),
                privileges:
                    {
                        type: parseInt(localStorage.getItem('type')),
                        app: localStorage.getItem('app'),
                        actions: actions,
                    }

            };
        return user;
    }
    /** */
    function getActions() {
        let actions = {}
        //actions from localStorage
        for (let m in localStorage) {
            if (m.split(".")[0] == "action") {
                actions[m.split(".")[1]] = localStorage.getItem(m) == 'false' ? false : true;
            }
        }
        return actions;
    }
    /**  */
    function getInitials(name) {
        let res = '';
        if (typeof name === 'undefined' || name == null) {
            res = 'CC';
        } else {
            let namePart = name.split(" ");
            if (namePart[1]) {
                res = namePart[0].substr(0, 1) + namePart[1].substr(0, 1);
            } else {
                res = namePart[0].substr(0, 1) + namePart[0].substr(0, 1);
            }
        }
        return res;
    }
    function orderBy(property, reverse) {
        reverse = (property === property) ? !reverse : false;
        return reverse;
    }
    function validateEmail(email) {
        const emailR = /^\w+([\.\-\+]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,4})+$/;
        if (emailR.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    function validateFieldEmpty(field) {
        const fieldR = /([^\s])/;
        if (field == null) {
            return true;
        } else if (fieldR.test(field)) {
            return false;
        } else {
            return true;
        }
    }

    function validateFormPassword(email, change, dialog) {
        let error = false;
        if (validateFieldEmpty(change.currentPassword)) {
            $("#currentPassword").addClass('alert-input alert-effect');
            error = true;
        } else {
            $("#currentPassword").removeClass('alert-input');
        }
        if (validateFieldEmpty(change.newPassword)) {
            $("#newPassword").addClass('alert-input alert-effect');
            error = true;
        } else {
            $("#newPassword").removeClass('alert-input');
        }
        if (error) {
            $('#no-data').html('<span>Por favor llene los campos</span>');
            setTimeout(function () {
                $("#currentPassword").removeClass('alert-effect');
                $("#newPassword").removeClass('alert-effect');
            }, 500);
            return false;
        }
        Resource.changePassword(email, change.currentPassword, change.newPassword).then((data) => {
            if (data.status == 200 || data.status == '200') {
                bootbox.dialog({
                    title: 'Confirmación',
                    message: "Se actualizó correctamente.",
                    closeButton: false,
                    buttons: {
                        ok: {
                            label: "Ok",
                            className: 'btn-info',
                            callback: function () {
                                bootbox.hideAll();
                            }
                        }
                    }
                });
            }
            else if (data.data.error.code == 402 || data.data.error.code == '402') {
                handlerTokenExpired(data.config);
            }
            else if (data.status == 401 || data.status == '401') {
                $('#no-data').html('<span>Contraseña errónea.</span>');
            }
        });
    }
}

Date.prototype.toFormat = function () {
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    let day = this.getDate();
    let hours = this.getHours();
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();
    return (`${year}-${(month > 9 ? month : '0' + month)}-${(day > 9 ? day : '0' + day)} ${hours}:${minutes}:${seconds}`);
};
