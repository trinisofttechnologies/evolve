if ( typeof Scrap !== 'undefined'  && Scrap !== null){

}
else{
	Scrap = {};
}



Scrap.ranker ={};	
Scrap.tedb ={};	
Scrap.tedx ={};	
Scrap.edted ={};	
Scrap.esquire ={};	
Scrap.time100={};

function getMyTime(startTime){
    var elapsed = new Date().getTime() - startTime;
    return elapsed / 10 + (elapsed % 10 ? '' : '.0' )
}
//------------------------------------------TIME 100 1-------------------------------------

function scrapTimes2(url){
      var $ = null,result = null;
        //http://time100.time.com/2013/04/18/time-100/slide/all/ 
       var startTime = new Date().getTime();
        var method = {"method1" : {"name":"time","status":"Started time", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"time"},{$set : method});
   
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
                                                                                 // console.log(url+x)
    if(url==="undefined")break;                                                                             
    if(url && (url.match("undefined"))||url.length<27)break;
    if(x>=100)break;
    }
    var method = {"method1" : {"name":"time","status":"END time", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"time"},{$set : method});
   
}
Scrap.time100.scrapTimes2=scrapTimes2;
//------------------------------------------TIME 100 1-------------------------------------
//------------------------------------------TIME 100 2-------------------------------------

function scrapTimes(url){
      var $ = null,result = null;
         //http://time100.time.com/2013/04/18/time-100/slide/all/ 
      var startTime = new Date().getTime();
      var method = {"method1" : {"name":"time","status":"Started time", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"time"},{$set : method});
   

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".items li");  //  items li
      var currentDiv = null;
                                                      // console.log(url);

      var moredetails,imgurl;                          //-----

      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          moredetails = $(currentDiv).find('a').attr('href');  
                                              // console.log(moredetails+" "+designation.length)
          var currentcursor= Timed.findOne({"moredetails":moredetails});
          
          if(currentcursor){
              Timed.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
              var Follow = {"moredetails": moredetails,"imgurl":imgurl};
              Timed.insert(Follow);
          }

      }
      var method = {"method1" : {"name":"time","status":"END time", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"time"},{$set : method});
   
    }

    Scrap.time100.scrapTimes=scrapTimes;
//------------------------------------------TIME 100 2-------------------------------------
//------------------------------------------TIME 100 3-------------------------------------
    function getMoreDetailsTimes(){
      var $ = null,result2 = null,say1,say2,say3,say4;
      var activeurl = [];
      var startTime = new Date().getTime();
      var method = {"method2" : {"name":"time","status":"Started time m2", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"time"},{$set : method});
   
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
                                                    // console.log(say4);
        
            var currentcursor= TimeData.findOne({"name":say1,"title":say2,"img":say4});
          if(currentcursor){
            TimeData.update({"_id":currentcursor._id},{$set : {"name":say1,"title":say2,"blogText":say3,"img":say4}});
          }else{
            var Follow = {"name":say1,"title":say2,"blogText":say3,"img":say4};
            TimeData.insert(Follow);
          }
        } //if
      }     //end of for i
       var method = {"method2" : {"name":"time","status":"end time", "time" :getMyTime(startTime)}};
       Loader.update({"_id":"time"},{$set : method});
}
Scrap.time100.getMoreDetailsTimes=getMoreDetailsTimes;
//------------------------------------------TIME 100 3-------------------------------------
//------------------------------------------TED WATCH TOPICS 1-------------------------------------

