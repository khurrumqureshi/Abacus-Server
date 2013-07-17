var config = require('../config/config'),
    mysql = require('mysql');
    pool  = mysql.createPool(config.get("db:mysql:connectionUrl"));

module.exports.pool = pool;


