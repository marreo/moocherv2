const Activity = require('../models/Activity');
const ControllerBase = require('./base')

exports.index = (req, res) => {
    res.render('activities', {
        title: 'Activity',
        bajskorv: 'brun'
    });
};

exports.getActivity = (req, res) => {
    return Activity.find({ users: req.user.id })
        .then((doc) => {
            var activities = [];

            for (var act of doc) {
                activities.push(act);
            }

            res.json(activities);
        });
};

exports.createActivity = (req, res) => {
    let activity = new Activity({});
    activity.users.push(req.user.id);
    return activity.save()
        .then((doc) => {
            var jDoc = JSON.stringify(doc);
            res.end(jDoc);
        });
};