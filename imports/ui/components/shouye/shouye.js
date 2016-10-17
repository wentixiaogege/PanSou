import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './shouye.html';
// import { Parties } from '../../../api/parties';

// import { name as PartyUpload } from '../partyUpload/partyUpload';
import uiRouter from 'angular-ui-router';
// import { name as SearchList } from '../searchlist/searchlist';

// import { name as Socially } from '../socially/socially';

 
class ShouYe {
   constructor($scope, $reactive,$state) {
    'ngInject';

    $reactive(this).attach($scope);
    $scope.$state = $state;

    this.query={};

    angular.element('#focuseonload').focus();
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
  redirectTo(){
    // console.log("1");
  }
}
 
const name = 'shouye';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  // Socially
]).component(name, {
  template,
  controllerAs: name,
  controller: ShouYe
}).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('shouye', {
      url: '/shouye',
      template: '<shouye></shouye>'
    });
}