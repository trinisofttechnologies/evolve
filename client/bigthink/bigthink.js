Template.bigthink.video = function () {
	return BigThinkVideos.find({});
}
Template.bigthink.blogs = function () {
	return BigThinkBlogs.find({});
}
Template.bigthink.experts = function () {
	return BigThinkExpert.find({});
}

Template.bigthink.events(App.commonEvent);

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}