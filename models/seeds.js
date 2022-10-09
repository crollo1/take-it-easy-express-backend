
// const mongo = require('mongodb');
const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task')

mongoose.connect('mongodb://127.0.0.1/');
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
            fullDescription: 'Throwing an end of Uni celebration and my friends have expensive tastes - think caviar and lobster. If you have some mad catering skills with food that slap hard, please let me know',
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
    // await User.deleteMany(); // User.destroy_all

    // const createdUsers = await User.create([

    //     {
    //         name: 'Luke',
    //         email: 'luke@ga.co',
    //         // passwordDigest: String, // use bcrypt...?
           
    //         tasksPosted: [

    //             {
    //                 taskPosted: {
    //                     task: 'In need of someone to walk my cute dog Scout',
    //                     when: new Date('2022-11-23T04:20:00Z'),
    //                     maxPrice: '$50',
    //                 },
                
    //                 taskPosted: {
    //                     task: 'Martinis need mixin',
    //                     when: new Date('2022-11-19T04:20:00Z'),
    //                     maxPrice: '$200',
    //                 }
    //             }


    //         ],

    //         tasksUndertaken: [

    //             {
    //                 taskUndertaken: {
    //                     task: 'Excellent guitarist',
    //                     completed: new Date('2021-11-23T04:20:00Z'),
    //                     price: '$80-100', 
    //                 },
                    
    //                 taskUndertaken: {
    //                     task: 'Can teach coding',
    //                     completed: new Date('2020-11-23T04:20:00Z'),
    //                     price: '$50000', 
    //                 },
    //             }

    //         ],

    //     }, // User 1

    //     {
    //         name: 'Kris',
    //         email: 'kris@ga.co',
    //         // passwordDigest: String, // use bcrypt...?
           
    //         tasksPosted: [

    //             {
    //                 taskPosted: {
    //                     task: 'In need of a great caterer for my expensive friends',
    //                     when: new Date('2022-11-24T04:20:00Z'),
    //                     maxPrice: '$500',
    //                 },
                
    //                 taskPosted: {
    //                     task: 'Pool cleaning required post party',
    //                     when: new Date('2022-11-15T04:20:00Z'),
    //                     maxPrice: '$100',
    //                 },
    //             }

    //         ],

    //         tasksUndertaken: [

    //             {
    //                 taskUndertaken: {
    //                     task: 'Shoe horn lessons',
    //                     completed: new Date('2021-11-23T04:20:00Z'),
    //                     price: '$20',
    //                 }, 
                    
    //                 taskUndertaken: {
    //                     task: 'Web App for your business',
    //                     completed: new Date('2019-11-23T04:20:00Z'),
    //                     price: '$25000',
    //                 }, 
    //             }

    //         ],

    //     }, // User 2

    // ]); // createdUser

    // console.log('User:', createdUsers);
    process.exit( 0 );

}); // db.once
