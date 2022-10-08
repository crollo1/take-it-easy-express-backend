
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
mongoose.connect('mongodb://127.0.0.1');
const User = require('./models/User'); // User model
const db = mongoose.connection


// *** T.I.E API routes *** //

app.get('/', (req, res) => {

    console.log('home route requested');
    res.json( Home );

}); // '/'


app.get('/user/:id', async (req, res) => {

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

        const categories = await User.find();
        res.json( categories );

    } catch( err ){

        console.error('Error loading categories:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/categories'


app.get('/tasks', async (req, res) => {

    try{

        const tasks = await User.find();
        res.json( tasks );

    } catch( err ){

        console.error('Error loading tasks:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/tasks'


app.post('/becomeHelper', async (req, res) => {

    try{

        const becomeHelper = await User.find();
        res.json( becomeHelper );

    } catch( err ){

        console.error('Error loading becomeHelper:', err);
        res.status( 422 ).json({ error: 'Db connection error' }); // 'Unprocessable entity' - trigger frontend axios catch()

    }

}); // '/becomeHelper'


