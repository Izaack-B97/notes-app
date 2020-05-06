const usersController = {};


usersController.renderSingUpForm = (req, res) => {
    res.render('users/singup');
};

usersController.singUp = (req, res) => {
    res.send('singup');
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