'use strict';
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  key: String
});

module.exports = mongoose.model('File', fileSchema);
