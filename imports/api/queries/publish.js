import { Meteor } from 'meteor/meteor';
import { request } from "meteor/froatsnook:request";
import { Random } from 'meteor/random'
import { Counts } from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {

   user_agent_list = [
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
        // "Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/19.77.34.5 Safari/537.1",
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
        "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
        "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
        // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
        // "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0",
        "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
        // "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0",
        // "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        // "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
        // "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)",
        // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)"
       ];
   
  Meteor.publish('googleResultSearch', function(query,start) {
  console.log("coming googleResultSearch here");
  
    var self = this;
    //also can using filters?
    if(query == null || query == ''){
    self.ready();
    return;
  }
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
              headers: {
              // 'Cache-Control': 'max-age=0',
              // 'Connection': 'keep-alive',
              'User-Agent':Random.choice(user_agent_list) // 使用这个之后会出现搜索没有href  竟然会没有连接。还需要好好研究一下
             }
          }

    google.resultsPerPage = 10;
    var nextCounter = 0;
    var match, result = "", regex = /<div class="sd" id="resultStats">(.*?)<\/div>/ig;
   
    google("site:pan.baidu.com "+query,start,function (err, res){
      if (err){
        console.error(err);
        return;
      } 
      console.log(Random.choice(user_agent_list));
      var reg='<div class="sd" id="resultStats">';
      // console.log($(res.body).find('resultStats'));
       while (match = regex.exec(res.body))
        {
          console.log("while inside");
          result = match[1]; 
        }
     console.log(result);// Page 4 of about 673 results
      for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        console.log(link.title + ' - ' + link.href)
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
      nextCounter += 1;
      console.log("-----------------------"+nextCounter);
      console.log("-----------------------"+res.start);
      if (nextCounter < 1) {
        console.log("-----------------------"+nextCounter);
        console.log("-----------------------"+res.start);
        if (res.next) res.next()
      }
    })

    } catch(error) {
      console.log(error);
    }
  });


  Meteor.publish('bingSearch', function(query,start) {
  console.log("coming searching here");
  if(query == null || query == ''){
    this.ready();
    return;
  }
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
  if(query == null || query == ''){
    this.ready();
    return;
  }
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