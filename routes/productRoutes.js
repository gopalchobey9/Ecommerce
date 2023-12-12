const express = require('express');
const Product = require('../model/Product');
const router =express.Router(); // router is  a miny application 
const {validateProduct,isLoggedin,isSeller} = require('../middleware');
const {showproducts,getnewProduct,showProduct,PostaddProduct,geteditProduct,patchaddProduct,deleteProduct} = require("../controllers/product")
//READ 
router.get('/products' ,isLoggedin,showproducts);

 router.get('/products/new',isLoggedin,isSeller, getnewProduct);
// show a perticular prdouctt

router.get('/products/:id',isLoggedin ,showProduct);

//add products
router.post('/products' ,validateProduct,isLoggedin,isSeller,PostaddProduct);

//edit  page 
router.get('/products/:id/edit',isLoggedin ,geteditProduct );

// to actually edit  in db 
router.patch('/products/:id' ,isLoggedin,validateProduct,patchaddProduct );

// delete 
router.delete('/products/:id' ,isLoggedin,deleteProduct );

module.exports =router;



