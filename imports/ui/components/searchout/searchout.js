import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './searchout.html';
// import { Parties } from '../../../api/parties';

// import { name as PartyUpload } from '../partyUpload/partyUpload';
import uiRouter from 'angular-ui-router';

// import { name as Socially } from '../socially/socially';

 
class searchout {
  // constructor() {
  //   this.party = {};
  // }
 
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
 
const name = 'searchout';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  // Socially
]).component(name, {
  template,
  controllerAs: name,
  controller: searchout
}).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('searchout', {
      url: '/searchout',
      template: '<searchout></searchout>'
    });
}