
// Loader related public
	Meteor.publish(null,function(){
        return Loader.find({});
    });
// Loader related public