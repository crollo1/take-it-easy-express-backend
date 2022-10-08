
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


// Mongoose DB initialisation
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1');
const db = mongoose.connection


// T.I.E API routes

app.get('/', (req, res) => {

    console.log('home route requested');
    res.json( Home );

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


