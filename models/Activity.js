const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    users: [{
        type: String,
        required: "Please fill a User ID",
        ref: "User"
    }],
    turn: {
        type: String,
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
    symbol: {
        type: Number
    },
    metadata: {}
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;