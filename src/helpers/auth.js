const helpers = {};

helpers.isAuthenticated = (req, res, next) => {    
    // Passport tiene una funcion que se encarga de saber si 
    // esta autenticado un usuario     
    if(req.isAuthenticated()){
        return next();
    }

    req.flash('error_msg', 'No estas autorizado');
    res.redirect('/users/singin');
};

module.exports = helpers;