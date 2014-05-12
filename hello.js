TedLeader = new Meteor.Collection("tedleader");
TedFellows = new Meteor.Collection("tedfellows");
TedSpeakers = new Meteor.Collection("tedspeakers");
TedTopic = new Meteor.Collection("tedtopic");
Tedwatch = new Meteor.Collection("tedwatch");

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
        // scrapTed();
    });
    

    var result,moreResult;

    scrapTedTopic();//topics
    // scrapTed();
    getMoreDetails();//fellows

function scrapTedTopic(){
      var $ = null,result = null;
      var url = "http://www.ted.com/watch/topics";  //http://www.ted.com/watch/topics
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".h9");  //  topics__list__topic
      var currentDiv = null;
       console.log(url);

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
     getMoreDetailsTopic();
    }


    //-----------------------------------------------------------
    function getMoreDetailsTopic(){
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
      getMoreDetails1Topic();
    }
    function getMoreDetails1Topic(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var activeurl = [];
      // console.log("first")
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

            var a = $('.profile-header__links__inner a');
            for(var j=0,jl=a.length;j<jl;j++){
                //console.log($(a[j]).attr('href'));
                link1 = $(a[0]).attr('href');
                link2 = $(a[1]).attr('href');
                link3 = $(a[2]).attr('href');
            }
            profileintro =$('.profile-intro').text();
            //listen = $('.section section--minor p');
            // for(var k=0,kl=listen.length;k<kl;k++){
            //     console.log($(listen[k]).text());
            // }
            say =$('bloquote p').text();
          }
          

      }
    }
            var a = $('.profile-header__links__inner a');
            for(var j=0,jl=a.length;j<jl;j++){
                //console.log($(a[j]).attr('href'));
                link1 = $(a[0]).attr('href');
                link2 = $(a[1]).attr('href');
                link3 = $(a[2]).attr('href');
            }
            profileintro =$('.profile-intro').text();
            //listen = $('.section section--minor p');
            // for(var k=0,kl=listen.length;k<kl;k++){
            //     console.log($(listen[k]).text());
            // }
            say =$('bloquote p').text();
          }
          

      }
    }
            var a = $('.profile-header__links__inner a');
            for(var j=0,jl=a.length;j<jl;j++){
                //console.log($(a[j]).attr('href'));
                link1 = $(a[0]).attr('href');
                link2 = $(a[1]).attr('href');
                link3 = $(a[2]).attr('href');
            }
            profileintro =$('.profile-intro').text();
            //listen = $('.section section--minor p');
            // for(var k=0,kl=listen.length;k<kl;k++){
            //     console.log($(listen[k]).text());
            // }
            say =$('bloquote p').text();
          }
          

      }
    }