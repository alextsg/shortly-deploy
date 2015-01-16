var mongoose = require('mongoose');
var user = require('../config').user;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

user.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.get('password'), function(err, isMatch) {
    cb(isMatch);
  });
};

user.methods.hashPassword = function () {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this);
};

var User = mongoose.model('User', user);

module.exports = User;
