//Require Packages
var express        = require('express');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');

var app            = express();

//Database
mongoose.connect('mongodb://localhost:27017/chariot');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

//Routes
var routes = require('./config/routes');
app.listen(3000);
console.log('Listening on localhost:3000')