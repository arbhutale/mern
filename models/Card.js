/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


// User Model Definition
const userSchema = new Schema({
  nickname: { type: String, required: true },
 
  card_type: {
    type: String,
    enum: ['Credit', 'Debit', 'Others'],
    required : true 
},
  name: { type: String, required: true },  
  card_no: { type: String, required: true, unique: true, lowercase: true },
  expiry : { type: String, required: true,  lowercase: true },
  cvv: { type: String, required: true },
  card_bank: { type: String, required: true },
  card_pin: { type: String },
  card_type: { type: String, required: true },
  createdBy: { type: String, required: true },
});


// Export Module/Schema
module.exports = mongoose.model('Cards', userSchema);
