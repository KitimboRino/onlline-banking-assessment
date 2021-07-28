/* eslint-disable no-console */
const express = require('express');
const exphbs = require('express-handlebars');
// const session = require('session');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');

require('dotenv').config();

const app = express();

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Handle bars templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Initial route
const routes = require('./server/routes/user');

app.use('/', routes);

const port = process.env.PORT || 5000;
// Server Test
app.listen(port, () => console.log(`Listening on port ${port}`));