function scrapTedTopics(){
      var $ = null,result = null;
      var url = "http://www.ted.com/watch/topics";  //http://www.ted.com/watch/topics
      var startTime = new Date().getTime();
      var method = {"method1" : {"name":"ted topics","status":"Started ted watch topics", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".h9");  //  topics__list__topic
      var currentDiv = null;
                                                                                        // console.log(url);
      var moredetails,imgurl;                          //-----
      for(var i=0,il=designation.length;i<il;i++){
          currentDiv = designation[i];
          moredetails = "http://www.ted.com"+$(currentDiv).find('a').attr('href');  
                                                                      // console.log(moredetails);
          var currentcursor= TedTopic.findOne({"moredetails":moredetails});          
          if(currentcursor){
            TedTopic.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            TedTopic.insert(Follow);
          }
      }       
      var method = {"method1" : {"name":"ted topics","status":"Finished  Ted watch Topic", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"ted"},{$set : method});
}
Scrap.tedb.scrapTedTopics=scrapTedTopics;
//------------------------------------------TED WATCH TOPICS 1-------------------------------------
//------------------------------------------TED WATCH TOPICS 2-------------------------------------
    function getMoreDetailsTopics(){
        var $ = null,result2 = null;
        var activeurl = [];
        var startTime = new Date().getTime();
        var method = {"method2" : {"name":"ted topics","status":"Started ted watch Detail topics", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
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
            var moredetails,imgurl,urls2;                             
                                                                // console.log(url2+" "+designation.length)
            for(var i=0,il=designation.length;i<il;i++){
              currentDiv = designation[i];
              // console.log(url2+" "+designation[i]); 
                urls2=$(currentDiv).find('a').attr('href');   
                if(urls2 && (!urls2.match("undefined"))&&urls2.length>27)
                {
                      moredetails = "http://www.ted.com"+urls2;  
                        var currentcursor= Tedwatch.findOne({"moredetails":moredetails});
                                                                                // console.log(moredetails);  
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
    var method = {"method2" : {"name":"ted topics2","status":"Finished  Ted watch Detail Topic", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
    }
    Scrap.tedb.getMoreDetailsTopics=getMoreDetailsTopics;
//------------------------------------------TED WATCH TOPICS 2-------------------------------------
//------------------------------------------TED WATCH TOPICS 3-------------------------------------
    function getMoreDetails1Topics(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var activeurl = [];
                                                                   // console.log("first")
      var startTime = new Date().getTime();
      var method = {"method3" : {"name":"ted topics","status":"Started ted  topics", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"ted"},{$set : method});

      Tedwatch.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });
      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];                                                     
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.talk-hero__speaker a').text();
                                                                        // console.log("+"+say1);
            say2 =$('.talk-hero__title').text();
                                                                        // console.log("-"+say2);
            say3 =$('.talk-sharing__value').text();        
                                                                        // console.log("/"+say3);
            say4 =$('.talk-description').text();        
                                                                         console.log("*"+say4);       
            say5 =$('.talk-pip__container').attr('data');         
                                                                         // console.log("% "+say5);
            // say5=say5.replace("/player.swf?","");
            // say5="http://www.youtube.com/embed"+say5;        
                                                                        // console.log("%"+say5);// problem in linking the videos                                                                       
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
             var currentcursor= TedwatchData.findOne({"img":say4});
          if(currentcursor){
            TedwatchData.update({"_id":currentcursor._id},{$set : {"name":say1,"title":say2,"share":say3,"para":say4,"video":say5,"link1":link1,"link2":link2,"link3":link3}});
          }else{
            var Follow = {"name":say1,"title":say2,"share":say3,"para":say4,"video":say5,"link1":link1,"link2":link2,"link3":link3};
            TedwatchData.insert(Follow);
          }  
          }
      }
      var method = {"method3" : {"name":"ted topics","status":"end ted  topics", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
    }
    Scrap.tedb.getMoreDetails1Topics=getMoreDetails1Topics;
//------------------------------------------TED WATCH TOPICS 3-------------------------------------
//-----------------------------------TED THEMES 1-------------------------
function scrapThemes(){
      var $ = null,result = null,say1,say2,say3,say4;
var startTime = new Date().getTime();
var method = {"method1" : {"name":"scrapThemes1","status":"Started ted Themes", "time" :getMyTime(startTime)}};
Loader.update({"_id":"ted"},{$set : method});

var url = "https://www.ted.com/themes";  //http://www.ted.com/themes
      

      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".clearfix h4");  //  topics__list__topic
      var currentDiv = null;
                                 // console.log(url+" "+designation.length);
//      
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
    var method = {"method1" : {"name":"scrapThemes1","status":"END ted Themes", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"ted"},{$set : method});

  }
  Scrap.tedb.scrapThemes=scrapThemes;
//------------------------------------------TED THEMES 1-------------------------------------
//------------------------------------------TED THEMES 2-------------------------------------
    function getMoreThemes(){
  
      	var $ = null,moreResult = null;
      	var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      	var activeurl = [];
      	var startTime = new Date().getTime();
		    var method = {"method2" : {"name":"scrap Themes2","status":"Started ted Themes", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ted"},{$set : method});
   
	                                                                               	// console.log("first")
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
      	var method = {"method2" : {"name":"scrap Themes2","status":"END ted Themes", "time" :getMyTime(startTime)}};
		    Loader.update({"_id":"ted"},{$set : method});
        
}
Scrap.tedb.getMoreThemes=getMoreThemes;
//------------------------------------------TED THEMES 2-------------------------------------
//------------------------------------------ED TED LESSON 1-------------------------------------

function scrapLesson(){
    var startTime = new Date().getTime();
    var method = {"method1" : {"name":"ted lessons","status":"Started lessons Conversation", "time" :getMyTime(startTime)}};
    Loader.update({"_id":"ted"},{$set : method});
    var $ = null,result = null;
	var x=0;
 	
      while(1){
      x++;
      var url = "http://ed.ted.com/lessons?page="+x;  //http://www.ed.ted.com/lessons
      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".videoText");  //  topics__list__topic
      var currentDiv = null;
                                          // console.log(url+" "+designation.length);
      if(designation.length<=0)break;      
      var moredetails,imgurl;                         //-----
      for(var i=0,il=designation.length;i<il;i++){
          	currentDiv = designation[i];
      		var url = $(currentDiv).find('a').attr('href');
                                              					                   // console.log(url)                                     
      		if(url && (!url.match("undefined"))&&url.length>27)
      		{
       			moredetails = "http://ed.ted.com"+$(currentDiv).find('a').attr('href');  
                                          												// console.log(moredetails);
          		var currentcursor= Lesson.findOne({"moredetails":moredetails});
          		if(currentcursor){
            		Lesson.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          		}else{
            		var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            		Lesson.insert(Follow);
          		}
			}//end if
      	}
    }//while
    var method = {"method1" : {"name":"scrapLesson","status":"END ted Lesson", "time" :getMyTime(startTime)}};
     Loader.update({"_id":"edted"},{$set : method});
  }
  Scrap.edted.scrapLesson=scrapLesson;
  //------------------------------------------ED TED LESSONS 1-------------------------------------
//------------------------------------------ED TED LESSONS 2-------------------------------------

    function getMoreLesson(){
      
      var startTime = new Date().getTime();
	    var method = {"method2" : {"name":"scrapLesson-2","status":"Started ed ted lessons", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"edted"},{$set : method});   
      var $ = null,moreResult = null;     
      var link1,link2,link3,listen,say1,say2,say3,say4;
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
                                                                       // console.log(say1);
            say2 =$('.lessonDescription p').text();
                                        // console.log(say2);     //----checked 
            say3 =$('.videoContainer div').attr('data-video-id');        
            say3= "https://www.youtube.com/embed/" +say3;
                                                                        console.log(say3);    
            say4 =$('.creatorImage img').attr("src");
            say5 =$('.creatorInfo strong').text();
            say6 =$('.creatorInfo').text();
                           
     		  var currentcursor= LessonData.findOne({"video":say3,"creatorI":say4});
          if(currentcursor){
            LessonData.update({"video":say3,"creatorI":say4},{$set : {"head":say1,"say":say2,"video":say3,"creatorI":say4,"creator":say5,"post":say6}});
          }else{
            var Follow = {"head":say1,"say":say2,"video":say3,"creatorI":say4,"creator":say5,"post":say6};
            LessonData.insert(Follow);
          }
               
          } //if
      }
        var method = {"method2" : {"name":"scrapLesson-2  ","status":"END ted Themes", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"edted"},{$set : method});
   
    }
    Scrap.edted.getMoreLesson=getMoreLesson;
//------------------------------------------ED TED LESSON 2-------------------------------------
//------------------------------------------TED BROWSE 1-------------------------------------

function scrapBrowse(){
      var $ = null,result = null,say1,say2,say3,say4;
      var startTime = new Date().getTime();
      var method = {"method1" : {"name":"ted browse","status":"Started lessons Conversation", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"ted"},{$set : method});
   
		var x=0;
		while(true){
		x++;
     	var url = "http://www.ted.com/talks/browse?page="+x;  //http://www.browse.com/
      	var method = {"method2" : {"name":"edgeConversation","status":"Started lessons Conversation", "time" :getMyTime(startTime)}};
      	Loader.update({"_id":"ted"},{$set : method});
   

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
                                                                  // console.log(moredetails);
          var currentcursor= browse.findOne({"moredetails":moredetails});
          
          if(currentcursor){
            browse.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
          }else{
            var Follow = {"moredetails": moredetails,"imgurl":imgurl};
            browse.insert(Follow);
          }

      }
    }
     var method = {"method1" : {"name":"tedbrowse","status":"END browse Conversation", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"ted"},{$set : method});
   
  }
Scrap.tedb.scrapBrowse=scrapBrowse;
 //------------------------------------------TED BROWSE 1-------------------------------------
//------------------------------------------TED BROWSE 2-------------------------------------
   function getMoreBrows(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3,say4,say5;
      var startTime = new Date().getTime();
      var method = {"method2" : {"name":"ted browse","status":"Started ted browse", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"ted"},{$set : method});
   
   
      var activeurl = [];
      //console.log("first")
      browse.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });

      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
                console.log(url)           
                var method = {"method2" : {"name":"ted browse","status":"Started ted browse"+i, "time" :getMyTime(startTime)}};
                Loader.update({"_id":"ted"},{$set : method});                          
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.talk-hero__speaker a').text();
            // console.log(say1);
            say2 =$('.talk-hero__title').text();
            say3 =$('.talk-sharing__value').text();        
            say4 =$('.talk-description').text();        
            say5 =$('.talk-hero__poster').find('img').attr('src');       
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
            var Follow = {"name":say1,"title":say2,"share":say3,"para":say4,"video":say5,"link1":link1,"link2":link2,"link3":link3};
            browseData.insert(Follow);
          }
      }
       var method = {"method2" : {"name":"tedbrowse","status":"END ted browse", "time" :getMyTime(startTime)}};
       Loader.update({"_id":"ted"},{$set : method});
   
    }
