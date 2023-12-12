const express =  require('express');

const router = express.Router();

const {validateReview} = require('../middleware');
const Product = require('../model/Product');
const Review = require('../model/Review');
const  {postReview,deleteReview} = require("../controllers/review")




router.use(express.urlencoded({extended: true}));

router.post('/products/:Id/review',validateReview , postReview)
// delete the review
router.delete('/products/:id/delete/:mainid', );


module.exports = router;