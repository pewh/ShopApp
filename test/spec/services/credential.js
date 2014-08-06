'use strict';

describe('Service: Credential', function () {

  // load the service's module
  beforeEach(module('shopAppApp'));

  // instantiate service
  var Credential;
  beforeEach(inject(function (_Credential_) {
    Credential = _Credential_;
  }));

  it('should do something', function () {
    expect(!!Credential).toBe(true);
  });

});
