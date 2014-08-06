'use strict';

describe('Directive: bsNav', function () {

  // load the directive's module
  beforeEach(module('shopAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bs-nav></bs-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bsNav directive');
  }));
});
