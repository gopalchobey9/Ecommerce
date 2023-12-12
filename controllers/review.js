const Product = require('../model/Product');
const Review = require('../model/Review');

const postReview =async(req,res)=>{

    let {Id} = req.params;
    let {rating , comment} = req.body;
    const ppr = await Product.findById(Id);

    const review  = new Review({rating , comment}); 
    
    ppr.reviews.push(review);
    await ppr.save();
    
    await review.save();
    req.flash('msg','review updated')
    res.redirect(`/products/${Id}`)

}

const deleteReview =async (req, res) => {
    try {
      const { id, mainid } = req.params;
  
      // Find the product by mainid
      const product = await Product.findById(mainid);
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Find the index of the review with the specified id
      const index = product.reviews.findIndex(review => review._id.toString() === id);
  
      if (index !== -1) {
        // Remove the review from the reviews array
        product.reviews.splice(index, 1);
  
        // Save the updated product
        await product.save();
  
        // Redirect to the product page
        return res.redirect(`/products/${mainid}`);
      } else {
        return res.status(404).send('Review not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }



module.exports = {postReview,deleteReview}