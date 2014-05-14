TedLeader = new Meteor.Collection("tedleader");
TedFellows = new Meteor.Collection("tedfellows");
TedSpeakers = new Meteor.Collection("tedspeakers");
TedTopic = new Meteor.Collection("tedtopic");
Tedwatch = new Meteor.Collection("tedwatch");
BigThinkExpert = new Meteor.Collection("bigthinkexpert");
BigThinkVideos = new Meteor.Collection("bigthinkvideos");
BigThinkBlogs = new Meteor.Collection("bigthinkblogs");

CruchBaseOrganization = new Meteor.Collection("cruchbaseorganization");

Loader = new Meteor.Collection("loader");

VideoEvolve = new Meteor.Collection("videoevolve");
ConversationEvolve = new Meteor.Collection("conversationevolve");
UserEvolve = new Meteor.Collection("userevolve");

if (Meteor.isServer) {
    Meteor.startup(function () {
        // scrapTed();
        loaderinit()
        cruchbaseOrgaization();
        // done
        // edgeMember();
        // fixed
        // edgeConversation();
        // tested working fine first page second page still to go
        // edgeLibrary();
        // tested working fine
        // edgeVideos();
    });
    

    var result,moreResult;

    
    // scrapTed();
    // getMoreDetails();
    //scrapExperts();
    //scrapExpertsGetMore();
    //scrapVideos();
    //scrapVideosGetMore();
    //scrapBlogs();
    //scrapBlogsGetMore();

}
function loaderinit () {
    var cursorLoader = Loader.findOne({"_id":"edge"});
    if(!cursorLoader){
      Loader.insert({"_id":"edge"});
    }
}
function scrapBlogsGetMore(){
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
}

