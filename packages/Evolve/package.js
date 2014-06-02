Package.describe({
  summary: ""
});

Package.describe({
  summary: "something here"
});


// Server-side push deps 
Npm.depends({
    "jquery" : "2.1.0",
    "scrap":"0.1.0",
    "cheerio" : "0.15.0",
    "alchemy-api" : "1.0.2",
    "node-schedule" : "0.1.13",
    // "jsdom" : "0.10.5"
});


Package.on_use(function (api) {

    api.add_files(['server.js'],'server');
    api.add_files('client.js', 'client');
    if(api.export){
        api.export("jquery","server");
        api.export("scrap","server");
        api.export("cheerio","server");
        api.export("AlchemyAPI","server");
        api.export("Schedule","server");
        // api.export("jsdom","server");
        api.export("App","client");
        api.export("schedule","server");
    }
    // api.export && api.export('CordovaPush', 'server');
});


