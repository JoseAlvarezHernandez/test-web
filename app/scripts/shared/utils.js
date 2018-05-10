'use strict';

angular
    .module('moneyWeb')
    .factory('Utils', Utils);

Utils.$inject = ['$window'];

function Utils($window) {
    let isTokenExpired = false;
    return {
        orderBy,
        validateEmail,
        validateFieldEmpty,
        compareObjects,
        validatePhone,
        validateOnlyLetters
    };

    function validatePhone(phone) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/img.test(phone);
    }

    function compareObjects(objectOne, objectTwo) {
        return angular.toJson(objectOne) === angular.toJson(objectTwo);
    }

    function orderBy(property, reverse) {
        reverse = (property === property) ? !reverse : false;
        return reverse;
    }

    function validateEmail(email) {
        return /^\w+([\.\-\+]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,4})+$/.test(email);
    }

    function validateOnlyLetters(str) {
        return /[a-z]/img.test(str);
    }

    function validateFieldEmpty(field) {
        return /([^\s])/img.test(field);
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
