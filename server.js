const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const logger = require(path.join(__dirname, 'lib', 'logger.js'));
const https = require('https');
const http = require('http');
const config = require('./config/config.js');
const sessions = require('./sessions/index.js');
const blogposts = require('./blogposts');
const users = require('./users');

// configuration ===============================================================

mongoose.connect(config.dbOptions.readUrl);
// set the static files location
app.use(express.static('./client'));

// setup the access logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(sessions);
app.use(blogposts)
app.use(users)

// routes ======================================================================
require('./routes.js')(app);

var options = {
 key: fs.readFileSync(config.connectionOptions.privkey),
 cert: fs.readFileSync(config.connectionOptions.fullchain),
 ca: fs.readFileSync(config.connectionOptions.chain)
};

http.createServer(app).listen(config.connectionOptions.httpPort);
https.createServer(options, app).listen(config.connectionOptions.httpsPort);

logger.info("App listening on port " + config.connectionOptions.httpPort + " and " + config.connectionOptions.httpsPort);
