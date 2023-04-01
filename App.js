import initwebroute from './route/web';
var db = require('./config/conect')
var methodOverride = require('method-override')
var express = require('express');
var path = require('path');
var app = express();






app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//mothodOverride setup
app.use(methodOverride('_method'))
//connect db
db.Connect();


initwebroute(app);

app.listen('8054');

