var Users = require('../db/mongo/users_db');

module.exports = function (app) {

    app.get('/api/users', function (req, res) {
        Users.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

    app.post('/api/users', function (req, res) {
        Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            studentId: req.body.studentId
        }, function(err, todo) {
            if (err)
                res.send(err);
        });
    });

    app.delete('/api/users/:user_id', function (req, res) {
        Users.remove({
            _id : req.params.user_id
        }, function(err, todo) {
            if (err)
                res.send(err);
        });
    });
    
    app.get('/', function (req, res) {
        res.sendfile('./public/app/common/views/index.html');
    });
};