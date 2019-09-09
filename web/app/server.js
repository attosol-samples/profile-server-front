'use strict';

// #region Big Bang
const debug = require('debug')('attosol:server:info');

debug('Loading');
// #endregion

// #region Imports
const appName = 'profile-server-front';
debug(`${appName} init successful`);

// #region Express
const express = require('express'),
      favicon = require('serve-favicon'),
      path = require('path'),
      morgan = require('morgan'),
      ejs = require('ejs');

const app = express();
const routers = require('./routers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the favicon middleware
app.use(favicon(path.resolve(process.cwd(), 'public', 'favicon-blue.ico')));

// Set the HTTP request logger middleware
app.use(morgan('dev'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the default folder for views
app.set('views', './app/views');
routers.map(router => app.use('/api/', router));

// Default Page
app.get(['/', '/api'], (req, res) => {
  res.send('Ok');
});

const port = "9000";
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
