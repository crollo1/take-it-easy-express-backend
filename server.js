
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const cors = require('cors'); // use package as part of "middleware stack"
app.use( cors() );


// middlewear handler for access to POSTed formdata
app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ... `);
});


// ************* Mongoose DB initialisation ************* //

const mongoose = require('mongoose');
const User = require('./models/User'); // User model
const Task = require('./models/Task'); // Tasks model
const Category = require('./models/Category'); // Categories model
// const Worker = require('./models/Worker'); // Workers model
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CLOUD_URL);

const db = mongoose.connection
db.on('error', err => {
    console.log('Error connecting to DB server', err);
    process.exit( 1 ); 
});



// * Authentication ==================================

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const jwtAuthenticate = require('express-jwt');

const checkAuth = () => {

    return jwtAuthenticate.expressjwt({ 

        secret: SERVER_SECRET_KEY, // check token hasn't been tampered with
        algorithms: ['HS256'],
        requestProperty: 'auth' // gives us 'req.auth'
    });

}; // checkAuth

const SERVER_SECRET_KEY = process.env.SERVER_SECRET_KEY;
// 
// bcrypt - encrypt plain text passwords, verify correct password
//
// jwt - create tokens to send to frontend, encoding user ID in tamper proof format
//
// express-jwt - 'Express' middleware, like plugin that Express can use to provide extra info to route handler callbacks ( attaching something to first 'req' argument, returning req.auth) - like 'knock' gem in Rails



// ********** T-I-E API routes ********** //

app.get('/', (req, res) => {

    console.log('home route requested');
    res.json( {hello: 'TEST to see if connected'} );

}); // '/'


app.get('/categories', async (req, res) => {

    try{

        const categories = await Category.find();
        res.json( categories );

    } catch( err ){

        console.error('Error loading categories:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/categories'


app.get('/tasks', async (req, res) => {

    try{

        const tasks = await Task.find();
        res.json( tasks );

    } catch( err ){

        console.error('Error loading tasks:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/tasks'


// app.post('/worker', async (req, res) => {

//     try{

//         const worker = await Worker.find();
//         res.json( worker );

//     } catch( err ){

//         console.error('Error loading worker:', err);
//         res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

//     }

// }); // '/worker'


// Login route
app.post('/login', async (req, res) => {

    console.log('login:', req.body);
    // res.json( req.body ); // just for debugging

    const { email, password} = req.body;

    try {

        const user = await User.findOne({ email }); // { email: email }

        if( user && bcrypt.compareSync( password, user.passwordDigest) ){
            // correct credentials
            // res.json({ success: true })

            const token = jwt.sign(
                // the data to encode in the 'payload':
                { _id: user._id },
                // the secret key to use to encrypt the token - only the server can modify - i.e. users can't change their user ID
                SERVER_SECRET_KEY,
                // expiry date:
                { expiresIn: '72h' } // 3 Days
            );

            res.json({ token }); // TODO: why not include the user object in this response to save you at least one call to the  /current_user API endpoint

        } else {
            // incorrect credentials: user not found or passwords don't match
            res.status( 401 ).json({ success: false }); // Unauthorized
        }

    } catch( err ){
        res.sendStatus( 500 ); // low-level (DB) error
        console.log('Error verifying login:', err);
    }

}); // POST login


// Signup route
app.post('/signup', async (req, res) => {

    console.log('signup:', req.body);
    // res.json( req.body ); // just for debugging

    const newUser = new User({

        name: req.body.name,
        email: req.body.email,
        passwordDigest: bcrypt.hashSync(req.body.password, 10),

    });
    // const { name, email, password} = req.body;

    try {

        // const user = await User.create({ name, email, password }); // { email: email }
        const savedUser = await newUser.save();
        console.log('saved users', savedUser);
        // if( savedUser && bcrypt.compareSync( password, user.passwordDigest) ){
        // correct credentials
        // res.json({ success: true })

        const token = jwt.sign(

            // the data to encode in the 'payload':
            { _id: savedUser._id },
            // the secret key to use to encrypt the token - only the server can modify - i.e. users can't change their user ID
            SERVER_SECRET_KEY,
            // expiry date:
            { expiresIn: '72h' } // 3 Days
        );

        res.json({ token, savedUser }); 

    } catch( err ){

            res.sendStatus( 500 ); // low-level (DB) error
            console.log('Error signing up:', err);
    }

}); // POST signup


// ** Routes below this line only work for authenticated users - move the required ones under here.

app.use( checkAuth() ); // provide req.auth (the User ID from token) to all following routes

// Custom middleware, defined inline:
// Use the req.auth ID from the middleware above and try to look up a user with it - 
// if found, attach to req.current_user for all the requests that follow this;
// if not found, return an error code

app.use( async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.auth._id })

        if( user === null ){
            res.sendStatus( 401 ); // invalid/stale token
            // by running a res method here, this middleware will not
            // allow any further routes to be handled below it
        } else {
            req.current_user = user; // add 'current_user' for the next route to access
            next(); // move on to the next route handler in this server
        }

    } catch( err ){
        console.log('Error querying User in auth', err);
        res.sendStatus( 500 );
    } 

});


// All routes below now have a 'req.current_user defined

app.get('/current_user', (req, res) => {
    // console.log(req.current_user);
    res.json({
        name: req.current_user.name,
        email: req.current_user.email,
        _id: req.current_user._id,
    });
});

app.get('/users', async (req, res) => {

    try{

        const users = await User.find();
        res.json( users );

    } catch( err ){

        console.error('Error loading user:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/user'

app.post('/task', async (req, res) => {

    try{

        const task = await Task.updateOne(
            
            { _id: req.body._id },
            {
                $set:
                {
                    name: req.body.name,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    completedDate: req.body.completedDate,
                    summaryDescription: req.body.summaryDescription,
                    fullDescription: req.body.fullDescription,
                    price: req.body.price,
                    location: req.body.location,
                    area: req.body.area,
                    address: req.body.address,
                    postedBy: req.current_user,
                    // allocatedTo: req.current_user, <-- use when a user accepts to undertake a task
                    status: req.body.status,
                }
            },
        );

    } catch( err ){

        console.error('Error loading task:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }
}); // /task:id

// PostTask route
app.post('/postTask', async (req, res) => {

    console.log('postTask:', req.body);
    // res.json( req.body ); // just for debugging

    const newTask = new Task({

        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        completedDate: req.body.completedDate,
        summaryDescription: req.body.summaryDescription,
        fullDescription: req.body.fullDescription,
        price: req.body.price,
        location: req.body.location,
        area: req.body.area,
        address: req.body.address,
        postedBy: req.current_user,
        // allocatedTo: req.current_user, <-- use when a user accepts to undertake a task
        status: req.body.status,

    });
    // const { name, date} = req.body;

    try {

        // const user = await User.create({ name, email, password }); // { email: email }
        const savedTask = await newTask.save();
        console.log('saved tasks', savedTask);
        // if( savedUser && bcrypt.compareSync( password, user.passwordDigest) ){
        // correct credentials
        // res.json({ success: true })

        const token = jwt.sign(

            // the data to encode in the 'payload':
            { _id: savedTask._id },
            // the secret key to use to encrypt the token - only the server can modify - i.e. users can't change their user ID
            SERVER_SECRET_KEY,
            // expiry date:
            { expiresIn: '72h' } // 3 Days
        );

        res.json({ token, savedTask }); 

    } catch( err ){

            res.sendStatus( 500 ); // low-level (DB) error
            console.log('Error signing up:', err);
    }

}); // POST task

// EXAMPLE
// app.get('/seekrits', (req, res) => {

//     if( req.current_user.admin === true ){

//     }

//     res.json({
//         secret: 'I am an alien',
//         name: req.current_user.name
//     })
// });








