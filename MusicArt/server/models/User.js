const mongoose=require('mongoose');

module.exports=mongoose.model('User', {
  name:String,
  mobile:Number,
  email:String,
  password:String,
})