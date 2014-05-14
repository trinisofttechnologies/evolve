TedLeader = new Meteor.Collection("tedleader");
TedFellows = new Meteor.Collection("tedfellows");
TedSpeakers = new Meteor.Collection("tedspeakers");
TedTopic = new Meteor.Collection("tedtopic");
Tedwatch = new Meteor.Collection("tedwatch");
BigThinkExpert = new Meteor.Collection("bigthinkexpert");
BigThinkVideos = new Meteor.Collection("bigthinkvideos");
BigThinkBlogs = new Meteor.Collection("bigthinkblogs");
CruchBasePerson = new Meteor.Collection("Cruchbaseperson");
CruchBaseOrganization = new Meteor.Collection("cruchbaseorganization");

TedxTopicx = new Meteor.Collection("tedxtopicx");
Tedxwatch = new Meteor.Collection("tedxwatch");


Loader = new Meteor.Collection("loader");

VideoEvolve = new Meteor.Collection("videoevolve");
ConversationEvolve = new Meteor.Collection("conversationevolve");
UserEvolve = new Meteor.Collection("userevolve");

if(Meteor.absoluteUrl.defaultOptions.rootUrl.match("localhost:3000"))
	DebugFace = true;