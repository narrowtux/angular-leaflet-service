'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('angularLeafletService');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('angularLeafletService.config')).to.be.ok;
  });

  

  
  it('should load directives module', function() {
    expect(hasModule('angularLeafletService.directives')).to.be.ok;
  });
  

  
  it('should load services module', function() {
    expect(hasModule('angularLeafletService.services')).to.be.ok;
  });
  

});