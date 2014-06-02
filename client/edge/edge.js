Template.edge.memeber = function () {
	return UserEvolve.find({"source":"edge"});
}
Template.edge.conversation = function () {
	return ConversationEvolve.find({});
}
Template.edge.video = function () {
	return VideoEvolve.find({});
}
Template.edge.library = function () {
	return LibraryEvolve.find({});
}

Template.edge.events(App.commonEvent);

