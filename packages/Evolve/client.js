App = {};

function makeActive(elment){
    $(".nav-tabs li").removeClass("active");
    $(elment).addClass("active");
    var ref = $(elment).attr("ref");
    var subscribe = $(elment).attr("subscribe");
    console.log(subscribe);
    console.log(searchKey);
    var searchKey = $(elment).attr("search");
    Session.set("subscribe",subscribe);
    Session.set("searchKey",searchKey);
    $(".absoluteDiv").hide();
    $("." +ref).show();

}
App.makeActive = makeActive;

App.commonEvent = {
    "click .nav-tabs li" : function(event){
        var elment = event.currentTarget;
        App.makeActive(elment);
    }
}
