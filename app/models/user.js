var mongoose = require('mongoose');
var user = require('../config').user;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

user.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

user.methods.hashPassword = function () {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

var User = mongoose.model('User', user);

module.exports = User;
