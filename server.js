
const express = require('express');
const app = express();
const PORT = 3000;


const cors = require('cors'); // use package as part of "middleware stack"
app.use( cors() );


// middlewear handler for access to POSTed formdata
app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ... `);
});


// ******************* Mongoose DB initialisation ******************** //

const mongoose = require('mongoose');
const User = require('./models/User'); // User model
const Tasks = require('./models/Task'); // Tasks model
const Categories = require('./models/Categories'); // Categories model
const Workers = require('./models/Workers'); // Workers model

mongoose.connect('mongodb://127.0.0.1');

const db = mongoose.connection
db.on('error', err => {
    console.log('Error connecting to DB server', err);
    process.exit( 1 ); 
});




// *** T.I.E API routes *** //

app.get('/', (req, res) => {

    console.log('home route requested');
    res.json( );

}); // '/'


app.get('/user', async (req, res) => {

    try{

        const user = await User.find();
        res.json( user );

    } catch( err ){

        console.error('Error loading user:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/user'


app.get('/categories', async (req, res) => {

    try{

        const categories = await Categories.find();
        res.json( categories );

    } catch( err ){

        console.error('Error loading categories:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/categories'


app.get('/tasks', async (req, res) => {

    try{

        const tasks = await Tasks.find();
        res.json( tasks );

    } catch( err ){

        console.error('Error loading tasks:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/tasks'


app.post('/worker', async (req, res) => {

    try{

        const worker = await Workers.find();
        res.json( worker );

    } catch( err ){

        console.error('Error loading becomeHelper:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/becomeHelper'