function scrapTedFollows(){
    var i=1;
    var $ = null;
    while(true){
        break;
        var url = "http://www.ted.com/people/fellows?page= " +i +"&per_page=30";
        var result = Meteor.http.get(url);
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
            BigThinkBlogs.update({"moredetails":moredetails},{$set : {"source":source,"topic":topic,"thumbnail":thumbnail,"author":author}});
          }else{
            var Follow = {"moredetails": moredetails,"source":source,"topic":topic,"thumbnail":thumbnail,"author":author};
            BigThinkBlogs.insert(Follow);
          }
        }
        console.log(expert.length);
    }
}
function scrapVideos(){
    var $ = null,result = null;
    for(var p=1;;p++){
        var url = "http://bigthink.com/videos?page="+p;
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var expert = $(".video");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          name = $(currentDiv).find('.name').text();
          job = $(currentDiv).find('.job').text();
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.video a').attr('href');

          var currentcursor= BigThinkVideos.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkVideos.update({"moredetails":moredetails},{$set : {"name":name,"job":job}});
          }else{
            var Follow = {"moredetails": moredetails,"name": name,"job": job};
            BigThinkVideos.insert(Follow);
          }
        }
        console.log(expert.length);
    }
    // scrapTedFollowsSecondPage();
}
function scrapVideosGetMore(){
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
            moreResult = Meteor.http.get(url);
            $ = cheerio.load(moreResult.content);
            var videourl=$('.video iframe').attr('src');
            var desc=$('.content p').text();
            // console.log(videourl);
            // console.log(desc);
            var currentcursor= BigThinkVideos.findOne({"moredetails":url});
            if(currentcursor){
                BigThinkVideos.update({"moredetails":url},{$set : {"videourl":videourl,"desc":desc}});
              }
              // else{
              //   var Follow = {"desc": desc};
              //   BigThinkVideos.insert(Follow);
              // }
          }
      }
}
function scrapVideos(){
    var $ = null,result = null;
    for(var p=1;;p++){
        var url = "http://bigthink.com/videos?page="+p;
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var expert = $(".video");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          name = $(currentDiv).find('.name').text();
          job = $(currentDiv).find('.job').text();
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.video a').attr('href');

          var currentcursor= BigThinkVideos.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkVideos.update({"moredetails":moredetails},{$set : {"name":name,"job":job}});
          }else{
            var Follow = {"moredetails": moredetails,"name": name,"job": job};
            BigThinkVideos.insert(Follow);
          }
        }
        console.log(expert.length);
    }
}
function scrapExpertsGetMore(){
    var $ = null,moreResult = null;
    var activeurl = [];
    BigThinkExpert.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
    });
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          if(url && (!url.match("undefined"))&&url.length>27){
            console.log(url);
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
}
function scrapExperts(){
      var $ = null,result = null;
      var imgurl,name,job,moredetails;
      for(var p=1;;p++){
        var url = "http://bigthink.com/experts?page="+p;
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
}
function scrapTed(){
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
          var currentcursor= TedSpeakers.findOne({"moredetails":moredetails});
          if(currentcursor){
            TedSpeakers.update({"moredetails":moredetails},{$set : {"imgurl":imgurl,"name":name,"expert":expert}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl,"name": name,"expert": expert};
            TedSpeakers.insert(Follow);
          }
      }
      //console.log(moredetails);
    }

// function scrapBlogs(){
//     console.log("scrapBlogs");
//     var $ = null,result = null;
//     var source,topic,author,moredetails;
//     for(var p=1;;p++){
//         var url = "http://bigthink.com/blogs?page="+p;
//         result = Meteor.http.get(url);

    // function getMoreDetails(){
    //   var $ = null,moreResult = null;
    //   var link1,link2,link3,profileintro,listen,say
    //   var activeurl = [];
    //   //console.log("first")
    //   TedSpeakers.find({}).forEach(function(data){
    //       activeurl.push(data.moredetails);
    //   });
    //   for(var i=0,il=activeurl.length-1;i<il;i++){
    //       var url = activeurl[i];
    //       if(url && (!url.match("undefined"))&&url.length>27){
    //         moreResult = Meteor.http.get(url);
    //         $ = cheerio.load(moreResult.content);

    //         var a = $('.profile-header__links__inner a');
    //         for(var j=0,jl=a.length;j<jl;j++){
    //             //console.log($(a[j]).attr('href'));
    //             link1 = $(a[0]).attr('href');
    //             link2 = $(a[1]).attr('href');
    //             link3 = $(a[2]).attr('href');
    //         }
    //         profileintro =$('.profile-intro').text();
    //         listen = $('.section--minor p').text();;
    //         // for(var k=0,kl=listen.length;k<kl;k++){
    //         //     console.log($(listen[k]).text());
    //         // }
    //         say =$('bloquote p').text();
    //         // console.log($(listen[0]).text());
    //         // console.log($(listen[1]).text());
    //         console.log(listen);
    //         var currentcursor= TedSpeakers.findOne({"moredetails":url});
    //         if(currentcursor){
    //             TedSpeakers.update({"moredetails":url},{$set : {"link1":link1,"link2":link2,"link3": link3,"profileintro": profileintro,"say": say,"listen":listen}});
    //           }
    //       }
          
    //       }
          

    //   }
    // }
    //         var a = $('.profile-header__links__inner a');
    //         for(var j=0,jl=a.length;j<jl;j++){
    //             //console.log($(a[j]).attr('href'));
    //             link1 = $(a[0]).attr('href');
    //             link2 = $(a[1]).attr('href');
    //             link3 = $(a[2]).attr('href');
    //         }
    //         profileintro =$('.profile-intro').text();
    //         //listen = $('.section section--minor p');
    //         // for(var k=0,kl=listen.length;k<kl;k++){
    //         //     console.log($(listen[k]).text());
    //         // }
    //         say =$('bloquote p').text();
    //       }
          

    //   }
    // }
    //         var a = $('.profile-header__links__inner a');
    //         for(var j=0,jl=a.length;j<jl;j++){
    //             //console.log($(a[j]).attr('href'));
    //             link1 = $(a[0]).attr('href');
    //             link2 = $(a[1]).attr('href');
    //             link3 = $(a[2]).attr('href');
    //         }
    //         profileintro =$('.profile-intro').text();
    //         //listen = $('.section section--minor p');
    //         // for(var k=0,kl=listen.length;k<kl;k++){
    //         //     console.log($(listen[k]).text());
    //         // }
    //         say =$('bloquote p').text();
    //       }
          
    //       }
          

    //   }
    // }
    //         var a = $('.profile-header__links__inner a');
    //         for(var j=0,jl=a.length;j<jl;j++){
    //             //console.log($(a[j]).attr('href'));
    //             link1 = $(a[0]).attr('href');
    //             link2 = $(a[1]).attr('href');
    //             link3 = $(a[2]).attr('href');
    //         }
    //         profileintro =$('.profile-intro').text();
    //         //listen = $('.section section--minor p');
    //         // for(var k=0,kl=listen.length;k<kl;k++){
    //         //     console.log($(listen[k]).text());
    //         // }
    //         say =$('bloquote p').text();
    //       }
          

    //   }
    // }
    //         var a = $('.profile-header__links__inner a');
    //         for(var j=0,jl=a.length;j<jl;j++){
    //             //console.log($(a[j]).attr('href'));
    //             link1 = $(a[0]).attr('href');
    //             link2 = $(a[1]).attr('href');
    //             link3 = $(a[2]).attr('href');
    //         }
    //         profileintro =$('.profile-intro').text();
    //         //listen = $('.section section--minor p');
    //         // for(var k=0,kl=listen.length;k<kl;k++){
    //         //     console.log($(listen[k]).text());
    //         // }
    //         say =$('bloquote p').text();
    //       }
          

    //   }

//////////////////////////// HASTEN /////////////////////////

function scrapBlogsGetMore(){
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
}
function scrapBlogs(){
    console.log("scrapBlogs");
    var $ = null,result = null;
    var source,topic,author,moredetails;
    for(var p=1;;p++){
        var url = "http://bigthink.com/blogs?page="+p;
        result = Meteor.http.get(url);
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
            BigThinkBlogs.update({"moredetails":moredetails},{$set : {"source":source,"topic":topic,"thumbnail":thumbnail,"author":author}});
          }else{
            var Follow = {"moredetails": moredetails,"source":source,"topic":topic,"thumbnail":thumbnail,"author":author};
            BigThinkBlogs.insert(Follow);
          }
        }
        console.log(expert.length);
    }
}
function scrapVideos(){
    var $ = null,result = null;
    for(var p=1;;p++){
        var url = "http://bigthink.com/videos?page="+p;
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var expert = $(".video");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          name = $(currentDiv).find('.name').text();
          job = $(currentDiv).find('.job').text();
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.video a').attr('href');

          var currentcursor= BigThinkVideos.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkVideos.update({"moredetails":moredetails},{$set : {"name":name,"job":job}});
          }else{
            var Follow = {"moredetails": moredetails,"name": name,"job": job};
            BigThinkVideos.insert(Follow);
          }
        }
        console.log(expert.length);
    }
}
function scrapVideosGetMore(){
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
            moreResult = Meteor.http.get(url);
            $ = cheerio.load(moreResult.content);
            var videourl=$('.video iframe').attr('src');
            var desc=$('.content p').text();
            // console.log(videourl);
            // console.log(desc);
            var currentcursor= BigThinkVideos.findOne({"moredetails":url});
            if(currentcursor){
                BigThinkVideos.update({"moredetails":url},{$set : {"videourl":videourl,"desc":desc}});
              }
              // else{
              //   var Follow = {"desc": desc};
              //   BigThinkVideos.insert(Follow);
              // }
          }
      }
}
function scrapVideos(){
    var $ = null,result = null;
    for(var p=1;;p++){
        var url = "http://bigthink.com/videos?page="+p;
        result = Meteor.http.get(url);
        $ = cheerio.load(result.content);
        var expert = $(".video");
        if(expert.length==0)
            break;
        for(var i=0,il=expert.length;i<il;i++){
          currentDiv = expert[i];
          name = $(currentDiv).find('.name').text();
          job = $(currentDiv).find('.job').text();
          moredetails = "http://www.bigthink.com"+$(currentDiv).find('.video a').attr('href');

          var currentcursor= BigThinkVideos.findOne({"moredetails":moredetails});
          if(currentcursor){
            BigThinkVideos.update({"moredetails":moredetails},{$set : {"name":name,"job":job}});
          }else{
            var Follow = {"moredetails": moredetails,"name": name,"job": job};
            BigThinkVideos.insert(Follow);
          }
        }
        console.log(expert.length);
    }
}
function scrapExpertsGetMore(){
    var $ = null,moreResult = null;
    var activeurl = [];
    BigThinkExpert.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
    });
    for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
          if(url && (!url.match("undefined"))&&url.length>27){
            console.log(url);
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
}
function scrapExperts(){
      var $ = null,result = null;
      var imgurl,name,job,moredetails;
      for(var p=1;;p++){
        var url = "http://bigthink.com/experts?page="+p;
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
}
 function scrapTed(){
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
          var currentcursor= TedSpeakers.findOne({"moredetails":moredetails});
          if(currentcursor){
            TedSpeakers.update({"moredetails":moredetails},{$set : {"imgurl":imgurl,"name":name,"expert":expert}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl,"name": name,"expert": expert};
            TedSpeakers.insert(Follow);
          }
      }
      //console.log(moredetails);
    }
    function getMoreDetails(){
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
                TedSpeakers.update({"moredetails":url},{$set : {"link1":link1,"link2":link2,"link3": link3,"profileintro": profileintro,"say": say,"listen":listen}});
              }
          }
          

      }
    }
