import angular from 'angular';
import angularMeteor from 'angular-meteor';
import utilsPagination from 'angular-utils-pagination';
import template from './ad.html';
import angularAnimate from 'angular-animate';

// import { Parties } from '../../../api/parties';

// import { name as PartyUpload } from '../partyUpload/partyUpload';
import uiRouter from 'angular-ui-router';

class Ad {
   constructor($scope, $reactive,$state) {
    'ngInject';

    $reactive(this).attach($scope);
    $scope.$state = $state;

    
    
    // Session.set('shouyeQuery', this.query.value);

  }
  // submit() {
  // 	 console.log('submit:', this.party);
  //    this.party.owner = Meteor.user()._id;
  //    Parties.insert(this.party);
  //    this.reset();
  // }

  // reset() {
  //   this.party = {};
  // }
}

const name = 'ad';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  angularAnimate
  // Socially
]).component(name, {
  template,
  controllerAs: name,
  controller: Ad
}).config(config).directive('lazyLoad', ['$window', '$q', function ($window, $q) {
        function load_script() {
            console.log("loading ");
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'http://xxa.zgcanglong.com/page/s.php?s=1602&w=728&h=90';
            document.body.appendChild(s);
        }
        function lazyLoadApi(key) {
            var deferred = $q.defer();
            console.log("here");
            $window.initialize = function () {
                deferred.resolve();
            };
            // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
            if ($window.attachEvent) {  
                console.log("onload")
                $window.attachEvent('onload', load_script); 
            } else {
                console.log("listenner")
                //load_script();
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
 
function config($stateProvider,$urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('ad', {
      url: '/ad',
      template: '<ad></ad>',
   });
  // $urlRouterProvider.deferIntercept();
}