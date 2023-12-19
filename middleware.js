 const{ productschema, reviewschema } = require('./schema');

const validateProduct =(req,res,next)=>{
        let {name,img,price,desc} =req.body;
        console.log(name,img,price,desc);
       const {error}= productschema.validate({name,img,price,desc})
       if(error){return res.render('./partials/error')
}
        next();
}
const validateReview =(req,res,next)=>{
    let {rating,comment} =req.body;
    console.log(rating,comment);
    const {error}= reviewschema.validate({rating,comment})
    if(error){return res.render('./partials/error')
}
     next();
}



 const isLoggedin = (req,res,next)=>{
if(!req.isAuthenticated()){
    console.log('You are not logged in' );
    return res.redirect('/login');
}
next();
 }  


 const isSeller=(req,res,next)=>{
      if(!req.user.role){

        return res.redirect('/products');
      }
      else if(req.user.role!== 'seller'){
        req.flash('error' , 'you do not have permission');
        return res.redirect('/products');
      }
      next();

 }; 
 const isProductAuthor = (req,res,next)=>{
    
 }






 module.exports ={isSeller,validateProduct,validateReview,isLoggedin}