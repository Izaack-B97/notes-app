const mongoose = require('mongoose');

// const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
// const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE;

// const NOTES_APP_MONGODB_HOST = 'localhost'
// const NOTES_APP_MONGODB_DATABASE = 'nodes-app';

const MONGODB_URI = `mongodb+srv://isaac:1234@notes-app-brqi7.mongodb.net/test?retryWrites=true&w=majority`;

// console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true  
    })
    .then(db => { 
        console.log('Database is connected');
    })
    .catch(err => {
        console.log(err);
    });