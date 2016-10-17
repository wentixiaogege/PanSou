import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
//using meteor add check
import { check } from 'meteor/check';

//using meteor add email
// import {Email }from 'meteor/email';
 
// import { Parties } from './collection';
 
 
export function queryrequest(query,start) {
  check(query, String);
  // check(userId, String);
  console.log("coming searching here");
    var self = this;
    try {

    var Agent = require('socks5-https-client/lib/Agent');
/**

GET https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&cx=011952721200530379099:fcu7kak7rc0&q=java

*/
    request.get({
        url: 'https://www.googleapis.com/books/v1/volumes?q='+query,
        agentClass: Agent,
        agentOptions: {
            socksHost: 'localhost', // Defaults to 'localhost'.
            socksPort: 7890 // Defaults to 1080.
        }
    }, function (err, res) {
      var responseData = JSON.parse(res.body);
        // console.log(res.body); 
        // console.log(err);
        console.log(responseData.totalItems);
        // console.log(typeof(JSON.parse(res.body)));
        _.each(responseData.items, function(item) {
          var doc = {
            thumb: item.volumeInfo.imageLinks.smallThumbnail,
            title: item.volumeInfo.title,
            link: item.volumeInfo.infoLink,
            snippet: item.searchInfo && item.searchInfo.textSnippet
          };
          // console.log("coming");
          // console.log(doc);
          self.added('books', Random.id(), doc);
        });
    });
      self.ready();

    } catch(error) {
      console.log(error);
    }
  };

Meteor.methods({
  queryrequest
});