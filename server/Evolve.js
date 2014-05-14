
if (Meteor.isServer) {
    Meteor.startup(function () {
        // scrapTed();
        
        loaderinit();

        Meteor.setTimeout(function(){
            if(DebugFace){
            nicolsonDevelopment();
            hastenDevelopment();
            bhaveshDevelopment();
            }
            else{
                nicolsonProduction();
                hastenProduction();
                bhaveshProduction();
            }
        },50)

        // cruchbaseOrgaization();
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

function hastenDevelopment(){

}
function bhaveshDevelopment(){

}

function nicolsonProduction(){

}
function hastenProduction(){

}
function bhaveshProduction(){

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
Timed = new Meteor.Collection("timed");
TimeData = new Meteor.Collection("timedata");
//    var url2013 = "http://time100.time.com/2013/04/18/time-100/slide/all/"
 //    scrapTimes(url2013);
 // var url2010 = "http://content.time.com/time/specials/packages/completelist/0,29569,1984685,00.html"
 //    scrapTimes(url2010);
 // var url2009 = "http://content.time.com/time/specials/packages/completelist/0,29569,1894410,00.html"
 //    scrapTimes(url2009);
  // var url2011 = "http://content.time.com/time/specials/packages/article/0,28804,2066367_2066369,00.html";
  //   scrapTimes2(url2011);
  //   var url2012="http://content.time.com/time/specials/packages/article/0,28804,2111975_2111976,00.html";
  //   scrapTimes2(url2012);
  // 	getMoreDetailsTimes()
	
ranker = new Meteor.Collection("ranker");
// scrapRanker();
Esquire = new Meteor.Collection("esquire");
// 	scrapEsquire();
Lesson = new Meteor.Collection("lesson");		//remaning 
 // scrapLesson();
// 	getMoreLesson();

browse = new Meteor.Collection("browse");
browseData = new Meteor.Collection("browsedata");
// 	scrapBrowse();
// 	getMoreBrows();
	
Themes = new Meteor.Collection("themes");
ThemesData = new Meteor.Collection("themesdata");

// scrapThemes();
//   getMoreThemes()
  
TedTopic = new Meteor.Collection("tedtopic");
Tedwatch = new Meteor.Collection("tedwatch");  
    // 	scrapTedTopics();
    //	getMoreDetailsTopics();
   	// 	getMoreDetails1Topics();
   
  
function scrapThemes(){
      var $ = null,result = null,say1,say2,say3,say4;
// var x=0;

// x++;

      var url = "https://www.ted.com/themes";  //http://www.ted.com/themes
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".clearfix h4");  //  topics__list__topic
      var currentDiv = null;
                                 // console.log(url+" "+designation.length);
//        if(designation.length<=0)break;
      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          var url=$(currentDiv).find('a').attr('href');
          if(url && (!url.match("undefined"))&&url.length>27)
          {
          moredetails = "http://www.ted.com"+$(currentDiv).find('a').attr('href');  
                                          // console.log(moredetails);
          var currentcursor= Themes.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            Themes.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            Themes.insert(Follow);
          }
      }
       }
    
  }

      /*check point*/
    //-----------------------------------------------------------
    function getMoreThemes(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var activeurl = [];
      //console.log("first")
      Themes.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });

      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
                // console.log(url)                                     
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('h1 span').text();
                                                // console.log(say1);
            say2 =$('.about img').attr("src");
                                                // console.log(say2+"----");
            say3 =$('.about p').text(); 
                                                    // console.log(say3);
        
            var currentcursor= ThemesData.findOne({"name":say1,"img":say2,"blog":say3});
          if(currentcursor){
            ThemesData.update({"_id":currentcursor._id},{$set : {"name":say1,"img":say2,"blog":say3}});
          }else{
            var Follow = {"name":say1,"img":say2,"blog":say3};
            ThemesData.insert(Follow);
          }
          } //if
      }     //end of for i
    }