//////////////////////////// HASTEN /////////////////////////


/////////////////////////// BHAVESH ///////////////////////

// scrapTedTopics();
    //getMoreDetailsTopics();
   // getMoreDetails1Topics();

function scrapTedTopics(){
      var $ = null,result = null;
      var url = "http://www.ted.com/watch/topics";  //http://www.ted.com/watch/topics
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".h9");  //  topics__list__topic
      var currentDiv = null;
       // console.log(url);

      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          moredetails = "http://www.ted.com"+$(currentDiv).find('a').attr('href');  
        
          var currentcursor= TedTopic.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            TedTopic.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            TedTopic.insert(Follow);
          }

      }
     // getMoreDetailsTopics();
    }


    //-----------------------------------------------------------
    function getMoreDetailsTopics(){
        var $ = null,result2 = null;
        var activeurl = [];
     
        TedTopic.find({}).forEach(function(data){
          activeurl.push(data.moredetails);             //  featching data from the collection TeadSpeaker
      });
       
      for(var j=0,jl=activeurl.length-1;j<jl;j++){
        var url2 = activeurl[j];                         //featching all the urls
        
        
         if(url2 && (!url2.match("undefined"))&&url2.length>27){

            result2 = Meteor.http.get(url2);

            $ = cheerio.load(result2.content);      

            var designation = $(".notranslate");  //  topics__list__topic
            var currentDiv = null;
          
            var moredetails,imgurl,urls2;                          //-----
           // console.log(url2+" "+designation.length)
            for(var i=0,il=designation.length;i<il;i++){
              currentDiv = designation[i];
              // console.log(url2+" "+designation[i]); 
                urls2=$(currentDiv).find('a').attr('href');   

                if(urls2 && (!urls2.match("undefined"))&&urls2.length>27)
                {
                      moredetails = "http://www.ted.com"+urls2;  
                        var currentcursor= Tedwatch.findOne({"moredetails":moredetails});
                      //console.log(urls2);  
                        if(currentcursor){
                          Tedwatch.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
                        }
                        else{
                          var Follow = {"moredetails": moredetails,"imgurl":imgurl};
                          Tedwatch.insert(Follow);
                          }
                }

          }
        
        }   // end for if

      }// end for i
      // getMoreDetails1Topics();
    }
    function getMoreDetails1Topics(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var activeurl = [];
      //console.log("first")
      Tedwatch.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });

      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
                                                     
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.talk-hero__speaker a').text();
            // console.log(say1);
            say2 =$('.talk-hero__title').text();
            say3 =$('.talk-sharing__value').text();        
            say4 =$('.talk-description').text();        
            say5 =$('.talk-sharing__value').text();        //----checked

           
              // -------------------------------------------------------
            var a = $('.talk-sharing__tools a');
            var afinal;
            
            var x=0;
            for(var j=0,jl=a.length;j<jl;j++){
                afinal=$(a[j]).attr('href');
               

                    if(afinal && (!afinal.match("undefined"))&&afinal.length>27){
                        // console.log(x+afinal);
                        x++;
                        if(x==1)
                            link1=$(a[j]).attr('href');
                        if(x==2)
                            link2=$(a[j]).attr('href');
                        if(x==3)
                            link3=$(a[j]).attr('href');

                    }
            }
            // end of for 
               
          }
      }
    }
