# Datavenue NodeJS SDK

This open-source library allows you to integrate Datavenue into your NodeJS app.
Learn more about Datavenue at https://datavenue.orange.com

## Sample usage

First, you need a Datavenue Account : https://datavenue.orange.com

Clone the projet on github, go to Sample directory and run node:

    git clone https://github.com/Orange-Datavenue/Datavenue-Java-SDK.git
    cd Datavenue-NodeJS-SDK/Sample
    node server.js

Open a browser and go to http://localhost:8080/

    Put your Account ID 
    Put your Orange Partner Key
    Put your Primary Master Key
    Press "Submit" button

The Node server will use the SDK for call some API on Datavenue platform.

## Installation

The Datavenue NodeJS SDK is available through NPM (https://www.npmjs.com).
To install it, install NPM and run:

    npm install datavenue

The Datavenue NodeJS SDK has externals dependencies to :

    q - A library for promise (https://www.npmjs.com/package/q)
    request - A http client request (https://www.npmjs.com/package/request) 

And externals devdependencies to :

    mocha - Test framework (https://www.npmjs.com/package/mocha)
    global-tunnel - Global HTTP & HTTPS tunneling (https://www.npmjs.com/package/global-tunnel)

## Documentation

The latest documentation is available at https://www.npmjs.com/package/datavenue


## License

Datavenue NodeJS SDK is available under the Apache v2.0 license. See the LICENSE file for more info.
