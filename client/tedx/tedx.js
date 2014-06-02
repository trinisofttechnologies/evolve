Template.tedx.member = function () {
	return TedxwatchData.find({});
}

Template.tedx.events(App.commonEvent)

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}