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
    "cheerio" : "0.15.0"
});


Package.on_use(function (api) {

    api.add_files([
        'server.js'
        ], 'server');
    if(api.export){
        api.export("jquery","server");
        api.export("scrap","server");
        api.export("cheerio","server");
        // api.export("schedule","server");
    }
    // api.export && api.export('CordovaPush', 'server');
});