Scrap.tedb.getMoreBrows=getMoreBrows;
//------------------------------------------TED BROWSE 2-------------------------------------

//------------------------------------------TEDX TALK TOPICS 1-------------------------------------

    function scrapTedx(){
      var $ = null,result = null;
      var url = "http://tedxtalks.ted.com/pages/talks-by-topic";  
      var startTime = new Date().getTime();
       var method = {"method1" : {"name":"tedxConversation","status":"Started tedx1", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"tedx"},{$set : method});
    															// console.log(url);
      result = Meteor.http.get(url);
      $ = cheerio.load(result.content);                           
      var designation = $(".mvp_page_title_expressive");  //  topics__list__topic
      var currentDiv = null;
 																// console.log(url+"****"+designation.length);
      var moredetails,imgurl;                          //-----
   	  for(var i=0,il=designation.length;i<il;i++){
        currentDiv = designation[i];
        var topics=$(designation[i]).text()   //topics
        var newTopic = "";
        for(var j=0,jl=topics.length;j<jl;j++){
            if(!(topics.charCodeAt(j)== 9 || topics.charCodeAt(j)== 10)){
                if(topics.charAt(j) == " "){
                    newTopic+= "-";
                }
                else{
                    newTopic+=topics.charAt(j);                    
                }
            }  
        }
        topics=topics.replace("/\r?\n|\r/", "");
        if(topics && (!topics.match("undefined"))&&topics.length>10){
            moredetails = "http://tedxtalks.ted.com/playlist.mason/"+newTopic+"?page=";  
          									 						                       // console.log(moredetails)     
            var currentcursor= TedxTalkTopic.findOne({"moredetails":moredetails});
            if(currentcursor){
                TedxTalkTopic.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
            }
            else{
                var Follow = {"moredetails": moredetails,"imgurl":imgurl};
                TedxTalkTopic.insert(Follow);
            }
        }//if
   	 }
        // getMoreDetailsx();
        var method = {"method1" : {"name":"tedx topics","status":"Finished  Tedx Topic", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"tedx"},{$set : method});
    }
