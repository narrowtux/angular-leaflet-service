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
