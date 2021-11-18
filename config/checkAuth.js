var sql= require(global.dirn + "/config/sql.js");

module.exports.checkAuth = async function(keyAuth) {
	return new Promise(async function(f){
		var info = await sql.sql("SELECT * FROM `utenti` where keyApi = '"+ keyAuth +"'"); // ottengo le info delle api dal db
		if(info.length == 0){
			f(false);
			return;
		} else {
			f(true);
			return;
		}
	})
}