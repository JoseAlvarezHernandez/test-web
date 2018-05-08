angular
    .module('moneyWeb')
    .factory('httpInterceptor', httpInterceptor);

httpInterceptor.$inject = ['Utils', '$window'];
let message = null;
/** */
function httpInterceptor(Utils, $window) {
    let httpInterceptor = {
        request: (config) => {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: (response) => {
            if (message !== null) {
                message.find('.bootbox-body').html('¡Tu conexión a internet se ha reestablecido!');
                setTimeout(function () {
                    message.modal('hide');
                    message = null;
                }, 1500);
            }
            response.config.responseTimestamp = new Date().getTime();
            response.config.status = 'success';
            return response;
        },
        requestError: (config) => {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        responseError: (rejection) => {
            if (!rejection.config.url.includes('login')) {
                rejection.config.responseTimestamp = new Date().getTime();
                rejection.config.status = 'error';
                if (rejection.status == 401) {
                    if (!Utils.getTokenExpired()) {
                        Utils.tokenExpired(true);
                        bootbox.dialog({
                            size: 'medium',
                            title: '',
                            closeButton: false,
                            message: '¡La sesión ha expirado! ',
                            buttons: {
                                'confirm': {
                                    label: 'Ok',
                                    className: 'btn btn-info',
                                    callback: function () {
                                        localStorage.getItem('bearer', null);
                                        localStorage.clear();
                                        $window.location.reload();
                                    },
                                },
                            },
                        });
                    }
                } else if (rejection.status === -1) {
                    rejection.data = {};
                    if (message === null) {
                        message = bootbox.dialog({
                            size: 'medium',
                            title: '',
                            closeButton: false,
                            message: '¡Parece que no tienes conexión a Internet!'
                        });
                    }
                }
            }
            return rejection;
        },
    };
    return httpInterceptor;
}