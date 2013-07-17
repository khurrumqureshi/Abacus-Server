var config = require('../config/config'),
    mysql = require('mysql');
    pool  = mysql.createPool(config.get("db:mysql:connectionInfo"));

module.exports.pool = pool;


