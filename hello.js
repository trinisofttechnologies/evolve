TedLeader = new Meteor.Collection("tedleader");
TedFellows = new Meteor.Collection("tedfellows");
TedSpeakers = new Meteor.Collection("tedspeakers");
TedTopic = new Meteor.Collection("tedtopic");
Tedwatch = new Meteor.Collection("tedwatch");
BigThinkExpert = new Meteor.Collection("bigthinkexpert");
BigThinkVideos = new Meteor.Collection("bigthinkvideos");
BigThinkBlogs = new Meteor.Collection("bigthinkblogs");

VideoEvolve = new Meteor.Collection("videoevolve");
ConversationEvolve = new Meteor.Collection("conversationevolve");
UserEvolve = new Meteor.Collection("userevolve");

if (Meteor.isServer) {
    Meteor.startup(function () {
        // scrapTed();
        
        // still in progress
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

// Left over from here
function edgeConversation(){
    // http://edge.org/conversations?page=0&tid=mind&type=0
    console.log("Started Edge Conversation");
    var url = "http://edge.org/conversations?page=";
    var urlEnd = "&tid=mind&type=0";
    var result = null,resultSecond=null;;
    var row = null;
    var empty = null;
    var origin = "http://edge.org";
    var $ = null,$$=null;
    var title = "";
    for(var i=0;i<1;i++){
        console.log("Edge  Edge Library "+i);
        result = Meteor.http.get(url+i+urlEnd);
        $ = cheerio.load(result.content);
        row = $("tbody tr");
        if(row.length == 0){
            console.log("Finished Edge Conversation");
            break;
        }
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
            for(l=0,ll=contributor.length;l<ll;l++){
                contributorName = $(contributor[l]).children("a").text();
                contributorLink = $(contributor[l]).children("a").attr("href");
                contributorLink = origin + contributorLink;

                var cursorUserEvolve = UserEvolve.findOne({"name":contributorName,"link":contributorLink});
                if(cursorUserEvolve){

                }
                else{
                    UserEvolve.insert({"name":contributorName,"link":contributorLink})
                }
            }
            console.log($(contributor).length);
        }
        console.log(row.length);
    }
    console.log("Finished Edge Conversation");
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



function b(value){
    console.log(value);
}