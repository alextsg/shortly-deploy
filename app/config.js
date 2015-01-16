var mongoose = require('mongoose');
var crypto = require('crypto');
var path = require('path');

mongoose.connect('mongodb://localhost/test');

var urlSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 }
});

urlSchema.pre('save', function (next) {
  var self = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null }
});

userSchema.pre('save', function (next) {
  this.hashPassword().then(function (hash) {
    this.set('password', hash);
    next();
  }.bind(this));
});

module.exports = {
  url: urlSchema,
  user: userSchema
};
