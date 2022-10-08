
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: String,
    email: String,
    passwordDigest: String,
    createdAt: {

        type: Date,
        default: Date.now // auto default field to current date

    },

    tasksPosted: [

        {
            task: Text,
            when: Date,
            maxPrice: String,
            ref: 'Task',
            type: mongoose.Schema.Types.ObjectId
        }

    ],

    tasksUndertaken: [

        {
            task: Text,
            completed: Date,
            price: String,
            ref: 'Task',
            type: mongoose.Schema.Types.ObjectId
        }

    ],


}); // Schema

module.exports = mongoose.model( 'User', UserSchema );