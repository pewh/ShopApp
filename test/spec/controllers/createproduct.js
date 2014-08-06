'use strict';

describe('Controller: CreateproductCtrl', function () {

  // load the controller's module
  beforeEach(module('shopAppApp'));

  var CreateproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateproductCtrl = $controller('CreateproductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
