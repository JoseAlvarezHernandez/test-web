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
        getAccountUser,
        addFavorites,
        getCards,
        createCard,
        getFavorites,
        addAddress,
    };

    function validateEmail(email) {
        const http = {
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
        const http = {
            method: 'POST',
            url: `${env.api}authentication/login`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                username,
                password
            },
        };
        return $http(http);
    }

    function registration(data) {
        const http = {
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

    function getUsers(token) {
        const http = {
            method: 'GET',
            url: `${env.api}users`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        };
        return $http(http);
    }

    function getAccountUser(token) {
        const http = {
            method: 'GET',
            url: `${env.api}transactions`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        };
        return $http(http);
    }

    function getCards(token) {
        const http = {
            method: 'GET',
            url: `${env.api}accounts`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        };
        return $http(http);
    }

    function createCard(token, data) {
        const http = {
            method: 'POST',
            url: `${env.api}accounts`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data
        };
        return $http(http);
    }

    function addFavorites(token, data) {
        const http = {
            method: 'PUT',
            url: `${env.api}users/favorites`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data
        };
        return $http(http);
    }

    function getFavorites(token) {
        const http = {
            method: 'GET',
            url: `${env.api}users/favorites`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        };
        return $http(http);
    }

    function addAddress(token, data) {
        const http = {
            method: 'PUT',
            url: `${env.api}users/address`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data
        };
        return $http(http);
    }
}
