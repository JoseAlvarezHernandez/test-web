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
        updateCountingConversation,
    };
    function updateCountingConversation(userId, value) {
        let http = {
            method: 'PUT',
            url: `${env.apiIntercom}/api/users/${userId}/conversations`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('bearer'),
            },
            data: {
                minus: value,
            },
        };
        return ($http(http));
    }
}
