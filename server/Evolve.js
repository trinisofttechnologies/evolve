if (Meteor.isServer) {
    Meteor.startup(function () {
        // scrapTed();
        // Handlebars
        // console.log(Handlebars.templates);
        // jsdom.env(
        //     "http://nodejs.org/dist/",
        //     ["http://code.jquery.com/jquery.js"],
        //     function (errors, window) {
        //     console.log("there have been", window.$("a").length, "nodejs releases!");
        //     }
        // );
        // start it when you are first time using it.
        // loaderinit();
        // Schedule.

        // function(){
        //     console.log('The answer to life, the universe, and everything!');
            
        //     // Meteor.setTimeout(function(){nicolsonDevelopment()},100);
        //     fibeFunction();
        //     Fiber(function(){
        //         nicolsonDevelopment();
        //     }).run();
        // }
        Meteor.setTimeout(function(){
            if(DebugFace){
                nicolsonDevelopment();
                hastenDevelopment();
                bhaveshDevelopment();                
            }
            else{
                var rule = new Schedule.RecurrenceRule();
                rule.minute = 59;
                rule.second = 59;
                rule.hour = 23;
                var fibeFunction = Meteor.bindEnvironment(function(){production()});
                var j = Schedule.scheduleJob(rule,fibeFunction);
                production();
            }
        },50)
        // scrapAllTop();
        //angelPeopleGetMore();
        //angelPeople();
        // cruchbaseOrgaization();
        // done
        // edgeMember();
        // fixed
        // edgeConversation();
        // tested working fine first page second page still to go
        // edgeLibrary();
        // tested working fine
        // edgeVideos();
        // scrapTed();
        // getMoreDetails();
        //scrapExperts();
        //scrapExpertsGetMore();
        //scrapVideos();
        //scrapVideosGetMore();
        //scrapBlogs();
        //scrapBlogsGetMore();
    });
    

    // var result,moreResult;

    // scrapTedFollows()
    // scrapTed();
    // getMoreDetails();
    // scrapExperts();
    // scrapExpertsGetMore();
    // scrapVideos();
    // scrapVideosGetMore();
    // scrapBlogs();
    // scrapBlogsGetMore();
    // cruchbaseOrgaization();
    // cruchbasePerson()
    // scrapAllTop()
    // scrapAllTopGetMore()
    // angelPeople()
    // angelPeopleGetMore()

}
function production(){
    loaderinit();
    nicolsonProduction();
    hastenProduction();
    bhaveshProduction();
}
function bhaveshDevelopmentTimeout(){
	bhaveshDevelopment();
}

function nicolsonProduction(){
    Meteor.setTimeout(Scrap.edge.edgeConversation,50);
    Meteor.setTimeout(Scrap.edge.edgeMember,50);
    Meteor.setTimeout(Scrap.edge.edgeLibrary,50);
    Meteor.setTimeout(Scrap.edge.edgeVideos,50);
    Meteor.setTimeout(Scrap.angel.angelPeople,50);
    Meteor.setTimeout(Scrap.angel.angelPublic,50);
    // Meteor.setTimeout(Scrap.maven.mavenPublic,50);
    
}

