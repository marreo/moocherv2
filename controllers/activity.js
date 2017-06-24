const Activity = require('../models/Activity');
const User = require('../models/User');

exports.index = (req, res) => {
    res.render('activities', {
        title: 'Activity'
    });
};

exports.getActivity = (req, res) => {
    return Activity.find({ users: req.user.id })
        .populate("users")
        .populate("turn")
        .then((activities) => {
            res.json({activities: activities, currUser: req.user.id});
        });
};

exports.changeTurn = (req, res) => {

    Activity.findOne({ _id: req.body._id }, function (err, act) {

        if(act.turn._id != req.user.id) {
            res.status(500).send({ error: 'You can\'t change turn when it\'s not your turn!' })
        }

        var nextId = act.users.filter(function (id) {
            return id != act.turn;
        });
        act.turn = nextId;
        act.lastUpdate = Date.now();
        return act.save()
            .then((doc) => {
                res.status(200).end();
            });
    });
};

exports.createActivity = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            let activity = new Activity({});
            activity.users.push(req.user.id);
            activity.users.push(user.id);
            activity.lastUpdate = Date.now();
            activity.desc = req.body.desc;
            activity.turn = req.user.id;
            activity.symbol = req.body.symbolPath || 1;
            return activity.save()
                .then((doc) => {
                    var jDoc = JSON.stringify(doc);
                    res.end(jDoc);
                });
        });
};