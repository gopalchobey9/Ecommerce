const express = require('express');
const router =express.Router(); // router is  a miny application 
const passport = require('passport')
const User = require('../model/User');
const {main,getRegister,postRegister,getLogin,postLogin,logout} = require("../controllers/auth")
const multer = require("multer")    


router.get('/',(req,res)=>{
    res.render('auth/login')
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null,uniqueSuffix+'-'+file.originalname)
    //   const uniqueSuffix = (`${Date.now()}-${file.originalname}`)
    //    cb(null, uniqueSuffix)
    //    cb(null,`${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })


router.get('/upload',upload.single('image'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
      
});

router.get('/profile',(req,res)=>{
    // let profile =User.findById(req.user.id);
    res.render('products/profile')
})

router.patch('/profile', async(req,res)=>{
    console.log("hello");
    // let profile =await User.findById(req.user.id);
    let{username,email} = req.body;
    await User.findByIdAndUpdate(req.user.id,{username:username,email:email});
    req.flash('success',"profile edit succesfully");
    res.redirect('/profile')
});

router.get('/register',getRegister);
router.post('/register',upload.single('image'),postRegister );
router.get('/login',getLogin);
router.post('/login',

    passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: 'Invalid username or password.' }),
    postLogin);

    // logout 
    router.post('/logout',logout);
module.exports = router;
