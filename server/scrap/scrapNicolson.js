if ( typeof Scrap !== 'undefined'  && Scrap !== null){

}
else{
	Scrap = {};
}

Scrap.generic = {};

// N
Scrap.edge = {};
Scrap.angel = {};
Scrap.maven = {};
// N

//////////////////////////// NICOLSON /////////////////////////
// EDGE START //
function getMyTime(startTime){
	var elapsed = new Date().getTime() - startTime;
	return elapsed / 10 + (elapsed % 10 ? '' : '.0' )
}

function edgeConversation(){
	// http://edge.org/conversations?page=0&tid=mind&type=0
	var startTime = new Date().getTime();
	var method = {"method1" : {"name":"edgeConversation","status":"Started Edge Conversation", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
	console.log("Started Edge Conversation");
	var url = "http://edge.org/conversations?page=";
	var urlEnd = "&tid=mind&type=0";
	var result = null,resultSecond=null;;
	var row = null;
	var empty = null;
	var origin = "http://edge.org";
	var $ = null,$$=null;
	var title = "";

	for(var i=0;;i++){
		Meteor.setTimeout(function(){
			method = {"method1" : {"name":"edgeConversation","status":"Edge Library "+i, "time" :getMyTime(startTime)}}
			Loader.update({"_id":"edge"},{$set : method})
		},50);
		console.log("Edge  Edge Library "+i);
		result = Meteor.http.get(url+i+urlEnd);
		$ = cheerio.load(result.content);
		row = $("tbody tr");
		

		var currentRow = null;
		var a = null;
		var td = null;
		var tags = null;
		for(j=0,jl=row.length;j<jl;j++){
			currentRow = row[j];
			td = $(currentRow).children("td")
			a = $(td[0]).children("div").children("a");
			title = a.text()
			referenceLink = a.attr("href");
			referenceLink = origin + referenceLink;
				resultSecond = Meteor.http.get(referenceLink);
				$$ = cheerio.load(resultSecond.content);
				var imageUrl = $$(".views-field-field-linked-image div img").attr("src");
				var body = $$(".views-field-body").html();
				var ps = $$(".views-field-body div p")
				// console.log(ps.length)
				var cps = null;
				var pArray = [],pImgArray=[];
				var pText = "",pImg = null;
				for(var m=0,ml=ps.length;m<ml;m++){
					cps = ps[m]
					if($$(cps).attr("class") != "rtecenter"){
						pImg = $$(cps).find("img");
						if(pImg.length !=0){
							pImgArray.push($$(pImg).attr("src"))
						}
						//console.log(pImg.length)
						pText = $$(cps).text();
						//console.log(pText);
						if(pText !== "~  ~  ~") //if(!pText.match("~  ~  ~"))
							pArray.push(pText)
						
					}
					else{
						
					}
				}
				// views-field-field-linked-image
			a = $(td[0]).children(".byline").children(".member-name").children("a");
			memberName = a.text();
			memberLink = a.attr("href");
			memberLink = origin + memberLink;
			a = $(td[0]).children(".clearfix").children(".topic").children("a");
			topicName = a.text();
			topicLink = a.attr("href");
			topicLink = origin + topicLink;
			var tags = $(td[0]).children(".tags").children("span");
			var tag ={};
			tag.link = [];
			tag.name = [];

			// not getting tags
			// console.log($(td[0]).children(".tags").length)
			for(k=1,kl=tags.length;k<kl;k++){
				var name = $(tags[k]).children("a").text();
				console.log(name);
				tag.name.push(name);
				var link = $(tags[k]).children("a").attr("href");
				tag.link.push(origin + link);
			}
			// console.log(tag);
			// Second TD
			var secondTD = td[1];
			var contributor = $(secondTD).children(".contributor-list").children(".contributor");
			var contributorArray = [],contributorId=null;
			for(l=0,ll=contributor.length;l<ll;l++){
				contributorName = $(contributor[l]).children("a").text();
				contributorLink = $(contributor[l]).children("a").attr("href");
				contributorLink = origin + contributorLink;
				var cursorUserEvolve = UserEvolve.findOne({"name":contributorName,"link":contributorLink,"source":"edge"});
				if(cursorUserEvolve){
					contributorId = cursorUserEvolve._id;
				}
				else{
					contributorId = UserEvolve.insert({"name":contributorName,"link":contributorLink,"source":"edge"})
				}
				contributorArray.push(contributorId);
			}
			var insert = {};
			insert.title
			insert.referenceLink = referenceLink;
			insert.memberName = memberName;
			insert.memberLink = memberLink;
			insert.topicName = topicName;
			insert.topicLink = topicLink;
			insert.contributorArray = contributorArray;
			insert.imageUrl = imageUrl;
			insert.body = body;
			insert.pImgArray = pImgArray;
			insert.pArray = pArray;
			insert.source = "edge";
			var cursorConversationEvolve = ConversationEvolve.findOne({"title":title,"memberName":memberName,"memberLink":memberLink});       
			if(cursorConversationEvolve){
				ConversationEvolve.update({"_id":cursorConversationEvolve._id},{$set : insert})
			}
			else{
				ConversationEvolve.insert(insert);
			}
			// console.log($(contributor).length);

		}

		if(row.length < 50){
			method = {"method1" : {"name":"edgeConversation","status":"Finished Edge Conversation", "time" :getMyTime(startTime)}}
			Loader.update({"_id":"edge"},{$set : method})
			console.log("Finished Edge Conversation");
			break;
		}
	}
	console.log("Finished Edge Conversation");
			method = {"method1" : {"name":"edgeConversation","status":"Finished Edge Conversation", "time" :getMyTime(startTime)}};
			Loader.update({"_id":"edge"},{$set : method});
}
function conversationRefrenceLink(){

}
Scrap.edge.edgeConversation = edgeConversation;
function edgeMember() {
	var startTime = new Date().getTime();
	var method = null;
	method = {"method2" : {"name":"edgeMember","status":"Started Edge Member", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
	var userArray = [];
	var currentUser = null;
	var result = null,$=null;
	UserEvolve.find({"source":"edge"}).forEach(function(data){
		userArray.push(data);
	});
	var title = null,p = null,paraArray=[];
	for(var i=0,il=userArray.length;i<il;i++){
		currentUser = userArray[i];
		console.log(currentUser.link)

		if(!currentUser.link)
			continue;
		method = {"method2" : {"name":"edgeMember","status":"Started Edge Member link "+currentUser.link, "time" :getMyTime(startTime)}};
		Loader.update({"_id":"edge"},{$set : method});

		result = Meteor.http.get(currentUser.link);
		$ = cheerio.load(result.content);
		title = $(".title").text();
		paraArray=[]
		p = $(".field-name-field-user-biography div div p")
		for(var j=1,jl=p.length;j<jl;j++){
			paraArray.push($(p[j]).text())
		}
		console.log(paraArray);
		UserEvolve.update({"_id":currentUser._id},{$set : {"title":title,"paraArray":paraArray}})
		//currentUser
	}
	method = {"method2" : {"name":"edgeMember","status":"Ended Edge Member", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
}
Scrap.edge.edgeMember = edgeMember;
function edgeLibrary(){
	var startTime = new Date().getTime();
	method = {"method3" : {"name":"edgeLibrary","status":"Started Edge Library", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
	console.log("Started Edge Library");
	var url = "http://edge.org/library?page=";
	var result = null,resultSecond=null;;
	var row = null;
	var empty = null;
	var origin = "http://edge.org";
	var $ = null,$$=null;
	for(var i=0;;i++){
		console.log("Edge  Edge Library "+i);
		method = {"method3" : {"name":"edgeLibrary","status":"Edge Library "+url+i, "time" :getMyTime(startTime)}};
		Loader.update({"_id":"edge"},{$set : method});
		result = Meteor.http.get(url+i);
		$ = cheerio.load(result.content);
		row = $("tbody tr");
		if(row.length == 0){
			console.log("Finished Edge Video");
			break;
		}
		var td = null;
		var referenceLink = null,imageLink="";
		for(var j=0,jl=row.length;j<jl;j++){
			td = $(row[j]).children("td");
			for(var k=0,kl=td.length;k<kl;k++){
				var a = $(td[k]).children(".views-field-product-image").children("span").children("a");
				referenceLink = a.attr("href");
				imageLink = a.children("img").attr("src");
				title = $(td[k]).children(".views-field-title").children("span").text();
				author = $(td[k]).children(".views-field-field-edge-author").children("span").children("span").children("a").text();
				console.log(title);
				console.log(referenceLink);
				var insert = {};
				insert.title = title;
				insert.author = author;
				insert.imageLink = imageLink;
				insert.referenceLink = referenceLink;
				var cursorLibraryEvolve = LibraryEvolve.findOne({"title":title,"author":author,"referenceLink":referenceLink});
				if(cursorLibraryEvolve){
					LibraryEvolve.update({"_id":cursorLibraryEvolve._id},{$set : insert});
				}
				else{
					LibraryEvolve.insert(insert);
				}
				edgeLibrarySecond(referenceLink);
				// Second Page scrapping
				
				
			}
		}
	}
	method = {"method3" : {"name":"edgeLibrary","status":"Finished  Edge Library", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
	console.log("Finished  Edge Library");
}
Scrap.edge.edgeLibrary = edgeLibrary;   
function edgeLibrarySecond(referenceLink){
	// not working and not much necessary
	return;
	referenceLink = "http://www.amazon.com/Air-Raid-Seagull-Books-German/dp/0857420798%3FSubscriptionId%3DAKIAIUDIBB5W2YOHL3CQ%26tag%3Dedgeorg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D0857420798";
	console.log(referenceLink)
	// nothing working at this moment
	var resultSecond = null;
	var $ = null;
	var iframe = null;
	resultSecond = Meteor.http.get(referenceLink);
	$  = cheerio.load(resultSecond.content);
	iframe = $("meta[name='description']").attr("content");
	iframe = $("noscript")
	console.log($(iframe[1]).html());    
	var cursorLibraryEvolve = LibraryEvolve.findOne({"title":title,"author":author,"referenceLink":referenceLink});
			if(cursorLibraryEvolve){
				LibraryEvolve.update({"_id":cursorLibraryEvolve._id},{$set : insert});
			}
	for(l=0,ll=iframe.length;l<ll;l++){
		console.log(l);
		
	}
}
Scrap.edge.edgeLibrarySecond = edgeLibrarySecond;
function edgeVideos(){
	var startTime = new Date().getTime();
	console.log("Started Edge Video");
	var method = null;
	method = {"method4" : {"name":"edgeVideos","status":"Started Edge Video", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
	var url = "http://edge.org/videos?page=";
	var result = null;
	var row = null;
	var empty = null;
	var origin = "http://edge.org";
	for(var i=0;;i++){
		console.log("Edge Video Page "+i);
		method = {"method4" : {"name":"edgeVideos","status":"Edge Video Page "+i, "time" :getMyTime(startTime)}};
		Loader.update({"_id":"edge"},{$set : method});
		result = Meteor.http.get(url+i);
		$ = cheerio.load(result.content);
		empty = $(".view-empty").children("p").text();
		if(empty.match("No results found")){
			console.log("Finished Edge Video");
			break;
		}

		row = $(".view-content .views-row");
		var currentRow = null;
		var title =null;
									// 10 because there are only 10 in a single page
		for(var j=0,jl=row.length;j<10;j++){
			currentRow = row[j];
			var videoLink = "",title = "",titleMainLink="",conversation="",conversationWith="",
				memberLink="",category="";
			var insert = {};
			title = $(currentRow).children(".views-field-title").text();
			titleMainLink = $(currentRow).children(".views-field-title").children("span").children("a").attr("href");
			titleMainLink = origin + titleMainLink;
			conversation = $(currentRow).children(".views-field-title-1").text();
			conversationWith = $(currentRow).children(".views-field-field-edge-author").text();
			memberLink = $(currentRow).children(".views-field-field-edge-author").children(".field-content").children("span").children("a").attr("href");
			memberLink =  origin+memberLink;
			category = $(currentRow).children(".views-field-field-category").children(".field-content").text();
			videoLink = $(currentRow).children(".views-field-field-video-embed").children(".field-content").children("div").children("iframe").attr("src");
			videoLink = "http:" +videoLink;
			para = $(currentRow).children(".views-field-body").children("span");
			var paraArray = [],paraText = "";
			for(var k=0,kl=para.length;k<kl;k++){
				paraText = $(para[k]).text();
				paraArray.push(paraText);
			}
			// conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");
			// conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");
			// conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");
			// conversation = $(currentRow).children(".views-field-field-video-embed").children("iframe").attr("src");

			// creating JSON 
			insert.videoLink =videoLink
			insert.title = title
			insert.titleMainLink = titleMainLink
			insert.conversation = conversation
			insert.conversationWith = conversationWith
			insert.memberLink = memberLink
			insert.category = category
			insert.paraArray = paraArray
			insert.source = "edge.org"
			// console.log(insert);
			var cursorVideoEvolve = VideoEvolve.findOne({"title":title,"titleMainLink":titleMainLink,"conversationWith":conversationWith});
			if(cursorVideoEvolve){
				VideoEvolve.update({"_id":cursorVideoEvolve._id},{$set : insert})
				console.log("updated");
			}
			else{
				VideoEvolve.insert(insert);
				console.log("insert");
			}
			console.log(titleMainLink)
			// console.log(videoLink)
		}
		
	}
	method = {"method4" : {"name":"edgeVideos","status":"Finished Edge Video", "time" :getMyTime(startTime)}};
	Loader.update({"_id":"edge"},{$set : method});
	console.log("Finished Edge Video");
}
Scrap.edge.edgeVideos = edgeVideos;
// EDGE END //

// CRUNCHBASE START //

// ANGEL START //
	
	// https://angel.co/people
	// https://angel.co/people?page=2

	function angelPeople(){
	  var startTime = new Date().getTime();
		var method = null;
		method = {"method1" : {"name":"angelPeople","status":"Started angelPeople", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
	
	  // Loader.update({"_id":"angel"},{$set : {"angelPeople":"Started angelPeople","angelPeopleTime" :getMyTime(startTime)}});
	  console.log("angelPeople");
	  
	  var $ = null,result = null;
	  var source,topic,author,moredetails;
	  for(var p=1;;p++){
		  var url = "https://angel.co/people?page="+p;
			method = {"method1" : {"name":"angelPeople","status":url, "time" :getMyTime(startTime)}};
			Loader.update({"_id":"angel"},{$set : method});
		  result = Meteor.http.get(url);
		  $ = cheerio.load(result.content);
		  var expert = $("#investor_selector");
		  //console.log(expert.length);
		  if(expert.length==0)
			  break;
		  for(var i=0,il=expert.length;i<il;i++){
			currentDiv = expert[i];
			console.log()
			profilePic = $(currentDiv).find('.item-investor .pic a img').attr('src');
			name = $(currentDiv).find('.item-investor .right .name a').text();
			profileLink = $(currentDiv).find('.item-investor .pic a').attr('href');
			resume = $(currentDiv).find('.item-investor .right .resume').text();
			var currentcursor= AngelPeople.findOne({"profileLink":profileLink});
			if(currentcursor){
			  AngelPeople.update({"_id":currentcursor._id},{$set : {"profilePic": profilePic,"name":name,"profileLink":profileLink,"resume":resume}});
			}else{
			  var Follow = {"profilePic": profilePic,"name":name,"profileLink":profileLink,"resume":resume,"linkin":"","fblink":"","twiterlink":"","bloglink":""};
			  console.log(Follow)
			  AngelPeople.insert(Follow);
			}
		  }
		  // console.log(expert.length);
	  }
		method = {"method1" : {"name":"angelPeople","status":"Finished  angelPeople", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
	  // Loader.update({"_id":"angel"},{$set : {"angelPeople":"Finished  angelPeople","angelPeopleTime" :getMyTime(startTime)}});
	  console.log("Finished  angelPeople");
	  angelPeopleGetMore();
	}
Scrap.angel.angelPeople = angelPeople;
	function angelPeopleGetMore(){
	  console.log("angelPeopleGetMore");
	  var startTime = new Date().getTime();
		var method = null;
		method = {"method2" : {"name":"angelPeopleGetMore","status":"Started angelPeopleGetMore", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
		// Loader.update({"_id":"angel"},{$set : {"angelPeopleGetMore":"Started angelPeopleGetMore","angelPeopleGetMoreTime" :getMyTime(startTime)}});
	  
	  var insert = {};
	  var $ = null,moreResult = null;
	  var activeurl = [];
	  AngelPeople.find({}).forEach(function(data){
			activeurl.push(data.profileLink);
	  });
	  for(var i=0,il=activeurl.length-1;i<il;i++){
			var url = activeurl[i];
			if(url && (!url.match("undefined"))){
			  console.log(url);
				method = {"method2" : {"name":"angelPeopleGetMore","status":url, "time" :getMyTime(startTime)}};
				Loader.update({"_id":"angel"},{$set : method});
		
			  moreResult = Meteor.http.get(url);
			  $ = cheerio.load(moreResult.content);
			  linkin = $('.linked_in-link').attr('href');
			  fblink = $('.facebook-link').attr('href');
			  twiterlink = $('.twitter-link').attr('href');
			  bloglink = $('.blog-link').attr('href');
			  // console.log(linkin);
			  // console.log(fblink);
			  // console.log(twiterlink);
			  // console.log(bloglink);
			  var currentcursor= AngelPeople.findOne({"profileLink":url});
			  if(currentcursor){
				console.log("update");
				AngelPeople.update({"_id":currentcursor._id},{$set : {"linkin": linkin,"fblink":fblink,"twiterlink":twiterlink,"bloglink":bloglink}});
			  }
			}
		}
		method = {"method2" : {"name":"angelPeopleGetMore","status":"Finished  angelPeopleGetMore", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
		
		// Loader.update({"_id":"angel"},{$set : {"angelPeopleGetMore":"Finished  angelPeopleGetMore","angelPeopleGetMoreTime" :getMyTime(startTime)}});
	  console.log("Finished  angelPeopleGetMore");
	}   

	// https://angel.co/company_filters/search_data
	function angelPublic(){
		var url = "https://angel.co/company_filters/search_data";
		var startTime = new Date().getTime();
		var method = null;
		method = {"method3" : {"name":"angelPublic","status":"Started angelPublic", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
		
		var result = null,resultSecond=null;
		var row = null;
		var empty = null;
		var origin = "http://edge.org";

		for(var i=0;;i++){
			console.log("Angel Public "+i);
			method = {"method3" : {"name":"angelPublic","status":"Angel Public "+i, "time" :getMyTime(startTime)}};
			Loader.update({"_id":"angel"},{$set : method});
		
			// Loader.update({"_id":"edge"},{$set : {"edgeVideos":"Edge Video Page "+i,"edgeVideoTime" :getMyTime(startTime)}});
			result = Meteor.http.get(url,{"params":{"sort":"signal","page":i}});
			console.log(result.data)
			if(result.statusCode == 200){
				// console.log(result.data);
				var ids = result.data.ids;
				if(!ids){
					break;
				}
				var total = result.data.total
				var page = result.data.page
				var sort = result.data.sort
				var news = result.data.new
				var hexdigest = result.data.hexdigest;
				var signal = result.data.signal;
				var secondURL = "https://angel.co/companies/startups?";
				for(var j=0,jl=ids.length;j<jl;j++){
					secondURL +="ids[]="+ids[j] +"&";
				}
				secondURL += "total=" +total +"&";
				secondURL += "signal=" +signal +"&";
				secondURL += "new=" +news +"&";
				secondURL += "hexdigest=" +hexdigest;
				console.log(secondURL);
				// "https://angel.co/companies/startups"
				return;
				resultSecond = Meteor.http.get(secondURL);

				
				var row = EJSON.parse(resultSecond.content);
				$ = cheerio.load(row.html);
				row = $(".startup");
				for(var j=0,jl=row.length;j<jl;j++){
					var currentRow = row[j];
					var angelLink = $(currentRow).children(".company").children(".g-lockup").children(".photo").children("a").attr("href");
					var companyImage = $(currentRow).children(".company").children(".g-lockup").children(".photo").children("a").children("img").attr("src");
					var companyName = $(currentRow).children(".company").children(".g-lockup").children(".text").children(".name").children("a").text();
					var companyPitch = $(currentRow).children(".company").children(".g-lockup").children(".text").children(".pitch").text();
					var companySignal = $(currentRow).children(".signal").children(".value").children("img").attr("alt");
					var companyJoined = $(currentRow).children(".joined").children(".value").text();
					var companyLocation = $(currentRow).children(".location").children(".value").children(".tag").children("a").text();
					var companyLocationLink = $(currentRow).children(".location").children(".value").children(".tag").children("a").attr("href");
					var companyMarket = $(currentRow).children(".market").children(".value").children(".tag").children("a").text();
					var companyMarketLink = $(currentRow).children(".market").children(".value").children(".tag").children("a").attr("href");
					var companyWebsite= $(currentRow).children(".website").children(".value").children(".website").children("a").attr("href");
					var companyRaised = $(currentRow).children(".raised").children(".value").text();
					var insert = {"angelLink":angelLink,"companyImage":companyImage,"companyName":companyName,"companyPitch":companyPitch,"companySignal":companySignal,"companyJoined":companyJoined,"companyLocation":companyLocation,"companyLocationLink":companyLocationLink,"companyMarket":companyMarket,"companyMarketLink":companyMarketLink,"companyWebsite":companyWebsite,"companyRaised":companyRaised}
					
					console.log(insert);
					var cursorAngelPublic = AngelPublic.findOne({"angelLink":angelLink,"companyName":companyName});
					if(cursorAngelPublic){
						AngelPublic.update({"_id":cursorAngelPublic._id},{$set:insert});
					}
					else{
						AngelPublic.insert(insert);
					}   
				}
				   
			}
			// https://angel.co/companies/startups?ids[]=37608&ids[]=38066&ids[]=38073&ids[]=32477&ids[]=33188&ids[]=33193&ids[]=26775&ids[]=31544&ids[]=32203&ids[]=32221&ids[]=32519&ids[]=32543&ids[]=32545&ids[]=32551&ids[]=32562&ids[]=32563&ids[]=32564&ids[]=32566&ids[]=32572&ids[]=32579&total=279958&page=2&sort=signal&new=false&hexdigest=d01fa83ec926a4207f46fc367de12b43d31fc6e9
		} 
		method = {"method3" : {"name":"angelPublic","status":"Angel Public Finished", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
		angelSecondPublic()  
	}

Scrap.angel.angelPublic = angelPublic; 
	function angelSecondPublic(){
		var method = null;
		var startTime = new Date().getTime();
		method = {"method4" : {"name":"angelSecondPublic","status":"Started angelSecondPublic", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
		
		var angelPublicArray = [];
		var currentAngel = null;
		AngelPublic.find({}).forEach(function(data){
			angelPublicArray.push(data);
		})
		for(var i=0,il=angelPublicArray.length;i<il;i++){

			currentAngel = angelPublicArray[i];
			method = {"method4" : {"name":"angelSecondPublic","status":currentAngel.angelLink, "time" :getMyTime(startTime)}};
			Loader.update({"_id":"angel"},{$set : method});
		
			// currentAngel.angelLink = "https://angel.co/facebook";
			result = Meteor.http.get(currentAngel.angelLink);
			$ = cheerio.load(result.content);
			var links = $(".links").children(".link");
			var linksArray = []
				if(links.length!=0)
			for(var j=0,jl=links.length/2;j<jl;j++){
				var link = $(links[j]).children("a").attr("href");
				linksArray.push(link);
			}
			var companyScreenShot = $(".big-mobile-container a img").attr("src");
			var companyDescription = $(".product_desc div div p").text();
			// console.log(companyDescription)
			var insert = {"linksArray":linksArray,"companyScreenShot":companyScreenShot,"companyDescription":companyDescription}
			AngelPublic.update({"_id":currentAngel._id},{$set:insert});
		}
		method = {"method4" : {"name":"angelSecondPublic","status":"Angel angelSecondPublic Finished", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"angel"},{$set : method});
		
	}
Scrap.angel.angelSecondPublic = angelSecondPublic; 
// ANGEL END //

// CRUNCHBASE START //

// CRUNCHBASE END //
// MAVEN.CO START //
	var mavenArray = [],mavenCount = 0,mavenInterval = null;
	function mavenPublic(){
		var method = null;
		var startTime = new Date().getTime();
		method = {"method1" : {"name":"mavenPublic","status":"Started mavenPublic", "time" :getMyTime(startTime)}};
		Loader.update({"_id":"maven"},{$set : method});
		
		// https://www.maven.co/profile/ZZf3Btkf
		var url = "https://www.maven.co/profile/";
		var result = null,resultSecond=null;
		var row = null;
		var empty = null;
		var origin = "http://edge.org";
		var s = "0"
		var brute = "";
		var endLoop = 74;
		var bruteCombination = [s,s,s,s,s,s]
		for(var i=0;i<endLoop;i++){
			bruteCombination[0] = String.fromCharCode(bruteCombination[0].charCodeAt(0) + 1)
			for(var j=0;j<endLoop;j++){
				bruteCombination[1] = String.fromCharCode(bruteCombination[1].charCodeAt(0) + 1)
				for(var k=0;k<endLoop;k++){
					bruteCombination[2] = String.fromCharCode(bruteCombination[2].charCodeAt(0) + 1)
					for(var l=0;l<endLoop;l++){
						bruteCombination[3] = String.fromCharCode(bruteCombination[3].charCodeAt(0) + 1)
						for(var m=0;m<endLoop;m++){
							bruteCombination[4] = String.fromCharCode(bruteCombination[4].charCodeAt(0) + 1)
							for(var n=0;n<endLoop;n++){
								bruteCombination[5] = String.fromCharCode(bruteCombination[5].charCodeAt(0) + 1)
								brute = bruteCombination[0] +bruteCombination[1]+bruteCombination[2]+bruteCombination[3]+bruteCombination[4]+bruteCombination[5];
								// console.log(brute)
								mavenArray.push(brute);
							}
						}
					}
				}
			}
			
			console.log(mavenArray.length)
			// result = Meteor.http.get(url,mavenPublicCallBack);

		}
		mavenInterval = Meteor.setInterval(
			function(){
				method = {"method1" : {"name":"mavenPublic","status":url+mavenArray[mavenCount], "time" :getMyTime(startTime)}};
				Loader.update({"_id":"maven"},{$set : method});
				Meteor.http.get(url+mavenArray[mavenCount++],mavenPublicCallBack);
				if(mavenArray.length > mavenCount){
					Meteor.clearInterval(mavenInterval);
				}
			},50)
	}
Scrap.maven.mavenPublic = mavenPublic; 
	function mavenPublicCallBack(err,result){

		console.log(result.statusCode)
		if(result.statusCode == 404){
			console.log("not there");
			return;
		}
		if(result.statusCode == 200){
			$ = cheerio.load(result.content);
			var pageNotFound = $(".content-header h1").text();
			console.log(pageNotFound)
			return ;
			var name = $(".profile-info div h2").text();
			var profiles = $(".profileRow");
			var content = []
			for(var j=0,jl=profiles.length;j<jl;j++){
				$(profiles[j]).children("div").remove();
				content.push($(profiles[j]).text());
			}
			var insert = {}
			if(content.length != 0){
				insert.name = name;
				insert.currentEmployer = content[0];
				insert.title = content[1];
				insert.location = content[2];
			}
			// console.log(insert)
			var cursorUserEvolve = UserEvolve.findOne({"name":name,"source":"maven"});
			if(cursorUserEvolve){
				UserEvolve.update({"_id":cursorUserEvolve._id},{$set : insert})
			}
			else{
				UserEvolve.insert(insert);                    
			}

			// maven-box-content

		}
	}
Scrap.maven.mavenPublicCallBack = mavenPublicCallBack;
// MAVEN.CO END //

//////////////////////////// NICOLSON /////////////////////////