function hastenProduction(){
    Meteor.setTimeout(Scrap.alltop.scrapAllTop(),50);
    Meteor.setTimeout(Scrap.bigthink.scrapVideos(),50);
    Meteor.setTimeout(Scrap.bigthink.scrapExperts,50);
    Meteor.setTimeout(Scrap.bigthink.scrapBlogs(),50);
    Meteor.setTimeout(Scrap.ted.scrapTed,50);
    Meteor.setTimeout(Scrap.ted.scrapTedFollows,50);
    Meteor.setTimeout(Scrap.crunch.cruchbaseOrgaization,50);
}
function bhaveshProduction(){
   var url2013 = "http://time100.time.com/2013/04/18/time-100/slide/all/";
      Meteor.setTimeout(function(){Scrap.time100.scrapTimes(url2013)},50);
   var url2010 = "http://content.time.com/time/specials/packages/completelist/0,29569,1984685,00.html";
      Meteor.setTimeout(function(){Scrap.time100.scrapTimes(url2010)},50);
   var url2009 = "http://content.time.com/time/specials/packages/completelist/0,29569,1894410,00.html";
      Meteor.setTimeout(function(){Scrap.time100.scrapTimes(url2009)},50);
   var url2011 = "http://content.time.com/time/specials/packages/article/0,28804,2066367_2066369,00.html";
      Meteor.setTimeout(function(){Scrap.time100.scrapTimes2(url2011)},50);
   var url2012="http://content.time.com/time/specials/packages/article/0,28804,2111975_2111976,00.html";
      Meteor.setTimeout(function(){Scrap.time100.scrapTimes2(url2012)},50);
      Meteor.setTimeout(Scrap.time100.getMoreDetailsTimes,50);
      
      Meteor.setTimeout(Scrap.tedb.scrapBrowse,50);
      Meteor.setTimeout(Scrap.tedb.getMoreBrows,50);

      Meteor.setTimeout(Scrap.edted.scrapLesson,50);
      Meteor.setTimeout(Scrap.edted.getMoreLesson,50);

      Meteor.setTimeout(Scrap.ranker.scrapRanker,50);

      Meteor.setTimeout(Scrap.esquire.scrapEsquire,50);

      Meteor.setTimeout(Scrap.tedb.scrapThemes,50);
      Meteor.setTimeout(Scrap.tedb.getMoreThemes,50);

      Meteor.setTimeout(Scrap.tedb.scrapTedTopics,50);
      Meteor.setTimeout(Scrap.tedb.getMoreDetailsTopics,50);
      Meteor.setTimeout(Scrap.tedb.getMoreDetails1Topics,50);

      Meteor.setTimeout(Scrap.tedx.scrapTedx,50);
      Meteor.setTimeout(Scrap.tedx.getMoreDetailsx,50);
      Meteor.setTimeout(Scrap.tedx.getMoreDetails1x,50);

}
function bhaveshDevelopment(){
    // Scrap.tedb.scrapThemes();
    // Scrap.tedb.getMoreThemes();
}
function loaderinit () {
    var cursorLoader = null;
    cursorLoader = Loader.findOne({"_id":"edge"});
    if(!cursorLoader){
        Loader.insert({"_id":"edge"});
    }
    cursorLoader = Loader.findOne({"_id":"ted"});
    if(!cursorLoader){
        Loader.insert({"_id":"ted"});
 	}
 	cursorLoader = Loader.findOne({"_id":"edted"});
    if(!cursorLoader){
        Loader.insert({"_id":"edted"});

    }
    cursorLoader = Loader.findOne({"_id":"esquire"});
    if(!cursorLoader){
        Loader.insert({"_id":"esquire"});

    }
    cursorLoader = Loader.findOne({"_id":"ranker"});
    if(!cursorLoader){
        Loader.insert({"_id":"ranker"});

    }
    cursorLoader = Loader.findOne({"_id":"tedx"});
    if(!cursorLoader){
        Loader.insert({"_id":"tedx"});
    }
    cursorLoader = Loader.findOne({"_id":"bigthink"});
    if(!cursorLoader){
        Loader.insert({"_id":"bigthink"});
    }
    cursorLoader = Loader.findOne({"_id":"crunchbase"});
    if(!cursorLoader){
        Loader.insert({"_id":"crunchbase"});
    }
    cursorLoader = Loader.findOne({"_id":"angel"});
    if(!cursorLoader){
        Loader.insert({"_id":"angel"});
    }
    cursorLoader = Loader.findOne({"_id":"amazon"});
    if(!cursorLoader){
        Loader.insert({"_id":"amazon"});
    }
    cursorLoader = Loader.findOne({"_id":"maven"});
    if(!cursorLoader){
        Loader.insert({"_id":"maven"});
    }
    cursorLoader = Loader.findOne({"_id":"alltop"});
    if(!cursorLoader){
        Loader.insert({"_id":"alltop"});
    }
    cursorLoader = Loader.findOne({"_id":"wikipedia"});
    if(!cursorLoader){
        Loader.insert({"_id":"wikipedia"});
    }
    cursorLoader = Loader.findOne({"_id":"time"});
    if(!cursorLoader){
        Loader.insert({"_id":"time"});
    }
}


