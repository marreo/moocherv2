const Activity = require('../models/Activity');
const User = require('../models/User');
const ControllerBase = require('./base')

exports.index = (req, res) => {
    res.render('activities', {
        title: 'Activity'
    });
};

exports.getActivity = (req, res) => {
    return Activity.find({ users: req.user.id })
        .then((doc) => {
            var activities = [];

            for (var act of doc) {
                User.findOne({ _id: act.turn }, function(err, usr) {
                    console.log('Found user: ' + usr);
                    act.turn = usr;
                    activities.push(act);
                    res.json(activities);
                });
            }
        });
};

exports.changeTurn = (req, res) => {
    console.log('Maybe..');
    Activity.findOne({ _id: req.body._id }, function(err, act) {
        var nextId = act.users.filter(function(id) {
            console.log('Yes..');
            return id != act.turn;
        });
        console.log('Next turn: ' + nextId);
        act.turn = nextId;
        act.lastUpdate = Date.now();
        return act.save()
            .then((doc) => {
                console.log('Done..');
                res.status(200).end();
            });
    });
};

exports.createActivity = (req, res) => {
    let activity = new Activity({});
    activity.users.push(req.user.id);
    activity.users.push('593bedbbc3408e0224001d37');
    activity.lastUpdate = Date.now();
    activity.desc = 'TODO Fix Description';
    activity.turn = req.user.id;
    activity.symbol = 1;
    return activity.save()
        .then((doc) => {
            var jDoc = JSON.stringify(doc);
            res.end(jDoc);
        });
};