function scrapLesson(){
      var $ = null,result = null;
var x=0;
while(1){
x++;

      var url = "http://ed.ted.com/lessons?page="+x;  //http://www.browse.com/
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".videoText");  //  topics__list__topic
      var currentDiv = null;
                                          // console.log(url+" "+designation.length);
      if(designation.length<=0)break;
      
      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];

      var url = $(currentDiv).find('a').attr('href');
                                              // console.log(url)                                     
      if(url && (!url.match("undefined"))&&url.length>27)
      {
       		moredetails = "http://ed.ted.com"+$(currentDiv).find('a').attr('href');  
                                          console.log(moredetails);
          	var currentcursor= Lesson.findOne({"moredetails":moredetails});
          
          	if(currentcursor){
            	Lesson.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          	}else{
            	var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            	Lesson.insert(Follow);
          	}
		}//end if
      }
    }
  }

      /*check point*/
    //-----------------------------------------------------------
    function getMoreLesson(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var activeurl = [];
      //console.log("first")
      Lesson.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });

      for(var i=0,il=activeurl.length-1;i<4;i++){
          var url = activeurl[i];
                                          // console.log(url)                                     
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.content h1').text();
                                      console.log(say1);
            say2 =$('.lessonDescription p').text();
                                        // console.log(say2);     //----checked
 
             say3 =$('.videoContainer ').find('iframe').attr('src');        
                                      console.log(say3);
     //      
     																						// data base and iframe is remaning
           
               
          } //if
      }
    }
function scrapBrowse(){
      var $ = null,result = null,say1,say2,say3,say4;
var x=0;
while(1){
x++;

      var url = "http://www.ted.com/talks/browse?page="+x;  //http://www.browse.com/
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".talk-link");  //  topics__list__topic
      var currentDiv = null;
       console.log(url+" "+designation.length);
       if(designation.length<=0)break;
      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          moredetails = "http://www.ted.com"+$(currentDiv).find('a').attr('href');  
        console.log(moredetails);
          var currentcursor= browse.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            browse.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            browse.insert(Follow);
          }

      }
    }
  }

      /*check point*/
    //-----------------------------------------------------------
    function getMoreBrows(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var activeurl = [];
      //console.log("first")
      browse.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });

      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
                // console.log(url)                                     
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.talk-hero__speaker a').text();
            // console.log(say1);
            say2 =$('.talk-hero__title').text();
            say3 =$('.talk-sharing__value').text();        
            say4 =$('.talk-description').text();        
            say5 =$('.talk-hero__poster').find('img').attr('src');        //----checked

           
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
        var currentcursor= browseData.findOne({"name":say1,"title":say2});
          if(currentcursor){
            browseData.update({"_id":currentcursor._id},{$set : {"name":say1,"title":say2,"share":say3,"para":say4,"video":say5,"link1":link1,"link2":link2,"link3":link3}});
          }else{
            var Follow = {"name":say1,"title":say2,"share":say3,"para":say4,"video":say5,"link1":link1,"link2":link2,"link1":link3};
            browseData.insert(Follow);
          }
      }
    }

function scrapEsquire(){
      var $ = null,result = null,say1,say2,say3,say4;

      var url = "http://www.esquire.com/features/most-influential-21st-century-1008#slide-1";  //http://www.espire.com/
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".clearfix");  //  topics__list__topic
      var currentDiv = null;
       // console.log(url);

      var moredetails,imgurl;                          //-----

     for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];

          say1=$(currentDiv).find('.slideTitle').text();   
           say3=$(currentDiv).find('.imageContainer img').attr("src");   
          say4=$(currentDiv).find('.imageContent b').text();   
         say2=$(currentDiv).find('.imageContent i').text();   
         // console.log("person"+i)
          // console.log(say1+" * "+say3+" * "+say2+" * "+say4+" * ");
   		
      
      var currentcursor= Esquire.findOne({"name":say1,"image":say3,"desc":say4,"para":say2});
          if(currentcursor){
            Esquire.update({"_id":currentcursor._id},{$set : {"name":say1,"image":say3,"desc":say4,"para":say2}});
          }else{
            var Follow = {"name":say1,"image":say3,"desc":say4,"para":say2};
            Esquire.insert(Follow);
          }
      }
     
    }
function scrapTimes2(url){
      var $ = null,result = null;
        //http://time100.time.com/2013/04/18/time-100/slide/all/ 
    var x=0;  
while(1)
{
    x++;
      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      
      var currentDiv = null;
       // console.log(url);

      var moredetails,imgurl;                          //-----
      moredetails=url;
          
          var currentcursor= Timed.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            Timed.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            Timed.insert(Follow);
          }
           url="http://content.time.com"+$('.next-item').find("a").attr("href");
           console.log(url+x)
    if(url && (url.match("undefined"))||url.length<27)     
      break;
    if(x>=100)break;
  }
     // getMoreDetailsTopics();
    }
