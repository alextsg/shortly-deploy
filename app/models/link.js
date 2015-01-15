var mongoose = require('mongoose');
var url = require('../config').url;
var crypto = require('crypto');

url.methods.initialize = function () {
  this.on('creating', function(model, attrs, options){
    var shasum = crypto.createHash('sha1');
    shasum.update(model.get('url'));
    model.set('code', shasum.digest('hex').slice(0, 5));
  });
};

var Link = mongoose.model('Link', url);

module.exports = Link;
