const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  productSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  coursename : String,
  image_url : String,
  description : String,
  duration : String,
  faculty : String
});

module.exports = mongoose.model('Product', productSchema);
