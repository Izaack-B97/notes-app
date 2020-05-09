
const usersRouter = require('./routes/users');
const indexRoute = require('./routes/index');
const notesRoutes = require('./routes/notes');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash'); 
const session = require('express-session');
const passport = require('passport');

// Initializations
const app = express();
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewars
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Guarda mensaje en el servidor

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // error de passport
    res.locals.user =  req.user || null; // Aqui guarda passport al usuario
    next();
});


// Routes 
app.use(indexRoute);
app.use(notesRoutes);
app.use(usersRouter);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;