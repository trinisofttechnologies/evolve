TedLeader = new Meteor.Collection("tedleader");
TedFellows = new Meteor.Collection("tedfellows");
TedSpeakers = new Meteor.Collection("tedspeakers");

AngelPeople = new Meteor.Collection("angelpeople");
AngelPublic = new Meteor.Collection("angelpublic");

AllTopSite = new Meteor.Collection("alltopsite");
AllTopSiteLinks = new Meteor.Collection("alltopsitelinks");
// TedTopic = new Meteor.Collection("tedtopic");
// Tedwatch = new Meteor.Collection("tedwatch");

BigThinkExpert = new Meteor.Collection("bigthinkexpert");
BigThinkVideos = new Meteor.Collection("bigthinkvideos");
BigThinkBlogs = new Meteor.Collection("bigthinkblogs");
	
CruchBasePerson = new Meteor.Collection("Cruchbaseperson");
CruchBaseOrganization = new Meteor.Collection("cruchbaseorganization");

/////////////////////////// BHAVESH ///////////////////////
ranker = new Meteor.Collection("ranker");			//done

Esquire = new Meteor.Collection("esquire");

Timed = new Meteor.Collection("timed");
TimeData = new Meteor.Collection("timedata");

	




Lesson = new Meteor.Collection("lesson");		
LessonData = new Meteor.Collection("lessondata");

browse = new Meteor.Collection("browse");
browseData = new Meteor.Collection("browsedata");

	
Themes = new Meteor.Collection("themes");
ThemesData = new Meteor.Collection("themesdata");

  
TedTopic = new Meteor.Collection("tedtopic");
Tedwatch = new Meteor.Collection("tedwatch");  
TedwatchData = new Meteor.Collection("tedwatchdata");  

 TedxTalkTopic = new Meteor.Collection("tedxtalktopic");
 Tedxwatch = new Meteor.Collection("tedxwatch");			//left
 TedxwatchData = new Meteor.Collection("tedxwatchdata");

Loader = new Meteor.Collection("loader");
Page = new Meteor.Collection("page");

VideoEvolve = new Meteor.Collection("videoevolve");
ConversationEvolve = new Meteor.Collection("conversationevolve");
UserEvolve = new Meteor.Collection("userevolve");
LibraryEvolve = new Meteor.Collection("libraryevolve");

Connection = new Meteor.Collection("connection");
ConnectionCategory = new Meteor.Collection("connectioncategory");


/////////////////////////// BHAVESH ///////////////////////
DebugFace = false;
Meteor.startup(function () {
	if(Meteor.absoluteUrl.defaultOptions.rootUrl.match("localhost:3000"))
		DebugFace = true;	
});

