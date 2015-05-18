/**
 * 
 * @class Account
 * @param {object}
 *            [domain] - set the URL to the datavenue platform you want to use.
 *            If not set, the accountAPI will use defaut URL
 *            (https://api.orange.com/datavenue/v1). [xOAPIKey] - set your
 *            Orange Partner Key.
 */
var Account = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Account(options) {
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
     * Get Account informations by Account ID
     * @method
     * @name Account#get
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * 
     */
    Account.prototype.getAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);
        
        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update account information
     * @method
     * @name Account#put
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id to update
     * @param {AccountPut} body - new account body
     * 
     */
    Account.prototype.updateAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        if (parameters.body !== undefined) {
            body = parameters.body;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get Primary Master Key informations by Account ID
     * @method
     * @name Account#getPrimaryMasterKey
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * 
     */
    Account.prototype.getPrimaryMasterKeyInformations = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/pmkey';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Regenerate Primary Master Key by Account ID
     * @method
     * @name Account#regenerate
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * 
     */
    Account.prototype.regeneratePrimaryMasterKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/pmkey/regenerate';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    /**
     * List keys by account id
     * @method
     * @name Account#getAll
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * @param {string} pagenumber - 
     * @param {string} pagesize - 
     * 
     */
    Account.prototype.listMasterKeys = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/keys';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        if (parameters.pagenumber !== undefined) {
            queryParameters.pagenumber = parameters.pagenumber;
        }

        if (parameters.pagesize !== undefined) {
            queryParameters.pagesize = parameters.pagesize;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Create Master Key
     * @method
     * @name Account#create
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * @param {MasterKeys} body - masterkey body
     * 
     */
    Account.prototype.createMasterKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/keys';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        if (parameters.body !== undefined) {
            body = parameters.body;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Regenerate master Key by account_id
     * @method
     * @name Account#regenerate
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * @param {string} key_id - masterkey to regenerate
     * 
     */
    Account.prototype.regenerateMasterKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/keys/{key_id}/regenerate';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        path = path.replace('{key_id}', parameters.key_id);

        if (parameters.key_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: key_id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Delete Master Key
     * @method
     * @name Account#supress
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * @param {string} key_id - masterkey id to delete
     * 
     */
    Account.prototype.deleteMasterKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/keys/{key_id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        path = path.replace('{key_id}', parameters.key_id);

        if (parameters.key_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: key_id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get account by account ID
     * @method
     * @name Account#getBy
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * @param {string} key_id - masterkey id
     * 
     */
    Account.prototype.getMasterKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/keys/{key_id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        path = path.replace('{key_id}', parameters.key_id);

        if (parameters.key_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: key_id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update master key
     * @method
     * @name Account#put
     * @param {string} xISSKey - primary master key
     * @param {string} account_id - account id
     * @param {string} key_id - masterkey id to update
     * @param {MasterKeys} body - new master key body
     * 
     */
    Account.prototype.updateMasterKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/accounts/{account_id}/keys/{key_id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.xISSKey !== undefined) {
            headers['X-ISS-Key'] = parameters.xISSKey;
        }
		
		headers['X-OAPI-Key'] = this.xOAPIKey;
		
        path = path.replace('{account_id}', parameters.account_id);

        if (parameters.account_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: account_id'));
            return deferred.promise;
        }

        path = path.replace('{key_id}', parameters.key_id);

        if (parameters.key_id === undefined) {
            deferred.reject(new Error('Missing required path parameter: key_id'));
            return deferred.promise;
        }

        if (parameters.body !== undefined) {
            body = parameters.body;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    return Account;
})();

exports.Account = Account;