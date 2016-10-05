var express = require('express');
var app = express();
var morgan = require('morgan');
var shortid = require('shortid');
var open = require('open');

var mongoose = require('mongoose');
var Urls = require('./app/models/urls');
mongoose.connect('mongodb://localhost:27017/urlShortenerDatabase');


app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  //res.send('Hello world');
  res.render('index');
});

app.get('/new/:url(*)', function (req, res) {


  var urls = new Urls();
  //console.log(encodeURIComponent(req.params.url));
  urls.originalURL = req.params.url;
  urls.shortenerURL = shortid.generate();
  urls.save(function (err) {
    if (err) {
// duplicate entry
      if (err.code == 11000)

        return res.json({
          success: false,
          message: 'A url already exists. '
        });
      else
        return res.send(err);
    }
    res.json({ "original_url":req.params.url, "short_url": ("http://localhost:3000/" + urls.shortenerURL)});
  });

});

app.get('/:urlId', function (req, res) {
  console.log(req.params.urlId);
  Urls.findOne({'shortenerURL' : req.params.urlId}, function(err, url) {
    if(err) {
        return err
    } else {
      console.log(url.originalURL);
      console.log(url.shortenerURL);
      open(url.originalURL);
    }
  });


});

app.listen(8080, function () {
  console.log('Server is started on port http://localhost:8080');
});
