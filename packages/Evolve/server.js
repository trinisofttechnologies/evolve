Future = Npm.require('fibers/future');
jquery = Npm.require("jquery");
scrap = Future.wrap(Npm.require('scrap'));
cheerio = Npm.require("cheerio");
var result;
    function scrapTed(){
        var $ = null,result = null;
        var url = "http://www.ted.com/speakers";

        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var designation = $(".col");
        var currentDiv = null;
        //currentDiv = cheerio.load(designation[0])
        console.log(currentDiv);
        console.log(designation.length)
        //var divProd = $('div.prod');
        var myArray = [];
        //return;
        for(var i=0,il=designation.length;i<il;i++){
            currentDiv = designation[i];
            // currentDiv.
            //console.log(designation[i].children[0].data)
            console.log($(currentDiv).find('.thumb__tugger img').attr('src'));
            console.log($(currentDiv).find('.media__message h4').text());
            console.log($(currentDiv).find('.media__message .p4').text());
        }
    }
