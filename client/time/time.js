Template.time.member = function () {
	return TimeData.find({});
}

Template.time.events(App.commonEvent)
function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}