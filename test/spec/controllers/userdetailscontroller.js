'use strict';

describe('Controller: UserdetailscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var UserdetailscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserdetailscontrollerCtrl = $controller('UserdetailscontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserdetailscontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
