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

'use strict';
/*global L*/

/**
 * @ngdoc directive
 * @name embeddedworldApp.directive:map
 * @description
 * # map
 */
angular.module('angularLeafletService.directives')
  .directive('leafletMap', function ($leaflet) {
    return {
      template: '',
      restrict: 'E',
      scope: {
        mapboxStyle: '=?'
      },
      link: function postLink(scope, element, attrs) {
        scope.id = element.attr('id');
        console.log(scope.id);

        switch($leaflet.getProvider()) {
          case 'mapbox':
            if (!scope.mapboxStyle) {
              scope.mapboxStyle = 'mapbox.streets';
            }
            scope.map = L.mapbox.map(scope.id, scope.mapboxStyle);
            break;
          case 'leaflet':
            scope.map = L.map(scope.id);
            break;
        }
        scope.map.setView([53.544058899999996, 9.996588299999999], 18);

        $leaflet.registerMap(scope.map, scope.id);
      }
    };
  });

'use strict';
/*global L*/

/**
 * @ngdoc service
 * @name
 * @description
 * # map
 * Service in the embeddedworldApp.
 */
angular.module('angularLeafletService.services')
  .provider('$leaflet', function () {
    var maps = [];
    var requestedMaps = [];
    var provider = 'leaflet';

    this.setup = function(options) {
      if (options.provider) {
        provider = options.provider;
      }
      if (provider === 'mapbox') {
        console.log('access token set');
        L.mapbox.accessToken = options.accessToken;
      }
    };

    this.$get = function($q) {
        return {
        /**
         * Registers a leaflet map instance with the given name.
         * If there were requests for this name before, this method will resolve those promises.
         * @param map leaflet map instance
         * @param name name of the map
           */
        registerMap: function(map, name) {
          maps[name] = map;
          if (requestedMaps[name]) {
            requestedMaps[name].forEach(function (deferred) {
              deferred.resolve(map);
            });
            requestedMaps[name] = null;
          }
        },

          /**
           * Get the leaflet map instance for the given id.
           * @param name the id of the DOM element you used the leaflet-map directive on
           * @returns {*} promise for the map
           */
        getMap: function(name) {
          var deferred = $q.defer();
          var map = maps[name];
          if (!map) {
            if (!requestedMaps[name]) {
              requestedMaps[name] = [];
            }
            requestedMaps[name].push(deferred);
          } else {
            deferred.resolve(map);
          }
          return deferred.promise;
        },

        /**
         *
         * @returns {string} the provider that was chosen to run
         */
        getProvider: function() {
          return provider;
        }
      };
    };
  });
