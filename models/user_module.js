'use strict';
require(__dirname + '/file_module');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type : String, unique : true, required : true, dropDups: true},
  favorite_color: String,
  files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
});

module.exports = mongoose.model('User', userSchema);
