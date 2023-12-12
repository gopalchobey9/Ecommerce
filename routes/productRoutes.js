const express = require('express');
const Product = require('../model/Product');
const router =express.Router(); // router is  a miny application 
const {validateProduct,isLoggedin,isSeller} = require('../middleware');

//READ 
router.get('/products' ,isLoggedin,async (req,res)=>{
     try{
    let products = await Product.find();
    res.render('products/index',{products})
     }
     catch(e){
        res.status(500).render('./partials/error',{err:e.mesaage});
     }
   
})


 router.get('/products/new',isLoggedin,isSeller, (req,res)=>{
    try{
    res.render('products/new');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
    
})
// show a perticular prdouctt

router.get('/products/:id',isLoggedin , async(req,res)=>{
    try{
        let {id} = req.params;
        // let foundProduct = await Product.findById(id);
        let foundProduct = await Product.findById(id).populate('reviews');
        // console.log(foundProduct);
       
    res.render('products/show', {foundProduct,msg:req.flash('success')});
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }

})

router.get('/products/show',isLoggedin, (req,res)=>{
    try{
    res.render('products/show');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
})

//add products
router.post('/products' ,validateProduct,isLoggedin,isSeller, async(req,res)=>{
    try{
    let {name,img , price , desc,author} = req.body;
    await Product.create({name,img , price , desc ,author :req.user._id});
    res.redirect('/products');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
})


//edit  page 
router.get('/products/:id/edit',isLoggedin , async(req,res)=>{
    try{
    let {id} = req.params;
   
    let foundProduct = await Product.findById(id);
    res.render('products/edit' , {foundProduct})
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
})

// to actually edit  in db 
router.patch('/products/:id' ,isLoggedin,validateProduct, async(req,res)=>{
    try{
        console.log('gopal');
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate( id , {name , img , price , desc});
    req.flash('success' , 'Product edited successfully');
    res.redirect(`/products/${id}`);
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
})
// delete 
router.delete('/products/:id' ,isLoggedin, async(req,res)=>{
    try{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
})



module.exports =router;



