//Require Packages
var express        = require('express');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var config         = require('./db/config');
var app            = express();

//Database
mongoose.connect(config.database);

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
app.use('/api', routes);
app.use(express.static(__dirname + "/public"));
app.get('/', function(req, res) {
  res.sendFile('/index.html');
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on ' + port);