import { Meteor } from 'meteor/meteor';
import { request } from "meteor/froatsnook:request";
import { Random } from 'meteor/random'
// import { Parties } from './collection';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { $ } from 'jquery';
 
if (Meteor.isServer) {
   
  Meteor.publish('googleResultSearch', function(query,start) {
  console.log("coming googleResultSearch here");
  
    var self = this;
    try {

    var google = require('google');
    var Agent = require('socks5-https-client/lib/Agent');
    var cheerio = require('cheerio');

    google.requestOptions = {
              agentClass: Agent,
              agentOptions: {
                  socksHost: 'localhost', // Defaults to 'localhost'.
                  socksPort: 7890, // Defaults to 1080.
              },
              timeout: 30000,
          }

    google.resultsPerPage = 10;
    var nextCounter = 0;
    var match, result = "", regex = /<div class="sd" id="resultStats">(.*?)<\/div>/ig;
   

    google("site:pan.baidu.com "+query, function (err, res){
      if (err) console.error(err)

      var reg='<div class="sd" id="resultStats">';
      // console.log($(res.body).find('resultStats'));
       while (match = regex.exec(res.body)) { result = match[1]; }

     console.log(result);

      for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        // console.log(link.title + ' - ' + link.href)
        // console.log(link.description + "\n")
        var doc = {
            // thumb: item.imageLinks.smallThumbnail,
            title: link.title,
            link: link.href,
            snippet: link.description,
            htmllink:link.href,
            numberOfResults:result

          };
          self.added('results', Random.id(), doc);
      }

      if (nextCounter < 4) {
        nextCounter += 1
        console.log("-----------------------"+nextCounter);
        if (res.next) res.next()
      }
    })

    } catch(error) {
      console.log(error);
    }
  });


  Meteor.publish('bingSearch', function(query,start) {
  console.log("coming searching here");
  // console.log('https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&cx=011952721200530379099:fcu7kak7rc0&num=10&start='+start+'&q='+query);
  url = "https://api.cognitive.microsoft.com/bing/v5.0/search?q="+encodeURI("java编程")+"&count=10&offset=0&mkt=en-us&safesearch=Moderate";
    console.log(url);
    var self = this;
    try {

    // var Bing = require('node-bing-api')({ accKey: "3a118bdae98348799e6c8b1a72402089" ,rootUri: "https://api.datamarket.azure.com/Bing/SearchWeb/v1/" });
    // Bing.web("Pizza", {
    //     top: 10,  // Number of results (max 50)
    //     skip: 3,   // Skip first 3 results
    //     options: ['DisableLocationDetection', 'EnableHighlighting']
    //   }, function(error, res, body){

    //     // body has more useful information, but for this example we are just
    //     // printing the first two results
    //     // console.log(body.d.results[0]);
    //     // console.log(body.d.results[1]);
    //     console.log(res.body);

    //     // var responseData = JSON.parse(res.body);
    //     // console.log(responseData.searchInformation.totalResults);
    //     // console.log(responseData.searchInformation.searchTime);
    //     // _.each(responseData.items, function(item) {
    //     //   var doc = {
    //     //     title: item.title,
    //     //     link: item.link,
    //     //     snippet: item.snippet,
    //     //     htmllink:item.link
    //     //   };
    //     //   self.added('results', Random.id(), doc);
    //     // });
    //   });

      request.get({
        url: url,
        headers: {"Ocp-Apim-Subscription-Key":"3a118bdae98348799e6c8b1a72402089",
                  'Content-Type': 'text/plain;charset=utf-8' },
       
    }, function (err, res,body) {
      console.log(res.body);
      // var responseData = JSON.parse(res.body);
      // console.log(responseData.webPages.value.length);
      //   console.log(responseData.searchInformation.searchTime);
      //   // console.log(typeof(JSON.parse(res.body)));
      //   _.each(responseData.items, function(item) {
      //     var doc = {
      //       // thumb: item.imageLinks.smallThumbnail,
      //       title: item.title,
      //       link: item.link,
      //       snippet: item.snippet,
      //       htmllink:item.link
      //     };
      //     self.added('results', Random.id(), doc);
      //   });
    });
  } catch(error) {
      console.log(error);
    }
  });


  Meteor.publish('googleSearch', function(query,start) {
  console.log("coming searching here");
  // console.log('https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&cx=011952721200530379099:fcu7kak7rc0&num=10&start='+start+'&q='+query);
  // url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&cx=011952721200530379099:fcu7kak7rc0&num=10&start="+start+"&q="+encodeURI(query);
    url="https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&rsz=filtered_cse&num=10&hl=zh_CN&prettyPrint=false&source=gcsc&gss=.com&sig=432dd570d1a386253361f581254f9ca1&start="+start+"&cx=011952721200530379099:fcu7kak7rc0&q="+encodeURI(query)+"&sort=&googlehost=www.google.com";
    console.log(url);
    var self = this;
    try {

    var Agent = require('socks5-https-client/lib/Agent');
  /**
  input query 、start

  GET https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&cx=011952721200530379099:fcu7kak7rc0&q=java
  测试连接
  https://www.googleapis.com/customsearch/v1?key=AIzaSyDt08fOrrEJ0Fk_UfV73hZ0fcsi8WObqRk&cx=011952721200530379099:fcu7kak7rc0&start=1&num=10&q=java
  新想法 给用户设定自己的搜索引擎？相当于用户可以自己定制custom serach api？ 考虑考虑
  */
  numberOfResults=0;
  request.get({
        url: url,
        agentClass: Agent,
        agentOptions: {
            socksHost: 'localhost', // Defaults to 'localhost'.
            socksPort: 7890, // Defaults to 1080.
        },
    }, function (err, res) {
      // console.log(res.body);
      // console.log(err);
      var responseData = JSON.parse(res.body);
        // console.log(res.body); 
        // console.log("totalItems");
        console.log(responseData.searchInformation.totalResults);
        console.log(responseData.searchInformation.searchTime);
        if (responseData.searchInformation.totalResults === 0) {
          console.log("no results");
        } else {
           // console.log(typeof(JSON.parse(res.body)));
        numberOfResults = responseData.searchInformation.totalResults;

        _.each(responseData.items, function(item) {
          var doc = {
            // thumb: item.imageLinks.smallThumbnail,
            title: item.title,
            link: item.link,
            snippet: item.snippet,
            htmllink:item.link,
            numberOfResults:numberOfResults
          };
          self.added('results', Random.id(), doc);
        });
        }
       
       
    });
      self.ready();

    } catch(error) {
      console.log(error);
    }
  });

}