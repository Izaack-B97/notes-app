const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => { // Toda la  chamba para autentificar

    try {
        // Match Email's user
        let user = await User.findOne({ email });
        
        if(!user) return done(null, false, { message: 'Not User Found !' }); // Funcion que termina
        else {
            // Match Password's User
            console.log('usuario encontrado');
            
            let match = user.matchPassword(password);
            if (match) return done(null, user);
            else {
               return done(null, false, { message: 'Incorrect password' }); 
            }

        }

    } catch (error) {
        console.log(error);
    }

}));

// Serializa al usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializa al usuario al navegar entre paginas
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});