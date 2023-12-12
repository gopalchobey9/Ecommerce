const  mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    img:
    {
        type:String,
         required:true
    },
    price:
    {
        type:String,
         required:true , min:0
    },
    desc:
    {
        type:String,
        required:true,
        trim:true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})
 let Product = mongoose.model('Product',productSchema);
 module.exports =Product;