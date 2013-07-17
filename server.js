var express = require('express'),
    config = require('./config/config'),
    http = require('http');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}

/**
 * Process level exception catcher
 */

process.on('uncaughtException', function (err) {
    console.log("Node NOT Exiting...");
    console.log(err);
    console.log(err.stack)
});

var app = express();

/**
 * Express Configuration
 */
app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});
app.configure('production', function() {
    app.use(express.errorHandler());
});

configureControllers(app);

// Setup Express error handler middleware!
//app.use(function(err, req, res, next){
//    res.send(err.code,{error:err.toString()});
//});

/**
 * Start http server here
 */
var server = http.createServer(app);
server.listen(process.env.PORT ? process.env.PORT : config.get('main:port'));
console.log("Listening on " + config.get('main:port'));

function configureControllers(app) {
    [
        'user'
    ].map(function(controllerName) {
            var controller = require('./controllers/' + controllerName);
            return controller.setup(app);
        });
}