Scrap.tedx.scrapTedx=scrapTedx;
 //------------------------------------------TEDX TALK TOPICS 1-------------------------------------
//------------------------------------------TEDX TALK TOPICS 2-------------------------------------
   function getMoreDetailsx(){
       var $ = null,result2 = null;
       var activeurl = [];
       TedxTalkTopic.find({}).forEach(function(data){
          activeurl.push(data.moredetails);             //  featching data from the collection Teadx ?p =
      });
       var startTime = new Date().getTime();
       var method = {"method2" : {"name":"tedx2","status":"Started tedx Conversation", "time" :getMyTime(startTime)}};
       Loader.update({"_id":"tedx"},{$set : method});
    
       
      for(var j=3,jl=activeurl.length-1;j<jl;j++){
       														// console.log(activeurl[j]+"-----"+activeurl.length)
       var x=0;
      while(true)
      {
        x++;
        var url = activeurl[j]+x;        																	
         if(url && (!url.match("undefined"))&&url.length>27){
         																	                        console.log(url)
            result2 = Meteor.http.get(url);                
            $ = cheerio.load(result2.content);           
            var designation = $(".panel_collection .mvp_grid_panel_title a");
                                                 console.log(designation.length +" "+ x);              //  topics__list__topic
            var currentDiv = null;
            var lastpage=designation.length;  

            if(lastpage<=0)break;           
                                                          // console.log(lastpage+"---/no of videos/------");
            var moredetails,imgurl,urls2;         
                            
           console.log(url2+" /**/*/*/*/*/*/*/*/"+designation.length)


            for(var i=0,il=designation.length;i<il;i++){
              currentDiv = designation[i];

                urls2=$(currentDiv).attr('href');   
                							                                         									// console.log(urls2)
                if(urls2 && (!urls2.match("undefined"))&&urls2.length>27)
                {
                      moredetails = "http://tedxtalks.ted.com"+urls2;  
                        var currentcursor= Tedxwatch.findOne({"moredetails":moredetails});
                                                                                   // console.log(moredetails);  
                        if(currentcursor){
                          Tedxwatch.update({"moredetails":moredetails},{$set : {"imgurl":imgurl}});
                        }
                        else{
                          var Follow = {"moredetails": moredetails,"imgurl":imgurl};
                          Tedxwatch.insert(Follow);
                          }
                }// end for if

          }// end for i
        
        }   // end for if
        // if(x>12)          break;
    }//end of while
      }// end for j
      // getMoreDetails1();
      var method = {"method2" : {"name":"tedxConversation","status":"Started tedx Conversation", "time" :getMyTime(startTime)}};
       Loader.update({"_id":"tedx"},{$set : method});
    
    }
    Scrap.tedx.getMoreDetailsx=getMoreDetailsx;
