define(['express','request','text!templates/index.html','underscore', 'jquery', 'path', 'module'], 
	function (express, request, html, _, $, path, module) {
	var app = express();

	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.static(path.dirname(module.uri) + '/templates'));
	});

	app.get('/', function(req, res){
		//request('http://ec2-54-234-131-75.compute-1.amazonaws.com:3000/profile/goofyahead@gmail.com',
		//	function (error, response, body) {

				// if (!error && response.statusCode == 200) {
					// var result = JSON.parse(body);
					res.send(_.template(html, {}));
				// }
		//	});
	});

	app.get('/email/:email', function(req, res){
		var email = req.params.email;
		if (email == 'martin@ark.com') email = 'martin@entropeer.com';
		if (email == 'priley@ark.com') email = 'priley@gmail.com';
		if (email == 'alex@ark.com') email = 'goofyahead@gmail.com';
		request('http://ec2-54-234-131-75.compute-1.amazonaws.com:3000/profile/' + email,
			function (error, response, body) {
				 if (!error && response.statusCode == 200) {
					var result = JSON.parse(body);
					res.send(result);
				 }
		});
	});

	app.get('/check/:photo', function(req, res){
		var url = decodeURI(req.params.photo);
		request(url,
			function (error, response, body) {
				 if (!error && response.statusCode == 200) { 
				 	res.send(true);
				 } else {
				 	res.send(false);
				 }
		});
	});

	return app;
});