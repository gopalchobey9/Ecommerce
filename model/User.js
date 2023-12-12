const mongoose =  require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
   role:{
    type:String, 
    required:true
  },cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
  }]
} );

  //adding plugin to the user Schema
  userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User' , userSchema);
module.exports = User;