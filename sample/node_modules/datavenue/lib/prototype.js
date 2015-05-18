/**
 * 
 * @class Prototype
 * @param {object}
 *            [domain] - set the URL to the datavenue platform you want to use.
 *            If not set, the prototypeAPI will use defaut URL
 *            (https://api.orange.com/datavenue/v1). [xOAPIKey] - set your
 *            Orange Partner Key.
 */
var Prototype = (function() {
	'use strict';

	var request = require('request');
	var Q = require('q');

	function Prototype(options) {
		
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
	 * Get all prototypes
	 * 
	 * @method
	 * @name Prototype#getAll
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Prototype.prototype.listPrototype = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/';

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
	 * Delete prototypes by id
	 * 
	 * @method
	 * @name Prototype#supress
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id to delete
	 * 
	 */
	Prototype.prototype.deletePrototype = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}';

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
	 * Get Prototypes informations by id
	 * 
	 * @method
	 * @name Prototype#get
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * 
	 */
	Prototype.prototype.getPrototype = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}';

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
	 * Update prototype
	 * 
	 * @method
	 * @name Prototype#put
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {prototypes}
	 *            body - new prototype body
	 * 
	 */
	Prototype.prototype.updatePrototype = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}';

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
	 * Create Prototypes
	 * 
	 * @method
	 * @name Prototype#create
	 * @param {string}
	 *            xISSKey - master key
	 * @param {prototypes}
	 *            body - prototype body
	 * 
	 */
	Prototype.prototype.createPrototype = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes';

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
	/**
	 * Regenerate ApiKey
	 * 
	 * @method
	 * @name Prototype#regenerateApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {string}
	 *            key_id - ApiKey id
	 * 
	 */
	Prototype.prototype.regenerateApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}/keys/{key_id}/regenerate';

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

		path = path.replace('{key_id}', parameters.key_id);

		if (parameters.key_id === undefined) {
			deferred
					.reject(new Error('Missing required path parameter: key_id'));
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
	 * Create Api keys
	 * 
	 * @method
	 * @name Prototype#createApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {ApiKeys}
	 *            body - apikey body
	 * 
	 */
	Prototype.prototype.createApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}/keys';

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
	/**
	 * Get all apikey
	 * 
	 * @method
	 * @name Prototype#getApiKeys
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Prototype.prototype.listApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}/keys';

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
	 * Get ApiKey by ID
	 * 
	 * @method
	 * @name Prototype#getListApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {string}
	 *            key_id - apikey id
	 * 
	 */
	Prototype.prototype.getApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}/keys/{key_id}';

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

		path = path.replace('{key_id}', parameters.key_id);

		if (parameters.key_id === undefined) {
			deferred
					.reject(new Error('Missing required path parameter: key_id'));
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
	 * Update apikey
	 * 
	 * @method
	 * @name Prototype#putApiKeys
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {string}
	 *            key_id - apikey id
	 * @param {ApiKeys}
	 *            body - new apikey body
	 * 
	 */
	Prototype.prototype.updateApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}/keys/{key_id}';

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

		path = path.replace('{key_id}', parameters.key_id);

		if (parameters.key_id === undefined) {
			deferred
					.reject(new Error('Missing required path parameter: key_id'));
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
	 * Delete ApiKey
	 * 
	 * @method
	 * @name Prototype#supressApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - prototype id
	 * @param {string}
	 *            key_id - apikey id to delete
	 * 
	 */
	Prototype.prototype.deleteApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{id}/keys/{key_id}';

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

		path = path.replace('{key_id}', parameters.key_id);

		if (parameters.key_id === undefined) {
			deferred
					.reject(new Error('Missing required path parameter: key_id'));
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
	 * Get all stream 
	 * 
	 * @method
	 * @name Prototype#getAllStreams
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Prototype.prototype.listStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

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
	 * Get stream informations
	 * 
	 * @method
	 * @name Prototype#getStreams
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id
	 * 
	 */
	Prototype.prototype.getStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
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
	 * Delete stream
	 * 
	 * @method
	 * @name Prototype#supressStream
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id to delete
	 * 
	 */
	Prototype.prototype.deleteStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
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
	 * Create Stream
	 * 
	 * @method
	 * @name Prototype#postStream
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {streams}
	 *            body - stream body
	 * 
	 */
	Prototype.prototype.createStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
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
	/**
	 *Update stream
	 * 
	 * @method
	 * @name Prototype#putStream
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {streams}
	 *            body - new stream body
	 * 
	 */
	Prototype.prototype.updateStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
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
	 * Get all values from a stream
	 * 
	 * @method
	 * @name Prototype#getValues
	 * @param {string}
	 *            xISSKey - master keys
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Prototype.prototype.getValues = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}/values';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
			return deferred.promise;
		}

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
	 * Create values
	 * 
	 * @method
	 * @name Prototype#postValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {List}
	 *            body - list of values
	 * 
	 */
	Prototype.prototype.createValues = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}/values';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
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
	/**
	 * Delete all the values of the given Stream
	 * 
	 * @method
	 * @name Prototype#deleteValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id
	 * 
	 */
	Prototype.prototype.deleteValues = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}/values';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
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
	 * Delete the given value of the given Stream
	 * 
	 * @method
	 * @name Prototype#deleteSingleValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - prototype id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {string}
	 *            value_id - value id
	 * 
	 */
	Prototype.prototype.deleteSingleValue = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/prototypes/{parent_id}/streams/{stream_id}/values/{value_id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{parent_id}', parameters.parent_id);

		if (parameters.parent_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: parent_id'));
			return deferred.promise;
		}

		path = path.replace('{stream_id}', parameters.stream_id);

		if (parameters.stream_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: stream_id'));
			return deferred.promise;
		}

		path = path.replace('{value_id}', parameters.value_id);

		if (parameters.value_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: value_id'));
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

	return Prototype;
})();

exports.Prototype = Prototype;