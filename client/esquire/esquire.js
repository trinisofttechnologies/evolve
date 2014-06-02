Template.Esquire.member = function () {
	return Esquire.find({});
}

Template.Esquire.events(App.commonEvent)

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}