//Datavenue url
var URL;
				
//Your master key
var xISSKey;
				
//Orange Partner Key
var xOAPIKey;


var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require('url');
var querystring = require('querystring');

require('global-tunnel').initialize();

var datavenue = require('datavenue');

var Template;
var Datasource;
var Prototype;
var Account;


function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if (!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

function callTemplateAPIs(){
	var bodyTemplate = {
		name : "Sample NodeJS",
		description : "Template de test pour sample nodejs"
	};
	var parameters = {
		xISSKey : xISSKey,
		body : bodyTemplate
	};
	//Create template
	Template.createTemplate(parameters).then( function(data) {
		bodyTemplate = {
			name : "Sample NodeJS 2",
			description : "Template de test 2 pour SDK nodejs"
		};
		parameters = {
			xISSKey : xISSKey,
			id : data.body.id,
			body : bodyTemplate
		};
		console.log('Template created.');
		//Update template
		Template.updateTemplate(parameters).then(function(data) {
			console.log('Template updated.');
			//Get template
			Template.getTemplate(parameters).then(function(data){
				console.log('Template getted.');
				//Delete template
				Template.deleteTemplate(parameters).then(function(data){
					console.log('Template deleted.');
				});
			});
		});
	},function(reason){
		if(reason instanceof Error){
			console.log('Error when create datasource : ' + JSON.stringify(reason.message));
		} else if (typeof (reason) === 'object'){
			console.log('Error when create datasource : ' + ' HTTP error : ' + reason.response.statusCode + ' Body Error : ' + JSON.stringify(reason.body));
		} else {
			console.log('Error when create datasource.');
		}
	});
}
function callDatasourceAPIs(){
	var bodyDatasource = {
		name : "Sample NodeJS",
		description : "Datasource de test pour sample nodejs"
	};
	var parameters = {
		xISSKey : xISSKey,
		body : bodyDatasource
	};
	//Create datasource
	Datasource.createDatasource(parameters).then( function(data) {
		bodyDatasource = {
			name : "Sample NodeJS 2",
			description : "Datasource de test 2 pour SDK nodejs"
		};
		var datasourceID = data.body.id;
		parameters = {
			xISSKey : xISSKey,
			id : datasourceID,
			body : bodyDatasource
		};
		console.log('Datasource created.');
		//Update datasource
		Datasource.updateDatasource(parameters).then(function(data) {
			console.log('Datasource updated.');
			parameters = {
				xISSKey : xISSKey,
				datasources_id : datasourceID,
				body : bodyDatasource
			};
			//Get datasource
			Datasource.getDatasource(parameters).then(function(data){
				console.log('Datasource getted.');
				parameters = {
					xISSKey : xISSKey,
					id : datasourceID,
					body : bodyDatasource
				};
				//Create an API key.
				var bodyApiKey = {
						name : 'Sample APikey',
						rights : ["GET","POST","PUT", "DELETE"],
						description : 'Apikey de test pour sample nodejs'
				};
				parameters = {
						xISSKey : xISSKey,
						body : bodyApiKey,
						id : datasourceID
				};
				Datasource.createApiKey(parameters).then(function(data) {
					console.log('Datasource API key created.');
					//Delete datasource.
					Datasource.deleteDatasource(parameters).then(function(data) {
						console.log('Datasource delete.');
					});
				});
			});
		});
	});
}
	
function callPrototypeAPIs(){
	var bodyPrototype = {
		name : "Sample NodeJS",
		description : "Prototype de test pour sample nodejs"
	};
	var parameters = {
		xISSKey : xISSKey,
		body : bodyPrototype
	};
	//Create prototype
	Prototype.createPrototype(parameters).then( function(data) {
		var prototypeID = data.body.id;
		bodyPrototype = {
			name : "Sample NodeJS 2",
			description : "Prototype de test 2 pour SDK nodejs"
		};
		parameters = {
			xISSKey : xISSKey,
			id : prototypeID,
			body : bodyPrototype
		};
		console.log('Prototype created.');
		//Update prototype
		Prototype.updatePrototype(parameters).then(function(data) {
			console.log('Prototype updated.');
			//Get prototype
			Prototype.getPrototype(parameters).then(function(data){
				console.log('Prototype getted.');
				parameters = {
						xISSKey : xISSKey,
						id : prototypeID,
						body : bodyPrototype
					};
					//Create an API key.
					var bodyApiKey = {
							name : 'Sample APikey',
							rights : ["GET","POST","PUT", "DELETE"],
							description : 'Apikey de test pour sample nodejs'
					};
					parameters = {
							xISSKey : xISSKey,
							body : bodyApiKey,
							id : prototypeID
					};
					Prototype.createApiKey(parameters).then(function(data) {
						console.log('Prototype API key created.');
						//Delete prototype.
						Prototype.deletePrototype(parameters).then(function(data) {
							console.log('Prototype delete.');
						});
					});
			});
		});
	});
}

http.createServer(

	function(req, res) {
		if(req.method === 'GET'){
			var slash = false;
			if(req.url === "/"){
				req.url = "";
				slash = true;
			}
			var params = querystring.parse(url.parse(req.url).query);
			var pathName = url.parse(req.url).pathname || "index.html";
			var ext = path.extname(pathName);
			
			var localPath = __dirname;
			if(slash){
				localPath = localPath + "/";
			}
	
			var validExtensions = {
				".html" : "text/html",
				".js" : "application/javascript",
				".css" : "text/css",
				".txt" : "text/plain",
				".jpg" : "image/jpeg",
				".gif" : "image/gif",
				".png" : "image/png",
				".ico" : "image/x-icon"
			};
			var isValidExt = validExtensions[ext];
			if (isValidExt) {
				localPath += pathName;
				fs.exists(localPath, function(exists) {
					if (exists) {
						console.log("Serving file: " + localPath);
						getFile(localPath, res, ext);
					} else {
						console.log("File not found: " + localPath);
						res.writeHead(404);
						res.end();
					}
				});
	
			} else {
				console.log("Invalid file extension detected: " + ext);
			}
		} else if (req.method === 'POST') {

			var postData = '';
			
			//Get all POST data
			req.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
			});

			//At end of POST data
			req.on('end', function () {
				
				
				//POST data parsing
				var post = querystring.parse(postData);
				
				//Get POST data datavenue url
				URL = post.url;
				
				//Get POST data masterKey
				xISSKey = post.masterKey;
				
				//Get POST data Orange Partner Key
				xOAPIKey = post.opeKey;
				
				var object= {xOAPIKey:post.opeKey};
				Template = new datavenue.Template.Template(object);
				Datasource = new datavenue.Datasource.Datasource(object);
				Prototype = new datavenue.Prototype.Prototype(object);
				Account = new datavenue.Account.Account(object);
				console.log("================= Start call API =================");
				callTemplateAPIs();
				callDatasourceAPIs();
				callPrototypeAPIs();

			});
			
			//return user to index.html
			getFile("index.html", res, "text/html");
		}
	}
).listen(8080, "127.0.0.1");
console.log("Starting web server at 127.0.0.1:8080");


