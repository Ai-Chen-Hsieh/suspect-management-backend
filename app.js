const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')


const app = express();

const routes = require('./routes')
require('./config/mongoose')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))


app.use(routes)


module.exports = app;
