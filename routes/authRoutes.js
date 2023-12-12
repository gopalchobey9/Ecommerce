const express = require('express');
const router =express.Router(); // router is  a miny application 
const passport = require('passport')
const User = require('../model/User');
const {main,getRegister,postRegister,getLogin,postLogin,logout} = require("../controllers/auth")

router.get('/',main);



router.get('/register',getRegister);
router.post('/register',postRegister );
router.get('/login',getLogin);
router.post('/login',

    passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: 'Invalid username or password.' }),
    postLogin);

    // logout 
    router.post('/logout',logout);
module.exports = router;
