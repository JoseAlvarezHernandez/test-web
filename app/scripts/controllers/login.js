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
    vm.reset = reset;

    function reset() {
        vm.loginData = { username: '', password: '' };
        vm.submitValue = 'Next';
        vm.doLogin = false;
        vm.doRegistration = false;
        vm.errorMessage = '';
    }

    function login() {
        loader();
        let inputs = ['username'];

        if (vm.doRegistration)
            inputs = [...inputs, 'password', 'name', 'phone'];
        else if (vm.doLogin)
            inputs = [...inputs, 'password'];

        const valid = Utils.getInputsValidation(inputs);

        if (!valid) {
            closeLoader();
            vm.error = 'Please fill out all fields';
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
                closeLoader();
            });
        else
            $scope.$apply(() => {
                vm.doRegistration = true;
                vm.submitValue = 'Register';
                closeLoader();
            });
    }

    async function sendRegistration(loginData) {
        try {
            const reg = await Resource.registration({ ...loginData, homePage: 'user' });
            sendLogin(loginData);
        } catch (error) {
            $scope.$apply(() => vm.errorMessage = reg.data.message);
            closeLoader();
        }
    }

    async function sendLogin(loginData) {
        const { username, password } = loginData
        try {
            const session = await Resource.login(username, password);
            localStorage.setItem('token', session.data.token);
            closeLoader();
            $scope.$apply(() => $location.url(session.data.homePage));
        } catch (error) {
            $scope.$apply(() => vm.errorMessage = error.data.message);
            closeLoader();
        }
    }
}