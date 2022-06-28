const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [String],
  price: {
      type: Number,
      required: true,
      min: 0.01,
      maxLength:8
    },
  reating:{
    type: Number,
    default: 0,
    maxLength:5,
    
  },
  image:{
    public_id:{
      type:String,
      required: true 
    },
url:{
      type:String,
      required: true 
    }
  },
  stock:{
    type: Number,
    required: true,
    maxLength: 4
  }
},
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product