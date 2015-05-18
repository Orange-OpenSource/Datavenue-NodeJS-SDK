/**
 * 
 * @class Datasource
 * @param {object}
 *            [domain] - set the URL to the datavenue platform you want to use.
 *            If not set, the datasourceAPI will use defaut URL
 *            (https://api.orange.com/datavenue/v1). [xOAPIKey] - set your
 *            Orange Partner Key.
 */
var Datasource = (function() {
	'use strict';

	var request = require('request');
	var Q = require('q');

	function Datasource(options) {
		
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
	 * Get all DataSource
	 * 
	 * @method
	 * @name Datasource#getAll
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Datasource.prototype.listDatasource = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/';

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
	 * Get Datasource informations
	 * 
	 * @method
	 * @name Datasource#get
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            datasources_id - datasource id
	 * 
	 */
	Datasource.prototype.getDatasource = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{datasources_id}';

		var body;
		var queryParameters = {};
		var headers = {};
		var form = {};

		if (parameters.xISSKey !== undefined) {
			headers['X-ISS-Key'] = parameters.xISSKey;
		}
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
		path = path.replace('{datasources_id}', parameters.datasources_id);

		if (parameters.datasources_id === undefined) {
			deferred.reject(new Error(
					'Missing required path parameter: datasources_id'));
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
	 * Update the datasources
	 * 
	 * @method
	 * @name Datasource#put
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {datasources}
	 *            body - datasource body
	 * 
	 */
	Datasource.prototype.updateDatasource = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}';

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
	 * Delete datasources
	 * 
	 * @method
	 * @name Datasource#supress
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * 
	 */
	Datasource.prototype.deleteDatasource = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}';

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
	 * Create DataSource
	 * 
	 * @method
	 * @name Datasource#create
	 * @param {string}
	 *            xISSKey - master key
	 * @param {datasources}
	 *            body - datasource body
	 * 
	 */
	Datasource.prototype.createDatasource = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources';

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
	 * Regenerate Apikey
	 * 
	 * @method
	 * @name Datasource#regenerateApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {string}
	 *            key_id - apikey id
	 * 
	 */
	Datasource.prototype.regenerateApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}/keys/{key_id}/regenerate';

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
	 * @name Datasource#createApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {ApiKeys}
	 *            body - apikey body
	 * 
	 */
	Datasource.prototype.createApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}/keys';

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
	 * @name Datasource#getApiKeys
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Datasource.prototype.listApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}/keys';

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
	 * @name Datasource#getListApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {string}
	 *            key_id - apikey id
	 * 
	 */
	Datasource.prototype.getApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}/keys/{key_id}';

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
	 * update apikey
	 * 
	 * @method
	 * @name Datasource#putApiKeys
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {string}
	 *            key_id - apikey id
	 * @param {ApiKeys}
	 *            body - new apikey body
	 * 
	 */
	Datasource.prototype.updateApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}/keys/{key_id}';

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
	 * @name Datasource#supressApiKey
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            id - datasource id
	 * @param {string}
	 *            key_id - apikey id
	 * 
	 */
	Datasource.prototype.deleteApiKey = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{id}/keys/{key_id}';

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
	 * Get all stream of Datasource
	 * 
	 * @method
	 * @name Datasource#getAllStreams
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Datasource.prototype.listStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/';

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
	 * Get stream informtions by id
	 * 
	 * @method
	 * @name Datasource#getStreams
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * 
	 */
	Datasource.prototype.getStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}';

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
	 * Delete streams by id
	 * 
	 * @method
	 * @name Datasource#supressStream
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * 
	 */
	Datasource.prototype.deleteStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}';

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
	 * @name Datasource#postStream
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {streams}
	 *            body - stream body
	 * 
	 */
	Datasource.prototype.createStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/';

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
	 * Update Stream
	 * 
	 * @method
	 * @name Datasource#putStream
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {streams}
	 *            body - new stream body
	 * 
	 */
	Datasource.prototype.updateStream = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}';

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
	 * Get values of a given stream
	 * 
	 * @method
	 * @name Datasource#getValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {string}
	 *            pagenumber -
	 * @param {string}
	 *            pagesize -
	 * 
	 */
	Datasource.prototype.getValues = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}/values';

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
	 * Create Stream values
	 * 
	 * @method
	 * @name Datasource#postValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {List}
	 *            body - values body
	 * 
	 */
	Datasource.prototype.createValues = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}/values';

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
	 * @name Datasource#deleteValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * 
	 */
	Datasource.prototype.deleteValues = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}/values';

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
	 * @name Datasource#deleteSingleValues
	 * @param {string}
	 *            xISSKey - master key
	 * @param {string}
	 *            parent_id - datasource id
	 * @param {string}
	 *            stream_id - stream id
	 * @param {string}
	 *            value_id - value id
	 * 
	 */
	Datasource.prototype.deleteSingleValue = function(parameters) {
		if (parameters === undefined) {
			parameters = {};
		}
		var deferred = Q.defer();

		var domain = this.domain;
		var path = '/datasources/{parent_id}/streams/{stream_id}/values/{value_id}';

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

	return Datasource;
})();

exports.Datasource = Datasource;