var mongoose = require('mongoose');
var shortid = require('shortid');


var urlsSchema = mongoose.Schema({
  originalURL: {
    type: String,
    unique: true,
    sparse: true
  },
  shortenerURL: {
    type: String,
    'default': shortid.generate
  }
});

module.exports = mongoose.model('Url', urlsSchema);