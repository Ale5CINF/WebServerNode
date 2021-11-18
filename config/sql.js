var con= require(global.dirn + "/config/db.js");


module.exports.sql = async function (sql) {
return new Promise(async function(f){
  con.query(sql, function (err, result) {
    if (err) {
      console.log("Error on querry " + sql + " " + err);
      f([]);
      return;}
    f(result);
  });

})
}
module.exports.escape = function(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "\}":
            case "\{":

            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
            default:
                return char;
        }
    });
}

module.exports.disconnect = async function () {
  return new Promise(async function(f){
    con.end();
  })
}
