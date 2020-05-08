const User = require('../models/User');
const usersController = {};

usersController.renderSingUpForm = (req, res) => {
    res.render('users/singup');
};

usersController.singUp = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    let data = { name, email };

    if (password != confirm_password) errors.push({ text: "Passwords no coinciden" });
    if (password.length < 4) errors.push({ text: "El password es menor a 4 caracteres" }); 

    // console.log(req.body);
    // console.log(errors);
    
    if (errors.length > 0) res.render('users/singup', { errors, data });
    else {
        const emailUser = await User.findOne({ email: email });
        
        if(emailUser){
            req.flash('error_msg','The email is alredy in use');
            res.redirect('/users/singup');
        } else {
            let data = { name, email, password };

            User.create(data)
                .then(result => {
                    console.log(result);
                    
                    req.flash('success_msg', 'You are registered');
                    res.redirect('/users/singin');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
};

usersController.renderSingInForm = (req, res) => {
    res.render('users/singin');
};

usersController.singIn = (req, res) => {
    res.send('singip');
};

usersController.logOut = (req, res) => {
    res.send('logout');
};

module.exports = usersController;