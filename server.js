var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    baseUrl: __dirname,
    nodeRequire: require
});

requirejs(['bizz','jquery'],function(server, $) {
	$(function(){
		var port = process.env.PORT || 5000;
	  	server.listen(port);
  	});
});