//------------------------------------------TEDX TALK TOPICS 2-------------------------------------
//------------------------------------------TEDX TALK TOPICS 3-------------------------------------

    function getMoreDetails1x(){
      var $ = null,moreResult = null;
      var link1,link2,link3,listen,say1,say2,say3;
      var activeurl = [];
                                                // console.log("first"+activeurl.length)
      var startTime = new Date().getTime();
      var method = {"method3" : {"name":"tedxConversation3","status":"Started tedx Conversation", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"tedx"},{$set : method});
    
      Tedwatch.find({}).forEach(function(data){
          activeurl.push(data.moredetails);
      });

      for(var i=0,il=activeurl.length-1;i<il;i++){
          var url = activeurl[i];
                                                                // console.log(url+" "+activeurl.length)                          
          if(url && (!url.match("undefined"))&&url.length>27){
            moreResult = Meteor.http.get(url);   
            $ = cheerio.load(moreResult.content);  
            say1 =$('.talk-hero__speaker__link').text();
                                                                  // console.log(say1);
            // say2 =$('.talk-pip__container object').attr('data');
            // say2=say2.repalce("/assets/player.swf?","");
            // say2="http://www.youtube.com/embed/"+say2;              console.log(say2);
                                                                                              // undefined error object
            var a = $('.talk-sharing__tools a');
            var afinal;
            say3=$('.talk-hero__title').text();              // console.log(say3);
            say4=$('.talk-sharing__value').text();              // console.log(say4);
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
    //         // end of for 
             var currentcursor= TedxwatchData.findOne({"name":say1,"title":say3});
                      // console.log(moredetails);  
              if(currentcursor){
               	TedxwatchData.update({"name":say1,"title":say3},{$set : {"name":say1,"video":say2,"title":say3,"share":say4,"link1":link1,"link2":link2,"link3":link3}});
               }
              else{
               	var Follow = {"name":say1,"video":say2,"title":say3,"share":say4,"link1":link1,"link2":link2,"link3":link3};
              	TedxwatchData.insert(Follow);
               }   
          }
      }
       var method = {"method3" : {"name":"tedxConversation3","status":"Started tedx Conversation", "time" :getMyTime(startTime)}};
      	Loader.update({"_id":"tedx"},{$set : method});    
    }
     Scrap.tedx.getMoreDetails1x=getMoreDetails1x;
 
