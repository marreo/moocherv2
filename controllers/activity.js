const Activity = require('../models/Activity');
const User = require('../models/User');
const ControllerBase = require('./base')

exports.index = (req, res) => {
    res.render('activities', {
        title: 'Activity'
    });
};

// async function populateModel(doc) {
//     console.log('populating??' + doc);
//     var activities = [];
//     for (var act of doc) {
//         console.log('bajsjdj' + act);
//         User.findOne({ _id: act.turn }, function(err, usr) {
//             console.log('found user?');
//             act.turn = usr;
//             activities.push(act);
//         });
//     }
//     console.log('populateModel:' + activities);
//     return activities;
// };

exports.getActivity = (req, res) => {
    return Activity.find({ users: req.user.id })
        .then((doc) => {
            // console.log('Found activity?');
            // var activities = await populateModel(doc);
            // console.log('asdsa' + activities);
            res.json(doc);
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
    console.log('Hello: ' + req.body.email + ' | ' + req.body.desc);
    User.findOne({ email: req.body.email })
        .then((user) => {
            let activity = new Activity({});
            activity.users.push(req.user.id);
            activity.users.push(user.id);
            activity.lastUpdate = Date.now();
            activity.desc = req.body.desc;
            activity.turn = req.user.id;
            activity.symbol = 1;
            return activity.save()
                .then((doc) => {
                    var jDoc = JSON.stringify(doc);
                    res.end(jDoc);
                });
        });
};