
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
            taskPosted: {
                
                ref: 'Task',
                type: mongoose.Schema.Types.ObjectId

            },
        }

    ],

    tasksUndertaken: [

        {
            taskUndertaken: {

                ref: 'Task',
                type: mongoose.Schema.Types.ObjectId
            },
        }

    ],


}); // Schema

module.exports = mongoose.model( 'User', UserSchema );