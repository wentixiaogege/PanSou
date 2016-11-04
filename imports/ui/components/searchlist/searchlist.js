import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularAnimate from 'angular-animate';
 
import template from './searchlist.html';
// import { Parties } from '../../../api/parties';

// import { name as PartyUpload } from '../partyUpload/partyUpload';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

Books = new Mongo.Collection('books');
Results = new Mongo.Collection('results');

// Results.allow({
//   insert() {
//     return true;
//   },
//   update() {
//     return true;
//   },
//   remove() {
//     return true;
//   }
// });
 
class SearchList {
    constructor($scope, $reactive,$state) {
    'ngInject';

    $reactive(this).attach($scope);
    $scope.$state = $state;

    this.query = {};
    this.query.value=$state.params.shouyeQuery;
    // console.log($state);
    console.log($state.params.shouyeQuery);
    Session.setDefault('searching', false);
    this.perPage = 10;
    this.realCount=0;
    this.page = 1;
    this.sort = {
      name: 1
    };


    angular.element('#focuseonload').focus();

    this.helpers({
      // books() {
      //   console.log(Books.find({}).count());
        
      //   return Books.find({},{
      //     // 如果需要只是在前台显示分页的话
      //     limit: parseInt(this.perPage),
      //     skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      //      // sort: this.getReactively('sort')},发this.getReactively('searchText')
      //   })
      //   return Books.find({});
      // },
      searching() {

        return Session.get('searching');
      },
      // booksCount() {
      //   return Results.find({}).count();
      // },
      results() {
        // console.log(Results.find({}).count());
        this.realCount = (Results.findOne({},{
          limit: parseInt(this.perPage),
          skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        }) === undefined) ? 0 : Results.findOne().numberOfResults;

          console.log("submit real count");
          console.log(this.realCount);

        return Results.find({},{
          limit: parseInt(this.perPage),
          skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        })
      },
       resultsCount() {
       
        // if (Results.findOne() === undefined) {
        //   console.log("0");
        //   return 0;
        // } else {
        //    console.log("1");
        //   return Results.findOne().numberOfResults;
        // }
        // return (Results.findOne() === undefined) ? 0 : Results.findOne().numberOfResults;
        return (Results.findOne() === undefined) ? 0 : (this.perPage*20);
      },
    });
  }
   pageChanged(newPageNumber) {

    this.page = newPageNumber;
    console.log(this.page);
    var searchHandle = Meteor.subscribe('googleResultSearch', this.query.value,((this.getReactively('page')-1 ===　0)?1:this.getReactively('page')-1)* this.perPage);
    Session.set('searching', ! searchHandle.ready());



  }
  
  submit() {
    Results._collection.find({}).forEach(result => {
    Results._collection.remove(result._id)
    });
    console.log('submit:', this.query.value);
     // this.query.owner = Meteor.user()._id;
    this.page=1;
    console.log((this.getReactively('page')) * this.perPage);
    
    var searchHandle = Meteor.subscribe('googleResultSearch', this.query.value,this.page);
    Session.set('searching', ! searchHandle.ready());
    // 不reset应该会在搜索box里面显示原来搜索的数据
    // this.reset();


 }
  reset() {
    this.query = {};
  }
  // testDelay(){
  //   $scope.delay = true;
  //   $timeout(function(){
  //       $scope.delay = false;
  //   }, 2000);
  //   return this.realCount;
  // }
}
 
const name = 'searchlist';
 
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
  controller: SearchList
}).config(config);
 
function config($stateProvider,$urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('searchlist', {
      url: '/searchlist',
      template: '<searchlist></searchlist>',
      params:{
        shouyeQuery:''
      }
   });
  // $urlRouterProvider.deferIntercept();
}