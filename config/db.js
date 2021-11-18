var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "pmauser",
  password: "Dcf3aa8038!",
  database:"restapi"
});

con.connect(function(err) {
  if (err) {console.log(err);return;}
});

module.exports = con;


