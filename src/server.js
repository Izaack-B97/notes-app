
const indexRoute = require('./routes/index');
const notesRoutes = require('./routes/notes');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewars
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// Global Variables


// Routes 
app.use(indexRoute);
app.use(notesRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;