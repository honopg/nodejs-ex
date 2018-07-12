'use strict'

const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;
const app = require('./app');
const config = require('./config');
const connection_string = null;
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}


mongoose.connect('mongodb://'+connection_string/*config.db*/,(err,res) => {
	if(err) {
		return console.log(`Error to connect to the database: ${err}`)
	}
	console.log('Connection established with the database...');
	
	app.listen(config.port,config.ip, () => {
	console.log('Server running on http://localhost:%s', config.port);
	});
});
