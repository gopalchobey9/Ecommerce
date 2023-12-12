const Product = require("../model/Product");

const  showproducts = async (req,res)=>{
    try{
   let products = await Product.find();
   res.render('products/index',{products})
    }
    catch(e){
       res.status(500).render('./partials/error',{err:e.mesaage});
    }
  
}

const getnewProduct =(req,res)=>{
    try{
    res.render('products/new');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
    
}

const showProduct = async(req,res)=>{
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

}

const PostaddProduct  = async(req,res)=>{
    try{
    let {name,img , price , desc,author} = req.body;
    await Product.create({name,img , price , desc ,author :req.user._id});
    res.redirect('/products');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
}

const geteditProduct =async(req,res)=>{
    try{
    let {id} = req.params;
   
    let foundProduct = await Product.findById(id);
    res.render('products/edit' , {foundProduct})
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
}

const patchaddProduct =async(req,res)=>{
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
}
const deleteProduct = async(req,res)=>{
    try{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
    }
    catch(e){
    res.status(500).render('./partials/error',{err:e.mesaage});
    }
}

module.exports = {showproducts,getnewProduct,showProduct,PostaddProduct,geteditProduct,patchaddProduct,deleteProduct}