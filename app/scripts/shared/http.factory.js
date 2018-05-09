angular
    .module('moneyWeb')
    .factory('httpInterceptor', httpInterceptor);
/** */
function httpInterceptor() {
    let httpInterceptor = {
        request: (config) => {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: (response) => {
            response.config.responseTimestamp = new Date().getTime();
            response.config.status = 'success';
            return response;
        },
        requestError: (config) => {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        responseError: (rejection) => {
            rejection.config.responseTimestamp = new Date().getTime();
            rejection.config.status = 'error';
            return rejection;
        }
    }
    return httpInterceptor;
}