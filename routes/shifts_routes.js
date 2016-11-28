var shifts = require('../db/mongo/shifts_db');

module.exports = function (app) {

    app.get('/api/shifts', function (req, res) {
        Shifts.find(function (err, shifts) {
            if (err)
                res.send(err);

            res.json(shifts);
        });
    });

    app.post('/api/shifts', function (req, res) {
        Shifts.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            day: req.body.day
        }, function(err, todo) {
            if (err)
                res.send(err);
        });
    });

    
    
    app.get('/', function (req, res) {
        res.sendfile('./public/app/common/views/index.html');
    });
};