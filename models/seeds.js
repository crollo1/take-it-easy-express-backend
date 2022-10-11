
// const mongo = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./User');
const Task = require('./Task');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CLOUD_URL);
const db = mongoose.connection;


db.on('error', err => {
    console.log('DB Connection error', err);
    process.exit( 1 ); // quit the program
});


db.once('open', async () => {

    console.log('Success! DB connected');

    // TASK SEEDS =================
    await Task.deleteMany(); // Task.destroy_all

    const createdTasks = await Task.create([

        {
            name: 'Dog walking',
            startDate: new Date('2022-11-23T04:20:00Z'),
            endDate: new Date('2022-11-25T04:20:00Z'),
            completedDate: new Date('2022-11-24T04:20:00Z'),
            summaryDescription: 'In need of someone to walk my cute dog Scout',
            fullDescription: 'I am busy with work, so am unable to walk my puppy this weekend and he needs to get out. Scout is the cutest, but very mischievous, so will need someone to keep him in check when he gets cheeky',
            price: 40,
            area: 'Sydney',
            location: 'Dee Why',
            address: '123 Brisbane St',
        },

        {
            name: 'Bartender needed',
            startDate: new Date('2022-12-24T04:20:00Z'),
            endDate: new Date('2022-12-24T04:20:00Z'),
            completedDate: new Date('2022-12-24T04:20:00Z'),
            summaryDescription: 'Martinis need mixin',
            fullDescription: 'Having an big birthday bash, and am in need of a skilled bartender with cocktail experience to whip up some awesome creations',
            price: 300,
            area: 'Melbourne',
            location: 'Balwin',
            address: '45 Posh St',
        },

        {
            name: 'Catering',
            startDate: new Date('2022-10-15T04:20:00Z'),
            endDate: new Date('2022-10-16T04:20:00Z'),
            completedDate: new Date('2022-10-15T04:20:00Z'),
            summaryDescription: 'In need of a great caterer for my expensive friends',
            fullDescription: 'Throwing an end of Uni celebration and my friends have expensive tastes - think caviar and lobster. If you have some mad catering skills with food that slaps hard, please let me know',
            price: 500,
            area: 'Sunshine Coast',
            location: 'Noosa',
            address: '98 Sunrise Ave',
        },

        {
            name: 'Pool Cleaning',
            startDate: new Date('2022-10-16T04:20:00Z'),
            endDate: new Date('2022-10-17T04:20:00Z'),
            completedDate: new Date('2022-10-17T04:20:00Z'),
            summaryDescription: 'Pool cleaning required',
            fullDescription: 'My pool is turning green and I have no idea how to fix it - PLEASE HELP! 6 pack of beer also provided for your help',
            price: 80,
            area: 'Brisbane',
            location: 'New Farm',
            address: '123 Sydney Rd',
        },


    ]); // createdTasks

    console.log('Task:', createdTasks);

    // // USER SEEDS
    await User.deleteMany(); // User.destroy_all

    const createdUsers = await User.create([

        {
            name: 'Luke',
            email: 'luke@ga.co',
            passwordDigest: bcrypt.hashSync('chicken', 10), // "number of rounds to use when generating a salt", "cost factor"
           
            tasksPosted: [ createdTasks[0], createdTasks[1] ],
            tasksUndertaken: [ createdTasks[2], createdTasks[3]],

        }, // User 1

        {
            name: 'Kris',
            email: 'kris@ga.co',
            passwordDigest: bcrypt.hashSync('chicken', 10), // use bcrypt
           
            tasksPosted: [ createdTasks[2], createdTasks[3] ],
            tasksUndertaken: [ createdTasks[0], createdTasks[1] ],
            
        }, // User 2

    ]); // createdUser

    console.log('User:', createdUsers);
    process.exit( 0 );

}); // db.once
