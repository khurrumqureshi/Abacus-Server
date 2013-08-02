var config = require('../config/config');
var db = require('../lib/db-config');

exports.setup = function(app) {
    app.get('/api/user/:userId/details',getUser);
    app.put('/api/user/:userId/score/:score',updateUserScore);
    app.put('/api/user/:userId/level/:gameLevel/score/:score',updateUserGameLevelAndScore
    )
}

function getUser(req, res, next){
    db.pool.getConnection(function(err, connection) {
        if(err)
            return next(err);

        connection.query('SELECT * FROM bh_student WHERE id = ?', [req.params.userId], function(err, results) {
            connection.end();
            if(err)
                return next(err);

            res.send(results.length>0 ? results[0] : {level:1});

        });
    })
}

function updateUserScore(req, res, next){
    db.pool.getConnection(function(err, connection) {
        if(err)
            return next(err);

        connection.query('UPDATE bh_student SET point=point+? WHERE id = ?', [req.params.score,req.params.userId], function(err, results) {
            connection.end();
            if(err)
                return next(err);

            res.send(results);

        });
    })
}

function updateUserGameLevelAndScore(req, res, next){
    db.pool.getConnection(function(err, connection) {
        if(err)
            return next(err);

        connection.query('UPDATE bh_student SET game_level=?, score=score+? WHERE id = ?', [req.params.gameLevel,req.params.score,req.params.userId], function(err, results) {
            connection.end();
            if(err)
                return next(err);

            res.send(results);

        });
    })
}

