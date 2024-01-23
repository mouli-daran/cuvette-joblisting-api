const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const home = require('./routes/home');
const user = require('./routes/user');
const job = require('./routes/job')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(morgan('tiny'))


app.use('/api/v1' , home);
app.use('/api/v1' , user);
app.use('/api/v1', job);

module.exports = app;