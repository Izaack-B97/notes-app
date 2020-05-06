const express = require('express');
const router = express.Router();

const { renderSingUpForm, singUp, renderSingInForm, singIn, logOut } = require('../controllers/users.controller');

router.get('/users/singup', renderSingUpForm);

router.post('/users/singup', singUp);

router.get('/users/singin', renderSingInForm);

router.post('/users/singin', singIn);

router.get('/users/logout', logOut);

module.exports =  router;