var mysql = require("mysql");
sql = {
    connection: null
};

/**
 * Get the current time stamp.
 */
sql.getTimeStamp = function(){
    return CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
}

/**
 * To setup and connect to the MySQL Server
 * @param {string} host - The host url (localhost)
 * @param {string} user - the username to the MySQL account
 * @param {string} password - password to the MySQL account.
 * @param {string} database - database name 
 */
sql.init = function (host, user, password, database) {
  try {
    var connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
    connection.connect(function(err){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });
    sql.connection = connection;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 * Perform a basic query
 * @param {string} queryStr - the query string
 * @param {function} callback - The results of the query.
 */
sql.query = function(queryStr, callback){
    sql.connection.query(queryStr, callback);
}

/**
 * A way to implement values in a query without having to deal with string concating.
 * @param {string} queryStr - the query string
 * @param {Array} valueArray - values to place in query by '?'
 * @param {function} callback - The results of the query. 
 */
sql.complexQuery = function(queryStr, valueArray, callback){
    sql.connection.query(queryStr, valueArray, callback);
}

sql.insertRow = function(queryStr, ObjValue, callback){
    sql.connection.query(queryStr, ObjValue, callback);
}

sql.end = function(){
    sql.connection.end();
}
