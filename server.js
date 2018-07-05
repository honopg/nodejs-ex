var express = require('express');
var app = express();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/node-android');
var conecctionString= process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/node-android';
	mongoose.connect(conecctionString);

var webSiteSchema = new mongoose.Schema({
	name: String,
	created: {type: Date, default: Date.now}
},{collection:'website'});
var webSiteModel = mongoose.model('webSite',webSiteSchema);
var website= new webSiteModel({name: "web1"});
website.save();

app.use(express.static(__dirname+'/public'));



app.get('/website',function (req, res){	
	webSiteModel.find(function (err, sites){
	res.json(sites);
	});
});

var port =  process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   =  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(port,ip);
