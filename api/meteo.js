var app = require(global.dirn + "/config/express-config.js");
var ping = require('ping'); //Importo il modulo per effetuare il ping
var login = require(global.dirn + "/config/checkAuth.js"); //Modulo per controllare il key token
var sql= require(global.dirn + "/config/sql.js");

async function pingServer(ip,auth){ //Creo una funzione in async per effetuare il ping
	return new Promise(async function (resolve, reject) {
// QUA
	})
}

//Esporto la risposta da mandare al modulo express
exports.rispondi = async function(req,res){
	try {
		res.set('Content-Type', 'application/json');
        res.send(await meteo(req.query.citta,req.header("Authorization")));//Richiamo la funzione e gli passo i parametri presi dagli header per auth token e indirizzo ip tramite paramtro get 
		res.status(200);
    } catch (e) {
        res.status(400);
        res.send(e);
    } finally {
		return;
	}
  res.status(400);
  res.send("Non autorizzato");
}
