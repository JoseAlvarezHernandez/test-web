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
        validateOnlyLetters,
        animateInput,
        getInputsValidation,
        getValidate,
    };

    function getInputsValidation(fields) {
        const inputs = [];

        if (typeof fields === 'string') {
            const input = document.getElementById(fields);

            inputs.push({ input, status: getValidate(input) });
        } else {
            fields.forEach(function(field, key) {
                const input = document.getElementById(field);

                inputs.push({ input, status: getValidate(input) });
            });
        }
        return animateInput(inputs);
    }

    function getValidate(input) {
        const validations = input.getAttribute('validates').split(',');
        console.log(validations);
        const valid = validations.filter(validation => {
            let result = null;

            switch (validation) {
                case 'email':
                    result = validateEmail(input.value)
                    break;
                case 'letters':
                    result = validateOnlyLetters(input.value);
                    break;
                case 'empty':
                    result = validateFieldEmpty(input.value);
                    break;
                case 'phone':
                    result = validatePhone(input.value);
                    break;
                case 'account':
                    result = validateAccount(input.value);
                    break;
            };
            return result;
        });

        return valid.length === validations.length ? true : false;
    }

    function animateInput(inputs) {
        let status = true;

        inputs.forEach((input) => {
            if (!input.status) {
                status = false;
                input.input.classList.add('alert-input', 'alert-effect');
            } else {
                input.input.classList.remove('alert-input');
            }
        }, this);

        setTimeout(() => {
            inputs.map(input => input.input.classList.remove('alert-effect'));
        }, 600);

        return status;
    }

    function compareObjects(objectOne, objectTwo) {
        return angular.toJson(objectOne) === angular.toJson(objectTwo);
    }

    function orderBy(property, reverse) {
        reverse = (property === property) ? !reverse : false;
        return reverse;
    }

    function validatePhone(phone) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/img.test(phone);
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

    function validateAccount(field) {

        if (field.account === '0') {
            return false;
        }

        return true;
    }
}