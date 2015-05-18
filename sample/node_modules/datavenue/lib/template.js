/**
 * 
 * @class Template
 * @param {object}
 *            [domain] - set the URL to the datavenue platform you want to use.
 *            If not set, the templateAPI will use defaut URL
 *            (https://api.orange.com/datavenue/v1). [xOAPIKey] - set your
 *            Orange Partner Key.
 */
var Template = (function() {
	'use strict';

	var request = require('request');
	var Q = require('q');

	function Template(options) {

		// Default value
		this.domain = 'https://api.orange.com/datavenue/v1';

		if (typeof options === 'object') {
			if (options.domain) {
				if (options.domain.length === 0) {
					throw new Error('Domain must be specified.');
				} else {
					this.domain = options.domain;
				}
			}
			if (options.xOAPIKey && options.xOAPIKey.length !== 0) {
				this.xOAPIKey = options.xOAPIKey;

			} else {
				throw new Error(
						'Orange Partner key parameter must be specified');
			}

		} else {
			throw new Error('Options must be specified as a object.');
		}

	}

	/**
	 * List all Template on your master key.
	 * 
	 * @method
	 * @name Template#getAll
	 * @param {string}
	 *            xISSKey - master key for get templates
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Template.prototype.listTemplate = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/templates/';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}

		headers['X-OAPI-Key'] = this.xOAPIKey;

		if (parameters.pagenumber !== undefined) {
			queryParameters.pagenumber = parameters.pagenumber;
		}

		if (parameters.pagesize !== undefined) {
			queryParameters.pagesize = parameters.pagesize;
		}

		if (parameters.$queryParameters) {
			Object
					.keys(parameters.$queryParameters)
					.forEach(
							function(parameterName) {
								var parameter = parameters.$queryParameters[parameterName];
								queryParameters[parameterName] = parameter;
							});
		}

		var req = {
			method : 'GET',
			uri : domain + path,
			qs : queryParameters,
			headers : headers,
			body : body
		};

		if (Object.keys(form).length > 0) {
			req.form = form;
		}
		if (typeof (body) === 'object') {
			req.json = true;
		}
		request(req, function(error, response, body) {
			if (error) {
				deferred.reject(error);
			} else {
				if (/^application\/(.*\\+)?json/
						.test(response.headers['content-type'])) {
					try {
						body = JSON.parse(body);
					} catch (e) {

					}
				}
				if (response.statusCode >= 200 && response.statusCode <= 299) {
					deferred.resolve({
						response : response,
						body : body
					});
				} else {
					deferred.reject({
						response : response,
						body : body
					});
				}
			}
		});

		return deferred.promise;
	};
	/**
	 * Get template informations by id
	 * 
	 * @method
	 * @name Template#get
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - the template id
	 * 
	 */
	Template.prototype.getTemplate = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/templates/{id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}

		headers['X-OAPI-Key'] = this.xOAPIKey;

		path = path.replace('{id}', parameters.id);

		if (parameters.id === undefined) {
			deferred.reject(new Error('Missing required path parameter: id'));
			return deferred.promise;
		}

		if (parameters.$queryParameters) {
			Object
					.keys(parameters.$queryParameters)
					.forEach(
							function(parameterName) {
								var parameter = parameters.$queryParameters[parameterName];
								queryParameters[parameterName] = parameter;
							});
		}

		var req = {
			method : 'GET',
			uri : domain + path,
			qs : queryParameters,
			headers : headers,
			body : body
		};
		if (Object.keys(form).length > 0) {
			req.form = form;
		}
		if (typeof (body) === 'object') {
			req.json = true;
		}
		request(req, function(error, response, body) {
			if (error) {
				deferred.reject(error);
			} else {
				if (/^application\/(.*\\+)?json/
						.test(response.headers['content-type'])) {
					try {
						body = JSON.parse(body);
					} catch (e) {

					}
				}
				if (response.statusCode >= 200 && response.statusCode <= 299) {
					deferred.resolve({
						response : response,
						body : body
					});
				} else {
					deferred.reject({
						response : response,
						body : body
					});
				}
			}
		});

		return deferred.promise;
	};
	/**
	 * Update a template by id
	 * 
	 * @method
	 * @name Template#put
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - template id
	 * @param {templates}
	 *            body - new template body
	 * 
	 */
	Template.prototype.updateTemplate = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/templates/{id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}

		headers['X-OAPI-Key'] = this.xOAPIKey;

		path = path.replace('{id}', parameters.id);

		if (parameters.id === undefined) {
			deferred.reject(new Error('Missing required path parameter: id'));
			return deferred.promise;
		}

		if (parameters.body !== undefined) {
			body = parameters.body;
		}

		if (parameters.$queryParameters) {
			Object
					.keys(parameters.$queryParameters)
					.forEach(
							function(parameterName) {
								var parameter = parameters.$queryParameters[parameterName];
								queryParameters[parameterName] = parameter;
							});
		}

		var req = {
			method : 'PUT',
			uri : domain + path,
			qs : queryParameters,
			headers : headers,
			body : body
		};
		if (Object.keys(form).length > 0) {
			req.form = form;
		}
		if (typeof (body) === 'object') {
			req.json = true;
		}
		request(req, function(error, response, body) {
			if (error) {
				deferred.reject(error);
			} else {
				if (/^application\/(.*\\+)?json/
						.test(response.headers['content-type'])) {
					try {
						body = JSON.parse(body);
					} catch (e) {

					}
				}
				if (response.statusCode >= 200 && response.statusCode <= 299) {
					deferred.resolve({
						response : response,
						body : body
					});
				} else {
					deferred.reject({
						response : response,
						body : body
					});
				}
			}
		});

		return deferred.promise;
	};
	/**
	 * Delete template by id
	 * 
	 * @method
	 * @name Template#suppress
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - template id to delete
	 * 
	 */
	Template.prototype.deleteTemplate = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/templates/{id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}

		headers['X-OAPI-Key'] = this.xOAPIKey;

		path = path.replace('{id}', parameters.id);

		if (parameters.id === undefined) {
			deferred.reject(new Error('Missing required path parameter: id'));
			return deferred.promise;
		}

		if (parameters.$queryParameters) {
			Object
					.keys(parameters.$queryParameters)
					.forEach(
							function(parameterName) {
								var parameter = parameters.$queryParameters[parameterName];
								queryParameters[parameterName] = parameter;
							});
		}

		var req = {
			method : 'DELETE',
			uri : domain + path,
			qs : queryParameters,
			headers : headers,
			body : body
		};
		if (Object.keys(form).length > 0) {
			req.form = form;
		}
		if (typeof (body) === 'object') {
			req.json = true;
		}

		request(req, function(error, response, body) {
			if (error) {
				deferred.reject(error);
			} else {
				if (/^application\/(.*\\+)?json/
						.test(response.headers['content-type'])) {
					try {
						body = JSON.parse(body);
					} catch (e) {

					}
				}
				if (response.statusCode >= 200 && response.statusCode <= 299) {
					deferred.resolve({
						response : response,
						body : body
					});
				} else {
					deferred.reject({
						response : response,
						body : body
					});
				}
			}
		});

		return deferred.promise;
	};
	/**
	 * Create Template
	 * 
	 * @method
	 * @name Template#create
	 * @param {string}
	 *            xISSKey - master key
	 * @param {templates}
	 *            body - the template body
	 * 
	 */
	Template.prototype.createTemplate = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/templates/';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}

		headers['X-OAPI-Key'] = this.xOAPIKey;

		if (parameters.body !== undefined) {
			body = parameters.body;
		}

		if (parameters.$queryParameters) {
			Object
					.keys(parameters.$queryParameters)
					.forEach(
							function(parameterName) {
								var parameter = parameters.$queryParameters[parameterName];
								queryParameters[parameterName] = parameter;
							});
		}

		var req = {
			method : 'POST',
			uri : domain + path,
			qs : queryParameters,
			headers : headers,
			body : body
		};
		if (Object.keys(form).length > 0) {
			req.form = form;
		}
		if (typeof (body) === 'object') {
			req.json = true;
		}
		request(req, function(error, response, body) {

			if (error) {

				deferred.reject(error);
			} else {
				if (/^application\/(.*\\+)?json/
						.test(response.headers['content-type'])) {
					try {
						body = JSON.parse(body);
					} catch (e) {

					}
				}
				if (response.statusCode >= 200 && response.statusCode <= 299) {
					deferred.resolve({
						response : response,
						body : body
					});
				} else {
					deferred.reject({
						response : response,
						body : body
					});
				}
			}
		});

		return deferred.promise;
	};

	return Template;
})();

exports.Template = Template;