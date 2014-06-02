if ( typeof Scrap !== 'undefined'  && Scrap !== null){

}
else{
	Scrap = {};
}

// N
Scrap.alltop = {};
Scrap.crunch = {};
Scrap.bigthink = {};
Scrap.ted = {};
// N

// Scrap.crunch.edgeConversation = edgeConversation;


//////////////////////////// HASTEN /////////////////////////
// EDGE START //
function getMyTime(startTime){
    var elapsed = new Date().getTime() - startTime;
    return elapsed / 10 + (elapsed % 10 ? '' : '.0' )
}

// CRUNCHBASE START //
function scrapAllTop(){
    var startTime = new Date().getTime();
    method = {"method1" : {"name":"scrapAllTop","status":"Started scrapAllTop", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"alltop"},{$set : method});
    var startAlphabet = "@";
    console.log("scrapAllTop");
    var $ = null,result = null;
    var name,url,description;
    for(var i=0,il=26;i<il;i++){
        startAlphabet = String.fromCharCode(startAlphabet.charCodeAt(0) + 1)   
        var url = "http://alltop.com/results/?alpha="+startAlphabet;
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var expert = $("#all li");
        method = {"method1" : {"name":"Started scrapAllTop","status":url, "time" :getMyTime(startTime)}};
        Loader.update({"_id":"alltop"},{$set : method});
        console.log(expert.length);
        if(expert.length==0)
            break;
        for(var j=0,jl=expert.length;j<jl;j++){
          currentDiv = expert[j];
          name = $(currentDiv).find('h3 a').text();
          url = $(currentDiv).find('.description a').attr('href');
          description = $(currentDiv).find('.description a').text();
          console.log(name);
          console.log(url);
          console.log(description);
          var currentcursor= AllTopSite.findOne({"url":url});
          if(currentcursor){
            AllTopSite.update({"_id":currentcursor._id},{$set : {"name":name,"url":url,"description":description}});
          }else{
            var Follow = {"name":name,"url":url,"description":description};
            AllTopSite.insert(Follow);
          }
        }
        // console.log(expert.length);
    }
    method = {"method1" : {"name":"scrapAllTop","status":"Finished scrapAllTop", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"alltop"},{$set : method});
    scrapAllTopGetMore();
}
Scrap.alltop.scrapAllTop = scrapAllTop;
function scrapAllTopGetMore(){
    var startTime = new Date().getTime();
    method = {"method2" : {"name":"scrapAllTopGetMore","status":"Started scrapAllTopGetMore", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"alltop"},{$set : method});
    // console.log("scrapAllTopGetMore");
    var title,url,publishedtime,description;
    var $ = null,moreResult = null;
    var activeurl = [];
    AllTopSite.find({}).forEach(function(data){
          activeurl.push(data.url);
    });
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          // console.log(url.length)
          if(url && (!url.match("undefined"))){
            console.log(url);
            method = {"method2" : {"name":"scrapAllTopGetMore","status":url, "time" :getMyTime(startTime)}};
            Loader.update({"_id":"alltop"},{$set : method});
            moreResult = Meteor.http.get(url);
            $ = cheerio.load(moreResult.content);
            var expert = $(".hentry");
            console.log(expert.length);
            if(expert.length==0)
                break;
            for(var j=0,jl=expert.length;j<jl;j++){
                currentDiv = expert[j];
                title = $(currentDiv).find('.entry-title').text();
                link = $(currentDiv).find('.entry-title a').attr('href');
                publishedtime = $(currentDiv).find('.full-post .published').text();
                description = $(currentDiv).find('.full-post .entry-content .entry-bound').text();
                // console.log(title);
                console.log(link);
                // console.log(publishedtime);
                var currentcursor= AllTopSiteLinks.findOne({"link":link});
                if(currentcursor){
                AllTopSiteLinks.update({"_id":currentcursor._id},{$set : {"url":url,"title":title,"link":link,"description":description,"publishedtime":publishedtime}});
                }else{
                var Follow = {"url":url,"title":title,"link":link,"description":description,"publishedtime":publishedtime};
                AllTopSiteLinks.insert(Follow);
                }
            }
          }
      }
      method = {"method2" : {"name":"scrapAllTopGetMore","status":"Started scrapAllTopGetMore", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"alltop"},{$set : method});
}
Scrap.alltop.scrapAllTopGetMore = scrapAllTopGetMore;
function cruchbasePerson(){
    var startTime = new Date().getTime();
    method = {"method2" : {"name":"cruchbasePerson","status":"Started cruchbasePerson", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"crunch"},{$set : method});
    // Loader.update({"_id":"crunchbase"},{$set : {"cruchbasePerson":"Started cruchbasePerson","cruchbasePersonTime" :getMyTime(startTime)}});
    // CruchBaseOrganization.remove({});
    // console.log("cruchbasePerson");
    // console.log(CruchBaseOrganization.find().count())
    var insert = {};
    var $ = null,moreResult = null;
    var activeurl = [];
    CruchBaseOrganization.find({}).forEach(function(data){
          activeurl.push(data.path);
    });
    console.log(activeurl.length);
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          // console.log(url);
          if(url && (!url.match("undefined"))){
            // console.log(url);
            // moreResult = Meteor.http.get(url);
            // $ = cheerio.load(moreResult.content);
            var urlnew = "http://api.crunchbase.com/v/2/"+url+"?user_key=5095b3c5634b6f668bf4aa0b66cc8864";
            method = {"method2" : {"name":"cruchbasePerson","status":urlnew, "time" :getMyTime(startTime)}};
            Loader.update({"_id":"crunch"},{$set : method});
    
            result = Meteor.http.get(urlnew);
            if(result.statusCode == "200"){
              var _id = result.data.data.uuid;
              var last_name= result.data.data.properties.last_name;
              var first_name = result.data.data.properties.first_name;
              var homepage_url = result.data.data.properties.homepage_url;
              var bio = result.data.data.properties.bio;
              var degrees= result.data.data.relationships.degrees;
              var experience= result.data.data.relationships.experience;
              var founded_companies= result.data.data.relationships.founded_companies;
              var primary_image= result.data.data.relationships.primary_image;
              var web_presences= result.data.data.relationships.web_presences;
              var press= result.data.data.relationships.press;
              // console.log(_id);
              // console.log(first_name);
              // console.log(last_name);
              // console.log(homepage_url);
              insert._id =_id;
              insert.last_name = last_name;
              insert.first_name =first_name;
              insert.homepage_url = homepage_url;
              insert.bio =bio;
              insert.degrees = degrees;
              insert.experience = experience;
              insert.founded_companies = founded_companies;
              insert.primary_image = primary_image;
              insert.web_presences = web_presences;
              insert.press = press;
              var personExist = CruchBasePerson.findOne({"_id":_id,"first_name":first_name,"last_name":last_name,"homepage_url":homepage_url,"bio":bio,"degrees":degrees,"experience":experience,"founded_companies":founded_companies,"primary_image":primary_image,"web_presences":web_presences,"press":press});
              if(personExist){
                CruchBasePerson.update({"_id":personExist._id},{$set : {"first_name":first_name,"last_name":last_name,"homepage_url":homepage_url,"bio":bio,"degrees":degrees,"experience":experience,"founded_companies":founded_companies,"primary_image":primary_image,"web_presences":web_presences,"press":press}});
              }else{
                CruchBasePerson.insert(insert);
              }

            }
          }
      }
    method = {"method2" : {"name":"cruchbasePerson","status":"Finished  cruchbasePerson", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"crunch"},{$set : method});
    
      // Loader.update({"_id":"crunchbase"},{$set : {"cruchbasePerson":"Finished  cruchbasePerson","cruchbasePersonTime" :getMyTime(startTime)}});
      console.log("Finished  cruchbasePerson");
}
Scrap.crunch.cruchbasePerson = cruchbasePerson;
// http://api.crunchbase.com/v/2/organizations?user_key=5095b3c5634b6f668bf4aa0b66cc8864&page=200&order=created_at+ASC
function cruchbaseOrgaization() {
    var startTime = new Date().getTime();
    var method = {"method1" : {"name":"cruchbaseOrgaization","status":"Started cruchbaseOrgaization", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"crunch"},{$set : method});
    
    // CruchBaseOrganization.remove();
    var url = "http://api.crunchbase.com/v/2/people?user_key=5095b3c5634b6f668bf4aa0b66cc8864&page="
    var urlEnd = "&order=created_at+ASC";
    var result = null;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    for(var i=1;i<275;i++){
        // console.log("Edge Video Page "+i);
        result = Meteor.http.get(url+i+urlEnd);
        method = {"method1" : {"name":"cruchbaseOrgaization","status":url+i+urlEnd, "time" :getMyTime(startTime)}};
        Loader.update({"_id":"crunch"},{$set : method});
        var insert = {};
        //console.log(result.data.data.items);
        console.log(result.statusCode);
        if(result.statusCode == "200"){
            var items = result.data.data.items;
            for(var j=0,jl=items.length;j<jl;j++){
                //var insert = {"name":items[j].name,"link":items[j].path};
                var name = items[j].name;
                var path = items[j].path;
                insert.name =name;
                insert.path = path;
                // console.log(insert)
                // console.log(path)
                //CruchBaseOrganization.insert()
                var organizationsexist = CruchBaseOrganization.findOne({"name":name,"path":path});
                if(organizationsexist){
                  CruchBaseOrganization.update({"_id":organizationsexist._id},{$set : {"name":name,"path":path}});
                }else{
                  CruchBaseOrganization.insert(insert);
                }
            }
            //console.log(items.length)
        }
    }
    method = {"method1" : {"name":"cruchbaseOrgaization","status":"Finished  cruchbaseOrgaization", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"crunch"},{$set : method});
    console.log("Finished  cruchbaseOrgaization");
    cruchbasePerson();
}
Scrap.crunch.cruchbaseOrgaization = cruchbaseOrgaization;
// CRUNCHBASE END //

