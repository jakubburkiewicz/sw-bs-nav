'use strict';

/**
 * sw-bs-nav
 * https://github.com/jakubburkiewicz/sw-bs-nav
 *
 * Version: 0.0.1 - 2014.09.11
 * License: MIT
 */

angular.module('sw.bs.nav', []).

  /* nav directive */
  directive('nav', ['$rootScope', '$location', function($rootScope, $location) {
    return {

      restrict: 'C',
      link: function(scope, element, attrs) {

        $rootScope.$on('$locationChangeSuccess', function() {
          scope.updateLinksList();
        });

        scope.updateLinksList = function() {
          angular.forEach(element.find('li'), function(value, key) {
            var li = angular.element(value);
            var href = li.find('a').attr('href').replace('#', '');
            var pattern = new RegExp(href+"(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?", "gi");
            var currentPath = $location.path();

            if(pattern.test(currentPath))
              li.addClass('active');
            else
              li.removeClass('active');
          });
        };

        scope.updateLinksList();
      }

    };
  }]); // /end nav directive
