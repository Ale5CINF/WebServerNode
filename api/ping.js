var app = require(global.dirn + "/config/express-config.js");
var ping = require('ping'); //Importo il modulo per effetuare il ping
var login = require(global.dirn + "/config/checkAuth.js"); //Modulo per controllare il key token
var sql= require(global.dirn + "/config/sql.js");

async function pingServer(ip,auth){ //Creo una funzione in async per effetuare il ping
	return new Promise(async function (resolve, reject) {
		//Controllo auth token
		if(auth != undefined && ip != undefined){
			//Controllo se auth token è presente nel database
			auth = sql.escape(auth.split(" ")[1]);
			var check = await login.checkAuth(auth);
			if(check){
				let res = await ping.promise.probe(ip);
				resolve(res);
				return;
			} else {
				reject({"error":"100","description":"auth_key error"});
				return;
			}
		} else {
			reject({"error":"101","description":"auth_key or ip not set"});
			return;
		}
	})
}

//Esporto la risposta da mandare al modulo express
exports.rispondi = async function(req,res){
	try {
		res.set('Content-Type', 'application/json');
        res.send(await pingServer(req.query.ip,req.header("Authorization")));//Richiamo la funzione e gli passo i parametri presi dagli header per auth token e indirizzo ip tramite paramtro get 
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
