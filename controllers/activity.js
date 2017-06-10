const Activity = require('../models/Activity');
const ControllerBase = require('./base')

exports.index = (req, res) => {
    res.render('activities', {
        title: 'Activity'
    });
};

exports.getActivity = (req, res) => {
    return Activity.findOne({ users: req.user.id })
        .then((doc) => {
            var jDoc = JSON.stringify(doc);
            res.render('activities', {
                title: 'Activity',
                activity: jDoc
            });
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