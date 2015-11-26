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
var Q = require('q');

var Template;
var Datasource;
var Prototype;
var Account;

var log="";
function clearLog() {
	log="";
}
function logEvent(event) {
	log+=String(event)+"<br>";
	console.log(event);
}
function getLog()
{
	return log;
}
function returnLogs(res){
					console.log("Ret");
				res.write("<html><body>");
				res.write(getLog());
				res.write("<br><br><a href='/'>Retry</a></body></html>");
				res.end();

}
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
	return Template.createTemplate(parameters).then( function(data) {
		bodyTemplate = {
			name : "Sample NodeJS 2",
			description : "Template de test 2 pour SDK nodejs"
		};
		parameters = {
			xISSKey : xISSKey,
			id : data.body.id,
			body : bodyTemplate
		};
		logEvent('Template created.');
		//Update template
	      return Template.updateTemplate(parameters).then(function(data) {
			logEvent('Template updated.');
		}).then(function(data){
			//Get template
			return Template.getTemplate(parameters).then(function(data){
				logEvent('Template getted.');
				//Delete template
				return Template.deleteTemplate(parameters).then(function(data){
					logEvent('Template deleted.');

				});
			});
		});
	},function(reason){
		if(reason instanceof Error){
			logEvent('Error when create datasource : ' + JSON.stringify(reason.message));
		} else if (typeof (reason) === 'object'){
			logEvent('Error when create datasource : ' + ' HTTP error : ' + reason.response.statusCode + ' Body Error : ' + JSON.stringify(reason.body));
		} else {
			logEvent('Error when create datasource.');
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
	return Datasource.createDatasource(parameters).then( function(data) {
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
		logEvent('Datasource created.');
		console.log(parameters);
		//Update datasource
		return Datasource.updateDatasource(parameters).then(function(data) {
			logEvent('Datasource updated.');
			parameters = {
				xISSKey : xISSKey,
				datasources_id : datasourceID,
				body : bodyDatasource
			};
			//Get datasource
			return Datasource.getDatasource(parameters).then(function(data){
				logEvent('Datasource getted.');
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
				return Datasource.createApiKey(parameters).then(function(data) {
					logEvent('Datasource API key created.');
					//Delete datasource.
					return Datasource.deleteDatasource(parameters).then(function(data) {
						logEvent('Datasource delete.');
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
	return Prototype.createPrototype(parameters).then( function(data) {
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
		logEvent('Prototype created.');
		//Update prototype
		return Prototype.updatePrototype(parameters).then(function(data) {
			logEvent('Prototype updated.');
			//Get prototype
			return Prototype.getPrototype(parameters).then(function(data){
				logEvent('Prototype getted.');
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
					return Prototype.createApiKey(parameters).then(function(data) {
						logEvent('Prototype API key created.');
						//Delete prototype.
						return Prototype.deletePrototype(parameters).then(function(data) {
							logEvent('Prototype delete.');
						});
					});
			});
		});
	});
}

http.createServer(

	function(req, res) {
		clearLog();
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
				var output="OK";

				//POST data parsing
				var post = querystring.parse(postData);

				//Get POST data datavenue url
				URL = post.url;

				//Get POST data masterKey
				xISSKey = post.masterKey;

				//Get POST data Orange Partner Key
				xOAPIKey = post.opeKey;

				var object= {xOAPIKey:post.opeKey};
				try{
					Template = new datavenue.Template.Template(object);
					Datasource = new datavenue.Datasource.Datasource(object);
					Prototype = new datavenue.Prototype.Prototype(object);
					Account = new datavenue.Account.Account(object);
					logEvent("================= Start call API =================");

					var promises=Q.all([callTemplateAPIs(),
						              callDatasourceAPIs(),
						              callPrototypeAPIs()])
					.then(function(){
						returnLogs(res);
					}).fail(function(error){
						logEvent("ERROR:"+JSON.stringify(error.body));
					  	returnLogs(res);
					  });

 				}catch(err){
					logEvent(err);
					returnLogs(res);
				}


			});
		}
	}
).listen(8080, "127.0.0.1");
console.log("Starting web server at 127.0.0.1:8080");