/////////////////////////// BHAVESH ///////////////////////


//////////////////////////// NICOLSON /////////////////////////
// EDGE START //
function edgeConversation(){
    // http://edge.org/conversations?page=0&tid=mind&type=0
    Loader.update({"_id":"edge"},{$set : {"edgeConversation":"Started Edge Conversation"}})
    console.log("Started Edge Conversation");
    var url = "http://edge.org/conversations?page=";
    var urlEnd = "&tid=mind&type=0";
    var result = null,resultSecond=null;;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    var $ = null,$$=null;
    var title = "";
    for(var i=9;;i++){
        Loader.update({"_id":"edge"},{$set : {"edgeConversation": "Edge  Edge Library "+i}})
        console.log("Edge  Edge Library "+i);
        result = Meteor.http.get(url+i+urlEnd);
        $ = cheerio.load(result.content);
        row = $("tbody tr");
        
        var currentRow = null;
        var a = null;
        var td = null;
        var tags = null;
        for(j=0,jl=row.length;j<jl;j++){
            currentRow = row[j];
            td = $(currentRow).children("td")
            a = $(td[0]).children("div").children("a");
            title = a.text()
            referenceLink = a.attr("href");
            referenceLink = origin + referenceLink;
            a = $(td[0]).children(".byline").children(".member-name").children("a");
            memberName = a.text();
            memberLink = a.attr("href");
            memberLink = origin + memberLink;
            a = $(td[0]).children(".clearfix").children(".topic").children("a");
            topicName = a.text();
            topicLink = a.attr("href");
            topicLink = origin + topicLink;
            var tags = $(td[0]).children(".tags").children("span");
            var tag ={};
            tag.link = [];
            tag.name = [];

            // not getting tags
            // console.log($(td[0]).children(".tags").length)
            for(k=1,kl=tags.length;k<kl;k++){
                var name = $(tags[k]).children("a").text();
                console.log(name);
                tag.name.push(name);
                var link = $(tags[k]).children("a").attr("href");
                tag.link.push(origin + link);
            }
            // console.log(tag);
            // Second TD
            var secondTD = td[1];
            var contributor = $(secondTD).children(".contributor-list").children(".contributor");
            var contributorArray = [],contributorId=null;
            for(l=0,ll=contributor.length;l<ll;l++){
                contributorName = $(contributor[l]).children("a").text();
                contributorLink = $(contributor[l]).children("a").attr("href");
                contributorLink = origin + contributorLink;
                var cursorUserEvolve = UserEvolve.findOne({"name":contributorName,"link":contributorLink,"source":"edge"});
                if(cursorUserEvolve){
                    contributorId = cursorUserEvolve._id;
                }
                else{
                    contributorId = UserEvolve.insert({"name":contributorName,"link":contributorLink,"source":"edge"})
                }
                contributorArray.push(contributorId);
            }
            var insert = {};
            insert.title
            insert.referenceLink = referenceLink;
            insert.memberName = memberName;
            insert.memberLink = memberLink;
            insert.topicName = topicName;
            insert.topicLink = topicLink;
            insert.contributorArray = contributorArray;
            insert.source = "edge";
            var cursorConversationEvolve = ConversationEvolve.findOne({"title":title,"memberName":memberName,"memberLink":memberLink});       
            if(cursorConversationEvolve){

            }
            else{
                ConversationEvolve.insert(insert);
            }
            // console.log($(contributor).length);

        }

        if(row.length < 50){
            console.log("Finished Edge Conversation");
            break;
        }
    }
    console.log("Finished Edge Conversation");
}

