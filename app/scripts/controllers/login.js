'use strict';

/**
 * @ngdoc function
 * @name moneyWeb.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monsterMonitorApp
 */
angular
    .module('moneyWeb')
    .controller('LoginController', LoginController);

LoginController.$inject = ['Resource', 'Utils', '$scope', '$location'];

/**
 * @function LoginController
 */
function LoginController(Resource, Utils, $scope, $location) {
    const vm = this;
    //variables
    vm.loginData = { username: '', password: '' };
    vm.submitValue = 'Next';
    vm.doLogin = false;
    vm.doRegistration = false;
    vm.errorMessage = '';

    //functions
    vm.login = login;

    function animateInput(inputs) {
        let status = false;
        inputs.forEach((val) => {
            if (!val.status) {
                status = true;
                val.input.addClass('alert-input alert-effect');
            } else {
                val.input.removeClass('alert-input');
            }
        }, this);
        return status;
    }

    function login() {
        let error = false;

        const inputs = getInputs();

        error = animateInput(inputs);
        if (error) {
            vm.error = 'Por favor llene los campos correctamente.';
            setTimeout(function() {
                inputs.map(input => input.input.removeClass('alert-effect'));
            }, 500);
            return false;
        } else {
            if (!vm.doRegistration && !vm.doLogin)
                validateEmail(vm.loginData.username);
            else if (vm.doRegistration)
                sendRegistration(vm.loginData);
            else if (vm.doLogin)
                sendLogin(vm.loginData);
        }
    }

    async function validateEmail(email) {
        const user = await Resource.validateEmail(email);
        if (user.exists)
            $scope.$apply(() => {
                vm.doLogin = true;
                vm.submitValue = 'Login';
            });
        else
            $scope.$apply(() => {
                vm.doRegistration = true;
                vm.submitValue = 'Register';
            });
    }

    async function sendRegistration(loginData) {
        const reg = await Resource.registration({...loginData, homePage: 'user' });
        if (reg.status === 201)
            sendLogin(loginData);
        else
            $scope.$apply(() => vm.errorMessage = reg.data.message);
    }

    async function sendLogin(loginData) {
        const { username, password } = loginData
        const session = await Resource.login(username, password);
        if (session.status == 200) {
            localStorage.setItem('token', session.data.token);
            $scope.$apply(() => $location.url(session.data.homePage));
        } else
            $scope.$apply(() => vm.errorMessage = session.data.message);
    }

    function getInputs() {
        let username = $('#username'),
            password = $('#password'),
            name = $('#name'),
            phone = $('#phone'),
            inputs = [
                { input: username, status: (Utils.validateFieldEmpty(vm.loginData.username) && Utils.validateEmail(vm.loginData.username)) }
            ];
        if (vm.doLogin)
            inputs = [
                ...inputs,
                { input: password, status: Utils.validateFieldEmpty(vm.loginData.password) }
            ];
        else if (vm.doRegistration)
            inputs = [
                ...inputs,
                { input: password, status: Utils.validateFieldEmpty(vm.loginData.password) },
                { input: name, status: (Utils.validateFieldEmpty(vm.loginData.name) && Utils.validateOnlyLetters(vm.loginData.name)) },
                { input: phone, status: (Utils.validateFieldEmpty(vm.loginData.phone) && Utils.validatePhone(vm.loginData.phone)) }
            ];

        return inputs;
    }
}