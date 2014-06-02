Template.alltop.news = function () {
	return AllTopSiteLinks.find({});
}

Template.alltop.events(App.commonEvent)

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}