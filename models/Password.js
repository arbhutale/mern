/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


// User Model Definition
const passwordManagerSchema = new Schema({
  username: { type: String, required: true },  
  password: { type: String, required: true, unique: true },
  website : { type: String, required: true },
  comments: { type: String },
  createdBy: { type: String, required: true },
});


// Export Module/Schema
module.exports = mongoose.model('PasswordManager', passwordManagerSchema);
