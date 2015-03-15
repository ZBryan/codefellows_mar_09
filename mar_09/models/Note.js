'use strict';

var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  noteBody: String,
  author: {type: String, default: 'Anonymous'}
});

module.exports = mongoose.model('Note', noteSchema);
