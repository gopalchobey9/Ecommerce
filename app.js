const express  =  require("express");
const app = express();
const mongoose  = require("mongoose");
const path = require("path");
const Product = require("./model/Product");
const seedDB = require("./seed");
const middleware = require("middleware");
const methodOverride  = require('method-override');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require("./model/User");
const session =require("express-session");
const flash = require("connect-flash");
const  propfind  = require("./routes/productRoutes");
const  authRoutes  = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cart");
// authRoutes

let configSession ={
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { 
      httpOnly: true,
   expires :Date.now()+ 24*7*60*60*1000,
      maxAge:24*7*60*60*1000
            }
   } 
mongoose.connect("mongodb+srv://gopalchobey9:PRAswT3JzwruJ3HQ@cluster0.ovwdlyu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connect");

 }).catch((err)=>{
    console.log("Error");
 })

 


 app.set("view engine", "ejs");
 app.set("views",path.join(__dirname,'views'));
 app.use(express.static(path.join(__dirname,'public')))
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


 
 app.use(session(configSession));
 passport.use(new LocalStrategy(User.authenticate()));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride('_method'));
 app.use(flash());

// Middleware to set local variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

 // middle ware 
 app.use(authRoutes);
 app.use(propfind);
 app.use(reviewRoutes);
 app.use(cartRoutes);
 
 


 let port =8080;
app.listen(port,()=>{
    console.log("started at 8080");
})