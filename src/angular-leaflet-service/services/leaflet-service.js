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
  .service('$leaflet', function ($q) {
    var maps = [];
    var requestedMaps = [];
    var provider = 'leaflet';

    this.setup = function(options) {
      if (options.provider) {
        provider = options.provider;
      }
      if (provider === 'mapbox') {
        L.mapbox.accessToken = options.accessToken;
      }
    };

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
  })
  .provider("$leafletProvider", function() {

  });