//------------------------------------------TEDX TALK TOPICS 3-------------------------------------

//---------------------------------------------RANKER-------------------------------------
function scrapRanker(){
      var $ = null,result = null,say1,say2,say3,say4;
      var x=0;
      
      var startTime = new Date().getTime();
      var method = {"method1" : {"name":"ranker","status":"Started Ranker Conversation", "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ranker"},{$set : method});

      while(true){
      x++;
      var url = "http://www.ranker.com/list/top-50-most-influential-people-of-the-21st-century/theomanlenz?page="+x;  //http://www.ranker.com/
     
      var method = {"method1" : {"name":"ranker","status":"Started ranker Conversation "+x, "time" :getMyTime(startTime)}};
        Loader.update({"_id":"ranker"},{$set : method});

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
            say4=$(currentDiv).find('img').attr("src");   
          // console.log(say4+" ");
      
      }
     // getMoreDetails();     
      var currentcursor= ranker.findOne({"img":say4});
          if(currentcursor){
            ranker.update({"_id":currentcursor._id},{$set : {"name":say1,"blogText":say3,"img":say4}});
          }else{
            var Follow = {"name":say1,"blogText": say3,"img": say4};
            ranker.insert(Follow);
          }

      var next =$("#pagingBot_next").attr('href');
                                                                              // console.log(next);
        // if(next && (next === undefined)){

        //     break;
        // }
        if(!next)
            break;
        if(next.length<27){
            break;
        }
      }
      var method = {"method1" : {"name":"ranker","status":"END ranker Conversation", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"ranker"},{$set : method});
    }
   
  Scrap.ranker.scrapRanker=scrapRanker;
  //------------------------------------------------------------RANKER------------------------
  //---------------------------------ESQUIRE------------------------------------
  function scrapEsquire(){
      var $ = null,result = null,say1,say2,say3,say4;
      var startTime = new Date().getTime();
      var method = {"method1" : {"name":"esquire","status":"Started esquire Conversation", "time" :getMyTime(startTime)}};
      Loader.update({"_id":"esquire"},{$set : method});
   
      var url = "http://www.esquire.com/features/most-influential-21st-century-1008#slide-1";  //http://www.esqire.com/
      

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
    Scrap.esquire.scrapEsquire=scrapEsquire;
//-----------------------------------ESQUIRE-----------------------
