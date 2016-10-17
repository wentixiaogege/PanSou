import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'bootstrap/dist/css/bootstrap';
//using lazy loading
//import { name as PartiesList } from '../imports/ui/components/partiesList/partiesList';
import { name as Pansou } from '../imports/ui/components/pansou/pansou';

function onReady() {
  angular.bootstrap(document, [
    Pansou
  ], {
    strictDi: true
  });
}
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
