var app = require(global.dirn + "/config/express-config.js");
var sql= require(global.dirn + "/config/sql.js");
var login = require(global.dirn + "/config/checkAuth.js");

//Creo una funzione in async per effetuare il ping
async function getVersion(auth){
	return new Promise(async function (resolve, reject) {
		//Controllo se auth token è settato
		if(auth != undefined){
			//Controllo se auth token è presente nel database
			auth = sql.escape(auth.split(" ")[1]);
			var check = await login.checkAuth(auth);
			if(check){
				//Ottengo le varie info delle api!
				var info = await sql.sql("SELECT * FROM `info` where idApp = 1"); // ottengo le info delle api dal db
				var x = {"version": info[0]["version"], "created_by":info[0]["creator"],"totalRequest": info[0]["numberRequest"]};
				resolve(x);
				return;
			} else {
				reject({"error":"100","description":"auth_key error"});
				return;
			}
		} else {
			reject({"error":"101","description":"auth_key not set"});
			return;
		}
	})
}

//Esporto la risposta da mandare al modulo express
exports.rispondi = async function(req,res){
	try {
		res.set('Content-Type', 'application/json');
        res.send(await getVersion(req.header("Authorization")));
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
