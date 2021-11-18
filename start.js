/* Importo i moduli */ 
var app = require("./config/express-config.js"); //Configurazione web server
const express = require("express");
var colors = require('colors'); //Colori per i vari log
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

//Variabili globali
global.activeApp=true; // true api attive; false api disattivate (Manutenzione server)
global.dirn=__dirname; // Serve per far ottenere la cartella madre di dove si trova tutto il progetto

//Api che effettua una richiesta di ping ad un ip specifico tramite richiesta get e inserimento di un parametro
app.get('/con/v3/consumers/ping',function(req,res){
	if (global.activeApp) {
		var risposta=require("./api/ping.js");
		risposta.rispondi(req,res);
	} else {
		res.status(500);
		res.send("WebAPI under maintenance");
	}
});

//Api che effetua request meteo
app.get('/con/v3/consumers/meteo',function(req,res){
	if (global.activeApp) {
		var risposta=require("./api/meteo.js");
		risposta.rispondi(req,res);
	} else {
		res.status(500);
		res.send("WebAPI under maintenance");
	}
});

//Versione api
app.get('/con/v3/consumers/version',function(req,res){
	if (global.activeApp) {
		var risposta=require("./api/version.js");
		risposta.rispondi(req,res);
	} else {
		res.status(500);
		res.send("WebAPI under maintenance");
	}
});

//Dashboard static
app.use('/dashboard', express.static('static/dashboard'));

//Richiesta di errore per tutte le altre richieste non corrette!
app.get('*', function(req, res){
  res.status(404).send({"error":"404","description":"ur mum gay"});
});





//Avvio web server
app.listen(app.get('port')); //Avvio il web server tramite la porta configurata nel config di express-config.js
console.log(`App running on localhost, port ${app.get('port')}`.verbose);