const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const cors = require('cors');
const corsOptions = {
  origin: [
    'https://suspect-management-frontend.vercel.app',
    'http://localhost:5173'
  ],
  methods: 'GET,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))


app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

module.exports = app;