function scrapTimes(url){
      var $ = null,result = null;
      ;  //http://time100.time.com/2013/04/18/time-100/slide/all/ 
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".items li");  //  items li
      var currentDiv = null;
       console.log(url);

      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          moredetails = $(currentDiv).find('a').attr('href');  
                                              // console.log(moredetails+" "+designation.length)
          var currentcursor= Timed.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            Time.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            Timed.insert(Follow);
          }

      }
   
    }


    //-----------------------------------------------------------
    function getMoreDetailsTimes(){
        var $ = null,result2 = null,say1,say2,say3,say4;
        var activeurl = [];
     
        Timed.find({}).forEach(function(data){
          activeurl.push(data.moredetails);             //  featching data from the collection TeadSpeaker
      });
       
       for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
                // console.log(url)                                     
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.item-title').text();
          																	  	// console.log("name="+say1);
            say2 =$('.describer-title').text();
            say3 =$('.entry-content p ').text();
            																  	// console.log(say4+"----");
            say4 =$('.entry-content').find("img").attr("src"); 
                       															// console.log(say3);
        
               var currentcursor= TimeData.findOne({"name":say1,"title":say2,"img":say4});
          if(currentcursor){
            TimeData.update({"_id":currentcursor._id},{$set : {"name":say1,"title":say2,"blogText":say3,"img":say4}});
          }else{
            var Follow = {"name":say1,"title":say2,"blogText":say3,"img":say4};
            TimeData.insert(Follow);
          }
          }	//if
      }     //end of for i
    }
function scrapRanker(){
      var $ = null,result = null,say1,say2,say3,say4;
var x=0;
while(1){
x++;
      var url = "http://www.ranker.com/list/top-50-most-influential-people-of-the-21st-century/theomanlenz?page="+x;  //http://www.ranker.com/
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".blog");  //  topics__list__topic
      var currentDiv = null;
       // console.log(url);

      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];

          	say1=$(currentDiv).find('.oNode').text();   
           	say3=$(currentDiv).find('.blogText').text();   
          	say4=$(currentDiv).find('.oImg').text();   
          // console.log(say1+" "+say3+" "+say4+" ");
      
      }
     // getMoreDetails();
      var next =$("#pagingBot_next").attr('href');
     	// console.log(next)
      var currentcursor= ranker.findOne({"img":say4});
          if(currentcursor){
            ranker.update({"_id":currentcursor._id},{$set : {"name":say1,"blogText":say3,"img":say4}});
          }else{
            var Follow = {"name":say1,"blogText": say3,"img": say4};
            ranker.insert(Follow);
          }
      if(next && (next.match("undefined"))&&next.length<27)break;
      }
    }

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
    function scrapTedx(){
      var $ = null,result = null;
      var url = "http://tedxtalks.ted.com/pages/talks-by-topic";  //http://www.ted.com/watch/topics
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".mvp_page_title_expressive");  //  topics__list__topic
      var currentDiv = null;

 console.log(url+"****"+designation.length);

      var moredetails,imgurl;                          //-----



      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          var topics=$(designation[i]).text()   //topics
          topics=topics.replace(/\s+/g, "");
          if(topics && (!topics.match("undefined"))&&topics.length>10){
          moredetails = "http://tedxtalks.ted.com/playlist.mason"+$(designation[i]).text()+"?pages=";  
          console.log(moredetails)        
         
          var currentcursor= TedxTopicx.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            TedxTopicx.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            TedxTopicx.insert(Follow);
          }
        }
      }
     // getMoreDetailsx();
    }


    //-----------------------------------------------------------
    function getMoreDetailsx(){
        var $ = null,result2 = null;
        var activeurl = [];
     
        TedxTopicx.find({}).forEach(function(data){
          activeurl.push(data.moredetails);             //  featching data from the collection TeadSpeaker
      });
       
      for(var j=0,jl=activeurl.length-1;j<jl;j++){
        var url2 = activeurl[j];                         //featching all the urls
        // console.log(url2);
      var x=0;

      while(1)
      {
        x++;
        var url =url2+x;

        console.log("-----"+url)
         if(url && (!url.match("undefined"))&&url.length>27){

            result2 = Meteor.http.get(url);
                // console.log(url)
            $ = cheerio.load(result2.content);      

            var designation = $(".mvp_grid_panel_title a");  //  topics__list__topic
            var currentDiv = null;
            console.log(designation);
            var lastpage=designation.length;  

            if(lastpage<=0)break;
            
            console.log(lastpage+"---/no of videos/------");

            var moredetails,imgurl,urls2;         
                             //----- not working from here due to extra space
           console.log(url2+" /**/*/*/*/*/*/*/*/"+designation.length)


          //   for(var i=0,il=designation.length;i<il;i++){
          //     currentDiv = designation[i];

          //       urls2=$(currentDiv).attr('href');   
          //       // console.log(urls2)
          //       if(urls2 && (!urls2.match("undefined"))&&urls2.length>27)
          //       {
          //             moredetails = "http://tedxtalks.ted.com"+urls2;  
          //               var currentcursor= Tedxwatch.findOne({"moredetails":moredetails});
          //             console.log(moredetails);  
          //               if(currentcursor){
          //                 Tedxwatch.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          //               }
          //               else{
          //                 var Follow = {"moredetails": moredetails,"imgurl":imgurl};
          //                 Tedxwatch.insert(Follow);
          //                 }
          //       }// end for if

          // }// end for i
        
        }   // end for if
        // break;
    }//end of while
      }// end for j
      // getMoreDetails1();
    }
    // function getMoreDetails1x(){
    //   var $ = null,moreResult = null;
    //   var link1,link2,link3,listen,say1,say2;
    //   var activeurl = [];
    //   //console.log("first")
    //   Tedwatch.find({}).forEach(function(data){
    //       activeurl.push(data.moredetails);
    //   });

    //   for(var i=0,il=activeurl.length-1;i<il;i++){
    //       var url = activeurl[i];
                                                     
    //       if(url && (!url.match("undefined"))&&url.length>27){
    //         moreResult = Meteor.http.get(url);   
    //         $ = cheerio.load(moreResult.content);  
    //         say1 =$('.mvp_page_title').text();
    //         // console.log(say1);
    //         say2 =$('.mvp-player-video-content iframe').attr('src');
    //              //----checked

           
    //           // -------------------------------------------------------
    //         var a = $('.magnify-player-social-features a');
    //         var afinal;
            
    //         var x=0;
    //         for(var j=0,jl=a.length;j<jl;j++){
    //             afinal=$(a[j]).attr('href');
               

    //                 if(afinal && (!afinal.match("undefined"))&&afinal.length>27){
    //                     // console.log(x+afinal);
    //                     x++;
    //                     if(x==1)
    //                         link1=$(a[j]).attr('href');
    //                     if(x==2)
    //                         link2=$(a[j]).attr('href');
    //                     if(x==3)
    //                         link3=$(a[j]).attr('href');

    //                 }
    //         }
    //         // end of for 
               
    //       }
    //   }
    // }
