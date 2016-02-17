(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularLeafletService.config', [])
      .value('angularLeafletService.config', {
          debug: true
      });

  // Modules
  angular.module('angularLeafletService.services', []);
  angular.module('angularLeafletService.directives', [
    'angularLeafletService.services'
  ]);
  angular.module('angularLeafletService',
      [
          'angularLeafletService.config',
          'angularLeafletService.directives',
          'angularLeafletService.services'
      ]);

})(angular);
