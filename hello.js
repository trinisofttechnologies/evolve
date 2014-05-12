TedLeader = new Meteor.Collection("tedleader");
TedFellows = new Meteor.Collection("tedfellows");
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to hello.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        scrapTedFollows();
    });
    


}

function scrapTedFollows(){
    var i=1;
    var $ = null;
    while(true){
        break;
        var url = "http://www.ted.com/people/fellows?page= " +i +"&per_page=30";
        var result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var fellows = $(".results .col");
        console.log(fellows.length);
        var currentFellows = null;
        var cursorTedFellows = null;
        for(var j=0,jl=fellows.length;j<jl;j++){
            currentFellows = fellows[j];
            var currentJSON = {
                "expert" : $(currentFellows).find(".p4").text(),
                "name" : $(currentFellows).find(".m5").text(),
                "imgurl" : $(currentFellows).find("img").attr("src"),
                "link" : "http://www.ted.com" +$(currentFellows).find("a").attr("href"),
            }
            cursorTedFellows = TedFellows.findOne(currentJSON);
            if(cursorTedFellows){
                console.log("updated");
            }
            else{
                console.log("inserted");
                TedFellows.insert(currentJSON);                
            }
            console.log(currentJSON);
        }
        i++;

        if(i>1)
            break;        
        
    }
    scrapTedFollowsSecondPage();
}

function scrapTedFollowsSecondPage(){
    var link = []
    TedFellows.find({}).forEach(function(data){
        // console.log(data.link);
        link.push(data.link);
    });
    var url = null;
    var result = null;
    var moreDetails = null;
    var referenceLink = [];
    var links = null;
    for(var i=0,il=link.length;i<1;i++){
        url = link[i];
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        links = $(".profile-header__links__inner");
        var website = [];
        console.log(links.length)
        for(var j=0,jl=links.length;j<jl;j++){
            // $(links
            // website.push()
        }
    }
}