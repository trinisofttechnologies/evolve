Template.ranker.member = function () {
	return ranker.find({});
}

Template.ranker.events(App.commonEvent)

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}