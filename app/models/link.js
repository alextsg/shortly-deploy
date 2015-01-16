var mongoose = require('mongoose');
var url = require('../config').url;
var crypto = require('crypto');

var Link = mongoose.model('Link', url);

module.exports = Link;
