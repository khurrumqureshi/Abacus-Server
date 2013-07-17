var express = require('express'),
    config = require('./config/config'),
    http = require('http');


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
server.listen(config.get('main:port'));
console.log("Listening on " + config.get('main:port'));

function configureControllers(app) {
    [
        'user'
    ].map(function(controllerName) {
            var controller = require('./controllers/' + controllerName);
            return controller.setup(app);
        });
}