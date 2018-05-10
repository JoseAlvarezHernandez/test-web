angular
    .module('moneyWeb')
    .factory('Resource', Resource);

/** functions dependency injector */
Resource.$inject = ['$http', 'env'];

/**
 * @function Resource
 * @description Resource
 */
function Resource($http, env) {
    return {
        validateEmail,
        login,
        registration,
        getUsers,
    };

    function validateEmail(email) {
        let http = {
            method: 'GET',
            url: `${env.api}authentication/validate/${email}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        return $http(http).then(response => response.data);
    }

    function login(username, password) {
        let http = {
            method: 'POST',
            url: `${env.api}authentication/login`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                username, password
            },
        };
        return $http(http);
    }

    function registration(data) {
        let http = {
            method: 'POST',
            url: `${env.api}users`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data
        };
        return $http(http);
    }

    function getUsers(token, email){
        let http = {
            method: 'GET',
            url: `${env.api}users/${email}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${{token}}`,
            }
        };
        return $http(http);
    }
}
