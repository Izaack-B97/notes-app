const mongoose = require('mongoose');

const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE;


const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

console.log(MONGODB_URI);


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