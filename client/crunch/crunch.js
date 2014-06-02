Template.crunch.organization = function () {
	return CruchBaseOrganization.find({});
}
Template.crunch.person = function () {
	return CruchBasePerson.find({});
}
Template.crunch.people = function () {
	return AngelPeople.find({});
}
Template.crunch.public = function () {
	return AngelPublic.find({});
}
Template.crunch.events(App.commonEvent);

function makeActive(elment){
	$(".nav-tabs li").removeClass("active");
	$(elment).addClass("active");
	var ref = $(elment).attr("ref");
	$(".absoluteDiv").hide();
	$("." +ref).show();
}