Template.connection.memeber = function(){
	return ConnectionCategory.find({});
}
Template.connection.user = function(){
	return VideoEvolve.find({"category":Session.get("category")});
}

Template.connection.events({
	"click .btn-group button" : function(event){
		console.log(this);
		// videoevolve
		Session.set("category",this.categoryName);
		Meteor.subscribe("videoevolve",null,this.categoryName,"category");
	}
})