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

LoginController.$inject = ['Resource', 'Utils', '$window'];

/**
 * @function LoginController
 */
function LoginController(Resource, Utils, $window) {
  const vm = this;
  //variables
  vm.isLogged = localStorage.getItem('isLogged') == null ? false : localStorage.getItem('isLogged');
  vm.userId = localStorage.getItem('userId');
  //vm.status = localStorage.getItem('status');
  vm.loginData = {
    username: '',
    password: ''
  };

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
    let username = $("#username"),
      password = $("#password"),
      error = false;

    const inputs = [
      { input: password, status: !Utils.validateFieldEmpty(vm.loginData.password), },
      { input: username, status: (!Utils.validateFieldEmpty(vm.loginData.username) && !Utils.validateEmail(vm.loginData.username)) }
    ];

    error = animateInput(inputs);

    if (error) {
      vm.error = 'Por favor llene los campos correctamente.';
      setTimeout(function () {
        username.removeClass('alert-effect');
        password.removeClass('alert-effect');
      }, 500);
      return false;
    } else {
      sendLogin(vm.loginData);
    }
  }

  function sendLogin(loginData) {
    Resource.contactCenterLogin(loginData).then((data) => {
      if (data.data && data.data.name && data.status == 200) {
        localStorage.setItem('bearer', `Bearer ${data.data.token}`);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('userId', data.data.userId);
        localStorage.setItem('conversations', data.data.conversations);
        localStorage.setItem('status', 1);

        //save data from privileges
        let localPrivileges = data.data.privileges;
        for (let prop in localPrivileges.actions) {
          localStorage.setItem('action.' + prop, localPrivileges.actions[prop]);
          localStorage.setItem(prop, localPrivileges.actions[prop]);
        }

        localStorage.setItem('type', localPrivileges.type);
        localStorage.setItem('app', localPrivileges.app);
        vm.isLogged = true;
        //default values
        vm.loginData.password = '';
        vm.error = ''
        let role = localPrivileges.type;
        changeStatus(localStorage.getItem('userId'), 1);

        if (role < 0 || role > 3) {
          vm.error = 'Ocurrió un error en la petición.';
          localStorage.clear();
        }

        $window.location.href = role == 0 ? '#!/admin' : role == 1 ? '#!/admin' : role == 2 ? '#!/user' : '#!/';

      } else {
        switch (data.status) {
          case 401:
            vm.error = 'Usuario y/o contraseña erroneos.'
            break;
        }
      }
    }).catch(function (data) {
      vm.error = 'Ocurrió un error en la petición. Consulta al administrador del sitio';
    });
  }
}
