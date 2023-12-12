const passport = require('passport')
const User = require('../model/User');

const main =(req, res) => {
    res.render('auth/login')
}
const getRegister = (req, res) => {
    res.render('auth/signup')
} 
const postRegister = async (req, res) => {
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
  }


  const getLogin = (req, res) => {
    res.render('auth/login')
}
const postLogin =  (req, res) =>{
    try{
    console.log(req.user.role , "new")
    req.flash('succcess' , 'succesfully logged in');
    res.redirect('/products');
}
    catch(e){
        req.flash('error' , 'Product logi failde');
        res.redirect('error'); 
    }
}
const logout = (req, res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
    
    
}
module.exports = {main,getRegister,postRegister,getLogin,postLogin,logout}