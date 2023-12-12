const express = require('express');
const User = require('../model/User');
const router =express.Router(); // router is  a miny application 
const passport = require('passport')


router.get('/',(req, res) => {
    res.render('auth/login')
});



router.get('/register',(req, res) => {
    res.render('auth/signup')
});
router.post('/register', async (req, res) => {
    try {
      let { username, email, password, role } = req.body;
      let newUser = new User({ username, email, role });
      console.log(role);
      const newuser = await User.register(newUser, password);
      req.flash('success', 'Successfully registered. You can now log in.');
      res.redirect('/login');
    } catch (err) {
      req.flash('error', 'Error during registration. Please try again.');
      console.error(err);
      res.redirect('/register'); // Redirect to registration page or handle error accordingly
    }
  });
router.get('/login',(req, res) => {
    res.render('auth/login')
});
router.post('/login',

    passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: 'Invalid username or password.' }),
    (req, res) =>{
        try{
        console.log(req.user.role , "new")
        req.flash('succcess' , 'succesfully logged in');
        res.redirect('/products');
    }
        catch(e){
            req.flash('error' , 'Product logi failde');
            res.redirect('error'); 
        }
    });

    // logout 
    router.post('/logout',(req, res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
    
    
});
module.exports = router;
