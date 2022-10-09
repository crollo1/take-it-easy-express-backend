
// const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/');
const db = mongoose.connection;


const User = require('./User');


db.on('error', err => {
    console.log('DB Connection error', err);
    process.exit( 1 ); // quit the program
});


db.once('open', async () => {

    console.log('Success. DB connected');

    // USER SEEDS
    await User.deleteMany(); // User.destroy_all

    const createdUsers = await User.create([

        {
            name: 'Luke',
            email: 'luke@ga.co',
            // passwordDigest: String, // use bcrypt...?
           
            tasksPosted: [

                {
                    type: 'In need of someone to walk my cute dog Scout',
                    when: 14-10-2022,
                    maxPrice: '$50',
                },
                {
                    type: 'Martinis need mixin',
                    when: 15-10-2022,
                    maxPrice: '$200',
                }

            ],

            tasksUndertaken: [

                {
                    type: 'Excellent pool cleaner',
                    completed: 16-10-2021,
                    price: '$80-100', 
                },
                {
                    type: 'Can teach coding',
                    completed: 01-02-2022,
                    price: '$50000', 
                }

            ],

        }, // User 1

        {
            name: 'Kris',
            email: 'kris@ga.co',
            // passwordDigest: String, // use bcrypt...?
           
            tasksPosted: [

                {
                    type: 'In need of a great caterer for my expensive friends',
                    when: 14-10-2022,
                    maxPrice: '$500',
                },
                {
                    type: 'Pool cleaning required post party',
                    when: 15-10-2022,
                    maxPrice: '$100',
                }

            ],

            tasksUndertaken: [

                {
                    type: 'Shoe horn lessons',
                    completed: 16-10-2021,
                    price: '$20', 
                },
                {
                    type: 'Web App for your business',
                    completed: 01-02-2022,
                    price: '$25000', 
                }

            ],

        }, // User 2

    ]); // createdUsers

    console.log('Users:', createdUsers[0].reservations);
    process.exit( 0 );

}); // db.once
