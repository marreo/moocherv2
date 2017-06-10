const Activity = require('../models/Activity');

exports.getActivity = (req, res) => {
    let activity = new Activity({});
    return activity.save()
        .then((doc) => {
            return this.toJSON(doc);
        });
    // .then((json) => {
    //     return this.populateModels(json);
    // })
    // .then((json) => {
    //     this.notifyModelChanges(ctx, "created", json);
    //     return json;
    // });
};