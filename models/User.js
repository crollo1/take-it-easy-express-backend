
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
            type: Text,
            when: Date,
            maxPrice: String,
            ref: 'User',
        }

    ],

    tasksUndertaken: [

        {
            type: Text,
            completed: Date,
            price: String,
            ref: 'User',
        }
    ],


}); // Schema

module.exports = mongoose.model( 'User', UserSchema );