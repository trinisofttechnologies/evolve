
Meteor.Router.add({
    '/': {
        to: 'scrapping',
        as: 'home'
    },
    '/admin/scrapping': 'scrapping',
    '/admin/edge': 'edge',
    '/admin/crunch': 'crunch',
    '/admin/ranker': 'ranker',
    '/admin/ted': 'ted',
    '/admin/edted': 'edted',
    '/admin/time': 'time',
    '/admin/tedx': 'tedx',
    '/sellers': 'sellers',
    '/admin/bigthink': 'bigthink',
    '/admin/Esquire': 'Esquire',
    '/admin/alltop': 'alltop',
    '/admin/connection': 'connection',
    '/results': 'results'
});
Meteor.startup(function () {
	
});



Deps.autorun(function(){
    var page = Session.get("page");
    page = Number(page);
    var search = Session.get("search");
    var subscribe = Session.get("subscribe");
    var searchKey = null;
    searchKey = $(".nav-tabs li.active").attr("search");
    if(!subscribe)
        return;
    if(search && searchKey){
        Meteor.subscribe(subscribe,null,search,searchKey);
        return;
    }
    if(search)
        return;
    if(isNaN(page)){
        Meteor.subscribe(subscribe,0);
    }
    else{
        Meteor.subscribe(subscribe,page*20);
    }
});

// common code
Template.page.events({
    "click .pagination li a" : function(event){
        var page = $(event.currentTarget).html();
        var p = Session.get("page");
        p = Number(p);
        if(page == "«"){
            p --;
        }
        else if(page == "»"){
            p ++;
        }
        else{
            p = page
        }
        if(p <0 || isNaN(p))
            p =0;
        p = Number(p);
        Session.set("page",p)
    },
    "click button" : function(event){
        var search = $(".navbar-form input").val();
        if(search)
            Session.set("search",search);
        else
            Session.set("search",null);
        $(".form-group input").val("");
    }
});
