
// Loader related public
	Meteor.publish(null,function(){
        return Loader.find({});
    });
// Loader related public

// Edge related public
    Meteor.publish("userevolve",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return UserEvolve.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return UserEvolve.find({"source":"edge"},{limit:20,skip:page});            
        }
    });
    Meteor.publish("conversationevolve",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return ConversationEvolve.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return ConversationEvolve.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("videoevolve",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return VideoEvolve.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return VideoEvolve.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("libraryevolve",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return LibraryEvolve.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return LibraryEvolve.find({},{limit:20,skip:page});            
        }
    });

////////////////////////////Connection///////////////////////////////////////
    
    Meteor.publish(null,function(page,search,name){
        return ConnectionCategory.find({});
    });




////////////////////////////Connection///////////////////////////////////////


////////////////////////////bigthink///////////////////////////////////////


    Meteor.publish("bigthinkexpert",function(page,search,name){
        return BigThinkExpert.find({},{limit:20,skip:page});
    });

    Meteor.publish("bigthinkvideos",function(page,search,name){
        return BigThinkVideos.find({},{limit:20,skip:page});
    });

    Meteor.publish("bigthinkblogs",function(page,search,name){
        return BigThinkBlogs.find({},{limit:20,skip:page});
    });

////////////////////////////bigthink///////////////////////////////////////

////////////////////////////alltop///////////////////////////////////////
    
    Meteor.publish("alltopsitelinks",function(page,search,name){
        return AllTopSiteLinks.find({},{limit:20,skip:page});
    });




////////////////////////////alltop///////////////////////////////////////



////////////////////////////////////ted/////////////////////////////////////


    Meteor.publish("TedSpeakers",function(page,search,name){
        return TedSpeakers.find({},{limit:20,skip:page});
    });

    Meteor.publish("TedFellows",function(page,search,name){
        return TedFellows.find({},{limit:20,skip:page});
    });

////////////////////////////////////ted/////////////////////////////////////



///////////////////////////// Crunchbase /////////////////////////////////////////////
    Meteor.publish("cruchbaseorganization",function(page,search,name){
        return CruchBaseOrganization.find({},{limit:20,skip:page});
    });
    Meteor.publish("cruchbaseperson",function(page,search,name){
        return CruchBasePerson.find({},{limit:20,skip:page});
    });
///////////////////////////// Crunchbase ///////////////////////////////////////////// 

///////////////////////////// AngelPeople /////////////////////////////////////////////

    Meteor.publish("angelpeople",function(page,search,name){
        return AngelPeople.find({},{limit:20,skip:page});
    });
    
    Meteor.publish("angelpublic",function(page,search,name){
        return AngelPublic.find({},{limit:20,skip:page});
    });
///////////////////////////// AngelPeople /////////////////////////////////////////////

    ////////////////////////////////////////////////
    
// Loader related public
// Edge related public

	// bhavesh
	
	Meteor.publish("Ranker",function(page,search,name){
         if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return ranker.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return ranker.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("Esquire",function(page,search,name){
       if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return Esquire.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return Esquire.find({},{limit:20,skip:page});            
        }
    });
// Ted related public
    Meteor.publish("EdTed",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return LessonData.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return LessonData.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("TedTheme",function(page,search,name){
         if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return ThemesData.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return ThemesData.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("TedTopics",function(page,search,name){
         if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return TedwatchData.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return TedwatchData.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("TedBrows",function(page,search,name){
          if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return browseData.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return browseData.find({},{limit:20,skip:page});            
        }
    });
    Meteor.publish("TedX",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return TedxwatchData.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return TedxwatchData.find({},{limit:20,skip:page});            
        }
    });
// Tedx related public

	Meteor.publish("Time100",function(page,search,name){
        if(search && name){
            var json = {};
            json[name] = {$regex : ".*"+search +".*"};
            return TimeData.find(json,{limit:20}); //{"username" : {$regex : ".*son.*"}}
        }
        else{
            return TimeData.find({},{limit:20,skip:page});            
        }
    });
// time 100 related public