//////////////////////////// HASTEN /////////////////////////
function hastenDevelopment(){
    // Scrap.alltop.scrapAllTop();
    // // Scrap.alltop.scrapAllTopGetMore();
    // Scrap.crunch.cruchbasePerson();
    // // Scrap.crunch.cruchbaseOrgaization();
    // // Scrap.bigthink.scrapBlogsGetMore();
    // Scrap.bigthink.scrapBlogs();
    // Scrap.bigthink.scrapVideos();
    // Scrap.bigthink.scrapVideosGetMore();
    // Scrap.bigthink.scrapExperts();
    // // Scrap.bigthink.scrapExpertsGetMore();
    // Scrap.ted.scrapTed();
    // // Scrap.ted.getMoreDetails();
    // Scrap.ted.scrapTedFollows();
      // Scrap.ted.scrapTedFollowsgetMore();
}

//////////////////////////// HASTEN /////////////////////////
/////////////////////////// BHAVESH ///////////////////////
function bhaveshDevelopment(){
}
var alchemy;
function nicolsonDevelopment(){
    var resutl = Meteor.http.get("https://www.googleapis.com/customsearch/v1?key=290965586398-3oudnu7iv7thh46vdvhi2mean195vohr.apps.googleusercontent.com&cx=017576662512468239146:omuauf_lfve&q=lectures");
    console.log(resutl)
    // Meteor.setTimeout(Scrap.ted.scrapTed,50);
    // Meteor.setTimeout(Scrap.ted.scrapTedFollows,50);
    // console.log(AlchemyAPI)
    // Scrap.edge.edgeConversation();
    // alchemy = new AlchemyAPI('8524031593880fa2a555a5ecba584af574bdb21d');
    // console.log(alchemy)
    // alchemy.sentiment(text,{},function(err,response){
    //     console.log(err);
    //     console.log(response);
    // });
}

function connection(){
    var cursorConnectionCategory = null;
    VideoEvolve.find({}).forEach(function(data){
        cursorConnectionCategory = ConnectionCategory.findOne({"categoryName":data.category});
        if(!cursorConnectionCategory){
            ConnectionCategory.insert({"categoryName":data.category});
        }
    })
}
var text = "This Guodian find is one of the more interesting ones. We know they were sealed around 300 BC. So no one had seen these texts. It was discovered in '95, when the tomb was discovered. The texts were published in '98, and no one had seen these texts since 300 BC. So no editors have messed with them, no one's been changing words around. It's challenging to figure them out, because this was before the script was unified in 221, so it's a different form of Chinese script, and there're debates about how to understand the characters. Some of the strips are broken off and we’re missing parts. The way the texts work is they're written on bamboo and then they're tied together and then you roll them up. That's how they were stored. When they opened the tomb, the string degenerated a long time ago, and it was actually filled with water, too, so you've got this pile of sticks lying around covered in mud. You've got to clean them up, and then you've got to figure out which ones go together, using clues like their length or how they're beveled on the ends or if the handwriting looks like it's the same. Then you've got to figure out what order they should go in. It's like putting together this massive jigsaw puzzle. It's very exciting."

var text2 = "There are going to be people watching this video or reading the text who are going to have ethical dilemmas. The truth of the matter is there are of course ethical dilemmas because you can patently lead people to do things they subsequently regret. On the other hand, at its very simplest, nudging can be nothing more than the act of painting white lines in the middle of the road, or painting a pattern in a car park so that people all park in a way which allows more cars to fit into a given space. You know, as an absolutely purist libertarian, I could get really angry and say, I hate car parking lines because they interfere with my right to park at the diagonal. But you'd have to be a fairly deranged libertarian purist to take that view, to protest against the lines in car parks. I suppose you could argue they're not obligatory in any case. You can, if you want to, park at the diagonal it's just that at that point, social and reputational mechanisms come into play and people just think you're an creep if you park across two spaces. So the lines in car parks are a reputational nudge in a way. That's cute.";
function b(value){
    console.log(value);

}