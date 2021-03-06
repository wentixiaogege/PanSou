import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularAnimate from 'angular-animate';
 
import template from './pansou.html';
import uiRouter from 'angular-ui-router';
import { name as ShouYe} from '../shouye/shouye';
import { name as searchout} from '../searchout/searchout';
import { name as SearchList } from '../searchlist/searchlist';
import { name as Ad} from '../ad/ad';

import angularLoad from 'angular-load';
// import { name as Navigation } from '../navigation/navigation';
// import { name as PartyDetails } from '../partyDetails/partyDetails';



 
class PanSou {}
 
const name = 'pansou';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  angularAnimate,
  uiRouter,
  'accounts.ui',
  ShouYe,
  searchout,
  SearchList,
  Ad,
  angularLoad,
  // Navigation,
  // PartyDetails,

]).component(name, {
  template ,
  controllerAs: name,
  controller: PanSou
}).config(config).run(run)
.directive('lazyLoad', ['$window', '$q', function ($window, $q) {
        function load_script() {
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'http://xxa.zgcanglong.com/page/s.php?s=1602&w=728&h=90';
            document.body.appendChild(s);
        }
        function lazyLoadApi(key) {
            var deferred = $q.defer();
            $window.initialize = function () {
                deferred.resolve();
            };
            // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
            if ($window.attachEvent) {  
                $window.attachEvent('onload', load_script); 
            } else {
                $window.addEventListener('load', load_script, false);
            }
            return deferred.promise;
        }
        return {
            restrict: 'E',
            link: function (scope, element, attrs) { // function content is optional
            // in this example, it shows how and when the promises are resolved
                 console.log("coming")
                if ($window.google && $window.google.maps) {
                    console.log('gmaps already loaded');
                } else {
                    lazyLoadApi().then(function () {
                        console.log('promise resolved');
                        if ($window.google && $window.google.maps) {
                            console.log('gmaps loaded');
                        } else {
                            console.log('gmaps not loaded');
                        }
                    }, function () {
                        console.log('promise rejected');
                    });
                }
            }
        };
    }]);

// .directive('script', ["$parse", "$rootScope", "$compile",function($parse, $rootScope, $compile) {
//     return {
//         restrict: 'E',
//         terminal: true,
//         link: function(scope, element, attr) {
//             if (attr.ngSrc) {
//                  //var domElem = '<script src="'+attr.ngSrc+'" async defer></script>';
//                  var domElem = '<script src="'+attr.ngSrc+'"></script>';

//                  $(element).append($compile(domElem)(scope));


//             }
//         }
//     };
// }])
 
function config($locationProvider, $urlRouterProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/shouye');
}

function run($rootScope, $state) {
  'ngInject';
 
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('searchlist');
      }
    }
  );
}