//Importo il modulo di express per creare il webserver
var express = require("express");
var compression = require('compression');
var app = express(); //avvio istanza del web server
let port = 8080; //Porta di collegamento
app.use(compression());
app.use(express.json());
app.set('port', port);

//Log di ogni richiesta
app.use((req, res, next) => {
	//Log di ogni richiesta effetuata tramite il webserver di nodejs
    console.log(`New ${req.method} request to ${req.originalUrl}, using ${req.headers['user-agent']}`.info);
    next();
})

module.exports = app;
