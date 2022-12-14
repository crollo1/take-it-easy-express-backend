
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
            gpsLocation: {
                type: 'Point', 
                coordinates: [151.2897453839399, -33.751579477531436]
                
            }
         
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
            gpsLocation: {
                type: 'Point', 
                coordinates: [151.24144067220877, -33.98176987124649]
                
            } 
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
            gpsLocation: {
                type: 'Point', 
                coordinates: [151.28642008151704, -33.79723715378059] 
            }
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
            gpsLocation: {
                type: 'Point', 
                coordinates: [151.17903668174225, -33.796725690340075]
                
            }, 
        },

        {
            name: 'Driver needed',
            startDate: new Date('2022-10-16T04:20:00Z'),
            endDate: new Date('2022-10-17T04:20:00Z'),
            completedDate: new Date('2022-10-17T04:20:00Z'),
            summaryDescription: 'Driver needed to transport me for work',
            fullDescription: 'I am in the area for business for the week, and need a driver to get me where I need to go',
            price: 1200,
            area: 'Perth',
            location: 'Fremantle',
            address: '85 Beach Ave',
            gpsLocation: {
                type: 'Point', 
                coordinates: [151.20821636258617, -33.88577937487742]
            }
        },

        {
            name: 'Accounting',
            startDate: new Date('2022-10-16T04:20:00Z'),
            endDate: new Date('2022-10-17T04:20:00Z'),
            completedDate: new Date('2022-10-17T04:20:00Z'),
            summaryDescription: 'Budget/Finance planning',
            fullDescription: 'I am aiming to save up for my first property, and need to adjust some expenses and priorities to achieve my goal',
            price: 250,
            area: 'Gold Coast',
            location: 'Main Beach',
            address: '1 Tedder Ave',
            gpsLocation: {
                type: 'Point', 
                coordinates: [151.25747616918167, -33.913759459412844]
                
            } 
        },


    ]); // createdTasks

    console.log('Task:', createdTasks);

    // USER SEEDS
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

        {
            name: 'Ali',
            email: 'ali@ga.co',
            passwordDigest: bcrypt.hashSync('chicken', 10), // use bcrypt
           
            tasksPosted: [ createdTasks[4] ],
            tasksUndertaken: [ createdTasks[5] ],
            
        }, // User 3

    ]); // createdUser

    console.log('User:', createdUsers);


    const updateTasks0 = await Task.updateOne(

        { _id: createdTasks[0]._id}, // <-- "63451a914c7af7183285d318" this is an _id of a task

        // below we are trying to 'set' the 'postedBy' field with the user who has created the task
        // We can't give hardcoded strings, as every time we see this it will have a new _id
        {
            $set: { postedBy: createdUsers[0]._id }
        },

    );

    const updateTasks1 = await Task.updateOne(

        { _id: createdTasks[1]._id}, 

        {
            $set: { postedBy: createdUsers[0]._id }
        },

    );

    const updateTasks2 = await Task.updateOne(

        { _id: createdTasks[2]._id}, 
         
        {
            $set: { postedBy: createdUsers[1]._id }
        },

    );

    const updateTasks3 = await Task.updateOne(

        { _id: createdTasks[3]._id}, 
         
        {
            $set: { postedBy: createdUsers[1]._id }
        },

    );

    const updateTasks4 = await Task.updateOne(

        { _id: createdTasks[4]._id}, 
         
        {
            $set: { postedBy: createdUsers[2]._id }
        },

    );

    const updateTasks5 = await Task.updateOne(

        { _id: createdTasks[5]._id}, 
         
        {
            $set: { postedBy: createdUsers[2]._id }
        },

    );



    process.exit( 0 );

}); // db.once
