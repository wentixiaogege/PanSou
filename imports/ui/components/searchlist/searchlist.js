import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularAnimate from 'angular-animate';
 
import template from './searchlist.html';
// import { Parties } from '../../../api/parties';

// import { name as PartyUpload } from '../partyUpload/partyUpload';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import angularLoad from 'angular-load';


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
      ads() {

      }
    });
  }
   pageChanged(newPageNumber) {

    this.page = newPageNumber;
    console.log(this.page);
    var searchHandle = Meteor.subscribe('bingSearch', this.query.value,((this.getReactively('page')-1 ===　0)?1:this.getReactively('page')-1)* this.perPage);
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
    
    var searchHandle = Meteor.subscribe('bingSearch', this.query.value,this.page);
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


// .directive('script', function() {
//     return {
//       restrict: 'E',
//       scope: false,
//       link: function(scope, elem, attr) {
//         if (attr.type === 'text/javascript-lazy') {
//           var code = elem.text();
//           var f = new Function(code);
//           f();
//         }
//       }
//     };
//   })
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  angularAnimate,
  angularLoad,
  // Socially
]).component(name, {
  template,
  controllerAs: name,
  controller: SearchList
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
    .state('searchlist', {
      url: '/searchlist',
      template: '<searchlist></searchlist>',
      params:{
        shouyeQuery:''
      },
      resolve: {

      }
   });
  // $urlRouterProvider.deferIntercept();
}


