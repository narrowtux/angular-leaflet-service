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
    var names = [];

    return {
      template: '',
      restrict: 'E',
      scope: {
        mapboxStyle: '=?',
        name: '=?'
      },
      link: function postLink(scope, element, attrs) {
        if (!scope.name) {
          scope.name = element.attr('id');
        }

        var id = scope.name;
        if (names[scope.name]) {
          names[scope.name] ++;
          id = scope.name + "-" + names[scope.name];
        } else {
          names[scope.name] = 1;
        }
        element.attr('id', id);

        switch($leaflet.getProvider()) {
          case 'mapbox':
            if (!scope.mapboxStyle) {
              scope.mapboxStyle = 'mapbox.streets';
            }
            scope.map = L.mapbox.map(id, scope.mapboxStyle);
            break;
          case 'leaflet':
            scope.map = L.map(id);
            break;
        }
        scope.map.on('load', function(e){
          $leaflet.registerMap(scope.map, scope.name);
        });
        scope.map.setView([53.544058899999996, 9.996588299999999], 18);
      }
    };
  });
