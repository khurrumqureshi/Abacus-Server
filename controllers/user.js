var config = require('../config/config');
var db = require('../lib/db-config');

exports.setup = function(app) {
    app.get('/api/user/:userId/details',getUser);
}

function getUser(req, res, next){
    db.pool.getConnection(function(err, connection) {
        if(err)
            return next(err);

        connection.query('SELECT * FROM bh_student WHERE id = ?', [req.params.userId], function(err, results) {
            connection.end();
            if(err)
                return next(err);

            res.send(results);

        });
    })
}

function updateUserScore(req, res, next){
    db.pool.getConnection(function(err, connection) {
        if(err)
            return next(err);

        connection.query('UPDATE bh_student SET score=score+? WHERE id = ?', [req.params.score,req.params.userId], function(err, results) {
            connection.end();
            if(err)
                return next(err);

            res.send(results);

        });
    })
}

