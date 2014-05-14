Meteor.startup(function () {
	
});

// Loader relation code
Template.loader.scrapingsite = function(){
	return Loader.find({});
}
Template.ownLoader.helpers({
	"html" : function(){
		var html = "";
		html = "<div>" +this._id +"</div>"
		$.each(this, function(key, value){
			if(key != "_id")
			html +="<div>"+key +" </div> <div> "+value +" </div>"    
		});
		
		
		return html;
	}
});
// Loader relation code