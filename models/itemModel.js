const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
   name: { type: String },
   description: { type: String },
   quantity: { type: Number },
   itemIsDamaged : { type: Boolean, default: true },
   user: { type: String, default: 'Bob' },
   comments: [{  
      // an id referencing the comment
      type: mongoose.Types.ObjectId, 
      // search for it in the Comments collection
      ref: 'Comment' 
   }]
}, { timestamps: true }) 

const Item = mongoose.model('Item', itemSchema) 

module.exports = Item