function scrapBlogsGetMore(){
    var startTime = new Date().getTime();
    method = {"method2" : {"name":"scrapBlogsGetMore","status":"Started scrapBlogsGetMore", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    console.log("scrapBlogsGetMore");
    var $ = null,moreResult = null;
    var activeurl = [];
    BigThinkBlogs.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
    });
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          if(url && (!url.match("undefined"))&&url.length>27){
            // console.log(url);
            moreResult = Meteor.http.get(url);
            method = {"method2" : {"name":"scrapBlogsGetMore","status":url, "time" :getMyTime(startTime)}};
            Loader.update({"_id":"bigthink"},{$set : method});
            $ = cheerio.load(moreResult.content);
            var bigpic=$('.content .image img').attr('src');
            var desc=$('.content p').text();
            // console.log(desc);
            // console.log(desc);
            var currentcursor= BigThinkBlogs.findOne({"moredetails":url});
            if(currentcursor){
                BigThinkBlogs.update({"moredetails":url},{$set : {"bigpic":bigpic,"desc":desc}});
              }
              // else{
              //   var Follow = {"desc": desc};
              //   BigThinkVideos.insert(Follow);
              // }
          }
        }     
        method = {"method2" : {"name":"scrapBlogsGetMore","status":"Finished scrapBlogsGetMore", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"bigthink"},{$set : method});
}
Scrap.bigthink.scrapBlogsGetMore = scrapBlogsGetMore;
function scrapBlogs(){
    var startTime = new Date().getTime();
    method = {"method1" : {"name":"scrapBlogs","status":"Started scrapBlogs", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    console.log("scrapBlogs");
    var $ = null,result = null;
    var source,topic,author,moredetails;
    for(var p=1;;p++){
        var url = "http://bigthink.com/blogs?page="+p;
        result = Meteor.http.get(url);
        method = {"method1" : {"name":"scrapBlogs","status":url, "time" :getMyTime(startTime)}};
        Loader.update({"_id":"bigthink"},{$set : method});
        $ = cheerio.load(result.content);
        var expert = $(".post");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.post header h1 a').attr('href');
          source = $(currentDiv).find('.post header h2 a').text();
          topic = $(currentDiv).find('.post header h1 a').text();
          thumbnail = $(currentDiv).find('.post header .image img').attr('src');
          author = $(currentDiv).find('.post .meta .author a').text();
          var currentcursor= BigThinkBlogs.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkBlogs.update({"_id":currentcursor._id},{$set : {"source":source,"topic":topic,"thumbnail":thumbnail,"author":author,"moredetails":moredetails}});
          }else{
            var Follow = {"moredetails": moredetails,"source":source,"topic":topic,"thumbnail":thumbnail,"author":author};
            BigThinkBlogs.insert(Follow);
          }
        }
        console.log(expert.length);
    }
    method = {"method1" : {"name":"scrapBlogs","status":"Finished scrapBlogs", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    scrapBlogsGetMore();
}
Scrap.bigthink.scrapBlogs = scrapBlogs;
function scrapVideos(){
    var startTime = new Date().getTime();
    method = {"method1" : {"name":"scrapVideos","status":"Started scrapVideos", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    var $ = null,result = null;
    var name, job,moredetails;
    for(var p=1;;p++){
        var url = "http://bigthink.com/videos?page="+p;
        result = Meteor.http.get(url);
        method = {"method1" : {"name":"scrapVideos","status":url, "time" :getMyTime(startTime)}};
        Loader.update({"_id":"bigthink"},{$set : method});
        $ = cheerio.load(result.content);
        var expert = $(".video");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          console.log(name);
          console.log();
          name = $(currentDiv).find('.name').text();
          job = $(currentDiv).find('.job').text();
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.video a').attr('href');

          var currentcursor= BigThinkVideos.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkVideos.update({"_id":currentcursor._id},{$set : {"name":name,"job":job,"moredetails":moredetails}});
          }else{
            var Follow = {"moredetails": moredetails,"name": name,"job": job};
            BigThinkVideos.insert(Follow);
          }
        }
        console.log(expert.length);
    }
    method = {"method1" : {"name":"scrapVideos","status":"Finished scrapVideos", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    scrapVideosGetMore();
}
Scrap.bigthink.scrapBlogs = scrapBlogs;
function scrapVideosGetMore(){
    var startTime = new Date().getTime();
    method = {"method2" : {"name":"scrapVideosGetMore","status":"Started scrapVideosGetMore", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    console.log("scrapVideosGetMore");
    var $ = null,moreResult = null;
    var activeurl = [];
    BigThinkVideos.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
    });
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          if(url && (!url.match("undefined"))&&url.length>27){
            // console.log(url);
            method = {"method2" : {"name":"scrapVideosGetMore","status":url, "time" :getMyTime(startTime)}};
            Loader.update({"_id":"bigthink"},{$set : method});
            moreResult = Meteor.http.get(url);
            $ = cheerio.load(moreResult.content);
            var videourl=$('.video iframe').attr('src');
            var desc=$('.content p').text();
            // console.log(videourl);
            // console.log(desc);
            var currentcursor= BigThinkVideos.findOne({"moredetails":url});
            if(currentcursor){
                console.log(currentcursor._id)
                BigThinkVideos.update({"_id":currentcursor._id},{$set : {"videourl":videourl,"desc":desc}});
              }
              // else{
              //   var Follow = {"desc": desc};
              //   BigThinkVideos.insert(Follow);
              // }
          }
      }
    method = {"method2" : {"name":"scrapVideosGetMore","status":"Finished scrapVideosGetMore", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
}
Scrap.bigthink.scrapVideosGetMore = scrapVideosGetMore;
function scrapExpertsGetMore(){
    var startTime = new Date().getTime();
    method = {"method2" : {"name":"scrapExpertsGetMore","status":"Started scrapExpertsGetMore", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"bigthink"},{$set : method});
    var $ = null,moreResult = null;
    var activeurl = [];
    BigThinkExpert.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
    });
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          if(url && (!url.match("undefined"))&&url.length>27){
            console.log(url);
            method = {"method2" : {"name":"scrapExpertsGetMore","status":url, "time" :getMyTime(startTime)}};
            Loader.update({"_id":"bigthink"},{$set : method});
            moreResult = Meteor.http.get(url);
            $ = cheerio.load(moreResult.content);
            var desc=$('.description p').text();
            var currentcursor= BigThinkExpert.findOne({"moredetails":url});
            if(currentcursor){
                BigThinkExpert.update({"moredetails":url},{$set : {"desc":desc}});
              }
              // else{
              //   var Follow = {"desc": desc};
              //   BigThinkExpert.insert(Follow);
              // }
          }
      }
        method = {"method2" : {"name":"scrapExpertsGetMore","status":"Finished scrapExpertsGetMore", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"bigthink"},{$set : method});
        console.log("Finished  scrapExpertsGetMore");
}
Scrap.bigthink.scrapExpertsGetMore = scrapExpertsGetMore;
function scrapExperts(){
      var startTime = new Date().getTime();
      method = {"method1" : {"name":"scrapExperts","status":"Started scrapExperts", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"bigthink"},{$set : method});
      var $ = null,result = null;
      var imgurl,name,job,moredetails;
      for(var p=1;;p++){
        var url = "http://bigthink.com/experts?page="+p;
        method = {"method1" : {"name":"scrapExperts","status":url, "time" :getMyTime(startTime)}};
        Loader.update({"_id":"bigthink"},{$set : method});
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var expert = $(".expert");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          imgurl = $(currentDiv).find('.image img').attr('src');
          name = $(currentDiv).find('.name .user').text();
          job = $(currentDiv).find('.job').text();
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.name a').attr('href');
          var currentcursor= BigThinkExpert.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkExpert.update({"moredetails":moredetails},{$set : {"imgurl":imgurl,"name":name,"job":job}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl,"name": name,"job": job};
            BigThinkExpert.insert(Follow);
          }
          console.log(moredetails);
        }
        console.log(expert.length);
      }
      method = {"method1" : {"name":"scrapExperts","status":"Finished scrapExperts", "time" :getMyTime(startTime)}};
       Loader.update({"_id":"bigthink"},{$set : method});
      console.log("Finished  scrapExperts");
}
Scrap.bigthink.scrapExperts = scrapExperts;
function scrapTedFollows(){
	console.log("scrapTedFollows");
    var startTime = new Date().getTime();
    var method = {"method3" : {"name":"scrapTedFollows","status":"Started scrapTedFollows", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"ted"},{$set : method});
    var i=1;
    var $ = null;
    var url = "http://www.ted.com/people/fellows?page= " +i +"&per_page=30";
    method = {"method3" : {"name":"scrapTedFollows","status":url, "time" :getMyTime(startTime)}};
    Loader.update({"_id":"ted"},{$set : method});
    var result = Meteor.http.get(url);
    $ = cheerio.load(result.content);
    var fellows = $(".results .col");
    console.log(fellows.length);
    var currentFellows = null;
    var cursorTedFellows = null;
    for(var j=0,jl=fellows.length;j<jl;j++){
        currentFellows = fellows[j];
        expert = $(currentFellows).find(".p4").text()
        name = $(currentFellows).find(".m5").text()
        imgurl = $(currentFellows).find("img").attr("src")
        link = "http://www.ted.com" +$(currentFellows).find("a").attr("href")
    cursorTedFellows = TedFellows.findOne({"link":link});
    if(cursorTedFellows){
        console.log("update");
        TedFellows.update({"_id":cursorTedFellows._id},{$set : {"expert":expert,"name":name,"imgurl": imgurl,"link": link}});
    }
    else{
        console.log("inserted");
        var Follow = {"expert":expert,"name":name,"imgurl": imgurl,"link": link};
        TedFellows.insert(Follow);                
      }
    }
    method = {"method3" : {"name":"scrapTedFollows","status":"Finished scrapTedFollows", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"ted"},{$set : method});
    console.log("Finished  scrapTedFollows");
    scrapTedFollowsgetMore();
}
Scrap.ted.scrapTedFollows = scrapTedFollows;
// var scrapTedFollowsurl= null;
var activeArray = [],activeCount=0,activeCurrent=null,activeInterval=null;
function scrapTedFollowsgetMore(){
      var url = null;
      var startTime = new Date().getTime();
        method = {"method2" : {"name":"scrapTedFollowsgetMore","status":"Started scrapTedFollowsgetMore", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
      var activeurl = [],activeCount=0;
      TedFellows.find({}).forEach(function(data){
          activeArray.push(data.link);
      });
        activeInterval = Meteor.setInterval(function(){
            activeCurrent = activeArray[activeCount++];
            // console.log(activeCurrent);
            Meteor.http.get(activeCurrent,scrapTedFollowsgetMoreCallback);
            if(activeArray.length == activeCount){
                Meteor.clearInterval(activeInterval);
            }
        },5000);
      
      // for(var i=0,il=activeurl.length-1;i<il;i++){
      //     url = activeurl[i];
      //     // scrapTedFollowsurl = url;
      //     // console.log(url);
      //     if(url && (!url.match("undefined"))){
      //           Meteor.http.get(url,function(err,result){scrapTedFollowsgetMoreCallback(err,result)});
      //           // if(activeurl.length < activeCount){
      //           //     Meteor.clearInterval(mavenInterval);
      //           // }
      //     }
      // }
      method = {"method2" : {"name":"scrapTedFollowsgetMore","status":"Finished scrapTedFollowsgetMore", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
    }
    Scrap.ted.scrapTedFollowsgetMore = scrapTedFollowsgetMore;
    function scrapTedFollowsgetMoreCallback(err,result){
        // console.log(scrapTedFollowsurl);
        // return;
        // console.log(activeCurrent);
        var $ = null,moreResult = null;
        var link1,link2,link3,tedGlobalLink,tedGlobaltext,bio,lang,edu,job;
        // console.log(result)
        if(result.statusCode == 404){
                console.log("not there");
                return;
            }
            if(result.statusCode == 200){
            $ = cheerio.load(result.content);
            var a = $('.profile-header__links__inner a');
            for(var j=0,jl=a.length;j<jl;j++){
                link1 = $(a[0]).attr('href');
                link2 = $(a[1]).attr('href');
                link3 = $(a[2]).attr('href');
            }
            var sec = $('.section--minor a');
            for(var j=0,jl=sec.length;j<jl;j++){
                tedGlobalLink = $(sec[0]).attr('href');
                tedGlobaltext = $(sec[0]).text();
            }
            var bio = $('.section--minor .row .col-lg-8 .p3 p').text();
            var profloop = $('.section--minor .row .col-lg-8 .section .p3');
            for(var j=0,jl=profloop.length;j<jl;j++){
                lang = $(profloop[0]).text();
                edu = $(profloop[1]).text();
                job = $(profloop[2]).text();
            }
            // console.log(a);
            // console.log(link1);
            // console.log(link2);
            // console.log(link3);
            // console.log(tedGlobalLink);
            // console.log(tedGlobaltext);
            // console.log(bio);
            // console.log(profloop);
            // console.log(lang);
            // console.log(edu);
            console.log(job);
            var currentcursor= TedFellows.findOne({"link":activeCurrent});
            if(currentcursor){
              //console.log(currentcursor._id)
                TedFellows.update({"_id":currentcursor._id},{$set : {"link1":link1,"link2":link2,"link3": link3,"tedGlobalLink": tedGlobalLink,"tedGlobaltext": tedGlobaltext,"lang":lang,"listen":edu,"edu":edu,"job":job,"bio":bio}});
              }
          }
    }
 function scrapTed(){
      var startTime = new Date().getTime();
      method = {"method1" : {"name":"scrapTed","status":"Started scrapTed", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
      var $ = null,result = null;
      var url = "http://www.ted.com/speakers";
      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);
      var designation = $(".col");
      var currentDiv = null;
      //currentDiv = cheerio.load(designation[0])
      // console.log(currentDiv);
      // console.log(designation.length)
      //var divProd = $('div.prod');
      var myArray = [];
      var currentJson = {};
      var moredetails,imgurl,name,expert;
      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          //console.log(designation[i].children[0].data)
          // currentJson = {
          //         moredetails :  "http://www.ted.com"+$(currentDiv).find('a').attr('href'),
          //         imgurl : $(currentDiv).find('.thumb__tugger img').attr('src'),
          //         name : $(currentDiv).find('.media__message h4').text(),
          //         expert : $(currentDiv).find('.media__message .p4').text()
          //     };
          // myArray.push(currentJson);
          moredetails = "http://www.ted.com"+$(currentDiv).find('a').attr('href');
          imgurl = $(currentDiv).find('.thumb__tugger img').attr('src');
          name = $(currentDiv).find('.media__message h4').text();
          expert = $(currentDiv).find('.media__message .p4').text();
          method = {"method1" : {"name":"scrapTed","status":name, "time" :getMyTime(startTime)}};
        	Loader.update({"_id":"ted"},{$set : method});
          var currentcursor= TedSpeakers.findOne({"moredetails":moredetails});
          if(currentcursor){
            TedSpeakers.update({"moredetails":moredetails},{$set : {"imgurl":imgurl,"name":name,"expert":expert}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl,"name": name,"expert": expert};
            TedSpeakers.insert(Follow);
          }
      }
      //console.log(moredetails);
      method = {"method1" : {"name":"scrapTed","status":"Finished scrapTed", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
        getMoreDetails();
    }
    Scrap.ted.scrapTed = scrapTed;
    function getMoreDetails(){
      var startTime = new Date().getTime();
      method = {"method2" : {"name":"getMoreDetails","status":"Started getMoreDetails", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
      var $ = null,moreResult = null;
      var link1,link2,link3,profileintro,listen,say
      var activeurl = [];
      //console.log("first")
      TedSpeakers.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });
      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);
            $ = cheerio.load(moreResult.content);
            method = {"method2" : {"name":"getMoreDetails","status":url, "time" :getMyTime(startTime)}};
            Loader.update({"_id":"ted"},{$set : method});
            console.log(url);
            var a = $('.profile-header__links__inner a');
            for(var j=0,jl=a.length;j<jl;j++){
                link1 = $(a[0]).attr('href');
                link2 = $(a[1]).attr('href');
                link3 = $(a[2]).attr('href');
            }
            profileintro =$('.profile-intro').text();
            listen = $('.section--minor p').text();;
            // for(var k=0,kl=listen.length;k<kl;k++){
            //     console.log($(listen[k]).text());
            // }
            say =$('bloquote p').text();
            // console.log($(listen[0]).text());
            // console.log($(listen[1]).text());
            console.log(listen);
            var currentcursor= TedSpeakers.findOne({"moredetails":url});
            if(currentcursor){
                TedSpeakers.update({"_id":currentcursor._id},{$set : {"link1":link1,"link2":link2,"link3": link3,"profileintro": profileintro,"say": say,"listen":listen}});
              }
          }
          

      }
      method = {"method2" : {"name":"getMoreDetails","status":"Finished getMoreDetails", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
    }
    Scrap.ted.getMoreDetails = getMoreDetails;
//////////////////////////// HASTEN /////////////////////////