/////////////////////////// BHAVESH ///////////////////////


//////////////////////////// NICOLSON /////////////////////////
// EDGE START //
function nicolsonDevelopment(){
    // edgeConversation();
}
function edgeConversation(){
    // http://edge.org/conversations?page=0&tid=mind&type=0
    Loader.update({"_id":"edge"},{$set : {"edgeConversation":"Started Edge Conversation"}});
    console.log("Started Edge Conversation");
    var url = "http://edge.org/conversations?page=";
    var urlEnd = "&tid=mind&type=0";
    var result = null,resultSecond=null;;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    var $ = null,$$=null;
    var title = "";
    for(var i=0;;i++){
        Meteor.setTimeout(function(){
            Loader.update({"_id":"edge"},{$set : {"edgeConversation": "Edge Library "+i}})
        },50);
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
            Loader.update({"_id":"edge"},{$set : {"edgeConversation": "Finished Edge Conversation"}});
            console.log("Finished Edge Conversation");
            break;
        }
    }
    console.log("Finished Edge Conversation");
    Loader.update({"_id":"edge"},{$set : {"edgeConversation": "Finished Edge Conversation"}})
}

function edgeMember() {
    Loader.update({"_id":"edge"},{$set : {"edgeMember":"Started Edge Member"}});
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
        Loader.update({"_id":"edge"},{$set : {"edgeMember":"Started Edge Member link "+currentUser.link}});

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
    Loader.update({"_id":"edge"},{$set : {"edgeMember":"Ended Edge Member"}});
}
function edgeLibrary(){
    Loader.update({"_id":"edge"},{$set : {"edgeLibrary":"Started Edge Library"}});   
    console.log("Started Edge Library");
    var url = "http://edge.org/library?page=";
    var result = null,resultSecond=null;;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    var $ = null,$$=null;
    for(var i=0;;i++){
        console.log("Edge  Edge Library "+i);
        Loader.update({"_id":"edge"},{$set : {"edgeLibrary":"Edge Library "+url+i}});
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
    Loader.update({"_id":"edge"},{$set : {"edgeLibrary":"Finished  Edge Library"}});
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
    Loader.update({"_id":"edge"},{$set : {"edgeVideos":"Started Edge Video"}});
    var url = "http://edge.org/videos?page=";
    var result = null;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    for(var i=0;;i++){
        console.log("Edge Video Page "+i);
        Loader.update({"_id":"edge"},{$set : {"edgeVideos":"Edge Video Page "+i}});
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
    Loader.update({"_id":"edge"},{$set : {"edgeVideos":"Finished Edge Video"}});
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