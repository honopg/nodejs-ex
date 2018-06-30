
// var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var setStudent = require('config/setStudent');
var savekeys = require ('config/saveKeys');

var subject = require('config/subjects');
var user = require('config/models');

//var user = require('mongoose').model('users');
//var subject = require('mongoose').model('subjects');
var mongoose = require('mongoose');
var users = mongoose.model('users');
var subjects = mongoose.model('subjects');//*/
 
module.exports = function(app) {
 
 
    app.get('/', function(req, res) {
		//res.render("index.html");
        res.end("Node-Android");
    });
	
	
 
    app.post('/login',function(req,res){
        var email = req.body.email;
        var password = req.body.password;
 
        login.login(email,password,function (found) {
            console.log(found);
            res.json(found);
		});
    });
 
 
    app.post('/register',function(req,res){
        var name = req.body.name;
		var lastname = req.body.lastname;
		var typeuser = req.body.typeuser;
		var email = req.body.email;
        var password = req.body.password;
 
        register.register(name,lastname,typeuser,email,password,function (found) {
            console.log(found);
            res.json(found);
		});
    });
	
	    app.post('/savekeys',function(req,res){
		var identUser = req.body.identUser;
        var publickey = req.body.publickey;
		var privatekey = req.body.privatekey;
		
 
        savekeys.savekeys(identUser,publickey,privatekey,function (found) {
            console.log(found);
            res.json(found);
		});
    });
	
	//app.post('/api/setStudent/:id',function(req,res){
	app.post('/api/setStudent',function(req,res){
	/*	
		var id = req.body.id;
		var	asigf1 =  req.body.asigf1;
		var	asigf2 =  req.body.asigf2;
		var	asigf3 =  req.body.asigf3;
		var	asigf4 =  req.body.asigf4;
		var	groupte = req.body.groupte;
		var	grouppa = req.body.grouppa;
		var	grouppl = req.body.grouppl;
		var	profname = req.body.profname;
		var	profemail = req.body.profemail;
		var	optionsubj = req.body.optionsubj;
		//var user = req.body.user;*/
		var id_user = req.body.id_user;
		var subj = req.body.subj;
		var	groupte = req.body.groupte;
		var	grouppa = req.body.grouppa;
		var	grouppl = req.body.grouppl;
		var	profname = req.body.profname;
		var	profemail = req.body.profemail;
		//var Users = req.body.Users;

        //setStudent.saveSubj(id,asigf1,asigf2,asigf3,asigf4,groupte,grouppa,grouppl,profname,profemail,optionsubj,function (found) {
		setStudent.saveSubj(id_user,subj,groupte,grouppa,grouppl,profname,profemail,function (found) {
            console.log(found);
            res.json(found);
    });
    });
	

	
	/* Listar usuarios asociados a asignaturas */
	app.get("/asignaturas", function(req, res) {  
		subject.find({}, function(err, asignaturas) {
			res.status(200).send(asignaturas)
		});
	});

	app.get("/asignatura", function(req, res) {  
		subject.find({}, function(err, asignatura) {
			user.populate(asignatura, {path: "User"},function(err, asignatura){
				res.status(200).send(asignatura);
			}); 
		});
	});

	app.get("/asig", function(req, res) {	
		subject.find().populate('User').exec(function(err, asig){
			res.status(200).send(asig);
		});	
	});
 
 /*
    app.post('/api/chgpass', function(req, res) {
        var id = req.body.id;
                var opass = req.body.oldpass;
        var npass = req.body.newpass;
 
        chgpass.cpass(id,opass,npass,function(found){
            console.log(found);
            res.json(found);
    });
    });
 
 
    app.post('/api/resetpass', function(req, res) {
 
        var email = req.body.email;
 
        chgpass.respass_init(email,function(found){
            console.log(found);
            res.json(found);
    });
    });
 
 
    app.post('/api/resetpass/chg', function(req, res) {
 
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;
 
        chgpass.respass_chg(email,code,npass,function(found){
            console.log(found);
            res.json(found);
    });
    });
 */
 
};