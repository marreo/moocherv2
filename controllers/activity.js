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
        .then((doc) => {
            res.json(doc);
        });
};

exports.changeTurn = (req, res) => {
    Activity.findOne({ _id: req.body._id }, function(err, act) {
        var nextId = act.users.filter(function(id) {
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