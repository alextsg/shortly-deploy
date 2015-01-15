var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/test');

var urlSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null }
});

module.exports = {
  url: urlSchema,
  user: userSchema
};