function edgeMember() {
    var userArray = [];
    var currentUser = null;
    var result = null,$=null;
    UserEvolve.find({"source":"edge"}).forEach(function(data){
        userArray.push(data);
    });
    var title = null,p = null,paraArray=[];
    for(var i=0,il=userArray.length;i<il;i++){
        currentUser = userArray[i];
        console.log(currentUser.link)
        if(!currentUser.link)
            continue;
        result = Meteor.http.get(currentUser.link);
        $ = cheerio.load(result.content);
        title = $(".title").text();
        paraArray=[]
        p = $(".field-name-field-user-biography div div p")
        for(var j=1,jl=p.length;j<jl;j++){
            paraArray.push($(p[j]).text())
        }
        console.log(paraArray);
        UserEvolve.update({"_id":currentUser._id},{$set : {"title":title,"paraArray":paraArray}})
        currentUser
    }
}
function edgeLibrary(){
    
    console.log("Started Edge Library");
    var url = "http://edge.org/library?page=";
    var result = null,resultSecond=null;;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    var $ = null,$$=null;
    for(var i=0;;i++){
        console.log("Edge  Edge Library "+i);
        result = Meteor.http.get(url+i);
        $ = cheerio.load(result.content);
        row = $("tbody tr");
        if(row.length == 0){
            console.log("Finished Edge Video");
            break;
        }
        var td = null;
        var referenceLink = null,imageLink="";
        for(var j=0,jl=row.length;j<jl;j++){
            td = $(row[j]).children("td");
            for(var k=0,kl=td.length;k<kl;k++){
                var a = $(td[k]).children(".views-field-product-image").children("span").children("a");
                referenceLink = a.attr("href");
                imageLink = a.children("img").attr("src");
                title = $(td[k]).children(".views-field-title").children("span").text();
                author = $(td[k]).children(".views-field-field-edge-author").children("span").children("span").children("a").text();
                console.log(title);
                console.log(referenceLink);
                
                edgeLibrarySecond(referenceLink);
                // Second Page scrapping
                
                
            }
        }
    }
    console.log("Finished  Edge Library");
}   
function edgeLibrarySecond(referenceLink){
    // nothing working at this moment
    return;
    var resultSecond = null;
    var $ = null;
    var iframe = null;
    resultSecond = Meteor.http.get(referenceLink);
    $  = cheerio.load(resultSecond.content);
    iframe = $(".a-container")
    console.log($(iframe).text());
    console.log(iframe.length);
    for(l=0,ll=iframe.length;l<ll;l++){
        
    }
}
function edgeVideos(){
    console.log("Started Edge Video");
    var url = "http://edge.org/videos?page=";
    var result = null;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    for(var i=0;;i++){
        console.log("Edge Video Page "+i);
        result = Meteor.http.get(url+i);
        $ = cheerio.load(result.content);
        empty = $(".view-empty").children("p").text();
        if(empty.match("No results found")){
            console.log("Finished Edge Video");
            break;
        }

        row = $(".view-content .views-row");
        var currentRow = null;
        var title =null;
                                    // 10 because there are only 10 in a single page
        for(var j=0,jl=row.length;j<10;j++){
            currentRow = row[j];
            var videoLink = "",title = "",titleMainLink="",conversation="",conversationWith="",
                memberLink="",category="";
            var insert = {};
            title = $(currentRow).children(".views-field-title").text();
            titleMainLink = $(currentRow).children(".views-field-title").children("span").children("a").attr("href");
            titleMainLink = origin + titleMainLink;
            conversation = $(currentRow).children(".views-field-title-1").text();
            conversationWith = $(currentRow).children(".views-field-field-edge-author").text();
            memberLink = $(currentRow).children(".views-field-field-edge-author").children(".field-content").children("span").children("a").attr("href");
            memberLink =  origin+memberLink;
            category = $(currentRow).children(".views-field-field-category").children(".field-content").text();
            videoLink = $(currentRow).children(".views-field-field-video-embed").children(".field-content").children("div").children("iframe").attr("src");
            videoLink = "http:" +videoLink;
            para = $(currentRow).children(".views-field-body").children("span");
            var paraArray = [],paraText = "";
            for(var k=0,kl=para.length;k<kl;k++){
                paraText = $(para[k]).text();
                paraArray.push(paraText);
            }
            // conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");
            // conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");
            // conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");
            // conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");

            // creating JSON 
            insert.videoLink =videoLink
            insert.title = title
            insert.titleMainLink = titleMainLink
            insert.conversation = conversation
            insert.conversationWith = conversationWith
            insert.memberLink = memberLink
            insert.category = category
            insert.paraArray = paraArray
            insert.source = "edge.org"
            console.log(insert);
            var cursorVideoEvolve = VideoEvolve.findOne({"title":title,"titleMainLink":titleMainLink,"conversationWith":conversationWith});
            if(cursorVideoEvolve){
                console.log("updated");
            }
            else{
                VideoEvolve.insert(insert);
                console.log("insert");
            }
            console.log(titleMainLink)
            // console.log(videoLink)
        }
        
    }
    console.log("Finished Edge Video");
}
// EDGE END //

// CRUNCHBASE START //


// http://api.crunchbase.com/v/2/organizations?user_key=5095b3c5634b6f668bf4aa0b66cc8864&page=200&order=created_at+ASC
function cruchbaseOrgaization () {
    var url = "http://api.crunchbase.com/v/2/organizations?user_key=5095b3c5634b6f668bf4aa0b66cc8864&page="
    var urlEnd = "&order=created_at+ASC";
    var result = null;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    for(var i=1;i<2;i++){
        console.log("Edge Video Page "+i);
        result = Meteor.http.get(url+i+urlEnd);
        console.log(result.data.data.items);
        console.log(result.statusCode);
        if(result.statusCode == "200"){
            var items = result.data.data.items;
            for(var j=0,jl=items.length;j<jl;j++){
                var insert = {"name":items[j].name,"link":items[j].path};
                // CruchBaseOrganization.insert()
            }
            console.log(items.length)
        }
    }
}

// CRUNCHBASE END //

//////////////////////////// NICOLSON /////////////////////////

function b(value){
    console.log(value);

}