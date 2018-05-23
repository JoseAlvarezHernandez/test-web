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
            fields.forEach(function (field, key) {
                const input = document.getElementById(field);

                inputs.push({ input, status: getValidate(input) });
            });
        }
        return animateInput(inputs);
    }

    function getValidate(input) {
        const validations = input.getAttribute('validates').split(',');
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
                case 'combo':
                    result = validateComboBox(input.value);
                    break;
                case 'cvv':
                    result = validateCvv(input.value);
                    break;
                case 'pin':
                    result = validatePin(input.value);
                    break;
                case 'amount':
                    result = validateAmount(input.value);
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

    function validateAccount(account) {
        return /^([0-9]{6}|[0-9]{16}|[0-9]{18})$/img.test(account);
    }

    function validateComboBox(value) {
        return value !== 'A99';
    }

    function validateCvv(cvv) {
        return /^([0-9]{3})$/img.test(cvv);
    }

    function validatePin(pin) {
        return /^([0-9]{4})$/img.test(pin);
    }

    function validateAmount(amount) {
        return !isNaN(amount) && amount > 0;
    }
}
