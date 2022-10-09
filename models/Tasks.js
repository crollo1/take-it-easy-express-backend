
const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({

    tasksPosted: {

        task: Text,
        when: Date,
        maxPrice: String,

    },  
    
    tasksUndertaken: {

        task: Text,
        completed: Date,
        price: String,

    },

}); // TasksSchema

module.exports = mongoose.model( 'Tasks', TasksSchema );
