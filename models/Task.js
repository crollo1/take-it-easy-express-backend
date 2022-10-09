
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

}); // TasksSchema

module.exports = mongoose.model( 'Task', TaskSchema );
