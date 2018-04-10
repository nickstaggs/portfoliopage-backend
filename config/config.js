var path = require('path');

var config = {};

config.dbOptions = {};
config.connectionOptions = {};


config.dbOptions.readUser = process.env.readUser || 'read';
config.dbOptions.readUserPass = process.env.readUserPass || 'password';
config.dbOptions.readWriteUser = process.env.readWriteUser || 'readWrite';
config.dbOptions.readWriteUserPass = process.env.readWriteUserPass || 'password';
config.dbOptions.blogger = process.env.blogger || 'blogger';
config.dbOptions.bloggerUserPass = process.env.bloggerUserPass || 'password';


config.dbOptions.readUrl = 'mongodb://' + config.dbOptions.readUser + ":"
                                        + config.dbOptions.readUserPass +'@localhost/portfolioDB';

config.dbOptions.readWriteUrl = 'mongodb://' + config.dbOptions.readWriteUser + ":"
                                             + config.dbOptions.readWriteUserPass +'@localhost/portfolioDB'

config.dbOptions.bloggerUrl = 'mongodb://' + config.dbOptions.blogger + ":"
                                           + config.dbOptions.bloggerUserPass +'@localhost/portfolioDB';

config.connectionOptions.httpPort = process.env.httpPort || '8000';
config.connectionOptions.httpsPort = process.env.httpsPort || '8443';
config.connectionOptions.privkey = process.env.privkey || path.join(__dirname, '..', 'www.nickstaggs.com', 'privkey.pem');
config.connectionOptions.fullchain = process.env.fullchain || path.join(__dirname, '..', 'www.nickstaggs.com', 'fullchain.pem');
config.connectionOptions.chain = process.env.chain || path.join(__dirname, '..', 'www.nickstaggs.com', 'chain.pem');

module.exports = config;
