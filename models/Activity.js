const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    users: [{
        type: Number,
        required: "Please fill a User ID",
        ref: "User"
    }],
    turn: {
        type: Number,
        ref: "User"
    },
    desc: {
        type: String
    },
    lastUpdate: {
        type: Date
    },
    status: {
        type: Number,
        default: 1
    },
    metadata: {}
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;