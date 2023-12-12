const express = require('express');
const Product = require('../model/Product');
const User = require('../model/User');
const router =express.Router(); 
const {isLoggedin} = require('../middleware');
const {getCart,postAddtocart}  = require("../controllers/cartC")
router.get('/user/cart',getCart) ;


router.post('/user/:id/add',isLoggedin,postAddtocart)



module.exports = router;