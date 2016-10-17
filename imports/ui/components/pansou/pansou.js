import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularAnimate from 'angular-animate';
 
import template from './pansou.html';
import uiRouter from 'angular-ui-router';
import { name as ShouYe} from '../shouye/shouye';
import { name as searchout} from '../searchout/searchout';
import { name as SearchList } from '../searchlist/searchlist';
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
  // Navigation,
  // PartyDetails,

]).component(name, {
  template ,
  controllerAs: name,
  controller: PanSou
}).config(config).run(run);
 
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