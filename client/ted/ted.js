Template.ted.member = function () {
	return LessonData.find({});
}
Template.ted.memb = function () {
	return ThemesData.find({});
}
Template.ted.watch = function () {
	return TedwatchData.find({});
}
Template.ted.browse = function () {
	return browseData.find({});
}
Template.ted.speaker = function () {
	return TedSpeakers.find({});
}
Template.ted.follows = function () {
	return TedFellows.find({});
}

Template.ted.events(App.commonEvent)

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}