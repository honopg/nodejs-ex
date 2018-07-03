/**
 * Module dependencies.
 */
var express  = require('express');
var connect = require('connect');
var app      = express();
var mongoose = require('mongoose');
var list = require('config/list');
  

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ipaddress   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
	
// Conectar a la base de datos
/*var connection_string = '127.0.0.1:27017/node-android';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
//mongoose.connect('mongodb://'+connection_string);
mongoose.connect('mongodb://'+connection_string).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});*/

// Configuration
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname + '/public')));
//app.use(express.static(path.join(__dirname + '/views'))); // Para ver el index
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
 
// Routes
var users = express.Router();

	users.route('/users').get(list.findAllUsers)
	users.route('/users/api').get(list.findAllUsersSubj)
	//users.route('/users/api/:id').get(list.findAllUserSubj)
	users.route('/users/api/subj/:id').post(list.findUserSubj)
	users.route('/users/api/subj/:subj/:group').post(list.findUserByPlGroup)
	//users.route('/users/api/subj/:id').get(list.findUserSubj)
	users.route('/users/:id').delete(list.deleteUser)
	users.route('/users/api/:id').delete(list.deleteUserSubj)
	users.route('/users/publickey/:id').post(list.getPublickeyUser)	
	users.route('/users/publickeyemail/:email').post(list.getPublickeyUserByEmail)
	users.route('/users/privatekey/:id').post(list.getPrivatekeyUser)	
	users.route('/users/getEmail/:id').post(list.getEmailById)
	app.use('/',users);
 
require('./routes/routes.js')(app);

app.get('/process',function (req, res){
	res.json(process.env);
});

app.listen(port, ipaddress, function() {
    console.log('Server running on http://%s:%s', ipaddress, port);
});

