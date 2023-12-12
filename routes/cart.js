const express = require('express');
const Product = require('../model/Product');
const User = require('../model/User');
const router =express.Router(); 
const {isLoggedin} = require('../middleware');

router.get('/user/cart',async(req,res) => {
     const prod = await User.findById(req.user._id);
res.render('cart/cart',{prod })


}) ;


router.post('/user/:id/add',isLoggedin,async(req,res)=>{
   try{
    const {id} = req.params;
    console.log(id);
    const pro = await Product.findById(id);
    console.log(pro);
    const userid = req.user._id;
    const user = await User.findById(userid);
    console.log(user);
    user.cart.push(pro);
   await user.save();
   req.flash('success', 'Product added successfully to cart');
   res.redirect('/products');
   }
   catch(err){
    console.error(error);
    req.flash('error', 'An error occurred');
    res.redirect('/products'); 
   }
})



module.exports = router;