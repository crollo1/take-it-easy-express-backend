
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    name: String,
    startDate: Date,
    endDate: Date,
    createdAt: {
        type: Date,
        default: Date.now // auto default field to current date
    },
    completedDate: Date,
    summaryDescription: String,
    fullDescription: String,
    price: Number,
    location: String,
    area: String,
    address: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    allocatedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: String,
    gpsLocation: {
        type: { type: String },
        coordinates: [Number]
    }

}); // TasksSchema
TaskSchema.index({ "gpsLocation": "2dsphere" });
module.exports = mongoose.model( 'Task', TaskSchema );
